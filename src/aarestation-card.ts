import { LitElement, html, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import type { AarestationCardConfig, BestTime, DashboardData, HomeAssistant } from "./types";
import { bestTimeToday, fetchDashboard } from "./api";
import { renderGauge, getColorFromScore } from "./gauge";
import { renderRadar, radarValues } from "./radar";
import { TILE_MAP } from "./tiles";
import { sunIcon, clockIcon, tileIcon } from "./icons";
import { cardStyles } from "./styles";
import { t } from "./localize";
import {
  CARD_TYPE,
  CARD_VERSION,
  DEFAULT_API_URL,
  DEFAULT_UPDATE_INTERVAL,
  MIN_UPDATE_INTERVAL,
} from "./const";
import "./editor";

@customElement(CARD_TYPE)
export class AarestationCard extends LitElement {
  static styles = cardStyles;

  // Assigned by Lovelace; unused (card has no entities) but kept for the editor.
  public hass?: HomeAssistant;

  @state() private _config!: AarestationCardConfig;
  @state() private _data?: DashboardData;
  @state() private _error = false;
  @state() private _loading = true;

  private _timer?: number;

  public static getConfigElement(): HTMLElement {
    return document.createElement("aarestation-card-editor");
  }

  public static getStubConfig(): AarestationCardConfig {
    return { type: `custom:${CARD_TYPE}` };
  }

  public setConfig(config: AarestationCardConfig): void {
    if (!config) {
      throw new Error("Ungültige Konfiguration");
    }
    this._config = {
      update_interval: DEFAULT_UPDATE_INTERVAL,
      transparent: false,
      show_gauge: true,
      show_best_time: true,
      show_updated: true,
      show_radar: false,
      tiles: [],
      ...config,
    };
    if (this.isConnected) {
      this._startPolling();
    }
  }

  public getCardSize(): number {
    return 4;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._startPolling();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._stopPolling();
  }

  private _startPolling(): void {
    this._stopPolling();
    void this._load();
    const seconds = Math.max(
      MIN_UPDATE_INTERVAL,
      this._config.update_interval ?? DEFAULT_UPDATE_INTERVAL
    );
    this._timer = window.setInterval(() => void this._load(), seconds * 1000);
  }

  private _stopPolling(): void {
    if (this._timer) {
      window.clearInterval(this._timer);
      this._timer = undefined;
    }
  }

  private async _load(): Promise<void> {
    try {
      this._data = await fetchDashboard(DEFAULT_API_URL);
      this._error = false;
    } catch (_e) {
      this._error = true;
    } finally {
      this._loading = false;
    }
  }

  private _fmt(n: number, decimals = 1): string {
    return n.toLocaleString("de-CH", { minimumFractionDigits: 0, maximumFractionDigits: decimals });
  }

  private _renderTiles(d: DashboardData): TemplateResult | typeof nothing {
    const keys = this._config.tiles ?? [];
    if (!keys.length) {
      return nothing;
    }
    const items = keys
      .map((k) => TILE_MAP[k])
      .filter((def): def is NonNullable<typeof def> => Boolean(def))
      .map((def) => ({ def, value: def.get(d) }))
      .filter((x) => typeof x.value === "number");

    if (!items.length) {
      return nothing;
    }
    return html`
      <div class="tiles">
        ${items.map(
          ({ def, value }) => html`
            <div class="tile">
              <div class="tile-label"><span class="ico">${tileIcon(def.icon)}</span>${def.label}</div>
              <div class="tile-value">
                ${this._fmt(value as number, def.decimals)}${def.unit
                  ? html`<span class="tile-unit">${def.unit}</span>`
                  : nothing}
              </div>
            </div>
          `
        )}
      </div>
    `;
  }

  protected render(): TemplateResult {
    if (this._loading && !this._data) {
      return html`<ha-card class=${classMap({ transparent: !!this._config.transparent })}>
        <div class="state">${t("laden")}</div>
      </ha-card>`;
    }
    if (this._error && !this._data) {
      return html`
        <ha-card class=${classMap({ transparent: !!this._config.transparent })}>
          <div class="state">
            ${t("ladefehler")}
            <div><button @click=${() => void this._load()}>${t("erneut_versuchen")}</button></div>
          </div>
        </ha-card>
      `;
    }

    const d = this._data!;
    const c = this._config;
    const score = d.pai?.scores?.score ?? 1;
    const best: BestTime | undefined = bestTimeToday(d.forecasts?.timeline);
    const updated = d.pai?.system_info?.datetime;

    return html`
      <ha-card class=${classMap({ transparent: !!c.transparent })}>
        ${c.title ? html`<div class="title">${c.title}</div>` : nothing}

        ${c.show_gauge ? html`<div class="gauge">${renderGauge(score)}</div>` : nothing}

        ${c.show_best_time && best
          ? html`
              <div class="pill">
                <span class="ico" style="color:${getColorFromScore(best.score)}">${sunIcon()}</span>
                <span>
                  ${t("beste_zeit_heute")} ${best.time}
                  <span class="dim">· ${t("pai")} ${this._fmt(best.score)}</span>
                </span>
              </div>
            `
          : nothing}

        ${c.show_radar ? html`<div class="radar">${renderRadar(radarValues(d))}</div>` : nothing}

        ${this._renderTiles(d)}

        ${c.show_updated && updated
          ? html`<div class="updated"><span class="ico">${clockIcon()}</span> ${t("aktualisiert")} ${updated}</div>`
          : nothing}
      </ha-card>
    `;
  }
}

window.customCards = window.customCards ?? [];
window.customCards.push({
  type: CARD_TYPE,
  name: "Aarestation Card",
  description: "PAI-Score-Gauge der Aare (aarestation.ch) mit Radar, Kacheln und bester Badezeit.",
  preview: true,
  documentationURL: "https://github.com/theskyisthelimit/ha-aarestation",
});

// eslint-disable-next-line no-console
console.info(
  `%c AARESTATION-CARD %c v${CARD_VERSION} `,
  "color: #091426; background: #38bdf8; font-weight: 700;",
  "color: #38bdf8; background: #091426;"
);

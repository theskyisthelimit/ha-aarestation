import { LitElement, html, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { AarestationCardConfig, HomeAssistant } from "./types";
import { DEFAULT_API_URL, MIN_UPDATE_INTERVAL } from "./const";

const SCHEMA = [
  { name: "title", selector: { text: {} } },
  {
    name: "update_interval",
    selector: { number: { min: MIN_UPDATE_INTERVAL, max: 3600, mode: "box", unit_of_measurement: "s" } },
  },
  { name: "show_best_time", selector: { boolean: {} } },
  { name: "show_updated", selector: { boolean: {} } },
  { name: "api_url", selector: { text: {} } },
];

const LABELS: Record<string, string> = {
  title: "Titel (optional)",
  update_interval: "Aktualisierungsintervall (Sekunden)",
  show_best_time: "Beste Zeit heute anzeigen",
  show_updated: "Aktualisierungs-Zeit anzeigen",
  api_url: "API-URL (für Self-Hosting)",
};

@customElement("aarestation-card-editor")
export class AarestationCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: AarestationCardConfig;

  public setConfig(config: AarestationCardConfig): void {
    this._config = config;
  }

  protected render(): TemplateResult {
    if (!this._config) {
      return html``;
    }
    const data = {
      api_url: DEFAULT_API_URL,
      show_best_time: true,
      show_updated: true,
      ...this._config,
    };
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${SCHEMA}
        .computeLabel=${(s: { name: string }) => LABELS[s.name] ?? s.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    const config = ev.detail.value as AarestationCardConfig;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }
}

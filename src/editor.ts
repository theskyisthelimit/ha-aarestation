import { LitElement, html, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { AarestationCardConfig, HomeAssistant } from "./types";
import { MIN_UPDATE_INTERVAL } from "./const";
import { TILE_DEFS } from "./tiles";

const TILE_OPTIONS = TILE_DEFS.map((d) => ({ value: d.key, label: d.label }));

// Flat schema: every field is top-level so ha-form emits a flat value object.
const SCHEMA = [
  { name: "title", selector: { text: {} } },
  {
    name: "update_interval",
    selector: { number: { min: MIN_UPDATE_INTERVAL, max: 3600, mode: "box", unit_of_measurement: "s" } },
  },
  { name: "show_gauge", selector: { boolean: {} } },
  { name: "show_radar", selector: { boolean: {} } },
  { name: "show_best_time", selector: { boolean: {} } },
  { name: "show_updated", selector: { boolean: {} } },
  { name: "transparent", selector: { boolean: {} } },
  { name: "tiles", selector: { select: { multiple: true, mode: "list", options: TILE_OPTIONS } } },
];

const LABELS: Record<string, string> = {
  title: "Titel (optional)",
  update_interval: "Aktualisierungsintervall (Sekunden)",
  show_gauge: "Gauge anzeigen",
  show_radar: "Radar (Spider) anzeigen",
  show_best_time: "Beste Zeit heute anzeigen",
  show_updated: "Aktualisierungs-Zeit anzeigen",
  transparent: "Transparenter Hintergrund",
  tiles: "Kacheln (Parameter)",
};

@customElement("aarestation-card-editor")
export class AarestationCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config: AarestationCardConfig = { type: "" };

  public setConfig(config: AarestationCardConfig): void {
    this._config = config;
  }

  protected render(): TemplateResult {
    const data = {
      show_gauge: true,
      show_radar: false,
      show_best_time: true,
      show_updated: true,
      transparent: false,
      tiles: [],
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
    ev.stopPropagation();
    const config = { ...this._config, ...(ev.detail.value as AarestationCardConfig) };
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }
}

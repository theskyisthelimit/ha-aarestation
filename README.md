<p align="center">
  <img src="images/icon.png" alt="Aarestation" width="120" />
</p>

<h1 align="center">Aarestation Card</h1>

<p align="center">
  <a href="https://hacs.xyz"><img src="https://img.shields.io/badge/HACS-Custom-41BDF5.svg" alt="HACS Custom" /></a>
</p>

Eine Home-Assistant-Lovelace-Karte für **[aarestation.ch](https://aarestation.ch)** – zeigt den **PAI-Score** der Aare in Bern als bekanntes Rainbow-Gauge, dazu die beste Badezeit heute.

Die Karte holt ihre Daten direkt von der API (`https://aarestation.ch/api/dashboard`) – **keine Integration, kein API-Key, keine Sensoren** nötig.

> 🔌 **Lieber echte Sensoren?**
> Die **[Aarestation Integration](https://github.com/theskyisthelimit/ha-aarestation-integration)**
> liefert den PAI als `sensor.aarestation_pai` (State = Score, alle Werte als Attribute) –
> server-seitig gepollt, nutzbar in Automationen, History und Statistik. Diese Karte
> funktioniert auch ohne Integration; beides lässt sich kombinieren.


## Features

- 🌈 Das bekannte **PAI-Score-Gauge** (1–10), pixelgenau wie auf aarestation.ch
- 🕸️ **Radar / Spider** der 6 PAI-Faktoren (Lufttemperatur, Wind, UV, Aaretemperatur, Abfluss, Luftfeuchte)
- 🔲 **Parameter-Kacheln** – jeder Wert (Wassertemp, Abfluss, Pegel, Wind, UV, AQI …) einzeln zuschaltbar
- ☀️ **Beste Zeit heute** – Stunde mit dem höchsten PAI-Score des Tages
- 🕐 Zeitpunkt der letzten Aktualisierung
- 👻 **Transparenter Modus** – fügt sich ohne Karten-Hintergrund ins Dashboard ein
- ⚙️ Alles per **GUI-Editor** ein-/ausschaltbar

## Installation

### Via HACS (empfohlen)

1. HACS öffnen → oben rechts **⋮** → **Benutzerdefinierte Repositories**.
2. Repository-URL eintragen: `https://github.com/theskyisthelimit/ha-aarestation`
3. Kategorie: **Dashboard** (Plugin) → **Hinzufügen**.
4. „Aarestation Card“ suchen, installieren. Die Lovelace-Ressource wird automatisch registriert.
5. Browser-Cache leeren / Seite neu laden.

### Manuell

1. `aarestation-card.js` aus dem [neuesten Release](https://github.com/theskyisthelimit/ha-aarestation/releases) herunterladen.
2. Nach `<config>/www/aarestation-card.js` kopieren.
3. Als Ressource registrieren: **Einstellungen → Dashboards → ⋮ → Ressourcen → Hinzufügen**
   - URL: `/local/aarestation-card.js`
   - Typ: **JavaScript-Modul**

## Verwendung

Karte zum Dashboard hinzufügen (Karten-Picker → „Aarestation Card“) oder per YAML:

```yaml
type: custom:aarestation-card
show_gauge: true
show_radar: false
show_best_time: true
show_updated: true
transparent: false
tiles:
  - aare_temp
  - aareflow
  - air_temp
  - uv_index
```

## Konfigurationsoptionen

Alles ist auch im **visuellen Editor** ein- und ausschaltbar.

| Option            | Typ      | Default  | Beschreibung                                                   |
| ----------------- | -------- | -------- | ------------------------------------------------------------- |
| `type`            | string   | –        | `custom:aarestation-card` (erforderlich)                      |
| `title`           | string   | –        | Optionale Überschrift                                          |
| `update_interval` | number   | `300`    | Aktualisierungsintervall in Sekunden (min. `60`)              |
| `show_gauge`      | boolean  | `true`   | PAI-Score-Gauge anzeigen                                       |
| `show_radar`      | boolean  | `false`  | Radar/Spider der 6 PAI-Faktoren anzeigen                       |
| `show_best_time`  | boolean  | `true`   | Pill „Beste Zeit heute“ anzeigen                               |
| `show_updated`    | boolean  | `true`   | Zeile „Aktualisiert HH:MM“ anzeigen                            |
| `transparent`     | boolean  | `false`  | Karten-Hintergrund transparent (ins Dashboard einfügen)       |
| `tiles`           | string[] | `[]`     | Liste der Parameter-Kacheln (siehe unten)                     |

### Verfügbare Kacheln (`tiles`)

`aare_temp` (Aaretemperatur), `aareflow` (Abfluss), `aarelevel` (Pegel), `air_temp` (Lufttemperatur), `air_temp_feels` (Gefühlt), `wind_speed` (Wind), `humidity` (Luftfeuchte), `uv_index` (UV-Index), `air_pressure` (Luftdruck), `cloud_coverage` (Bewölkung), `rain_today` (Regen heute), `aqi` (Luftqualität).

> „Beste Zeit heute“ ist die Stunde mit dem höchsten prognostizierten PAI-Score des aktuellen Tages (Zeitzone Europe/Zurich). Das Radar zeigt die PAI-Teil-Scores (0–10) je Faktor.

## Entwicklung

```bash
npm ci
npm run build    # erzeugt dist/aarestation-card.js
npm run watch    # Build im Watch-Modus
npm run lint     # TypeScript Type-Check
```

## Lizenz

[MIT](LICENSE)

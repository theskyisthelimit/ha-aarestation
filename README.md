<p align="center">
  <img src="images/icon.png" alt="Aarestation" width="120" />
</p>

<h1 align="center">Aarestation Card</h1>

<p align="center">
  <a href="https://hacs.xyz"><img src="https://img.shields.io/badge/HACS-Custom-41BDF5.svg" alt="HACS Custom" /></a>
</p>

Eine Home-Assistant-Lovelace-Karte für **[aarestation.ch](https://aarestation.ch)** – zeigt den **PAI-Score** der Aare in Bern als bekanntes Rainbow-Gauge, dazu die beste Badezeit heute.

Die Karte holt ihre Daten direkt von der API (`https://aarestation.ch/api/dashboard`) – **keine Integration, kein API-Key, keine Sensoren** nötig.


## Features

- 🌈 Das bekannte **PAI-Score-Gauge** (1–10), pixelgenau wie auf aarestation.ch
- ☀️ **Beste Zeit heute** – Stunde mit dem höchsten PAI-Score des Tages
- 🕐 Zeitpunkt der letzten Aktualisierung
- ⚙️ Visueller Konfigurations-Editor
- 🎨 Dunkles Aarestation-Design, Home-Assistant-Systemschrift

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
update_interval: 300
show_best_time: true
show_updated: true
```

## Konfigurationsoptionen

| Option            | Typ     | Default                                  | Beschreibung                                            |
| ----------------- | ------- | ---------------------------------------- | ------------------------------------------------------- |
| `type`            | string  | –                                        | `custom:aarestation-card` (erforderlich)                |
| `title`           | string  | – (kein Titel)                           | Optionale Überschrift über dem Gauge                    |
| `update_interval` | number  | `300`                                    | Aktualisierungsintervall in Sekunden (min. `60`)        |
| `show_best_time`  | boolean | `true`                                   | Pill „Beste Zeit heute“ anzeigen                        |
| `show_updated`    | boolean | `true`                                   | Zeile „Aktualisiert HH:MM“ anzeigen                     |
| `api_url`         | string  | `https://aarestation.ch/api/dashboard`   | API-Endpunkt (für Self-Hosting überschreibbar)          |

> Der Default von 300s ist bewusst sparsam gewählt. „Beste Zeit heute“ ist die Stunde mit dem höchsten prognostizierten PAI-Score des aktuellen Tages (Zeitzone Europe/Zurich).

## Entwicklung

```bash
npm ci
npm run build    # erzeugt dist/aarestation-card.js
npm run watch    # Build im Watch-Modus
npm run lint     # TypeScript Type-Check
```

## Lizenz

[MIT](LICENSE)

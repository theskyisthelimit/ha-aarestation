// Keep CARD_VERSION in sync with package.json on release.
export const CARD_VERSION = "1.1.1";
export const CARD_TYPE = "aarestation-card";
// The dashboard endpoint is cross-origin enabled and exposes the forecast
// timeline + highscore needed for the "Beste Zeit heute" pill.
export const DEFAULT_API_URL = "https://aarestation.ch/api/dashboard";
export const DEFAULT_UPDATE_INTERVAL = 300; // seconds
export const MIN_UPDATE_INTERVAL = 60; // seconds (respects upstream cache / rate limit)
export const SOURCE_URL = "https://aarestation.ch";
export const TIMEZONE = "Europe/Zurich";

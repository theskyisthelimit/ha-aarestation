// Type definitions for the aarestation dashboard API and card config.

/** A single timeline entry from forecasts.timeline (subset we use). */
export interface TimelineEntry {
  datetime: string; // ISO 8601 (UTC)
  pai_score: number;
}

/** Subset of GET https://aarestation.ch/api/dashboard that the card consumes. */
export interface DashboardData {
  pai: {
    scores: {
      score: number; // current PAI score, 1..10
      score_forecast: number;
    };
    system_info: {
      datetime: string; // "HH:MM" local time of last update
    };
  };
  forecasts?: {
    timeline?: TimelineEntry[];
  };
  highscore?: {
    score: number;
    date: string;
    time: string;
  };
}

/** Best PAI hour of the current day, derived from the forecast timeline. */
export interface BestTime {
  time: string; // "HH:MM" local (Europe/Zurich)
  score: number;
}

/** Lovelace card configuration. */
export interface AarestationCardConfig {
  type: string;
  title?: string; // optional header; omitted by default (gauge-only)
  update_interval?: number; // seconds
  show_best_time?: boolean;
  show_updated?: boolean;
  api_url?: string;
}

/** Minimal subset of the Home Assistant frontend object we rely on. */
export interface HomeAssistant {
  language: string;
}

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }
}

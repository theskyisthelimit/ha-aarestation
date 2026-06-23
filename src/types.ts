// Type definitions for the aarestation dashboard API and card config.

/** A single timeline entry from forecasts.timeline (subset we use). */
export interface TimelineEntry {
  datetime: string; // ISO 8601 (UTC)
  pai_score: number;
}

/** Subset of GET https://aarestation.ch/api/dashboard that the card consumes. */
export interface DashboardData {
  pai: {
    environmental_variables?: {
      air_temp?: number;
      air_temp_feels?: number;
      wind_speed?: number;
      humidity?: number;
      uv_index?: number;
      air_pressure_qnh?: number;
      cloud_coverage?: number;
      rain_today?: number;
      wetter?: string;
    };
    aare_river_variables?: {
      aareflow?: number;
      aare_temp?: number;
      aarelevel?: number;
    };
    air_quality?: {
      aqi?: number;
    };
    parameters?: {
      // Per-factor PAI sub-scores (0..10) used by the radar.
      pai_parameters?: {
        air_temp?: number;
        wind_speed?: number;
        humidity?: number;
        aareflow?: number;
        uv_index?: number;
        aare_temp?: number;
      };
    };
    scores: {
      score: number; // current PAI score, 1..10
      score_forecast?: number;
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
  title?: string;
  update_interval?: number; // seconds
  transparent?: boolean;
  show_gauge?: boolean;
  show_best_time?: boolean;
  show_updated?: boolean;
  show_radar?: boolean;
  tiles?: string[]; // parameter keys to render as tiles
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

import type { DashboardData } from "./types";

export interface TileDef {
  key: string;
  label: string;
  unit: string;
  decimals: number;
  icon: string; // key into icons.ts tileIcon()
  get: (d: DashboardData) => number | undefined;
}

// All parameters the user can surface as a tile. Order = display order.
export const TILE_DEFS: TileDef[] = [
  { key: "aare_temp", label: "Aaretemperatur", unit: "°C", decimals: 1, icon: "waves", get: (d) => d.pai.aare_river_variables?.aare_temp },
  { key: "aareflow", label: "Abfluss", unit: "m³/s", decimals: 0, icon: "activity", get: (d) => d.pai.aare_river_variables?.aareflow },
  { key: "aarelevel", label: "Pegel", unit: "m", decimals: 2, icon: "level", get: (d) => d.pai.aare_river_variables?.aarelevel },
  { key: "air_temp", label: "Lufttemperatur", unit: "°C", decimals: 1, icon: "thermometer", get: (d) => d.pai.environmental_variables?.air_temp },
  { key: "air_temp_feels", label: "Gefühlt", unit: "°C", decimals: 1, icon: "thermometer", get: (d) => d.pai.environmental_variables?.air_temp_feels },
  { key: "wind_speed", label: "Wind", unit: "m/s", decimals: 0, icon: "wind", get: (d) => d.pai.environmental_variables?.wind_speed },
  { key: "humidity", label: "Luftfeuchte", unit: "%", decimals: 0, icon: "droplets", get: (d) => d.pai.environmental_variables?.humidity },
  { key: "uv_index", label: "UV-Index", unit: "", decimals: 0, icon: "sun", get: (d) => d.pai.environmental_variables?.uv_index },
  { key: "air_pressure", label: "Luftdruck", unit: "hPa", decimals: 0, icon: "gauge", get: (d) => d.pai.environmental_variables?.air_pressure_qnh },
  { key: "cloud_coverage", label: "Bewölkung", unit: "%", decimals: 0, icon: "cloud", get: (d) => d.pai.environmental_variables?.cloud_coverage },
  { key: "rain_today", label: "Regen heute", unit: "mm", decimals: 1, icon: "rain", get: (d) => d.pai.environmental_variables?.rain_today },
  { key: "aqi", label: "Luftqualität", unit: "AQI", decimals: 0, icon: "leaf", get: (d) => d.pai.air_quality?.aqi },
];

export const TILE_MAP: Record<string, TileDef> = Object.fromEntries(TILE_DEFS.map((t) => [t.key, t]));

import type { BestTime, DashboardData, TimelineEntry } from "./types";
import { TIMEZONE } from "./const";

/**
 * Fetch the dashboard payload from aarestation.ch.
 * Aborts after `timeoutMs` to avoid hanging the card on a slow network.
 */
export async function fetchDashboard(
  url: string,
  timeoutMs = 8000
): Promise<DashboardData> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return (await res.json()) as DashboardData;
  } finally {
    clearTimeout(timer);
  }
}

const dateFmt = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIMEZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const timeFmt = new Intl.DateTimeFormat("de-CH", {
  timeZone: TIMEZONE,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/**
 * Pick the hour of *today* (Europe/Zurich) with the highest PAI score from the
 * forecast timeline. Returns undefined if no entries fall on the current day.
 */
export function bestTimeToday(timeline: TimelineEntry[] | undefined): BestTime | undefined {
  if (!timeline?.length) {
    return undefined;
  }
  const todayStr = dateFmt.format(new Date());
  let best: BestTime | undefined;
  for (const entry of timeline) {
    const d = new Date(entry.datetime);
    if (Number.isNaN(d.getTime()) || typeof entry.pai_score !== "number") {
      continue;
    }
    if (dateFmt.format(d) !== todayStr) {
      continue;
    }
    if (!best || entry.pai_score > best.score) {
      best = { time: timeFmt.format(d), score: entry.pai_score };
    }
  }
  return best;
}

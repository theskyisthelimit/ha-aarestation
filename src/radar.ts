import { svg, type SVGTemplateResult } from "lit";
import { getColorFromScore } from "./gauge";
import type { DashboardData } from "./types";

// Ported 1:1 from aarestation.ch components/dashboard/pai-radar.tsx.
export const RADAR_INDICATORS = ["Lufttemperatur", "Wind", "UV-Index", "Aaretemperatur", "Abfluss", "Luftfeuchte"];
const MAX_VALUE = 10;
const RING_COUNT = 5;
const CX = 180;
const CY = 150;
const RADIUS = 104;

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

function polar(r: number, angleDeg: number): { x: number; y: number } {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function pointsAttr(points: Array<{ x: number; y: number }>): string {
  return points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
}

/** Extract the 6 PAI sub-scores in the order the radar expects. */
export function radarValues(d: DashboardData): number[] {
  const p = d.pai.parameters?.pai_parameters ?? {};
  return [p.air_temp ?? 0, p.wind_speed ?? 0, p.uv_index ?? 0, p.aare_temp ?? 0, p.aareflow ?? 0, p.humidity ?? 0];
}

export function renderRadar(values: number[]): SVGTemplateResult {
  const axisCount = RADAR_INDICATORS.length;
  const angles = RADAR_INDICATORS.map((_, i) => -90 + (360 / axisCount) * i);
  const clamped = RADAR_INDICATORS.map((_, i) => {
    const v = values[i];
    return Math.max(0, Math.min(MAX_VALUE, Number.isFinite(v) ? v : 0));
  });
  const vertices = clamped.map((v, i) => polar((RADIUS * v) / MAX_VALUE, angles[i]));
  const colors = clamped.map((v) => getColorFromScore(Math.max(1, v)));
  const average = clamped.reduce((s, v) => s + v, 0) / (clamped.length || 1);
  const fillColor = hexToRgba(getColorFromScore(Math.max(1, average)), 0.16);

  const rings = Array.from({ length: RING_COUNT }, (_, level) => ({
    points: pointsAttr(angles.map((a) => polar((RADIUS * (level + 1)) / RING_COUNT, a))),
    shaded: level % 2 === 0,
  }));

  return svg`
    <svg viewBox="0 0 360 300" role="img" aria-label="PAI Parameter Radar">
      <defs>
        ${vertices.map((v, i) => {
          const next = vertices[(i + 1) % axisCount];
          return svg`<linearGradient id="radar-edge-${i}" gradientUnits="userSpaceOnUse"
            x1=${v.x} y1=${v.y} x2=${next.x} y2=${next.y}>
            <stop offset="0%" stop-color=${colors[i]} />
            <stop offset="100%" stop-color=${colors[(i + 1) % axisCount]} />
          </linearGradient>`;
        })}
      </defs>
      ${rings.map(
        (ring) => svg`<polygon points=${ring.points}
          fill=${ring.shaded ? "rgba(15,23,42,0.35)" : "rgba(15,23,42,0.18)"}
          stroke="rgba(148,163,184,0.28)" stroke-width="1" />`
      )}
      ${angles.map((a) => {
        const tip = polar(RADIUS, a);
        return svg`<line x1=${CX} y1=${CY} x2=${tip.x} y2=${tip.y} stroke="rgba(148,163,184,0.25)" stroke-width="1" />`;
      })}
      <polygon points=${pointsAttr(vertices)} fill=${fillColor} stroke="none" />
      ${vertices.map((v, i) => {
        const next = vertices[(i + 1) % axisCount];
        return svg`<line x1=${v.x} y1=${v.y} x2=${next.x} y2=${next.y}
          stroke="url(#radar-edge-${i})" stroke-width="1.6" stroke-linecap="round" />`;
      })}
      ${angles.map((a, i) => {
        const label = polar(RADIUS + 22, a);
        const cos = Math.cos((a * Math.PI) / 180);
        const sin = Math.sin((a * Math.PI) / 180);
        const anchor = cos > 0.3 ? "start" : cos < -0.3 ? "end" : "middle";
        const baseline = sin > 0.3 ? "hanging" : sin < -0.3 ? "auto" : "central";
        return svg`<text x=${label.x} y=${label.y} font-size="12" font-weight="600"
          fill="rgba(241,245,249,0.95)" text-anchor=${anchor} dominant-baseline=${baseline}>
          ${RADAR_INDICATORS[i]}
        </text>`;
      })}
    </svg>
  `;
}

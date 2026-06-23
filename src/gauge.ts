import { svg, type SVGTemplateResult } from "lit";

// Ported 1:1 from aarestation.ch components/dashboard/pai-gauge.tsx so the card
// matches the site's gauge pixel-for-pixel.
const GAUGE_MIN = 1;
const GAUGE_MAX = 10;
const START_ANGLE = 135;
const SWEEP = 270;
const CX = 160;
const CY = 146;
const RADIUS = 104;
const TRACK_WIDTH = 16;

// scoreColorRanges from lib/dashboard-helpers.ts (blue → green).
const RANGES: Array<{ min: number; max: number; color: string }> = [
  { min: 1, max: 2, color: "#066fd1" },
  { min: 2, max: 3, color: "#4263eb" },
  { min: 3, max: 4, color: "#ae3ec9" },
  { min: 4, max: 5, color: "#d6336c" },
  { min: 5, max: 6, color: "#d63939" },
  { min: 6, max: 7, color: "#f76707" },
  { min: 7, max: 8, color: "#f59f00" },
  { min: 8, max: 9, color: "#74b816" },
  { min: 9, max: 10, color: "#2fb344" },
];

function clampScore(score: number): number {
  if (!Number.isFinite(score)) return GAUGE_MIN;
  return Math.min(GAUGE_MAX, Math.max(GAUGE_MIN, score));
}

export function getColorFromScore(score: number): string {
  const n = clampScore(score);
  for (let i = 0; i < RANGES.length; i += 1) {
    const r = RANGES[i];
    const isLast = i === RANGES.length - 1;
    if (n >= r.min && (n < r.max || (isLast && n <= r.max))) {
      return r.color;
    }
  }
  return RANGES[RANGES.length - 1].color;
}

function polar(r: number, angleDeg: number): { x: number; y: number } {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function angleForValue(value: number): number {
  const c = clampScore(value);
  return START_ANGLE + (SWEEP * (c - GAUGE_MIN)) / (GAUGE_MAX - GAUGE_MIN);
}

function arcPath(r: number, startDeg: number, endDeg: number): string {
  const a = polar(r, startDeg);
  const b = polar(r, endDeg);
  const largeArc = endDeg - startDeg <= 180 ? 0 : 1;
  return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
}

/** Render the PAI gauge SVG for a given score (1..10). */
export function renderGauge(score: number): SVGTemplateResult {
  const rounded = Number(clampScore(score).toFixed(1));
  const color = getColorFromScore(rounded);
  const marker = polar(RADIUS, angleForValue(rounded));

  const segments = RANGES.map((range, index) => {
    const segMin = index === 0 ? GAUGE_MIN : RANGES[index - 1].max;
    return { color: range.color, start: angleForValue(segMin), end: angleForValue(range.max) };
  });
  const ends = [segments[0], segments[segments.length - 1]];
  const inner = segments.slice(1, -1);
  const ticks = Array.from({ length: GAUGE_MAX - GAUGE_MIN + 1 }, (_, i) => GAUGE_MIN + i);

  return svg`
    <svg viewBox="0 0 320 250" role="img" aria-label="PAI-Score ${rounded.toFixed(1)} von 10">
      <path
        d=${arcPath(RADIUS, START_ANGLE, START_ANGLE + SWEEP)}
        fill="none" stroke="rgba(148,163,184,0.18)"
        stroke-width=${TRACK_WIDTH} stroke-linecap="round"
      />
      ${ends.map(
        (s) => svg`<path d=${arcPath(RADIUS, s.start, s.end)} fill="none"
          stroke=${s.color} stroke-width=${TRACK_WIDTH} stroke-linecap="round" />`
      )}
      ${inner.map(
        (s) => svg`<path d=${arcPath(RADIUS, s.start, s.end)} fill="none"
          stroke=${s.color} stroke-width=${TRACK_WIDTH} />`
      )}
      ${ticks.map((tick) => {
        const a = angleForValue(tick);
        const i = polar(RADIUS + TRACK_WIDTH / 2 + 2, a);
        const o = polar(RADIUS + TRACK_WIDTH / 2 + 8, a);
        const l = polar(RADIUS + TRACK_WIDTH / 2 + 20, a);
        return svg`<g>
          <line x1=${i.x} y1=${i.y} x2=${o.x} y2=${o.y} stroke="rgba(226,232,240,0.45)" stroke-width="1.3" />
          <text x=${l.x} y=${l.y} font-size="12" fill="rgba(226,232,240,0.82)"
            text-anchor="middle" dominant-baseline="central">${tick}</text>
        </g>`;
      })}
      <circle cx=${marker.x} cy=${marker.y} r="9" fill=${color}
        stroke="rgba(241,245,249,0.95)" stroke-width="2.5" />
      <text x=${CX} y=${CY + 12} font-size="52" font-weight="700" fill=${color} text-anchor="middle">
        ${rounded.toFixed(1)}
      </text>
      <text x=${CX} y=${CY + 40} font-size="15" fill="rgba(226,232,240,0.85)" text-anchor="middle">
        PAI
      </text>
    </svg>
  `;
}

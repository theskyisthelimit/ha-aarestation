import { svg, type SVGTemplateResult } from "lit";

// Inline icons (lucide-style) so the card has no runtime icon dependency.
// All inherit `currentColor`.

function wrap(inner: SVGTemplateResult, size = 16): SVGTemplateResult {
  return svg`<svg viewBox="0 0 24 24" width=${size} height=${size} fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
}

export function sunIcon(): SVGTemplateResult {
  return wrap(
    svg`<circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />`,
    15
  );
}

export function clockIcon(): SVGTemplateResult {
  return wrap(svg`<circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />`, 13);
}

const PATHS: Record<string, SVGTemplateResult> = {
  thermometer: svg`<path d="M14 14.76V5a2 2 0 0 0-4 0v9.76a4 4 0 1 0 4 0z" />`,
  wind: svg`<path d="M3 8h11a3 3 0 1 0-3-4M3 16h15a3 3 0 1 1-3 4M3 12h7" />`,
  droplets: svg`<path d="M12 3s5 5.5 5 9a5 5 0 0 1-10 0c0-3.5 5-9 5-9z" />`,
  waves: svg`<path d="M2 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />`,
  activity: svg`<path d="M22 12h-4l-3 8-6-16-3 8H2" />`,
  level: svg`<path d="M3 6h18M3 12h18M3 18h18" /><circle cx="8" cy="6" r="1.4" /><circle cx="15" cy="18" r="1.4" />`,
  gauge: svg`<path d="M12 14l4-4" /><path d="M4 18a8 8 0 1 1 16 0" />`,
  cloud: svg`<path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.6 1.5A3.5 3.5 0 0 0 6.5 19z" />`,
  rain: svg`<path d="M17.5 14a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.6 1.5A3.5 3.5 0 0 0 6.5 14" /><path d="M8 17v2M12 17v3M16 17v2" />`,
  leaf: svg`<path d="M11 20A7 7 0 0 1 4 13c0-6 8-9 16-9 0 8-3 16-9 16z" /><path d="M4 20c4-4 8-6 12-7" />`,
};

export function tileIcon(name: string): SVGTemplateResult {
  return wrap(PATHS[name] ?? PATHS.gauge, 16);
}

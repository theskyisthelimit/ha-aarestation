import { svg, type SVGTemplateResult } from "lit";

// Inline icons (lucide-style) so the card has no runtime icon dependency.
// Both inherit `currentColor`.

export function sunIcon(): SVGTemplateResult {
  return svg`<svg viewBox="0 0 24 24" width="15" height="15" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>`;
}

export function clockIcon(): SVGTemplateResult {
  return svg`<svg viewBox="0 0 24 24" width="13" height="13" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>`;
}

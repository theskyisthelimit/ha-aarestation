import { css } from "lit";

// Dark aarestation look, but type uses the Home Assistant system font (no
// external font request) so it blends into the dashboard.
export const cardStyles = css`
  :host {
    --aare-bg: #091426;
    --aare-fg: #f0f4f8;
    --aare-muted: #9fb3c8;
    --aare-border: rgba(148, 163, 184, 0.25);
    --aare-radius: 0.85rem;
    font-family: var(--ha-font-family-body, var(--mdc-typography-font-family, Roboto, system-ui, sans-serif));
  }

  ha-card {
    display: block;
    background:
      radial-gradient(900px circle at 4% -20%, rgba(44, 119, 191, 0.28) 0%, rgba(44, 119, 191, 0) 50%),
      radial-gradient(700px circle at 100% -25%, rgba(16, 176, 163, 0.22) 0%, rgba(16, 176, 163, 0) 52%),
      linear-gradient(158deg, var(--aare-bg) 0%, #0e1f36 55%, #163055 100%);
    color: var(--aare-fg);
    border-radius: var(--aare-radius);
    overflow: hidden;
    padding: 12px 16px 16px;
  }

  /* Transparent mode: blend into the dashboard, no card surface. */
  ha-card.transparent {
    background: transparent;
    border: none;
    box-shadow: none;
  }

  .title {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 4px 2px 8px;
  }

  .gauge,
  .radar {
    width: 100%;
    max-width: 340px;
    margin: 0 auto;
  }
  .gauge svg,
  .radar svg {
    display: block;
    width: 100%;
    height: auto;
  }
  .radar {
    margin-top: 4px;
  }

  .pill {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin: 2px auto 0;
    padding: 9px 16px;
    width: fit-content;
    max-width: 100%;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--aare-border);
    font-size: 0.92rem;
    font-weight: 500;
  }
  .pill .ico {
    display: inline-flex;
    flex: 0 0 auto;
  }
  .pill .dim {
    color: var(--aare-muted);
    font-weight: 400;
  }

  .tiles {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(118px, 1fr));
    gap: 10px;
    margin-top: 14px;
  }
  .tile {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--aare-border);
    border-radius: var(--aare-radius);
    padding: 10px 12px;
  }
  .tile-label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.72rem;
    color: var(--aare-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .tile-label .ico {
    display: inline-flex;
    color: #38bdf8;
  }
  .tile-value {
    font-size: 1.3rem;
    font-weight: 600;
    margin-top: 4px;
  }
  .tile-unit {
    font-size: 0.82rem;
    color: var(--aare-muted);
    margin-left: 3px;
  }

  .updated {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 12px;
    color: var(--aare-muted);
    font-size: 0.8rem;
  }
  .updated .ico {
    display: inline-flex;
  }

  .state {
    padding: 40px 16px;
    text-align: center;
    color: var(--aare-muted);
  }
  .state button {
    margin-top: 12px;
    background: #38bdf8;
    color: var(--aare-bg);
    border: none;
    border-radius: 999px;
    padding: 6px 16px;
    font-family: inherit;
    font-weight: 600;
    cursor: pointer;
  }
`;

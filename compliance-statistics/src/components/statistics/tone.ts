import type { Tone } from "@/components/statistics/metric-tile";

/** Maps a semantic tone to the CSS custom property used for chart fills. */
export const TONE_COLOR: Record<Tone, string> = {
  default: "var(--foreground)",
  success: "var(--success)",
  info: "var(--info)",
  warning: "var(--warning)",
  danger: "var(--danger)",
  planned: "var(--planned)",
  other: "var(--other)",
};

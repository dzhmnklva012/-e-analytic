import { cn } from "@/lib/utils";
import { formatNumber, percent } from "@/lib/format";
import { TONE_COLOR } from "@/components/statistics/tone";
import type { Tone } from "@/components/statistics/metric-tile";

export interface ProportionDatum {
  key: string;
  label: string;
  value: number;
  tone: Tone;
}

export interface ProportionBarProps {
  data: ProportionDatum[];
  /** Headline shown above the bar (e.g. "Всего задач"). */
  totalLabel?: string;
  className?: string;
}

/**
 * Thin segmented proportion bar with a total and a legend list of value + share
 * — the ADATA chart grammar (no pie/donut). Accessible: the bar is a labelled
 * img, the legend carries the real numbers as text.
 */
export function ProportionBar({ data, totalLabel, className }: ProportionBarProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const summary = data.map((d) => `${d.label}: ${d.value}`).join(", ");

  return (
    <div className={cn("space-y-4", className)}>
      {totalLabel && (
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {totalLabel}
          </p>
          <p className="text-xl font-semibold leading-none tabular-nums text-foreground">
            {formatNumber(total)}
          </p>
        </div>
      )}

      <div
        className="flex h-2.5 w-full gap-0.5 overflow-hidden rounded-full bg-muted"
        role="img"
        aria-label={summary}
      >
        {data.map((d) => (
          <div
            key={d.key}
            className="h-full first:rounded-l-full last:rounded-r-full"
            style={{
              width: `${percent(d.value, total)}%`,
              backgroundColor: TONE_COLOR[d.tone],
            }}
          />
        ))}
      </div>

      <ul className="space-y-2" aria-hidden>
        {data.map((d) => (
          <li key={d.key} className="flex items-center gap-2.5 text-xs">
            <span
              className="size-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: TONE_COLOR[d.tone] }}
            />
            <span className="min-w-0 flex-1 truncate text-muted-foreground">
              {d.label}
            </span>
            <span className="shrink-0 font-semibold tabular-nums text-foreground">
              {formatNumber(d.value)}
            </span>
            <span className="w-9 shrink-0 text-right tabular-nums text-muted-foreground">
              {percent(d.value, total)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

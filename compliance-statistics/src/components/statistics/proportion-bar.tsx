import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatNumber, percent } from "@/lib/format";
import { StatChip } from "@/components/statistics/stat-chip";
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
  /** Headline shown above the total (e.g. "Всего расследований"). */
  totalLabel?: string;
  /** Signed period-over-period change in percent (e.g. -5). */
  delta?: number;
  /** Whether an increase reads as positive (drives delta color). Default true. */
  deltaGoodWhenUp?: boolean;
  className?: string;
}

/**
 * Case-flow summary (the ADATA chart grammar — no pie/donut): a prominent total
 * with an optional trend delta, a segmented proportion bar that shows the split
 * by share, and a grid of per-status stat chips carrying the counts and shares.
 * Accessible: the bar is a labelled img and the chips repeat the numbers as text.
 */
export function ProportionBar({
  data,
  totalLabel,
  delta,
  deltaGoodWhenUp = true,
  className,
}: ProportionBarProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const summary = data.map((d) => `${d.label}: ${d.value}`).join(", ");

  const hasDelta = typeof delta === "number";
  const up = (delta ?? 0) >= 0;
  const good = up === deltaGoodWhenUp;
  const TrendIcon = up ? TrendingUp : TrendingDown;

  return (
    <div className={cn("space-y-4", className)}>
      {totalLabel && (
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {totalLabel}
          </p>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-[32px] font-semibold leading-none tabular-nums text-foreground">
              {formatNumber(total)}
            </span>
            {hasDelta && (
              <span className="flex items-center gap-1 text-xs">
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 font-medium tabular-nums",
                    good ? "text-success" : "text-danger",
                  )}
                >
                  <TrendIcon className="size-3.5" aria-hidden />
                  {up ? "+" : "−"}
                  {Math.abs(delta as number)}%
                </span>
                <span className="text-muted-foreground">за период</span>
              </span>
            )}
          </div>
        </div>
      )}

      <div
        className="flex h-2 w-full gap-0.5 overflow-hidden rounded-full bg-muted"
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

      <div className="grid grid-cols-3 gap-2" aria-hidden>
        {data.map((d) => (
          <StatChip
            key={d.key}
            label={d.label}
            value={d.value}
            share={percent(d.value, total)}
            tone={d.tone}
          />
        ))}
      </div>
    </div>
  );
}

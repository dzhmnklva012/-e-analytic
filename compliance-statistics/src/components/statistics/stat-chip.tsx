import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/format";
import { TONE_COLOR } from "@/components/statistics/tone";
import type { Tone } from "@/components/statistics/metric-tile";

export interface StatChipProps {
  label: string;
  value: number;
  /** Optional share of the whole, rendered next to the value (e.g. 68). */
  share?: number;
  tone?: Tone;
  className?: string;
}

/**
 * Compact nested stat cell: a colored status dot + muted label on top, a bold
 * value with an optional percentage beneath. Sits on a subtle muted surface so
 * it reads as a card-in-a-card. Reused by the case-flow and gauge legends so
 * statuses look consistent across the dashboard. Purely presentational — the
 * surrounding chart carries the accessible summary, so this is aria-hidden.
 */
export function StatChip({
  label,
  value,
  share,
  tone = "default",
  className,
}: StatChipProps) {
  return (
    <div className={cn("rounded-lg bg-muted/50 p-3", className)}>
      <div className="flex items-start gap-1.5">
        <span
          className="mt-1 size-2 shrink-0 rounded-full"
          style={{ backgroundColor: TONE_COLOR[tone] }}
          aria-hidden
        />
        <span className="min-w-0 flex-1 hyphens-auto break-words text-xs leading-tight text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="text-xl font-semibold leading-none tabular-nums text-foreground">
          {formatNumber(value)}
        </span>
        {typeof share === "number" && (
          <span className="text-xs tabular-nums text-muted-foreground">{share}%</span>
        )}
      </div>
    </div>
  );
}

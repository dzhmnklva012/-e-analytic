import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/format";

export type Tone =
  | "default"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "planned"
  | "other";

const TONE_DOT: Record<Tone, string> = {
  default: "bg-foreground",
  success: "bg-success",
  info: "bg-info",
  warning: "bg-warning",
  danger: "bg-danger",
  planned: "bg-planned",
  other: "bg-other",
};

const TONE_ICON: Record<Tone, string> = {
  default: "bg-muted text-muted-foreground",
  success: "bg-success/10 text-success",
  info: "bg-info/10 text-info",
  warning: "bg-warning/10 text-warning",
  danger: "bg-danger/10 text-danger",
  planned: "bg-planned/10 text-planned",
  other: "bg-other/10 text-other",
};

export interface MetricTileProps {
  label: string;
  value: number;
  icon?: LucideIcon;
  tone?: Tone;
  /** Small caption under the value, e.g. "из 48". */
  hint?: string;
  /** Signed period-over-period change in percent (e.g. 14 or -12). */
  delta?: number;
  /** Whether an increase is a good thing (drives delta color). Default true. */
  deltaGoodWhenUp?: boolean;
  /** Show a colored status dot before the label. */
  showDot?: boolean;
  className?: string;
}

/**
 * Compact KPI tile. Display-only — numbers use tabular figures so columns
 * stay aligned. All sizing stays on the 4px scale (12/16/28px text).
 */
export function MetricTile({
  label,
  value,
  icon: Icon,
  tone = "default",
  hint,
  showDot = false,
  className,
}: MetricTileProps) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-3 rounded-lg border bg-card p-4",
        className,
      )}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          {showDot && (
            <span
              className={cn("size-2 shrink-0 rounded-full", TONE_DOT[tone])}
              aria-hidden
            />
          )}
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
        </div>
        <p className="mt-2 text-[28px] font-semibold leading-none tabular-nums text-foreground">
          {formatNumber(value)}
        </p>
        {hint && <p className="mt-2 text-xs text-muted-foreground">{hint}</p>}
      </div>
      {Icon && (
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-md",
            TONE_ICON[tone],
          )}
          aria-hidden
        >
          <Icon className="size-4" />
        </span>
      )}
    </div>
  );
}

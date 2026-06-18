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
  /**
   * "card" (default) is a standalone white tile with ring + shadow.
   * "subtle" drops the ring/shadow and sits on a muted surface, for nesting
   * inside a SectionCard (e.g. the Подарки grid).
   */
  variant?: "card" | "subtle";
  className?: string;
}

/**
 * Compact KPI tile in the Horizon style: a soft tinted icon circle on the
 * left, label + big value on the right, optional period delta beneath.
 * Display-only — numbers use tabular figures so columns stay aligned.
 * Sizing stays on the 4px scale (12/16/24px text, 48px icon).
 */
export function MetricTile({
  label,
  value,
  icon: Icon,
  tone = "default",
  hint,
  delta,
  deltaGoodWhenUp = true,
  showDot = false,
  className,
}: MetricTileProps) {
  const hasDelta = typeof delta === "number";
  const up = (delta ?? 0) >= 0;
  const good = up === deltaGoodWhenUp;
  const TrendIcon = up ? TrendingUp : TrendingDown;
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-xl bg-card p-4 shadow-sm ring-1 ring-foreground/5",
        className,
      )}
    >
      {Icon && (
        <span
          className={cn(
            "flex size-12 shrink-0 items-center justify-center rounded-full",
            TONE_ICON[tone],
          )}
          aria-hidden
        >
          <Icon className="size-5" />
        </span>
      )}
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          {showDot && (
            <span
              className={cn("size-2 shrink-0 rounded-full", TONE_DOT[tone])}
              aria-hidden
            />
          )}
          <p className="truncate text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
        </div>
        <p className="mt-1 text-2xl font-semibold leading-tight tabular-nums text-foreground">
          {formatNumber(value)}
        </p>
        {hasDelta && (
          <p className="mt-1 flex flex-wrap items-center gap-x-1 text-xs">
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
          </p>
        )}
        {!hasDelta && hint && (
          <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
        )}
      </div>
    </div>
  );
}

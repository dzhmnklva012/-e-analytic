import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/format";
import type { Tone } from "@/components/statistics/metric-tile";

const TONE_DOT: Record<Tone, string> = {
  default: "bg-muted-foreground",
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

export interface StatRowProps {
  label: string;
  value: number | string;
  /** Lucide icon → renders a tinted chip; omit for a small colored dot. */
  icon?: LucideIcon;
  tone?: Tone;
  /** Small caption to the right of the value, e.g. "из 48". */
  sub?: string;
  /** Renders a trailing chevron to signal a drill-in affordance. */
  drillIn?: boolean;
  className?: string;
}

/**
 * ADATA-style data row: leading icon-chip or colored dot, a muted label, and a
 * right-aligned bold value. Used inside StatRowList for the summary cards.
 */
export function StatRow({
  label,
  value,
  icon: Icon,
  tone = "default",
  sub,
  drillIn = false,
  className,
}: StatRowProps) {
  return (
    <div className={cn("flex items-center gap-3 py-2", className)}>
      {Icon ? (
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-md",
            TONE_ICON[tone],
          )}
          aria-hidden
        >
          <Icon className="size-4" />
        </span>
      ) : (
        <span
          className={cn("size-2 shrink-0 rounded-full", TONE_DOT[tone])}
          aria-hidden
        />
      )}
      <span className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
        {label}
      </span>
      <span className="shrink-0 text-base font-semibold tabular-nums text-foreground">
        {typeof value === "number" ? formatNumber(value) : value}
      </span>
      {sub && <span className="shrink-0 text-xs text-muted-foreground">{sub}</span>}
      {drillIn && (
        <ChevronRight className="size-4 shrink-0 text-muted-foreground/60" aria-hidden />
      )}
    </div>
  );
}

export interface StatRowListProps {
  children: React.ReactNode;
  /** Hairline dividers between rows (matches ADATA key-value lists). */
  divided?: boolean;
  className?: string;
}

export function StatRowList({ children, divided = true, className }: StatRowListProps) {
  return (
    <div className={cn(divided && "divide-y divide-border", className)}>
      {children}
    </div>
  );
}

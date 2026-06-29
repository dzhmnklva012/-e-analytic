import { cn } from "@/lib/utils";
import type { RiskLevel } from "@/lib/screening";
import { riskMeta } from "@/lib/screening";

const toneStyles: Record<RiskLevel, string> = {
  low: "bg-risk-low/10 text-risk-low ring-risk-low/20",
  medium: "bg-risk-medium/10 text-risk-medium ring-risk-medium/20",
  high: "bg-risk-high/10 text-risk-high ring-risk-high/20",
};

export function RiskBadge({
  level,
  className,
}: {
  level: RiskLevel;
  className?: string;
}) {
  const meta = riskMeta[level];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset",
        toneStyles[level],
        className,
      )}
    >
      <span
        className={cn(
          "size-2 rounded-full",
          level === "low" && "bg-risk-low",
          level === "medium" && "bg-risk-medium",
          level === "high" && "bg-risk-high",
        )}
        aria-hidden="true"
      />
      {meta.label}
    </span>
  );
}

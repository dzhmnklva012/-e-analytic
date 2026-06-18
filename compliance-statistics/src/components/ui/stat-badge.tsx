import { Badge } from "@/components/ui/badge";

type StatBadgeProps = {
  period: string;
  value: number;
  delta: number;
};

/** Light-blue pill like "Май: 14 | -12%" shown beside a card title. */
export function StatBadge({ period, value, delta }: StatBadgeProps) {
  const sign = delta > 0 ? "+" : "";
  return (
    <Badge variant="secondary" className="gap-1 text-xs font-semibold">
      <span>
        {period}: {value}
      </span>
      <span className="opacity-40">|</span>
      <span>
        {sign}
        {delta}%
      </span>
    </Badge>
  );
}

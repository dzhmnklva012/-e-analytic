type StatBadgeProps = {
  period: string;
  value: number;
  delta: number;
};

/** Light-blue pill like "Май: 14 | -12%" shown beside a card title. */
export function StatBadge({ period, value, delta }: StatBadgeProps) {
  const sign = delta > 0 ? "+" : "";
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-lightblue px-2.5 py-1 text-xs font-semibold text-blue whitespace-nowrap">
      <span>
        {period}: {value}
      </span>
      <span className="text-blue/40">|</span>
      <span>
        {sign}
        {delta}%
      </span>
    </span>
  );
}

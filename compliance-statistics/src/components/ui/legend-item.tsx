type LegendItemProps = {
  color: string;
  label: string;
  value: string | number;
};

/** Color dot + small label with a bold value beneath (chart legends). */
export function LegendItem({ color, label, value }: LegendItemProps) {
  return (
    <li className="flex items-start gap-2">
      <span
        className="mt-[5px] size-2.5 shrink-0 rounded-full"
        style={{ backgroundColor: color }}
      />
      <div className="leading-tight">
        <div className="text-[13px] text-ink-secondary">{label}</div>
        <div className="text-[15px] font-bold text-ink">{value}</div>
      </div>
    </li>
  );
}

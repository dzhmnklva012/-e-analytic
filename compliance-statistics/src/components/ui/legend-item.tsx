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
        className="mt-1 size-2 shrink-0 rounded-full"
        style={{ backgroundColor: color }}
      />
      <div className="leading-tight">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-base font-bold text-foreground">{value}</div>
      </div>
    </li>
  );
}

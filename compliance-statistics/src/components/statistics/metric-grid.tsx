import { cn } from "@/lib/utils";

export interface MetricGridProps {
  children: React.ReactNode;
  /** Max columns on the largest breakpoint. Mobile is always 2. */
  cols?: 2 | 3 | 4 | 5;
  className?: string;
}

const COLS: Record<NonNullable<MetricGridProps["cols"]>, string> = {
  2: "",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-3 lg:grid-cols-5",
};

/** Responsive grid for MetricTile rows. 2 cols on mobile, scaling up. */
export function MetricGrid({ children, cols = 4, className }: MetricGridProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-3", COLS[cols], className)}>
      {children}
    </div>
  );
}

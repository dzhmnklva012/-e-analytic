"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { MonthlyInspections } from "@/lib/types";
import { cn } from "@/lib/utils";

// Stacks bottom→top: completed (green), in-progress + planned (coral ramp),
// overdue (red) — meaningful colors reused from the dashboard palette.
const config: ChartConfig = {
  completed: { label: "Завершено", color: "var(--success)" },
  inProgress: { label: "В процессе", color: "var(--info)" },
  planned: { label: "Запланировано", color: "var(--planned)" },
  overdue: { label: "Просрочено", color: "var(--danger)" },
};

export interface InspectionsBarProps {
  data: MonthlyInspections[];
  className?: string;
}

/** Stacked monthly column chart: inspection volume split by status. */
export function InspectionsBar({ data, className }: InspectionsBarProps) {
  const summary = data
    .map(
      (m) =>
        `${m.month}: завершено ${m.completed}, в процессе ${m.inProgress}, ` +
        `запланировано ${m.planned}, просрочено ${m.overdue}`,
    )
    .join("; ");

  return (
    <ChartContainer
      config={config}
      className={cn("h-64 w-full", className)}
      role="img"
      aria-label={`Проверки по месяцам с разбивкой по статусам. ${summary}`}
    >
      <BarChart data={data} margin={{ left: -12, right: 8, top: 8 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          className="text-xs"
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={40}
          className="text-xs"
          allowDecimals={false}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="completed"
          stackId="a"
          fill="var(--color-completed)"
          maxBarSize={48}
          isAnimationActive={false}
        />
        <Bar
          dataKey="inProgress"
          stackId="a"
          fill="var(--color-inProgress)"
          maxBarSize={48}
          isAnimationActive={false}
        />
        <Bar
          dataKey="planned"
          stackId="a"
          fill="var(--color-planned)"
          maxBarSize={48}
          isAnimationActive={false}
        />
        <Bar
          dataKey="overdue"
          stackId="a"
          fill="var(--color-overdue)"
          radius={[3, 3, 0, 0]}
          maxBarSize={48}
          isAnimationActive={false}
        />
      </BarChart>
    </ChartContainer>
  );
}

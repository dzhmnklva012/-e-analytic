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
import type { MonthlySigned } from "@/lib/types";
import { cn } from "@/lib/utils";

const config: ChartConfig = {
  signed: { label: "Подписано", color: "var(--success)" },
  unsigned: { label: "Не подписано", color: "var(--unsigned)" },
};

export interface MonthlyBarProps {
  data: MonthlySigned[];
  className?: string;
}

/** Grouped monthly bars comparing signed vs unsigned employee documents. */
export function MonthlyBar({ data, className }: MonthlyBarProps) {
  const summary = data
    .map((m) => `${m.month}: подписано ${m.signed}, не подписано ${m.unsigned}`)
    .join("; ");

  return (
    <ChartContainer
      config={config}
      className={cn("h-56 w-full", className)}
      role="img"
      aria-label={`Документы сотрудников по месяцам. ${summary}`}
    >
      <BarChart data={data} margin={{ left: -16, right: 4, top: 4 }} barGap={2}>
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
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="signed"
          fill="var(--color-signed)"
          radius={[3, 3, 0, 0]}
          isAnimationActive={false}
        />
        <Bar
          dataKey="unsigned"
          fill="var(--color-unsigned)"
          radius={[3, 3, 0, 0]}
          isAnimationActive={false}
        />
      </BarChart>
    </ChartContainer>
  );
}

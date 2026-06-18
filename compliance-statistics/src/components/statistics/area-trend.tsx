"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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

export interface AreaTrendProps {
  data: MonthlySigned[];
  className?: string;
}

/** Hero time-series: signed vs unsigned employee documents per month. */
export function AreaTrend({ data, className }: AreaTrendProps) {
  const summary = data
    .map((m) => `${m.month}: подписано ${m.signed}, не подписано ${m.unsigned}`)
    .join("; ");

  return (
    <ChartContainer
      config={config}
      className={cn("h-64 w-full", className)}
      role="img"
      aria-label={`Динамика подписания документов по месяцам. ${summary}`}
    >
      <AreaChart data={data} margin={{ left: -12, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="fillSigned" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-signed)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--color-signed)" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="fillUnsigned" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-unsigned)" stopOpacity={0.25} />
            <stop offset="95%" stopColor="var(--color-unsigned)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
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
        <Area
          dataKey="signed"
          type="monotone"
          stroke="var(--color-signed)"
          fill="url(#fillSigned)"
          strokeWidth={2}
          isAnimationActive={false}
        />
        <Area
          dataKey="unsigned"
          type="monotone"
          stroke="var(--color-unsigned)"
          fill="url(#fillUnsigned)"
          strokeWidth={2}
          isAnimationActive={false}
        />
      </AreaChart>
    </ChartContainer>
  );
}

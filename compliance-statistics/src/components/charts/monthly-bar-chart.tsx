"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { employeeFiles } from "@/lib/data";

const axisTick = { fontSize: 10, fill: "var(--color-ink-muted)" } as const;

export function MonthlyBarChart() {
  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={employeeFiles.months}
          margin={{ top: 8, right: 4, bottom: 0, left: -10 }}
          barCategoryGap="30%"
        >
          <CartesianGrid vertical={false} stroke="var(--color-line)" />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={axisTick}
            interval={0}
            tickMargin={8}
          />
          <YAxis
            ticks={employeeFiles.ticks}
            domain={[0, 5000]}
            tickLine={false}
            axisLine={false}
            tick={axisTick}
            width={42}
          />
          <Bar
            dataKey="base"
            stackId="files"
            fill="var(--color-chart-blue)"
            isAnimationActive={false}
          />
          <Bar
            dataKey="top"
            stackId="files"
            fill="var(--color-chart-red)"
            radius={[3, 3, 0, 0]}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

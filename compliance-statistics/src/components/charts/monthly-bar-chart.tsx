"use client";

import { useEffect, useRef, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { employeeFiles } from "@/lib/data";

const HEIGHT = 260;
const axisTick = { fontSize: 12, fill: "var(--color-faint)" } as const;

export function MonthlyBarChart() {
  // Measure the container so the chart gets an explicit pixel width.
  // Avoids ResponsiveContainer's "width(-1)" pre-layout warning while
  // staying fully responsive via ResizeObserver.
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    setWidth(el.clientWidth);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full" style={{ height: HEIGHT }}>
      {width > 0 && (
        <BarChart
          width={width}
          height={HEIGHT}
          data={employeeFiles.months}
          margin={{ top: 8, right: 4, bottom: 0, left: -10 }}
          barCategoryGap="30%"
        >
          <CartesianGrid vertical={false} stroke="var(--color-border)" />
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
            fill="var(--color-chart-1)"
            isAnimationActive={false}
          />
          <Bar
            dataKey="top"
            stackId="files"
            fill="var(--color-chart-2)"
            radius={[4, 4, 0, 0]}
            isAnimationActive={false}
          />
        </BarChart>
      )}
    </div>
  );
}

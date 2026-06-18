"use client";

import { Label, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { TONE_COLOR } from "@/components/statistics/tone";
import type { Tone } from "@/components/statistics/metric-tile";
import { formatNumber, percent } from "@/lib/format";
import { cn } from "@/lib/utils";

export interface DonutDatum {
  key: string;
  label: string;
  value: number;
  tone: Tone;
}

export interface DonutStatProps {
  data: DonutDatum[];
  /** Caption shown under the total in the donut center. */
  centerLabel: string;
  className?: string;
}

/**
 * Donut chart with a centered total and a text legend listing each segment's
 * value and share. The legend carries the real numbers so the chart itself is
 * only a visual aid (role="img" with a summary label).
 */
export function DonutStat({ data, centerLabel, className }: DonutStatProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  const config: ChartConfig = Object.fromEntries(
    data.map((d) => [d.key, { label: d.label, color: TONE_COLOR[d.tone] }]),
  );

  const chartData = data.map((d) => ({
    ...d,
    fill: TONE_COLOR[d.tone],
  }));

  const summary = data.map((d) => `${d.label}: ${d.value}`).join(", ");

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-5 sm:flex-row sm:gap-6",
        className,
      )}
    >
      <ChartContainer
        config={config}
        className="aspect-square h-40 w-40 shrink-0"
        role="img"
        aria-label={`${centerLabel}: ${total}. ${summary}`}
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel nameKey="label" />}
          />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="label"
            innerRadius={52}
            outerRadius={72}
            paddingAngle={2}
            strokeWidth={2}
          >
            <Label
              content={({ viewBox }) => {
                if (!viewBox || !("cx" in viewBox)) return null;
                const { cx, cy } = viewBox as { cx: number; cy: number };
                return (
                  <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan
                      x={cx}
                      y={cy - 6}
                      className="fill-foreground text-2xl font-semibold tabular-nums"
                    >
                      {formatNumber(total)}
                    </tspan>
                    <tspan
                      x={cx}
                      y={cy + 16}
                      className="fill-muted-foreground text-xs"
                    >
                      {centerLabel}
                    </tspan>
                  </text>
                );
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>

      <ul className="w-full min-w-0 space-y-2" aria-hidden>
        {data.map((d) => (
          <li key={d.key} className="flex items-center gap-3 text-xs">
            <span
              className="size-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: TONE_COLOR[d.tone] }}
            />
            <span className="min-w-0 flex-1 truncate text-muted-foreground">
              {d.label}
            </span>
            <span className="shrink-0 font-semibold tabular-nums text-foreground">
              {formatNumber(d.value)}
            </span>
            <span className="w-9 shrink-0 text-right tabular-nums text-muted-foreground">
              {percent(d.value, total)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

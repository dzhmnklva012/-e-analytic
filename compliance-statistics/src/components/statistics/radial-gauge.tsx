"use client";

import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { TONE_COLOR } from "@/components/statistics/tone";
import type { Tone } from "@/components/statistics/metric-tile";
import { formatNumber, percent } from "@/lib/format";
import { cn } from "@/lib/utils";

export interface GaugeLegendItem {
  label: string;
  value: number;
  tone: Tone;
}

export interface RadialGaugeProps {
  /** Highlighted part (drives the arc + center %). */
  value: number;
  total: number;
  /** Caption under the center percentage. */
  centerCaption: string;
  tone?: Tone;
  legend: GaugeLegendItem[];
  className?: string;
}

/**
 * Radial compliance gauge: an arc filled to value/total with the percentage in
 * the center, plus a text legend with the underlying counts.
 */
export function RadialGauge({
  value,
  total,
  centerCaption,
  tone = "success",
  legend,
  className,
}: RadialGaugeProps) {
  const pct = percent(value, total);
  const config: ChartConfig = {
    value: { label: centerCaption, color: TONE_COLOR[tone] },
  };

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <ChartContainer
        config={config}
        className="aspect-square h-40 w-40 shrink-0"
        role="img"
        aria-label={`${centerCaption}: ${pct}% (${value} из ${total})`}
      >
        <RadialBarChart
          data={[{ name: "gauge", value: pct, fill: TONE_COLOR[tone] }]}
          startAngle={90}
          endAngle={-270}
          innerRadius={58}
          outerRadius={84}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} axisLine={false} />
          <RadialBar
            background={{ fill: "var(--muted)" }}
            dataKey="value"
            cornerRadius={9}
            isAnimationActive={false}
          />
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
            <tspan
              x="50%"
              dy="-0.3em"
              className="fill-foreground text-2xl font-semibold tabular-nums"
            >
              {pct}%
            </tspan>
            <tspan x="50%" dy="1.6em" className="fill-muted-foreground text-xs">
              {centerCaption}
            </tspan>
          </text>
        </RadialBarChart>
      </ChartContainer>

      <ul className="w-full space-y-2" aria-hidden>
        {legend.map((item) => (
          <li key={item.label} className="flex items-center gap-2.5 text-xs">
            <span
              className="size-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: TONE_COLOR[item.tone] }}
            />
            <span className="min-w-0 flex-1 truncate text-muted-foreground">
              {item.label}
            </span>
            <span className="shrink-0 font-semibold tabular-nums text-foreground">
              {formatNumber(item.value)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

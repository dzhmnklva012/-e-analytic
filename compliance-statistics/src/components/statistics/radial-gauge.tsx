"use client";

import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { StatChip } from "@/components/statistics/stat-chip";
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
  /** Optional headline above the gauge — uppercase label + the total count. */
  headlineLabel?: string;
  /** "rows" = plain legend list (default); "chips" = nested stat tiles. */
  legendVariant?: "rows" | "chips";
  className?: string;
}

/**
 * Radial compliance gauge: an arc filled to value/total with the percentage in
 * the center. An optional headline surfaces the underlying total, and the
 * legend can render either as plain rows or as nested stat chips (sharing the
 * dashboard's chip grammar).
 */
export function RadialGauge({
  value,
  total,
  centerCaption,
  tone = "success",
  legend,
  headlineLabel,
  legendVariant = "rows",
  className,
}: RadialGaugeProps) {
  const pct = percent(value, total);
  const config: ChartConfig = {
    value: { label: centerCaption, color: TONE_COLOR[tone] },
  };

  return (
    <div className={cn("flex flex-col items-center gap-5", className)}>
      {headlineLabel && (
        <div className="w-full space-y-1 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {headlineLabel}
          </p>
          <p className="text-[32px] font-semibold leading-none tabular-nums text-foreground">
            {formatNumber(total)}
          </p>
        </div>
      )}

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

      {legendVariant === "chips" ? (
        <div className="grid w-full grid-cols-2 gap-2" aria-hidden>
          {legend.map((item) => (
            <StatChip
              key={item.label}
              label={item.label}
              value={item.value}
              share={percent(item.value, total)}
              tone={item.tone}
            />
          ))}
        </div>
      ) : (
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
      )}
    </div>
  );
}

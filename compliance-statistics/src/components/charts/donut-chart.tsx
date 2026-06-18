"use client";

import { Cell, Pie, PieChart, type PieLabelRenderProps } from "recharts";

export type DonutSegment = {
  label: string;
  value: number; // percentage value (drives both arc size and the on-arc label)
  color: string;
};

type DonutChartProps = {
  segments: DonutSegment[];
  size?: number;
};

const RADIAN = Math.PI / 180;

export function DonutChart({ segments, size = 180 }: DonutChartProps) {
  return (
    <div className="shrink-0">
      <PieChart width={size} height={size}>
        <Pie
          data={segments}
          dataKey="value"
          nameKey="label"
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="100%"
          startAngle={90}
          endAngle={-270}
          paddingAngle={3}
          cornerRadius={8}
          stroke="none"
          isAnimationActive={false}
          label={renderLabel}
          labelLine={false}
        >
          {segments.map((s) => (
            <Cell key={s.label} fill={s.color} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}

function renderLabel(props: PieLabelRenderProps) {
  const cx = Number(props.cx ?? 0);
  const cy = Number(props.cy ?? 0);
  const midAngle = Number(props.midAngle ?? 0);
  const innerRadius = Number(props.innerRadius ?? 0);
  const outerRadius = Number(props.outerRadius ?? 0);
  const value = Number(props.value ?? 0);
  const r = innerRadius + (outerRadius - innerRadius) / 2;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="#ffffff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={700}
    >
      {value}%
    </text>
  );
}

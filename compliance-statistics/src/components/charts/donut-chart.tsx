"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  type PieLabelRenderProps,
} from "recharts";

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
    <div style={{ width: size, height: size }} className="shrink-0">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
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
      </ResponsiveContainer>
    </div>
  );
}

function renderLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  value: number;
}) {
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

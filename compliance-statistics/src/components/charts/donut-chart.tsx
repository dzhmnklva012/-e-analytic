"use client";

import { Cell, Pie, PieChart, type PieLabelRenderProps } from "recharts";

export type DonutSegment = {
  label: string;
  value: number; // percentage value (drives both arc size and the bubble label)
  color: string;
};

type DonutChartProps = {
  segments: DonutSegment[];
  size?: number;
};

const RADIAN = Math.PI / 180;
const BUBBLE_R = 18;

export function DonutChart({ segments, size = 200 }: DonutChartProps) {
  return (
    <div className="shrink-0">
      <PieChart width={size} height={size}>
        <Pie
          data={segments}
          dataKey="value"
          nameKey="label"
          cx="50%"
          cy="50%"
          innerRadius="44%"
          outerRadius="72%"
          startAngle={90}
          endAngle={-270}
          paddingAngle={3}
          cornerRadius={10}
          stroke="none"
          isAnimationActive={false}
          label={renderBubble}
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

/** White circular bubble sitting on the ring, showing the segment's percentage. */
function renderBubble(props: PieLabelRenderProps) {
  const cx = Number(props.cx ?? 0);
  const cy = Number(props.cy ?? 0);
  const midAngle = Number(props.midAngle ?? 0);
  const outerRadius = Number(props.outerRadius ?? 0);
  const value = Number(props.value ?? 0);
  const x = cx + outerRadius * Math.cos(-midAngle * RADIAN);
  const y = cy + outerRadius * Math.sin(-midAngle * RADIAN);
  return (
    <g style={{ filter: "drop-shadow(0 2px 5px rgba(27,26,78,0.18))" }}>
      <circle cx={x} cy={y} r={BUBBLE_R} fill="#ffffff" />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight={700}
        fill="#1b1a4e"
      >
        {value}%
      </text>
    </g>
  );
}

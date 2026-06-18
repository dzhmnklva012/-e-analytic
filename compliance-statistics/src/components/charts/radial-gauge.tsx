"use client";

import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

export type GaugeRing = {
  name: string;
  value: number; // 0-100 fill
  fill: string;
};

/** Two concentric rounded rings on a light track (Досье компании). */
export function RadialGauge({
  rings,
  size = 210,
}: {
  rings: GaugeRing[];
  size?: number;
}) {
  return (
    <div style={{ width: size, height: size }} className="shrink-0">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          data={rings}
          innerRadius="46%"
          outerRadius="100%"
          startAngle={90}
          endAngle={-270}
          barSize={13}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar
            dataKey="value"
            cornerRadius={10}
            background={{ fill: "#eceef1" }}
            isAnimationActive={false}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}

import { DonutChart } from "../charts/donut-chart";
import { LegendItem } from "../ui/legend-item";
import { SectionCard } from "../ui/section-card";
import { hotline } from "@/lib/data";

export function HotlineCard() {
  return (
    <SectionCard title="Горячая линия">
      <div className="flex flex-1 items-center gap-6">
        <DonutChart segments={hotline.segments} size={192} />
        <div className="flex flex-1 flex-col gap-4">
          <div>
            <div className="text-sm text-muted-foreground">
              {hotline.totalLabel}
            </div>
            <div className="text-[28px] font-bold leading-tight text-foreground">
              {hotline.total}
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
            {hotline.segments.map((s) => (
              <LegendItem
                key={s.label}
                color={s.color}
                label={s.label}
                value={s.count}
              />
            ))}
          </ul>
        </div>
      </div>
    </SectionCard>
  );
}

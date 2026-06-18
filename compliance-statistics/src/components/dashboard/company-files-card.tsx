import { RadialGauge } from "../charts/radial-gauge";
import { LegendItem } from "../ui/legend-item";
import { SectionCard } from "../ui/section-card";
import { TogglePills } from "../ui/toggle-pills";
import { companyFiles } from "@/lib/data";

export function CompanyFilesCard() {
  const { badge, total, withRisks, withoutRisks } = companyFiles;
  return (
    <SectionCard title="Досье компании" badge={badge}>
      <div className="mb-4">
        <TogglePills
          options={["Проверки", "Заключения"]}
          defaultValue="Заключения"
        />
      </div>
      <div className="flex flex-1 items-center justify-between gap-4">
        <RadialGauge
          rings={[
            {
              name: withoutRisks.label,
              value: withoutRisks.ring,
              fill: "var(--color-chart-1)",
            },
            {
              name: withRisks.label,
              value: withRisks.ring,
              fill: "var(--color-chart-red)",
            },
          ]}
        />
        <div className="flex flex-col gap-4 pr-2">
          <div>
            <div className="text-sm text-muted-foreground">Всего</div>
            <div className="text-[28px] font-bold leading-tight text-foreground">
              {total}
            </div>
          </div>
          <ul className="flex flex-col gap-3">
            <LegendItem
              color="var(--color-chart-red)"
              label={withRisks.label}
              value={withRisks.count}
            />
            <LegendItem
              color="var(--color-chart-1)"
              label={withoutRisks.label}
              value={withoutRisks.count}
            />
          </ul>
        </div>
      </div>
    </SectionCard>
  );
}

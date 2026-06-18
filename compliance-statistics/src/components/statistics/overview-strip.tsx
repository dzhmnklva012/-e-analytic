import { Building2, Gavel, ListChecks, PhoneCall, Scale } from "lucide-react";
import { MetricGrid } from "@/components/statistics/metric-grid";
import { MetricTile } from "@/components/statistics/metric-tile";
import type { StatisticsData } from "@/lib/types";

export interface OverviewStripProps {
  data: StatisticsData;
  companiesCount: number;
}

/** At-a-glance headline KPIs aggregated from every section. */
export function OverviewStrip({ data, companiesCount }: OverviewStripProps) {
  const tasksTotal =
    data.tasks.planned +
    data.tasks.completed +
    data.tasks.inProgress +
    data.tasks.pending +
    data.tasks.other;

  return (
    <MetricGrid cols={5} className="gap-4">
      <MetricTile label="Компании" value={companiesCount} icon={Building2} tone="info" />
      <MetricTile
        label="Задачи"
        value={tasksTotal}
        icon={ListChecks}
        tone="info"
        delta={data.trends.tasks}
      />
      <MetricTile
        label="Обращения"
        value={data.hotline.total}
        icon={PhoneCall}
        tone="info"
        delta={data.trends.hotline}
      />
      <MetricTile
        label="Расследования"
        value={data.investigations.total}
        icon={Gavel}
        tone="info"
        delta={data.trends.investigations}
      />
      <MetricTile
        label="Конфликты выявлены"
        value={data.conflict.found}
        icon={Scale}
        tone="danger"
        delta={data.trends.conflict}
        deltaGoodWhenUp={false}
      />
    </MetricGrid>
  );
}

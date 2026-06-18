import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Gavel,
  ListChecks,
  PhoneCall,
  Scale,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { StatisticsData } from "@/lib/types";

interface Metric {
  id: string;
  label: string;
  value: number;
  icon: LucideIcon;
  /** Signed period-over-period change in percent. */
  delta?: number;
  /** Whether an increase reads as positive (drives delta color). Default true. */
  deltaGoodWhenUp?: boolean;
  /** Caption shown when there is no delta (keeps cells aligned). */
  hint?: string;
}

/** One KPI cell: coral icon chip + label, big value, colored delta beneath. */
function MetricCell({ label, value, icon: Icon, delta, deltaGoodWhenUp = true, hint }: Metric) {
  const hasDelta = typeof delta === "number";
  const up = (delta ?? 0) >= 0;
  const good = up === deltaGoodWhenUp;
  const TrendIcon = up ? TrendingUp : TrendingDown;

  return (
    <div className="flex min-w-0 flex-col gap-2 p-4 sm:p-5">
      <div className="flex items-center gap-2">
        <span
          className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-coral/10 text-coral"
          aria-hidden
        >
          <Icon className="size-4" />
        </span>
        <span className="truncate text-xs font-medium text-muted-foreground">{label}</span>
      </div>
      <p className="text-2xl font-semibold leading-tight tabular-nums text-foreground">
        {formatNumber(value)}
      </p>
      {hasDelta ? (
        <p className="flex flex-wrap items-center gap-x-1 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-medium tabular-nums",
              good ? "text-success" : "text-danger",
            )}
          >
            <TrendIcon className="size-3.5" aria-hidden />
            {up ? "+" : "−"}
            {Math.abs(delta as number)}%
          </span>
          <span className="text-muted-foreground">за период</span>
        </p>
      ) : (
        <p className="text-xs text-muted-foreground">{hint ?? " "}</p>
      )}
    </div>
  );
}

export interface OverviewStripProps {
  data: StatisticsData;
  companiesCount: number;
}

/**
 * Headline KPIs as a single card split by dividers (Revenue Analytics ref):
 * a row of 5 on desktop, a 2/3-column lattice on smaller screens. Coral icon
 * chips; up/down deltas stay green/red so good vs bad is unmistakable.
 */
export function OverviewStrip({ data, companiesCount }: OverviewStripProps) {
  const tasksTotal =
    data.tasks.planned +
    data.tasks.completed +
    data.tasks.inProgress +
    data.tasks.pending +
    data.tasks.other;

  const metrics: Metric[] = [
    { key: "companies", label: "Компании", value: companiesCount, icon: Building2, hint: "в системе" },
    { key: "tasks", label: "Задачи", value: tasksTotal, icon: ListChecks, delta: data.trends.tasks },
    { key: "hotline", label: "Обращения", value: data.hotline.total, icon: PhoneCall, delta: data.trends.hotline },
    { key: "investigations", label: "Расследования", value: data.investigations.total, icon: Gavel, delta: data.trends.investigations },
    {
      key: "conflict",
      label: "Конфликты выявлены",
      value: data.conflict.found,
      icon: Scale,
      delta: data.trends.conflict,
      deltaGoodWhenUp: false,
    },
  ];

  return (
    <Card className="gap-0 overflow-hidden py-0 shadow-sm ring-foreground/5">
      <div className="grid grid-cols-2 divide-x divide-y divide-border sm:grid-cols-3 lg:grid-cols-5 lg:divide-y-0">
        {metrics.map((m) => (
          <MetricCell key={m.key} {...m} />
        ))}
      </div>
    </Card>
  );
}

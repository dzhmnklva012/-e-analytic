import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Gavel,
  Gift,
  ListChecks,
  PhoneCall,
  Scale,
  UsersRound,
} from "lucide-react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { SectionCard } from "@/components/statistics/section-card";
import { StatRow, StatRowList } from "@/components/statistics/stat-row";
import { DonutStat } from "@/components/statistics/donut-stat";
import { RadialGauge } from "@/components/statistics/radial-gauge";
import { AreaTrend } from "@/components/statistics/area-trend";
import { ProportionBar } from "@/components/statistics/proportion-bar";
import { SignedSplitBar } from "@/components/statistics/signed-split-bar";
import { EmptyState } from "@/components/statistics/empty-state";
import type {
  CaseFlowStat,
  CompanyFilesStat,
  ConflictStat,
  EmployeeFilesStat,
  GiftsStat,
  TasksStat,
} from "@/lib/types";

/* ───────────────────────── 1. Задачи ───────────────────────── */

export function TasksSection({ data }: { data: TasksStat }) {
  const total =
    data.planned + data.completed + data.inProgress + data.pending + data.other;
  return (
    <SectionCard
      id="tasks"
      title="Задачи"
      description="Распределение по статусам"
      icon={ListChecks}
    >
      {total === 0 ? (
        <EmptyState compact description="За выбранный период задач нет." />
      ) : (
        <DonutStat
          centerLabel="Всего задач"
          data={[
            { key: "completed", label: "Завершённые", value: data.completed, tone: "success" },
            { key: "inProgress", label: "В работе", value: data.inProgress, tone: "info" },
            { key: "planned", label: "Запланированные", value: data.planned, tone: "planned" },
            { key: "pending", label: "Ожидают", value: data.pending, tone: "warning" },
            { key: "other", label: "Прочие", value: data.other, tone: "other" },
          ]}
        />
      )}
    </SectionCard>
  );
}

/* ─────────────────────── 2. Файлы компаний ─────────────────────── */

export function CompanyFilesSection({ data }: { data: CompanyFilesStat }) {
  const total = data.checks.total + data.conclusions.total + data.data.total;
  return (
    <SectionCard
      id="company-files"
      title="Файлы по компаниям"
      description="Проверки, заключения и данные"
      icon={Building2}
    >
      {total === 0 ? (
        <EmptyState compact description="Файлы по компаниям отсутствуют." />
      ) : (
        <Tabs defaultValue="checks">
          <TabsList className="w-full" aria-label="Категории файлов компаний">
            <TabsTrigger value="checks">Проверки</TabsTrigger>
            <TabsTrigger value="conclusions">Заключения</TabsTrigger>
            <TabsTrigger value="data">Данные</TabsTrigger>
          </TabsList>
          <TabsContent value="checks" className="pt-4">
            <SignedSplitBar data={data.checks} label="Всего проверок" />
          </TabsContent>
          <TabsContent value="conclusions" className="pt-4">
            <SignedSplitBar data={data.conclusions} label="Всего заключений" />
          </TabsContent>
          <TabsContent value="data" className="pt-4">
            <SignedSplitBar data={data.data} label="Всего файлов данных" />
          </TabsContent>
        </Tabs>
      )}
    </SectionCard>
  );
}

/* ────────────────────── 3. Файлы сотрудников ────────────────────── */

export function EmployeeFilesSection({ data }: { data: EmployeeFilesStat }) {
  const total =
    data.inspections.total +
    data.conclusions.total +
    data.byMonth.reduce((s, m) => s + m.signed + m.unsigned, 0);
  return (
    <SectionCard
      id="employee-files"
      title="Файлы по сотрудникам"
      description="Проверки, заключения и помесячная динамика"
      icon={UsersRound}
    >
      {total === 0 ? (
        <EmptyState compact description="Файлы по сотрудникам отсутствуют." />
      ) : (
        <Tabs defaultValue="months">
          <TabsList aria-label="Категории файлов сотрудников">
            <TabsTrigger value="months">Данные по месяцам</TabsTrigger>
            <TabsTrigger value="inspections">Проверки</TabsTrigger>
            <TabsTrigger value="conclusions">Заключения</TabsTrigger>
          </TabsList>
          <TabsContent value="months" className="pt-4">
            <AreaTrend data={data.byMonth} />
          </TabsContent>
          <TabsContent value="inspections" className="pt-4">
            <div className="max-w-md">
              <SignedSplitBar data={data.inspections} label="Всего проверок" />
            </div>
          </TabsContent>
          <TabsContent value="conclusions" className="pt-4">
            <div className="max-w-md">
              <SignedSplitBar data={data.conclusions} label="Всего заключений" />
            </div>
          </TabsContent>
        </Tabs>
      )}
    </SectionCard>
  );
}

/* ──────────────── 4 & 5. Горячая линия / Расследования ──────────────── */

interface CaseFlowSectionProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  data: CaseFlowStat;
  totalLabel: string;
}

function CaseFlowSection({
  id,
  title,
  description,
  icon,
  data,
  totalLabel,
}: CaseFlowSectionProps) {
  return (
    <SectionCard id={id} title={title} description={description} icon={icon}>
      {data.total === 0 ? (
        <EmptyState compact description="Обращений за выбранный период нет." />
      ) : (
        <ProportionBar
          totalLabel={totalLabel}
          data={[
            { key: "new", label: "Новые", value: data.new, tone: "info" },
            { key: "inProgress", label: "В работе", value: data.inProgress, tone: "warning" },
            { key: "completed", label: "Завершённые", value: data.completed, tone: "success" },
          ]}
        />
      )}
    </SectionCard>
  );
}

export function HotlineSection({ data }: { data: CaseFlowStat }) {
  return (
    <CaseFlowSection
      id="hotline"
      title="Горячая линия"
      description="Поток обращений"
      icon={PhoneCall}
      data={data}
      totalLabel="Всего обращений"
    />
  );
}

export function InvestigationsSection({ data }: { data: CaseFlowStat }) {
  return (
    <CaseFlowSection
      id="investigations"
      title="Расследования"
      description="Поток расследований"
      icon={Gavel}
      data={data}
      totalLabel="Всего расследований"
    />
  );
}

/* ──────────────────── 6. Конфликт интересов ──────────────────── */

export function ConflictSection({ data }: { data: ConflictStat }) {
  return (
    <SectionCard
      id="conflict"
      title="Конфликт интересов"
      description="Результаты проверок"
      icon={Scale}
    >
      {data.total === 0 ? (
        <EmptyState compact description="Проверок на конфликт интересов нет." />
      ) : (
        <RadialGauge
          value={data.notFound}
          total={data.total}
          centerCaption="не выявлен"
          tone="success"
          legend={[
            { label: "Конфликт не выявлен", value: data.notFound, tone: "success" },
            { label: "Конфликт выявлен", value: data.found, tone: "danger" },
          ]}
        />
      )}
    </SectionCard>
  );
}

/* ───────────────────────── 7. Подарки ───────────────────────── */

export function GiftsSection({ data }: { data: GiftsStat }) {
  const total = data.declarations + data.gifts + data.donors + data.recipients;
  return (
    <SectionCard
      id="gifts"
      title="Подарки"
      description="Декларации и участники"
      icon={Gift}
    >
      {total === 0 ? (
        <EmptyState compact description="Деклараций о подарках нет." />
      ) : (
        <StatRowList>
          <StatRow label="Декларации" value={data.declarations} tone="info" />
          <StatRow label="Подарки" value={data.gifts} tone="planned" />
          <StatRow label="Дарители" value={data.donors} tone="warning" />
          <StatRow label="Получатели" value={data.recipients} tone="success" />
        </StatRowList>
      )}
    </SectionCard>
  );
}

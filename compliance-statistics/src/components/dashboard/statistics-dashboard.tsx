import { SelectField } from "../ui/select-field";
import { CompanyFilesCard } from "./company-files-card";
import { ConflictsCard } from "./conflicts-card";
import { EmployeeFilesCard } from "./employee-files-card";
import { GiftsCard } from "./gifts-card";
import { HotlineCard } from "./hotline-card";
import { TasksCard } from "./tasks-card";

const MONTHS = [
  "Все",
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const YEARS = ["Все", "2026", "2025", "2024", "2023"];

export function StatisticsDashboard() {
  return (
    <div className="mx-auto max-w-[1220px] p-6">
      {/* Title + filters */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Статистика</h1>
        <div className="flex gap-3">
          <SelectField label="Месяц" options={MONTHS} defaultValue="Все" />
          <SelectField label="Год" options={YEARS} defaultValue="Все" />
        </div>
      </div>

      {/* Row 1 — files (5 / 7 split) */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <CompanyFilesCard />
        </div>
        <div className="lg:col-span-7">
          <EmployeeFilesCard />
        </div>
      </div>

      {/* Rows 2-3 — even halves */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <TasksCard />
        <HotlineCard />
        <ConflictsCard />
        <GiftsCard />
      </div>
    </div>
  );
}

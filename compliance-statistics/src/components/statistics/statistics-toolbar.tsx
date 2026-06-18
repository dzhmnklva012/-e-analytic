"use client";

import { useId } from "react";
import { RefreshCw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CustomRangeField } from "@/components/statistics/custom-range-field";
import { COMPANIES, PERIOD_LABELS } from "@/lib/mock-data";
import type { Period, ViewState } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Item {
  value: string;
  label: string;
}

const PERIOD_ITEMS: Item[] = (Object.keys(PERIOD_LABELS) as Period[]).map(
  (p) => ({ value: p, label: PERIOD_LABELS[p] }),
);

const COMPANY_ITEMS: Item[] = COMPANIES.map((c) => ({
  value: c.id,
  label: c.name,
}));

const DEMO_ITEMS: Item[] = [
  { value: "ready", label: "Данные" },
  { value: "loading", label: "Загрузка" },
  { value: "empty", label: "Пусто" },
  { value: "error", label: "Ошибка" },
  { value: "offline", label: "Офлайн" },
];

function LabeledSelect({
  label,
  value,
  onValueChange,
  items,
  className,
  id,
}: {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  items: Item[];
  className?: string;
  id?: string;
}) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label htmlFor={fieldId} className="text-xs text-muted-foreground">
        {label}
      </label>
      <Select value={value} onValueChange={(v) => onValueChange(v as string)} items={items}>
        <SelectTrigger id={fieldId} className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {items.map((it) => (
            <SelectItem key={it.value} value={it.value}>
              {it.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export interface StatisticsToolbarProps {
  company: string;
  onCompanyChange: (value: string) => void;
  period: Period;
  onPeriodChange: (value: Period) => void;
  onApplyCustomRange: (from: string, to: string) => void;
  demoState: ViewState;
  onDemoStateChange: (value: ViewState) => void;
  onRefresh: () => void;
  isFetching: boolean;
  lastUpdated: string | null;
}

/**
 * Filter + control bar for the dashboard: company and period scope, an
 * inline-validated custom range, a demo state switcher and refresh.
 */
export function StatisticsToolbar({
  company,
  onCompanyChange,
  period,
  onPeriodChange,
  onApplyCustomRange,
  demoState,
  onDemoStateChange,
  onRefresh,
  isFetching,
  lastUpdated,
}: StatisticsToolbarProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-end">
          <LabeledSelect
            label="Компания"
            value={company}
            onValueChange={onCompanyChange}
            items={COMPANY_ITEMS}
            className="sm:w-52"
          />
          <LabeledSelect
            label="Период"
            value={period}
            onValueChange={(v) => onPeriodChange(v as Period)}
            items={PERIOD_ITEMS}
            className="sm:w-44"
          />
        </div>

        <div className="grid grid-cols-2 items-end gap-3 sm:flex sm:flex-wrap">
          <LabeledSelect
            label="Демо-состояние"
            value={demoState}
            onValueChange={(v) => onDemoStateChange(v as ViewState)}
            items={DEMO_ITEMS}
            className="sm:w-40"
          />
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground" aria-hidden>
              {lastUpdated ? `Обновлено ${lastUpdated}` : " "}
            </span>
            <Button
              variant="outline"
              size="default"
              onClick={onRefresh}
              disabled={isFetching}
              className="w-full sm:w-auto"
            >
              <RefreshCw
                className={cn("size-4", isFetching && "animate-spin")}
                aria-hidden
              />
              {isFetching ? "Обновление…" : "Обновить"}
            </Button>
          </div>
        </div>
      </div>

      {period === "custom" && (
        <CustomRangeField onApply={onApplyCustomRange} disabled={isFetching} />
      )}
    </div>
  );
}

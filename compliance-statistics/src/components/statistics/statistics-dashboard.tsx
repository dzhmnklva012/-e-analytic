"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CalendarRange } from "lucide-react";
import { AppShell } from "@/components/statistics/app-shell";
import { EmptyState } from "@/components/statistics/empty-state";
import { OfflineBanner } from "@/components/statistics/offline-banner";
import { StatisticsToolbar } from "@/components/statistics/statistics-toolbar";
import { StatisticsSkeleton } from "@/components/statistics/statistics-skeleton";
import { ErrorState } from "@/components/statistics/error-state";
import { OverviewStrip } from "@/components/statistics/overview-strip";
import {
  TasksSection,
  CompanyFilesSection,
  EmployeeFilesSection,
  HotlineSection,
  InvestigationsSection,
  ConflictSection,
  GiftsSection,
} from "@/components/statistics/sections";
import { useOnlineStatus } from "@/hooks/use-online-status";
import {
  COMPANIES,
  EMPTY_STATISTICS,
  fetchStatistics,
} from "@/lib/mock-data";
import type { Period, StatisticsData, ViewState } from "@/lib/types";

const COMPANIES_IN_SCOPE = COMPANIES.length - 1; // excludes "Все компании"

function formatTime(date: Date): string {
  return date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
}

function StatisticsSections({ data }: { data: StatisticsData }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <TasksSection data={data.tasks} />
      <HotlineSection data={data.hotline} />
      <InvestigationsSection data={data.investigations} />
      <ConflictSection data={data.conflict} />
      <GiftsSection data={data.gifts} />
      <CompanyFilesSection data={data.companyFiles} />
      <EmployeeFilesSection data={data.employeeFiles} />
    </div>
  );
}

export function StatisticsDashboard() {
  const online = useOnlineStatus();

  const [company, setCompany] = useState("all");
  const [period, setPeriod] = useState<Period>("month");
  const [customApplied, setCustomApplied] = useState(false);
  const [demoState, setDemoState] = useState<ViewState>("ready");

  const [data, setData] = useState<StatisticsData | null>(null);
  const [status, setStatus] = useState<"loading" | "idle" | "error">("loading");
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const abortRef = useRef<AbortController | null>(null);

  // Deep-linkable demo state / period, e.g. /?state=empty or /?period=custom
  // (handy for QA and design reviews).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const state = params.get("state");
    const states: ViewState[] = ["ready", "loading", "empty", "error", "offline"];
    if (state && (states as string[]).includes(state)) {
      setDemoState(state as ViewState);
    }
    const p = params.get("period");
    const periods: Period[] = ["today", "week", "month", "quarter", "year", "custom"];
    if (p && (periods as string[]).includes(p)) {
      setPeriod(p as Period);
    }
  }, []);

  const skipLoad = period === "custom" && !customApplied;

  useEffect(() => {
    if (skipLoad) return;
    const ctrl = new AbortController();
    abortRef.current?.abort();
    abortRef.current = ctrl;
    setStatus("loading");
    fetchStatistics({ companyId: company, period, signal: ctrl.signal })
      .then((d) => {
        setData(d);
        setStatus("idle");
        setLastUpdated(formatTime(new Date()));
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setStatus("error");
      });
    return () => ctrl.abort();
  }, [company, period, refreshKey, skipLoad]);

  const refresh = useCallback(() => setRefreshKey((k) => k + 1), []);

  const handlePeriodChange = useCallback((next: Period) => {
    setPeriod(next);
    setCustomApplied(false);
  }, []);

  const handleApplyCustomRange = useCallback(() => {
    setCustomApplied(true);
    setRefreshKey((k) => k + 1);
  }, []);

  const handleRetry = useCallback(() => {
    if (demoState !== "ready") setDemoState("ready");
    refresh();
  }, [demoState, refresh]);

  const isFetching = status === "loading" && !skipLoad;
  const showOffline = !online || demoState === "offline";

  // Resolve which UI state to render (demo override wins over real status).
  let body: React.ReactNode;
  if (demoState === "ready" && skipLoad && !data) {
    body = (
      <EmptyState
        icon={CalendarRange}
        title="Выберите период"
        description="Укажите даты начала и окончания выше и нажмите «Применить», чтобы построить статистику."
      />
    );
  } else if (demoState === "loading" || (demoState === "ready" && status === "loading" && !data)) {
    body = <StatisticsSkeleton />;
  } else if (demoState === "error" || (demoState === "ready" && status === "error")) {
    body = <ErrorState onRetry={handleRetry} />;
  } else {
    const view = demoState === "empty" ? EMPTY_STATISTICS : data;
    if (!view) {
      body = <StatisticsSkeleton />;
    } else {
      body = (
        <div className="space-y-6">
          <OverviewStrip
            data={view}
            companiesCount={demoState === "empty" ? 0 : COMPANIES_IN_SCOPE}
          />
          <StatisticsSections data={view} />
        </div>
      );
    }
  }

  return (
    <AppShell notice={showOffline ? <OfflineBanner /> : undefined}>
      <div className="mx-auto max-w-[1400px] space-y-6">
        <header className="space-y-1">
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
            Статистика
          </h1>
          <p className="text-xs text-muted-foreground">
            Сводные показатели модулей системы Compliance за выбранный период.
          </p>
        </header>

        <StatisticsToolbar
          company={company}
          onCompanyChange={setCompany}
          period={period}
          onPeriodChange={handlePeriodChange}
          onApplyCustomRange={handleApplyCustomRange}
          demoState={demoState}
          onDemoStateChange={setDemoState}
          onRefresh={refresh}
          isFetching={isFetching}
          lastUpdated={lastUpdated}
        />

        {body}
      </div>
    </AppShell>
  );
}

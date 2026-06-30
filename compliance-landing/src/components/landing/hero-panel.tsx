import { MoreHorizontal, TrendingUp, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { RiskBadge } from "./risk-badge";
import type { RiskLevel } from "@/lib/screening";

type Row = {
  initials: string;
  name: string;
  note: string;
  risk: RiskLevel;
  progress: number;
};

const rows: Row[] = [
  { initials: "АЛ", name: "ТОО «Альфа Логистик»", note: "Скрининг завершён", risk: "low", progress: 100 },
  { initials: "NT", name: "Nordwind Trading Ltd", note: "Совпадение в санкциях", risk: "high", progress: 100 },
  { initials: "ГБ", name: "GAZPROMBANK", note: "PEP-связь", risk: "medium", progress: 78 },
];

const progressTone: Record<RiskLevel, string> = {
  low: "bg-success",
  medium: "bg-warning",
  high: "bg-destructive",
};

export function HeroPanel() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* main card */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-2xl shadow-primary/10">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-bold text-foreground">Проверки сегодня</span>
            <span className="text-xs text-muted-foreground">Очередь скрининга</span>
          </div>
          <button
            type="button"
            aria-label="Действия"
            className="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
          >
            <MoreHorizontal className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold tracking-tight text-foreground">1 240</span>
            <span className="mb-1 text-xs text-muted-foreground">проверок</span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">
            <TrendingUp className="size-3.5" aria-hidden="true" />
            +12%
          </span>
        </div>

        <ul className="mt-5 flex flex-col gap-4">
          {rows.map((row) => (
            <li key={row.name} className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                  {row.initials}
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm font-semibold text-foreground">{row.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{row.note}</span>
                </span>
                <RiskBadge level={row.risk} />
              </div>
              <span className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <span
                  className={cn("block h-full rounded-full", progressTone[row.risk])}
                  style={{ width: `${row.progress}%` }}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* floating accuracy chip */}
      <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-2xl border border-border bg-card p-3 pr-4 shadow-xl sm:flex">
        <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-[#0070eb] to-[#5b8def] text-white">
          <ShieldCheck className="size-5" aria-hidden="true" />
        </span>
        <span className="flex flex-col">
          <span className="text-base font-bold text-foreground">94%</span>
          <span className="text-xs text-muted-foreground">Точность скоринга</span>
        </span>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { Search, Sparkles, AlertCircle, History, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useOnlineStatus } from "@/lib/hooks/use-online-status";
import {
  screen,
  isValidCompanyName,
  exampleCompanies,
  type Dossier,
} from "@/lib/screening";
import { DossierResultCard } from "./dossier-result-card";
import { ScreeningSkeleton } from "./screening-skeleton";
import { RiskBadge } from "./risk-badge";

type Status = "idle" | "loading" | "ready";

const DAILY_LIMIT = 200;

export function ScreeningDemo() {
  const online = useOnlineStatus();
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<Status>("idle");
  const [dossier, setDossier] = React.useState<Dossier | null>(null);
  const [recent, setRecent] = React.useState<Dossier[]>([]);
  const [used, setUsed] = React.useState(3);

  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const errorId = "screening-error";

  React.useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function runScreening(companyName: string) {
    if (!online) {
      setError("Нет подключения к интернету. Подключитесь и повторите.");
      return;
    }
    if (!isValidCompanyName(companyName)) {
      setError("Введите название компании — минимум 2 символа.");
      return;
    }
    setError(null);
    setStatus("loading");
    setDossier(null);

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const result = screen(companyName);
      setDossier(result);
      setStatus("ready");
      setUsed((u) => Math.min(DAILY_LIMIT, u + 1));
      setRecent((prev) => {
        const deduped = prev.filter(
          (d) => d.company.toLowerCase() !== result.company.toLowerCase(),
        );
        return [result, ...deduped].slice(0, 3);
      });
    }, 1500);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    runScreening(value);
  }

  function onExample(name: string) {
    setValue(name);
    runScreening(name);
  }

  const remaining = DAILY_LIMIT - used;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-xl shadow-foreground/5 sm:p-6">
      {/* header */}
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
          <Sparkles className="size-3.5" aria-hidden="true" />
          ИИ-агент международного поиска
        </span>
        <span className="hidden text-xs text-muted-foreground sm:inline">
          Лимит: <span className="font-semibold text-foreground">{remaining}</span>/{DAILY_LIMIT}
        </span>
      </div>

      {/* form */}
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-2">
        <label htmlFor="company" className="text-sm font-semibold text-foreground">
          Проверить контрагента
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="company"
              name="company"
              placeholder="Введите название компании…"
              value={value}
              autoComplete="off"
              onChange={(e) => {
                setValue(e.target.value);
                if (error) setError(null);
              }}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? errorId : undefined}
              className="pl-9"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={status === "loading" || !online}
            className="h-10 sm:w-auto"
          >
            {status === "loading" ? "Проверяю…" : "Проверить"}
          </Button>
        </div>

        {/* validation / offline error */}
        {error && (
          <p id={errorId} role="alert" className="inline-flex items-center gap-1.5 text-xs font-medium text-destructive">
            <AlertCircle className="size-3.5" aria-hidden="true" />
            {error}
          </p>
        )}
        {!online && !error && (
          <p className="inline-flex items-center gap-1.5 text-xs font-medium text-warning">
            <WifiOff className="size-3.5" aria-hidden="true" />
            Нет подключения — проверка недоступна.
          </p>
        )}
      </form>

      <div className="h-px bg-border" />

      {/* result region */}
      <div aria-live="polite" className="min-h-[280px]">
        {status === "loading" && <ScreeningSkeleton />}

        {status === "ready" && dossier && <DossierResultCard dossier={dossier} />}

        {status === "idle" && (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <span className="grid size-12 place-items-center rounded-full bg-secondary text-secondary-foreground">
              <Search className="size-6" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-foreground">
                Введите название компании
              </p>
              <p className="max-w-xs text-xs text-muted-foreground">
                Проверю по международным базам и санкционным спискам, оценю риск и покажу досье.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {exampleCompanies.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => onExample(name)}
                  disabled={!online}
                  className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-secondary hover:text-secondary-foreground focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none disabled:opacity-50"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* recent searches */}
      <div className="flex flex-col gap-2">
        <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <History className="size-3.5" aria-hidden="true" />
          Недавние проверки
        </p>
        {recent.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border px-3 py-3 text-center text-xs text-muted-foreground">
            Здесь появятся ваши недавние проверки.
          </p>
        ) : (
          <ul className="flex flex-col gap-1.5">
            {recent.map((d) => (
              <li key={d.company}>
                <button
                  type="button"
                  onClick={() => onExample(d.company)}
                  className="flex w-full items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-2 text-left transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
                >
                  <span className="truncate text-sm font-medium text-foreground">{d.company}</span>
                  <RiskBadge level={d.riskLevel} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

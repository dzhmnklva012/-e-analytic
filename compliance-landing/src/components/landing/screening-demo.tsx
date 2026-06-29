"use client";

import { useId, useRef, useState } from "react";
import { Loader2, Search, Sparkles } from "lucide-react";

import {
  MIN_QUERY_LENGTH,
  SUGGESTED_QUERIES,
  screen,
  type ScreeningResult,
} from "@/lib/screening";
import { useOnlineStatus } from "@/lib/hooks/use-online-status";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OfflineBanner } from "@/components/landing/offline-banner";
import { ScreeningSkeleton } from "@/components/landing/screening-skeleton";
import { DossierResultCard } from "@/components/landing/dossier-result-card";

type Status = "idle" | "loading" | "result";

function EmptyState({ onPick }: { onPick: (value: string) => void }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-border bg-card/60 p-8 text-center">
      <span className="inline-flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
        <Sparkles className="size-6" aria-hidden />
      </span>
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-foreground">
          Демо-проверка контрагента
        </h3>
        <p className="max-w-[380px] text-sm text-muted-foreground">
          Введите название компании или выберите пример — ИИ оценит риск и
          покажет досье.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {SUGGESTED_QUERIES.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => onPick(value)}
            className="rounded-3xl border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}

function ScreeningDemo() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<ScreeningResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const online = useOnlineStatus();
  const errorId = useId();
  const requestId = useRef(0);

  function validate(value: string): string | null {
    const trimmed = value.trim();
    if (trimmed.length === 0) return "Введите название компании";
    if (trimmed.length < MIN_QUERY_LENGTH) return "Минимум 2 символа";
    return null;
  }

  async function run(value: string) {
    const validationError = validate(value);
    if (validationError) {
      setError(validationError);
      return;
    }
    if (!online) return;

    setError(null);
    setStatus("loading");
    const id = requestId.current + 1;
    requestId.current = id;

    const screening = await screen(value);
    // Ignore stale responses if a newer request started.
    if (id !== requestId.current) return;
    setResult(screening);
    setStatus("result");
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    void run(query);
  }

  function handlePick(value: string) {
    setQuery(value);
    void run(value);
  }

  const busy = status === "loading";

  return (
    <div className="flex flex-col gap-4">
      {!online && <OfflineBanner />}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-faint"
              aria-hidden
            />
            <Input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                if (error) setError(null);
              }}
              placeholder="Введите название компании…"
              aria-label="Название компании для проверки"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? errorId : undefined}
              disabled={busy}
              className="pl-10"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={busy || !online}
            className="shrink-0"
          >
            {busy ? (
              <>
                <Loader2 className="animate-spin" aria-hidden />
                Проверяю…
              </>
            ) : (
              <>
                <Search aria-hidden />
                Проверить
              </>
            )}
          </Button>
        </div>

        {error && (
          <p id={errorId} role="alert" className="text-xs font-semibold text-destructive">
            {error}
          </p>
        )}

        <p className="text-xs text-muted-foreground">
          Суточный лимит запросов: 200 · демо-режим без сохранения данных
        </p>
      </form>

      <div aria-live="polite">
        {status === "idle" && <EmptyState onPick={handlePick} />}
        {status === "loading" && <ScreeningSkeleton />}
        {status === "result" && result && <DossierResultCard result={result} />}
      </div>
    </div>
  );
}

export { ScreeningDemo };

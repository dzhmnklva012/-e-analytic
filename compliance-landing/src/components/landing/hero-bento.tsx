import { BrainCircuit, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { AiScoreCard } from "./ai-score-card";
import { AccuracyCard, ChecksCard } from "./hero-dashboard-cards";
import { AiTerminalCard } from "./ai-terminal-card";

/* ── central engine showcase cell ────────────────────────────────────── */

function EngineCell({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "glass relative flex flex-col items-center justify-center gap-5 overflow-hidden rounded-3xl border border-border p-6 text-center",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{ background: "radial-gradient(60% 50% at 50% 30%, color-mix(in oklch, var(--primary) 22%, transparent), transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="relative grid place-items-center">
        <span className="absolute size-28 animate-soft-pulse rounded-full bg-primary/20 blur-xl" />
        <span className="absolute size-20 rounded-full border border-primary/25" />
        <span className="relative grid size-16 place-items-center rounded-full bg-gradient-to-br from-[#3b86ff] to-[#7aa9ff] text-white shadow-2xl shadow-primary/40">
          <BrainCircuit className="size-8" aria-hidden="true" strokeWidth={1.75} />
        </span>
      </div>
      <div className="relative flex flex-col gap-1">
        <span className="font-mono text-xs font-bold tracking-[0.2em] text-foreground">ИИ-ДВИЖОК</span>
        <span className="text-xs text-muted-foreground">ML · NLP · скоринг риска</span>
      </div>
      <div className="relative w-full max-w-[12rem]">
        <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
          <span>анализ источников</span>
          <span className="text-primary">94%</span>
        </div>
        <span className="mt-1.5 block h-1 w-full overflow-hidden rounded-full bg-muted">
          <span className="block h-full w-[94%] rounded-full bg-primary" />
        </span>
      </div>
    </div>
  );
}

/* ── headline stat cell ──────────────────────────────────────────────── */

function StatCell({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "glass flex flex-col justify-between gap-4 rounded-3xl border border-border p-6",
        className,
      )}
    >
      <span className="text-xs font-medium text-muted-foreground">Рост проверок</span>
      <div className="flex flex-col gap-1">
        <span className="text-gradient text-4xl font-extrabold tracking-tight">+312%</span>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-success">
          <TrendingUp className="size-3.5" aria-hidden="true" />
          год к году
        </span>
      </div>
    </div>
  );
}

/* ── bento grid ──────────────────────────────────────────────────────── */

export function HeroBento() {
  return (
    <div className="grid gap-3 sm:gap-4 md:grid-cols-3 md:auto-rows-[minmax(11rem,1fr)]">
      <EngineCell className="md:col-span-1 md:row-span-2" />
      <AiScoreCard className="h-full w-full rounded-3xl md:col-span-2" />
      <AccuracyCard className="h-full w-full rounded-3xl" />
      <StatCell className="md:col-span-1" />
      <ChecksCard className="h-full w-full rounded-3xl md:col-span-2" />
      <AiTerminalCard className="h-full w-full rounded-3xl md:col-span-1" />
    </div>
  );
}

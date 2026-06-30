"use client";

import * as React from "react";
import { Sparkles, ShieldCheck, Check, AlertTriangle, X, Building2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { RiskBadge } from "./risk-badge";
import type { RiskLevel } from "@/lib/screening";

type SourceStatus = "ok" | "warn" | "bad";
type Source = { label: string; note: string; status: SourceStatus };
type Slide = {
  company: string;
  country: string;
  level: RiskLevel;
  score: number;
  sources: Source[];
};

const slides: Slide[] = [
  {
    company: "ТОО «Альфа Логистик»",
    country: "Казахстан",
    level: "low",
    score: 18,
    sources: [
      { label: "Санкционные списки", note: "чисто", status: "ok" },
      { label: "PEP-реестр", note: "нет", status: "ok" },
      { label: "Негативные публикации", note: "чисто", status: "ok" },
      { label: "Корпоративные реестры", note: "действующее", status: "ok" },
    ],
  },
  {
    company: "Nordwind Trading Ltd",
    country: "Кипр",
    level: "high",
    score: 86,
    sources: [
      { label: "Санкционные списки", note: "совпадение", status: "bad" },
      { label: "PEP-реестр", note: "связь", status: "warn" },
      { label: "Негативные публикации", note: "упоминания", status: "warn" },
      { label: "Корпоративные реестры", note: "действующее", status: "ok" },
    ],
  },
  {
    company: "GAZPROMBANK",
    country: "Казахстан",
    level: "medium",
    score: 54,
    sources: [
      { label: "Санкционные списки", note: "чисто", status: "ok" },
      { label: "PEP-реестр", note: "связь", status: "warn" },
      { label: "Негативные публикации", note: "чисто", status: "ok" },
      { label: "Корпоративные реестры", note: "действующее", status: "ok" },
    ],
  },
];

const barClass: Record<RiskLevel, string> = {
  low: "bg-risk-low",
  medium: "bg-risk-medium",
  high: "bg-risk-high",
};

const statusMeta: Record<SourceStatus, { icon: LucideIcon; color: string; bg: string }> = {
  ok: { icon: Check, color: "text-success", bg: "bg-success/10" },
  warn: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10" },
  bad: { icon: X, color: "text-destructive", bg: "bg-destructive/10" },
};

export function HeroIllustration() {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % slides.length), 5000);
    return () => clearTimeout(id);
  }, [active, paused]);

  const s = slides[active];

  return (
    <div className="mx-auto w-full max-w-xl">
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* tilted soft-blue backdrop + faint stacked card for depth */}
        <div className="absolute inset-0 rotate-3 rounded-[2rem] bg-gradient-to-br from-[#eaf1ff] to-[#dde6ff]" aria-hidden="true" />
        <div className="absolute inset-x-8 top-10 bottom-12 rounded-2xl bg-card/60 blur-[1px]" aria-hidden="true" />

        {/* slide (re-mounts on change → entrance animation replays) */}
        <div key={active} className="relative" aria-hidden="true">
          {/* AI agent badge */}
          <div className="animate-hero-badge absolute -right-2 top-4 z-20 grid size-12 place-items-center rounded-full bg-gradient-to-br from-[#3b82f6] to-[#7c7ae0] text-white shadow-lg shadow-primary/30">
            <Sparkles className="size-5" />
          </div>

          <div className="relative z-10 px-5 pt-9 pb-10 sm:px-7">
            {/* dossier card */}
            <div className="animate-hero-rise flex flex-col gap-4 rounded-2xl bg-card p-5 shadow-xl ring-1 ring-foreground/5">
              {/* header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                    <Building2 className="size-5" />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-bold text-foreground">{s.company}</span>
                    <span className="text-xs text-muted-foreground">{s.country} · проверено сейчас</span>
                  </span>
                </div>
                <RiskBadge level={s.level} />
              </div>

              {/* risk score */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-muted-foreground">Оценка риска</span>
                  <span className="font-bold text-foreground">{s.score}/100</span>
                </div>
                <span className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <span
                    className={cn("block h-full rounded-full", barClass[s.level])}
                    style={{ width: `${s.score}%` }}
                  />
                </span>
              </div>

              {/* source verdicts */}
              <ul className="flex flex-col gap-2 border-t border-border pt-3">
                {s.sources.map((src) => {
                  const m = statusMeta[src.status];
                  const Icon = m.icon;
                  return (
                    <li key={src.label} className="flex items-center gap-3">
                      <span className={cn("grid size-6 shrink-0 place-items-center rounded-md", m.bg)}>
                        <Icon className={cn("size-3.5", m.color)} strokeWidth={2.5} />
                      </span>
                      <span className="flex-1 truncate text-sm text-foreground">{src.label}</span>
                      <span className="text-xs font-medium text-muted-foreground">{src.note}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* AI-verified chip */}
          <div className="animate-hero-pop absolute -bottom-3 left-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-md ring-1 ring-foreground/5" style={{ animationDelay: "0.5s" }}>
            <ShieldCheck className="size-4 text-primary" />
            Проверено ИИ-агентом
          </div>
        </div>
      </div>

      {/* pagination dots */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Результат проверки ${i + 1}: ${slide.company}`}
            aria-current={i === active}
            className={cn(
              "h-1.5 rounded-full transition-all focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none",
              i === active ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-muted-foreground",
            )}
          />
        ))}
      </div>
    </div>
  );
}

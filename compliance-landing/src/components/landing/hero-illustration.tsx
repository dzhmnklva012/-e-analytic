"use client";

import * as React from "react";
import {
  Sparkles,
  Briefcase,
  ShieldCheck,
  ShieldAlert,
  Globe2,
  Scale,
  Search,
  AlertTriangle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Slide = {
  badgeIcon: LucideIcon;
  grad: string;
  glow: string;
  bubble: string;
  message: string;
  button: string;
  chipIcon: LucideIcon;
  chipColor: string;
  chipText: string;
};

const slides: Slide[] = [
  {
    badgeIcon: Briefcase,
    grad: "from-[#7c7ae0] to-[#a78bfa]",
    glow: "shadow-[#7c7ae0]/30",
    bubble: "bg-[#f1effb]",
    message: "Анализ завершён. Рисков не обнаружено. Контрагент благонадёжен.",
    button: "Открыть досье",
    chipIcon: ShieldCheck,
    chipColor: "text-success",
    chipText: "Проверено ИИ",
  },
  {
    badgeIcon: ShieldAlert,
    grad: "from-[#f0564b] to-[#ff8a80]",
    glow: "shadow-[#f0564b]/30",
    bubble: "bg-[#fdecec]",
    message: "Найдено совпадение в санкционных списках. Откройте расследование.",
    button: "Открыть дело",
    chipIcon: AlertTriangle,
    chipColor: "text-destructive",
    chipText: "Высокий риск",
  },
  {
    badgeIcon: Globe2,
    grad: "from-[#3b82f6] to-[#60a5fa]",
    glow: "shadow-primary/30",
    bubble: "bg-[#eaf2ff]",
    message: "Проверено по 30+ базам: OFAC, EU, UN. Совпадений не найдено.",
    button: "Полное досье",
    chipIcon: Globe2,
    chipColor: "text-primary",
    chipText: "30+ источников",
  },
  {
    badgeIcon: Scale,
    grad: "from-[#d98521] to-[#f6b14a]",
    glow: "shadow-[#d98521]/30",
    bubble: "bg-[#fdf3e6]",
    message: "Обнаружена связь с публичным лицом (PEP). Требуется решение.",
    button: "Принять решение",
    chipIcon: Search,
    chipColor: "text-warning",
    chipText: "PEP-связь",
  },
];

export function HeroIllustration() {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % slides.length), 4500);
    return () => clearTimeout(id);
  }, [active, paused]);

  const s = slides[active];
  const BadgeIcon = s.badgeIcon;
  const ChipIcon = s.chipIcon;

  return (
    <div className="mx-auto w-full max-w-xl">
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* tilted soft-blue backdrop panel */}
        <div
          className="absolute inset-0 rotate-3 rounded-[2rem] bg-gradient-to-br from-[#eaf1ff] to-[#dde6ff]"
          aria-hidden="true"
        />

        {/* slide (re-mounts on change → entrance animation replays) */}
        <div key={active} className="relative" aria-hidden="true">
          {/* badge */}
          <div
            className={cn(
              "animate-hero-badge absolute -right-2 top-3 z-20 grid size-12 place-items-center rounded-full bg-gradient-to-br text-white shadow-lg",
              s.grad,
              s.glow,
            )}
          >
            <BadgeIcon className="size-5" />
          </div>

          {/* cards */}
          <div className="relative z-10 px-6 pt-8 pb-10 sm:px-8">
            {/* document card */}
            <div className="animate-hero-rise rounded-2xl bg-card p-5 shadow-md ring-1 ring-foreground/5">
              <div className="flex items-center gap-3">
                <span className={cn("grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white", s.grad)}>
                  <Sparkles className="size-4" />
                </span>
                <div className="flex flex-1 flex-col gap-1.5">
                  <span className="skeleton-shimmer block h-2.5 w-1/3 rounded-full bg-muted" />
                  <span className="skeleton-shimmer block h-2 w-1/4 rounded-full bg-muted/70" style={{ animationDelay: "0.3s" }} />
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <span className="skeleton-shimmer block h-2 w-full rounded-full bg-muted" style={{ animationDelay: "0.15s" }} />
                <span className="skeleton-shimmer block h-2 w-11/12 rounded-full bg-muted" style={{ animationDelay: "0.3s" }} />
                <span className="skeleton-shimmer block h-2 w-4/5 rounded-full bg-muted" style={{ animationDelay: "0.45s" }} />
                <span className="skeleton-shimmer block h-2 w-2/3 rounded-full bg-muted/70" style={{ animationDelay: "0.6s" }} />
              </div>
            </div>

            {/* AI assistant result card (overlapping) */}
            <div
              className="animate-hero-rise relative z-10 -mt-3 ml-6 rounded-2xl bg-card p-5 shadow-xl ring-1 ring-foreground/5"
              style={{ animationDelay: "0.22s" }}
            >
              <span className="text-xs font-bold tracking-[0.18em] text-[#7c5ce0]">ИИ-АССИСТЕНТ</span>
              <p className={cn("mt-3 flex min-h-[3.5rem] items-center rounded-xl px-4 py-3 text-sm text-foreground", s.bubble)}>
                {s.message}
              </p>
              <div className="mt-3 grid h-11 w-full place-items-center rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#7c7ae0] text-sm font-semibold text-white shadow-md shadow-[#7c7ae0]/30">
                {s.button}
              </div>
            </div>
          </div>

          {/* verified / risk chip */}
          <div
            className="animate-hero-pop absolute -bottom-3 left-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-md ring-1 ring-foreground/5"
            style={{ animationDelay: "0.55s" }}
          >
            <ChipIcon className={cn("size-4", s.chipColor)} />
            {s.chipText}
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
            aria-label={`Пример проверки ${i + 1}: ${slide.chipText}`}
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

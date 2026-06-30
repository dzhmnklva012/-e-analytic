"use client";

import * as React from "react";
import {
  Globe2,
  FileSearch,
  PhoneCall,
  ShieldAlert,
  Building2,
  Check,
  X,
  AlertTriangle,
  Users,
  MessagesSquare,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { RiskBadge } from "./risk-badge";

/* ── small helpers ────────────────────────────────────────────────────── */

function Pill({ tone, children }: { tone: "blue" | "amber" | "green" | "red" | "muted"; children: React.ReactNode }) {
  const tones = {
    blue: "bg-primary/10 text-primary",
    amber: "bg-warning/10 text-warning",
    green: "bg-success/10 text-success",
    red: "bg-destructive/10 text-destructive",
    muted: "bg-muted text-muted-foreground",
  };
  return <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap", tones[tone])}>{children}</span>;
}

const cardClass =
  "animate-hero-rise flex min-h-[15rem] flex-col gap-4 rounded-2xl bg-card p-5 shadow-xl ring-1 ring-foreground/5";

/* ── module mock cards ────────────────────────────────────────────────── */

function CheckCard() {
  const sources: { label: string; note: string; tone: "ok" | "warn" | "bad" }[] = [
    { label: "Санкционные списки", note: "чисто", tone: "ok" },
    { label: "PEP-реестр", note: "нет", tone: "ok" },
    { label: "Негативные публикации", note: "чисто", tone: "ok" },
    { label: "Корпоративные реестры", note: "действующее", tone: "ok" },
  ];
  const icon = { ok: Check, warn: AlertTriangle, bad: X };
  const col = { ok: "text-success bg-success/10", warn: "text-warning bg-warning/10", bad: "text-destructive bg-destructive/10" };
  return (
    <div className={cardClass}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
            <Building2 className="size-5" />
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-bold text-foreground">ТОО «Альфа Логистик»</span>
            <span className="text-xs text-muted-foreground">Казахстан · проверено сейчас</span>
          </span>
        </div>
        <RiskBadge level="low" />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-muted-foreground">Оценка риска</span>
          <span className="font-bold text-foreground">18/100</span>
        </div>
        <span className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <span className="block h-full w-[18%] rounded-full bg-risk-low" />
        </span>
      </div>
      <ul className="flex flex-col gap-2 border-t border-border pt-3">
        {sources.map((s) => {
          const Icon = icon[s.tone];
          return (
            <li key={s.label} className="flex items-center gap-3">
              <span className={cn("grid size-6 shrink-0 place-items-center rounded-md", col[s.tone])}>
                <Icon className="size-3.5" strokeWidth={2.5} />
              </span>
              <span className="flex-1 truncate text-sm text-foreground">{s.label}</span>
              <span className="text-xs font-medium text-muted-foreground">{s.note}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function InvestigationCard() {
  return (
    <div className={cardClass}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-foreground">Дело №WK-2841</span>
          <span className="text-xs text-muted-foreground">Подозрение в санкционном нарушении</span>
        </div>
        <Pill tone="blue">В работе</Pill>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2 rounded-xl bg-muted/50 p-3">
          <span className="grid size-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">АС</span>
          <span className="flex flex-col">
            <span className="text-xs font-semibold text-foreground">Смит А.</span>
            <span className="text-[11px] text-muted-foreground">Ответственный</span>
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-muted/50 p-3">
          <Users className="size-5 text-primary" />
          <span className="flex flex-col">
            <span className="text-xs font-semibold text-foreground">3 лица · 2 обращения</span>
            <span className="text-[11px] text-muted-foreground">Связано</span>
          </span>
        </div>
      </div>

      {/* stage progress */}
      <div className="mt-auto flex items-center gap-1.5 border-t border-border pt-3 text-[11px] font-medium">
        <span className="text-success">Создано</span>
        <span className="h-px flex-1 bg-border" />
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">В работе</span>
        <span className="h-px flex-1 bg-border" />
        <span className="text-muted-foreground">Отчёт</span>
      </div>
    </div>
  );
}

function StatsCard() {
  const tiles = [
    { value: "1 240", label: "Проверки", tone: "text-primary" },
    { value: "38", label: "Горячая линия", tone: "text-warning" },
    { value: "12", label: "Конфликты", tone: "text-foreground" },
    { value: "7", label: "Подарки", tone: "text-success" },
  ];
  const bars = [40, 64, 52, 80, 58, 72];
  return (
    <div className={cardClass}>
      <div className="grid grid-cols-2 gap-2">
        {tiles.map((t) => (
          <div key={t.label} className="flex flex-col gap-0.5 rounded-xl bg-muted/50 p-3">
            <span className={cn("text-xl font-bold", t.tone)}>{t.value}</span>
            <span className="text-[11px] text-muted-foreground">{t.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto flex items-end gap-1.5 border-t border-border pt-3">
        {bars.map((h, i) => (
          <span
            key={i}
            className={cn("flex-1 rounded-t-sm", i === 3 ? "bg-primary" : "bg-primary/20")}
            style={{ height: `${h * 0.5}px` }}
          />
        ))}
      </div>
    </div>
  );
}

function HotlineCard() {
  const items = [
    { no: "WK-3920", topic: "Конфликт интересов", tone: "amber" as const, status: "Новое" },
    { no: "WK-3915", topic: "Подарок сверх лимита", tone: "blue" as const, status: "В работе" },
    { no: "WK-3902", topic: "Нарушение политики", tone: "muted" as const, status: "Закрыто" },
  ];
  return (
    <div className={cardClass}>
      <ul className="flex flex-col gap-2.5">
        {items.map((it) => (
          <li key={it.no} className="flex items-center gap-3 rounded-xl bg-muted/40 p-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground">
              <MessagesSquare className="size-4" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-semibold text-foreground">№ {it.no}</span>
              <span className="truncate text-xs text-muted-foreground">{it.topic}</span>
            </span>
            <Pill tone={it.tone}>{it.status}</Pill>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SanctionsCard() {
  const rows: { label: string; note: string; tone: "ok" | "bad" }[] = [
    { label: "OFAC (США)", note: "совпадение", tone: "bad" },
    { label: "EU consolidated", note: "чисто", tone: "ok" },
    { label: "UN Security Council", note: "чисто", tone: "ok" },
    { label: "Локальные списки", note: "чисто", tone: "ok" },
  ];
  const icon = { ok: Check, bad: X };
  const col = { ok: "text-success bg-success/10", bad: "text-destructive bg-destructive/10" };
  return (
    <div className={cardClass}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-foreground">Санкционный скрининг</span>
        <Pill tone="red">1 совпадение</Pill>
      </div>
      <ul className="flex flex-col gap-2 border-t border-border pt-3">
        {rows.map((r) => {
          const Icon = icon[r.tone];
          return (
            <li key={r.label} className="flex items-center gap-3">
              <span className={cn("grid size-6 shrink-0 place-items-center rounded-md", col[r.tone])}>
                <Icon className="size-3.5" strokeWidth={2.5} />
              </span>
              <span className="flex-1 truncate text-sm text-foreground">{r.label}</span>
              <span className="text-xs font-medium text-muted-foreground">{r.note}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ── carousel ─────────────────────────────────────────────────────────── */

type Slide = { name: string; icon: LucideIcon; Card: React.ComponentType };

const slides: Slide[] = [
  { name: "Глобальная проверка", icon: Globe2, Card: CheckCard },
  { name: "Расследования", icon: FileSearch, Card: InvestigationCard },
  { name: "Статистика", icon: BarChart3, Card: StatsCard },
  { name: "Горячая линия", icon: PhoneCall, Card: HotlineCard },
  { name: "Санкции", icon: ShieldAlert, Card: SanctionsCard },
];

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
  const ChipIcon = s.icon;
  const ActiveCard = s.Card;

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        {/* tilted backdrop + faint stacked card */}
        <div className="absolute inset-0 rotate-3 rounded-[2rem] bg-gradient-to-br from-[#eaf1ff] to-[#dde6ff]" aria-hidden="true" />
        <div className="absolute inset-x-8 top-10 bottom-12 rounded-2xl bg-card/60 blur-[1px]" aria-hidden="true" />

        {/* slide (re-mounts → entrance replays) */}
        <div key={active} className="relative" aria-hidden="true">
          {/* AI agent badge */}
          <div className="animate-hero-badge absolute -right-2 top-4 z-20 grid size-12 place-items-center rounded-full bg-gradient-to-br from-[#3b82f6] to-[#7c7ae0] text-white shadow-lg shadow-primary/30">
            <Sparkles className="size-5" />
          </div>

          <div className="relative z-10 px-5 pt-9 pb-10 sm:px-7">
            <ActiveCard />
          </div>

          {/* module label chip */}
          <div className="animate-hero-pop absolute -bottom-3 left-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-md ring-1 ring-foreground/5" style={{ animationDelay: "0.5s" }}>
            <ChipIcon className="size-4 text-primary" />
            {s.name}
          </div>
        </div>
      </div>

      {/* pagination dots */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.name}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Модуль: ${slide.name}`}
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

"use client";

import * as React from "react";
import {
  Globe2,
  Gauge,
  FileText,
  FileSearch,
  ChevronDown,
  Search,
  Check,
  Users,
  Download,
  ShieldCheck,
  Clock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Feature = { icon: LucideIcon; title: string; description: string };

const features: Feature[] = [
  {
    icon: Globe2,
    title: "Поиск и скрининг",
    description:
      "ИИ-агент проверяет контрагента по международным базам и санкционным спискам и собирает полное досье за секунды.",
  },
  {
    icon: Gauge,
    title: "Оценка риска",
    description:
      "Риск-скор и флаги формируются автоматически — сразу видно, на что обратить внимание перед решением.",
  },
  {
    icon: FileText,
    title: "Дело и отчёт",
    description:
      "Откройте расследование, свяжите лиц и обращения, зафиксируйте результат и выгрузите отчёт для аудита.",
  },
];

export function HowItWorks() {
  const [active, setActive] = React.useState(0);

  return (
    <Section id="process" className="scroll-mt-20">
      <div className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Как это работает"
          title="Как ИИ ведёт проверку — от поиска до отчёта"
          description="Один поток: сигнал по контрагенту превращается в оценку риска, дело и отчёт."
        />

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* accordion */}
          <Reveal className="flex flex-col gap-3">
            {features.map((f, i) => {
              const Icon = f.icon;
              const open = i === active;
              return (
                <button
                  key={f.title}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-expanded={open}
                  className={cn(
                    "rounded-2xl border bg-card p-5 text-left shadow-sm transition-colors focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none",
                    open ? "border-primary ring-1 ring-primary/25" : "border-border hover:border-primary/30",
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={cn(
                        "grid size-11 shrink-0 place-items-center rounded-xl transition-colors",
                        open ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground",
                      )}
                    >
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="flex-1 text-base font-bold text-foreground">{f.title}</span>
                    <ChevronDown
                      className={cn(
                        "size-5 shrink-0 text-muted-foreground transition-transform",
                        open ? "rotate-180 text-primary" : "-rotate-90",
                      )}
                      aria-hidden="true"
                    />
                  </div>
                  {open && (
                    <p className="mt-3 pl-15 text-sm text-pretty text-muted-foreground">{f.description}</p>
                  )}
                </button>
              );
            })}
          </Reveal>

          {/* stage-specific visual collage */}
          <Reveal dir="right">
            <div key={active} className="animate-hero-rise">
              <FeatureVisuals active={active} />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ── shared bits ──────────────────────────────────────────────────────── */

function MiniCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm", className)}>
      {children}
    </div>
  );
}

const grid = "grid h-[25rem] grid-cols-3 grid-rows-2 gap-4";

function Rings() {
  const c1 = 2 * Math.PI * 42;
  const c2 = 2 * Math.PI * 28;
  return (
    <svg viewBox="0 0 100 100" className="size-24 -rotate-90">
      <circle cx="50" cy="50" r="42" fill="none" stroke="var(--muted)" strokeWidth="7" />
      <circle cx="50" cy="50" r="42" fill="none" stroke="var(--primary)" strokeWidth="7" strokeLinecap="round" strokeDasharray={c1} strokeDashoffset={c1 * 0.3} />
      <circle cx="50" cy="50" r="28" fill="none" stroke="var(--muted)" strokeWidth="7" />
      <circle cx="50" cy="50" r="28" fill="none" stroke="color-mix(in oklch, var(--primary) 60%, white)" strokeWidth="7" strokeLinecap="round" strokeDasharray={c2} strokeDashoffset={c2 * 0.55} />
    </svg>
  );
}

/* ── stage 1: screening across databases ─────────────────────────────── */

function ScreeningVisual() {
  const sources = ["Санкционные списки", "PEP-реестр", "Негативные публикации"];
  return (
    <div className={grid} aria-hidden="true">
      <MiniCard className="col-span-2">
        <span className="text-xs font-bold text-foreground">Скрининг контрагента</span>
        <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-2">
          <Search className="size-4 text-muted-foreground" />
          <span className="truncate text-xs font-medium text-foreground">ТОО «Альфа Логистик»</span>
        </div>
        <ul className="flex flex-1 flex-col justify-between gap-2.5 pt-1">
          {sources.map((s) => (
            <li key={s} className="flex items-center gap-2.5">
              <span className="grid size-5 place-items-center rounded-md bg-success/10">
                <Check className="size-3 text-success" strokeWidth={3} />
              </span>
              <span className="flex-1 text-xs text-foreground">{s}</span>
              <span className="text-[11px] text-muted-foreground">чисто</span>
            </li>
          ))}
        </ul>
      </MiniCard>

      <MiniCard className="row-span-2 items-center justify-between">
        <span className="text-[11px] font-semibold text-muted-foreground">Источники</span>
        <Rings />
        <div className="flex w-full flex-col gap-2">
          {[
            { l: "Санкции", c: "bg-success" },
            { l: "PEP", c: "bg-warning" },
            { l: "Медиа", c: "bg-success" },
          ].map((r) => (
            <div key={r.l} className="flex items-center gap-2">
              <span className={cn("size-2 shrink-0 rounded-full", r.c)} />
              <span className="flex-1 text-[11px] text-foreground">{r.l}</span>
              <span className="h-1.5 w-9 rounded-full bg-muted" />
            </div>
          ))}
        </div>
      </MiniCard>

      <MiniCard className="justify-center">
        <span className="grid size-9 place-items-center rounded-xl bg-secondary text-secondary-foreground">
          <Globe2 className="size-5" />
        </span>
        <span className="text-xs font-semibold text-foreground">Международные базы</span>
        <span className="text-[11px] text-muted-foreground">OFAC · EU · UN · PEP</span>
      </MiniCard>

      <MiniCard className="justify-center">
        <span className="text-xs font-semibold text-foreground">Полное досье</span>
        <span className="text-[11px] text-muted-foreground">Реквизиты, связи и история</span>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-success">
          <Check className="size-3.5" strokeWidth={3} /> Собрано за 2.4 сек
        </span>
      </MiniCard>
    </div>
  );
}

/* ── stage 2: risk scoring ────────────────────────────────────────────── */

function RiskGauge() {
  return (
    <svg viewBox="0 0 100 56" className="w-28">
      <path d="M8 50 A42 42 0 0 1 92 50" fill="none" stroke="var(--muted)" strokeWidth="8" strokeLinecap="round" />
      <path d="M8 50 A42 42 0 0 1 34 13" fill="none" stroke="var(--risk-low)" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

function RiskVisual() {
  const factors = [
    { label: "Санкции", w: 14, tone: "bg-risk-low" },
    { label: "PEP", w: 30, tone: "bg-risk-medium" },
    { label: "Медиа", w: 22, tone: "bg-risk-low" },
    { label: "Финансы", w: 18, tone: "bg-risk-low" },
  ];
  return (
    <div className={grid} aria-hidden="true">
      <MiniCard className="col-span-2">
        <span className="text-xs font-bold text-foreground">Уровень риска</span>
        <div className="flex flex-1 items-center gap-5">
          <div className="relative grid shrink-0 place-items-center">
            <RiskGauge />
            <span className="absolute top-4 text-2xl font-bold text-foreground">18</span>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-risk-low/10 px-3 py-1 text-xs font-semibold text-risk-low">
              Низкий риск
            </span>
            <span className="text-xs text-pretty text-muted-foreground">
              Совпадений в санкционных списках не найдено.
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-success">
              <Check className="size-3.5" strokeWidth={3} /> Рекомендуется к работе
            </span>
          </div>
        </div>
      </MiniCard>

      <MiniCard className="row-span-2">
        <span className="text-[11px] font-semibold text-muted-foreground">Факторы риска</span>
        <div className="flex flex-1 flex-col justify-center gap-3.5">
          {factors.map((f) => (
            <div key={f.label} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-foreground">{f.label}</span>
                <span className="font-semibold text-muted-foreground">{f.w}%</span>
              </div>
              <span className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <span className={cn("block h-full rounded-full", f.tone)} style={{ width: `${f.w}%` }} />
              </span>
            </div>
          ))}
        </div>
        <span className="inline-flex items-center gap-1.5 border-t border-border pt-3 text-[11px] font-medium text-success">
          <Check className="size-3.5" strokeWidth={3} /> Итог: низкий риск
        </span>
      </MiniCard>

      <MiniCard className="justify-center">
        <span className="grid size-9 place-items-center rounded-xl bg-success/10 text-success">
          <ShieldCheck className="size-5" />
        </span>
        <span className="text-lg font-bold text-foreground">0 совпадений</span>
        <span className="text-[11px] text-muted-foreground">Санкционные списки</span>
      </MiniCard>

      <MiniCard className="justify-center">
        <span className="grid size-9 place-items-center rounded-xl bg-secondary text-secondary-foreground">
          <Clock className="size-5" />
        </span>
        <span className="text-lg font-bold text-foreground">2.4 сек</span>
        <span className="text-[11px] text-muted-foreground">Время оценки</span>
      </MiniCard>
    </div>
  );
}

/* ── stage 3: case & report ───────────────────────────────────────────── */

function CaseVisual() {
  return (
    <div className={grid} aria-hidden="true">
      <MiniCard className="col-span-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-foreground">Дело №WK-2841</span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">В работе</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">АС</span>
          <span className="text-xs text-muted-foreground">Ответственный · Смит А.</span>
        </div>
        <div className="mt-auto flex items-center gap-1.5 text-[10px] font-medium">
          <span className="text-success">Создано</span>
          <span className="h-px flex-1 bg-border" />
          <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-primary">В работе</span>
          <span className="h-px flex-1 bg-border" />
          <span className="text-muted-foreground">Отчёт</span>
        </div>
      </MiniCard>

      <MiniCard className="row-span-2">
        <span className="grid size-9 place-items-center rounded-xl bg-secondary text-secondary-foreground">
          <FileSearch className="size-5" />
        </span>
        <span className="text-xs font-bold text-foreground">Отчёт о расследовании</span>
        <span className="text-[11px] text-muted-foreground">Выводы, доказательства, рекомендации</span>
        <div className="flex flex-1 flex-col justify-center gap-2">
          <span className="h-2 w-full rounded-full bg-muted" />
          <span className="h-2 w-5/6 rounded-full bg-muted" />
          <span className="h-2 w-full rounded-full bg-muted" />
          <span className="h-2 w-2/3 rounded-full bg-muted/70" />
        </div>
        <span className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-[11px] font-semibold text-primary-foreground">
          <Download className="size-3.5" /> Скачать · DOCX, PDF
        </span>
      </MiniCard>

      <MiniCard className="justify-center">
        <Users className="size-5 text-primary" />
        <span className="text-xs font-semibold text-foreground">3 лица · 2 обращения</span>
        <span className="text-[11px] text-muted-foreground">Связано</span>
      </MiniCard>

      <MiniCard className="justify-center">
        <span className="grid size-9 place-items-center rounded-xl bg-success/10 text-success">
          <Check className="size-5" strokeWidth={2.5} />
        </span>
        <span className="text-[11px] text-muted-foreground">Готово к отчёту</span>
      </MiniCard>
    </div>
  );
}

function FeatureVisuals({ active }: { active: number }) {
  if (active === 1) return <RiskVisual />;
  if (active === 2) return <CaseVisual />;
  return <ScreeningVisual />;
}

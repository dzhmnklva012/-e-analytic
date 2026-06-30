"use client";

import * as React from "react";
import { Globe2, Gauge, FileText, ChevronDown } from "lucide-react";
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

          {/* dashboard visual collage */}
          <Reveal dir="right">
            <FeatureVisuals />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ── decorative dashboard collage ─────────────────────────────────────── */

const bars = [38, 60, 30, 78, 44, 52, 88, 34, 70];

function MiniCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm", className)}>
      <span className="h-2.5 w-10 rounded-full bg-muted" />
      {children}
    </div>
  );
}

function FeatureVisuals() {
  return (
    <div className="grid h-[26rem] grid-cols-3 grid-rows-2 gap-4" aria-hidden="true">
      {/* bar chart */}
      <MiniCard className="col-span-2">
        <div className="flex flex-1 items-end justify-between gap-1.5">
          {bars.map((h, i) => (
            <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
              <div
                className="w-2.5 rounded-full bg-gradient-to-t from-primary to-primary/50"
                style={{ height: `${h}%` }}
              />
              <span className="h-1.5 w-4 rounded-full bg-muted" />
            </div>
          ))}
        </div>
      </MiniCard>

      {/* radial rings */}
      <MiniCard className="row-span-2">
        <div className="grid flex-1 place-items-center">
          <svg viewBox="0 0 100 100" className="size-28 -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="var(--muted)" strokeWidth="7" />
            <circle
              cx="50" cy="50" r="42" fill="none" stroke="var(--primary)" strokeWidth="7"
              strokeLinecap="round" strokeDasharray={2 * Math.PI * 42} strokeDashoffset={2 * Math.PI * 42 * 0.32}
            />
            <circle cx="50" cy="50" r="28" fill="none" stroke="var(--muted)" strokeWidth="7" />
            <circle
              cx="50" cy="50" r="28" fill="none" stroke="color-mix(in oklch, var(--primary) 65%, white)" strokeWidth="7"
              strokeLinecap="round" strokeDasharray={2 * Math.PI * 28} strokeDashoffset={2 * Math.PI * 28 * 0.55}
            />
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary" />
              <span className="h-2 flex-1 rounded-full bg-muted" style={{ maxWidth: `${80 - i * 18}%` }} />
            </div>
          ))}
        </div>
      </MiniCard>

      {/* gauge */}
      <MiniCard>
        <div className="grid flex-1 place-items-center">
          <svg viewBox="0 0 100 56" className="w-24">
            <path d="M8 50 A42 42 0 0 1 92 50" fill="none" stroke="var(--muted)" strokeWidth="8" strokeLinecap="round" />
            <path d="M8 50 A42 42 0 0 1 78 18" fill="none" stroke="var(--primary)" strokeWidth="8" strokeLinecap="round" />
          </svg>
        </div>
        <span className="h-2 w-2/3 self-center rounded-full bg-muted" />
      </MiniCard>

      {/* people list */}
      <MiniCard>
        <div className="flex flex-1 flex-col justify-center gap-2.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="size-6 shrink-0 rounded-full bg-secondary" />
              <span className="flex flex-1 flex-col gap-1">
                <span className="h-1.5 w-2/3 rounded-full bg-muted" />
                <span className="h-1.5 w-1/2 rounded-full bg-muted/70" />
              </span>
            </div>
          ))}
        </div>
      </MiniCard>
    </div>
  );
}

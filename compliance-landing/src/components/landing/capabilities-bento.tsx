import {
  Globe2,
  FileSearch,
  ShieldAlert,
  FolderOpen,
  BarChart3,
  PhoneCall,
  ArrowUpRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

function Cell({
  icon: Icon,
  title,
  desc,
  className,
  delay = 0,
  children,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  className?: string;
  delay?: number;
  children?: React.ReactNode;
}) {
  return (
    <Reveal
      delay={delay}
      className={cn(
        "group flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg sm:p-7",
        className,
      )}
    >
      <span className="grid size-11 place-items-center rounded-xl bg-secondary text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-base font-bold text-foreground">{title}</h3>
        <p className="text-sm text-pretty text-muted-foreground">{desc}</p>
      </div>
      {children}
    </Reveal>
  );
}

export function CapabilitiesBento() {
  return (
    <section id="capabilities" className="relative scroll-mt-20 overflow-hidden bg-[#070711] py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(50% 40% at 50% 0%, color-mix(in oklch, var(--primary) 14%, transparent), transparent 70%)" }}
        aria-hidden="true"
      />

      <Container className="relative flex flex-col gap-12">
        <SectionHeading
          eyebrow="Возможности сервиса"
          title="Один сервис — весь комплаенс"
          description="Проверка, расследования, санкции, досье и аналитика — связанный набор модулей в единой системе."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(11rem,1fr)]">
          {/* flagship — large */}
          <Cell
            icon={Globe2}
            title="Глобальная проверка"
            desc="ИИ-агент сверяет контрагента с международными базами и санкционными списками за секунды и собирает полное досье."
            className="lg:col-span-2 lg:row-span-2 lg:justify-between"
          >
            <div className="mt-auto flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0e1020]/60 p-4">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-foreground">94%</span>
                <span className="text-xs text-muted-foreground">Точность скоринга</span>
              </div>
              <div className="relative grid size-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#6d80ff] to-[#3b56f5] shadow-[0_0_40px_rgba(91,124,255,0.5)]">
                <span className="text-lg font-extrabold text-white">ИИ</span>
              </div>
            </div>
          </Cell>

          {/* wide — investigations */}
          <Cell
            icon={FileSearch}
            title="Расследования"
            desc="Кейс-менеджмент: дело, связанные лица и обращения, ответственный и итоговый отчёт."
            className="lg:col-span-2"
          >
            <div className="mt-auto flex flex-wrap gap-2">
              {["В работе", "3 лица", "2 обращения"].map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </Cell>

          {/* small — sanctions */}
          <Cell
            icon={ShieldAlert}
            title="Санкции"
            desc="Скрининг по OFAC, EU, UN и локальным спискам."
          />

          {/* small — dossier */}
          <Cell
            icon={FolderOpen}
            title="Досье"
            desc="Профили физических и юридических лиц."
          />

          {/* wide — analytics with mini chart */}
          <Cell
            icon={BarChart3}
            title="Аналитика в реальном времени"
            desc="Дашборды KPI, рисков и нагрузки — всегда актуальные."
            className="lg:col-span-2"
          >
            <div className="mt-auto flex h-14 items-end gap-1.5">
              {[40, 62, 48, 78, 56, 88, 64, 72].map((h, i) => (
                <span
                  key={i}
                  className={cn("flex-1 rounded-t-sm", i === 5 ? "bg-primary" : "bg-primary/25")}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </Cell>

          {/* wide — hotline */}
          <Cell
            icon={PhoneCall}
            title="Горячая линия"
            desc="Приём обращений и жалоб, которые автоматически попадают в расследования."
            className="lg:col-span-2"
          >
            <a
              href="#pricing"
              className="mt-auto inline-flex w-fit items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Все модули
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </Cell>
        </div>
      </Container>
    </section>
  );
}

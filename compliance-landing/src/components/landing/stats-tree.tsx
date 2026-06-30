import { ShieldCheck } from "lucide-react";
import { Section } from "@/components/ui/section";

const topStats = [
  { value: "99.9%", label: "Гарантия аптайма" },
  { value: "30 000+", label: "Проверок в месяц" },
  { value: "67%", label: "Меньше ручной работы" },
];

const bottomStats = [
  { value: "12 000+", label: "Пользователей по миру" },
  { value: "24M+", label: "Записей проверено" },
];

export function StatsTree() {
  return (
    <Section id="about">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-3">
          <span className="inline-flex w-fit items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
            О платформе
          </span>
          <h2 className="max-w-md text-2xl font-bold tracking-tight text-balance sm:text-3xl">
            Создано, чтобы усилить каждую проверку
          </h2>
        </div>
        <p className="max-w-sm text-sm text-pretty text-muted-foreground">
          Мы помогаем банкам и комплаенс-командам строить более защищённые и предсказуемые отношения
          с контрагентами.
        </p>
      </div>

      {/* tree */}
      <div className="mt-14 flex flex-col items-center">
        <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-[#068dff] to-[#60a5fa] text-white shadow-lg shadow-primary/30">
          <ShieldCheck className="size-6" aria-hidden="true" />
        </span>

        {/* connectors (desktop) */}
        <div className="relative hidden h-10 w-full max-w-3xl lg:block" aria-hidden="true">
          <span className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 bg-border" />
          <span className="absolute left-[16.66%] right-[16.66%] top-5 h-px bg-border" />
          <span className="absolute left-[16.66%] top-5 h-5 w-px bg-border" />
          <span className="absolute left-1/2 top-5 h-5 w-px -translate-x-1/2 bg-border" />
          <span className="absolute right-[16.66%] top-5 h-5 w-px bg-border" />
        </div>

        <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-0">
          {topStats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-card px-4 py-6 text-center"
            >
              <span className="text-3xl font-bold text-foreground">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
          {bottomStats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-muted/50 px-4 py-6 text-center"
            >
              <span className="text-3xl font-bold text-primary">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

import { ShieldCheck, Lock, MoreHorizontal } from "lucide-react";
import { Container } from "@/components/ui/container";
import { RiskBadge } from "./risk-badge";

const activity = [
  { initials: "АЛ", name: "ТОО «Альфа Логистик»", note: "Скрининг завершён", risk: "low" as const },
  { initials: "NT", name: "Nordwind Trading Ltd", note: "Найдено совпадение", risk: "high" as const },
  { initials: "ГБ", name: "GAZPROMBANK", note: "PEP-связь", risk: "medium" as const },
];

const months = ["Я", "Ф", "М", "А", "М", "И", "И", "А", "С", "О", "Н", "Д"];
const sales = [38, 52, 44, 66, 58, 72, 90, 64, 78, 56, 84, 70];

export function FeaturesDashboard() {
  return (
    <section id="features" className="py-16 sm:py-20 lg:py-24">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
              Сценарии использования
            </span>
            <h2 className="max-w-md text-2xl font-bold tracking-tight text-balance sm:text-3xl">
              Мощные возможности для вашего комплаенса
            </h2>
          </div>
          <p className="max-w-sm text-sm text-pretty text-muted-foreground">
            Откройте всё, что нужно для уверенной работы с контрагентами — в одной связанной системе.
          </p>
        </div>

        {/* dashboard panel */}
        <div className="rounded-3xl border border-border bg-card/40 p-4 backdrop-blur-sm sm:p-6">
          <div className="grid gap-4 lg:grid-cols-3">
            {/* activity */}
            <div className="rounded-2xl border border-border bg-card p-5 lg:col-span-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-foreground">Активность</span>
                <MoreHorizontal className="size-4 text-muted-foreground" aria-hidden="true" />
              </div>
              <ul className="mt-4 flex flex-col gap-3">
                {activity.map((item) => (
                  <li key={item.name} className="flex items-center gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                      {item.initials}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-sm font-semibold text-foreground">{item.name}</span>
                      <span className="truncate text-xs text-muted-foreground">{item.note}</span>
                    </span>
                    <RiskBadge level={item.risk} />
                  </li>
                ))}
              </ul>
            </div>

            {/* security */}
            <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5">
              <span className="text-sm font-bold text-foreground">Безопасность</span>
              <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
                <span className="relative grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-[#3b82f6] to-[#5b8def] text-white shadow-lg shadow-primary/30">
                  <Lock className="size-7" aria-hidden="true" />
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-foreground">Данные под защитой</span>
                  <span className="text-xs text-muted-foreground">Шифрование и роли доступа</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-success">
                <ShieldCheck className="size-4" aria-hidden="true" />
                <span className="text-xs font-medium">Соответствие AML/KYC</span>
              </div>
            </div>
          </div>

          {/* average load chart */}
          <div className="mt-4 rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-foreground">Проверки по месяцам</span>
              <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                Этот год
              </span>
            </div>
            <div className="mt-6 flex h-44 gap-2">
              {sales.map((h, i) => (
                <div key={i} className="flex flex-1 flex-col items-center justify-end gap-2">
                  <div className="relative w-full" style={{ height: `${h}%` }}>
                    {i === 6 && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full rounded-md bg-foreground px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap text-background">
                        7 240
                      </span>
                    )}
                    <div
                      className={i === 6 ? "h-full w-full rounded-t-md bg-primary" : "h-full w-full rounded-t-md bg-primary/15"}
                    />
                  </div>
                  <span className="text-[11px] text-muted-foreground">{months[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

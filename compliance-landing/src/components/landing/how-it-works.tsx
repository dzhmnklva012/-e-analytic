import { Search, Gauge, FileSearch, FileCheck2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

type Step = { icon: LucideIcon; title: string; description: string };

const steps: Step[] = [
  {
    icon: Search,
    title: "Запустите проверку",
    description:
      "Введите название компании — ИИ-агент соберёт данные по международным базам и санкционным спискам.",
  },
  {
    icon: Gauge,
    title: "Получите оценку риска",
    description: "Риск-скор, флаги и полное досье формируются за секунды, а не за дни.",
  },
  {
    icon: FileSearch,
    title: "Откройте дело",
    description:
      "При необходимости заведите расследование: свяжите лица, обращения и ответственного.",
  },
  {
    icon: FileCheck2,
    title: "Закройте с отчётом",
    description: "Зафиксируйте результат и выгрузите отчёт для аудита одним кликом.",
  },
];

export function HowItWorks() {
  return (
    <Section id="process" className="scroll-mt-20">
      <div className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Как это работает"
          title="От сигнала до решения — за 4 шага"
          description="Единый рабочий процесс: сигнал по контрагенту превращается в оценку риска, дело и отчёт."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal
                key={step.title}
                delay={i * 90}
                className="relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-xl bg-secondary text-secondary-foreground">
                    <Icon className="size-6" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-3xl font-extrabold text-primary/25">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                <p className="text-sm text-pretty text-muted-foreground">{step.description}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

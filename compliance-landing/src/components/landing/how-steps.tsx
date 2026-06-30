import { Search, Gauge, FileCheck2, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

type Step = {
  icon: LucideIcon;
  title: string;
  description: string;
};

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
    description:
      "ML-скоринг и NLP-анализ публикаций возвращают уровень риска и полное досье за секунды.",
  },
  {
    icon: FileCheck2,
    title: "Примите решение",
    description:
      "Откройте дело, привяжите обращения и лиц, зафиксируйте результат и выгрузите отчёт для аудита.",
  },
];

export function HowSteps() {
  return (
    <Section id="how">
      <div className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Возможности"
          title="Как это работает за 3 простых шага"
          description="Умный способ находить риски, вести дела и принимать защищённые решения по контрагентам."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-foreground/5"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-xl bg-secondary text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-sm font-semibold text-muted-foreground">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                <p className="flex-1 text-sm text-pretty text-muted-foreground">{step.description}</p>
                <a
                  href="#pricing"
                  className="inline-flex w-fit items-center gap-1.5 rounded-md text-sm font-semibold text-primary hover:underline focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
                >
                  Подробнее
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

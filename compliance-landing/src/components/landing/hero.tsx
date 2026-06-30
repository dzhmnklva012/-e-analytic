import { ArrowRight, Sparkles, Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { HeroPanel } from "./hero-panel";

const stats = [
  { value: "12 480", label: "Всего проверок" },
  { value: "9 310", label: "Без риска" },
  { value: "1 240 ч", label: "Сэкономлено" },
  { value: "42 сек", label: "Средний скрининг" },
];

const trust = ["14 дней бесплатно", "Без карты", "Поддержка 24/7"];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* subtle top wash */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{ background: "radial-gradient(60% 60% at 50% -10%, color-mix(in oklch, var(--primary) 10%, transparent), transparent 70%)" }}
        aria-hidden="true"
      />

      <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-12 lg:py-24">
        {/* copy */}
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
            <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
            ИИ-проверка контрагентов
            <span className="ml-1 size-2 rounded-full bg-success" aria-hidden="true" />
          </span>

          <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Проверка контрагентов{" "}
            <span className="text-primary">в реальном времени</span>
          </h1>

          <p className="max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
            Введите название компании — ИИ-агент проверит её по международным базам и санкционным
            спискам, оценит уровень риска и соберёт полное досье. Быстрее, точнее и предсказуемее
            ручной проверки.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#pricing" className={cn(buttonVariants({ size: "lg" }), "h-11 rounded-full px-6 text-sm")}>
              Запросить демо
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#how"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 rounded-full px-6 text-sm",
              )}
            >
              Как это работает
            </a>
          </div>

          {/* trust row */}
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {trust.map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Check className="size-4 text-success" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          {/* stats */}
          <dl className="mt-2 grid w-full max-w-xl grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-2xl font-bold tracking-tight text-primary">{stat.value}</dd>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </dl>
        </div>

        {/* dashboard panel */}
        <div className="w-full">
          <HeroPanel />
        </div>
      </Container>
    </section>
  );
}

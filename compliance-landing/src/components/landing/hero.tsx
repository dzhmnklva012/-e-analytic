import { CheckCircle2, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { ScreeningDemo } from "@/components/landing/screening-demo";

const HERO_POINTS = [
  "Международные базы и санкционные списки",
  "Риск-скоринг и полное досье за секунды",
  "От проверки до расследования — в одной системе",
];

function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-border bg-gradient-to-b from-secondary/50 via-background to-background"
    >
      <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-3xl border border-border bg-card px-3 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5" aria-hidden />
            ИИ-агент международного поиска
          </span>

          <h1
            id="hero-title"
            className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Проверка контрагентов и санкционный скрининг на базе ИИ
          </h1>

          <p className="max-w-[560px] text-base text-muted-foreground sm:text-lg">
            Введите название компании — ИИ проверит её по международным базам и
            санкционным спискам, оценит уровень риска и покажет полное досье.
          </p>

          <ul className="flex flex-col gap-2">
            {HERO_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle2 className="size-4 shrink-0 text-success" aria-hidden />
                {point}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink size="lg" href="#contact">
              Запросить демо
            </ButtonLink>
            <ButtonLink size="lg" variant="outline" href="#how">
              Как это работает
            </ButtonLink>
          </div>
        </div>

        {/* Interactive screening demo */}
        <div className="rounded-2xl border border-border bg-card/70 p-4 shadow-sm backdrop-blur-sm sm:p-6">
          <ScreeningDemo />
        </div>
      </Container>
    </section>
  );
}

export { Hero };

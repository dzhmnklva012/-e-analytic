import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { ScreeningDemo } from "./screening-demo";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" aria-hidden="true" />

      <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        {/* copy */}
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-secondary-foreground">
            <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
            ИИ-проверка контрагентов и санкционный скрининг
          </span>

          <h1 className="text-4xl leading-tight font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Проверьте контрагента <span className="text-primary">за секунды</span>, а не за дни
          </h1>

          <p className="max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
            ADATA Compliance — платформа AML/KYC due-diligence. Введите название компании, и
            ИИ-агент проверит её по международным базам и санкционным спискам, оценит уровень
            риска и покажет полное досье.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#pricing" className={cn(buttonVariants({ size: "lg" }), "h-11 px-5 text-sm")}>
              Попробовать бесплатно
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#how"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 px-5 text-sm")}
            >
              Как это работает
            </a>
          </div>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <li className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-success" aria-hidden="true" />
              Защищённые KYC/AML-решения
            </li>
            <li className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-success" aria-hidden="true" />
              Полный аудиторский след
            </li>
            <li className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-success" aria-hidden="true" />
              11 модулей в одной системе
            </li>
          </ul>
        </div>

        {/* interactive demo */}
        <div className="w-full">
          <ScreeningDemo />
        </div>
      </Container>
    </section>
  );
}

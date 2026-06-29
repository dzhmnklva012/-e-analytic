import { ArrowRight, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { HeroBento } from "./hero-bento";

export function Hero() {
  return (
    <section id="top" className="relative -mt-16 overflow-hidden">
      {/* gradient mesh + fine grid */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[820px] bg-mesh" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[820px] bg-grid opacity-[0.35] [mask-image:radial-gradient(70%_55%_at_50%_0%,black,transparent)]"
        aria-hidden="true"
      />

      <Container className="relative z-10 flex flex-col items-center pt-28 pb-16 text-center sm:pt-32 sm:pb-20">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
          <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
          ИИ-агент международного поиска
          <span className="ml-1 size-2 rounded-full bg-success" aria-hidden="true" />
        </span>

        <h1 className="mt-6 max-w-4xl text-balance text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
          <span className="text-gradient">Комплаенс</span>, который видит риск раньше всех
        </h1>

        <p className="mt-6 max-w-2xl text-base text-pretty text-muted-foreground sm:text-lg">
          Введите название компании — ИИ-агент проверит её по международным базам и санкционным
          спискам, оценит риск и соберёт полное досье. Быстрее, точнее и предсказуемее ручной
          проверки.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href="#demo" className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full px-6 text-sm")}>
            Получить бесплатный ИИ-аудит
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
          <a
            href="#how"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 rounded-full px-6 text-sm",
            )}
          >
            Как это работает
          </a>
        </div>

        {/* bento product grid */}
        <div className="mt-14 w-full max-w-5xl text-left sm:mt-16">
          <HeroBento />
        </div>
      </Container>
    </section>
  );
}

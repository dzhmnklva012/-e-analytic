import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { AiNetwork } from "./ai-network";
import { AiScoreCard } from "./ai-score-card";
import { AiTerminalCard } from "./ai-terminal-card";
import { HeroMarquee } from "./hero-marquee";

const stats = [
  { value: "+312%", label: "Рост проверок", accent: true },
  { value: "2.4M+", label: "Записей в базах" },
  { value: "3.2×", label: "Быстрее аудита" },
  { value: "94%", label: "Точность скоринга" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
        aria-hidden="true"
      />

      <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-10 lg:py-24">
        {/* copy */}
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card py-1 pr-3 pl-1 text-xs font-semibold text-foreground shadow-sm">
            <span className="grid size-6 place-items-center rounded-full bg-gradient-to-br from-[#0070eb] to-[#5b8def] text-white">
              <Sparkles className="size-3.5" aria-hidden="true" />
            </span>
            ИИ-проверка контрагентов · Алматы
            <span className="ml-1 size-2 rounded-full bg-success" aria-hidden="true" />
          </span>

          <h1 className="text-5xl font-extrabold tracking-tight text-balance sm:text-6xl">
            <span className="block leading-[1.02]">
              Комплаенс, что <span className="text-primary">думает.</span>
            </span>
            <span className="block leading-[1.02]">
              Комплаенс, что{" "}
              <span className="font-normal text-primary/90 italic">учится.</span>
            </span>
          </h1>

          <p className="max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
            Мы объединяем ML-поиск по санкционным базам, NLP-анализ публикаций и предиктивный
            скоринг риска — чтобы решения по контрагентам принимались быстрее, точнее и
            предсказуемее, чем при любой ручной проверке.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#demo" className={cn(buttonVariants({ size: "lg" }), "h-11 px-5 text-sm")}>
              Получить бесплатный ИИ-аудит
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#modules"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 px-5 text-sm")}
            >
              Возможности ИИ
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>

          {/* stats */}
          <dl className="mt-2 grid w-full max-w-xl grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6 sm:grid-cols-4 sm:divide-x sm:divide-border">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col sm:px-4 sm:first:pl-0">
                <dt className="sr-only">{stat.label}</dt>
                <dd
                  className={cn(
                    "text-xl font-bold",
                    stat.accent ? "text-primary" : "text-foreground",
                  )}
                >
                  {stat.value}
                </dd>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </dl>
        </div>

        {/* network diagram (desktop) */}
        <div className="w-full">
          <AiNetwork />

          {/* stacked fallback for small screens */}
          <div className="flex flex-col items-center gap-6 lg:hidden">
            <AiScoreCard />
            <AiTerminalCard />
          </div>
        </div>
      </Container>

      <HeroMarquee />
    </section>
  );
}

import { ArrowRight, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { ChecksCard, AccuracyCard } from "./hero-dashboard-cards";

export function Hero() {
  return (
    <section id="top" className="relative -mt-16">
      {/* sky background (extends behind the sticky header) */}
      <div className="absolute inset-x-0 top-0 h-[744px] bg-sky" aria-hidden="true" />
      {/* drifting clouds */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[744px] overflow-hidden" aria-hidden="true">
        <div className="cloud animate-drift absolute left-[8%] top-[38%] h-40 w-72 rounded-full opacity-80" />
        <div className="cloud animate-drift absolute right-[6%] top-[30%] h-48 w-96 rounded-full opacity-70" style={{ animationDelay: "3s" }} />
        <div className="cloud animate-drift absolute left-[34%] top-[52%] h-56 w-[32rem] rounded-full opacity-90" style={{ animationDelay: "6s" }} />
        <div className="cloud absolute left-[60%] top-[18%] h-28 w-56 rounded-full opacity-60" />
      </div>

      <Container className="relative z-10 flex flex-col items-center pt-28 pb-0 text-center sm:pt-32">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/25 backdrop-blur-sm">
          <Sparkles className="size-3.5" aria-hidden="true" />
          ИИ-агент международного поиска
        </span>

        <h1 className="mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
          Будущее проверки контрагентов начинается здесь
        </h1>

        <p className="mt-5 max-w-xl text-base text-pretty text-white/85 sm:text-lg">
          Умная платформа, которая помогает банкам и комплаенс-командам проверять контрагентов,
          отслеживать риски и принимать защищённые решения — на базе ИИ.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#demo"
            className={cn(buttonVariants({ size: "lg" }), "h-11 rounded-full bg-white px-6 text-sm text-primary hover:bg-white/90")}
          >
            Начать бесплатно
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
          <a
            href="#how"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 rounded-full border-white/40 bg-white/10 px-6 text-sm text-white backdrop-blur-sm hover:bg-white/20 hover:text-white",
            )}
          >
            Заказать демо
          </a>
        </div>

        {/* floating dashboard cards over the cloud→white transition */}
        <div className="mt-12 grid w-full max-w-4xl gap-4 sm:mt-16 sm:grid-cols-2 lg:gap-6">
          <ChecksCard className="sm:translate-y-2" />
          <AccuracyCard className="sm:-translate-y-2" />
        </div>
      </Container>
    </section>
  );
}

import { ArrowRight, Sparkles, ShieldAlert, Bot, FolderOpen, Database } from "lucide-react";
import { Container } from "@/components/ui/container";
import { HeroIllustration } from "./hero-illustration";

const chips = [
  { icon: ShieldAlert, label: "Санкционный скрининг" },
  { icon: Bot, label: "ИИ-ассистент" },
  { icon: FolderOpen, label: "Полное досье" },
  { icon: Database, label: "30+ баз данных" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px]"
        style={{ background: "radial-gradient(55% 60% at 60% -10%, color-mix(in oklch, var(--primary) 10%, transparent), transparent 70%)" }}
        aria-hidden="true"
      />

      <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-12 lg:py-24">
        {/* copy */}
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-bold">
            <Sparkles className="size-4 text-[#7c7ae0]" aria-hidden="true" />
            <span className="bg-gradient-to-r from-primary to-[#7c7ae0] bg-clip-text text-transparent">
              Управление комплаенсом на базе ИИ
            </span>
          </span>

          <h1 className="text-5xl font-extrabold tracking-tight text-balance text-foreground sm:text-6xl lg:text-7xl">
            Комплаенс{" "}
            <span className="bg-gradient-to-r from-primary to-[#60a5fa] bg-clip-text text-transparent">
              в один клик
            </span>
          </h1>

          <p className="max-w-lg text-lg text-pretty text-muted-foreground">
            Проверяйте по санкционным спискам, оценивайте уровень риска и собирайте полное досье
            с помощью ИИ — всё в одной платформе.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#pricing"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
            >
              Начать проверку
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#how"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-card px-7 text-base font-semibold text-foreground transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
            >
              Узнать больше
            </a>
          </div>

          <ul className="flex flex-wrap gap-3 pt-2">
            {chips.map((chip) => (
              <li key={chip.label}>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground">
                  <chip.icon className="size-4 text-muted-foreground" aria-hidden="true" />
                  {chip.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* illustration */}
        <div className="w-full">
          <HeroIllustration />
        </div>
      </Container>
    </section>
  );
}

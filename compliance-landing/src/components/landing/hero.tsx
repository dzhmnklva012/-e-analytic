import { Fingerprint, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* subtle ambient wash */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[640px]"
        style={{ background: "radial-gradient(55% 55% at 50% 0%, color-mix(in oklch, var(--primary) 9%, transparent), transparent 70%)" }}
        aria-hidden="true"
      />

      <Container className="relative flex flex-col items-center gap-8 py-24 text-center sm:py-28 lg:py-32">
        <h1 className="flex max-w-5xl flex-wrap items-center justify-center gap-x-4 gap-y-2 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-7xl">
          <span className="text-muted-foreground/70">Будущее</span>
          <span className="text-muted-foreground/70">комплаенса</span>
          <span className="text-muted-foreground/70">—&nbsp;это</span>
          <Fingerprint
            className="size-[0.9em] text-primary drop-shadow-[0_0_12px_color-mix(in_oklch,var(--primary)_45%,transparent)]"
            strokeWidth={2}
            aria-hidden="true"
          />
          <span className="text-foreground">человек</span>
          <span className="text-muted-foreground/70">+</span>
          <Sparkles
            className="size-[0.9em] text-primary drop-shadow-[0_0_14px_color-mix(in_oklch,var(--primary)_55%,transparent)]"
            strokeWidth={2}
            aria-hidden="true"
          />
          <span className="text-foreground">ИИ</span>
        </h1>

        <p className="max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
          Мы помогаем находить нужные проверки, отслеживать риски и закрывать пробелы — чтобы ваш
          комплаенс уверенно работал в эпоху GenAI.
        </p>

        <a
          href="#pricing"
          className="inline-flex h-12 items-center justify-center rounded-2xl bg-primary px-8 text-base font-semibold text-primary-foreground shadow-[0_0_44px_color-mix(in_oklch,var(--primary)_38%,transparent)] transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
        >
          Начать проверку
        </a>
      </Container>
    </section>
  );
}

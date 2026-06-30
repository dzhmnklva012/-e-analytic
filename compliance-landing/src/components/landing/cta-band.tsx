import { Container } from "@/components/ui/container";
import { CtaForm } from "./cta-form";

export function CtaBand() {
  return (
    <Container id="cta" className="scroll-mt-20 py-16 sm:py-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e8bff] to-[#0560c8] px-6 py-14 text-center shadow-xl shadow-primary/20 sm:px-12 sm:py-16">
        {/* soft glow + faint grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.45),transparent)]"
          aria-hidden="true"
        />
        <div
          className="bg-grid pointer-events-none absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(70%_100%_at_50%_0%,black,transparent)]"
          aria-hidden="true"
        />

        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
          <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/25">
            Давайте начнём
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl">
            Готовы проверять контрагентов умнее?
          </h2>
          <p className="max-w-lg text-base text-pretty text-white/85">
            Оставьте email — покажем платформу на ваших данных и поможем провести первые проверки.
          </p>
          <CtaForm onDark />
        </div>
      </div>
    </Container>
  );
}

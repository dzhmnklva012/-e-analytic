import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { CapabilityOrb } from "./capability-orb";
import { CapabilityList } from "./capability-list";

export function ServiceCapabilities() {
  return (
    <section id="capabilities" className="relative scroll-mt-20 overflow-hidden bg-[#0a0b12] py-20 sm:py-28">
      {/* ambient glows */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 78% 30%, color-mix(in oklch, #068dff 22%, transparent), transparent 70%), radial-gradient(40% 40% at 80% 75%, color-mix(in oklch, #7c7ae0 20%, transparent), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
            <span className="size-1.5 rounded-full bg-[#4aa3ff]" />
            Возможности сервиса
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl">
            Один сервис —{" "}
            <span className="bg-gradient-to-r from-[#4aa3ff] to-[#a78bfa] bg-clip-text text-transparent">
              весь комплаенс.
            </span>
          </h2>
          <p className="text-base text-pretty text-white/60">
            От проверки контрагента до расследования и отчёта — всё связано в одной системе и
            усилено ИИ.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* capability cards */}
          <div className="flex flex-col gap-5">
            {capabilities.map((c, i) => (
              <Reveal
                key={c.label}
                delay={i * 90}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8"
              >
                <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-white/50 uppercase">
                  <span className="size-1.5 rounded-full bg-[#4aa3ff]" />
                  {c.label}
                </span>
                <p className="mt-4 text-lg text-pretty sm:text-xl">
                  <span className="font-bold text-white">{c.lead}</span>
                  <span className="text-white/55">{c.rest}</span>
                </p>
              </Reveal>
            ))}
          </div>

          {/* scroll-linked sparkler → beam → orb visual */}
          <div className="hidden items-start justify-center lg:flex">
            <div className="lg:sticky lg:top-28">
              <CapabilityOrb />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

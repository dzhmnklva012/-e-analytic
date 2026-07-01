import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

type Capability = {
  label: string;
  lead: string;
  rest: string;
};

const capabilities: Capability[] = [
  {
    label: "Глобальная проверка",
    lead: "Проверяйте за секунды.",
    rest: " ИИ-агент сверяет контрагента с международными базами и санкционными списками и собирает полное досье.",
  },
  {
    label: "Расследования",
    lead: "Ведите дела до конца.",
    rest: " Свяжите лиц, обращения и доказательства, назначьте ответственного и выгрузите отчёт для аудита.",
  },
  {
    label: "Аналитика и контроль",
    lead: "Видьте картину целиком.",
    rest: " Риски, горячая линия, конфликты и нагрузка — на живых дашбордах в реальном времени.",
  },
];

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

          {/* glowing orb visual */}
          <div className="hidden items-start justify-center lg:flex">
            <div className="lg:sticky lg:top-28">
              <div className="relative grid aspect-square w-full max-w-sm place-items-center">
                {/* soft glow */}
                <div
                  className="absolute size-64 rounded-full blur-3xl"
                  style={{ background: "radial-gradient(circle, rgba(74,163,255,0.45), rgba(167,139,250,0.25) 45%, transparent 70%)" }}
                  aria-hidden="true"
                />
                {/* concentric rings */}
                {[100, 74, 50].map((s) => (
                  <span
                    key={s}
                    className="absolute rounded-full border border-white/10"
                    style={{ width: `${s}%`, height: `${s}%` }}
                    aria-hidden="true"
                  />
                ))}
                {/* orbiting dots */}
                <span className="absolute top-0 left-1/2 size-2 -translate-x-1/2 rounded-full bg-[#4aa3ff] shadow-[0_0_12px_#4aa3ff]" aria-hidden="true" />
                <span className="absolute bottom-[8%] right-[14%] size-1.5 rounded-full bg-[#a78bfa] shadow-[0_0_10px_#a78bfa]" aria-hidden="true" />
                {/* core */}
                <span
                  className="animate-soft-pulse relative size-28 rounded-full bg-gradient-to-br from-[#068dff] to-[#7c7ae0] shadow-[0_0_70px_rgba(74,163,255,0.6)]"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

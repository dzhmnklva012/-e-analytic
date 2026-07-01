import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const nodes = [
  { title: "Проверка", desc: "Скрининг контрагентов по базам и санкциям" },
  { title: "Расследования", desc: "Ведите дела от сигнала до отчёта" },
  { title: "ИИ-агент", desc: "Находит риски и предлагает решения" },
  { title: "Досье", desc: "Полные профили лиц и компаний" },
];

const connectors = [
  "M0 48 H40 C56 48 56 95 72 95",
  "M0 142 H40 C56 142 56 95 72 95",
];

const traces = [
  "M200 150 V70 H120",
  "M250 150 V90 H340",
  "M150 200 H60 V140",
  "M250 200 H360 V260",
  "M200 250 V330 H300",
  "M150 250 V310 H80",
];

const traceDots: [number, number][] = [
  [120, 70],
  [340, 90],
  [60, 140],
  [360, 260],
  [300, 330],
  [80, 310],
];

export function PlatformDiagram() {
  return (
    <section id="platform" className="scroll-mt-20 py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          title="Единая платформа комплаенса"
          description="От первого сигнала до закрытого дела — инструменты, чтобы действовать быстро, снижать риски и держать всё под контролем."
        />

        <Reveal className="grid items-center gap-8 lg:grid-cols-[1fr_auto_0.9fr] lg:gap-4">
          {/* left: node cards */}
          <div className="grid grid-cols-2 gap-4">
            {nodes.map((n) => (
              <div
                key={n.title}
                className="flex flex-col gap-2 rounded-2xl border border-border bg-card/70 p-5 text-center backdrop-blur-sm"
              >
                <span className="text-sm font-bold text-foreground">{n.title}</span>
                <span className="text-xs leading-snug text-muted-foreground">{n.desc}</span>
              </div>
            ))}
          </div>

          {/* connectors (desktop) */}
          <svg className="hidden h-48 w-20 lg:block" viewBox="0 0 80 190" fill="none" aria-hidden="true">
            {connectors.map((d) => (
              <path key={d} d={d} stroke="var(--border)" strokeWidth="1.5" />
            ))}
            {connectors.map((d, i) => (
              <path
                key={`flow-${i}`}
                d={d}
                pathLength={100}
                strokeWidth="2"
                className="trace-flow"
                style={{ animationDelay: `${i * 1.2}s` }}
              />
            ))}
            <circle cx="72" cy="95" r="3.5" fill="var(--primary)" className="animate-soft-pulse" />
          </svg>

          {/* right: glowing AI chip */}
          <div className="relative grid place-items-center py-6">
            {/* circuit traces */}
            <svg className="pointer-events-none absolute size-[22rem] opacity-80" viewBox="0 0 400 400" fill="none" aria-hidden="true">
              {traces.map((d, i) => (
                <path key={`base-${i}`} d={d} stroke="var(--primary)" strokeOpacity="0.3" strokeWidth="1.5" />
              ))}
              {traces.map((d, i) => (
                <path
                  key={`flow-${i}`}
                  d={d}
                  pathLength={100}
                  strokeWidth="2"
                  className="trace-flow"
                  style={{ animationDelay: `${i * 0.4}s` }}
                />
              ))}
              {traceDots.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="3" fill="var(--primary)" fillOpacity="0.7" className="animate-soft-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
              ))}
            </svg>

            {/* glow */}
            <div
              className="absolute size-56 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(91,124,255,0.55), transparent 65%)" }}
              aria-hidden="true"
            />

            {/* chip */}
            <div className="relative grid size-36 place-items-center rounded-3xl bg-gradient-to-br from-[#6d80ff] to-[#3b56f5] shadow-[0_0_80px_rgba(91,124,255,0.6)] ring-1 ring-white/25 sm:size-40">
              <span className="text-5xl font-extrabold tracking-tight text-white">ИИ</span>
              <span className="animate-soft-pulse absolute inset-0 rounded-3xl ring-1 ring-white/20" />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

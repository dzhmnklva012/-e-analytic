import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type Node = { title: string; desc: string; left: number; top: number };

// fixed desktop stage: 900 × 460 (px == SVG viewBox units, so lines align to cards)
const CARD_W = 190;
const CARD_H = 104;

const nodes: Node[] = [
  { title: "Проверка", desc: "Скрининг по базам и санкциям", left: 0, top: 70 },
  { title: "Расследования", desc: "Дела от сигнала до отчёта", left: 240, top: 70 },
  { title: "ИИ-агент", desc: "Находит риски и решения", left: 0, top: 286 },
  { title: "Досье", desc: "Профили лиц и компаний", left: 240, top: 286 },
];

// connector lines (SVG units == px on the 900×460 stage)
const connectors = [
  "M190 122 H240", // Проверка → Расследования
  "M190 338 H240", // ИИ-агент → Досье
  "M430 122 H500 C540 122 540 230 580 230", // Расследования → bus
  "M430 338 H500 C540 338 540 230 580 230", // Досье → bus
  "M580 230 H640", // bus → chip
];

// circuit-pin traces radiating from the chip (top / right / bottom)
const traces: { d: string; dot: [number, number] }[] = [
  { d: "M690 130 V95 H662", dot: [662, 95] },
  { d: "M735 130 V72", dot: [735, 72] },
  { d: "M780 130 V100 H812", dot: [812, 100] },
  { d: "M840 175 H892", dot: [892, 175] },
  { d: "M840 205 H874 V188", dot: [874, 188] },
  { d: "M840 245 H895", dot: [895, 245] },
  { d: "M840 278 H872 V296", dot: [872, 296] },
  { d: "M690 330 V368 H660", dot: [660, 368] },
  { d: "M735 330 V388", dot: [735, 388] },
  { d: "M785 330 V362 H815", dot: [815, 362] },
];

function Chip({ className }: { className?: string }) {
  return (
    <div className={className}>
      {/* glow */}
      <div
        className="absolute -inset-8 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(91,124,255,0.45), transparent 65%)" }}
        aria-hidden="true"
      />
      {/* chip */}
      <div className="relative grid size-full place-items-center overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#7d8dff] to-[#3b56f5] shadow-[0_0_80px_rgba(91,124,255,0.6)] ring-1 ring-white/25">
        <span className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">ИИ</span>
        <span className="animate-soft-pulse absolute inset-0 rounded-[1.75rem] ring-1 ring-white/25" />
        {/* inner sparkle dots (bottom-left) */}
        <span className="absolute bottom-4 left-4 size-1 rounded-full bg-white/80" />
        <span className="absolute bottom-6 left-7 size-1 rounded-full bg-white/60" />
        <span className="absolute bottom-3 left-9 size-0.5 rounded-full bg-white/50" />
      </div>
    </div>
  );
}

export function PlatformDiagram() {
  return (
    <section id="platform" className="scroll-mt-20 py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          title="Единая платформа комплаенса"
          description="От первого сигнала до закрытого дела — инструменты, чтобы действовать быстро, снижать риски и держать всё под контролем."
        />

        <Reveal>
          {/* desktop: precisely-aligned node diagram */}
          <div className="relative mx-auto hidden h-[460px] w-[900px] max-w-full lg:block">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 900 460"
              fill="none"
              aria-hidden="true"
            >
              {/* base connector lines */}
              {connectors.map((d) => (
                <path key={d} d={d} stroke="var(--border)" strokeWidth="2.5" strokeLinecap="round" />
              ))}
              {/* flowing pulses along connectors */}
              {connectors.map((d, i) => (
                <path
                  key={`cflow-${i}`}
                  d={d}
                  pathLength={100}
                  className="trace-flow"
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
              ))}

              {/* base circuit traces */}
              {traces.map((t, i) => (
                <path key={`t-${i}`} d={t.d} stroke="var(--primary)" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" />
              ))}
              {/* flowing pulses on alternating traces */}
              {traces.map((t, i) =>
                i % 2 === 0 ? (
                  <path
                    key={`tflow-${i}`}
                    d={t.d}
                    pathLength={100}
                    className="trace-flow"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                ) : null,
              )}
              {/* trace terminal dots */}
              {traces.map((t, i) => (
                <circle
                  key={`d-${i}`}
                  cx={t.dot[0]}
                  cy={t.dot[1]}
                  r="3"
                  fill="var(--primary)"
                  className="animate-soft-pulse"
                  style={{ animationDelay: `${i * 0.25}s` }}
                />
              ))}
              {/* bus merge node */}
              <circle cx="580" cy="230" r="4" fill="var(--primary)" className="animate-soft-pulse" />
            </svg>

            {/* node cards */}
            {nodes.map((n) => (
              <div
                key={n.title}
                className="absolute flex flex-col items-center justify-center gap-1 rounded-2xl border border-border bg-card px-4 text-center shadow-sm"
                style={{ left: n.left, top: n.top, width: CARD_W, height: CARD_H }}
              >
                <span className="text-sm font-bold text-foreground">{n.title}</span>
                <span className="text-xs leading-snug text-muted-foreground">{n.desc}</span>
              </div>
            ))}

            {/* AI chip */}
            <Chip className="absolute size-[200px]" style-left={640} />
            <div className="absolute" style={{ left: 640, top: 130, width: 200, height: 200 }}>
              <Chip className="relative size-full" />
            </div>
          </div>

          {/* mobile / tablet fallback */}
          <div className="grid items-center gap-8 lg:hidden">
            <div className="grid grid-cols-2 gap-4">
              {nodes.map((n) => (
                <div
                  key={n.title}
                  className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5 text-center shadow-sm"
                >
                  <span className="text-sm font-bold text-foreground">{n.title}</span>
                  <span className="text-xs leading-snug text-muted-foreground">{n.desc}</span>
                </div>
              ))}
            </div>
            <div className="mx-auto">
              <Chip className="relative size-36" />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

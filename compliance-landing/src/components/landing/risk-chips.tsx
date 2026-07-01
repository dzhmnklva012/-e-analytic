import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const chips = [
  { label: "Санкции: чисто", x: "6%", line: 44, active: false },
  { label: "Все системы в норме", x: "30%", line: 96, active: true },
  { label: "Дело закрыто", x: "16%", line: 168, active: false },
  { label: "Проверено ИИ", x: "60%", line: 132, active: true },
  { label: "Досье собрано", x: "76%", line: 60, active: false },
];

export function RiskChips() {
  return (
    <section className="py-8 sm:py-12">
      <Container>
        <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-card/50 p-8 sm:p-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{ background: "radial-gradient(60% 80% at 75% 20%, color-mix(in oklch, var(--primary) 18%, transparent), transparent 70%)" }}
            aria-hidden="true"
          />
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            {/* heading */}
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl">
                Риски возникают каждый день
              </h2>
              <p className="max-w-md text-base text-pretty text-muted-foreground">
                Санкции, PEP-связи и нарушения появляются постоянно. Но с правильным подходом хаоса
                не будет.
              </p>
            </div>

            {/* floating chips */}
            <div className="relative hidden h-64 lg:block" aria-hidden="true">
              {chips.map((c) => (
                <div key={c.label} className="absolute top-0 flex flex-col items-center" style={{ left: c.x }}>
                  <span
                    className="w-px bg-gradient-to-b from-transparent to-primary/50"
                    style={{ height: c.line }}
                  />
                  <span
                    className={cn(
                      "rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap shadow-lg",
                      c.active
                        ? "bg-primary text-primary-foreground shadow-primary/30"
                        : "border border-border bg-card text-foreground",
                    )}
                  >
                    {c.label}
                  </span>
                </div>
              ))}
            </div>

            {/* mobile: simple chip row */}
            <div className="flex flex-wrap gap-2 lg:hidden">
              {chips.map((c) => (
                <span
                  key={c.label}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-semibold",
                    c.active ? "bg-primary text-primary-foreground" : "border border-border bg-card text-foreground",
                  )}
                >
                  {c.label}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

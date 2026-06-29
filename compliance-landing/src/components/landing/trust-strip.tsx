import { Container } from "@/components/ui/container";
import { trustStats, clients } from "@/lib/data";

export function TrustStrip() {
  return (
    <section aria-label="Показатели и клиенты" className="border-y border-border bg-card/50">
      <Container className="flex flex-col gap-10 py-12">
        <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {trustStats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-3xl font-bold text-primary sm:text-4xl">{stat.value}</dd>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </dl>

        <div className="flex flex-col items-center gap-4">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Нам доверяют комплаенс-команды банков
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {clients.map((client) => (
              <li
                key={client}
                className="text-base font-bold tracking-tight text-faint grayscale transition-colors hover:text-muted-foreground"
              >
                {client}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { CURRENCIES, TRUSTED_BY } from "@/lib/data";
import { Container } from "@/components/ui/container";

function TrustStrip() {
  return (
    <section aria-label="Нам доверяют" className="border-b border-border bg-card py-8">
      <Container className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-faint">
            Нам доверяют банки и финансовые институты
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {TRUSTED_BY.map((name) => (
              <li
                key={name}
                className="text-sm font-bold tracking-tight text-muted-foreground"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>

        <ul className="flex flex-wrap items-center gap-3">
          {CURRENCIES.map((currency) => {
            const up = currency.change >= 0;
            return (
              <li
                key={currency.code}
                className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2"
              >
                <span className="text-xs font-semibold text-muted-foreground">
                  {currency.code}
                </span>
                <span className="text-sm font-bold text-foreground">
                  {currency.value}
                </span>
                <span
                  className={up ? "flex items-center text-success" : "flex items-center text-destructive"}
                >
                  {up ? (
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  ) : (
                    <ArrowDownRight className="size-3.5" aria-hidden />
                  )}
                  <span className="text-xs font-semibold">
                    {Math.abs(currency.change).toFixed(2)}%
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

export { TrustStrip };

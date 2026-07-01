import { CircleCheck, SearchCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function VerifyBanner() {
  return (
    <Container id="verify" className="scroll-mt-20 py-8 sm:py-10">
      <Reveal className="flex flex-col items-start gap-8 overflow-hidden rounded-3xl bg-secondary/40 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
        {/* copy */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-balance text-foreground sm:text-3xl">
              Проверить контрагента
            </h2>
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
              <CircleCheck className="size-5" aria-hidden="true" />
            </span>
          </div>
          <p className="max-w-md text-sm text-pretty text-muted-foreground sm:text-base">
            Проверьте благонадёжность и санкционный статус контрагента по БИН, ИИН или названию.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#pricing"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
            >
              Проверить по БИН / ИИН
            </a>
            <a
              href="#pricing"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-primary/40 bg-card px-5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5 focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
            >
              Глобальная проверка
            </a>
          </div>
        </div>

        {/* illustration */}
        <div className="relative shrink-0 self-center" aria-hidden="true">
          <div className="w-40 rotate-3 rounded-2xl bg-card p-4 shadow-lg ring-1 ring-foreground/5">
            <span className="block h-2 w-1/2 rounded-full bg-primary/40" />
            <div className="mt-3 flex flex-col gap-2">
              <span className="block h-2 w-full rounded-full bg-muted" />
              <span className="block h-2 w-5/6 rounded-full bg-muted" />
              <span className="block h-2 w-full rounded-full bg-muted" />
              <span className="block h-2 w-2/3 rounded-full bg-muted/70" />
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 grid size-16 place-items-center rounded-full bg-primary text-white shadow-xl shadow-primary/30">
            <SearchCheck className="size-8" strokeWidth={2} />
          </div>
        </div>
      </div>
    </Container>
  );
}

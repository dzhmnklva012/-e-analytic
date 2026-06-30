import { Sparkles, Briefcase, ShieldCheck } from "lucide-react";

/**
 * Decorative hero card-stack: a "document" card behind an "ИИ-АССИСТЕНТ"
 * result card, on a tilted soft-blue panel, with a briefcase badge and a
 * "Проверено ИИ" chip. Purely illustrative → aria-hidden.
 */
export function HeroIllustration() {
  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="relative" aria-hidden="true">
        {/* tilted soft-blue backdrop panel */}
        <div className="absolute inset-0 rotate-3 rounded-[2rem] bg-gradient-to-br from-[#eaf1ff] to-[#dde6ff]" />

        {/* briefcase badge */}
        <div className="absolute -right-2 top-3 z-20 grid size-12 place-items-center rounded-full bg-gradient-to-br from-[#7c7ae0] to-[#a78bfa] text-white shadow-lg shadow-[#7c7ae0]/30">
          <Briefcase className="size-5" />
        </div>

        {/* cards */}
        <div className="relative z-10 px-6 pt-8 pb-10 sm:px-8">
          {/* document card */}
          <div className="rounded-2xl bg-card p-5 shadow-md ring-1 ring-foreground/5">
            <div className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#7c7ae0] to-[#a78bfa] text-white">
                <Sparkles className="size-4" />
              </span>
              <div className="flex flex-1 flex-col gap-1.5">
                <span className="block h-2.5 w-1/3 rounded-full bg-muted" />
                <span className="block h-2 w-1/4 rounded-full bg-muted/70" />
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <span className="block h-2 w-full rounded-full bg-muted" />
              <span className="block h-2 w-11/12 rounded-full bg-muted" />
              <span className="block h-2 w-4/5 rounded-full bg-muted" />
              <span className="block h-2 w-2/3 rounded-full bg-muted/70" />
            </div>
          </div>

          {/* AI assistant result card (overlapping) */}
          <div className="relative z-10 -mt-3 ml-6 rounded-2xl bg-card p-5 shadow-xl ring-1 ring-foreground/5">
            <span className="text-xs font-bold tracking-[0.18em] text-[#7c5ce0]">ИИ-АССИСТЕНТ</span>
            <p className="mt-3 rounded-xl bg-[#f1effb] px-4 py-3 text-sm text-foreground">
              Анализ завершён. Рисков не обнаружено. Контрагент благонадёжен.
            </p>
            <div className="mt-3 grid h-11 w-full place-items-center rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#7c7ae0] text-sm font-semibold text-white shadow-md shadow-[#7c7ae0]/30">
              Открыть досье
            </div>
          </div>
        </div>

        {/* verified chip */}
        <div className="absolute -bottom-3 left-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-md ring-1 ring-foreground/5">
          <ShieldCheck className="size-4 text-success" />
          Проверено ИИ
        </div>
      </div>

      {/* carousel dots */}
      <div className="mt-8 flex items-center justify-center gap-2" aria-hidden="true">
        <span className="h-1.5 w-6 rounded-full bg-primary" />
        <span className="size-1.5 rounded-full bg-border" />
        <span className="size-1.5 rounded-full bg-border" />
        <span className="size-1.5 rounded-full bg-border" />
      </div>
    </div>
  );
}

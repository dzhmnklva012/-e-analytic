import { ArrowUpRight, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Checks / "revenue" card ─────────────────────────────────────────── */

const bars = [42, 58, 36, 70, 52, 88, 64];

export function ChecksCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-border bg-card p-5 shadow-2xl shadow-primary/10",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-medium text-muted-foreground">Скрининги · за месяц</span>
          <span className="text-2xl font-bold tracking-tight text-foreground">42 579</span>
        </div>
        <span className="grid size-8 place-items-center rounded-full bg-secondary text-secondary-foreground">
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </span>
      </div>

      <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">
        <TrendingUp className="size-3.5" aria-hidden="true" />
        +12% / месяц
      </div>

      <div className="mt-4 flex items-end gap-1.5">
        {bars.map((h, i) => (
          <span
            key={i}
            className={cn(
              "flex-1 rounded-t-sm",
              i === bars.length - 2 ? "bg-primary" : "bg-primary/20",
            )}
            style={{ height: `${h}px` }}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs">
        <span className="text-muted-foreground">Всего проверок</span>
        <span className="font-semibold text-foreground">312 540</span>
      </div>
    </div>
  );
}

/* ── Accuracy / "success rate" gauge card ────────────────────────────── */

function Donut({ value }: { value: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - value / 100);
  return (
    <svg viewBox="0 0 140 140" className="size-32 -rotate-90">
      <circle cx="70" cy="70" r={r} fill="none" stroke="var(--muted)" strokeWidth="14" />
      <circle
        cx="70"
        cy="70"
        r={r}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="14"
        strokelinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AccuracyCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-border bg-card p-5 shadow-2xl shadow-primary/10",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">Точность скоринга</span>
        <span className="grid size-8 place-items-center rounded-full bg-secondary text-secondary-foreground">
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </span>
      </div>

      <div className="mt-2 flex items-center gap-4">
        <div className="relative grid place-items-center">
          <Donut value={94} />
          <span className="absolute text-xl font-bold text-foreground">94%</span>
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <div className="rounded-xl bg-muted/60 p-3">
            <div className="text-lg font-bold text-foreground">44 210</div>
            <div className="text-xs text-muted-foreground">Проверено</div>
          </div>
          <div className="rounded-xl bg-muted/60 p-3">
            <div className="text-lg font-bold text-foreground">2 118</div>
            <div className="text-xs text-muted-foreground">Флагов риска</div>
          </div>
        </div>
      </div>
    </div>
  );
}

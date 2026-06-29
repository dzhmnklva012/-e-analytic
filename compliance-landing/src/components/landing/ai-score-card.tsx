import { cn } from "@/lib/utils";

const rows = [
  { label: "Sanctions", value: 94 },
  { label: "PEP", value: 87 },
  { label: "Media", value: 91 },
];

/** Floating "AI SCORE · LIVE" metric card (white), mirrors the reference. */
export function AiScoreCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-56 rounded-2xl border border-border bg-card p-4 shadow-xl shadow-foreground/10",
        className,
      )}
    >
      <div className="flex items-center gap-2 font-mono text-[11px] font-semibold tracking-widest text-foreground">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-success" />
        </span>
        AI SCORE · LIVE
      </div>

      <ul className="mt-4 flex flex-col gap-3">
        {rows.map((row) => (
          <li key={row.label} className="flex items-center gap-3">
            <span className="w-12 font-mono text-xs text-muted-foreground">{row.label}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
              <span
                className="block h-full rounded-full bg-primary"
                style={{ width: `${row.value}%` }}
              />
            </span>
            <span className="w-6 text-right font-mono text-xs font-semibold text-foreground">
              {row.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

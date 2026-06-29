import { cn } from "@/lib/utils";

type Line = { text: string; tone: "ok" | "cmd" };

const lines: Line[] = [
  { text: "✓ 87 совпадений найдено", tone: "ok" },
  { text: "✓ Вероятность риска: 94%", tone: "ok" },
  { text: "$ ai.predict(risk)", tone: "cmd" },
  { text: "$ ai.scan(sanctions)", tone: "cmd" },
  { text: "✓ 2,418,307 записей проверено", tone: "ok" },
];

/**
 * Authentic dark "code editor" card — pops against the light hero the way a
 * real terminal does. Recoloured to the ADATA blue/green palette.
 */
export function AiTerminalCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-[20rem] max-w-full rounded-2xl border border-white/10 bg-[#0f1729] p-4 shadow-2xl shadow-primary/20",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[11px] tracking-widest text-slate-400">
          AI_SCREEN.PY
        </span>
      </div>

      <pre className="mt-3 flex flex-col gap-1.5 font-mono text-xs leading-relaxed">
        {lines.map((line) => (
          <code
            key={line.text}
            className={cn(line.tone === "ok" ? "text-emerald-400" : "text-sky-400")}
          >
            {line.text}
          </code>
        ))}
      </pre>
    </div>
  );
}

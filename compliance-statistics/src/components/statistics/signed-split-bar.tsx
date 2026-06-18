import type { SignedSplit } from "@/lib/types";
import { formatNumber, percent } from "@/lib/format";
import { cn } from "@/lib/utils";

export interface SignedSplitBarProps {
  data: SignedSplit;
  /** Optional label shown above the bar, e.g. "Всего файлов". */
  label?: string;
  className?: string;
}

/**
 * Horizontal signed/unsigned ratio bar with totals. Accessible as a
 * progressbar reporting the signed share.
 */
export function SignedSplitBar({ data, label, className }: SignedSplitBarProps) {
  const signedPct = percent(data.signed, data.total);

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-end justify-between gap-3">
        <div>
          {label && (
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {label}
            </p>
          )}
          <p className="mt-1 text-2xl font-semibold leading-none tabular-nums text-foreground">
            {formatNumber(data.total)}
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-success">{signedPct}%</span>{" "}
          подписано
        </p>
      </div>

      <div
        className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={data.total}
        aria-valuenow={data.signed}
        aria-label={`Подписано ${data.signed} из ${data.total}`}
      >
        <div className="h-full bg-success" style={{ width: `${signedPct}%` }} />
        <div className="h-full bg-unsigned" style={{ width: `${100 - signedPct}%` }} />
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-2 text-muted-foreground">
          <span className="size-2 rounded-full bg-success" aria-hidden />
          Подписано
          <span className="font-semibold tabular-nums text-foreground">
            {formatNumber(data.signed)}
          </span>
        </span>
        <span className="flex items-center gap-2 text-muted-foreground">
          <span className="size-2 rounded-full bg-unsigned" aria-hidden />
          Не подписано
          <span className="font-semibold tabular-nums text-foreground">
            {formatNumber(data.unsigned)}
          </span>
        </span>
      </div>
    </div>
  );
}

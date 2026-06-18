import { WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface OfflineBannerProps {
  className?: string;
}

/**
 * Sticky notice shown while the browser is offline. Uses role="status" with a
 * polite live region so assistive tech announces connectivity changes.
 */
export function OfflineBanner({ className }: OfflineBannerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex items-center gap-3 border-b border-warning/30 bg-warning/10 px-4 py-3 text-xs text-foreground sm:px-6",
        className,
      )}
    >
      <WifiOff className="size-4 shrink-0 text-warning" aria-hidden />
      <p className="min-w-0">
        <span className="font-semibold">Нет подключения к сети.</span>{" "}
        <span className="text-muted-foreground">
          Показаны последние загруженные данные. Обновление возобновится после
          восстановления связи.
        </span>
      </p>
    </div>
  );
}

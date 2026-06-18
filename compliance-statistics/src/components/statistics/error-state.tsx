import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

/** Reusable error block with a retry action. */
export function ErrorState({
  title = "Не удалось загрузить данные",
  description = "Произошла ошибка при получении статистики. Проверьте подключение и попробуйте снова.",
  onRetry,
  retryLabel = "Повторить",
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-xl border border-danger/30 bg-danger/5 px-6 py-16 text-center",
        className,
      )}
    >
      <span
        className="flex size-12 items-center justify-center rounded-full bg-danger/10 text-danger"
        aria-hidden
      >
        <AlertTriangle className="size-5" />
      </span>
      <div className="space-y-1">
        <p className="text-base font-semibold text-foreground">{title}</p>
        <p className="mx-auto max-w-sm text-xs text-muted-foreground">
          {description}
        </p>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RefreshCw className="size-3.5" />
          {retryLabel}
        </Button>
      )}
    </div>
  );
}

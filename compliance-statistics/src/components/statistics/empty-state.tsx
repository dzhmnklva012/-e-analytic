import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  /** Compact variant for use inside a single section card. */
  compact?: boolean;
  className?: string;
}

/** Neutral, reusable empty placeholder. */
export function EmptyState({
  title = "Нет данных",
  description = "За выбранный период и фильтры записи отсутствуют.",
  icon: Icon = Inbox,
  action,
  compact = false,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 text-center",
        compact ? "py-8" : "py-16",
        className,
      )}
    >
      <span
        className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground"
        aria-hidden
      >
        <Icon className="size-5" />
      </span>
      <div className="space-y-1">
        <p className="text-base font-medium text-foreground">{title}</p>
        <p className="mx-auto max-w-xs text-xs text-muted-foreground">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}

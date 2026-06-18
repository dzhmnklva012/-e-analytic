import type { LucideIcon } from "lucide-react";
import { Card, CardAction, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface SectionCardProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  /** Rendered top-right (e.g. a total badge or filter). */
  action?: React.ReactNode;
  children: React.ReactNode;
  /** Used as the section anchor / aria-labelledby target. */
  id?: string;
  className?: string;
}

/**
 * Standard wrapper for every statistics block: titled card with an icon,
 * optional description and a top-right action slot. Exposes an accessible
 * region so screen-reader users can jump between sections.
 */
export function SectionCard({
  title,
  description,
  icon: Icon,
  action,
  children,
  id,
  className,
}: SectionCardProps) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <Card
      id={id}
      role="region"
      aria-labelledby={headingId}
      className={cn("scroll-mt-20", className)}
    >
      <CardHeader>
        <div className="flex items-center gap-3">
          <span
            className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground"
            aria-hidden
          >
            <Icon className="size-4" />
          </span>
          <div className="min-w-0">
            <h2
              id={headingId}
              className="truncate font-heading text-base font-semibold leading-snug text-foreground"
            >
              {title}
            </h2>
            {description && (
              <p className="mt-1 truncate text-xs text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </div>
        {action && <CardAction>{action}</CardAction>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

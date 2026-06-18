"use client";

import { useId, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface SectionCardProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  /** Rendered in the header, left of the collapse chevron. */
  action?: React.ReactNode;
  children: React.ReactNode;
  id?: string;
  defaultOpen?: boolean;
  className?: string;
}

/**
 * ADATA-style collapsible section card: tinted icon chip, title + subtitle,
 * optional header action and a chevron toggle. Exposes an accessible region.
 */
export function SectionCard({
  title,
  description,
  icon: Icon,
  action,
  children,
  id,
  defaultOpen = true,
  className,
}: SectionCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const autoId = useId();
  const headingId = id ? `${id}-title` : `${autoId}-title`;
  const bodyId = id ? `${id}-body` : `${autoId}-body`;

  return (
    <Card
      id={id}
      role="region"
      aria-labelledby={headingId}
      className={cn("scroll-mt-20 gap-0 py-0", className)}
    >
      <div className="flex items-center gap-3 px-5 py-4">
        <span
          className="flex size-9 shrink-0 items-center justify-center rounded-md bg-accent text-primary"
          aria-hidden
        >
          <Icon className="size-4" />
        </span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={bodyId}
          className="flex min-w-0 flex-1 items-center gap-3 text-left outline-none focus-visible:rounded-md focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <span className="min-w-0 flex-1">
            <span
              id={headingId}
              className="block truncate font-heading text-base font-semibold leading-snug text-foreground"
            >
              {title}
            </span>
            {description && (
              <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                {description}
              </span>
            )}
          </span>
          {action}
          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-muted-foreground transition-transform",
              open && "rotate-180",
            )}
            aria-hidden
          />
        </button>
      </div>
      <div
        id={bodyId}
        hidden={!open}
        className="border-t px-5 py-4"
      >
        {children}
      </div>
    </Card>
  );
}

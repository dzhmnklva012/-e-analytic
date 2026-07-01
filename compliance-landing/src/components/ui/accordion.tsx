"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

type AccordionItemData = {
  id: string;
  question: string;
  answer: string;
};

type AccordionProps = {
  items: AccordionItemData[];
  /** Allow multiple panels open at once. */
  multiple?: boolean;
  className?: string;
};

/**
 * Accessible accordion: each header is a <button> with aria-expanded and
 * aria-controls; the panel is a region labelled by its header. The open item
 * gets a light-blue highlight and an × to close; closed items show a + to open.
 */
export function Accordion({ items, multiple = false, className }: AccordionProps) {
  const [open, setOpen] = React.useState<Set<string>>(new Set());

  function toggle(id: string) {
    setOpen((prev) => {
      const next = new Set(multiple ? prev : []);
      if (prev.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item) => {
        const isOpen = open.has(item.id);
        const headerId = `${item.id}-header`;
        const panelId = `${item.id}-panel`;
        return (
          <div
            key={item.id}
            data-open={isOpen}
            className={cn(
              "rounded-2xl border shadow-sm transition-colors",
              isOpen ? "border-primary/30 bg-secondary/50" : "border-border bg-card",
            )}
          >
            <h3>
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left text-base font-bold text-foreground transition-colors focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
              >
                <span>{item.question}</span>
                {isOpen ? (
                  <X className="size-5 shrink-0 text-primary" strokeWidth={2.5} aria-hidden="true" />
                ) : (
                  <Plus className="size-5 shrink-0 text-primary" strokeWidth={2.5} aria-hidden="true" />
                )}
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              hidden={!isOpen}
              className="px-6 pb-5 text-sm text-pretty text-muted-foreground"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}

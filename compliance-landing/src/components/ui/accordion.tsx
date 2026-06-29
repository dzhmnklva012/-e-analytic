"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

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
 * aria-controls; the panel is a region labelled by its header. Keyboard
 * support comes free from native buttons (Enter/Space toggle, Tab moves).
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
            className="overflow-hidden rounded-lg border border-border bg-card transition-colors data-[open=true]:border-primary/40"
            data-open={isOpen}
          >
            <h3>
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-foreground transition-colors hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={cn(
                    "size-5 shrink-0 text-muted-foreground transition-transform duration-200",
                    isOpen && "rotate-180 text-primary",
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              hidden={!isOpen}
              className="px-5 pb-4 text-sm text-pretty text-muted-foreground"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}

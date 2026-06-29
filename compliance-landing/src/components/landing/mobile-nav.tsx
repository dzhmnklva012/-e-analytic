"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

type NavLink = { href: string; label: string };

export function MobileNav({ links, light = false }: { links: NavLink[]; light?: boolean }) {
  const [open, setOpen] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  // Close on Escape and lock body scroll while open.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // move focus into the panel
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <div className="lg:hidden">
      <Button
        ref={triggerRef}
        type="button"
        variant="outline"
        size="icon-lg"
        aria-label="Открыть меню"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <Menu className="size-5" aria-hidden="true" />
      </Button>

      {open && (
        <div className="fixed inset-0 z-50">
          {/* backdrop */}
          <button
            type="button"
            aria-label="Закрыть меню"
            tabIndex={-1}
            onClick={close}
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
          />
          {/* panel */}
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Меню навигации"
            tabIndex={-1}
            className="absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col gap-6 bg-card p-6 shadow-2xl outline-none"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <Button
                type="button"
                variant="ghost"
                size="icon-lg"
                aria-label="Закрыть меню"
                onClick={close}
              >
                <X className="size-5" aria-hidden="true" />
              </Button>
            </div>

            <nav aria-label="Мобильная навигация">
              <ul className="flex flex-col gap-1">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={close}
                      className="block rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto flex flex-col gap-3">
              <a
                href="#"
                onClick={close}
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full")}
              >
                Войти
              </a>
              <a
                href="#pricing"
                onClick={close}
                className={cn(buttonVariants({ size: "lg" }), "w-full")}
              >
                Попробовать бесплатно
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { Menu, X } from "lucide-react";

import { NAV_LINKS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogSheet,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Logo } from "@/components/landing/logo";

/** Hamburger-triggered navigation drawer shown below the `md` breakpoint. */
function MobileNav() {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Открыть меню"
            className="md:hidden"
          />
        }
      >
        <Menu className="size-5" aria-hidden />
      </DialogTrigger>

      <DialogSheet>
        <div className="flex items-center justify-between">
          <Logo />
          <DialogClose
            render={
              <Button variant="ghost" size="icon" aria-label="Закрыть меню" />
            }
          >
            <X className="size-5" aria-hidden />
          </DialogClose>
        </div>

        <DialogTitle className="sr-only">Навигация</DialogTitle>

        <nav aria-label="Основная навигация">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <DialogClose
                  render={<a href={link.href} />}
                  className="flex rounded-lg px-3 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
                >
                  {link.label}
                </DialogClose>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto flex flex-col gap-3">
          <Button variant="outline" size="lg" render={<a href="#" />}>
            Войти
          </Button>
          <DialogClose
            render={<a href="#contact" />}
            className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Запросить демо
          </DialogClose>
        </div>
      </DialogSheet>
    </Dialog>
  );
}

export { MobileNav };

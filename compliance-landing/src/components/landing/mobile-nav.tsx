"use client";

import { Menu, X } from "lucide-react";

import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
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
        aria-label="Открыть меню"
        className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "md:hidden")}
      >
        <Menu className="size-5" aria-hidden />
      </DialogTrigger>

      <DialogSheet>
        <div className="flex items-center justify-between">
          <Logo />
          <DialogClose
            aria-label="Закрыть меню"
            className={buttonVariants({ variant: "ghost", size: "icon" })}
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
          <DialogClose
            render={<a href="#" />}
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Войти
          </DialogClose>
          <DialogClose
            render={<a href="#contact" />}
            className={buttonVariants({ size: "lg" })}
          >
            Запросить демо
          </DialogClose>
        </div>
      </DialogSheet>
    </Dialog>
  );
}

export { MobileNav };

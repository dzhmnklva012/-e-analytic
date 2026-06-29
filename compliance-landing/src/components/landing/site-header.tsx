"use client";

import * as React from "react";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

export const navLinks = [
  { href: "#modules", label: "Продукты и решения" },
  { href: "#how", label: "Как это работает" },
  { href: "#pricing", label: "Тарифы" },
  { href: "#faq", label: "Вопросы" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // At the very top we sit over the blue sky hero → light treatment.
  const overSky = !scrolled;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-colors duration-300",
        scrolled ? "border-b border-border bg-card/85 backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <a
          href="#top"
          className="rounded-md focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
          aria-label="ADATA Compliance — на главную"
        >
          <Logo light={overSky} />
        </a>

        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul
            className={cn(
              "flex items-center gap-1 rounded-full px-1.5 py-1 transition-colors",
              overSky ? "bg-white/10 ring-1 ring-white/20 backdrop-blur-sm" : "bg-muted",
            )}
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "inline-flex h-8 items-center rounded-full px-4 text-sm font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none",
                    overSky
                      ? "text-white/85 hover:bg-white/15 hover:text-white"
                      : "text-muted-foreground hover:bg-card hover:text-foreground",
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#"
            className={cn(
              "hidden h-9 items-center rounded-full px-4 text-sm font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none sm:inline-flex",
              overSky ? "text-white/85 hover:text-white" : "text-foreground hover:text-primary",
            )}
          >
            Войти
          </a>
          <a
            href="#demo"
            className={cn(
              buttonVariants({ size: "lg" }),
              "hidden h-9 rounded-full px-5 sm:inline-flex",
              overSky && "bg-white text-primary hover:bg-white/90",
            )}
          >
            Запросить демо
          </a>
          <MobileNav links={navLinks} light={overSky} />
        </div>
      </Container>
    </header>
  );
}

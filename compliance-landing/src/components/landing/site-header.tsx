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
          <Logo />
        </a>

        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full bg-muted px-1.5 py-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex h-8 items-center rounded-full px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-card hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
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
            className="hidden h-9 items-center rounded-full px-4 text-sm font-medium text-foreground transition-colors hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none sm:inline-flex"
          >
            Войти
          </a>
          <a
            href="#demo"
            className={cn(buttonVariants({ size: "lg" }), "hidden h-9 rounded-full px-5 sm:inline-flex")}
          >
            Запросить демо
          </a>
          <MobileNav links={navLinks} />
        </div>
      </Container>
    </header>
  );
}

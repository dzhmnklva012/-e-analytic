"use client";

import * as React from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";

export const navLinks = [
  { href: "#modules", label: "Продукты и решения" },
  { href: "#pricing", label: "Тарифы" },
  { href: "#footer", label: "Контакты" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [activeId, setActiveId] = React.useState("");

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scroll-spy: highlight the nav link for the section currently in view
  React.useEffect(() => {
    const els = navLinks
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-colors duration-300",
        scrolled ? "border-b border-border bg-card/85 backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        {/* left: logo + nav */}
        <div className="flex items-center gap-8">
          <a
            href="#top"
            className="rounded-md focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
            aria-label="ADATA — на главную"
          >
            <Logo />
          </a>

          <nav aria-label="Основная навигация" className="hidden lg:block">
            <ul className="flex items-center">
              {navLinks.map((link, i) => (
                <li key={link.href} className="flex items-center">
                  {i > 0 && <span className="h-4 w-px bg-border" aria-hidden="true" />}
                  <a
                    href={link.href}
                    aria-current={activeId === link.href.slice(1) ? "page" : undefined}
                    className={cn(
                      "rounded-md px-4 text-sm font-medium tracking-wide uppercase transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none",
                      activeId === link.href.slice(1) ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* right: controls */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            type="button"
            aria-label="Настройки"
            className="hidden size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none sm:grid"
          >
            <SlidersHorizontal className="size-5" />
          </button>

          <button
            type="button"
            className="hidden h-9 items-center rounded-lg bg-muted px-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none sm:inline-flex"
          >
            Рус
          </button>

          <button
            type="button"
            className="hidden h-9 items-center gap-1.5 rounded-lg px-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none md:inline-flex"
          >
            mail@gmail.com
            <ChevronDown className="size-4 text-muted-foreground" aria-hidden="true" />
          </button>

          <MobileNav links={navLinks} />
        </div>
      </Container>
    </header>
  );
}

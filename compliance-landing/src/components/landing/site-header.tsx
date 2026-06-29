"use client";

import { useState } from "react";

import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/landing/logo";
import { MobileNav } from "@/components/landing/mobile-nav";

const LANGS = ["Рус", "Eng"] as const;

/** Non-functional language switch stub (Рус active). */
function LangSwitch() {
  const [lang, setLang] = useState<(typeof LANGS)[number]>("Рус");
  return (
    <div
      className="inline-flex items-center rounded-lg bg-muted p-0.5"
      role="group"
      aria-label="Язык интерфейса"
    >
      {LANGS.map((value) => (
        <button
          key={value}
          type="button"
          aria-pressed={lang === value}
          onClick={() => setLang(value)}
          className={cn(
            "rounded-md px-2.5 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40",
            lang === value
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {value}
        </button>
      ))}
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="rounded-lg focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
          aria-label="ADATA Compliance — на главную"
        >
          <Logo />
        </a>

        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LangSwitch />
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:inline-flex"
            render={<a href="#" />}
          >
            Войти
          </Button>
          <Button
            size="sm"
            className="hidden md:inline-flex"
            render={<a href="#contact" />}
          >
            Запросить демо
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

export { SiteHeader };

"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Light/dark theme switch — toggles the `dark` class on <html>, persisted. */
export function ThemeToggle() {
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    const stored = (() => {
      try {
        return localStorage.getItem("theme");
      } catch {
        return null;
      }
    })();
    const isDark = stored ? stored === "dark" : document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", isDark);
    setDark(isDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Переключить тему"
      onClick={toggle}
      className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full bg-muted ring-1 ring-border transition-colors focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
    >
      <span
        className={cn(
          "grid size-5 place-items-center rounded-full bg-card shadow transition-transform",
          dark ? "translate-x-[22px]" : "translate-x-0.5",
        )}
      >
        {dark ? (
          <Moon className="size-3 text-foreground" aria-hidden="true" />
        ) : (
          <Sun className="size-3 text-amber-500" aria-hidden="true" />
        )}
      </span>
    </button>
  );
}

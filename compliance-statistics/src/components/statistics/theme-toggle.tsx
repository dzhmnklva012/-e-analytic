"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

/**
 * Pill-style light/dark switch (sun ↔ moon) matching the Figma header control.
 * Implemented as an accessible `role="switch"` button — keyboard + screen
 * reader friendly. Sizing stays on the 4px grid (48×28 track, 20px knob).
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-border bg-muted px-0.5 outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50",
        className,
      )}
    >
      <span
        className={cn(
          "flex size-5 items-center justify-center rounded-full bg-card text-warning shadow-sm transition-transform duration-200",
          isDark && "translate-x-5 text-foreground",
        )}
        aria-hidden
      >
        {isDark ? <Moon className="size-3.5" /> : <Sun className="size-3.5" />}
      </span>
    </button>
  );
}

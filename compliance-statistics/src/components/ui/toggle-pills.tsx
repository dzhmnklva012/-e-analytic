"use client";

import { useState } from "react";

type TogglePillsProps = {
  options: [string, string];
  defaultIndex?: 0 | 1;
};

/** Segmented two-option toggle, e.g. "Проверки / Заключения". */
export function TogglePills({ options, defaultIndex = 0 }: TogglePillsProps) {
  const [active, setActive] = useState<number>(defaultIndex);
  return (
    <div className="inline-flex rounded-full bg-bg p-1">
      {options.map((label, i) => (
        <button
          key={label}
          type="button"
          aria-pressed={active === i}
          onClick={() => setActive(i)}
          className={
            active === i
              ? "rounded-full bg-blue px-4 py-1.5 text-xs font-semibold text-white"
              : "rounded-full px-4 py-1.5 text-xs font-semibold text-ink-secondary transition-colors hover:text-ink"
          }
        >
          {label}
        </button>
      ))}
    </div>
  );
}

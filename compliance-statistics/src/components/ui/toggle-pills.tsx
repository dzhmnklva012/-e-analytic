"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type TogglePillsProps = {
  options: [string, string];
  defaultValue?: string;
};

/** Segmented two-option toggle, e.g. "Проверки / Заключения". Single-select. */
export function TogglePills({ options, defaultValue }: TogglePillsProps) {
  const [value, setValue] = useState<string[]>([defaultValue ?? options[0]]);

  return (
    <ToggleGroup
      value={value}
      onValueChange={(next: string[]) => {
        // keep exactly one option selected
        if (next.length) setValue([next[next.length - 1]]);
      }}
      spacing={1}
      className="rounded-full bg-muted p-1"
    >
      {options.map((option) => (
        <ToggleGroupItem
          key={option}
          value={option}
          className="h-8 rounded-full px-4 text-xs font-semibold text-muted-foreground hover:bg-transparent hover:text-foreground aria-pressed:bg-primary aria-pressed:text-primary-foreground"
        >
          {option}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

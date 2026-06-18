"use client";

import { useId, useState } from "react";
import { CalendarRange } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CustomRangeFieldProps {
  /** Called only with a validated, in-range pair of ISO dates. */
  onApply: (from: string, to: string) => void;
  disabled?: boolean;
  className?: string;
}

function todayISO(): string {
  const now = new Date();
  const tz = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - tz).toISOString().slice(0, 10);
}

interface Errors {
  from?: string;
  to?: string;
  range?: string;
}

function validate(from: string, to: string): Errors {
  const errs: Errors = {};
  const max = todayISO();
  if (!from) errs.from = "Укажите дату начала";
  if (!to) errs.to = "Укажите дату окончания";
  if (to && to > max) errs.to = "Дата окончания не может быть в будущем";
  if (from && to && from > to) errs.range = "Дата начала позже даты окончания";
  return errs;
}

/**
 * Accessible custom date-range input with inline validation. Errors are
 * announced via role="alert" and wired to the inputs through aria-describedby.
 */
export function CustomRangeField({
  onApply,
  disabled,
  className,
}: CustomRangeFieldProps) {
  const fromId = useId();
  const toId = useId();
  const errId = useId();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);

  const max = todayISO();

  function handleApply() {
    const errs = validate(from, to);
    setErrors(errs);
    setTouched(true);
    if (Object.keys(errs).length === 0) onApply(from, to);
  }

  const inputBase =
    "h-8 rounded-md border bg-transparent px-3 text-xs shadow-xs outline-none transition focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-50 aria-invalid:border-danger aria-invalid:ring-danger/30 [color-scheme:light]";

  const messages = [errors.from, errors.to, errors.range].filter(Boolean);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex flex-wrap items-end gap-2">
        <div className="flex flex-col gap-1">
          <label htmlFor={fromId} className="text-xs text-muted-foreground">
            От
          </label>
          <input
            id={fromId}
            type="date"
            value={from}
            max={max}
            disabled={disabled}
            aria-invalid={touched && Boolean(errors.from || errors.range)}
            aria-describedby={messages.length ? errId : undefined}
            onChange={(e) => setFrom(e.target.value)}
            className={inputBase}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor={toId} className="text-xs text-muted-foreground">
            До
          </label>
          <input
            id={toId}
            type="date"
            value={to}
            max={max}
            disabled={disabled}
            aria-invalid={touched && Boolean(errors.to || errors.range)}
            aria-describedby={messages.length ? errId : undefined}
            onChange={(e) => setTo(e.target.value)}
            className={inputBase}
          />
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={handleApply}
          disabled={disabled}
        >
          <CalendarRange className="size-3.5" />
          Применить
        </Button>
      </div>
      {touched && messages.length > 0 && (
        <ul id={errId} role="alert" className="space-y-0.5 text-xs text-danger">
          {messages.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

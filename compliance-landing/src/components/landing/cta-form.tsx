"use client";

import * as React from "react";
import { ArrowRight, CheckCircle2, AlertCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Local-only lead form (no network) with inline validation + success state. */
export function CtaForm({ onDark = false }: { onDark?: boolean }) {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [done, setDone] = React.useState(false);
  const errorId = "cta-email-error";

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError("Введите корректный email.");
      return;
    }
    setError(null);
    setDone(true);
  }

  if (done) {
    return (
      <p
        role="status"
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold",
          onDark ? "bg-white/15 text-white" : "bg-success/10 text-success",
        )}
      >
        <CheckCircle2 className="size-5" aria-hidden="true" />
        Спасибо! Мы свяжемся с вами на {email.trim()}.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex w-full max-w-md flex-col gap-2">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Mail
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Ваш рабочий email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            aria-label="Email"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              "h-11 rounded-full pl-9",
              onDark && "border-transparent bg-white/95 text-slate-900 placeholder:text-slate-500 focus-visible:ring-white/50",
            )}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className={cn("h-11 rounded-full px-6", onDark && "bg-white text-primary hover:bg-white/90")}
        >
          Связаться с нами
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
      {error && (
        <p
          id={errorId}
          role="alert"
          className={cn(
            "inline-flex items-center gap-1.5 text-xs font-medium",
            onDark ? "text-white" : "text-destructive",
          )}
        >
          <AlertCircle className="size-3.5" aria-hidden="true" />
          {error}
        </p>
      )}
    </form>
  );
}

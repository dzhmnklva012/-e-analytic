"use client";

import { SendHorizontal } from "lucide-react";
import { useId, useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MAX_MESSAGE_LENGTH } from "@/lib/portrait";

type ChatComposerProps = {
  onSend: (text: string) => void;
  disabled?: boolean;
  offline?: boolean;
};

const NEAR_LIMIT = MAX_MESSAGE_LENGTH - 100;

/** Multi-line input with inline validation, char counter and Enter-to-send. */
export function ChatComposer({ onSend, disabled, offline }: ChatComposerProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const errorId = useId();
  const counterId = useId();

  const tooLong = value.length > MAX_MESSAGE_LENGTH;
  const blocked = Boolean(disabled) || offline;

  // Auto-grow the textarea up to a max height.
  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [value]);

  function submit() {
    const text = value.trim();
    if (blocked) return;
    if (!text) {
      setError("Введите вопрос перед отправкой.");
      return;
    }
    if (text.length > MAX_MESSAGE_LENGTH) {
      setError(`Сообщение слишком длинное — не больше ${MAX_MESSAGE_LENGTH} символов.`);
      return;
    }
    onSend(text);
    setValue("");
    setError(null);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  const showCounter = value.length >= NEAR_LIMIT;
  const describedBy =
    [error ? errorId : null, showCounter ? counterId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`flex items-end gap-2 rounded-2xl border bg-card px-2 py-2 transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30 ${
          error || tooLong ? "border-destructive" : "border-border"
        }`}
      >
        <Textarea
          ref={textareaRef}
          rows={1}
          value={value}
          disabled={blocked}
          aria-label="Вопрос по досье сотрудника"
          aria-invalid={Boolean(error) || tooLong}
          aria-describedby={describedBy}
          placeholder={
            offline ? "Нет подключения к интернету" : "Спросите что-нибудь о сотруднике…"
          }
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(null);
          }}
          onKeyDown={handleKeyDown}
        />
        <Button
          type="button"
          size="icon"
          aria-label="Отправить вопрос"
          disabled={blocked || !value.trim() || tooLong}
          onClick={submit}
          className="mb-0.5"
        >
          <SendHorizontal className="size-4" />
        </Button>
      </div>

      <div className="flex min-h-4 items-center justify-between gap-3 px-1">
        {error ? (
          <p id={errorId} role="alert" className="text-xs font-medium text-destructive">
            {error}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">
            Enter — отправить, Shift+Enter — новая строка
          </p>
        )}
        {showCounter && (
          <span
            id={counterId}
            className={`shrink-0 text-xs tabular-nums ${
              tooLong ? "font-semibold text-destructive" : "text-muted-foreground"
            }`}
          >
            {value.length}/{MAX_MESSAGE_LENGTH}
          </span>
        )}
      </div>
    </div>
  );
}

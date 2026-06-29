"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { answerQuestion, type Portrait } from "@/lib/portrait";

export type ChatRole = "assistant" | "user";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  /** "portrait" renders the structured dossier; "text" is a plain chat bubble. */
  kind: "text" | "portrait";
  text?: string;
};

/** empty → no portrait yet · generating → loading skeleton · ready → chat live. */
export type GenStatus = "empty" | "generating" | "ready";

type Options = {
  portrait: Portrait;
  /** Skip the empty state and generate immediately on mount. */
  autoGenerate?: boolean;
};

export function usePortraitChat({ portrait, autoGenerate = false }: Options) {
  const [status, setStatus] = useState<GenStatus>(
    autoGenerate ? "generating" : "empty",
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [replying, setReplying] = useState(false);

  const idRef = useRef(0);
  const nextId = useCallback(() => `m${++idRef.current}`, []);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Clear any pending timers on unmount.
  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const after = useCallback((ms: number, fn: () => void) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
  }, []);

  const generate = useCallback(() => {
    setReplying(false);
    setMessages([]);
    setStatus("generating");
    after(1400, () => {
      setMessages([{ id: nextId(), role: "assistant", kind: "portrait" }]);
      setStatus("ready");
    });
  }, [after, nextId]);

  // Optional auto-generate on first mount.
  const started = useRef(false);
  useEffect(() => {
    if (autoGenerate && !started.current) {
      started.current = true;
      generate();
    }
  }, [autoGenerate, generate]);

  const removeMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  }, []);

  // Re-answer: replace an assistant text reply using the preceding user question.
  const regenerateAnswer = useCallback(
    (id: string) => {
      setMessages((prev) => {
        const idx = prev.findIndex((m) => m.id === id);
        if (idx <= 0) return prev;
        const question = prev[idx - 1]?.text ?? "";
        const next = [...prev];
        next[idx] = { ...next[idx], text: answerQuestion(question) };
        return next;
      });
    },
    [],
  );

  const send = useCallback(
    (raw: string) => {
      const text = raw.trim();
      if (!text || replying || status !== "ready") return;

      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "user", kind: "text", text },
      ]);
      setReplying(true);

      after(900, () => {
        setMessages((prev) => [
          ...prev,
          {
            id: nextId(),
            role: "assistant",
            kind: "text",
            text: answerQuestion(text),
          },
        ]);
        setReplying(false);
      });
    },
    [after, nextId, replying, status],
  );

  return { status, messages, replying, portrait, generate, send };
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { answerQuestion, type Portrait } from "@/lib/portrait";

export type ChatRole = "assistant" | "user";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  /** "portrait" = structured dossier · "text" = chat bubble · "error" = failed reply. */
  kind: "text" | "portrait" | "error";
  text?: string;
  /** For "error" replies: the question to retry. */
  question?: string;
};

/**
 * empty → no portrait yet · generating → loading skeleton ·
 * ready → chat live · error → portrait generation failed (AI unavailable).
 */
export type GenStatus = "empty" | "generating" | "ready" | "error";

type Options = {
  portrait: Portrait;
  /** Skip the empty state and generate immediately on mount (show the loader). */
  autoGenerate?: boolean;
  /** Demo only: force the first generation / first answer to fail. */
  simulateGenError?: boolean;
  simulateAnswerError?: boolean;
};

export function usePortraitChat({
  portrait,
  autoGenerate = false,
  simulateGenError = false,
  simulateAnswerError = false,
}: Options) {
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

  // Demo: the first generation attempt simulates a transient AI-service failure;
  // retrying succeeds. In production this maps to catching an API/network error.
  const genShouldFail = useRef(true);

  const generate = useCallback(() => {
    setReplying(false);
    setMessages([]);
    setStatus("generating");
    after(1400, () => {
      if (genShouldFail.current) {
        genShouldFail.current = false;
        setStatus("error");
        return;
      }
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

  // Demo: the first answer attempt simulates an AI failure; retry succeeds.
  const answerShouldFail = useRef(true);

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
        setReplying(false);
        if (answerShouldFail.current) {
          answerShouldFail.current = false;
          setMessages((prev) => [
            ...prev,
            {
              id: nextId(),
              role: "assistant",
              kind: "error",
              text: "Не удалось получить ответ от ИИ. Проверьте соединение и попробуйте снова.",
              question: text,
            },
          ]);
          return;
        }
        setMessages((prev) => [
          ...prev,
          { id: nextId(), role: "assistant", kind: "text", text: answerQuestion(text) },
        ]);
      });
    },
    [after, nextId, replying, status],
  );

  // Retry a failed answer: drop the error bubble and re-run its question.
  const retryAnswer = useCallback(
    (id: string) => {
      let question: string | undefined;
      setMessages((prev) => {
        question = prev.find((m) => m.id === id)?.question;
        return prev.filter((m) => m.id !== id);
      });
      if (!question) return;
      setReplying(true);
      after(800, () => {
        setReplying(false);
        setMessages((prev) => [
          ...prev,
          { id: nextId(), role: "assistant", kind: "text", text: answerQuestion(question!) },
        ]);
      });
    },
    [after, nextId],
  );

  return {
    status,
    messages,
    replying,
    portrait,
    generate,
    send,
    removeMessage,
    regenerateAnswer,
    retryAnswer,
  };
}

"use client";

import { RefreshCw, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { usePortraitChat } from "@/hooks/use-portrait-chat";
import { useOnlineStatus } from "@/hooks/use-online-status";
import { suggestedQuestions, type Portrait } from "@/lib/portrait";
import { ChatComposer } from "./chat-composer";
import { ChatMessage } from "./chat-message";
import { EmptyState } from "./empty-state";
import { OfflineBanner } from "./offline-banner";
import { PortraitDocument } from "./portrait-document";
import { PortraitSkeleton } from "./portrait-skeleton";
import { SuggestedPrompts } from "./suggested-prompts";
import { TypingIndicator } from "./typing-indicator";

type AiPortraitChatProps = {
  portrait: Portrait;
  className?: string;
};

/** Self-contained "Портрет ИИ" panel: AI-generated dossier + follow-up chat. */
export function AiPortraitChat({ portrait, className }: AiPortraitChatProps) {
  const online = useOnlineStatus();
  const { status, messages, replying, generate, send } = usePortraitChat({ portrait });

  const scrollRef = useRef<HTMLDivElement>(null);

  // Keep the latest message in view as the conversation grows.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages.length, replying, status]);

  const hasUserAsked = messages.some((m) => m.role === "user");
  const showSuggestions = status === "ready" && !hasUserAsked && !replying;

  return (
    <section
      className={`flex min-h-0 flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10 ${className ?? ""}`}
      aria-label="Портрет ИИ — чат по досье сотрудника"
    >
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground">
            <Sparkles className="size-5" />
          </span>
          <div className="min-w-0">
            <h2 className="text-base font-bold leading-tight text-foreground">Портрет ИИ</h2>
            <p className="truncate text-xs text-muted-foreground">
              ИИ-ассистент досье · {portrait.subjectName}
            </p>
          </div>
        </div>
        {status === "ready" && (
          <Button
            variant="outline"
            size="sm"
            onClick={generate}
            className="gap-2"
          >
            <RefreshCw className="size-3.5" />
            <span className="hidden sm:inline">Сгенерировать повторно</span>
            <span className="sm:hidden">Заново</span>
          </Button>
        )}
      </header>

      {!online && <OfflineBanner />}

      {/* Conversation */}
      {status === "empty" ? (
        <EmptyState
          subjectName={portrait.subjectName}
          onGenerate={generate}
          disabled={!online}
        />
      ) : (
        <div
          ref={scrollRef}
          className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 py-4 sm:px-6"
          role="log"
          aria-live="polite"
          aria-label="История диалога"
          tabIndex={0}
        >
          {status === "generating" ? (
            <PortraitSkeleton />
          ) : (
            <>
              {messages.map((m) =>
                m.kind === "portrait" ? (
                  <ChatMessage key={m.id} role="assistant" wide>
                    <PortraitDocument sections={portrait.sections} />
                  </ChatMessage>
                ) : (
                  <ChatMessage key={m.id} role={m.role}>
                    {m.text}
                  </ChatMessage>
                ),
              )}
              {replying && (
                <ChatMessage role="assistant">
                  <TypingIndicator />
                </ChatMessage>
              )}
            </>
          )}
        </div>
      )}

      {/* Composer */}
      {status === "ready" && (
        <div className="flex shrink-0 flex-col gap-3 border-t border-border px-4 py-3 sm:px-6">
          {showSuggestions && (
            <SuggestedPrompts
              prompts={suggestedQuestions}
              onSelect={send}
              disabled={!online}
            />
          )}
          <ChatComposer onSend={send} offline={!online} disabled={replying} />
        </div>
      )}
    </section>
  );
}

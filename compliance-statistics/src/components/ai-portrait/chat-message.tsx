import type { ReactNode } from "react";
import type { ChatRole } from "@/hooks/use-portrait-chat";
import { ChatAvatar } from "./chat-avatar";

type ChatMessageProps = {
  role: ChatRole;
  /** Portrait messages render full-width without the bubble chrome. */
  wide?: boolean;
  children: ReactNode;
};

/** Generic chat row: avatar + a tone-appropriate bubble, aligned by role. */
export function ChatMessage({ role, wide, children }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <ChatAvatar role={role} />
      <div
        className={`min-w-0 rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          wide ? "flex-1" : "max-w-[min(36rem,85%)]"
        } ${
          isUser
            ? "rounded-tr-sm bg-primary text-primary-foreground"
            : "rounded-tl-sm bg-muted text-foreground"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

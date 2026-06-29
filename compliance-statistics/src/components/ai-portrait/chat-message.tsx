import type { ReactNode } from "react";
import type { ChatRole } from "@/hooks/use-portrait-chat";
import { ChatAvatar } from "./chat-avatar";

type ChatMessageProps = {
  role: ChatRole;
  /** Portrait messages render full-width without the bubble chrome. */
  wide?: boolean;
  /** Optional hover/focus toolbar (e.g. <MessageActions />) anchored to the bubble. */
  actions?: ReactNode;
  children: ReactNode;
};

/** Generic chat row: avatar + a tone-appropriate bubble, aligned by role. */
export function ChatMessage({ role, wide, actions, children }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={`group relative flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <ChatAvatar role={role} />
      <div
        className={`relative min-w-0 rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          wide ? "flex-1" : "max-w-[min(36rem,85%)]"
        } ${
          isUser
            ? "rounded-tr-sm bg-primary text-primary-foreground"
            : "rounded-tl-sm bg-muted text-foreground"
        }`}
      >
        {children}
        {actions && (
          <div
            className={`absolute -top-3 ${
              isUser ? "left-3" : "right-3"
            } opacity-0 transition-opacity duration-150 group-hover:opacity-100 focus-within:opacity-100`}
          >
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

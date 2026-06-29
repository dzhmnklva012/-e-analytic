import { Sparkles, User } from "lucide-react";
import type { ChatRole } from "@/hooks/use-portrait-chat";

/** Small round avatar that fronts each message — AI vs. the current user. */
export function ChatAvatar({ role }: { role: ChatRole }) {
  if (role === "assistant") {
    return (
      <span
        aria-hidden
        className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground"
      >
        <Sparkles className="size-4" />
      </span>
    );
  }
  return (
    <span
      aria-hidden
      className="grid size-8 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground"
    >
      <User className="size-4" />
    </span>
  );
}

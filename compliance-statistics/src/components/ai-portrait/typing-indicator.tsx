/** Three bouncing dots shown while the AI is composing a reply. */
export function TypingIndicator() {
  return (
    <span className="flex items-center gap-1" role="status" aria-label="ИИ печатает">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="size-1.5 animate-bounce rounded-full bg-muted-foreground"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </span>
  );
}

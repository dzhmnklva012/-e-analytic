import { ChatAvatar } from "./chat-avatar";

function Bar({ className = "" }: { className?: string }) {
  return <span className={`block h-4 animate-pulse rounded bg-border ${className}`} />;
}

/** Loading placeholder shown while the AI generates the portrait. */
export function PortraitSkeleton() {
  return (
    <div className="flex gap-3" aria-hidden>
      <ChatAvatar role="assistant" />
      <div className="flex-1 rounded-2xl rounded-tl-sm bg-muted px-4 py-3">
        <div className="flex flex-col gap-6">
          {[0, 1, 2].map((section) => (
            <div key={section} className="flex flex-col gap-3">
              <Bar className="h-3 w-32" />
              <Bar className="w-[90%]" />
              <Bar className="w-[80%]" />
              <Bar className="w-[60%]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

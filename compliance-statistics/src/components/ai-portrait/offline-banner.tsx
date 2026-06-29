import { WifiOff } from "lucide-react";

/** Inline notice shown when the browser loses connectivity. */
export function OfflineBanner() {
  return (
    <div
      role="status"
      className="flex items-center gap-2 border-b border-warning/30 bg-warning/10 px-4 py-2 text-xs font-semibold text-warning sm:px-6"
    >
      <WifiOff className="size-4 shrink-0" />
      Нет подключения к интернету. Новые вопросы отправить нельзя.
    </div>
  );
}

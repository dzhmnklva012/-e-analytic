import { WifiOff } from "lucide-react";

/** Shown when the browser goes offline; the screening demo is disabled. */
function OfflineBanner() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-start gap-3 rounded-lg border border-warning/40 bg-warning/10 px-4 py-3 text-sm text-foreground"
    >
      <WifiOff className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden />
      <span>
        <span className="font-semibold">Нет подключения к интернету.</span>{" "}
        Проверка недоступна офлайн — восстановите соединение, чтобы продолжить.
      </span>
    </div>
  );
}

export { OfflineBanner };

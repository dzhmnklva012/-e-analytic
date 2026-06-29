"use client";

import { WifiOff } from "lucide-react";
import { useOnlineStatus } from "@/lib/hooks/use-online-status";

/**
 * Slim banner that appears only when the browser goes offline.
 * Announced politely to assistive tech via role="status".
 */
export function OfflineBanner() {
  const online = useOnlineStatus();

  if (online) return null;

  return (
    <div
      role="status"
      className="sticky top-16 z-30 flex items-center justify-center gap-2 bg-warning px-4 py-2 text-xs font-semibold text-white"
    >
      <WifiOff className="size-4" aria-hidden="true" />
      Нет подключения к интернету — проверки недоступны. Подключитесь и повторите.
    </div>
  );
}

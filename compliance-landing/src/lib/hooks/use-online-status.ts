"use client";

import { useEffect, useState } from "react";

/**
 * Tracks the browser's online/offline state.
 * Returns `true` until the component mounts (SSR-safe), then mirrors
 * `navigator.onLine` and listens for `online` / `offline` events.
 */
export function useOnlineStatus(): boolean {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);

    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return online;
}

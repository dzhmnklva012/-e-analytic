"use client";

import { useEffect, useState } from "react";

/** Tracks navigator.onLine and updates on the browser online/offline events. */
export function useOnlineStatus(): boolean {
  // Start optimistic (true) so SSR and first paint match; correct on mount.
  const [online, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return online;
}

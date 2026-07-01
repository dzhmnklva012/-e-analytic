"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in ms applied as transition-delay. */
  delay?: number;
  /** Entrance direction: rise up (default), slide from a side, or scale in. */
  dir?: "up" | "left" | "right" | "scale";
};

/**
 * Reveals children (fade + directional slide) the first time they scroll into
 * view. Hardened so content is never left permanently hidden: reveals
 * immediately if already in view, and has a safety fallback if the observer
 * never fires. Motion itself is CSS (disabled for reduced-motion users).
 */
export function Reveal({ children, className, delay = 0, dir = "up" }: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const viewportH = () => window.innerHeight || document.documentElement.clientHeight;
    const inView = () => {
      const r = el.getBoundingClientRect();
      return r.top < viewportH() * 0.95 && r.bottom > 0;
    };

    // Already visible on mount → reveal right away.
    if (inView()) {
      setVisible(true);
      return;
    }

    const reveal = () => {
      setVisible(true);
      cleanup();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) reveal();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);

    // Backup: reveal on scroll in case the observer misses on some devices.
    const onScroll = () => {
      if (inView()) reveal();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    function cleanup() {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    }
    return cleanup;
  }, []);

  return (
    <div
      ref={ref}
      data-dir={dir}
      className={cn("reveal", visible && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

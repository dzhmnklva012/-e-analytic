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
 * Reveals its children (rise up + fade in) the first time it scrolls into
 * view. Uses IntersectionObserver and reveals once. Motion itself is defined
 * in CSS (`.reveal` / `.is-visible`) and disabled for reduced-motion users,
 * so this just toggles the class.
 */
export function Reveal({ children, className, delay = 0, dir = "up" }: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If IntersectionObserver is unavailable, just show it.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

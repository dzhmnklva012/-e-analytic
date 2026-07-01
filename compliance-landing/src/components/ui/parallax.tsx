"use client";

import * as React from "react";

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  /** Max upward drift in px as the element travels through the viewport. */
  amount?: number;
};

/**
 * Scroll-linked parallax: translates its child upward as it scrolls up through
 * the viewport, giving a "cards float up" feel. Disabled for reduced-motion.
 */
export function Parallax({ children, className, amount = 40 }: ParallaxProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // progress: 0 when the element's centre is at the viewport bottom,
      // 1 when it reaches the top → drives an upward translate.
      const progress = 1 - (rect.top + rect.height / 2) / vh;
      const clamped = Math.max(-0.5, Math.min(1.5, progress));
      const offset = -clamped * amount;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [amount]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

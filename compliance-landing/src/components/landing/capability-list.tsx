"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Capability = { label: string; lead: string; rest: string };

const capabilities: Capability[] = [
  {
    label: "Глобальная проверка",
    lead: "Проверяйте за секунды.",
    rest: " ИИ-агент сверяет контрагента с международными базами и санкционными списками и собирает полное досье.",
  },
  {
    label: "Расследования",
    lead: "Ведите дела до конца.",
    rest: " Свяжите лиц, обращения и доказательства, назначьте ответственного и выгрузите отчёт для аудита.",
  },
  {
    label: "Аналитика и контроль",
    lead: "Видьте картину целиком.",
    rest: " Риски, горячая линия, конфликты и нагрузка — на живых дашбордах в реальном времени.",
  },
];

/**
 * Sticky-scroll step list: the card nearest the viewport centre becomes
 * "active" (highlighted) while the others dim, as you scroll past the pinned
 * visual. Reduced-motion → all cards stay fully visible.
 */
export function CapabilityList() {
  const [active, setActive] = React.useState(0);
  const refs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(-1); // -1 → treat all as active (no dimming)
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = (window.innerHeight || document.documentElement.clientHeight) / 2;
      let best = 0;
      let bestDist = Infinity;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);
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
  }, []);

  return (
    <div className="flex flex-col gap-5">
      {capabilities.map((c, i) => {
        const on = active === -1 || active === i;
        return (
          <div
            key={c.label}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={cn(
              "rounded-3xl border p-6 backdrop-blur-sm transition-all duration-500 sm:p-8",
              on
                ? "border-primary/40 bg-white/[0.07] shadow-[0_0_50px_-12px_rgba(74,163,255,0.5)]"
                : "border-white/10 bg-white/[0.03] opacity-55",
            )}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase">
              <span className={cn("size-1.5 rounded-full transition-colors", on ? "bg-[#4aa3ff]" : "bg-white/30")} />
              <span className={on ? "text-white/70" : "text-white/40"}>{c.label}</span>
            </span>
            <p className="mt-4 text-lg text-pretty sm:text-xl">
              <span className={cn("font-bold transition-colors", on ? "text-white" : "text-white/60")}>{c.lead}</span>
              <span className={cn("transition-colors", on ? "text-white/55" : "text-white/35")}>{c.rest}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
}

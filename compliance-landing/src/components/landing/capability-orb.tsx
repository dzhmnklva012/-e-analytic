"use client";

import * as React from "react";

/**
 * Scroll-linked "sparkler → beam → orb" visual (EternaCloud style). Stays
 * sticky while the capability cards scroll; the beam fades and the horizontal
 * streak grows as you scroll through the section. Reduced-motion → static.
 */
export function CapabilityOrb() {
  const sparkRef = React.useRef<HTMLDivElement>(null);
  const beamRef = React.useRef<HTMLSpanElement>(null);
  const streakRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const apply = () => {
      raf = 0;
      const section = document.getElementById("capabilities");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const total = Math.max(rect.height - vh, 1);
      const p = Math.min(Math.max(-rect.top / total, 0), 1); // 0 → 1 through section

      if (sparkRef.current) {
        sparkRef.current.style.transform = `rotate(${(p * 120).toFixed(1)}deg) scale(${(1 + p * 0.35).toFixed(3)})`;
        sparkRef.current.style.opacity = (1 - p * 0.55).toFixed(3);
      }
      if (beamRef.current) {
        beamRef.current.style.transform = `scaleY(${(1 - p * 0.92).toFixed(3)})`;
        beamRef.current.style.opacity = (1 - p * 0.9).toFixed(3);
      }
      if (streakRef.current) {
        streakRef.current.style.transform = `translate(-50%, -50%) scaleX(${(0.45 + p * 1.05).toFixed(3)})`;
        streakRef.current.style.opacity = (0.3 + p * 0.6).toFixed(3);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    apply();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="relative flex h-[26rem] w-full max-w-sm flex-col items-center justify-center" aria-hidden="true">
      {/* ambient glow */}
      <div
        className="absolute inset-0 blur-3xl"
        style={{ background: "radial-gradient(45% 40% at 50% 26%, rgba(74,163,255,0.32), transparent 70%), radial-gradient(42% 40% at 50% 80%, rgba(167,139,250,0.4), transparent 70%)" }}
      />

      {/* sparkler burst */}
      <div ref={sparkRef} className="relative grid size-24 place-items-center will-change-transform">
        <span
          className="absolute inset-0 blur-[1.5px]"
          style={{
            background: "repeating-conic-gradient(from 0deg, rgba(210,225,255,0.5) 0deg 0.6deg, transparent 0.6deg 7deg)",
            maskImage: "radial-gradient(closest-side, transparent 18%, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(closest-side, transparent 18%, black 30%, transparent 75%)",
          }}
        />
        <span className="animate-soft-pulse size-4 rounded-full bg-white shadow-[0_0_26px_9px_rgba(160,190,255,0.65)]" />
      </div>

      {/* light beam */}
      <span
        ref={beamRef}
        className="my-2 h-28 w-[3px] origin-top rounded-full will-change-transform"
        style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0), #8ec2ff, #a78bfa)", filter: "blur(1.5px) drop-shadow(0 0 8px rgba(127,188,255,0.7))" }}
      />

      {/* orb + horizontal streak */}
      <div className="relative grid place-items-center">
        <span
          ref={streakRef}
          className="absolute top-1/2 left-1/2 h-[3px] w-80 rounded-full will-change-transform"
          style={{ background: "linear-gradient(90deg, transparent, #ff9d5c 30%, #a78bfa 60%, transparent)", filter: "blur(1px)" }}
        />
        {[136, 96].map((s) => (
          <span key={s} className="absolute rounded-full border border-white/10" style={{ width: s, height: s }} />
        ))}
        <span className="animate-soft-pulse relative size-24 rounded-full bg-gradient-to-br from-[#068dff] to-[#7c7ae0] shadow-[0_0_70px_rgba(74,163,255,0.65)] ring-1 ring-white/20" />
      </div>
    </div>
  );
}

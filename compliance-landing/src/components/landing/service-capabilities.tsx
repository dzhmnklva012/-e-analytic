"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { CapabilityOrb } from "./capability-orb";

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

const N = capabilities.length;

export function ServiceCapabilities() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const cardsRef = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    const mqLg = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const clearCards = () => {
      cardsRef.current.forEach((el) => {
        if (!el) return;
        el.style.transform = "";
        el.style.opacity = "";
        el.style.zIndex = "";
        el.style.boxShadow = "";
        el.style.borderColor = "";
      });
    };

    let raf = 0;
    const apply = () => {
      raf = 0;
      const sec = sectionRef.current;
      if (!sec) return;

      if (!mqLg.matches || reduce) {
        clearCards();
        return;
      }

      const rect = sec.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const total = Math.max(rect.height - vh, 1);
      const p = Math.min(Math.max(-rect.top / total, 0), 1); // scroll progress 0→1
      const focus = p * (N - 1); // which card index is centred
      const activeIdx = Math.round(focus);

      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        const rel = i - focus;
        const y = rel * 165; // px offset from centre
        const opacity = Math.max(0, 1 - Math.abs(rel) * 1.15); // fade out as it leaves centre
        const scale = Math.max(0.84, 1 - Math.abs(rel) * 0.14);
        el.style.transform = `translateY(calc(-50% + ${y.toFixed(1)}px)) scale(${scale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = String(100 - Math.round(Math.abs(rel) * 10));
        const on = i === activeIdx;
        el.style.boxShadow = on ? "0 0 60px -12px rgba(74,163,255,0.55)" : "none";
        el.style.borderColor = on ? "rgba(74,163,255,0.4)" : "rgba(255,255,255,0.1)";
      });
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
    <section ref={sectionRef} id="capabilities" className="relative scroll-mt-20 bg-[#0a0b12]">
      {/* ambient glows */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 35% at 78% 30%, color-mix(in oklch, #068dff 20%, transparent), transparent 70%), radial-gradient(38% 35% at 80% 72%, color-mix(in oklch, #7c7ae0 18%, transparent), transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* heading */}
      <Container className="relative pt-20 sm:pt-28">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
            <span className="size-1.5 rounded-full bg-[#4aa3ff]" />
            Возможности сервиса
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl">
            Один сервис —{" "}
            <span className="bg-gradient-to-r from-[#4aa3ff] to-[#a78bfa] bg-clip-text text-transparent">
              весь комплаенс.
            </span>
          </h2>
          <p className="text-base text-pretty text-white/60">
            От проверки контрагента до расследования и отчёта — прокрутите, чтобы увидеть каждый шаг.
          </p>
        </Reveal>
      </Container>

      {/* scroll-scrub track (pins on desktop) */}
      <div className="relative pb-20 sm:pb-28 lg:h-[260vh] lg:pb-0">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center">
          <Container className="relative w-full">
            <div className="grid items-center gap-10 pt-10 lg:grid-cols-2 lg:gap-16 lg:pt-0">
              {/* card stage */}
              <div className="relative flex flex-col gap-6 lg:block lg:h-[24rem]">
                {capabilities.map((c, i) => (
                  <div
                    key={c.label}
                    ref={(el) => {
                      cardsRef.current[i] = el;
                    }}
                    className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm will-change-transform sm:p-8 lg:absolute lg:inset-x-0 lg:top-1/2"
                  >
                    <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-white/50 uppercase">
                      <span className="size-1.5 rounded-full bg-[#4aa3ff]" />
                      {c.label}
                    </span>
                    <p className="mt-4 text-lg text-pretty sm:text-xl">
                      <span className="font-bold text-white">{c.lead}</span>
                      <span className="text-white/55">{c.rest}</span>
                    </p>
                  </div>
                ))}
              </div>

              {/* pinned morphing visual */}
              <div className="hidden justify-center lg:flex">
                <CapabilityOrb />
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}

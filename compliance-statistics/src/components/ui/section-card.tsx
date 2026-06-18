import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { StatBadge } from "./stat-badge";

type SectionCardProps = {
  title: string;
  badge?: { period: string; value: number; delta: number };
  /** Render the chevron as a filled blue button (matches Конфликт интересов). */
  accentChevron?: boolean;
  className?: string;
  children: ReactNode;
};

export function SectionCard({
  title,
  badge,
  accentChevron,
  className = "",
  children,
}: SectionCardProps) {
  return (
    <section
      className={`flex flex-col rounded-2xl bg-card p-6 shadow-[0_1px_2px_rgba(44,62,80,0.04)] ${className}`}
    >
      <header className="mb-4 flex items-start justify-between gap-3">
        <h2 className="text-lg font-bold text-ink">{title}</h2>
        <div className="flex shrink-0 items-center gap-2">
          {badge && <StatBadge {...badge} />}
          <button
            type="button"
            aria-label={`Открыть ${title}`}
            className={
              accentChevron
                ? "grid size-8 place-items-center rounded-lg bg-blue text-white transition-colors hover:bg-blue/90"
                : "grid size-8 place-items-center rounded-lg border border-line text-ink-muted transition-colors hover:bg-bg"
            }
          >
            <ChevronRight className="size-4" strokeWidth={2.5} />
          </button>
        </div>
      </header>
      {children}
    </section>
  );
}

import { SectionCard } from "../ui/section-card";
import { formatRu, gifts } from "@/lib/data";

export function GiftsCard() {
  return (
    <SectionCard title="Подарки">
      <div className="grid flex-1 grid-cols-2 gap-3">
        {gifts.map((g) => (
          <div
            key={g.label}
            className="flex flex-col justify-center rounded-xl bg-bg px-4 py-3"
          >
            <div className="text-[13px] text-ink-secondary">{g.label}</div>
            <div className="mt-1 text-2xl font-bold text-ink">
              {formatRu(g.value)}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

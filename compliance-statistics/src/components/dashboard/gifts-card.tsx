import { SectionCard } from "../ui/section-card";
import { formatRu, gifts } from "@/lib/data";

export function GiftsCard() {
  return (
    <SectionCard title="Подарки">
      <div className="grid flex-1 grid-cols-2 gap-4">
        {gifts.map((g) => (
          <div
            key={g.label}
            className="flex flex-col justify-center rounded-lg bg-muted px-4 py-4"
          >
            <div className="text-xs text-muted-foreground">{g.label}</div>
            <div className="mt-1 text-2xl font-bold text-foreground">
              {formatRu(g.value)}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

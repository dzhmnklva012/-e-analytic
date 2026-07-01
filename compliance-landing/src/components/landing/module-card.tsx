import { cn } from "@/lib/utils";
import type { Module } from "@/lib/data";

// pastel icon-tile tones, cycled across the grid (index 0 = brand blue)
const tones = [
  "bg-secondary text-primary",
  "bg-violet-100 text-violet-600",
  "bg-emerald-100 text-emerald-600",
  "bg-rose-100 text-rose-600",
  "bg-amber-100 text-amber-600",
  "bg-teal-100 text-teal-600",
];

export function ModuleCard({ module, index = 0 }: { module: Module; index?: number }) {
  const Icon = module.icon;
  const tone = tones[index % tones.length];

  return (
    <div
      className={cn(
        "flex h-full flex-col gap-4 rounded-2xl border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5",
        module.flagship ? "border-primary ring-1 ring-primary/30" : "border-border",
      )}
    >
      <span className={cn("grid size-14 place-items-center rounded-2xl", tone)}>
        <Icon className="size-6" strokeWidth={2} aria-hidden="true" />
      </span>
      <h3 className="text-lg font-bold text-foreground">{module.name}</h3>
      <p className="text-sm text-pretty text-muted-foreground">{module.description}</p>
    </div>
  );
}

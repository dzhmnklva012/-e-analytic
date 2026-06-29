import type { Benefit } from "@/lib/data";

export function FeatureCard({ benefit }: { benefit: Benefit }) {
  const Icon = benefit.icon;
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
      <span className="grid size-11 place-items-center rounded-xl bg-secondary text-secondary-foreground">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h3 className="text-base font-bold text-foreground">{benefit.title}</h3>
      <p className="text-sm text-pretty text-muted-foreground">{benefit.description}</p>
    </div>
  );
}

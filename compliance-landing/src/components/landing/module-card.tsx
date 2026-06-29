import type { ModuleItem } from "@/lib/data";

/** Compact module tile for the modules grid. */
function ModuleCard({ icon: Icon, name, description }: ModuleItem) {
  return (
    <div className="flex gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40">
      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
        <Icon className="size-5" aria-hidden />
      </span>
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-foreground">{name}</h3>
        <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export { ModuleCard };

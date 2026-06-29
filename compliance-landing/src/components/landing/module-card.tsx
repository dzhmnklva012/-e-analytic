import { cn } from "@/lib/utils";
import type { Module } from "@/lib/data";

export function ModuleCard({ module }: { module: Module }) {
  const Icon = module.icon;
  return (
    <div
      className={cn(
        "group relative flex flex-col gap-3 rounded-2xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-foreground/5",
        module.flagship ? "border-primary/40 ring-1 ring-primary/20" : "border-border",
      )}
    >
      {module.flagship && (
        <span className="absolute top-5 right-5 rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
          ИИ-агент
        </span>
      )}
      <span
        className={cn(
          "grid size-11 place-items-center rounded-xl transition-colors",
          module.flagship
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground",
        )}
      >
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h3 className="text-base font-bold text-foreground">{module.name}</h3>
      <p className="text-sm text-pretty text-muted-foreground">{module.description}</p>
    </div>
  );
}

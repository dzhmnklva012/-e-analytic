import { Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Plan } from "@/lib/data";

export function PricingCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-6 rounded-2xl border bg-card p-6",
        plan.featured
          ? "border-primary ring-2 ring-primary/30 shadow-xl shadow-primary/5 lg:-mt-4 lg:mb-4"
          : "border-border",
      )}
    >
      {plan.featured && (
        <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
          Популярный
        </span>
      )}

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
        <p className="text-sm text-muted-foreground">{plan.description}</p>
      </div>

      <div className="flex items-baseline gap-1.5">
        <span className="text-3xl font-bold tracking-tight text-foreground">{plan.price}</span>
        <span className="text-sm text-muted-foreground">/ {plan.period}</span>
      </div>

      <div className="rounded-lg bg-secondary px-3 py-2 text-sm font-semibold text-secondary-foreground">
        {plan.quota}
      </div>

      <ul className="flex flex-1 flex-col gap-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
            <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
            <span className="text-pretty">{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href="#"
        className={cn(
          buttonVariants({ variant: plan.featured ? "default" : "outline", size: "lg" }),
          "h-11 w-full",
        )}
      >
        {plan.cta}
      </a>
    </div>
  );
}

import { Check } from "lucide-react";

import type { PricingTier } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";

function PricingCard({
  name,
  price,
  period,
  quota,
  description,
  features,
  cta,
  featured,
}: PricingTier) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 rounded-2xl border bg-card p-6",
        featured
          ? "border-primary ring-1 ring-primary lg:scale-[1.02]"
          : "border-border",
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-bold text-foreground">{name}</h3>
          {featured && <Badge>Популярный</Badge>}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-3xl font-bold text-foreground">{price}</span>
        <span className="text-xs text-muted-foreground">{period}</span>
      </div>

      <Badge variant="secondary" className="w-fit px-3 py-1 text-xs">
        {quota}
      </Badge>

      <ul className="flex flex-1 flex-col gap-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
            <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        size="lg"
        variant={featured ? "default" : "outline"}
        className="w-full"
        render={<a href="#contact" />}
      >
        {cta}
      </Button>
    </div>
  );
}

export { PricingCard };

import type { Feature } from "@/lib/data";
import { Card } from "@/components/ui/card";

/** Icon + title + description tile, used for benefits and audience grids. */
function FeatureCard({ icon: Icon, title, description }: Feature) {
  return (
    <Card className="gap-4 transition-shadow hover:shadow-sm">
      <span className="inline-flex size-12 items-center justify-center rounded-xl bg-secondary text-primary">
        <Icon className="size-6" aria-hidden />
      </span>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
}

export { FeatureCard };

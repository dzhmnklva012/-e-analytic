import type { Step } from "@/lib/data";

interface StepItemProps extends Step {
  index: number;
  /** Hide the connector line on the last item. */
  last?: boolean;
}

/** Numbered step in the "How it works" vertical timeline. */
function StepItem({ index, title, description, last }: StepItemProps) {
  return (
    <li className="relative flex gap-4 pb-8 last:pb-0">
      {!last && (
        <span
          aria-hidden
          className="absolute left-5 top-12 h-[calc(100%-32px)] w-px bg-border"
        />
      )}
      <span className="z-10 inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
        {index + 1}
      </span>
      <div className="flex flex-col gap-1 pt-1.5">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <p className="max-w-[640px] text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </li>
  );
}

export { StepItem };

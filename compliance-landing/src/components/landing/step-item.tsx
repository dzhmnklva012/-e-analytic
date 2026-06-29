import type { Step } from "@/lib/data";

export function StepItem({ step, index }: { step: Step; index: number }) {
  const Icon = step.icon;
  return (
    <li className="relative flex gap-4">
      {/* connector */}
      <div className="flex flex-col items-center">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <span className="mt-2 w-px flex-1 bg-border last:hidden" aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-1 pb-8">
        <span className="text-xs font-bold tracking-wide text-primary uppercase">
          Шаг {index + 1}
        </span>
        <h3 className="text-base font-bold text-foreground">{step.title}</h3>
        <p className="max-w-md text-sm text-pretty text-muted-foreground">{step.description}</p>
      </div>
    </li>
  );
}

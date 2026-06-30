import { cn } from "@/lib/utils";

export function Logo({
  className,
  light = false,
}: {
  className?: string;
  /** White treatment for use over a dark/blue background. */
  light?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "grid size-9 place-items-center rounded-lg text-lg font-extrabold",
          light ? "bg-white/15 text-white ring-1 ring-white/30" : "bg-foreground text-background",
        )}
      >
        A
      </span>
      <span className={cn("text-xl font-extrabold tracking-tight", light ? "text-white" : "text-foreground")}>
        DATA
      </span>
    </span>
  );
}

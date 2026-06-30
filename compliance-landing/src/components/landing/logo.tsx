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
    <span className={cn("text-xl font-extrabold tracking-tight", className)}>
      <span className={light ? "text-white" : "text-foreground"}>Adata</span>{" "}
      <span className={light ? "text-white/80" : "text-primary"}>Compliance</span>
    </span>
  );
}

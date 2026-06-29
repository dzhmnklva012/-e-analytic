import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  light = false,
}: {
  className?: string;
  /** White treatment for use over the dark/blue sky hero. */
  light?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "grid size-8 place-items-center rounded-lg",
          light ? "bg-white/15 text-white ring-1 ring-white/30" : "bg-primary text-primary-foreground",
        )}
      >
        <ShieldCheck className="size-5" aria-hidden="true" />
      </span>
      <span className={cn("text-base font-bold tracking-tight", light ? "text-white" : "text-foreground")}>
        ADATA <span className={light ? "text-white/80" : "text-primary"}>Compliance</span>
      </span>
    </span>
  );
}

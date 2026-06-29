import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
        <ShieldCheck className="size-5" aria-hidden="true" />
      </span>
      <span className="text-base font-bold tracking-tight text-foreground">
        ADATA <span className="text-primary">Compliance</span>
      </span>
    </span>
  );
}

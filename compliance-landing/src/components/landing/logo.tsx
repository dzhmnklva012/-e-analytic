import { ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Use the muted (footer) tone instead of full-colour. */
  tone?: "default" | "muted";
}

/** ADATA Compliance wordmark + shield glyph. */
function Logo({ className, tone = "default" }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "inline-flex size-8 items-center justify-center rounded-lg",
          tone === "default" ? "bg-primary text-primary-foreground" : "bg-muted text-primary",
        )}
      >
        <ShieldCheck className="size-5" aria-hidden />
      </span>
      <span className="text-base font-bold tracking-tight text-foreground">
        ADATA <span className="text-primary">Compliance</span>
      </span>
    </span>
  );
}

export { Logo };

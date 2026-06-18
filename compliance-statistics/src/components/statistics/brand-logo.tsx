import { cn } from "@/lib/utils";

export interface BrandLogoProps {
  /** Hide the wordmark, showing only the "A" chip (collapsed rail). */
  compact?: boolean;
  className?: string;
}

/** ADATA wordmark: navy "A" chip + "DATA" with a "Compliance" subtitle. */
export function BrandLogo({ compact = false, className }: BrandLogoProps) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <span
        className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand text-base font-bold text-brand-foreground"
        aria-hidden
      >
        A
      </span>
      {!compact && (
        <span className="text-base font-bold tracking-wide text-foreground">
          DATA
          <span className="ml-2 text-xs font-medium text-muted-foreground">
            Compliance
          </span>
        </span>
      )}
      <span className="sr-only">ADATA Compliance</span>
    </span>
  );
}

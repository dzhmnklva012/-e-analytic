import * as React from "react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Matches the parent Section id so aria-labelledby resolves. */
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "mx-auto max-w-[720px] text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-wide text-primary">
          {eyebrow}
        </span>
      )}
      <h2
        id={`${id}-title`}
        className="text-2xl font-bold leading-tight text-foreground sm:text-3xl"
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-base text-muted-foreground",
            align === "center" && "mx-auto max-w-[640px]",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export { SectionHeading };

import * as React from "react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

interface SectionProps extends React.ComponentProps<"section"> {
  /** Anchor id + base for the aria-labelledby heading id. */
  id: string;
  /** Tints the section with the muted page fill to separate bands. */
  muted?: boolean;
}

/** A vertically-padded page band wrapping its content in a Container. */
function Section({ id, muted, className, children, ...props }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(
        "scroll-mt-20 py-16 sm:py-20 lg:py-24",
        muted && "bg-muted/60",
        className,
      )}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
}

export { Section };

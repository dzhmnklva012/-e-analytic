import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionProps = React.ComponentProps<"section"> & {
  /** Constrain children inside the standard page container. */
  contained?: boolean;
};

function Section({
  className,
  contained = true,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-16 sm:py-20 lg:py-24", className)} {...props}>
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}

export { Section };

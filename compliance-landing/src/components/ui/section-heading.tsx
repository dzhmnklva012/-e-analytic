import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  /** Heading level for correct document outline. */
  as?: "h1" | "h2" | "h3";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        align === "center" && "mx-auto max-w-2xl",
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-flex w-fit items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold tracking-wide text-secondary-foreground uppercase">
          {eyebrow}
        </span>
      )}
      <Tag className="text-2xl font-bold tracking-tight text-balance sm:text-3xl lg:text-4xl">
        {title}
      </Tag>
      {description && (
        <p className="text-base text-pretty text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

import { CircleCheck, CircleAlert } from "lucide-react";
import type { PortraitItem, PortraitSection, Tone } from "@/lib/portrait";

const toneText: Record<Tone, string> = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  success: "text-success",
  warning: "text-warning",
};

function BulletLine({ item }: { item: PortraitItem }) {
  const tone = item.tone ?? "default";
  const Icon = tone === "success" ? CircleCheck : tone === "warning" ? CircleAlert : null;
  return (
    <li className="flex items-start gap-2">
      {Icon ? (
        <Icon className={`mt-0.5 size-4 shrink-0 ${toneText[tone]}`} strokeWidth={2.25} />
      ) : (
        <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" />
      )}
      <span className={tone === "muted" ? "text-muted-foreground italic" : "text-foreground"}>
        {item.value}
      </span>
    </li>
  );
}

function Item({ item }: { item: PortraitItem }) {
  // Labelled group with nested bullets (documents, education, health).
  if (item.children?.length) {
    return (
      <div className="flex flex-col gap-1">
        {item.label && (
          <div className="font-semibold text-foreground">{item.label}</div>
        )}
        <ul className="flex flex-col gap-1 pl-1">
          {item.children.map((child, i) => (
            <BulletLine key={i} item={child} />
          ))}
        </ul>
      </div>
    );
  }

  // Simple key/value row — stacks on mobile, two columns from sm up.
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
      <dt className="shrink-0 text-muted-foreground sm:w-44">{item.label}</dt>
      <dd className={toneText[item.tone ?? "default"]}>{item.value}</dd>
    </div>
  );
}

function Section({ section }: { section: PortraitSection }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
        {section.title}
      </h3>
      <dl className="flex flex-col gap-3">
        {section.items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </dl>
    </section>
  );
}

/** Renders the structured AI portrait inside an assistant message bubble. */
export function PortraitDocument({ sections }: { sections: PortraitSection[] }) {
  return (
    <div className="flex flex-col gap-6">
      {sections.map((section) => (
        <Section key={section.id} section={section} />
      ))}
    </div>
  );
}

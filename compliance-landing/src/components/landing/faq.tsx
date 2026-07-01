import { Accordion } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { faqs } from "@/lib/data";

export function Faq() {
  const items = faqs.map((f, i) => ({
    id: `faq-${i}`,
    question: f.question,
    answer: f.answer,
  }));

  return (
    <Section id="faq">
      <div className="mx-auto flex max-w-3xl flex-col gap-10">
        <SectionHeading
          eyebrow="Вопросы и ответы"
          title="Частые вопросы"
          description="Если не нашли ответ — напишите нам, и мы поможем."
        />
        <Reveal>
          <Accordion items={items} />
        </Reveal>
      </div>
    </Section>
  );
}

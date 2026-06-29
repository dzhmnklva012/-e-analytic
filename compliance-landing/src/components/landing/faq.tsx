"use client";

import { FAQS } from "@/lib/data";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Faq() {
  return (
    <Accordion className="mx-auto max-w-[760px]" defaultValue={[0]}>
      {FAQS.map((item, index) => (
        <AccordionItem key={item.question} value={index}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionPanel>{item.answer}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export { Faq };

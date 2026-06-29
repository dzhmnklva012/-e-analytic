import { Container } from "@/components/ui/container";
import { CtaForm } from "./cta-form";

export function CtaBand() {
  return (
    <Container className="py-16 sm:py-20">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
          Давайте начнём
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl lg:text-4xl">
          Готовы выстроить более защищённую работу с контрагентами?
        </h2>
        <p className="max-w-lg text-base text-pretty text-muted-foreground">
          Оставьте email — покажем платформу на ваших данных и поможем провести первые проверки.
        </p>
        <CtaForm />
      </div>
    </Container>
  );
}

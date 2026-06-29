import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export function CtaBand() {
  return (
    <Container className="py-16 sm:py-20">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-12 text-center sm:px-12 sm:py-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.5),transparent)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
          <h2 className="text-2xl font-bold tracking-tight text-balance text-primary-foreground sm:text-3xl lg:text-4xl">
            Начните проверять контрагентов уже сегодня
          </h2>
          <p className="text-base text-pretty text-primary-foreground/85">
            14 дней бесплатно. Без карты. Подключите команду и проведите первые проверки за минуты.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "h-11 bg-card px-5 text-sm text-primary hover:bg-card/90",
              )}
            >
              Попробовать бесплатно
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#pricing"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 border-primary-foreground/30 bg-transparent px-5 text-sm text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground",
              )}
            >
              Посмотреть тарифы
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}

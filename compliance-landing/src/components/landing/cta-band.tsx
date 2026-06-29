import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

function CtaBand() {
  return (
    <section aria-labelledby="cta-title" className="py-16 sm:py-20">
      <Container>
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12 sm:py-16">
          <h2 id="cta-title" className="max-w-[640px] text-2xl font-bold sm:text-3xl">
            Начните проверять контрагентов уже сегодня
          </h2>
          <p className="max-w-[520px] text-base text-primary-foreground/90">
            Запросите демонстрацию и попробуйте Глобальную проверку на своих
            контрагентах — без установки и обязательств.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              variant="secondary"
              className="bg-card text-primary hover:bg-card/90"
              render={<a href="#contact" />}
            >
              Запросить демо
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              render={<a href="#pricing" />}
            >
              Смотреть тарифы
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { CtaBand };

import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SiteHeader } from "@/components/landing/site-header";
import { OfflineBanner } from "@/components/landing/offline-banner";
import { Hero } from "@/components/landing/hero";
import { TrustStrip } from "@/components/landing/trust-strip";
import { ScreeningDemo } from "@/components/landing/screening-demo";
import { ModuleCard } from "@/components/landing/module-card";
import { StepItem } from "@/components/landing/step-item";
import { FeatureCard } from "@/components/landing/feature-card";
import { PricingCard } from "@/components/landing/pricing-card";
import { Faq } from "@/components/landing/faq";
import { CtaBand } from "@/components/landing/cta-band";
import { SiteFooter } from "@/components/landing/site-footer";
import { modules, steps, benefits, plans } from "@/lib/data";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
      >
        Перейти к содержимому
      </a>

      <SiteHeader />
      <OfflineBanner />

      <main id="main">
        <Hero />

        <TrustStrip />

        {/* Modules */}
        <Section id="modules">
          <div className="flex flex-col gap-12">
            <SectionHeading
              eyebrow="Продукты и решения"
              title="11 модулей комплаенса в одной системе"
              description="Глобальная проверка — флагман на базе ИИ-агента. Вокруг него — связанный набор модулей, превращающих сигналы в управляемые дела и решения."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {modules.map((module) => (
                <ModuleCard key={module.name} module={module} />
              ))}
            </div>
          </div>
        </Section>

        {/* How it works */}
        <Section id="how" className="bg-card/50">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <SectionHeading
              align="left"
              eyebrow="Как это работает"
              title="От сигнала до закрытого дела"
              description="Модули соединяются в единый рабочий процесс: обращение или флаг по контрагенту превращается в расследование, отчёт и аудиторский след."
              className="lg:sticky lg:top-24 lg:self-start"
            />
            <ol className="flex flex-col">
              {steps.map((step, i) => (
                <StepItem key={step.title} step={step} index={i} />
              ))}
            </ol>
          </div>
        </Section>

        {/* Benefits */}
        <Section id="benefits">
          <div className="flex flex-col gap-12">
            <SectionHeading
              eyebrow="Польза для бизнеса"
              title="Меньше риска, больше скорости и контроля"
              description="Быстрые защищённые KYC/AML-решения, единый источник правды и полный аудиторский след."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit) => (
                <FeatureCard key={benefit.title} benefit={benefit} />
              ))}
            </div>
          </div>
        </Section>

        {/* Pricing */}
        <Section id="pricing" className="bg-card/50">
          <div className="flex flex-col gap-12">
            <SectionHeading
              eyebrow="Тарифы"
              title="Прозрачная модель по квоте запросов"
              description="Платите за объём проверок. Начните бесплатно и масштабируйтесь под команду."
            />
            <div className="grid items-start gap-6 lg:grid-cols-3">
              {plans.map((plan) => (
                <PricingCard key={plan.name} plan={plan} />
              ))}
            </div>
          </div>
        </Section>

        <Faq />

        <CtaBand />
      </main>

      <SiteFooter />
    </>
  );
}

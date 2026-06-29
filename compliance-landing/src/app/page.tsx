import { AUDIENCE, BENEFITS, MODULES, PRICING, STEPS } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { Hero } from "@/components/landing/hero";
import { TrustStrip } from "@/components/landing/trust-strip";
import { FeatureCard } from "@/components/landing/feature-card";
import { ModuleCard } from "@/components/landing/module-card";
import { StepItem } from "@/components/landing/step-item";
import { PricingCard } from "@/components/landing/pricing-card";
import { Faq } from "@/components/landing/faq";
import { CtaBand } from "@/components/landing/cta-band";

export default function Home() {
  return (
    <>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Перейти к содержимому
      </a>

      <SiteHeader />

      <main className="flex-1">
        <Hero />

        <TrustStrip />

        {/* Benefits */}
        <Section id="benefits">
          <SectionHeading
            id="benefits"
            eyebrow="Зачем это нужно"
            title="Ключевые преимущества для бизнеса"
            description="Один инструмент закрывает скрининг рисков, ведение дел и доказательную базу комплаенса."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((benefit) => (
              <FeatureCard key={benefit.title} {...benefit} />
            ))}
          </div>
        </Section>

        {/* Modules */}
        <Section id="modules" muted>
          <SectionHeading
            id="modules"
            eyebrow="Функциональные блоки"
            title="Всё необходимое в одной платформе"
            description="12 связанных модулей — от ИИ-проверки и расследований до деклараций и аналитики."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MODULES.map((module) => (
              <ModuleCard key={module.name} {...module} />
            ))}
          </div>
        </Section>

        {/* How it works */}
        <Section id="how">
          <SectionHeading
            id="how"
            eyebrow="Как это работает"
            title="От проверки до отчёта — единый процесс"
            description="Каждый шаг связан с предыдущим: данные не теряются между скринингом, расследованием и аналитикой."
          />
          <ol className="mx-auto mt-12 max-w-[760px]">
            {STEPS.map((step, index) => (
              <StepItem
                key={step.title}
                index={index}
                last={index === STEPS.length - 1}
                {...step}
              />
            ))}
          </ol>
        </Section>

        {/* Audience */}
        <Section id="audience" muted>
          <SectionHeading
            id="audience"
            eyebrow="Для кого"
            title="Кто работает в ADATA Compliance"
            description="От комплаенс-офицеров до руководства — у каждой роли своя часть процесса."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AUDIENCE.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
        </Section>

        {/* Pricing */}
        <Section id="pricing">
          <SectionHeading
            id="pricing"
            eyebrow="Тарифы"
            title="Прозрачные тарифы с суточной квотой"
            description="Платите за объём проверок: от пробного периода до безлимита для крупных организаций."
          />
          <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
            {PRICING.map((tier) => (
              <PricingCard key={tier.name} {...tier} />
            ))}
          </div>
        </Section>

        {/* FAQ */}
        <Section id="faq" muted>
          <SectionHeading id="faq" eyebrow="Вопросы и ответы" title="Частые вопросы" />
          <div className="mt-12">
            <Faq />
          </div>
        </Section>

        <CtaBand />
      </main>

      <SiteFooter />
    </>
  );
}

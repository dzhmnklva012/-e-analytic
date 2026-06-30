import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SiteHeader } from "@/components/landing/site-header";
import { OfflineBanner } from "@/components/landing/offline-banner";
import { Hero } from "@/components/landing/hero";
import { StatsTree } from "@/components/landing/stats-tree";
import { AgentSolves } from "@/components/landing/agent-solves";
import { ModuleCard } from "@/components/landing/module-card";
import { FeaturesDashboard } from "@/components/landing/features-dashboard";
import { Efficiency } from "@/components/landing/efficiency";
import { RadialTools } from "@/components/landing/radial-tools";
import { PricingCard } from "@/components/landing/pricing-card";
import { Faq } from "@/components/landing/faq";
import { CtaBand } from "@/components/landing/cta-band";
import { SiteFooter } from "@/components/landing/site-footer";
import { modules, plans } from "@/lib/data";

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

        <StatsTree />

        <AgentSolves />

        {/* Modules */}
        <Section id="modules" className="bg-card/50">
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

        <FeaturesDashboard />

        <Efficiency />

        <RadialTools />

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

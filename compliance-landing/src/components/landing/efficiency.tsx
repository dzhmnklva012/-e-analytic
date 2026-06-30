import {
  Search,
  Sparkles,
  Check,
  Globe2,
  Smartphone,
  Code2,
  Gauge,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const featureTiles = [
  {
    icon: Search,
    title: "Умный поиск",
    desc: "Сам определяет нужные базы и формирует точный запрос для проверки.",
  },
  {
    icon: Sparkles,
    title: "ИИ-инсайты",
    desc: "Рекомендации на основе данных, а не догадок аналитика.",
  },
];

const platforms = [
  { icon: Globe2, label: "Веб" },
  { icon: Smartphone, label: "Мобильно" },
  { icon: Code2, label: "API" },
];

const benefits = [
  "Ускоряйте работу с ИИ-ассистентом",
  "Настраивайте ИИ под свои политики комплаенса",
  "Будьте впереди с новейшими моделями",
];

const modelChips = ["GPT-4.0", "Gemini 1.5 Pro", "Claude 3.0"];

export function Efficiency() {
  return (
    <Section id="efficiency" className="scroll-mt-20 bg-card/50">
      <div className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Эффективность"
          title="Повышайте эффективность и продуктивность"
          description="Меньше ручной работы, больше уверенных решений — ИИ берёт рутину проверок контрагентов на себя."
        />

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Block 1 — smart understanding */}
          <Reveal className="flex flex-col gap-6 rounded-3xl bg-card p-6 shadow-sm ring-1 ring-foreground/5 sm:p-8">
            <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-secondary-foreground">
              <Gauge className="size-6" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold tracking-tight text-balance text-foreground sm:text-2xl">
                ИИ понимает, что именно нужно проверить
              </h3>
              <p className="text-sm text-pretty text-muted-foreground">
                Сформулируйте запрос на естественном языке — агент сам подберёт базы, санкционные
                списки и источники для оценки контрагента.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {featureTiles.map((t) => (
                <div key={t.title} className="flex flex-col gap-2 rounded-2xl bg-muted/50 p-4">
                  <t.icon className="size-5 text-primary" strokeWidth={2} aria-hidden="true" />
                  <span className="text-sm font-semibold text-foreground">{t.title}</span>
                  <span className="text-xs leading-snug text-muted-foreground">{t.desc}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-border pt-5">
              <span className="text-xs font-medium text-muted-foreground">Работает везде:</span>
              {platforms.map((p) => (
                <span
                  key={p.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground"
                >
                  <p.icon className="size-3.5 text-muted-foreground" aria-hidden="true" />
                  {p.label}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Block 2 — choose your model */}
          <Reveal
            delay={80}
            className="flex flex-col gap-6 rounded-3xl bg-card p-6 shadow-sm ring-1 ring-foreground/5 sm:p-8"
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-secondary-foreground">
              <Sparkles className="size-6" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold tracking-tight text-balance text-foreground sm:text-2xl">
                Выбирайте модель ИИ — GPT-4.0 уже здесь
              </h3>
              <p className="text-sm text-pretty text-muted-foreground">
                Подключайте топовые модели и настраивайте агента под свои требования — без переписывания
                процессов.
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  <span className="text-sm text-foreground">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-border pt-5">
              <span className="text-xs font-medium text-muted-foreground">Доступные модели:</span>
              {modelChips.map((m) => (
                <span
                  key={m}
                  className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground"
                >
                  {m}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

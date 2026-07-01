import { Container } from "@/components/ui/container";
import { Logo } from "./logo";

const footerNav = [
  {
    title: "Продукт",
    links: [
      { label: "Глобальная проверка", href: "#modules" },
      { label: "Расследования", href: "#modules" },
      { label: "Тарифы", href: "#pricing" },
      { label: "Как это работает", href: "#how" },
    ],
  },
  {
    title: "Компания",
    links: [
      { label: "О нас", href: "#" },
      { label: "Контакты", href: "#" },
      { label: "Блог", href: "#" },
      { label: "Вопросы", href: "#faq" },
    ],
  },
  {
    title: "Правовое",
    links: [
      { label: "Условия использования", href: "#" },
      { label: "Политика конфиденциальности", href: "#" },
      { label: "Обработка данных", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer id="footer" className="scroll-mt-20 border-t border-border bg-card">
      <Container className="flex flex-col gap-10 py-12">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-xs text-sm text-pretty text-muted-foreground">
              ИИ-платформа due-diligence и комплаенс-интеллекта: проверка контрагентов,
              санкционный скрининг и управление расследованиями в одной системе.
            </p>
          </div>

          {footerNav.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col gap-3">
              <p className="text-xs font-semibold tracking-wide text-foreground uppercase">
                {col.title}
              </p>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 ADATA Compliance. Все права защищены.</p>
          <p className="max-w-xl text-pretty">
            Результаты ИИ-проверки носят справочный характер и не заменяют решение комплаенс-офицера.
          </p>
        </div>
      </Container>

      {/* ambient glow band */}
      <div className="relative mt-12 h-40 overflow-hidden sm:h-56" aria-hidden="true">
        <div
          className="absolute inset-x-0 bottom-0 h-full"
          style={{ background: "radial-gradient(60% 120% at 50% 100%, color-mix(in oklch, var(--primary) 30%, transparent), transparent 70%)" }}
        />
        <div className="bg-grid absolute inset-0 opacity-20 [mask-image:radial-gradient(60%_100%_at_50%_100%,black,transparent)]" />
      </div>
    </footer>
  );
}

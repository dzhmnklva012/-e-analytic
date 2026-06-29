import { Mail, MapPin } from "lucide-react";

import { FOOTER_COLUMNS } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/landing/logo";

function SiteFooter() {
  return (
    <footer
      id="contact"
      className="scroll-mt-20 border-t border-border bg-card"
      aria-labelledby="footer-title"
    >
      <h2 id="footer-title" className="sr-only">
        Контакты и навигация по сайту
      </h2>
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 flex flex-col gap-4">
            <Logo />
            <p className="max-w-[280px] text-sm text-muted-foreground">
              Платформа комплаенса и проверки контрагентов на базе ИИ. ac.adata.kz
            </p>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-faint" aria-hidden />
                <a
                  href="mailto:info@adata.kz"
                  className="rounded transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
                >
                  info@adata.kz
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-faint" aria-hidden />
                Алматы, Казахстан
              </li>
            </ul>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-faint">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="rounded text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 ADATA Compliance. Все права защищены.</p>
          <p className="max-w-[520px] sm:text-right">
            Результаты ИИ носят справочный характер и подлежат проверке
            комплаенс-офицером. Сервис не заменяет юридическую консультацию.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export { SiteFooter };

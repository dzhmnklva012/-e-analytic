import { Bell, ChevronDown, Settings, Sun } from "lucide-react";
import { Fragment } from "react";
import { headerLinks } from "@/lib/data";

export function Header() {
  return (
    <header className="flex h-[68px] shrink-0 items-center justify-between gap-4 border-b border-line bg-card px-6">
      {/* Marketing nav */}
      <nav className="flex items-center gap-4">
        {headerLinks.map((link, i) => (
          <Fragment key={link}>
            {i > 0 && <span className="h-3.5 w-px bg-line" />}
            <a
              href="#"
              className={`text-xs font-semibold uppercase tracking-wide transition-colors hover:text-ink ${
                i === 0 ? "text-ink" : "text-ink-secondary"
              }`}
            >
              {link}
            </a>
          </Fragment>
        ))}
      </nav>

      {/* Utilities */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Переключить тему"
          className="flex h-7 w-12 items-center rounded-full bg-bg p-1"
        >
          <span className="grid size-5 place-items-center rounded-full bg-yellow text-white">
            <Sun className="size-3.5" strokeWidth={2.5} />
          </span>
        </button>

        <button
          type="button"
          className="rounded-lg px-2.5 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-bg"
        >
          Рус
        </button>

        <button
          type="button"
          aria-label="Настройки"
          className="grid size-9 place-items-center rounded-lg text-ink-secondary transition-colors hover:bg-bg"
        >
          <Settings className="size-5" />
        </button>

        <button
          type="button"
          aria-label="Уведомления"
          className="grid size-9 place-items-center rounded-lg text-ink-secondary transition-colors hover:bg-bg"
        >
          <Bell className="size-5" />
        </button>

        <span className="mx-1 h-6 w-px bg-line" />

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg px-1.5 py-1 transition-colors hover:bg-bg"
        >
          <span className="text-sm font-semibold text-ink">mail@gmail.com</span>
          <ChevronDown className="size-4 text-ink-muted" />
        </button>
      </div>
    </header>
  );
}

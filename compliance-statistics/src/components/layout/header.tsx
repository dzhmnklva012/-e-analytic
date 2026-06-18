import { Bell, ChevronDown, Settings, Sun } from "lucide-react";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { headerLinks } from "@/lib/data";

export function Header() {
  return (
    <header className="flex h-[68px] shrink-0 items-center justify-between gap-4 border-b border-border bg-card px-6">
      {/* Marketing nav */}
      <nav className="flex items-center gap-4">
        {headerLinks.map((link, i) => (
          <Fragment key={link}>
            {i > 0 && <span className="h-4 w-px bg-border" />}
            <a
              href="#"
              className={`text-xs font-semibold uppercase tracking-wide transition-colors hover:text-foreground ${
                i === 0 ? "text-foreground" : "text-muted-foreground"
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
          className="flex h-8 w-12 items-center rounded-full bg-muted p-1"
        >
          <span className="grid size-6 place-items-center rounded-full bg-chart-yellow text-white">
            <Sun className="size-4" strokeWidth={2.5} />
          </span>
        </button>

        <Button variant="ghost" className="font-semibold">
          Рус
        </Button>

        <Button variant="ghost" size="icon" aria-label="Настройки">
          <Settings className="size-5" />
        </Button>

        <Button variant="ghost" size="icon" aria-label="Уведомления">
          <Bell className="size-5" />
        </Button>

        <Separator orientation="vertical" className="h-6" />

        <Button variant="ghost" className="gap-2 font-semibold">
          mail@gmail.com
          <ChevronDown className="size-4 text-muted-foreground" />
        </Button>
      </div>
    </header>
  );
}

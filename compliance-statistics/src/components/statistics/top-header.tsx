"use client";

import { useState } from "react";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Settings,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BrandLogo } from "@/components/statistics/brand-logo";
import { ThemeToggle } from "@/components/statistics/theme-toggle";
import { cn } from "@/lib/utils";

const PRODUCTS = ["E-Analytic", "AntiCor", "Compliance", "IONYX"];
const LANGUAGES = [
  { value: "ru", label: "Рус" },
  { value: "kk", label: "Қаз" },
  { value: "en", label: "Eng" },
];
const NOTIFICATIONS = [
  { id: 1, text: "Новое обращение на горячую линию", time: "5 мин назад" },
  { id: 2, text: "Отчёт за май сформирован", time: "1 ч назад" },
  { id: 3, text: "3 файла ожидают подписания", time: "вчера" },
];

const portalLinkClass =
  "rounded-md px-1 text-sm font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50";

function ProductsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="sm" className="gap-1 px-2 text-muted-foreground" />
        }
      >
        Продукты и решения
        <ChevronDown className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuLabel>Продукты ADATA</DropdownMenuLabel>
        {PRODUCTS.map((p) => (
          <DropdownMenuItem key={p}>{p}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function LanguageMenu() {
  const [lang, setLang] = useState("ru");
  const current = LANGUAGES.find((l) => l.value === lang)?.label ?? "Рус";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="sm" className="gap-1 px-2" />}
        aria-label="Сменить язык"
      >
        {current}
        <ChevronDown className="size-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuRadioGroup value={lang} onValueChange={setLang}>
          {LANGUAGES.map((l) => (
            <DropdownMenuRadioItem key={l.value} value={l.value}>
              {l.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NotificationsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon" className="relative" />}
        aria-label={`Уведомления: ${NOTIFICATIONS.length} новых`}
      >
        <Bell className="size-4" />
        <span
          className="absolute right-1.5 top-1.5 size-2 rounded-full bg-danger ring-2 ring-card"
          aria-hidden
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel>Уведомления</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {NOTIFICATIONS.map((n) => (
          <DropdownMenuItem key={n.id} className="flex-col items-start gap-0.5 py-2">
            <span className="text-sm text-foreground">{n.text}</span>
            <span className="text-xs text-muted-foreground">{n.time}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserMenu({ email }: { email: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-full bg-success text-xs font-semibold text-success-foreground outline-none transition-[box-shadow] focus-visible:ring-[3px] focus-visible:ring-ring/50"
          />
        }
        aria-label="Меню профиля"
      >
        АС
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <div className="px-1.5 py-1.5">
          <p className="text-sm font-medium text-foreground">Асылбек Сариев</p>
          <p className="truncate text-xs text-muted-foreground">{email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="size-4" />
          Профиль
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="size-4" />
          Настройки
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut className="size-4" />
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export interface TopHeaderProps {
  userEmail: string;
  onOpenMobileNav: () => void;
}

/** Global ADATA portal bar: portal nav (desktop) + theme/lang/settings/bell/user. */
export function TopHeader({ userEmail, onOpenMobileNav }: TopHeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-2 border-b border-border bg-card px-4 sm:px-6">
      {/* Left: mobile menu + logo, or desktop portal nav */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Открыть меню"
          onClick={onOpenMobileNav}
        >
          <Menu className="size-4" />
        </Button>
        <div className="lg:hidden">
          <BrandLogo />
        </div>
        <nav
          aria-label="Навигация портала ADATA"
          className="hidden items-center gap-1 lg:flex"
        >
          <ProductsMenu />
          <span className="h-4 w-px bg-border" aria-hidden />
          <a href="#" className={cn(portalLinkClass, "px-2")}>
            Контакты
          </a>
          <a href="#" className={cn(portalLinkClass, "px-2")}>
            Тарифы
          </a>
        </nav>
      </div>

      {/* Right: controls */}
      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        <ThemeToggle />
        <LanguageMenu />
        <Button variant="ghost" size="icon" aria-label="Настройки" className="hidden sm:inline-flex">
          <Settings className="size-4" />
        </Button>
        <NotificationsMenu />
        <UserMenu email={userEmail} />
      </div>
    </header>
  );
}

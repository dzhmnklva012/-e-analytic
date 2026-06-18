"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bot,
  FolderOpen,
  Gift,
  ListChecks,
  Menu,
  PhoneCall,
  Scale,
  ScrollText,
  ShieldBan,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface NavModule {
  key: string;
  label: string;
  icon: LucideIcon;
}

const MODULES: NavModule[] = [
  { key: "assistant", label: "Цифровой ассистент", icon: Bot },
  { key: "audit", label: "Журнал аудита", icon: ScrollText },
  { key: "tasks", label: "Задачи", icon: ListChecks },
  { key: "hotline", label: "Горячая линия", icon: PhoneCall },
  { key: "sanctions", label: "Санкции", icon: ShieldBan },
  { key: "dossier", label: "Досье", icon: FolderOpen },
  { key: "sb", label: "Проверка СБ", icon: ShieldCheck },
  { key: "gifts", label: "Декларация подарков", icon: Gift },
  { key: "conflict", label: "Конфликт интересов", icon: Scale },
  { key: "statistics", label: "Статистика", icon: BarChart3 },
];

const ACTIVE_KEY = "statistics";

function Logo({ onBrand = false }: { onBrand?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-md text-base font-bold",
          onBrand ? "bg-white text-brand" : "bg-primary text-primary-foreground",
        )}
      >
        A
      </span>
      <span
        className={cn(
          "text-base font-bold tracking-wide",
          onBrand ? "text-brand-foreground" : "text-foreground",
        )}
      >
        DATA
        <span className={cn("ml-2 text-xs font-medium", onBrand ? "text-white/55" : "text-muted-foreground")}>
          Compliance
        </span>
      </span>
    </div>
  );
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="space-y-1" aria-label="Модули системы Compliance">
      {MODULES.map((m) => {
        const active = m.key === ACTIVE_KEY;
        const Icon = m.icon;
        return (
          <a
            key={m.key}
            href="#"
            aria-current={active ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.();
            }}
            className={cn(
              "flex items-center gap-3 rounded-md border-l-2 px-3 py-2 text-sm transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
              active
                ? "border-primary bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
                : "border-transparent text-muted-foreground hover:bg-accent/60 hover:text-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" aria-hidden />
            <span className="truncate">{m.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

function UserChip({ email }: { email: string }) {
  return (
    <div className="flex items-center gap-2.5 border-t px-4 py-4">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-primary">
        АС
      </span>
      <div className="min-w-0 leading-tight">
        <p className="truncate text-xs font-medium text-foreground">Асылбек Сариев</p>
        <p className="truncate text-xs text-muted-foreground">{email}</p>
      </div>
    </div>
  );
}

export interface AppShellProps {
  /** Sticky notice rendered full-bleed under the topbar (e.g. offline). */
  notice?: React.ReactNode;
  /** Current user email shown in the top bar / user chip. */
  userEmail?: string;
  children: React.ReactNode;
}

/** Responsive Compliance frame: navy top bar, module sidebar, Sheet on mobile. */
export function AppShell({ notice, userEmail = "user@adata.kz", children }: AppShellProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Перейти к содержимому
      </a>

      {/* Top bar */}
      <header className="sticky top-0 z-40 flex h-14 items-center gap-3 bg-brand px-4 text-brand-foreground sm:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="text-brand-foreground hover:bg-white/10 hover:text-brand-foreground lg:hidden"
          aria-label="Открыть меню"
          onClick={() => setOpen(true)}
        >
          <Menu className="size-4" />
        </Button>
        <Logo onBrand />
        <div className="ml-auto flex items-center gap-2">
          <span className="hidden rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium sm:inline-block">
            RU
          </span>
          <span className="hidden max-w-[200px] truncate text-xs text-white/70 md:inline-block">
            {userEmail}
          </span>
          <span className="flex size-8 items-center justify-center rounded-full bg-white/15 text-xs font-semibold">
            АС
          </span>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* Desktop sidebar */}
        <aside className="hidden w-60 shrink-0 flex-col border-r bg-sidebar lg:flex">
          <div className="px-4 pb-2 pt-4">
            <p className="px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground/70">
              Модули
            </p>
          </div>
          <ScrollArea className="flex-1 px-3 pb-4">
            <NavList />
          </ScrollArea>
          <UserChip email={userEmail} />
        </aside>

        {/* Mobile nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="w-72 p-0">
            <SheetHeader className="border-b">
              <SheetTitle className="text-left">
                <Logo />
              </SheetTitle>
              <SheetDescription className="sr-only">
                Навигация по модулям системы Compliance
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-200px)] px-3 py-2">
              <NavList onNavigate={() => setOpen(false)} />
            </ScrollArea>
            <UserChip email={userEmail} />
          </SheetContent>
        </Sheet>

        <div className="flex min-w-0 flex-1 flex-col bg-background">
          {notice}
          <main id="main-content" className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

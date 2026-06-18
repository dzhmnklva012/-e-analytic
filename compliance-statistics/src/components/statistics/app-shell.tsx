"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bot,
  Gift,
  ListChecks,
  Menu,
  PhoneCall,
  Scale,
  ScrollText,
  ShieldBan,
  ShieldCheck,
  FolderOpen,
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

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
        A
      </span>
      <div className="min-w-0 leading-tight">
        <p className="truncate text-sm font-semibold text-foreground">ADATA</p>
        <p className="truncate text-xs text-muted-foreground">Compliance</p>
      </div>
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
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
              active
                ? "bg-accent font-medium text-accent-foreground"
                : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
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

function UserCard() {
  return (
    <div className="flex items-center gap-3 border-t px-4 py-4">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground">
        АС
      </span>
      <div className="min-w-0 leading-tight">
        <p className="truncate text-xs font-medium text-foreground">
          Асылбек Сариев
        </p>
        <p className="truncate text-xs text-muted-foreground">Комплаенс-офицер</p>
      </div>
    </div>
  );
}

export interface AppShellProps {
  /** Sticky notice rendered full-bleed under the topbar (e.g. offline). */
  notice?: React.ReactNode;
  children: React.ReactNode;
}

/** Responsive Compliance app frame: sidebar on desktop, Sheet nav on mobile. */
export function AppShell({ notice, children }: AppShellProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-1 bg-muted/30">
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Перейти к содержимому
      </a>

      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r bg-sidebar lg:flex">
        <div className="border-b px-4 py-4">
          <Brand />
        </div>
        <ScrollArea className="flex-1 px-3 py-4">
          <NavList />
        </ScrollArea>
        <UserCard />
      </aside>

      {/* Mobile nav */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetHeader className="border-b">
            <SheetTitle className="text-left">
              <Brand />
            </SheetTitle>
            <SheetDescription className="sr-only">
              Навигация по модулям системы Compliance
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-180px)] px-3 py-2">
            <NavList onNavigate={() => setOpen(false)} />
          </ScrollArea>
          <UserCard />
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur sm:px-6">
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            aria-label="Открыть меню"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-4" />
          </Button>
          <nav aria-label="Хлебные крошки" className="min-w-0">
            <ol className="flex items-center gap-2 text-xs text-muted-foreground">
              <li>Compliance</li>
              <li aria-hidden>/</li>
              <li className="font-medium text-foreground">Статистика</li>
            </ol>
          </nav>
        </header>

        {notice}

        <main id="main-content" className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}

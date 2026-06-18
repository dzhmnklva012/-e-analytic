"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bot,
  ChevronDown,
  ClipboardCheck,
  FolderOpen,
  Gift,
  GraduationCap,
  ListChecks,
  Network,
  PhoneCall,
  Scale,
  ShieldBan,
  ShieldCheck,
} from "lucide-react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface NavChild {
  key: string;
  label: string;
}

interface NavModule {
  key: string;
  label: string;
  icon: LucideIcon;
  children?: NavChild[];
}

/** Module list + order per the ADATA Compliance Figma sidebar. */
export const MODULES: NavModule[] = [
  { key: "statistics", label: "Статистика", icon: BarChart3 },
  { key: "assistant", label: "Цифровой ассистент", icon: Bot },
  { key: "registry", label: "Реестр проверок", icon: ClipboardCheck },
  { key: "tasks", label: "Задачи", icon: ListChecks },
  { key: "hotline", label: "Горячая линия", icon: PhoneCall },
  { key: "sanctions", label: "Санкции", icon: ShieldBan },
  {
    key: "dossier",
    label: "Досье",
    icon: FolderOpen,
    children: [
      { key: "dossier-all", label: "Все досье" },
      { key: "dossier-companies", label: "Компании" },
      { key: "dossier-people", label: "Физические лица" },
    ],
  },
  { key: "sb", label: "Проверка СБ", icon: ShieldCheck },
  { key: "gifts", label: "Декларация подарков", icon: Gift },
  { key: "conflict", label: "Конфликт интересов", icon: Scale },
  { key: "training", label: "Обучение", icon: GraduationCap },
  { key: "structure", label: "Структура предприятия", icon: Network },
];

export const ACTIVE_KEY = "statistics";

const itemBase =
  "group/nav relative flex h-11 items-center rounded-lg text-sm outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50";

function itemTone(active: boolean) {
  return active
    ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
    : "bg-sidebar-accent/35 text-sidebar-foreground/80 hover:bg-sidebar-accent/70 hover:text-sidebar-foreground";
}

function NavIcon({ icon: Icon, active }: { icon: LucideIcon; active: boolean }) {
  return (
    <Icon
      className={cn(
        "size-[18px] shrink-0 transition-colors",
        active ? "text-primary" : "text-primary/70 group-hover/nav:text-primary",
      )}
      aria-hidden
    />
  );
}

/** A leaf navigation link. Shows a right-side tooltip when the rail is collapsed. */
function NavLink({
  module,
  active,
  collapsed,
  onNavigate,
}: {
  module: NavModule;
  active: boolean;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const link = (
    <a
      href="#"
      aria-current={active ? "page" : undefined}
      onClick={(e) => {
        e.preventDefault();
        onNavigate?.();
      }}
      className={cn(
        itemBase,
        itemTone(active),
        collapsed ? "w-11 justify-center px-0" : "gap-3 px-3",
        active && "ring-1 ring-inset ring-primary/15",
      )}
    >
      <NavIcon icon={module.icon} active={active} />
      {!collapsed && <span className="truncate">{module.label}</span>}
    </a>
  );

  if (!collapsed) return link;

  return (
    <Tooltip>
      <TooltipTrigger render={link} />
      <TooltipContent side="right">{module.label}</TooltipContent>
    </Tooltip>
  );
}

/** A parent item with an expandable sub-list (e.g. Досье). */
function NavGroup({
  module,
  collapsed,
  onNavigate,
}: {
  module: NavModule;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);

  // Collapsed rail can't host an inline sub-list — fall back to a tooltip link.
  if (collapsed) {
    return <NavLink module={module} active={false} collapsed onNavigate={onNavigate} />;
  }

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(itemBase, itemTone(false), "w-full gap-3 px-3")}
      >
        <NavIcon icon={module.icon} active={false} />
        <span className="flex-1 truncate text-left">{module.label}</span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>
      {open && (
        <ul className="mt-1 space-y-1 border-l border-sidebar-border pl-3 ml-5">
          {module.children?.map((child) => (
            <li key={child.key}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.();
                }}
                className="flex h-9 items-center rounded-md px-3 text-sm text-muted-foreground outline-none transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                <span className="truncate">{child.label}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export interface SidebarNavProps {
  collapsed?: boolean;
  onNavigate?: () => void;
}

/** Module navigation, shared by the desktop rail and the mobile sheet. */
export function SidebarNav({ collapsed = false, onNavigate }: SidebarNavProps) {
  return (
    <nav aria-label="Модули системы Compliance" className="space-y-1">
      {MODULES.map((m) => {
        const active = m.key === ACTIVE_KEY;
        return m.children ? (
          <NavGroup key={m.key} module={m} collapsed={collapsed} onNavigate={onNavigate} />
        ) : (
          <NavLink
            key={m.key}
            module={m}
            active={active}
            collapsed={collapsed}
            onNavigate={onNavigate}
          />
        );
      })}
    </nav>
  );
}

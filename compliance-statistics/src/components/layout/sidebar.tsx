import { ChevronRight, ChevronsLeft } from "lucide-react";
import { navItems } from "@/lib/data";

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={`flex h-full shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 ${
        collapsed ? "w-[76px]" : "w-[280px]"
      }`}
    >
      {/* Logo + collapse */}
      <div className="flex h-[68px] items-center justify-between gap-2 border-b border-sidebar-border px-5">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#111827] text-lg font-extrabold leading-none text-white">
            A
          </span>
          {!collapsed && (
            <span className="text-xl font-extrabold tracking-tight">DATA</span>
          )}
        </div>
        <button
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? "Развернуть меню" : "Свернуть меню"}
          className={`grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted ${
            collapsed ? "rotate-180" : ""
          }`}
        >
          <ChevronsLeft className="size-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-4">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <a
                  href="#"
                  aria-current={item.active ? "page" : undefined}
                  title={collapsed ? item.label : undefined}
                  className={`flex h-10 items-center gap-3 rounded-lg px-3 text-sm transition-colors ${
                    item.active
                      ? "bg-sidebar-accent font-semibold text-sidebar-primary"
                      : "font-medium text-sidebar-foreground hover:bg-muted"
                  } ${collapsed ? "justify-center" : ""}`}
                >
                  <Icon
                    className={`size-5 shrink-0 ${
                      item.active ? "text-sidebar-primary" : "text-faint"
                    }`}
                  />
                  {!collapsed && (
                    <>
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.expandable && (
                        <ChevronRight className="size-4 text-faint" />
                      )}
                    </>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

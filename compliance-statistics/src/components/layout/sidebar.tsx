import { ChevronRight, ChevronsLeft } from "lucide-react";
import { navItems } from "@/lib/data";

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={`flex h-full shrink-0 flex-col border-r border-line bg-card transition-[width] duration-200 ${
        collapsed ? "w-[76px]" : "w-[280px]"
      }`}
    >
      {/* Logo + collapse */}
      <div className="flex h-[68px] items-center justify-between gap-2 border-b border-line px-5">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#111827] text-lg font-extrabold leading-none text-white">
            A
          </span>
          {!collapsed && (
            <span className="text-xl font-extrabold tracking-tight text-ink">
              DATA
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? "Развернуть меню" : "Свернуть меню"}
          className={`grid size-7 shrink-0 place-items-center rounded-md text-ink-muted transition-colors hover:bg-bg ${
            collapsed ? "rotate-180" : ""
          }`}
        >
          <ChevronsLeft className="size-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <a
                  href="#"
                  aria-current={item.active ? "page" : undefined}
                  title={collapsed ? item.label : undefined}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    item.active
                      ? "bg-lightblue font-semibold text-blue"
                      : "font-medium text-ink hover:bg-bg"
                  } ${collapsed ? "justify-center" : ""}`}
                >
                  <Icon
                    className={`size-5 shrink-0 ${
                      item.active ? "text-blue" : "text-ink-muted"
                    }`}
                  />
                  {!collapsed && (
                    <>
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.expandable && (
                        <ChevronRight className="size-4 text-ink-muted" />
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

"use client";

import { useEffect, useState } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { BrandLogo } from "@/components/statistics/brand-logo";
import { SidebarNav } from "@/components/statistics/sidebar-nav";
import { TopHeader } from "@/components/statistics/top-header";
import { cn } from "@/lib/utils";

const COLLAPSE_KEY = "adata-sidebar-collapsed";

export interface AppShellProps {
  /** Sticky notice rendered full-bleed under the topbar (e.g. offline). */
  notice?: React.ReactNode;
  /** Current user email shown in the profile menu. */
  userEmail?: string;
  children: React.ReactNode;
}

/**
 * Responsive Compliance frame matching the Figma: white global portal header,
 * white collapsible module rail (icon-only when collapsed), Sheet on mobile.
 */
export function AppShell({ notice, userEmail = "user@adata.kz", children }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Restore the persisted rail state after mount (avoids SSR mismatch).
  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem(COLLAPSE_KEY) === "1");
    } catch {
      /* storage unavailable */
    }
  }, []);

  const toggleCollapsed = () =>
    setCollapsed((v) => {
      const next = !v;
      try {
        localStorage.setItem(COLLAPSE_KEY, next ? "1" : "0");
      } catch {
        /* storage unavailable */
      }
      return next;
    });

  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Перейти к содержимому
      </a>

      <TopHeader userEmail={userEmail} onOpenMobileNav={() => setMobileOpen(true)} />

      <div className="flex min-h-0 flex-1">
        {/* Desktop rail */}
        <aside
          className={cn(
            "sticky top-16 hidden h-[calc(100dvh-4rem)] shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200 ease-out lg:flex",
            collapsed ? "w-[72px]" : "w-64",
          )}
        >
          <div
            className={cn(
              "flex h-16 items-center border-b border-sidebar-border",
              collapsed ? "justify-center px-2" : "justify-between px-4",
            )}
          >
            {!collapsed && <BrandLogo />}
            {collapsed ? (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Развернуть меню"
                      onClick={toggleCollapsed}
                    />
                  }
                >
                  <ChevronsRight className="size-4" />
                </TooltipTrigger>
                <TooltipContent side="right">Развернуть меню</TooltipContent>
              </Tooltip>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                aria-label="Свернуть меню"
                onClick={toggleCollapsed}
              >
                <ChevronsLeft className="size-4" />
              </Button>
            )}
          </div>
          <ScrollArea className="min-h-0 flex-1 px-3 py-4">
            <SidebarNav collapsed={collapsed} />
          </ScrollArea>
        </aside>

        {/* Mobile rail */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="w-72 gap-0 p-0">
            <SheetHeader className="border-b border-sidebar-border">
              <SheetTitle className="text-left">
                <BrandLogo />
              </SheetTitle>
              <SheetDescription className="sr-only">
                Навигация по модулям системы Compliance
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="min-h-0 flex-1 px-3 py-3">
              <SidebarNav onNavigate={() => setMobileOpen(false)} />
            </ScrollArea>
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

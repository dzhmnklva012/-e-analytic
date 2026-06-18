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
  /** Sticky notice rendered in the content column (e.g. offline). */
  notice?: React.ReactNode;
  /** Current user email shown in the profile menu. */
  userEmail?: string;
  children: React.ReactNode;
}

/**
 * Responsive Compliance frame matching the reference: floating rounded panels
 * on a light-gray page — a full-height rail (logo cell on top) on the left and
 * a header card above the content on the right. Sheet nav on mobile.
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
    <div className="flex min-h-screen gap-3 bg-background p-3">
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Перейти к содержимому
      </a>

      {/* Desktop rail — full-height card with the logo cell on top */}
      <aside
        className={cn(
          "sticky top-3 hidden h-[calc(100dvh-1.5rem)] shrink-0 flex-col overflow-hidden rounded-xl border border-sidebar-border bg-sidebar transition-[width] duration-200 ease-out lg:flex",
          collapsed ? "w-[72px]" : "w-64",
        )}
      >
        <div
          className={cn(
            "flex h-[72px] shrink-0 items-center border-b border-sidebar-border",
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

      {/* Content column — header card on top, then the page */}
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <TopHeader userEmail={userEmail} onOpenMobileNav={() => setMobileOpen(true)} />
        {notice}
        <main id="main-content" className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

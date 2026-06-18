"use client";

import { useState } from "react";
import { ArrowUpDown, Download, Filter, Users } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/statistics/empty-state";
import { formatNumber, percent } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CompanyRow, CompanyStatus } from "@/lib/types";

const STATUS_META: Record<CompanyStatus, { label: string; dot: string; text: string }> = {
  active: { label: "Активна", dot: "bg-success", text: "text-success" },
  review: { label: "На проверке", dot: "bg-warning", text: "text-warning" },
  archived: { label: "В архиве", dot: "bg-muted-foreground", text: "text-muted-foreground" },
};

function StatusBadge({ status }: { status: CompanyStatus }) {
  const m = STATUS_META[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium", m.text)}>
      <span className={cn("size-1.5 rounded-full", m.dot)} aria-hidden />
      {m.label}
    </span>
  );
}

function ConflictBadge({ found }: { found: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        found ? "bg-danger/10 text-danger" : "bg-success/10 text-success",
      )}
    >
      {found ? "Выявлен" : "Не выявлен"}
    </span>
  );
}

export interface CompaniesTableProps {
  rows: CompanyRow[];
  className?: string;
}

/**
 * Companies (Users) records table — selectable rows, signed-ratio, status and
 * conflict badges. Header carries sort / filter / export affordances.
 */
export function CompaniesTable({ rows, className }: CompaniesTableProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const allSelected = rows.length > 0 && selected.size === rows.length;

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(rows.map((r) => r.id)));
  }
  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const checkbox =
    "size-4 shrink-0 cursor-pointer rounded border-input accent-primary focus-visible:ring-[3px] focus-visible:ring-ring/50";

  return (
    <section
      aria-labelledby="companies-title"
      className={cn(
        "rounded-xl bg-card text-card-foreground ring-1 ring-foreground/10",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-3 px-5 py-4">
        <span
          className="flex size-9 shrink-0 items-center justify-center rounded-md bg-accent text-primary"
          aria-hidden
        >
          <Users className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 id="companies-title" className="font-heading text-base font-semibold text-foreground">
            Компании
          </h2>
          <p className="text-xs text-muted-foreground">
            Пользователи системы · {formatNumber(rows.length)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ArrowUpDown className="size-3.5" />
            Сортировка
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="size-3.5" />
            Фильтр
          </Button>
          <Button variant="outline" size="sm">
            <Download className="size-3.5" />
            Экспорт
          </Button>
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="border-t">
          <EmptyState compact description="Компании в выбранной области отсутствуют." />
        </div>
      ) : (
        <div className="overflow-x-auto border-t">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <input
                    type="checkbox"
                    className={checkbox}
                    checked={allSelected}
                    onChange={toggleAll}
                    aria-label="Выбрать все компании"
                  />
                </TableHead>
                <TableHead>Компания</TableHead>
                <TableHead>БИН</TableHead>
                <TableHead className="text-right">Проверки</TableHead>
                <TableHead className="text-right">Задачи</TableHead>
                <TableHead className="text-right">Обращения</TableHead>
                <TableHead>Конфликт интересов</TableHead>
                <TableHead>Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id} data-state={selected.has(r.id) ? "selected" : undefined}>
                  <TableCell>
                    <input
                      type="checkbox"
                      className={checkbox}
                      checked={selected.has(r.id)}
                      onChange={() => toggle(r.id)}
                      aria-label={`Выбрать ${r.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span
                        className="flex size-8 shrink-0 items-center justify-center rounded-md bg-accent text-xs font-semibold text-primary"
                        aria-hidden
                      >
                        {r.name.replace(/^ADATA\s*/, "").charAt(0) || "A"}
                      </span>
                      <span className="font-medium text-foreground">{r.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="tabular-nums text-muted-foreground">{r.bin}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    <span className="font-medium text-foreground">
                      {formatNumber(r.checksSigned)}
                    </span>
                    <span className="text-muted-foreground">
                      {" "}
                      / {formatNumber(r.checksTotal)}
                    </span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      {percent(r.checksSigned, r.checksTotal)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium tabular-nums text-foreground">
                    {formatNumber(r.tasks)}
                  </TableCell>
                  <TableCell className="text-right font-medium tabular-nums text-foreground">
                    {formatNumber(r.hotline)}
                  </TableCell>
                  <TableCell>
                    <ConflictBadge found={r.conflictFound} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={r.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </section>
  );
}

import { Check, AlertTriangle, Search, MapPin, FileText } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Dossier, SourceHit } from "@/lib/screening";
import { RiskBadge } from "./risk-badge";

const statusIcon: Record<SourceHit["status"], typeof Check> = {
  clear: Check,
  match: AlertTriangle,
  review: Search,
};

const statusStyle: Record<SourceHit["status"], string> = {
  clear: "text-risk-low bg-risk-low/10",
  match: "text-risk-high bg-risk-high/10",
  review: "text-risk-medium bg-risk-medium/10",
};

export function DossierResultCard({ dossier }: { dossier: Dossier }) {
  return (
    <div className="flex flex-col gap-5">
      {/* header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-foreground">{dossier.company}</h3>
          <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="size-3.5" aria-hidden="true" />
            {dossier.country} · проверено {dossier.checkedAt}
          </p>
        </div>
        <RiskBadge level={dossier.riskLevel} />
      </div>

      {/* score bar */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-muted-foreground">Оценка риска</span>
          <span className="font-bold text-foreground">{dossier.riskScore}/100</span>
        </div>
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={dossier.riskScore}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Оценка риска"
        >
          <div
            className={cn(
              "h-full rounded-full transition-all",
              dossier.riskLevel === "low" && "bg-risk-low",
              dossier.riskLevel === "medium" && "bg-risk-medium",
              dossier.riskLevel === "high" && "bg-risk-high",
            )}
            style={{ width: `${dossier.riskScore}%` }}
          />
        </div>
      </div>

      <p className="text-sm text-pretty text-foreground">{dossier.summary}</p>

      {/* flags */}
      <div className="flex flex-wrap gap-2">
        {dossier.flags.map((flag) => (
          <span
            key={flag}
            className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
          >
            {flag}
          </span>
        ))}
      </div>

      {/* sources */}
      <ul className="flex flex-col gap-2">
        {dossier.sources.map((hit) => {
          const Icon = statusIcon[hit.status];
          return (
            <li
              key={hit.source}
              className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5"
            >
              <span className={cn("grid size-7 shrink-0 place-items-center rounded-md", statusStyle[hit.status])}>
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-medium text-foreground">{hit.source}</span>
                <span className="truncate text-xs text-muted-foreground">{hit.detail}</span>
              </span>
            </li>
          );
        })}
      </ul>

      <a href="#pricing" className={cn(buttonVariants({ size: "lg" }), "w-full")}>
        <FileText className="size-4" aria-hidden="true" />
        Открыть полное досье
      </a>
    </div>
  );
}

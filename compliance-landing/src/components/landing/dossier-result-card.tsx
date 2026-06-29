import {
  Building2,
  CalendarDays,
  FileSearch,
  Flag,
  SearchX,
} from "lucide-react";

import type { ScreeningResult } from "@/lib/screening";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RiskBadge } from "@/components/landing/risk-badge";

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Building2;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 size-4 shrink-0 text-faint" aria-hidden />
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-sm font-semibold text-foreground">{value}</span>
      </div>
    </div>
  );
}

function DossierResultCard({ result }: { result: ScreeningResult }) {
  if (!result.found) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-8 text-center">
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <SearchX className="size-6" aria-hidden />
        </span>
        <h3 className="text-base font-semibold text-foreground">
          Совпадений не найдено
        </h3>
        <p className="max-w-[360px] text-sm text-muted-foreground">
          По запросу «{result.company}» нет данных в международных и санкционных
          списках. Уточните название или ИИН/БИН компании.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6 text-left">
      {/* heading */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-bold text-foreground">{result.company}</h3>
          <p className="text-xs text-muted-foreground">
            Риск-скоринг: {result.riskScore}/100
          </p>
        </div>
        <RiskBadge level={result.riskLevel} />
      </div>

      {/* meta grid */}
      <div className="grid grid-cols-2 gap-4">
        <MetaItem icon={Building2} label="Юрисдикция" value={result.jurisdiction} />
        <MetaItem icon={CalendarDays} label="Год регистрации" value={result.registered} />
      </div>

      {/* AI summary */}
      <p className="text-sm leading-relaxed text-foreground">{result.summary}</p>

      {/* flags */}
      {result.flags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {result.flags.map((flag) => (
            <Badge key={flag} variant="outline" className="gap-1">
              <Flag className="size-3" aria-hidden />
              {flag}
            </Badge>
          ))}
        </div>
      )}

      {/* sanction hits */}
      {result.sanctionHits.length > 0 && (
        <div className="flex flex-col gap-2">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-faint">
            Совпадения в списках
          </h4>
          <ul className="flex flex-col gap-2">
            {result.sanctionHits.map((hit) => (
              <li
                key={`${hit.list}-${hit.matchedName}`}
                className="flex flex-col gap-0.5 rounded-lg bg-destructive/8 px-3 py-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-destructive">
                    {hit.list}
                  </span>
                  <span className="text-xs text-muted-foreground">{hit.date}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {hit.program} · {hit.matchedName}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Separator />

      {/* sources */}
      <div className="flex flex-col gap-2">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-faint">
          Проверено источников: {result.sourcesChecked.length}
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {result.sourcesChecked.map((source) => (
            <span
              key={source}
              className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
            >
              {source}
            </span>
          ))}
        </div>
      </div>

      <Button variant="outline" size="default" className="self-start" render={<a href="#contact" />}>
        <FileSearch aria-hidden />
        Открыть полное досье
      </Button>
    </div>
  );
}

export { DossierResultCard };

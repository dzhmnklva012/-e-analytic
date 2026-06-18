import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatBadge } from "./stat-badge";

type SectionCardProps = {
  title: string;
  badge?: { period: string; value: number; delta: number };
  /** Render the chevron as a filled primary button (matches Конфликт интересов). */
  accentChevron?: boolean;
  className?: string;
  children: ReactNode;
};

export function SectionCard({
  title,
  badge,
  accentChevron,
  className,
  children,
}: SectionCardProps) {
  return (
    <Card className={`h-full gap-4 [--card-spacing:--spacing(6)] ${className ?? ""}`}>
      <CardHeader>
        <CardTitle className="text-base font-bold">{title}</CardTitle>
        <CardAction className="flex items-center gap-2">
          {badge && <StatBadge {...badge} />}
          <Button
            type="button"
            variant={accentChevron ? "default" : "outline"}
            size="icon"
            aria-label={`Открыть ${title}`}
          >
            <ChevronRight className="size-4" strokeWidth={2.5} />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">{children}</CardContent>
    </Card>
  );
}

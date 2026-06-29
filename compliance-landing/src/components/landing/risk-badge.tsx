import { AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";

import { RISK_META, type RiskLevel } from "@/lib/screening";
import { Badge } from "@/components/ui/badge";

const ICONS: Record<RiskLevel, typeof CheckCircle2> = {
  low: CheckCircle2,
  medium: AlertTriangle,
  high: ShieldAlert,
};

function RiskBadge({ level }: { level: RiskLevel }) {
  const meta = RISK_META[level];
  const Icon = ICONS[level];
  return (
    <Badge variant={meta.badge} className="gap-1.5 px-2.5 py-1 text-xs">
      <Icon className="size-3" aria-hidden />
      {meta.label}
    </Badge>
  );
}

export { RiskBadge };

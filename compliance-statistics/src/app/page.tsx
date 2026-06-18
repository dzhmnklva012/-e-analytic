import { StatisticsDashboard } from "@/components/dashboard/statistics-dashboard";
import { AppShell } from "@/components/layout/app-shell";

export default function Home() {
  return (
    <AppShell>
      <StatisticsDashboard />
    </AppShell>
  );
}

import { MonthlyBarChart } from "../charts/monthly-bar-chart";
import { SectionCard } from "../ui/section-card";
import { TogglePills } from "../ui/toggle-pills";
import { employeeFiles } from "@/lib/data";

export function EmployeeFilesCard() {
  return (
    <SectionCard title="Досье сотрудников" badge={employeeFiles.badge}>
      <div className="mb-4">
        <TogglePills
          options={["Проверки", "Заключения"]}
          defaultValue="Проверки"
        />
      </div>
      <MonthlyBarChart />
    </SectionCard>
  );
}

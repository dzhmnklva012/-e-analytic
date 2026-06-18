import { SectionCard } from "../ui/section-card";
import { tasks } from "@/lib/data";

export function TasksCard() {
  return (
    <SectionCard title="Задачи">
      {/* KPI row */}
      <div className="grid grid-cols-4 gap-2">
        {tasks.kpis.map((k) => (
          <div key={k.label} className="text-center">
            <div className="text-[28px] font-bold leading-tight text-foreground">
              {k.value}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">{k.label}</div>
          </div>
        ))}
      </div>

      {/* Proportion bar */}
      <div className="mt-6 flex h-3 overflow-hidden rounded-full">
        {tasks.segments.map((s) => (
          <span
            key={s.label}
            style={{ flexGrow: s.percent, backgroundColor: s.color }}
          />
        ))}
      </div>

      {/* Legend with percentages */}
      <ul className="mt-6 flex flex-col gap-3">
        {tasks.segments.map((s) => (
          <li
            key={s.label}
            className="flex items-center justify-between text-sm"
          >
            <span className="flex items-center gap-2 text-foreground">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              {s.label}
            </span>
            <span className="font-semibold text-foreground">{s.percent}%</span>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}

import { Search, FolderPlus, TrendingUp, Activity, BrainCircuit } from "lucide-react";
import { OrbitNode, type OrbitNodeData } from "./orbit-node";
import { AiScoreCard } from "./ai-score-card";
import { AiTerminalCard } from "./ai-terminal-card";

const CENTER = { x: 52, y: 50 };

const nodes: OrbitNodeData[] = [
  {
    label: "САНКЦИИ",
    icon: Search,
    x: 33,
    y: 17,
    gradient: "bg-gradient-to-br from-[#068dff] to-[#4aa3ff]",
    glow: "shadow-[#068dff]/40",
    labelPlacement: "bottom",
    delay: "0s",
  },
  {
    label: "ДОСЬЕ",
    icon: FolderPlus,
    x: 11,
    y: 49,
    gradient: "bg-gradient-to-br from-[#7c7ae0] to-[#a78bfa]",
    glow: "shadow-[#7c7ae0]/40",
    labelPlacement: "bottom",
    delay: "0.8s",
  },
  {
    label: "ОЦЕНКА РИСКА",
    icon: TrendingUp,
    x: 90,
    y: 52,
    gradient: "bg-gradient-to-br from-[#2e9e6b] to-[#34d1c4]",
    glow: "shadow-[#34d1c4]/40",
    labelPlacement: "bottom",
    delay: "1.6s",
  },
  {
    label: "АВТО-АУДИТ",
    icon: Activity,
    x: 71,
    y: 84,
    gradient: "bg-gradient-to-br from-[#d98521] to-[#f6b14a]",
    glow: "shadow-[#f6b14a]/40",
    labelPlacement: "bottom",
    delay: "2.4s",
  },
];

// extra anchor points for connectors toward the floating cards
const cardAnchors = [
  { x: 86, y: 13 }, // score card
  { x: 30, y: 85 }, // terminal card
];

export function AiNetwork() {
  return (
    <div className="relative mx-auto hidden h-[34rem] w-full max-w-[40rem] lg:block">
      {/* dashed connectors */}
      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {[...nodes, ...cardAnchors].map((p, i) => (
          <line
            key={i}
            x1={CENTER.x}
            y1={CENTER.y}
            x2={p.x}
            y2={p.y}
            stroke="var(--primary)"
            strokeWidth={1}
            strokeOpacity={0.3}
            strokeDasharray="4 5"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {/* stray detail dots */}
      <span className="absolute left-[60%] top-[64%] size-1.5 rounded-full bg-primary/40" />
      <span className="absolute left-[80%] top-[68%] size-1 rounded-full bg-[#7c7ae0]/50" />

      {/* central AI engine */}
      <div
        className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
        style={{ left: `${CENTER.x}%`, top: `${CENTER.y}%` }}
      >
        <div className="relative grid place-items-center">
          <span className="absolute size-44 animate-soft-pulse rounded-full bg-primary/15 blur-xl" />
          <span className="absolute size-32 rounded-full border border-primary/20" />
          <span className="absolute size-24 rounded-full border border-primary/30" />
          <span className="relative grid size-24 place-items-center rounded-full bg-gradient-to-br from-[#068dff] to-[#60a5fa] text-white shadow-2xl shadow-primary/40 ring-8 ring-card">
            <BrainCircuit className="size-10" aria-hidden="true" strokeWidth={1.75} />
          </span>
        </div>
        <span className="mt-4 font-mono text-xs font-bold tracking-[0.2em] text-foreground">
          ИИ-ДВИЖОК
        </span>
      </div>

      {/* satellite nodes */}
      {nodes.map((node) => (
        <OrbitNode key={node.label} node={node} />
      ))}

      {/* floating cards */}
      <AiScoreCard className="absolute right-0 top-0 z-20" />
      <AiTerminalCard className="absolute bottom-0 left-2 z-20" />
    </div>
  );
}

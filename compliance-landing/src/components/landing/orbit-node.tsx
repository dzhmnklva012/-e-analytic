import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type OrbitNodeData = {
  label: string;
  icon: LucideIcon;
  /** position in % of the diagram box */
  x: number;
  y: number;
  /** gradient utility classes for the circle */
  gradient: string;
  /** glow colour utility (shadow) */
  glow: string;
  labelPlacement?: "top" | "bottom";
  delay?: string;
};

/** A single satellite node: gradient icon circle + monospace label. */
export function OrbitNode({ node }: { node: OrbitNodeData }) {
  const Icon = node.icon;
  const placement = node.labelPlacement ?? "bottom";

  return (
    <div
      className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 animate-node-float"
      style={{ left: `${node.x}%`, top: `${node.y}%`, animationDelay: node.delay }}
    >
      {placement === "top" && <NodeLabel label={node.label} />}
      <span
        className={cn(
          "grid size-14 place-items-center rounded-full text-white shadow-lg ring-4 ring-card",
          node.gradient,
          node.glow,
        )}
      >
        <Icon className="size-6" aria-hidden="true" strokeWidth={2} />
      </span>
      {placement === "bottom" && <NodeLabel label={node.label} />}
    </div>
  );
}

function NodeLabel({ label }: { label: string }) {
  return (
    <span className="font-mono text-[11px] font-semibold tracking-widest whitespace-nowrap text-muted-foreground">
      {label}
    </span>
  );
}

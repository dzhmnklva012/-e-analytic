import {
  Database,
  Mail,
  Globe2,
  FileText,
  Building2,
  CreditCard,
  Scale,
  Bell,
  BrainCircuit,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

type Tool = { icon: LucideIcon; x: number; y: number; color: string };

// 8 integrations evenly placed on the outer ring
const tools: Tool[] = [
  { icon: Database, x: 90, y: 50, color: "text-[#3b82f6]" },
  { icon: Mail, x: 78, y: 78, color: "text-[#7c7ae0]" },
  { icon: Globe2, x: 50, y: 90, color: "text-[#2e9e6b]" },
  { icon: FileText, x: 22, y: 78, color: "text-[#d98521]" },
  { icon: Building2, x: 10, y: 50, color: "text-[#3b82f6]" },
  { icon: CreditCard, x: 22, y: 22, color: "text-[#7c7ae0]" },
  { icon: Scale, x: 50, y: 10, color: "text-[#2e9e6b]" },
  { icon: Bell, x: 78, y: 22, color: "text-[#d98521]" },
];

export function RadialTools() {
  return (
    <section id="tools" className="overflow-hidden py-16 sm:py-20 lg:py-24">
      <Container className="flex flex-col items-center gap-12">
        <SectionHeading
          eyebrow="Связанные инструменты"
          title="Инструменты, которые работают на вас"
          description="Интуитивный интерфейс, умная автоматизация и бесшовные интеграции — всё, чтобы ваша команда не тратила время впустую."
        />

        <div className="relative mx-auto aspect-square w-full max-w-2xl">
          {/* glow + concentric rings */}
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: "radial-gradient(closest-side, color-mix(in oklch, var(--primary) 16%, transparent), transparent 75%)" }}
            aria-hidden="true"
          />
          {[100, 76, 52, 28].map((size) => (
            <span
              key={size}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/15"
              style={{ width: `${size}%`, height: `${size}%` }}
              aria-hidden="true"
            />
          ))}

          {/* central engine */}
          <div className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-[#3b82f6] to-[#5b8def] text-white shadow-2xl shadow-primary/40 ring-8 ring-background animate-soft-pulse">
            <BrainCircuit className="size-7" aria-hidden="true" />
          </div>

          {/* tool chips */}
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <span
                key={i}
                className="absolute grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-border bg-card shadow-md"
                style={{ left: `${tool.x}%`, top: `${tool.y}%` }}
              >
                <Icon className={cn("size-5", tool.color)} aria-hidden="true" />
              </span>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

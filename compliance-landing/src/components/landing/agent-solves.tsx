import {
  CloudUpload,
  SlidersHorizontal,
  Lightbulb,
  ChevronRight,
  Search,
  ShieldAlert,
  Gauge,
  Mic,
  Paperclip,
  Smile,
  SendHorizontal,
  ChevronsUpDown,
  Copy,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/* ── shared row shell ─────────────────────────────────────────────────── */

function FeatureRow({
  icon: Icon,
  title,
  description,
  visual,
  reverse = false,
}: {
  icon: LucideIcon;
  title: React.ReactNode;
  description: string;
  visual: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <Reveal className="rounded-3xl bg-card p-6 shadow-sm ring-1 ring-foreground/5 sm:p-8 lg:p-10">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        {/* copy */}
        <div className={cn("flex flex-col gap-5", reverse && "lg:order-2")}>
          <span className="grid size-14 place-items-center rounded-2xl bg-muted/70 text-foreground shadow-sm ring-1 ring-foreground/5">
            <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <h3 className="text-2xl font-bold tracking-tight text-balance text-foreground sm:text-3xl">
            {title}
          </h3>
          <p className="max-w-md text-base text-pretty text-muted-foreground">{description}</p>
          <a
            href="#pricing"
            className="inline-flex w-fit items-center gap-1 rounded-md text-sm font-bold text-primary transition-colors hover:text-primary/80 focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
          >
            Запросить ранний доступ
            <ChevronRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        {/* visual (decorative) */}
        <div className={cn(reverse && "lg:order-1")} aria-hidden="true">
          {visual}
        </div>
      </div>
    </Reveal>
  );
}

/* ── mock 1: knowledge / task generator ───────────────────────────────── */

const tasks = [
  { icon: Search, title: "Поиск по базам" },
  { icon: ShieldAlert, title: "Санкционный скрининг" },
  { icon: Gauge, title: "Оценка риска" },
];

function KnowledgeMock() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-muted/50 p-4 sm:p-5">
      <div className="grid grid-cols-3 gap-3">
        {tasks.map((t) => (
          <div key={t.title} className="flex flex-col gap-2 rounded-xl bg-card p-3 ring-1 ring-foreground/5">
            <t.icon className="size-5 text-foreground" strokeWidth={1.75} />
            <span className="text-xs font-semibold text-foreground">{t.title}</span>
            <span className="text-[11px] leading-tight text-muted-foreground">Запустить через ИИ-агента</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 rounded-xl bg-card p-4 ring-1 ring-foreground/5">
        <div className="flex items-center gap-2">
          <span className="grid size-5 place-items-center rounded-md bg-primary text-primary-foreground">
            <Sparkles className="size-3" />
          </span>
          <span className="text-sm font-semibold text-foreground">Сформулируйте проверку</span>
        </div>
        <div className="rounded-lg bg-muted/60 px-3 py-3 text-sm text-muted-foreground">
          Введите запрос…
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Mic className="size-4" />
            <Paperclip className="size-4" />
            <Smile className="size-4" />
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs font-medium text-foreground">
              GPT 4.0 <ChevronsUpDown className="size-3" />
            </span>
            <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
              <SendHorizontal className="size-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── mock 2: model behaviour picker ───────────────────────────────────── */

const models = [
  { name: "GPT 4.0", dot: "bg-emerald-500", desc: "Быстрая и надёжная — самая полная модель OpenAI.", active: true },
  { name: "Gemini 1.5 Pro", dot: "bg-blue-500", desc: "Надёжная модель Google с высоким качеством вывода." },
  { name: "Claude 3.0", dot: "bg-orange-500", desc: "Самая быстрая модель Anthropic для ежедневных задач." },
];

function BehaviorMock() {
  return (
    <div className="relative">
      {/* faint stacked card behind */}
      <div className="absolute -left-3 -top-3 hidden h-full w-full rounded-2xl bg-card/60 blur-[2px] ring-1 ring-foreground/5 sm:block" />
      <div className="relative flex flex-col gap-3 rounded-2xl bg-card p-4 ring-1 ring-foreground/5 sm:p-5">
        {models.map((m) => (
          <div
            key={m.name}
            className={cn(
              "flex flex-col gap-1 rounded-xl p-3",
              m.active ? "bg-muted/70 ring-1 ring-border" : "",
            )}
          >
            <div className="flex items-center gap-2">
              <span className={cn("grid size-5 place-items-center rounded-full text-white", m.dot)}>
                <Sparkles className="size-2.5" />
              </span>
              <span className="text-sm font-bold text-foreground">{m.name}</span>
            </div>
            <span className="text-xs leading-snug text-muted-foreground">{m.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── mock 3: chat result ──────────────────────────────────────────────── */

function ChatMock() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-muted/50 p-4 sm:p-5">
      {/* user bubble */}
      <div className="flex justify-end">
        <span className="max-w-[80%] rounded-2xl rounded-br-sm bg-card px-4 py-2 text-sm text-foreground ring-1 ring-foreground/5">
          Проверь ТОО «Альфа Логистик»
        </span>
      </div>
      {/* answer */}
      <div className="rounded-2xl bg-card p-4 text-sm text-muted-foreground ring-1 ring-foreground/5">
        Низкий риск. Совпадений в санкционных списках не найдено, PEP-связей нет. Действующее
        юридическое лицо — досье собрано.
      </div>
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground">
          <Copy className="size-3.5" /> Копировать
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground">
          <RotateCcw className="size-3.5" /> Повторить
        </span>
      </div>
      {/* input */}
      <div className="flex items-center justify-between rounded-xl bg-card px-4 py-3 ring-1 ring-foreground/5">
        <span className="text-sm text-muted-foreground">Введите запрос…</span>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs font-medium text-foreground">
            GPT 4.0 <ChevronsUpDown className="size-3" />
          </span>
          <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
            <SendHorizontal className="size-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── section ──────────────────────────────────────────────────────────── */

export function AgentSolves() {
  return (
    <section id="how" className="scroll-mt-20 py-16 sm:py-20 lg:py-24">
      <Container className="flex flex-col gap-10 lg:gap-12">
        <h2 className="text-center text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
          Как ИИ-агент решает задачи
        </h2>

        <div className="flex flex-col gap-6 lg:gap-8">
          <FeatureRow
            icon={CloudUpload}
            title={<>Загрузите базу знаний и данные</>}
            description="Импортируйте досье, документы, обращения и санкционные списки — ИИ мгновенно всё изучит и подготовит к проверкам."
            visual={<KnowledgeMock />}
          />
          <FeatureRow
            icon={SlidersHorizontal}
            reverse
            title={<>Настройте поведение ИИ-агента</>}
            description="Задайте тон, пороги риска и правила эскалации. Агент работает по вашим политикам комплаенса — как ваш аналитик."
            visual={<BehaviorMock />}
          />
          <FeatureRow
            icon={Lightbulb}
            title={<>Получайте точные результаты и досье</>}
            description="Подключите ИИ-агента к вашим системам и каналам. Точные оценки риска и готовые досье — везде, где работает команда."
            visual={<ChatMock />}
          />
        </div>
      </Container>
    </section>
  );
}

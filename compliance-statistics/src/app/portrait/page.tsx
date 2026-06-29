import { CheckCircle2 } from "lucide-react";
import { AiPortraitChat } from "@/components/ai-portrait/ai-portrait-chat";
import { Badge } from "@/components/ui/badge";
import { employeePortrait } from "@/lib/portrait";

const dossierTabs = [
  "Личная информация",
  "Трудовая деятельность",
  "Лицензии",
  "Образование",
  "Паспортные данные",
  "Родственники",
  "Риски",
  "Связи",
  "Прикрепленные документы",
  "История проверок",
  "Проверка СБ",
  "Портрет ИИ",
  "Принадлежность",
];

export default async function PortraitPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  // Optional demo triggers: /portrait?error=portrait | /portrait?error=answer
  const { error } = await searchParams;
  return (
    <div className="flex h-screen flex-col bg-background p-3 sm:p-6">
      <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-foreground/10">
        {/* Dossier header */}
        <header className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-2 border-b border-border px-4 py-4 sm:px-6">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-secondary text-base font-bold text-secondary-foreground">
            ИИ
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-base font-bold text-foreground">
                {employeePortrait.subjectName}
              </h1>
              <Badge variant="secondary" className="bg-success/15 text-success">
                Низкий риск
              </Badge>
            </div>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <CheckCircle2 className="size-3.5 text-success" />
              Проверено · 18.08.2023
            </p>
          </div>
        </header>

        {/* Body: dossier nav + AI portrait chat */}
        <div className="flex min-h-0 flex-1 gap-0">
          <nav
            aria-label="Разделы досье"
            className="hidden w-60 shrink-0 overflow-y-auto border-r border-border p-3 lg:block"
          >
            <ul className="flex flex-col gap-0.5">
              {dossierTabs.map((tab) => {
                const active = tab === "Портрет ИИ";
                return (
                  <li key={tab}>
                    <a
                      href="#"
                      aria-current={active ? "page" : undefined}
                      className={`flex h-9 items-center rounded-lg px-3 text-sm transition-colors ${
                        active
                          ? "bg-secondary font-semibold text-secondary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {tab}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex min-h-0 min-w-0 flex-1 p-3 sm:p-4">
            <AiPortraitChat
              portrait={employeePortrait}
              className="flex-1 ring-0"
              autoGenerate
              simulateGenError={error === "portrait"}
              simulateAnswerError={error === "answer"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

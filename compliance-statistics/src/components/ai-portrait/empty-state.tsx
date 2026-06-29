import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  subjectName: string;
  onGenerate: () => void;
  disabled?: boolean;
};

/** Shown before a portrait exists — explains the feature and offers the CTA. */
export function EmptyState({ subjectName, onGenerate, disabled }: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-12 text-center">
      <span className="grid size-16 place-items-center rounded-full bg-secondary text-secondary-foreground">
        <Sparkles className="size-7" />
      </span>
      <div className="flex max-w-sm flex-col gap-1">
        <h3 className="text-base font-bold text-foreground">
          Портрет ещё не сгенерирован
        </h3>
        <p className="text-sm text-muted-foreground">
          ИИ соберёт досье по сотруднику {subjectName} и ответит на ваши вопросы
          о документах, образовании и проверках.
        </p>
      </div>
      <Button onClick={onGenerate} disabled={disabled} className="gap-2">
        <Sparkles className="size-4" />
        Сгенерировать портрет
      </Button>
    </div>
  );
}

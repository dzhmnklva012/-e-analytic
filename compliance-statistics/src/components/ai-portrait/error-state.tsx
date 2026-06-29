import { RefreshCw, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

type ErrorStateProps = {
  onRetry: () => void;
  disabled?: boolean;
};

/** Shown when the AI portrait could not be generated (service error). */
export function ErrorState({ onRetry, disabled }: ErrorStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-12 text-center">
      <span className="grid size-16 place-items-center rounded-full bg-destructive/10 text-destructive">
        <TriangleAlert className="size-7" />
      </span>
      <div className="flex max-w-sm flex-col gap-1">
        <h3 className="text-base font-bold text-foreground">
          Не удалось сгенерировать портрет
        </h3>
        <p className="text-sm text-muted-foreground">
          Сервис ИИ временно недоступен или превышено время ожидания. Данные досье
          не пострадали — попробуйте сформировать портрет ещё раз.
        </p>
      </div>
      <Button onClick={onRetry} disabled={disabled} className="gap-2">
        <RefreshCw className="size-4" />
        Повторить
      </Button>
    </div>
  );
}

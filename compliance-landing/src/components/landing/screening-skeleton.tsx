import { Loader2 } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

/** Loading placeholder mirroring the dossier result card layout. */
function ScreeningSkeleton() {
  return (
    <div
      className="rounded-xl border border-border bg-card p-6"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-primary">
        <Loader2 className="size-4 animate-spin" aria-hidden />
        ИИ проверяет источники…
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-3.5 w-32" />
        </div>
        <Skeleton className="h-6 w-24 rounded-3xl" />
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-11/12" />
        <Skeleton className="h-3.5 w-3/4" />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Skeleton className="h-16 rounded-lg" />
        <Skeleton className="h-16 rounded-lg" />
      </div>

      <span className="sr-only">Идёт проверка контрагента, пожалуйста подождите.</span>
    </div>
  );
}

export { ScreeningSkeleton };

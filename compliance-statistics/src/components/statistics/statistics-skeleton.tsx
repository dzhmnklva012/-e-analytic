import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function MetricTileSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-sm ring-1 ring-foreground/5">
      <Skeleton className="size-12 shrink-0 rounded-full" />
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-6 w-16" />
      </div>
    </div>
  );
}

function CardSkeleton({ rows = 4, chart = false }: { rows?: number; chart?: boolean }) {
  return (
    <Card className="gap-0 py-0 shadow-sm ring-foreground/5">
      <div className="flex items-center gap-3 px-5 py-4">
        <Skeleton className="size-9 rounded-md" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-40" />
        </div>
      </div>
      <div className="space-y-3 border-t px-5 py-4">
        {chart ? (
          <Skeleton className="h-48 w-full" />
        ) : (
          Array.from({ length: rows }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-full" />
          ))
        )}
      </div>
    </Card>
  );
}

/** Full loading placeholder matching the dashboard main + rail layout. */
export function StatisticsSkeleton() {
  return (
    <div className="space-y-6" aria-hidden>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <MetricTileSkeleton key={i} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <CardSkeleton chart />
        </div>
        <CardSkeleton rows={4} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <CardSkeleton rows={5} />
        <CardSkeleton rows={4} />
        <CardSkeleton rows={4} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <CardSkeleton rows={3} />
        <CardSkeleton rows={4} />
      </div>
    </div>
  );
}

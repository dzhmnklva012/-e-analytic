import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function MetricStripSkeleton() {
  return (
    <Card className="gap-0 overflow-hidden py-0 shadow-sm ring-foreground/5">
      <div className="grid grid-cols-2 divide-x divide-y divide-border sm:grid-cols-3 lg:grid-cols-5 lg:divide-y-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2 p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <Skeleton className="size-8 shrink-0 rounded-lg" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-7 w-16" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>
    </Card>
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
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
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

import { Skeleton } from "@/components/ui/skeleton"

/** Shown while a lazily-loaded route chunk is fetched. */
export default function RouteFallback() {
  return (
    <div className="space-y-8" role="status" aria-label="Loading page">
      <div className="space-y-3">
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-4 w-56" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-32 rounded-xl" />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Skeleton className="h-80 rounded-xl" />
        <Skeleton className="h-80 rounded-xl" />
      </div>

      <span className="sr-only">Loading…</span>
    </div>
  )
}

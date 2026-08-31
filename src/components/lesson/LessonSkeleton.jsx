import { Skeleton } from "@/components/ui/skeleton"

/** Shown while a module's lesson chunk is fetched. */
export default function LessonSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading lesson">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <Skeleton className="h-8 w-64" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
      </div>

      <Skeleton className="h-10 w-48 rounded-lg" />

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <Skeleton className="h-8 w-3/4" />
        <div className="mt-6 space-y-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className={i % 3 === 2 ? "h-4 w-2/3" : "h-4 w-full"} />
          ))}
        </div>
      </div>

      <span className="sr-only">Loading lesson content…</span>
    </div>
  )
}

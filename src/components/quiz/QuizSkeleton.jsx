import { Skeleton } from "@/components/ui/skeleton"

/** Shown while a module's quiz bank is fetched. */
export default function QuizSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading quiz">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <Skeleton className="h-8 w-56" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="mt-3 h-7 w-4/5" />
        <div className="mt-6 space-y-3">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      </div>

      <span className="sr-only">Loading quiz questions…</span>
    </div>
  )
}

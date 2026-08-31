import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, Check, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import StatusBadge from "@/components/dashboard/StatusBadge"
import { cn } from "@/lib/utils"

/** Visual treatment for the timeline node marker, keyed by module status. */
const NODE_STYLES = {
  completed: "border-teal bg-teal text-white",
  "in-progress": "border-gold bg-gold text-navy",
  start: "border-teal bg-white text-teal",
}

function TimelineNode({ status, order }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold",
        NODE_STYLES[status] ?? NODE_STYLES.start
      )}
    >
      {status === "completed" ? (
        <Check className="h-4 w-4" />
      ) : (
        <span className="text-stat">{order}</span>
      )}
    </span>
  )
}

function ModuleRow({ module, isLast, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
      className="relative flex gap-4 pb-4 last:pb-0"
    >
      {/* Connector line between nodes */}
      {!isLast ? (
        <span
          aria-hidden="true"
          className="absolute left-[17px] top-9 h-full w-0.5 bg-border"
        />
      ) : null}

      <TimelineNode status={module.status} order={module.order} />

      <div
        className={cn(
          "flex-1 rounded-xl border border-border/70 bg-card p-4 shadow-sm",
          "transition-shadow hover:shadow-md"
        )}
      >
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-navy">{module.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{module.summary}</p>
          </div>
          <StatusBadge status={module.status} />
        </div>

        {module.status === "in-progress" &&
        typeof module.progressPercent === "number" ? (
          <div className="mt-3">
            <Progress
              value={module.progressPercent}
              className="h-1.5 bg-muted [&>*]:bg-gold"
            />
            <p className="text-stat mt-1.5 text-xs text-muted-foreground">
              {module.progressPercent}% complete
            </p>
          </div>
        ) : null}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-stat">{module.estimatedMinutes}</span> min
            {typeof module.quizScore === "number" ? (
              <>
                <span aria-hidden="true" className="px-1 text-border">
                  •
                </span>
                Quiz <span className="text-stat text-teal">{module.quizScore}%</span>
              </>
            ) : null}
          </span>

          <Button
            asChild
            size="sm"
            variant={module.status === "completed" ? "outline" : "default"}
            className="gap-1.5"
          >
            <Link to={`/lesson/${module.id}`}>
              {module.status === "completed"
                ? "Review"
                : module.status === "in-progress"
                  ? "Continue"
                  : "Start"}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.li>
  )
}

export default function TrackTimeline({ track }) {
  const completed = track.modules.filter((m) => m.status === "completed").length

  return (
    <section aria-labelledby={`track-${track.id}`}>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2 id={`track-${track.id}`} className="text-xl font-semibold text-navy">
            {track.title}
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {track.description}
          </p>
        </div>
        <span className="text-stat text-sm text-muted-foreground">
          {completed}/{track.modules.length} complete
        </span>
      </div>

      <ol className="relative">
        {track.modules.map((module, index) => (
          <ModuleRow
            key={module.id}
            module={module}
            index={index}
            isLast={index === track.modules.length - 1}
          />
        ))}
      </ol>
    </section>
  )
}

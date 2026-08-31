import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, ClipboardCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import StatusBadge from "@/components/dashboard/StatusBadge"
import { cn } from "@/lib/utils"

const TRACK_BADGE_STYLES = {
  foundations: "border-transparent bg-teal-50 text-teal-700",
  advanced: "border-transparent bg-gold-50 text-gold-700",
}

export default function ModuleCard({ module, index = 0 }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: Math.min(index * 0.04, 0.24),
        ease: "easeOut",
      }}
    >
      <Card
        className={cn(
          "flex h-full flex-col border-border/70 shadow-sm",
          "transition-shadow hover:shadow-md"
        )}
      >
        <CardHeader className="space-y-3 pb-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className={cn(
                "rounded-full px-2.5 py-1",
                TRACK_BADGE_STYLES[module.trackId]
              )}
            >
              {module.trackLabel}
            </Badge>
            <StatusBadge status={module.status} />
          </div>

          <h3 className="text-lg font-semibold leading-snug text-navy">
            {module.title}
          </h3>
        </CardHeader>

        <CardContent className="flex-1 pb-4">
          <p className="leading-relaxed text-muted-foreground">
            {module.summary}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="text-stat">{module.lessonCount}</span>
              {module.lessonCount === 1 ? "lesson" : "lessons"}
            </span>
            <span className="flex items-center gap-1.5">
              <ClipboardCheck className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="text-stat">{module.quizCount}</span>
              {module.quizCount === 1 ? "quiz" : "quizzes"}
            </span>
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <Button asChild className="w-full gap-1.5 bg-teal hover:bg-teal-600">
            <Link to={`/lesson/${module.id}`}>
              View Module
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

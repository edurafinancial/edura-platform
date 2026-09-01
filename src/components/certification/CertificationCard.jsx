import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Award, ArrowRight, CheckCircle2, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useCertification } from "@/hooks/useCurriculum"

/**
 * Entry point to the certification exam. Renders a locked state with the
 * remaining prerequisites until every module is completed.
 */
export default function CertificationCard({ className }) {
  const { unlocked, completedCount, totalCount, remaining, passed, bestScore, attempts } =
    useCertification()

  const percent = totalCount ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={className}
    >
      <Card
        className={cn(
          "overflow-hidden border-border/70 shadow-sm",
          unlocked ? "bg-navy text-white" : "bg-card"
        )}
      >
        <CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:gap-6">
          <span
            className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl",
              unlocked ? "bg-gold text-navy" : "bg-muted text-muted-foreground"
            )}
          >
            {unlocked ? (
              <Award className="h-7 w-7" aria-hidden="true" />
            ) : (
              <Lock className="h-6 w-6" aria-hidden="true" />
            )}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2
                className={cn(
                  "font-display text-xl",
                  unlocked ? "text-white" : "text-navy"
                )}
              >
                Certification Exam
              </h2>
              {passed ? (
                <span className="text-stat flex items-center gap-1 rounded-full bg-teal px-2.5 py-1 text-xs font-semibold text-white">
                  <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                  Passed {bestScore}%
                </span>
              ) : null}
            </div>

            <p
              className={cn(
                "mt-1 text-sm leading-relaxed",
                unlocked ? "text-white/70" : "text-muted-foreground"
              )}
            >
              {unlocked
                ? "40 questions drawn from across the pathway. Score 75% or higher to earn your Edura Financial Literacy Certificate."
                : `Complete all ${totalCount} modules to unlock the final exam.`}
            </p>

            {!unlocked ? (
              <div className="mt-4 max-w-sm">
                <Progress
                  value={percent}
                  aria-label={`${completedCount} of ${totalCount} modules completed`}
                  className="h-2 bg-muted [&>*]:bg-teal"
                />
                <p className="text-stat mt-2 text-xs text-muted-foreground">
                  {completedCount}/{totalCount} modules complete
                  {remaining.length <= 3 && remaining.length > 0
                    ? ` — next up: ${remaining[0].title}`
                    : ""}
                </p>
              </div>
            ) : attempts > 0 ? (
              <p className="text-stat mt-2 text-xs text-white/50">
                {attempts} attempt{attempts === 1 ? "" : "s"}
                {bestScore != null ? ` · best ${bestScore}%` : ""}
              </p>
            ) : null}
          </div>

          <div className="shrink-0">
            {unlocked ? (
              <Button asChild className="gap-1.5 bg-gold text-navy hover:bg-gold-400">
                <Link to="/exam">
                  {passed ? "Retake Exam" : "Start Exam"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button disabled variant="outline" className="gap-1.5">
                <Lock className="h-4 w-4" />
                Locked
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

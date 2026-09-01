import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { Check, RotateCcw, Trophy, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useProgress } from "@/state/ProgressProvider"

const CELEBRATION_THRESHOLD = 80

function getMessage(percent) {
  if (percent >= CELEBRATION_THRESHOLD) {
    return { heading: "Great job!", body: "You've got a solid grip on this material." }
  }
  if (percent >= 50) {
    return {
      heading: "Nice work!",
      body: "You're most of the way there — worth a quick review before moving on.",
    }
  }
  return {
    heading: "Keep learning!",
    body: "Revisit the lesson and try again. This one takes a couple of passes.",
  }
}

/** Brand-coloured burst, fired once when the student clears the threshold. */
function fireConfetti() {
  const colors = ["#2A9D8F", "#E9C46A", "#1B2A4A"]
  confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 }, colors })
  setTimeout(
    () => confetti({ particleCount: 40, spread: 100, origin: { y: 0.6 }, colors }),
    220
  )
}

export default function QuizResults({ moduleId, results, onRetry }) {
  const navigate = useNavigate()
  const { completeModule } = useProgress()
  const hasFired = useRef(false)

  const correctCount = results.filter((r) => r.isCorrect).length
  const total = results.length
  const percent = total ? Math.round((correctCount / total) * 100) : 0
  const message = getMessage(percent)
  const passed = percent >= CELEBRATION_THRESHOLD

  useEffect(() => {
    if (!passed || hasFired.current) return
    // StrictMode double-invokes effects in dev; the ref keeps this to one burst.
    hasFired.current = true

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (!prefersReducedMotion) fireConfetti()
  }, [passed])

  function handleCompleteModule() {
    completeModule(moduleId)
    navigate("/")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-6"
    >
      <Card>
        <CardContent className="flex flex-col items-center px-6 py-10 text-center">
          <span
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-2xl",
              passed ? "bg-gold-50 text-gold-500" : "bg-teal-50 text-teal"
            )}
          >
            <Trophy className="h-8 w-8" aria-hidden="true" />
          </span>

          <h1 className="mt-5 font-display text-3xl text-navy sm:text-4xl">
            {message.heading}
          </h1>
          <p className="mt-2 max-w-sm text-muted-foreground">{message.body}</p>

          <div className="mt-7 flex items-baseline gap-3">
            <span className="text-stat text-5xl font-semibold text-navy">
              {correctCount}/{total}
            </span>
            <span className="text-stat text-2xl font-medium text-teal">
              {percent}%
            </span>
          </div>

          <Progress
            value={percent}
            aria-label={`Score: ${percent} percent`}
            className="mt-5 h-2 w-full max-w-xs bg-muted [&>*]:bg-teal"
          />
        </CardContent>
      </Card>

      {/* Question-by-question recap */}
      <Card>
        <CardContent className="p-5 sm:p-6">
          <h2 className="text-base font-semibold text-navy">Question recap</h2>
          <ul className="mt-4 space-y-3">
            {results.map((result, index) => (
              <li key={result.questionId} className="flex items-start gap-3">
                <span
                  className={cn(
                    "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                    result.isCorrect
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  )}
                >
                  {result.isCorrect ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <X className="h-3.5 w-3.5" />
                  )}
                  <span className="sr-only">
                    {result.isCorrect ? "Correct" : "Incorrect"}
                  </span>
                </span>
                <p className="flex-1 leading-relaxed text-navy-500">
                  <span className="text-stat mr-2 text-sm text-muted-foreground">
                    {index + 1}.
                  </span>
                  {result.questionText}
                </p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <Button
          variant="ghost"
          onClick={onRetry}
          className="gap-1.5 text-muted-foreground hover:text-navy"
        >
          <RotateCcw className="h-4 w-4" />
          Retry quiz
        </Button>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="outline" onClick={() => navigate("/")}>
            Back to Dashboard
          </Button>
          <Button
            onClick={handleCompleteModule}
            className="bg-teal hover:bg-teal-600"
          >
            Complete Module
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

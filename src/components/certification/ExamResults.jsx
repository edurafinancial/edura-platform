import { useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { Award, Check, RotateCcw, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { STUDENT } from "@/data/student"

function fireConfetti() {
  const colors = ["#2A9D8F", "#E9C46A", "#1B2A4A"]
  confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 }, colors })
  setTimeout(
    () => confetti({ particleCount: 50, spread: 110, origin: { y: 0.6 }, colors }),
    240
  )
}

export default function ExamResults({ results, passingScore, onRetry }) {
  const navigate = useNavigate()
  const hasFired = useRef(false)

  const correctCount = results.filter((r) => r.isCorrect).length
  const total = results.length
  const percent = total ? Math.round((correctCount / total) * 100) : 0
  const passed = percent >= passingScore

  useEffect(() => {
    if (!passed || hasFired.current) return
    hasFired.current = true
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!reduced) fireConfetti()
  }, [passed])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-6"
    >
      <Card className={cn(passed && "border-transparent bg-navy text-white")}>
        <CardContent className="flex flex-col items-center px-6 py-10 text-center">
          <span
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-2xl",
              passed ? "bg-gold text-navy" : "bg-muted text-muted-foreground"
            )}
          >
            <Award className="h-8 w-8" aria-hidden="true" />
          </span>

          <h1
            className={cn(
              "mt-5 font-display text-3xl sm:text-4xl",
              passed ? "text-white" : "text-navy"
            )}
          >
            {passed ? "Certified!" : "Not passed yet"}
          </h1>
          <p
            className={cn(
              "mt-2 max-w-md",
              passed ? "text-white/70" : "text-muted-foreground"
            )}
          >
            {passed
              ? `Congratulations, ${STUDENT.name}. You've earned the Edura Financial Literacy Certificate of Completion.`
              : `You need ${passingScore}% to certify. Retakes are unlimited — review the questions below and try again.`}
          </p>

          <div className="mt-7 flex items-baseline gap-3">
            <span
              className={cn(
                "text-stat text-5xl font-semibold",
                passed ? "text-white" : "text-navy"
              )}
            >
              {correctCount}/{total}
            </span>
            <span
              className={cn(
                "text-stat text-2xl font-medium",
                passed ? "text-gold" : "text-teal"
              )}
            >
              {percent}%
            </span>
          </div>

          <Progress
            value={percent}
            aria-label={`Score: ${percent} percent`}
            className={cn(
              "mt-5 h-2 w-full max-w-xs",
              passed ? "bg-white/15 [&>*]:bg-gold" : "bg-muted [&>*]:bg-teal"
            )}
          />
          <p
            className={cn(
              "text-stat mt-2 text-xs",
              passed ? "text-white/50" : "text-muted-foreground"
            )}
          >
            Pass mark {passingScore}%
          </p>
        </CardContent>
      </Card>

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
        <Button variant="ghost" onClick={onRetry} className="gap-1.5 text-muted-foreground hover:text-navy">
          <RotateCcw className="h-4 w-4" />
          Retake exam
        </Button>
        <Button asChild className="bg-teal hover:bg-teal-600">
          <Link to="/">Back to Dashboard</Link>
        </Button>
      </div>
    </motion.div>
  )
}

import { useCallback, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import QuestionCard from "@/components/quiz/QuestionCard"
import QuizResults from "@/components/quiz/QuizResults"
import QuizSkeleton from "@/components/quiz/QuizSkeleton"
import PagePlaceholder from "@/components/shared/PagePlaceholder"
import { loadQuiz, buildQuizRun } from "@/data/quizzes"
import { useProgress } from "@/state/ProgressProvider"

export default function QuizInterface() {
  const { id } = useParams()
  const { recordQuizScore } = useProgress()

  const [quiz, setQuiz] = useState(null)
  const [run, setRun] = useState(null)
  const [status, setStatus] = useState("loading")
  const [index, setIndex] = useState(0)
  const [selectedId, setSelectedId] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [results, setResults] = useState([])
  const [isComplete, setIsComplete] = useState(false)

  // The quiz bank is a per-module chunk, fetched only when this route opens.
  useEffect(() => {
    let cancelled = false
    setStatus("loading")
    setQuiz(null)
    setRun(null)
    setIndex(0)
    setSelectedId(null)
    setIsAnswered(false)
    setResults([])
    setIsComplete(false)

    loadQuiz(id)
      .then((loaded) => {
        if (cancelled) return
        if (!loaded) {
          setStatus("missing")
          return
        }
        setQuiz(loaded)
        // Randomized once per attempt, not per render.
        setRun(buildQuizRun(loaded))
        setStatus("ready")
      })
      .catch(() => {
        if (!cancelled) setStatus("missing")
      })

    return () => {
      cancelled = true
    }
  }, [id])

  const questions = run?.questions ?? []
  const total = questions.length
  const question = questions[index]

  const handleSelect = useCallback(
    (optionId) => {
      if (isAnswered || !question) return
      setSelectedId(optionId)
      setIsAnswered(true)
      setResults((prev) => [
        ...prev,
        {
          questionId: question.id,
          questionText: question.text,
          selectedId: optionId,
          isCorrect: optionId === question.correctOptionId,
        },
      ])
    },
    [isAnswered, question]
  )

  const handleNext = useCallback(() => {
    if (index + 1 >= total) {
      // Persist the score the moment the attempt finishes.
      const correct = results.filter((r) => r.isCorrect).length
      recordQuizScore(id, total ? Math.round((correct / total) * 100) : 0)
      setIsComplete(true)
      return
    }
    setIndex((i) => i + 1)
    setSelectedId(null)
    setIsAnswered(false)
  }, [index, total, results, id, recordQuizScore])

  const handleRetry = useCallback(() => {
    // A fresh run reshuffles both questions and options.
    setRun(buildQuizRun(quiz))
    setIndex(0)
    setSelectedId(null)
    setIsAnswered(false)
    setResults([])
    setIsComplete(false)
  }, [quiz])

  if (status === "loading") return <QuizSkeleton />

  if (status === "missing" || !run) {
    return (
      <PagePlaceholder
        title="Quiz not available"
        description="There's no quiz for this module yet. Head back to your dashboard to keep going."
        meta={`module: ${id}`}
      />
    )
  }

  if (isComplete) {
    return <QuizResults moduleId={id} results={results} onRetry={handleRetry} />
  }

  const progressPercent = ((index + (isAnswered ? 1 : 0)) / total) * 100

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              asChild
              variant="ghost"
              size="icon"
              aria-label="Back to dashboard"
              className="shrink-0 text-navy hover:bg-navy/5"
            >
              <Link to="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="truncate font-display text-2xl text-navy">
              {run.title} Quiz
            </h1>
          </div>

          <span className="text-stat shrink-0 text-sm text-muted-foreground">
            Question {index + 1} of {total}
          </span>
        </div>

        <Progress
          value={progressPercent}
          aria-label={`Question ${index + 1} of ${total}`}
          className="h-2 bg-muted [&>*]:bg-teal"
        />
      </header>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <QuestionCard
              question={question}
              questionNumber={index + 1}
              totalQuestions={total}
              selectedId={selectedId}
              isAnswered={isAnswered}
              onSelect={handleSelect}
              onNext={handleNext}
              isLastQuestion={index + 1 === total}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

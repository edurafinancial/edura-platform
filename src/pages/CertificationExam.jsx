import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import QuestionCard from "@/components/quiz/QuestionCard"
import QuizSkeleton from "@/components/quiz/QuizSkeleton"
import ExamResults from "@/components/certification/ExamResults"
import CertificationCard from "@/components/certification/CertificationCard"
import { loadCertificationExam } from "@/data/exam"
import { buildQuizRun } from "@/data/quizzes"
import { useCertification } from "@/hooks/useCurriculum"
import { useProgress } from "@/state/ProgressProvider"

/** Shown when a student reaches /exam without finishing the prerequisites. */
function LockedState({ completedCount, totalCount }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
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
        <h1 className="font-display text-2xl text-navy">Certification Exam</h1>
      </div>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center px-6 py-12 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
            <Lock className="h-5 w-5" aria-hidden="true" />
          </span>
          <h2 className="mt-4 font-display text-2xl text-navy">Exam locked</h2>
          <p className="mt-2 max-w-md text-muted-foreground">
            The certification exam unlocks once every module is complete. You've
            finished <span className="text-stat">{completedCount}</span> of{" "}
            <span className="text-stat">{totalCount}</span>.
          </p>
        </CardContent>
      </Card>

      <CertificationCard />
    </div>
  )
}

export default function CertificationExam() {
  const { unlocked, completedCount, totalCount } = useCertification()
  const { recordExamAttempt } = useProgress()

  const [exam, setExam] = useState(null)
  const [run, setRun] = useState(null)
  const [status, setStatus] = useState("loading")
  const [index, setIndex] = useState(0)
  const [selectedId, setSelectedId] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [results, setResults] = useState([])
  const [isComplete, setIsComplete] = useState(false)

  // The 40-question bank is its own chunk, fetched only once the exam opens.
  useEffect(() => {
    if (!unlocked) return undefined
    let cancelled = false
    setStatus("loading")

    loadCertificationExam()
      .then((loaded) => {
        if (cancelled) return
        setExam(loaded)
        setRun(buildQuizRun(loaded))
        setStatus("ready")
      })
      .catch(() => {
        if (!cancelled) setStatus("missing")
      })

    return () => {
      cancelled = true
    }
  }, [unlocked])

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
      const correct = results.filter((r) => r.isCorrect).length
      const percent = total ? Math.round((correct / total) * 100) : 0
      recordExamAttempt(percent, percent >= (exam?.passingScore ?? 75))
      setIsComplete(true)
      return
    }
    setIndex((i) => i + 1)
    setSelectedId(null)
    setIsAnswered(false)
  }, [index, total, results, exam, recordExamAttempt])

  const handleRetry = useCallback(() => {
    setRun(buildQuizRun(exam))
    setIndex(0)
    setSelectedId(null)
    setIsAnswered(false)
    setResults([])
    setIsComplete(false)
  }, [exam])

  // Prerequisite gate — also covers someone navigating straight to /exam.
  if (!unlocked) {
    return <LockedState completedCount={completedCount} totalCount={totalCount} />
  }

  if (status === "loading") return <QuizSkeleton />

  if (status === "missing" || !run) {
    return (
      <div className="space-y-4">
        <h1 className="font-display text-2xl text-navy">Exam unavailable</h1>
        <p className="text-muted-foreground">
          The exam couldn't be loaded. Please refresh and try again.
        </p>
      </div>
    )
  }

  if (isComplete) {
    return (
      <ExamResults
        results={results}
        passingScore={exam?.passingScore ?? 75}
        onRetry={handleRetry}
      />
    )
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
            <div className="min-w-0">
              <h1 className="truncate font-display text-2xl text-navy">
                Certification Exam
              </h1>
              <p className="text-xs text-muted-foreground">
                Pass mark {exam?.passingScore ?? 75}% · unlimited retakes
              </p>
            </div>
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

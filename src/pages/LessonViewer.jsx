import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, BookOpen, PlayCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReadMode from "@/components/lesson/ReadMode"
import WatchMode from "@/components/lesson/WatchMode"
import LessonSkeleton from "@/components/lesson/LessonSkeleton"
import PagePlaceholder from "@/components/shared/PagePlaceholder"
import useKeyboardNav from "@/hooks/useKeyboardNav"
import { getCurriculumModule } from "@/data/curriculumModules"
import { useProgress } from "@/state/ProgressProvider"
import { loadLesson } from "@/data/lessons"
import { hasQuiz } from "@/data/quizzes"

/** Direction-aware slide transition. */
const slideVariants = {
  enter: (direction) => ({ opacity: 0, x: direction > 0 ? 24 : -24 }),
  center: { opacity: 1, x: 0 },
  exit: (direction) => ({ opacity: 0, x: direction > 0 ? -24 : 24 }),
}

export default function LessonViewer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { recordSlideView } = useProgress()

  const [lesson, setLesson] = useState(null)
  const [status, setStatus] = useState("loading")
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  // Lifted above the slide so the chosen mode persists as slides change.
  const [mode, setMode] = useState("read")

  // Lesson prose is a per-module chunk, fetched only when this route opens.
  useEffect(() => {
    let cancelled = false
    setStatus("loading")
    setLesson(null)
    setIndex(0)
    setDirection(1)

    loadLesson(id, getCurriculumModule(id))
      .then((loaded) => {
        if (cancelled) return
        if (!loaded) {
          setStatus("missing")
          return
        }
        setLesson(loaded)
        setStatus("ready")
      })
      .catch(() => {
        if (!cancelled) setStatus("missing")
      })

    return () => {
      cancelled = true
    }
  }, [id])

  // Viewing a slide is what marks a module as started / in progress.
  useEffect(() => {
    if (!lesson) return
    recordSlideView(id, index, lesson.slides.length)
  }, [id, index, lesson, recordSlideView])

  const total = lesson?.slides.length ?? 0
  const isFirst = index === 0
  const isLast = index === total - 1

  const goPrev = useCallback(() => {
    setDirection(-1)
    setIndex((i) => Math.max(0, i - 1))
  }, [])

  const goNext = useCallback(() => {
    setDirection(1)
    setIndex((i) => Math.min(total - 1, i + 1))
  }, [total])

  // Arrows move between slides only. Starting the quiz stays a deliberate
  // action, so ArrowRight is a no-op on the final slide.
  useKeyboardNav({
    onPrev: isFirst ? undefined : goPrev,
    onNext: isLast ? undefined : goNext,
    enabled: status === "ready",
  })

  if (status === "loading") return <LessonSkeleton />

  if (status === "missing" || !lesson) {
    return (
      <PagePlaceholder
        title="Lesson not found"
        description="We couldn't find a lesson for that module. Head back to your dashboard to pick another."
        meta={`module: ${id}`}
      />
    )
  }

  const slide = lesson.slides[index]
  const progressPercent = ((index + 1) / total) * 100
  const quizAvailable = hasQuiz(id)

  return (
    <div className="space-y-6">
      {/* Top bar */}
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
                {lesson.title}
              </h1>
              {lesson.isPlaceholder ? (
                <p className="text-xs text-muted-foreground">Preview content</p>
              ) : null}
            </div>
          </div>

          <span className="text-stat shrink-0 text-sm text-muted-foreground">
            Slide {index + 1} of {total}
          </span>
        </div>

        <Progress
          value={progressPercent}
          aria-label={`Slide ${index + 1} of ${total}`}
          className="h-2 bg-muted [&>*]:bg-teal"
        />
      </header>

      {/* Mode toggle */}
      <Tabs value={mode} onValueChange={setMode}>
        <TabsList className="bg-muted">
          <TabsTrigger
            value="read"
            className="gap-1.5 data-[state=active]:bg-white data-[state=active]:text-teal"
          >
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            Read
          </TabsTrigger>
          <TabsTrigger
            value="watch"
            className="gap-1.5 data-[state=active]:bg-white data-[state=active]:text-teal"
          >
            <PlayCircle className="h-4 w-4" aria-hidden="true" />
            Watch
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Slide content */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={`${slide.id}-${mode}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            {mode === "read" ? (
              <ReadMode slide={slide} />
            ) : (
              <WatchMode slide={slide} onSwitchToRead={() => setMode("read")} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <nav
        aria-label="Slide navigation"
        className="flex items-center justify-between gap-3"
      >
        <Button
          variant="outline"
          onClick={goPrev}
          disabled={isFirst}
          className="gap-1.5"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <p className="hidden text-xs text-muted-foreground sm:block">
          Use ← and → to move between slides
        </p>

        {isLast ? (
          <Button
            onClick={() => navigate(`/quiz/${id}`)}
            disabled={!quizAvailable}
            className="gap-1.5 bg-teal hover:bg-teal-600"
          >
            <Sparkles className="h-4 w-4" />
            Start Quiz
          </Button>
        ) : (
          <Button onClick={goNext} className="gap-1.5">
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </nav>
    </div>
  )
}

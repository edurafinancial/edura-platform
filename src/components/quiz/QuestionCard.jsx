import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import useAnswerKeys from "@/hooks/useAnswerKeys"

/**
 * Visual state for one option, given the current answer state.
 * Red #EF4444 / Green #22C55E map exactly to Tailwind red-500 / green-500.
 */
function optionState({ option, question, selectedId, isAnswered }) {
  if (!isAnswered) {
    return selectedId === option.id ? "selected" : "idle"
  }
  if (option.id === question.correctOptionId) return "correct"
  if (option.id === selectedId) return "incorrect"
  return "muted"
}

const OPTION_STYLES = {
  idle: "border-border bg-white hover:border-teal hover:bg-teal-50/40",
  selected: "border-teal bg-teal-50",
  correct: "border-green-500 bg-green-50",
  incorrect: "border-red-500 bg-red-50",
  muted: "border-border bg-white opacity-60",
}

const KEY_STYLES = {
  idle: "border-border bg-muted text-muted-foreground",
  selected: "border-teal bg-teal text-white",
  correct: "border-green-500 bg-green-500 text-white",
  incorrect: "border-red-500 bg-red-500 text-white",
  muted: "border-border bg-muted text-muted-foreground",
}

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedId,
  isAnswered,
  onSelect,
  onNext,
  isLastQuestion,
}) {
  useAnswerKeys({
    count: question.options.length,
    enabled: !isAnswered,
    onSelect: (index) => onSelect(question.options[index].id),
  })

  const isCorrect = selectedId === question.correctOptionId

  return (
    <div>
      <p className="text-stat text-sm text-muted-foreground">
        Question {questionNumber} of {totalQuestions}
      </p>

      <h2 className="mt-2 text-xl font-semibold leading-snug text-navy sm:text-2xl">
        {question.text}
      </h2>

      <ul className="mt-6 space-y-3">
        {question.options.map((option, index) => {
          const state = optionState({ option, question, selectedId, isAnswered })
          return (
            <li key={option.id}>
              <button
                type="button"
                onClick={() => onSelect(option.id)}
                disabled={isAnswered}
                aria-pressed={selectedId === option.id}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2",
                  isAnswered ? "cursor-default" : "cursor-pointer",
                  OPTION_STYLES[state]
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "text-stat flex h-7 w-7 shrink-0 items-center justify-center rounded-md border text-xs font-semibold",
                    KEY_STYLES[state]
                  )}
                >
                  {index + 1}
                </span>

                <span className="flex-1 text-navy">{option.text}</span>

                {isAnswered && state === "correct" ? (
                  <Check className="h-5 w-5 shrink-0 text-green-500" />
                ) : null}
                {isAnswered && state === "incorrect" ? (
                  <X className="h-5 w-5 shrink-0 text-red-500" />
                ) : null}
              </button>
            </li>
          )
        })}
      </ul>

      {!isAnswered ? (
        <p className="mt-4 text-xs text-muted-foreground">
          Press 1–4 to choose an answer
        </p>
      ) : null}

      {/* Feedback + explanation, shown immediately on answering */}
      {isAnswered ? (
        <div
          role="status"
          className={cn(
            "mt-6 rounded-xl border-l-4 p-4",
            isCorrect
              ? "border-green-500 bg-green-50"
              : "border-red-500 bg-red-50"
          )}
        >
          <p
            className={cn(
              "flex items-center gap-2 font-semibold",
              isCorrect ? "text-green-700" : "text-red-700"
            )}
          >
            {isCorrect ? (
              <Check className="h-4 w-4" />
            ) : (
              <X className="h-4 w-4" />
            )}
            {isCorrect ? "Correct" : "Not quite"}
          </p>
          <p className="mt-2 leading-relaxed text-navy-500">
            {question.explanation}
          </p>
        </div>
      ) : null}

      {isAnswered ? (
        <div className="mt-6 flex justify-end">
          <Button onClick={onNext} className="gap-1.5">
            {isLastQuestion ? "See Results" : "Next Question"}
          </Button>
        </div>
      ) : null}
    </div>
  )
}

/**
 * GENERATED FILE — do not edit by hand.
 *
 * Produced by scripts/ingestContent.js from the Word documents in
 * "Edura Content Files/". Re-run that script to regenerate.
 *
 * Module registry: identity, track, and content counts only.
 *
 * Deliberately lightweight — this is the ONLY curriculum data in the main
 * bundle. Lesson prose and quiz banks load on demand via
 * src/data/lessons/index.js and src/data/quizzes/index.js.
 */

export const CURRICULUM_MODULES = [
  {
    "id": "how-money-works",
    "number": 1,
    "title": "How Money Works",
    "description": "Income, expenses, and the equation behind every financial decision.",
    "track": "foundations",
    "lessonCount": 10,
    "quizCount": 1,
    "questionCount": 8
  },
  {
    "id": "banking-without-the-confusion",
    "number": 2,
    "title": "Banking Without the Confusion",
    "description": "Checking, savings, and choosing your first bank account.",
    "track": "foundations",
    "lessonCount": 10,
    "quizCount": 1,
    "questionCount": 8
  },
  {
    "id": "credit-your-financial-reputation",
    "number": 3,
    "title": "Credit: Your Financial Reputation",
    "description": "What credit scores are, why they matter, and how to build yours early.",
    "track": "foundations",
    "lessonCount": 10,
    "quizCount": 1,
    "questionCount": 8
  },
  {
    "id": "budgeting-that-doesnt-suck",
    "number": 4,
    "title": "Budgeting That Doesn’t Suck",
    "description": "Simple systems to manage money without spreadsheet anxiety.",
    "track": "foundations",
    "lessonCount": 10,
    "quizCount": 1,
    "questionCount": 8
  },
  {
    "id": "decode-your-first-paycheck",
    "number": 5,
    "title": "Decode Your First Paycheck",
    "description": "Every mysterious line on your pay stub, finally explained.",
    "track": "advanced",
    "lessonCount": 10,
    "quizCount": 1,
    "questionCount": 8
  },
  {
    "id": "student-loans-demystified",
    "number": 6,
    "title": "Student Loans Demystified",
    "description": "What you actually owe, repayment strategies, and forgiveness programs.",
    "track": "advanced",
    "lessonCount": 13,
    "quizCount": 1,
    "questionCount": 10
  },
  {
    "id": "investing-start-with-50",
    "number": 7,
    "title": "Investing: Start With $50",
    "description": "Index funds, compound interest, and why starting now is a superpower.",
    "track": "advanced",
    "lessonCount": 11,
    "quizCount": 1,
    "questionCount": 9
  },
  {
    "id": "filing-taxes-without-crying",
    "number": 8,
    "title": "Filing Taxes Without Crying",
    "description": "W-2s, deductions, credits, and filing for the very first time.",
    "track": "advanced",
    "lessonCount": 10,
    "quizCount": 1,
    "questionCount": 8
  },
  {
    "id": "insurance-the-system-built-on-what-if",
    "number": 9,
    "title": "Insurance: The System Built on \"What If\"",
    "description": "Auto, health, life, renters, and disability. Why insurance exists and how to buy only what you actually need.",
    "track": "advanced",
    "lessonCount": 9,
    "quizCount": 1,
    "questionCount": 8
  }
]

export const FOUNDATIONS_MODULES = CURRICULUM_MODULES.filter(
  (m) => m.track === "foundations"
)

export const ADVANCED_MODULES = CURRICULUM_MODULES.filter(
  (m) => m.track === "advanced"
)

export function getCurriculumModule(id) {
  return CURRICULUM_MODULES.find((m) => m.id === id) ?? null
}

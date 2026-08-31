/**
 * Student-facing dashboard state.
 *
 * Module identity comes from the generated curriculum registry (real content,
 * ingested from the Word documents). Only the per-student PROGRESS layer below
 * is mock data — swap it for API state when the backend lands.
 */

import { CURRICULUM_MODULES } from "@/data/curriculumModules"

export const STUDENT = {
  id: "stu_10428",
  name: "Jordan",
  fullName: "Jordan Ellis",
  initials: "JE",
  classCode: "EDU-7K42",
  school: "Westbrook High School",
}

/**
 * Demo progress per module id. Anything not listed defaults to "start".
 * status: "completed" | "in-progress" | "start" | "coming-soon"
 */
const PROGRESS = {
  "how-money-works": { status: "completed", quizScore: 92 },
  "banking-without-the-confusion": { status: "completed", quizScore: 88 },
  "credit-your-financial-reputation": { status: "completed", quizScore: 79 },
  "budgeting-that-doesnt-suck": { status: "in-progress", progressPercent: 45 },
  "decode-your-first-paycheck": { status: "start" },
  "student-loans-demystified": { status: "start" },
  "investing-start-with-50": { status: "start" },
  "filing-taxes-without-crying": { status: "start" },
  "insurance-the-system-built-on-what-if": { status: "start" },
}

/** Rough reading time: lessons run ~2.5 minutes of prose each. */
const estimateMinutes = (lessonCount) => Math.max(5, Math.round(lessonCount * 2.5))

function decorate(module, index) {
  const progress = PROGRESS[module.id] ?? { status: "start" }
  return {
    id: module.id,
    order: index + 1,
    number: module.number,
    title: module.title,
    summary: module.description,
    track: module.track,
    lessonCount: module.lessonCount,
    questionCount: module.questionCount,
    estimatedMinutes: estimateMinutes(module.lessonCount),
    quizScore: progress.quizScore ?? null,
    progressPercent: progress.progressPercent,
    status: progress.status,
  }
}

export const FOUNDATIONS_MODULES = CURRICULUM_MODULES.filter(
  (m) => m.track === "foundations"
).map(decorate)

export const ADVANCED_MODULES = CURRICULUM_MODULES.filter(
  (m) => m.track === "advanced"
).map(decorate)

export const TRACKS = [
  {
    id: "foundations",
    title: "Foundations Track",
    description: "Core money skills every student needs before graduation.",
    modules: FOUNDATIONS_MODULES,
  },
  {
    id: "advanced",
    title: "Advanced Track",
    description: "Deeper topics for students ready to go further.",
    modules: ADVANCED_MODULES,
  },
]

const ALL_MODULES = [...FOUNDATIONS_MODULES, ...ADVANCED_MODULES]

/** Modules a student can actually reach today (excludes unreleased content). */
const AVAILABLE_MODULES = ALL_MODULES.filter((m) => m.status !== "coming-soon")
const COMPLETED_MODULES = ALL_MODULES.filter((m) => m.status === "completed")
const SCORED_MODULES = ALL_MODULES.filter((m) => typeof m.quizScore === "number")

export const DASHBOARD_STATS = {
  modulesCompleted: COMPLETED_MODULES.length,
  modulesAvailable: AVAILABLE_MODULES.length,
  averageQuizScore: SCORED_MODULES.length
    ? Math.round(
        SCORED_MODULES.reduce((sum, m) => sum + m.quizScore, 0) /
          SCORED_MODULES.length
      )
    : 0,
  // Progress is measured against reachable modules, not locked ones.
  overallProgressPercent: AVAILABLE_MODULES.length
    ? Math.round((COMPLETED_MODULES.length / AVAILABLE_MODULES.length) * 100)
    : 0,
  dayStreak: 6,
}

export const getModule = (moduleId) =>
  ALL_MODULES.find((module) => module.id === moduleId)

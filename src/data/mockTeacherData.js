/**
 * Mock teacher/class data. Static per CLAUDE.md.
 *
 * Class-wide stats are DERIVED from the roster below rather than hardcoded, so
 * the headline numbers can never contradict the table underneath them.
 */

export const TEACHER = {
  id: "tch_204",
  name: "Ms. Alvarez",
  school: "Westbrook High School",
  className: "Period 3 — Financial Literacy",
  classCode: "EDURA-2026",
}

/** A student is flagged when they're scoring under 60% or haven't started. */
export const FALLING_BEHIND_SCORE = 60

export const ROSTER = [
  {
    id: "stu_10428",
    name: "Jordan Ellis",
    initials: "JE",
    modulesCompleted: 3,
    avgQuizScore: 86,
    completionPercent: 43,
    lastActive: "Today",
  },
  {
    id: "stu_10431",
    name: "Priya Raman",
    initials: "PR",
    modulesCompleted: 6,
    avgQuizScore: 94,
    completionPercent: 86,
    lastActive: "Today",
  },
  {
    id: "stu_10435",
    name: "Marcus Webb",
    initials: "MW",
    modulesCompleted: 5,
    avgQuizScore: 88,
    completionPercent: 71,
    lastActive: "Yesterday",
  },
  {
    id: "stu_10440",
    name: "Aisha Bello",
    initials: "AB",
    modulesCompleted: 4,
    avgQuizScore: 79,
    completionPercent: 57,
    lastActive: "2 days ago",
  },
  {
    id: "stu_10442",
    name: "Tyler Nguyen",
    initials: "TN",
    modulesCompleted: 2,
    avgQuizScore: 54,
    completionPercent: 29,
    lastActive: "4 days ago",
  },
  {
    id: "stu_10447",
    name: "Sofia Castillo",
    initials: "SC",
    modulesCompleted: 4,
    avgQuizScore: 81,
    completionPercent: 57,
    lastActive: "Yesterday",
  },
  {
    id: "stu_10450",
    name: "Devon Clarke",
    initials: "DC",
    modulesCompleted: 0,
    avgQuizScore: 0,
    completionPercent: 0,
    lastActive: "Never",
  },
  {
    id: "stu_10455",
    name: "Hana Kimura",
    initials: "HK",
    modulesCompleted: 5,
    avgQuizScore: 90,
    completionPercent: 71,
    lastActive: "Today",
  },
]

/** Students who have actually attempted something, for score averaging. */
const ACTIVE = ROSTER.filter((s) => s.modulesCompleted > 0)

export const CLASS_STATS = {
  activeStudents: ACTIVE.length,
  totalEnrolled: ROSTER.length,
  avgClassScore: ACTIVE.length
    ? Math.round(
        ACTIVE.reduce((sum, s) => sum + s.avgQuizScore, 0) / ACTIVE.length
      )
    : 0,
  // Completion is measured across everyone enrolled, including non-starters.
  completionRate: ROSTER.length
    ? Math.round(
        ROSTER.reduce((sum, s) => sum + s.completionPercent, 0) / ROSTER.length
      )
    : 0,
}

export function isFallingBehind(student) {
  return student.modulesCompleted === 0 || student.avgQuizScore < FALLING_BEHIND_SCORE
}

/** Chart 1 — average score per module across the class. */
export const AVG_SCORE_BY_MODULE = [
  { module: "How Money Works", short: "Money", avgScore: 91 },
  { module: "Banking Without the Confusion", short: "Banking", avgScore: 86 },
  { module: "Credit: Your Financial Reputation", short: "Credit", avgScore: 74 },
  { module: "Budgeting That Doesn't Suck", short: "Budgeting", avgScore: 83 },
  { module: "Decode Your First Paycheck", short: "Paycheck", avgScore: 78 },
  { module: "Student Loans Demystified", short: "Loans", avgScore: 69 },
]

/** Chart 2 — class completion rate over the last four weeks. */
export const COMPLETION_BY_WEEK = [
  { week: "Week 1", label: "Aug 4", completionRate: 12 },
  { week: "Week 2", label: "Aug 11", completionRate: 24 },
  { week: "Week 3", label: "Aug 18", completionRate: 35 },
  { week: "Week 4", label: "Aug 25", completionRate: 52 },
]

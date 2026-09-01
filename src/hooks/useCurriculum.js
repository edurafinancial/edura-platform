import { useMemo } from "react"
import { CURRICULUM_MODULES } from "@/data/curriculumModules"
import { useProgress } from "@/state/ProgressProvider"

/**
 * Joins the generated curriculum registry with live student progress.
 *
 * The registry is the source of truth for what exists; the progress store is
 * the source of truth for where the student is. Nothing here is hardcoded.
 */

const TRACK_META = {
  foundations: {
    title: "Foundations Track",
    label: "Foundations",
    description: "Core money skills every student needs before graduation.",
  },
  advanced: {
    title: "Advanced Track",
    label: "Advanced",
    description: "Deeper topics for students ready to go further.",
  },
}

/** Rough reading time: lessons run ~2.5 minutes of prose each. */
const estimateMinutes = (lessonCount) => Math.max(5, Math.round(lessonCount * 2.5))

/** Percent of a module's lessons the student has reached. */
function lessonPercent(entry, lessonCount) {
  if (!entry) return 0
  const total = entry.totalSlides || lessonCount || 0
  if (!total) return 0
  return Math.min(100, Math.round(((entry.slidesViewed ?? 0) / total) * 100))
}

function decorate(module, entry) {
  const percent = entry?.completed ? 100 : lessonPercent(entry, module.lessonCount)
  const started = Boolean(entry && ((entry.slidesViewed ?? 0) > 0 || entry.quizScore != null))

  let status = "start"
  if (entry?.completed) status = "completed"
  else if (started) status = "in-progress"

  return {
    ...module,
    summary: module.description,
    trackId: module.track,
    trackLabel: TRACK_META[module.track]?.label ?? module.track,
    estimatedMinutes: estimateMinutes(module.lessonCount),
    quizScore: entry?.quizScore ?? null,
    progressPercent: percent,
    status,
  }
}

/** Every module, decorated with live progress. */
export function useModules() {
  const { modules: progress } = useProgress()
  return useMemo(
    () => CURRICULUM_MODULES.map((m) => decorate(m, progress[m.id])),
    [progress]
  )
}

/** One module by id, decorated with live progress. */
export function useModule(moduleId) {
  const modules = useModules()
  return useMemo(
    () => modules.find((m) => m.id === moduleId) ?? null,
    [modules, moduleId]
  )
}

/** Modules grouped into their tracks, in registry order. */
export function useTracks() {
  const modules = useModules()
  return useMemo(() => {
    const byTrack = new Map()
    for (const module of modules) {
      if (!byTrack.has(module.track)) byTrack.set(module.track, [])
      byTrack.get(module.track).push(module)
    }
    return [...byTrack.entries()].map(([id, trackModules]) => ({
      id,
      title: TRACK_META[id]?.title ?? id,
      label: TRACK_META[id]?.label ?? id,
      description: TRACK_META[id]?.description ?? "",
      modules: trackModules.map((m, i) => ({ ...m, order: i + 1 })),
    }))
  }, [modules])
}

/** Tab filters for the catalog grid, derived from the tracks that exist. */
export function useTrackFilters() {
  const tracks = useTracks()
  return useMemo(
    () => [
      { id: "all", label: "All Tracks" },
      ...tracks.map((track) => ({ id: track.id, label: track.label })),
    ],
    [tracks]
  )
}

/** Headline dashboard numbers, all derived from live progress. */
export function useDashboardStats() {
  const modules = useModules()
  const { dayStreak } = useProgress()

  return useMemo(() => {
    const completed = modules.filter((m) => m.status === "completed")
    const scored = modules.filter((m) => typeof m.quizScore === "number")
    // Overall progress counts partial lesson progress, so working through a
    // module moves the bar rather than only completing one.
    const totalPercent = modules.reduce((sum, m) => sum + m.progressPercent, 0)

    return {
      modulesCompleted: completed.length,
      modulesAvailable: modules.length,
      averageQuizScore: scored.length
        ? Math.round(scored.reduce((sum, m) => sum + m.quizScore, 0) / scored.length)
        : 0,
      overallProgressPercent: modules.length
        ? Math.round(totalPercent / modules.length)
        : 0,
      dayStreak,
    }
  }, [modules, dayStreak])
}

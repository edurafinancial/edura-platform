/**
 * Catalog view of the curriculum.
 *
 * Module identity and content counts have a single source of truth in the
 * generated registry; the dashboard adds the per-student progress layer. This
 * file only shapes that data for the catalog grid.
 */

import { TRACKS } from "@/data/mockDashboardData"

const TRACK_LABELS = {
  foundations: "Foundations",
  advanced: "Advanced",
}

export const CATALOG_TRACKS = TRACKS.map((track) => ({
  id: track.id,
  title: track.title,
  label: TRACK_LABELS[track.id] ?? track.title,
  description: track.description,
  modules: track.modules.map((module) => ({
    ...module,
    trackId: track.id,
    trackLabel: TRACK_LABELS[track.id] ?? track.title,
    quizCount: module.questionCount ? 1 : 0,
  })),
}))

export const CATALOG_MODULES = CATALOG_TRACKS.flatMap((track) => track.modules)

/** Tab filters for the catalog grid. */
export const TRACK_FILTERS = [
  { id: "all", label: "All Tracks" },
  ...CATALOG_TRACKS.map((track) => ({ id: track.id, label: track.label })),
]

export function getModulesForTrack(trackId) {
  if (trackId === "all") return CATALOG_MODULES
  return CATALOG_MODULES.filter((module) => module.trackId === trackId)
}

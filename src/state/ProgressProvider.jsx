import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

/**
 * Live student progress.
 *
 * There is no backend yet, so state persists to localStorage on this device.
 * The shape mirrors what an API would return, so swapping the storage layer
 * for real requests should not touch any consuming component.
 */

const STORAGE_KEY = "edura.progress.v1"

const EMPTY_STATE = { modules: {}, activeDays: [] }

const ProgressContext = createContext(null)

const today = () => new Date().toISOString().slice(0, 10)

function readStored() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY_STATE
    const parsed = JSON.parse(raw)
    return {
      modules: parsed.modules ?? {},
      activeDays: Array.isArray(parsed.activeDays) ? parsed.activeDays : [],
    }
  } catch {
    // Private browsing, cleared storage, or corrupt JSON — start fresh.
    return EMPTY_STATE
  }
}

/** Consecutive days with activity, counting back from today. */
function computeStreak(activeDays) {
  if (!activeDays.length) return 0
  const days = new Set(activeDays)
  let streak = 0
  const cursor = new Date()
  // Allow the streak to still count if today has no activity yet.
  if (!days.has(cursor.toISOString().slice(0, 10))) {
    cursor.setDate(cursor.getDate() - 1)
  }
  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

export function ProgressProvider({ children }) {
  const [state, setState] = useState(readStored)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // Storage can be unavailable; progress simply won't survive a reload.
    }
  }, [state])

  /** Applies an update to one module and stamps today as an active day. */
  const updateModule = useCallback((moduleId, patch) => {
    setState((prev) => {
      const current = prev.modules[moduleId] ?? {}
      const next = { ...current, ...patch, updatedAt: new Date().toISOString() }
      const day = today()
      return {
        modules: { ...prev.modules, [moduleId]: next },
        activeDays: prev.activeDays.includes(day)
          ? prev.activeDays
          : [...prev.activeDays, day],
      }
    })
  }, [])

  const recordSlideView = useCallback(
    (moduleId, slideIndex, totalSlides) => {
      setState((prev) => {
        const current = prev.modules[moduleId] ?? {}
        const reached = Math.max(current.slidesViewed ?? 0, slideIndex + 1)
        // Nothing new to record — avoid a pointless write and re-render.
        if (reached === current.slidesViewed && current.totalSlides === totalSlides) {
          return prev
        }
        const day = today()
        return {
          modules: {
            ...prev.modules,
            [moduleId]: {
              ...current,
              slidesViewed: reached,
              totalSlides,
              updatedAt: new Date().toISOString(),
            },
          },
          activeDays: prev.activeDays.includes(day)
            ? prev.activeDays
            : [...prev.activeDays, day],
        }
      })
    },
    []
  )

  const recordQuizScore = useCallback(
    (moduleId, score) => updateModule(moduleId, { quizScore: score }),
    [updateModule]
  )

  const completeModule = useCallback(
    (moduleId) =>
      updateModule(moduleId, { completed: true, completedAt: new Date().toISOString() }),
    [updateModule]
  )

  const resetProgress = useCallback(() => setState(EMPTY_STATE), [])

  const value = useMemo(
    () => ({
      modules: state.modules,
      dayStreak: computeStreak(state.activeDays),
      hasProgress: Object.keys(state.modules).length > 0,
      recordSlideView,
      recordQuizScore,
      completeModule,
      resetProgress,
    }),
    [state, recordSlideView, recordQuizScore, completeModule, resetProgress]
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider")
  }
  return context
}

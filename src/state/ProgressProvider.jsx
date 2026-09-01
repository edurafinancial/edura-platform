import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { useAuth } from "@/state/AuthProvider"

/**
 * Student progress, persisted to Supabase for the signed-in user.
 *
 * Writes are optimistic: local state updates immediately so the UI stays
 * responsive, then the row is upserted. If Supabase is unreachable or the
 * schema hasn't been applied yet, the store falls back to localStorage and
 * exposes `syncError` so the UI can say so rather than silently losing work.
 */

const STORAGE_KEY = "edura.progress.v1"
const EMPTY_STATE = { modules: {}, activeDays: [], exam: null }

const ProgressContext = createContext(null)

const today = () => new Date().toISOString().slice(0, 10)

/* ------------------------------------------------------------ local cache --- */

function readLocal() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY_STATE
    const parsed = JSON.parse(raw)
    return {
      modules: parsed.modules ?? {},
      activeDays: Array.isArray(parsed.activeDays) ? parsed.activeDays : [],
      exam: parsed.exam ?? null,
    }
  } catch {
    return EMPTY_STATE
  }
}

function writeLocal(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Storage unavailable (private mode); nothing else to do.
  }
}

/* ----------------------------------------------------------------- streak --- */

function computeStreak(activeDays) {
  if (!activeDays.length) return 0
  const days = new Set(activeDays)
  let streak = 0
  const cursor = new Date()
  if (!days.has(cursor.toISOString().slice(0, 10))) {
    cursor.setDate(cursor.getDate() - 1)
  }
  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

/* -------------------------------------------------------------- row shapes --- */

const rowToModule = (row) => ({
  slidesViewed: row.slides_viewed ?? 0,
  totalSlides: row.total_slides ?? 0,
  quizScore: row.quiz_score ?? null,
  completed: Boolean(row.completed),
  completedAt: row.completed_at ?? null,
  updatedAt: row.updated_at ?? null,
})

const rowToExam = (row) =>
  row
    ? {
        attempts: row.attempts ?? 0,
        bestScore: row.best_score ?? 0,
        lastScore: row.last_score ?? null,
        passed: Boolean(row.passed),
        updatedAt: row.updated_at ?? null,
      }
    : null

/* ------------------------------------------------------------------ store --- */

export function ProgressProvider({ children }) {
  const { user, status: authStatus } = useAuth()
  const userId = user?.id ?? null

  const [state, setState] = useState(EMPTY_STATE)
  const [syncStatus, setSyncStatus] = useState("idle") // idle | loading | synced | local
  const [syncError, setSyncError] = useState(null)

  // True once we've loaded, so the local-cache writer doesn't clobber on boot.
  const loadedRef = useRef(false)

  /** Records a Supabase failure and drops back to local-only persistence. */
  const degrade = useCallback((error) => {
    setSyncError(error?.message ?? String(error))
    setSyncStatus("local")
  }, [])

  /* ---- load ---- */
  useEffect(() => {
    if (authStatus === "loading") return undefined
    let cancelled = false

    // Signed out, or Supabase not configured: use the local cache only.
    if (!isSupabaseConfigured || !userId) {
      setState(readLocal())
      setSyncStatus(isSupabaseConfigured ? "idle" : "local")
      loadedRef.current = true
      return undefined
    }

    setSyncStatus("loading")
    ;(async () => {
      try {
        const [modulesRes, examRes, daysRes] = await Promise.all([
          supabase.from("module_progress").select("*").eq("user_id", userId),
          supabase.from("exam_results").select("*").eq("user_id", userId).maybeSingle(),
          supabase.from("activity_days").select("day").eq("user_id", userId),
        ])

        const failure = modulesRes.error || examRes.error || daysRes.error
        if (failure) throw failure
        if (cancelled) return

        const modules = {}
        for (const row of modulesRes.data ?? []) {
          modules[row.module_id] = rowToModule(row)
        }

        setState({
          modules,
          exam: rowToExam(examRes.data),
          activeDays: (daysRes.data ?? []).map((r) => r.day),
        })
        setSyncStatus("synced")
        setSyncError(null)
      } catch (error) {
        if (cancelled) return
        // Most likely cause: the migration in supabase/migrations hasn't run.
        setState(readLocal())
        degrade(error)
      } finally {
        loadedRef.current = true
      }
    })()

    return () => {
      cancelled = true
    }
  }, [userId, authStatus, degrade])

  /* ---- local mirror (also the fallback when offline / unconfigured) ---- */
  useEffect(() => {
    if (!loadedRef.current) return
    writeLocal(state)
  }, [state])

  /* ---- writes ---- */

  const markActiveDay = useCallback(
    async (day) => {
      if (!isSupabaseConfigured || !userId) return
      const { error } = await supabase
        .from("activity_days")
        .upsert({ user_id: userId, day }, { onConflict: "user_id,day" })
      if (error) degrade(error)
    },
    [userId, degrade]
  )

  const pushModule = useCallback(
    async (moduleId, entry) => {
      if (!isSupabaseConfigured || !userId) return
      const { error } = await supabase.from("module_progress").upsert(
        {
          user_id: userId,
          module_id: moduleId,
          slides_viewed: entry.slidesViewed ?? 0,
          total_slides: entry.totalSlides ?? 0,
          quiz_score: entry.quizScore ?? null,
          completed: Boolean(entry.completed),
          completed_at: entry.completedAt ?? null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,module_id" }
      )
      if (error) degrade(error)
    },
    [userId, degrade]
  )

  /** Applies a local patch, then mirrors the result to Supabase. */
  const updateModule = useCallback(
    (moduleId, patch) => {
      const day = today()
      let nextEntry = null

      setState((prev) => {
        const current = prev.modules[moduleId] ?? {}
        nextEntry = { ...current, ...patch, updatedAt: new Date().toISOString() }
        return {
          ...prev,
          modules: { ...prev.modules, [moduleId]: nextEntry },
          activeDays: prev.activeDays.includes(day)
            ? prev.activeDays
            : [...prev.activeDays, day],
        }
      })

      // setState's updater has already run synchronously above.
      if (nextEntry) pushModule(moduleId, nextEntry)
      markActiveDay(day)
    },
    [pushModule, markActiveDay]
  )

  const recordSlideView = useCallback(
    (moduleId, slideIndex, totalSlides) => {
      const day = today()
      let nextEntry = null
      let changed = false

      setState((prev) => {
        const current = prev.modules[moduleId] ?? {}
        const reached = Math.max(current.slidesViewed ?? 0, slideIndex + 1)
        if (reached === current.slidesViewed && current.totalSlides === totalSlides) {
          return prev
        }
        changed = true
        nextEntry = {
          ...current,
          slidesViewed: reached,
          totalSlides,
          updatedAt: new Date().toISOString(),
        }
        return {
          ...prev,
          modules: { ...prev.modules, [moduleId]: nextEntry },
          activeDays: prev.activeDays.includes(day)
            ? prev.activeDays
            : [...prev.activeDays, day],
        }
      })

      if (changed && nextEntry) {
        pushModule(moduleId, nextEntry)
        markActiveDay(day)
      }
    },
    [pushModule, markActiveDay]
  )

  const recordQuizScore = useCallback(
    (moduleId, score) => updateModule(moduleId, { quizScore: score }),
    [updateModule]
  )

  const completeModule = useCallback(
    (moduleId) =>
      updateModule(moduleId, {
        completed: true,
        completedAt: new Date().toISOString(),
      }),
    [updateModule]
  )

  const recordExamAttempt = useCallback(
    (score, passed) => {
      const day = today()
      let nextExam = null

      setState((prev) => {
        const previous = prev.exam ?? { attempts: 0, bestScore: 0, passed: false }
        nextExam = {
          attempts: previous.attempts + 1,
          bestScore: Math.max(previous.bestScore, score),
          lastScore: score,
          // An earned certificate is never revoked by a later failed retake.
          passed: previous.passed || passed,
          updatedAt: new Date().toISOString(),
        }
        return {
          ...prev,
          exam: nextExam,
          activeDays: prev.activeDays.includes(day)
            ? prev.activeDays
            : [...prev.activeDays, day],
        }
      })

      if (isSupabaseConfigured && userId && nextExam) {
        supabase
          .from("exam_results")
          .upsert(
            {
              user_id: userId,
              attempts: nextExam.attempts,
              best_score: nextExam.bestScore,
              last_score: nextExam.lastScore,
              passed: nextExam.passed,
              updated_at: nextExam.updatedAt,
            },
            { onConflict: "user_id" }
          )
          .then(({ error }) => {
            if (error) degrade(error)
          })
        markActiveDay(day)
      }
    },
    [userId, degrade, markActiveDay]
  )

  const resetProgress = useCallback(async () => {
    setState(EMPTY_STATE)
    writeLocal(EMPTY_STATE)
    if (!isSupabaseConfigured || !userId) return
    const results = await Promise.all([
      supabase.from("module_progress").delete().eq("user_id", userId),
      supabase.from("exam_results").delete().eq("user_id", userId),
      supabase.from("activity_days").delete().eq("user_id", userId),
    ])
    const failure = results.find((r) => r.error)
    if (failure) degrade(failure.error)
  }, [userId, degrade])

  const value = useMemo(
    () => ({
      modules: state.modules,
      exam: state.exam,
      dayStreak: computeStreak(state.activeDays),
      hasProgress: Object.keys(state.modules).length > 0 || Boolean(state.exam),
      syncStatus,
      syncError,
      recordSlideView,
      recordQuizScore,
      completeModule,
      recordExamAttempt,
      resetProgress,
    }),
    [
      state,
      syncStatus,
      syncError,
      recordSlideView,
      recordQuizScore,
      completeModule,
      recordExamAttempt,
      resetProgress,
    ]
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) throw new Error("useProgress must be used within a ProgressProvider")
  return context
}

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"

/**
 * Supabase auth session.
 *
 * `status` is "loading" until the initial session check resolves, so route
 * guards never redirect a signed-in user during the first render.
 */

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [status, setStatus] = useState(isSupabaseConfigured ? "loading" : "disabled")
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined
    let cancelled = false

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (cancelled) return
        setSession(data.session ?? null)
        setStatus("ready")
      })
      .catch(() => {
        if (!cancelled) setStatus("ready")
      })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next ?? null)
      setStatus("ready")
    })

    return () => {
      cancelled = true
      listener?.subscription?.unsubscribe()
    }
  }, [])

  const signInWithGitHub = useCallback(async () => {
    if (!isSupabaseConfigured) return
    setError(null)
    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: `${window.location.origin}/` },
    })
    if (signInError) setError(signInError.message)
  }, [])

  const signOut = useCallback(async () => {
    if (!isSupabaseConfigured) return
    await supabase.auth.signOut()
  }, [])

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      status,
      isAuthenticated: Boolean(session),
      isConfigured: isSupabaseConfigured,
      error,
      signInWithGitHub,
      signOut,
    }),
    [session, status, error, signInWithGitHub, signOut]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}

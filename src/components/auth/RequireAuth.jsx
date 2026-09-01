import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "@/state/AuthProvider"
import RouteFallback from "@/components/shared/RouteFallback"

/**
 * Gate for authenticated routes. Renders a loading state while the initial
 * session check runs, so a signed-in user is never bounced to /login on
 * refresh, then redirects with the attempted path so login can return there.
 */
export default function RequireAuth() {
  const { isAuthenticated, status } = useAuth()
  const location = useLocation()

  if (status === "loading") return <RouteFallback />

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}

import { useEffect, useState } from "react"

/**
 * Simulates async state hydration so skeleton loaders are exercised while the
 * app still runs on static mock data. Swap for real request state once a
 * backend exists.
 *
 * @param {number} [delay] Milliseconds before the data is considered ready.
 */
export default function useHydrated(delay = 1000) {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHydrated(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return hydrated
}

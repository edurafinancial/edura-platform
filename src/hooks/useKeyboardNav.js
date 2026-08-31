import { useEffect } from "react"
import shouldIgnoreKeyEvent from "@/hooks/keyboardGuard"

/**
 * Left / Right arrow keys drive slide navigation in the Lesson Viewer.
 *
 * @param {object}   options
 * @param {Function} options.onPrev    Left Arrow handler.
 * @param {Function} options.onNext    Right Arrow handler.
 * @param {boolean}  [options.enabled] Set false to suspend the bindings.
 */
export default function useKeyboardNav({ onPrev, onNext, enabled = true }) {
  useEffect(() => {
    if (!enabled) return undefined

    function handleKeyDown(event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return
      if (shouldIgnoreKeyEvent(event)) return

      if (event.key === "ArrowLeft") {
        onPrev?.()
      } else {
        onNext?.()
      }
      event.preventDefault()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onPrev, onNext, enabled])
}

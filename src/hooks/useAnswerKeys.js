import { useEffect } from "react"
import shouldIgnoreKeyEvent from "@/hooks/keyboardGuard"

/**
 * Number keys 1-4 select a quiz answer, per the accessibility requirements
 * in CLAUDE.md.
 *
 * @param {object}   options
 * @param {Function} options.onSelect  Receives the zero-based option index.
 * @param {number}   options.count     How many options are selectable.
 * @param {boolean}  [options.enabled] Set false once an answer is locked in.
 */
export default function useAnswerKeys({ onSelect, count, enabled = true }) {
  useEffect(() => {
    if (!enabled) return undefined

    function handleKeyDown(event) {
      if (shouldIgnoreKeyEvent(event)) return

      const index = Number(event.key) - 1
      if (!Number.isInteger(index) || index < 0 || index >= count) return

      onSelect?.(index)
      event.preventDefault()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onSelect, count, enabled])
}

/**
 * Shared guard for global key bindings: don't hijack keys while the user is
 * typing or driving another widget.
 */
export default function shouldIgnoreKeyEvent(event) {
  if (event.defaultPrevented) return true
  if (event.metaKey || event.ctrlKey || event.altKey) return true

  const el = event.target
  if (!(el instanceof HTMLElement)) return false

  const tag = el.tagName
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true
  if (el.isContentEditable) return true

  // Radix Tabs binds Left/Right to move between triggers. If focus is inside
  // a tablist, that behaviour wins over our bindings.
  if (el.closest('[role="tablist"]')) return true

  return false
}

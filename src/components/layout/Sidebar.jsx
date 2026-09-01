import { NavLink } from "react-router-dom"
import {
  BarChart3,
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  LifeBuoy,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { STUDENT } from "@/data/student"

export const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/curriculum", label: "Curriculum", icon: BookOpen },
  { to: "/teacher", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/support", label: "Support", icon: LifeBuoy },
]

function NavItem({ item, onNavigate }) {
  const Icon = item.icon
  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-navy",
          isActive
            ? "bg-white/10 text-white"
            : "text-white/65 hover:bg-white/5 hover:text-white"
        )
      }
    >
      {({ isActive }) => (
        <>
          {/* Active indicator rail */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-teal transition-opacity",
              isActive ? "opacity-100" : "opacity-0"
            )}
          />
          <Icon
            className={cn(
              "h-[18px] w-[18px] shrink-0 transition-colors",
              isActive ? "text-teal" : "text-white/55 group-hover:text-white/80"
            )}
          />
          {item.label}
        </>
      )}
    </NavLink>
  )
}

/**
 * Sidebar body — shared by the desktop rail and the mobile drawer so the
 * two can never drift apart.
 */
export function SidebarContent({ onNavigate }) {
  return (
    <div className="flex h-full flex-col bg-navy">
      <div className="flex items-center gap-3 px-5 py-6">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal text-white">
          <GraduationCap className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="font-display text-lg leading-tight text-white">Edura</p>
          <p className="truncate text-xs text-white/50">Financial</p>
        </div>
      </div>

      <nav aria-label="Main" className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.to} item={item} onNavigate={onNavigate} />
        ))}
      </nav>

      <div className="mt-auto border-t border-white/10 p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white">
            {STUDENT.initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">
              {STUDENT.fullName}
            </p>
            <p className="truncate text-xs text-white/50">{STUDENT.school}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Persistent desktop rail. Hidden below lg, where the drawer takes over. */
export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 lg:block">
      <SidebarContent />
    </aside>
  )
}

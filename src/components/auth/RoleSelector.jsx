import { GraduationCap, Users } from "lucide-react"
import { cn } from "@/lib/utils"

const ROLES = [
  {
    id: "student",
    label: "Student",
    description: "Learn at your own pace",
    icon: GraduationCap,
  },
  {
    id: "teacher",
    label: "Teacher / Admin",
    description: "Track class progress",
    icon: Users,
  },
]

/** Card-style role picker shown on the Sign Up tab. */
export default function RoleSelector({ value, onChange }) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-navy">
        I'm signing up as
      </legend>

      <div className="grid grid-cols-2 gap-3">
        {ROLES.map((role) => {
          const Icon = role.icon
          const selected = value === role.id

          return (
            <button
              key={role.id}
              type="button"
              onClick={() => onChange(role.id)}
              aria-pressed={selected}
              className={cn(
                "flex flex-col items-start gap-2 rounded-xl border-2 p-4 text-left transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2",
                selected
                  ? "border-teal bg-teal-50"
                  : "border-border bg-white hover:border-teal/50 hover:bg-teal-50/40"
              )}
            >
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                  selected ? "bg-teal text-white" : "bg-muted text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold text-navy">{role.label}</span>
              <span className="text-xs leading-snug text-muted-foreground">
                {role.description}
              </span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

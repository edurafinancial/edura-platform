import { CheckCircle2, Circle, Loader2, Lock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export const STATUS_CONFIG = {
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className: "border-transparent bg-teal text-white hover:bg-teal",
  },
  "in-progress": {
    label: "In Progress",
    icon: Loader2,
    className: "border-transparent bg-gold text-navy hover:bg-gold",
  },
  start: {
    label: "Start",
    icon: Circle,
    className: "border-teal bg-transparent text-teal hover:bg-teal-50",
  },
  "coming-soon": {
    label: "Coming Soon",
    icon: Lock,
    className: "border-transparent bg-muted text-muted-foreground",
  },
}

export default function StatusBadge({ status, className }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.start
  const Icon = config.icon

  return (
    <Badge
      variant="outline"
      className={cn("gap-1.5 rounded-full px-2.5 py-1", config.className, className)}
    >
      <Icon className="h-3 w-3" aria-hidden="true" />
      {config.label}
    </Badge>
  )
}

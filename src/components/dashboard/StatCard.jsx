import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export function StatCardSkeleton() {
  return (
    <Card>
      <CardContent className="space-y-3 p-5">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-3 w-32" />
      </CardContent>
    </Card>
  )
}

/**
 * Stat tile. Numbers render in JetBrains Mono via `.text-stat` per the
 * brand spec. Pass `progress` to render a bar beneath the value.
 */
export default function StatCard({
  label,
  value,
  suffix,
  caption,
  icon: Icon,
  progress,
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
    >
      <Card className="h-full border-border/70 shadow-sm">
        <CardContent className="p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            {Icon ? (
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
            ) : null}
          </div>

          <p className="mt-3 flex items-baseline gap-1">
            <span className="text-stat text-3xl font-semibold text-navy">
              {value}
            </span>
            {suffix ? (
              <span className="text-stat text-lg font-medium text-muted-foreground">
                {suffix}
              </span>
            ) : null}
          </p>

          {typeof progress === "number" ? (
            <Progress
              value={progress}
              className={cn("mt-4 h-2 bg-muted", "[&>*]:bg-teal")}
            />
          ) : null}

          {caption ? (
            <p className="mt-2 text-xs text-muted-foreground">{caption}</p>
          ) : null}
        </CardContent>
      </Card>
    </motion.div>
  )
}

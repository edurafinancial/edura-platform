import { useState } from "react"
import { RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useProgress } from "@/state/ProgressProvider"
import { useDashboardStats } from "@/hooks/useCurriculum"

export default function Settings() {
  const { resetProgress, hasProgress } = useProgress()
  const stats = useDashboardStats()
  const [confirming, setConfirming] = useState(false)

  function handleReset() {
    resetProgress()
    setConfirming(false)
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl text-navy sm:text-4xl">Settings</h1>
        <p className="mt-1.5 text-muted-foreground">
          Profile, notification, and accessibility preferences will live here.
        </p>
      </header>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-navy">
            Learning progress
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Progress is stored on this device until accounts are connected to a
            backend.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <dl className="grid gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-sm text-muted-foreground">Modules completed</dt>
              <dd className="text-stat mt-0.5 text-2xl font-semibold text-navy">
                {stats.modulesCompleted}/{stats.modulesAvailable}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Overall progress</dt>
              <dd className="text-stat mt-0.5 text-2xl font-semibold text-navy">
                {stats.overallProgressPercent}%
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Day streak</dt>
              <dd className="text-stat mt-0.5 text-2xl font-semibold text-navy">
                {stats.dayStreak}
              </dd>
            </div>
          </dl>

          {confirming ? (
            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="flex-1 text-sm text-navy">
                This clears every completed module and quiz score on this device.
              </p>
              <Button variant="outline" onClick={() => setConfirming(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleReset}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                Reset everything
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              disabled={!hasProgress}
              onClick={() => setConfirming(true)}
              className="gap-1.5"
            >
              <RotateCcw className="h-4 w-4" />
              Reset my progress
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

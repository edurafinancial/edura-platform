import { motion } from "framer-motion";
import { Flame, GraduationCap, Target, TrendingUp } from "lucide-react";
import StatCard, { StatCardSkeleton } from "@/components/dashboard/StatCard";
import TrackTimeline from "@/components/dashboard/TrackTimeline";
import { Separator } from "@/components/ui/separator";
import useHydrated from "@/hooks/useHydrated";
import { DASHBOARD_STATS, STUDENT, TRACKS } from "@/data/mockDashboardData";

export default function StudentDashboard() {
  const hydrated = useHydrated();
  const stats = DASHBOARD_STATS;

  return (
    <div className="space-y-8">
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex flex-wrap items-center justify-between gap-3"
      >
        <div>
          <h1 className="font-display text-3xl text-navy sm:text-4xl">
            Welcome back, {STUDENT.name}
          </h1>
          <p className="mt-1.5 text-muted-foreground">
            You're{" "}
            <span className="text-stat font-medium text-teal">
              {stats.overallProgressPercent}%
            </span>{" "}
            through your pathway — keep the momentum going.
          </p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-gold-50 px-3 py-1.5 text-sm font-medium text-navy">
          <Flame className="h-4 w-4 text-gold-500" aria-hidden="true" />
          <span className="text-stat">{stats.dayStreak}</span> day streak
        </span>
      </motion.header>

      <section aria-label="Your progress">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {!hydrated ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              <StatCard
                label="Modules Completed"
                value={stats.modulesCompleted}
                suffix={`/ ${stats.modulesAvailable}`}
                caption="Across Foundations and Advanced"
                icon={GraduationCap}
                delay={0}
              />
              <StatCard
                label="Avg Quiz Score"
                value={stats.averageQuizScore}
                suffix="%"
                caption="Average across graded modules"
                icon={Target}
                delay={0.08}
              />
              <StatCard
                label="Overall Progress"
                value={stats.overallProgressPercent}
                suffix="%"
                progress={stats.overallProgressPercent}
                caption={`${stats.modulesAvailable - stats.modulesCompleted} modules remaining`}
                icon={TrendingUp}
                delay={0.16}
              />
            </>
          )}
        </div>
      </section>

      <Separator />

      <div className="space-y-10">
        {TRACKS.map((track) => (
          <TrackTimeline key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
}

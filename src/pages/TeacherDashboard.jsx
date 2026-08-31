import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Copy, FileText, GraduationCap, Target, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import StatCard from "@/components/dashboard/StatCard"
import AnalyticsCharts from "@/components/teacher/AnalyticsCharts"
import ClassRoster from "@/components/teacher/ClassRoster"
import { CLASS_STATS, TEACHER } from "@/data/mockTeacherData"

function ClassCodeBox() {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(TEACHER.classCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard can be blocked by permissions; the code stays readable.
    }
  }

  return (
    <div className="flex items-center gap-4 rounded-xl border border-teal-200 bg-teal-50/60 px-4 py-3">
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-teal-700">
          Join Code
        </p>
        <p className="text-stat mt-0.5 text-xl font-semibold tracking-wider text-navy">
          {TEACHER.classCode}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        aria-label="Copy join code"
        className="shrink-0 text-teal hover:bg-teal-100 hover:text-teal-700"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  )
}

export default function TeacherDashboard() {
  const stats = CLASS_STATS

  return (
    <div className="space-y-8">
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="space-y-4"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl text-navy sm:text-4xl">
              Welcome back, {TEACHER.name}
            </h1>
            <p className="mt-1.5 text-muted-foreground">
              {TEACHER.className} · {TEACHER.school}
            </p>
          </div>

          <Button className="shrink-0 gap-1.5 bg-teal hover:bg-teal-600">
            <FileText className="h-4 w-4" />
            New Report
          </Button>
        </div>

        <ClassCodeBox />
      </motion.header>

      <section aria-label="Class metrics">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            label="Active Students"
            value={stats.activeStudents}
            suffix={`/ ${stats.totalEnrolled}`}
            caption="Students who have started the pathway"
            icon={Users}
            delay={0}
          />
          <StatCard
            label="Avg Class Score"
            value={stats.avgClassScore}
            suffix="%"
            caption="Across all graded attempts"
            icon={Target}
            delay={0.08}
          />
          <StatCard
            label="Overall Completion Rate"
            value={stats.completionRate}
            suffix="%"
            progress={stats.completionRate}
            caption="Average pathway progress per student"
            icon={GraduationCap}
            delay={0.16}
          />
        </div>
      </section>

      <AnalyticsCharts />

      <ClassRoster />
    </div>
  )
}

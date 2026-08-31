import { Link } from "react-router-dom"
import { AlertTriangle } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { ROSTER, isFallingBehind } from "@/data/mockTeacherData"

function ScoreCell({ score, hasStarted }) {
  if (!hasStarted) {
    return <span className="text-sm text-muted-foreground">—</span>
  }
  return (
    <span
      className={cn(
        "text-stat font-medium",
        score < 60 ? "text-red-600" : "text-navy"
      )}
    >
      {score}%
    </span>
  )
}

export default function ClassRoster() {
  const flaggedCount = ROSTER.filter(isFallingBehind).length

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2 pb-3">
        <div>
          <CardTitle className="text-base font-semibold text-navy">
            Class Roster
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            <span className="text-stat">{ROSTER.length}</span> students enrolled
          </p>
        </div>
        {flaggedCount > 0 ? (
          <span className="flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700">
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-stat">{flaggedCount}</span> falling behind
          </span>
        ) : null}
      </CardHeader>

      <CardContent className="px-0 pb-2 sm:px-6 sm:pb-4">
        {/* Table scrolls inside its own container on narrow screens */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-navy">Student</TableHead>
                <TableHead className="text-navy">Modules</TableHead>
                <TableHead className="text-navy">Avg Score</TableHead>
                <TableHead className="min-w-[160px] text-navy">
                  Completion
                </TableHead>
                <TableHead className="text-right text-navy">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {ROSTER.map((student) => {
                const flagged = isFallingBehind(student)
                const hasStarted = student.modulesCompleted > 0

                return (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span className="text-stat flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy/5 text-xs font-semibold text-navy">
                          {student.initials}
                        </span>
                        <div className="min-w-0">
                          <p className="flex items-center gap-1.5 font-medium text-navy">
                            <span className="truncate">{student.name}</span>
                            {flagged ? (
                              <span
                                className="flex items-center"
                                title={
                                  hasStarted
                                    ? "Scoring below 60%"
                                    : "Hasn't started any modules"
                                }
                              >
                                <AlertTriangle
                                  className="h-3.5 w-3.5 shrink-0 text-red-500"
                                  aria-hidden="true"
                                />
                                <span className="sr-only">Falling behind</span>
                              </span>
                            ) : null}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {student.lastActive}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="text-stat text-navy">
                        {student.modulesCompleted}
                      </span>
                    </TableCell>

                    <TableCell>
                      <ScoreCell
                        score={student.avgQuizScore}
                        hasStarted={hasStarted}
                      />
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Progress
                          value={student.completionPercent}
                          className="h-1.5 w-24 bg-muted [&>*]:bg-teal"
                        />
                        <span className="text-stat text-sm text-muted-foreground">
                          {student.completionPercent}%
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="text-teal hover:bg-teal-50 hover:text-teal-600"
                      >
                        <Link to={`/teacher/student/${student.id}`}>
                          View Profile
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

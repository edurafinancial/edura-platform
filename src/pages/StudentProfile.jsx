import { useParams } from "react-router-dom"
import PagePlaceholder from "@/components/shared/PagePlaceholder"
import { ROSTER } from "@/data/mockTeacherData"

export default function StudentProfile() {
  const { studentId } = useParams()
  const student = ROSTER.find((s) => s.id === studentId)

  return (
    <PagePlaceholder
      title={student ? student.name : "Student Profile"}
      description="Per-student module history, quiz attempts, and time-on-task land here."
      meta={`student: ${studentId}`}
    />
  )
}

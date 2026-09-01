import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router-dom"
import AppShell from "@/components/layout/AppShell"
import RouteFallback from "@/components/shared/RouteFallback"
import AuthScreen from "@/pages/AuthScreen"
import StudentDashboard from "@/pages/StudentDashboard"
import LessonViewer from "@/pages/LessonViewer"
import QuizInterface from "@/pages/QuizInterface"
import CurriculumCatalog from "@/pages/CurriculumCatalog"
import CertificationExam from "@/pages/CertificationExam"
import Settings from "@/pages/Settings"
import Support from "@/pages/Support"
import NotFound from "@/pages/NotFound"

// Teacher views pull in Recharts, which dominates the bundle. Students never
// visit these routes, so the chunk is fetched on demand instead of up front.
const TeacherDashboard = lazy(() => import("@/pages/TeacherDashboard"))
const StudentProfile = lazy(() => import("@/pages/StudentProfile"))

export default function App() {
  return (
    <Routes>
      {/* Auth sits outside the app shell — no sidebar on the login screen. */}
      <Route path="/login" element={<AuthScreen />} />

      <Route element={<AppShell />}>
        <Route index element={<StudentDashboard />} />
        <Route path="lesson/:id" element={<LessonViewer />} />
        <Route path="quiz/:id" element={<QuizInterface />} />
        <Route
          path="teacher"
          element={
            <Suspense fallback={<RouteFallback />}>
              <TeacherDashboard />
            </Suspense>
          }
        />
        <Route
          path="teacher/student/:studentId"
          element={
            <Suspense fallback={<RouteFallback />}>
              <StudentProfile />
            </Suspense>
          }
        />
        <Route path="curriculum" element={<CurriculumCatalog />} />
        <Route path="exam" element={<CertificationExam />} />
        <Route path="settings" element={<Settings />} />
        <Route path="support" element={<Support />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

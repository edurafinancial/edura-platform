import { Route, Routes } from "react-router";
import Error404Page from "./pages/Error404Page";
import LearningPage from "./pages/LearningPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LearningPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
}

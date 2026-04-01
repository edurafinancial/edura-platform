import { Route, Routes } from "react-router";
import LearningPage from "./pages/LearningPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<LearningPage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

import { Route, Routes } from "react-router";
import Error404Page from "./pages/Error404Page";
import LearningPage from "./pages/LearningPage";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<LearningPage />} />
			<Route path="*" element={<Error404Page />} />
		</Routes>
	);
}

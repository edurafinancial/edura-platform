import { useState } from "react";
import { Auth, Dashboard, Lesson, Quiz } from "../components/shared/learning";
import { doSave, loadProgress, loadUser } from "../shared/learning/storage";

export default function LearningPage() {
	const [user, setUser] = useState(loadUser);
	const [progress, setProgress] = useState(loadProgress);
	const [screen, setScreen] = useState("dashboard");
	const [curMod, setCurMod] = useState(null);

	if (!user)
		return (
			<Auth
				onLogin={(u) => {
					setUser(u);
					setScreen("dashboard");
				}}
			/>
		);
	if (screen === "lesson" && curMod)
		return (
			<Lesson
				mod={curMod}
				onBack={() => {
					setScreen("dashboard");
					setCurMod(null);
				}}
				onQuiz={() => setScreen("quiz")}
			/>
		);
	if (screen === "quiz" && curMod)
		return (
			<Quiz
				mod={curMod}
				onBack={() => {
					setScreen("dashboard");
					setCurMod(null);
				}}
				onComplete={(score) => {
					const u = { ...progress, [curMod.id]: { completed: true, score } };
					setProgress(u);
					doSave(u);
					setScreen("dashboard");
					setCurMod(null);
				}}
			/>
		);
	return (
		<Dashboard
			user={user}
			progress={progress}
			onSelect={(m) => {
				setCurMod(m);
				setScreen("lesson");
			}}
			onLogout={() => {
				setUser(null);
				localStorage.removeItem("edura-user");
			}}
		/>
	);
}

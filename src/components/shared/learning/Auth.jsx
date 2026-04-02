import { useState } from "react";
import { saveUser } from "../../../shared/learning/storage";
import AuthPage from "../../../pages/AuthPage";

export function Auth({ onLogin }) {
	const [mode, setMode] = useState("login");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [school, setSchool] = useState("");
	const [role, setRole] = useState("student");
	const [password, setPassword] = useState("");
	const [remember, setRemember] = useState(false);

	const submit = (eventOrValues) => {
		if (eventOrValues?.preventDefault) {
			eventOrValues.preventDefault();
		}
		const values =
			eventOrValues && !eventOrValues.preventDefault
				? eventOrValues
				: { name, email, school, role };
		if (!values.email?.trim()) return;
		const u = {
			name: mode === "signup"
				? values.name?.trim() || "Student"
				: values.email.trim().split("@")[0],
			email: values.email.trim(),
			school: values.school?.trim() || "",
			role: values.role || role,
		};
		saveUser(u);
		onLogin(u);
	};

		return (
		<AuthPage
			mode={mode}
			onModeChange={setMode}
			loginValues={{ email, password, remember }}
			signupDefaultValues={{ name, email, school, role }}
			onLoginSubmit={(values) => {
				setEmail(values.email);
				setPassword(values.password);
				setRemember(values.remember);
				submit(values);
			}}
			onSignupSubmit={(values) => {
				setName(values.name);
				setEmail(values.email);
				setSchool(values.school);
				setRole(values.role);
				submit(values);
			}}
		/>
	);
}

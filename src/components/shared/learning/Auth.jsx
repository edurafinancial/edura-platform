import { useState } from "react";
import { saveUser } from "../../../shared/learning/storage";
import LoginPage from "../../../pages/LoginPage";
import SignUpPage from "../../../pages/SignUpPage";

export function Auth({ onLogin }) {
	const [isSignup, setIsSignup] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [school, setSchool] = useState("");
	const [role, setRole] = useState("student");
	const [password, setPassword] = useState("");
	const [remember, setRemember] = useState(false);

	const submit = (event) => {
		event?.preventDefault();
		if (!email.trim()) return;
		const u = {
			name: isSignup ? name.trim() || "Student" : email.split("@")[0],
			email: email.trim(),
			school: school.trim(),
			role,
		};
		saveUser(u);
		onLogin(u);
	};

	if (isSignup) {
		return (
			<SignUpPage
				name={name}
				email={email}
				school={school}
				role={role}
				onNameChange={setName}
				onEmailChange={setEmail}
				onSchoolChange={setSchool}
				onRoleChange={setRole}
				onSubmit={submit}
				onSwitchMode={() => setIsSignup(false)}
			/>
		);
	}

	return (
		<LoginPage
			email={email}
			password={password}
			remember={remember}
			onEmailChange={setEmail}
			onPasswordChange={setPassword}
			onRememberChange={setRemember}
			onSubmit={submit}
			onSwitchMode={() => setIsSignup(true)}
		/>
	);
}

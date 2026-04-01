import { useState } from "react";
import { saveUser } from "../../../shared/learning/storage";
import { C, F } from "../../../shared/learning/theme";
import { Btn } from "./Btn";

export function Auth({ onLogin }) {
	const [isSignup, setIsSignup] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [school, setSchool] = useState("");
	const [role, setRole] = useState("student");
	const submit = () => {
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
	const inp = {
		padding: "14px 16px",
		borderRadius: 10,
		border: `1px solid ${C.border}`,
		fontFamily: F.body,
		fontSize: 15,
		outline: "none",
		width: "100%",
		boxSizing: "border-box",
	};
	return (
		<div
			style={{
				minHeight: "100vh",
				background: `linear-gradient(160deg, ${C.navy} 0%, #2A4A7A 50%, ${C.teal} 100%)`,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: 24,
			}}
		>
			<div
				style={{
					background: C.white,
					borderRadius: 24,
					padding: "48px 40px",
					maxWidth: 420,
					width: "100%",
					boxShadow: "0 24px 64px rgba(0,0,0,0.15)",
				}}
			>
				<div style={{ textAlign: "center", marginBottom: 32 }}>
					<div style={{ fontFamily: F.heading, fontSize: 28, fontWeight: 700 }}>
						<span style={{ color: C.navy }}>Edura</span>{" "}
						<span style={{ color: C.teal }}>Financial</span>
					</div>
					<p
						style={{
							fontFamily: F.body,
							fontSize: 14,
							color: C.text3,
							marginTop: 8,
						}}
					>
						Financial literacy for the next generation
					</p>
				</div>
				<div
					style={{
						display: "flex",
						gap: 4,
						marginBottom: 28,
						background: C.warmGray,
						borderRadius: 10,
						padding: 3,
					}}
				>
					{["Log In", "Sign Up"].map((t, i) => (
						<button
							key={t}
							onClick={() => setIsSignup(i === 1)}
							style={{
								flex: 1,
								padding: "10px 0",
								borderRadius: 8,
								border: "none",
								fontFamily: F.heading,
								fontSize: 14,
								fontWeight: 600,
								cursor: "pointer",
								background: (i === 0 ? !isSignup : isSignup)
									? C.white
									: "transparent",
								color: (i === 0 ? !isSignup : isSignup) ? C.navy : C.text3,
								boxShadow: (i === 0 ? !isSignup : isSignup)
									? "0 1px 4px rgba(0,0,0,0.06)"
									: "none",
								transition: "all 0.2s",
							}}
						>
							{t}
						</button>
					))}
				</div>
				<div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
					{isSignup && (
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Full name"
							style={inp}
						/>
					)}
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email address"
						style={inp}
					/>
					{isSignup && (
						<>
							<input
								value={school}
								onChange={(e) => setSchool(e.target.value)}
								placeholder="School name (optional)"
								style={inp}
							/>
							<div style={{ display: "flex", gap: 8 }}>
								{["student", "teacher"].map((r) => (
									<button
										key={r}
										onClick={() => setRole(r)}
										style={{
											flex: 1,
											padding: "12px 0",
											borderRadius: 10,
											border: `2px solid ${role === r ? C.teal : C.border}`,
											background: role === r ? `${C.teal}10` : "transparent",
											fontFamily: F.heading,
											fontSize: 14,
											fontWeight: 600,
											color: role === r ? C.teal : C.text3,
											cursor: "pointer",
											textTransform: "capitalize",
										}}
									>
										{r}
									</button>
								))}
							</div>
						</>
					)}
					{!isSignup && (
						<input type="password" placeholder="Password" style={inp} />
					)}
					<Btn onClick={submit} style={{ width: "100%", marginTop: 8 }}>
						{isSignup ? "Create Account" : "Log In"}
					</Btn>
				</div>
				<p
					style={{
						fontFamily: F.body,
						fontSize: 12,
						color: C.text3,
						textAlign: "center",
						marginTop: 20,
					}}
				>
					By continuing, you agree to Edura Financial's Terms of Service
				</p>
			</div>
		</div>
	);
}

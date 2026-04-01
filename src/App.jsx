import { useState } from "react";
import { TRACKS, MODULES } from "./content";

const F = {
	display: "'Playfair Display', Georgia, serif",
	heading: "'Outfit', sans-serif",
	body: "'Outfit', sans-serif",
	mono: "'JetBrains Mono', monospace",
};
const C = {
	teal: "#2A9D8F",
	navy: "#1B2A4A",
	gold: "#E9C46A",
	cream: "#FAFAF7",
	warmGray: "#F3F1ED",
	text1: "#1A1A1A",
	text2: "#6B7280",
	text3: "#9CA3AF",
	border: "#E5E5E0",
	white: "#FFF",
	green: "#059669",
	red: "#DC2626",
};

const loadProgress = () => {
	try {
		return JSON.parse(localStorage.getItem("edura-progress")) || {};
	} catch {
		return {};
	}
};
const doSave = (p) => {
	try {
		localStorage.setItem("edura-progress", JSON.stringify(p));
	} catch {}
};
const loadUser = () => {
	try {
		return JSON.parse(localStorage.getItem("edura-user"));
	} catch {
		return null;
	}
};
const saveUser = (u) => {
	try {
		localStorage.setItem("edura-user", JSON.stringify(u));
	} catch {}
};

function Btn({ children, variant = "primary", onClick, style: s = {} }) {
	const base = {
		border: "none",
		fontFamily: F.heading,
		fontWeight: 600,
		cursor: "pointer",
		transition: "all 0.2s",
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
		fontSize: 15,
		padding: "14px 28px",
		borderRadius: 12,
	};
	const v = {
		primary: { background: C.teal, color: "#fff" },
		secondary: { background: C.warmGray, color: C.navy },
		ghost: { background: "transparent", color: C.text2, padding: "10px 16px" },
		success: { background: C.green, color: "#fff" },
	};
	return (
		<button
			onClick={onClick}
			style={{ ...base, ...(v[variant] || v.primary), ...s }}
		>
			{children}
		</button>
	);
}

function VideoEmbed({ url }) {
	if (!url)
		return (
			<div
				style={{
					background: C.navy,
					borderRadius: 16,
					aspectRatio: "16/9",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					gap: 12,
				}}
			>
				<div
					style={{
						width: 64,
						height: 64,
						borderRadius: "50%",
						background: "rgba(255,255,255,0.1)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<div
						style={{
							width: 0,
							height: 0,
							borderLeft: "20px solid rgba(255,255,255,0.6)",
							borderTop: "12px solid transparent",
							borderBottom: "12px solid transparent",
							marginLeft: 4,
						}}
					/>
				</div>
				<span
					style={{
						fontFamily: F.heading,
						fontSize: 14,
						color: "rgba(255,255,255,0.5)",
					}}
				>
					Video coming soon
				</span>
			</div>
		);
	const m = url.match(
		/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/,
	);
	return (
		<div style={{ borderRadius: 16, overflow: "hidden", aspectRatio: "16/9" }}>
			<iframe
				src={m ? `https://www.youtube.com/embed/${m[1]}` : url}
				style={{ width: "100%", height: "100%", border: "none" }}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/>
		</div>
	);
}

function ModeToggle({ mode, setMode }) {
	return (
		<div
			style={{
				display: "inline-flex",
				background: C.warmGray,
				borderRadius: 10,
				padding: 3,
				gap: 2,
			}}
		>
			{[
				["read", "Read"],
				["watch", "Watch"],
			].map(([k, l]) => (
				<button
					key={k}
					onClick={() => setMode(k)}
					style={{
						padding: "8px 20px",
						borderRadius: 8,
						border: "none",
						fontFamily: F.heading,
						fontSize: 13,
						fontWeight: 600,
						cursor: "pointer",
						background: mode === k ? C.white : "transparent",
						color: mode === k ? C.navy : C.text3,
						boxShadow: mode === k ? "0 1px 4px rgba(0,0,0,0.06)" : "none",
						transition: "all 0.2s",
					}}
				>
					{l}
				</button>
			))}
		</div>
	);
}

function Auth({ onLogin }) {
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

function Dashboard({ user, progress, onSelect, onLogout }) {
	const done = Object.keys(progress).filter((k) => progress[k]?.completed);
	const avg =
		done.length > 0
			? Math.round(
					done.reduce((s, k) => s + (progress[k]?.score || 0), 0) / done.length,
				)
			: 0;
	const total = MODULES.filter((m) => m.lessons.length > 0).length;
	const pct = total > 0 ? Math.round((done.length / total) * 100) : 0;
	return (
		<div style={{ minHeight: "100vh", background: C.cream }}>
			<div
				style={{
					background: C.white,
					borderBottom: `1px solid ${C.border}`,
					padding: "0 32px",
				}}
			>
				<div
					style={{
						maxWidth: 960,
						margin: "0 auto",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						height: 64,
					}}
				>
					<div style={{ fontFamily: F.heading, fontSize: 20, fontWeight: 700 }}>
						<span style={{ color: C.navy }}>Edura</span>{" "}
						<span style={{ color: C.teal }}>Financial</span>
					</div>
					<div style={{ display: "flex", alignItems: "center", gap: 16 }}>
						<div
							style={{
								width: 32,
								height: 32,
								borderRadius: "50%",
								background: `${C.teal}18`,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontFamily: F.heading,
								fontSize: 13,
								fontWeight: 700,
								color: C.teal,
							}}
						>
							{user.name.charAt(0).toUpperCase()}
						</div>
						<span style={{ fontFamily: F.body, fontSize: 14, color: C.text2 }}>
							{user.name}
						</span>
						<Btn
							variant="ghost"
							onClick={onLogout}
							style={{ fontSize: 13, padding: "6px 12px" }}
						>
							Log out
						</Btn>
					</div>
				</div>
			</div>
			<div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 24px" }}>
				<h1
					style={{
						fontFamily: F.display,
						fontSize: 32,
						fontWeight: 700,
						color: C.navy,
						margin: "0 0 6px",
					}}
				>
					Welcome back, {user.name.split(" ")[0]}
				</h1>
				<p
					style={{
						fontFamily: F.body,
						fontSize: 16,
						color: C.text2,
						margin: "0 0 28px",
					}}
				>
					Keep building your financial skills.
				</p>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "1fr 1fr 1fr",
						gap: 16,
						marginBottom: 40,
					}}
				>
					{[
						{
							l: "Modules done",
							v: `${done.length}`,
							s: `Out of ${total} total`,
						},
						{
							l: "Avg quiz score",
							v: avg > 0 ? `${avg}%` : "—",
							s: "Across completed",
						},
						{ l: "Overall progress", v: `${pct}%`, s: "Track completion" },
					].map((x) => (
						<div
							key={x.l}
							style={{
								background: C.white,
								borderRadius: 16,
								padding: 24,
								border: `1px solid ${C.border}`,
							}}
						>
							<div
								style={{
									fontFamily: F.body,
									fontSize: 13,
									color: C.text3,
									marginBottom: 8,
								}}
							>
								{x.l}
							</div>
							<div
								style={{
									fontFamily: F.heading,
									fontSize: 32,
									fontWeight: 700,
									color: C.navy,
								}}
							>
								{x.v}
							</div>
							<div
								style={{
									fontFamily: F.body,
									fontSize: 12,
									color: C.text3,
									marginTop: 4,
								}}
							>
								{x.s}
							</div>
						</div>
					))}
				</div>
				{TRACKS.map((track) => {
					const mods = MODULES.filter((m) => m.trackId === track.id).sort(
						(a, b) => a.order - b.order,
					);
					const d = mods.filter((m) => progress[m.id]?.completed).length;
					return (
						<div key={track.id} style={{ marginBottom: 36 }}>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: 12,
									marginBottom: 16,
								}}
							>
								<div
									style={{
										width: 40,
										height: 40,
										borderRadius: 10,
										background: `${track.color}18`,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										fontFamily: F.heading,
										fontSize: 18,
										fontWeight: 700,
										color: track.color,
									}}
								>
									{track.icon}
								</div>
								<div>
									<h2
										style={{
											fontFamily: F.heading,
											fontSize: 20,
											fontWeight: 700,
											color: C.navy,
											margin: 0,
										}}
									>
										{track.name}
									</h2>
									<p
										style={{
											fontFamily: F.body,
											fontSize: 13,
											color: C.text3,
											margin: 0,
										}}
									>
										{track.subtitle} · {d} of {mods.length} complete
									</p>
								</div>
							</div>
							<div style={{ display: "grid", gap: 10 }}>
								{mods.map((mod) => {
									const p = progress[mod.id];
									const c = p?.completed;
									const has = mod.lessons.length > 0;
									return (
										<div
											key={mod.id}
											onClick={() => has && onSelect(mod)}
											style={{
												background: C.white,
												borderRadius: 14,
												padding: "18px 22px",
												border: `1px solid ${c ? C.teal + "40" : C.border}`,
												cursor: has ? "pointer" : "default",
												opacity: has ? 1 : 0.5,
												display: "flex",
												alignItems: "center",
												gap: 16,
												transition: "all 0.15s",
											}}
										>
											<div
												style={{
													width: 10,
													height: 10,
													borderRadius: "50%",
													background: c ? C.teal : has ? C.gold : C.border,
													flexShrink: 0,
												}}
											/>
											<div style={{ flex: 1 }}>
												<div
													style={{
														fontFamily: F.heading,
														fontSize: 16,
														fontWeight: 600,
														color: C.navy,
													}}
												>
													{mod.title}
												</div>
												<div
													style={{
														fontFamily: F.body,
														fontSize: 13,
														color: C.text3,
														marginTop: 2,
													}}
												>
													{mod.description}
												</div>
											</div>
											<div
												style={{
													display: "flex",
													alignItems: "center",
													gap: 10,
													flexShrink: 0,
												}}
											>
												{c && (
													<span
														style={{
															fontFamily: F.mono,
															fontSize: 12,
															color: C.teal,
															background: `${C.teal}14`,
															padding: "4px 10px",
															borderRadius: 6,
														}}
													>
														{p.score}%
													</span>
												)}
												{c && (
													<span
														style={{
															fontFamily: F.heading,
															fontSize: 13,
															fontWeight: 600,
															color: C.teal,
														}}
													>
														Completed
													</span>
												)}
												{!c && has && (
													<span
														style={{
															fontFamily: F.heading,
															fontSize: 13,
															fontWeight: 600,
															color: C.teal,
														}}
													>
														Start →
													</span>
												)}
												{!has && (
													<span
														style={{
															fontFamily: F.mono,
															fontSize: 11,
															color: C.text3,
															background: C.warmGray,
															padding: "4px 10px",
															borderRadius: 6,
														}}
													>
														Coming soon
													</span>
												)}
											</div>
										</div>
									);
								})}
							</div>
						</div>
					);
				})}
				<div
					style={{
						textAlign: "center",
						padding: "32px 0 16px",
						fontFamily: F.body,
						fontSize: 12,
						color: C.text3,
					}}
				>
					Edura Financial · edurafinancial.com
				</div>
			</div>
		</div>
	);
}

function Lesson({ mod, onBack, onQuiz }) {
	const [idx, setIdx] = useState(0);
	const [mode, setMode] = useState("read");
	const [fade, setFade] = useState(true);
	const slides = mod.lessons;
	const total = slides.length;
	const s = slides[idx];
	const go = (fn) => {
		setFade(false);
		setTimeout(() => {
			fn();
			setFade(true);
		}, 180);
	};
	return (
		<div style={{ minHeight: "100vh", background: C.cream }}>
			<div
				style={{
					background: C.white,
					borderBottom: `1px solid ${C.border}`,
					padding: "0 24px",
					position: "sticky",
					top: 0,
					zIndex: 10,
				}}
			>
				<div
					style={{
						maxWidth: 720,
						margin: "0 auto",
						display: "flex",
						alignItems: "center",
						gap: 16,
						height: 60,
					}}
				>
					<button
						onClick={onBack}
						style={{
							background: "none",
							border: "none",
							fontSize: 20,
							cursor: "pointer",
							color: C.text3,
							padding: 4,
						}}
					>
						←
					</button>
					<div style={{ flex: 1 }}>
						<div
							style={{
								fontFamily: F.heading,
								fontSize: 13,
								fontWeight: 600,
								color: C.navy,
								marginBottom: 4,
							}}
						>
							{mod.title}
						</div>
						<div
							style={{
								height: 4,
								background: C.border,
								borderRadius: 10,
								overflow: "hidden",
							}}
						>
							<div
								style={{
									width: `${((idx + 1) / total) * 100}%`,
									height: "100%",
									background: C.teal,
									borderRadius: 10,
									transition: "width 0.4s",
								}}
							/>
						</div>
					</div>
					<span style={{ fontFamily: F.mono, fontSize: 11, color: C.text3 }}>
						{idx + 1}/{total}
					</span>
				</div>
			</div>
			<div
				style={{
					maxWidth: 680,
					margin: "0 auto",
					padding: "36px 24px 120px",
					opacity: fade ? 1 : 0,
					transform: fade ? "translateY(0)" : "translateY(8px)",
					transition: "all 0.2s",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						marginBottom: 28,
					}}
				>
					<div
						style={{
							fontFamily: F.mono,
							fontSize: 11,
							color: C.teal,
							letterSpacing: 1.5,
							textTransform: "uppercase",
						}}
					>
						Lesson {idx + 1} of {total}
					</div>
					<ModeToggle mode={mode} setMode={setMode} />
				</div>
				<h2
					style={{
						fontFamily: F.display,
						fontSize: 30,
						fontWeight: 700,
						color: C.navy,
						margin: "0 0 24px",
						lineHeight: 1.2,
					}}
				>
					{s.title}
				</h2>
				{mode === "watch" ? (
					<div>
						<VideoEmbed url={s.videoUrl} />
						<div
							style={{
								marginTop: 20,
								padding: 20,
								background: C.white,
								borderRadius: 14,
								border: `1px solid ${C.border}`,
							}}
						>
							<div
								style={{
									fontFamily: F.heading,
									fontSize: 14,
									fontWeight: 600,
									color: C.navy,
									marginBottom: 8,
								}}
							>
								Key takeaways
							</div>
							<div
								style={{
									fontFamily: F.body,
									fontSize: 14,
									color: C.text2,
									lineHeight: 1.7,
									whiteSpace: "pre-line",
								}}
							>
								{s.content.split("\n\n").slice(0, 2).join("\n\n")}
							</div>
							<button
								onClick={() => setMode("read")}
								style={{
									marginTop: 12,
									background: "none",
									border: "none",
									fontFamily: F.heading,
									fontSize: 13,
									fontWeight: 600,
									color: C.teal,
									cursor: "pointer",
									padding: 0,
								}}
							>
								Read the full article →
							</button>
						</div>
					</div>
				) : (
					<div
						style={{
							fontFamily: F.body,
							fontSize: 16.5,
							color: C.text2,
							lineHeight: 1.8,
							whiteSpace: "pre-line",
						}}
					>
						{s.content}
					</div>
				)}
				<div style={{ display: "flex", gap: 12, marginTop: 40 }}>
					{idx > 0 && (
						<Btn variant="ghost" onClick={() => go(() => setIdx(idx - 1))}>
							← Back
						</Btn>
					)}
					{idx < total - 1 && (
						<Btn onClick={() => go(() => setIdx(idx + 1))}>Continue →</Btn>
					)}
					{idx === total - 1 && (
						<Btn variant="success" onClick={onQuiz}>
							Start Quiz →
						</Btn>
					)}
				</div>
			</div>
		</div>
	);
}

function Quiz({ mod, onBack, onComplete }) {
	const [qi, setQi] = useState(0);
	const [sel, setSel] = useState(null);
	const [show, setShow] = useState(false);
	const [score, setScore] = useState(0);
	const [phase, setPhase] = useState("quiz");
	const [fade, setFade] = useState(true);
	const q = mod.quiz;
	const total = q.length;
	const go = (fn) => {
		setFade(false);
		setTimeout(() => {
			fn();
			setFade(true);
		}, 180);
	};
	const pick = (i) => {
		if (sel !== null) return;
		setSel(i);
		if (i === q[qi].correct) setScore((s) => s + 1);
		setTimeout(() => setShow(true), 300);
	};
	const next = () => {
		if (qi < total - 1)
			go(() => {
				setQi(qi + 1);
				setSel(null);
				setShow(false);
			});
		else go(() => setPhase("results"));
	};

	if (phase === "results") {
		const pct = Math.round((score / total) * 100);
		return (
			<div
				style={{
					minHeight: "100vh",
					background: C.cream,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					padding: 24,
				}}
			>
				<div style={{ textAlign: "center", maxWidth: 480 }}>
					<div style={{ fontSize: 64, marginBottom: 20 }}>
						{pct >= 80 ? "🎉" : pct >= 50 ? "💪" : "📚"}
					</div>
					<h2
						style={{
							fontFamily: F.display,
							fontSize: 36,
							color: C.navy,
							margin: "0 0 8px",
						}}
					>
						{pct >= 80
							? "Great job!"
							: pct >= 50
								? "Nice work!"
								: "Keep learning!"}
					</h2>
					<p
						style={{
							fontFamily: F.body,
							fontSize: 18,
							color: C.text2,
							margin: "0 0 12px",
						}}
					>
						You scored{" "}
						<strong style={{ color: C.teal }}>
							{score}/{total}
						</strong>{" "}
						({pct}%)
					</p>
					<div style={{ display: "inline-flex", gap: 6, marginBottom: 36 }}>
						{q.map((_, i) => (
							<div
								key={i}
								style={{
									width: 40,
									height: 40,
									borderRadius: 10,
									background: i < score ? "#ECFDF5" : "#FEF2F2",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontSize: 16,
									fontWeight: 700,
									color: i < score ? C.green : C.red,
								}}
							>
								{i < score ? "✓" : "✗"}
							</div>
						))}
					</div>
					<div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
						<Btn variant="secondary" onClick={onBack}>
							Back to dashboard
						</Btn>
						<Btn onClick={() => onComplete(pct)}>Complete module</Btn>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div style={{ minHeight: "100vh", background: C.cream }}>
			<div
				style={{
					background: C.white,
					borderBottom: `1px solid ${C.border}`,
					padding: "0 24px",
					position: "sticky",
					top: 0,
					zIndex: 10,
				}}
			>
				<div
					style={{
						maxWidth: 720,
						margin: "0 auto",
						display: "flex",
						alignItems: "center",
						gap: 16,
						height: 60,
					}}
				>
					<button
						onClick={onBack}
						style={{
							background: "none",
							border: "none",
							fontSize: 20,
							cursor: "pointer",
							color: C.text3,
							padding: 4,
						}}
					>
						←
					</button>
					<div style={{ flex: 1 }}>
						<div
							style={{
								fontFamily: F.heading,
								fontSize: 13,
								fontWeight: 600,
								color: C.navy,
								marginBottom: 4,
							}}
						>
							{mod.title} — Quiz
						</div>
						<div
							style={{
								height: 4,
								background: C.border,
								borderRadius: 10,
								overflow: "hidden",
							}}
						>
							<div
								style={{
									width: `${((qi + 1) / total) * 100}%`,
									height: "100%",
									background: C.gold,
									borderRadius: 10,
									transition: "width 0.4s",
								}}
							/>
						</div>
					</div>
					<span style={{ fontFamily: F.mono, fontSize: 11, color: C.text3 }}>
						{qi + 1}/{total}
					</span>
				</div>
			</div>
			<div
				style={{
					maxWidth: 640,
					margin: "0 auto",
					padding: "48px 24px 120px",
					opacity: fade ? 1 : 0,
					transform: fade ? "translateY(0)" : "translateY(8px)",
					transition: "all 0.2s",
				}}
			>
				<div
					style={{
						display: "inline-block",
						background: `${C.gold}20`,
						borderRadius: 8,
						padding: "5px 14px",
						marginBottom: 24,
					}}
				>
					<span
						style={{
							fontFamily: F.mono,
							fontSize: 11,
							color: "#B8860B",
							letterSpacing: 1,
							textTransform: "uppercase",
							fontWeight: 600,
						}}
					>
						Question {qi + 1} of {total}
					</span>
				</div>
				<h2
					style={{
						fontFamily: F.heading,
						fontSize: 22,
						fontWeight: 700,
						color: C.navy,
						margin: "0 0 28px",
						lineHeight: 1.35,
					}}
				>
					{q[qi].q}
				</h2>
				<div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
					{q[qi].opts.map((opt, i) => {
						const p = sel !== null;
						const isC = i === q[qi].correct;
						const isT = sel === i;
						let bg = C.white,
							bc = C.border,
							tc = C.text1;
						if (p && isC) {
							bg = "#ECFDF5";
							bc = "#34D399";
							tc = "#065F46";
						} else if (p && isT) {
							bg = "#FEF2F2";
							bc = "#F87171";
							tc = "#991B1B";
						}
						return (
							<button
								key={i}
								onClick={() => pick(i)}
								style={{
									background: bg,
									border: `2px solid ${bc}`,
									borderRadius: 14,
									padding: "16px 20px",
									textAlign: "left",
									fontFamily: F.body,
									fontSize: 15,
									color: tc,
									cursor: p ? "default" : "pointer",
									transition: "all 0.2s",
									display: "flex",
									alignItems: "center",
									gap: 14,
								}}
							>
								<span
									style={{
										width: 32,
										height: 32,
										borderRadius: 10,
										background:
											p && isC ? "#34D399" : p && isT ? "#F87171" : C.warmGray,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										fontWeight: 700,
										fontSize: 13,
										color: p && (isC || isT) ? "#fff" : C.text3,
										flexShrink: 0,
									}}
								>
									{p && isC
										? "✓"
										: p && isT
											? "✗"
											: String.fromCharCode(65 + i)}
								</span>
								{opt}
							</button>
						);
					})}
				</div>
				{show && (
					<div
						style={{
							marginTop: 24,
							padding: 24,
							background: C.white,
							borderRadius: 16,
							borderLeft: `4px solid ${C.teal}`,
							boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
						}}
					>
						<div
							style={{
								fontFamily: F.body,
								fontSize: 14,
								color: C.text2,
								lineHeight: 1.7,
							}}
						>
							<strong
								style={{ color: sel === q[qi].correct ? "#065F46" : "#991B1B" }}
							>
								{sel === q[qi].correct ? "Correct! " : "Not quite. "}
							</strong>
							{q[qi].why}
						</div>
						<Btn
							style={{ marginTop: 16, padding: "10px 20px", fontSize: 14 }}
							onClick={next}
						>
							{qi === total - 1 ? "See results →" : "Next question →"}
						</Btn>
					</div>
				)}
			</div>
		</div>
	);
}

export default function App() {
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

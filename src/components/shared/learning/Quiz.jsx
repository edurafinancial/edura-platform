import { useState } from "react";
import { C, F } from "../../../shared/learning/theme";
import { Btn } from "./Btn";

export function Quiz({ mod, onBack, onComplete }) {
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

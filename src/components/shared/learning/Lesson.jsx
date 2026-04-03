import { useState } from "react";
import { C, F } from "../../../shared/learning/theme";
import { Btn } from "./Btn";
import { ModeToggle } from "./ModeToggle";
import { VideoEmbed } from "./VideoEmbed";

export function Lesson({ mod, onBack, onQuiz }) {
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

export default Lesson;

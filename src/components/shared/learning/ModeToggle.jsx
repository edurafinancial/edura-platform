import { C, F } from "../../../shared/learning/theme";

export function ModeToggle({ mode, setMode }) {
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

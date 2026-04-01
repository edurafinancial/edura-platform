import { C, F } from "../../../shared/learning/theme";

export function Btn({ children, variant = "primary", onClick, style: s = {} }) {
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

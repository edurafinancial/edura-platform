import { C, F } from "../../../shared/learning/theme";

export function VideoEmbed({ url }) {
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

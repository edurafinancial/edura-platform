import data from "../../../data.json";
import { C, F } from "../../../shared/learning/theme";
import { Btn } from "./Btn";

const { MODULES, TRACKS } = data;

export function Dashboard({ user, progress, onSelect, onLogout }) {
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

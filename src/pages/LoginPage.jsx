function BrandPanel() {
	return (
		<>
		  
		<section className="relative hidden min-h-screen flex-1 flex-col justify-between overflow-hidden bg-gradient-to-b from-muted to-background px-10 py-9 lg:flex">
			<div className="relative z-10 flex items-center justify-between gap-4">
				<div className="font-heading text-3xl font-extrabold text-primary">
					Edura Financial
				</div>
				<div className="flex items-center gap-6 text-sm font-semibold text-muted-foreground">
					<button type="button" className="transition-colors hover:text-primary">
						Back to Website
					</button>
					<button type="button" className="transition-colors hover:text-primary">
						Support
					</button>
				</div>
			</div>

			<div className="relative z-10 mx-auto max-w-[32rem] py-9 text-center">
				<div className="mx-auto mb-8 flex h-60 w-60 items-center justify-center rounded-full border border-border bg-white shadow-[0_24px_70px_rgba(0,104,93,0.08)]">
					<div className="flex h-[170px] w-[170px] items-center justify-center rounded-full bg-[rgba(0,131,118,0.10)] font-mono text-5xl font-bold text-primary">
						EF
					</div>
				</div>
				<p className="mb-3 font-heading text-[22px] italic text-[#008376]">
					The Academic Curator
				</p>
				<h1 className="font-heading text-[clamp(38px,4.2vw,58px)] leading-[1.04] tracking-[-0.04em] text-foreground">
					Empower your financial future
				</h1>
				<p className="mx-auto mt-[18px] max-w-[460px] text-lg leading-7 text-muted-foreground">
					Bridging the gap between academic administration and high-engagement
					learning.
				</p>
			</div>

			<div className="relative z-10">
				<div className="inline-flex items-center gap-4 rounded-[20px] border border-border bg-white/80 px-[18px] py-4 shadow-[0_10px_30px_rgba(27,42,74,0.06)] backdrop-blur-sm">
					<div className="flex gap-1.5">
						<div className="grid h-[34px] w-[34px] place-items-center rounded-full bg-primary text-xs font-bold text-white">
							S
						</div>
						<div className="grid h-[34px] w-[34px] place-items-center rounded-full bg-[#4f5e81] text-xs font-bold text-white">
							T
						</div>
						<div className="grid h-[34px] w-[34px] place-items-center rounded-full bg-[#e7c268] text-xs font-bold text-foreground">
							A
						</div>
					</div>
					<div>
						<div className="font-heading text-sm font-bold text-foreground">
							98% Student Engagement
						</div>
						<div className="text-xs text-[#6d7a77]">
							High retention across guided learning modules
						</div>
					</div>
				</div>
			</div>

			<div className="pointer-events-none absolute -right-[70px] -top-20 h-[280px] w-[280px] rounded-full bg-[rgba(0,104,93,0.08)] blur-lg" />
			<div className="pointer-events-none absolute -bottom-[70px] -left-[50px] h-[220px] w-[220px] rounded-full bg-[rgba(79,94,129,0.08)]" />
		</section>
		</>

	);
}

const fieldClassName =
	"w-full rounded-2xl border border-border bg-white px-4 py-3.5 text-[15px] text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

export default function LoginPage({
	email,
	password,
	remember,
	onEmailChange,
	onPasswordChange,
	onRememberChange,
	onSubmit,
	onSwitchMode,
}) {
	return (
		<div className="min-h-screen bg-white lg:flex">
			<BrandPanel />

			<main className="flex min-h-screen flex-1 items-center justify-center bg-white px-6 py-8 md:px-8">
				<div className="w-full max-w-[460px]">
					<div className="mb-7 text-center">
						<h2 className="mb-2 font-heading text-[34px] font-bold text-foreground">
							Login to your portal
						</h2>
						<p className="text-base leading-7 text-muted-foreground">
							Manage your tuition, grants, and academic investments.
						</p>
					</div>

					<div className="mb-6 flex gap-1.5 rounded-2xl bg-secondary p-1.5">
						<button
							type="button"
							className="flex-1 rounded-xl bg-white py-3 font-heading text-sm font-bold text-primary shadow-sm"
						>
							Log In
						</button>
						<button
							type="button"
							onClick={onSwitchMode}
							className="flex-1 rounded-xl py-3 font-heading text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
						>
							Sign Up
						</button>
					</div>

					<form onSubmit={onSubmit} className="flex flex-col gap-[18px]">
						<div>
							<label
								htmlFor="login-email"
								className="mb-2 block text-sm font-bold text-foreground"
							>
								Email Address
							</label>
							<input
								id="login-email"
								type="email"
								value={email}
								onChange={(event) => onEmailChange(event.target.value)}
								placeholder="name@university.edu"
								className={fieldClassName}
							/>
						</div>

						<div>
							<div className="mb-2 flex items-center justify-between gap-4">
								<label
									htmlFor="login-password"
									className="text-sm font-bold text-foreground"
								>
									Password
								</label>
								<button
									type="button"
									className="text-xs font-bold text-primary transition-colors hover:text-primary/80"
								>
									Forgot password?
								</button>
							</div>
							<input
								id="login-password"
								type="password"
								value={password}
								onChange={(event) => onPasswordChange(event.target.value)}
								placeholder="Enter your password"
								className={fieldClassName}
							/>
						</div>

						<label className="flex cursor-pointer items-center gap-2.5 text-sm text-muted-foreground">
							<input
								type="checkbox"
								checked={remember}
								onChange={(event) => onRememberChange(event.target.checked)}
								className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
							/>
							Remember me
						</label>

						<button
							type="submit"
							className="mt-1.5 rounded-2xl bg-primary px-[18px] py-4 font-heading text-base font-bold text-primary-foreground shadow-[0_18px_36px_rgba(0,104,93,0.18)] transition hover:bg-primary/95"
						>
							Log In
						</button>
					</form>

					<div className="my-7 flex items-center gap-4">
						<div className="h-px flex-1 bg-border" />
						<div className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#6d7a77]">
							or continue with
						</div>
						<div className="h-px flex-1 bg-border" />
					</div>

					<div className="grid grid-cols-2 gap-3.5">
						{["Google", "University SSO"].map((label) => (
							<button
								key={label}
								type="button"
								className="rounded-2xl border border-border bg-white px-4 py-3.5 text-sm font-bold text-foreground transition hover:bg-muted"
							>
								{label}
							</button>
						))}
					</div>

					<p className="mt-7 text-center text-xs text-[#6d7a77]">
						Copyright 2026 Edura Financial. All rights reserved.
					</p>
				</div>
			</main>
		</div>
	);
}

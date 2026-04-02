import { University } from "lucide-react";

export default function AuthHeroPanel() {
  return (
    <section className="relative hidden overflow-hidden bg-surface-container-low p-12 lg:flex lg:min-h-screen lg:flex-col lg:items-center ">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(#2A9D8F 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 max-w-md text-center lg:mt-[10%]">
        <div className="mb-12 flex justify-center">
          <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-primary-container/10">
            <div className="flex h-[170px] w-[170px] items-center justify-center rounded-full bg-primary/10 text-primary">
              <University className="h-20 w-20" strokeWidth={1.8} />
            </div>
            <div className="absolute -right-4 -top-4 flex h-12 w-12 items-center justify-center rounded-xl bg-tertiary-fixed shadow-lg">
              <span className="material-symbols-outlined fill-icon text-surface">
                account_balance
              </span>
            </div>
          </div>
        </div>

        <h2 className="font-display mb-4 text-4xl italic leading-tight tracking-tight text-primary">
          The Academic Curator
        </h2>
        <h1 className="mb-6 font-headline text-5xl font-extrabold tracking-tighter text-on-surface">
          Empower your financial future
        </h1>
        <p className="font-body text-lg leading-relaxed text-on-surface-variant">
          Bridging the gap between academic administration and high-engagement
          learning.
        </p>
      </div>

      <div className="absolute bottom-10 left-12 flex items-center gap-4 rounded-xl bg-surface-container-lowest p-4 shadow-sm">
        <div className="font-ui-mono text-surface flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm text-on-primary">
          98%
        </div>
        <div className="text-xs">
          <p className="font-bold text-on-surface">Student Engagement</p>
          <p className="text-on-surface-variant">Active Learning Rate</p>
        </div>
      </div>
      <div className="pointer-events-none absolute -right-[70px] -top-20 h-[280px] w-[280px] rounded-full bg-[rgba(0,104,93,0.08)] blur-lg" />
      <div className="pointer-events-none absolute -bottom-[70px] -left-[50px] h-[220px] w-[220px] rounded-full bg-[rgba(79,94,129,0.08)]" />
    </section>
  );
}

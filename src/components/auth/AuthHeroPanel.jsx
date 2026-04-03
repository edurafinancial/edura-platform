import { motion } from "motion/react";

import squareLogo from "@/assets/SquareLogo.webp";

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

      <div className="relative z-10 max-w-md text-center lg:mt-[16%]">
        <motion.div
          className="mb-12 flex justify-center"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="relative flex h-64 w-64 items-center justify-center rounded-full bg-primary-container/10"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex h-[170px] w-[170px] items-center justify-center rounded-full bg-primary/10 text-primary">
              <img
                src={squareLogo}
                alt="Edura Financial square logo"
                className="h-24 w-24 object-contain"
                loading="lazy"
              />
            </div>
            <motion.div
              className="absolute -right-4 -top-4 flex h-12 w-12 items-center justify-center rounded-xl bg-tertiary-fixed shadow-lg"
              initial={{ rotate: -8 }}
              animate={{ rotate: 8 }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="material-symbols-outlined fill-icon text-surface">
                account_balance
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.h2
          className="font-display mb-4 text-4xl italic leading-tight tracking-tight text-primary"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
        >
          The Academic Curator
        </motion.h2>
        <motion.h1
          className="mb-6 font-headline text-5xl font-extrabold tracking-tighter text-on-surface"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.18 }}
        >
          Empower your financial future
        </motion.h1>
        <motion.p
          className="font-body text-lg leading-relaxed text-on-surface-variant"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.26 }}
        >
          Bridging the gap between academic administration and high-engagement
          learning.
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-10 left-12 flex items-center gap-4 rounded-xl bg-surface-container-lowest p-4 shadow-sm"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
      >
        <div className="font-ui-mono text-surface flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm text-on-primary">
          98%
        </div>
        <div className="text-xs">
          <p className="font-bold text-on-surface">Student Engagement</p>
          <p className="text-on-surface-variant">Active Learning Rate</p>
        </div>
      </motion.div>
      <div className="pointer-events-none absolute -right-[70px] -top-20 h-[280px] w-[280px] rounded-full bg-[rgba(0,104,93,0.08)] blur-lg" />
      <div className="pointer-events-none absolute -bottom-[70px] -left-[50px] h-[220px] w-[220px] rounded-full bg-[rgba(79,94,129,0.08)]" />
    </section>
  );
}

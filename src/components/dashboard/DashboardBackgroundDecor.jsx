import { motion } from "framer-motion";

export default function DashboardBackgroundDecor() {
  return (
    <>
      <motion.div
        className="pointer-events-none fixed right-0 top-0 -z-10 h-1/2 w-1/3 bg-gradient-to-bl from-primary/5 to-transparent opacity-50 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <motion.div
        className="pointer-events-none fixed bottom-0 left-64 -z-10 h-64 w-64 rounded-full bg-tertiary/5 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
      />
    </>
  );
}

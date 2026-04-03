import { motion } from "framer-motion";

export default function DashboardFooter() {
  return (
    <motion.footer
      className="border-surface-container mt-8 flex w-full flex-col items-center justify-between px-0 py-12 font-body text-xs text-on-surface-variant md:flex-row"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <p>© 2026 Edura Financial. All rights reserved.</p>
      <div className="mt-6 flex space-x-8 md:mt-0">
        <a className="hover:text-primary transition-colors" href="#">
          Website
        </a>
        <a className="hover:text-primary transition-colors" href="#">
          Privacy Policy
        </a>
        <a className="hover:text-primary transition-colors" href="#">
          Terms of Service
        </a>
      </div>
    </motion.footer>
  );
}

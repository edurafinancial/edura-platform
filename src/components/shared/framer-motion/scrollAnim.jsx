import { useRef } from "react";
import { motion, useInView } from "motion/react";

export const scrollAnim = {
  hidden: {
    opacity: 0,
    y: 70,
    rotate: 6,
    scale: 1,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      duration: 1.1,
      stiffness: 65,
      damping: 18,
      mass: 5,
    },
  },
};

export function AnimatedColumn({ children }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      variants={scrollAnim}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

import { motion, useInView } from "motion/react";
import { useRef } from "react";

export default function ScrollElementAnimation({
  children,
  className = "w-full",
  as = "div",
  delayStart = 0,
  // Framer-like props
  opacity = 0,
  scale = 1,
  blur = 10,
  rotate = 0,
  skewX = 0,
  skewY = 0,
  offsetX = 0,
  offsetY = 20,

  delay = 0.05, // per-element delay
  duration = 0.8,
  spring = { stiffness: 120, damping: 20, mass: 1 },

  once = true,
  perElement = true, // true = animate each child independently (Framer "Per: Element")
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-10% 0px" });

  const Component = motion[as] || motion.div;

  // Base animations (Framer "Enter Effect")
  const baseVariants = {
    hidden: {
      opacity,
      scale,
      y: offsetY,
      x: offsetX,
      filter: `blur(${blur}px)`,
      rotate,
      skewX,
      skewY,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      filter: "blur(0px)",
      rotate: 0,
      skewX: 0,
      skewY: 0,
      transition: {
        delay: delayStart,
        type: "spring",
        ...spring,
      },
    },
  };

  return (
    <div ref={ref} className={className}>
      {perElement ? (
        // each child animates separately (Framer "Per: Element")
        <Component
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: delay,
              },
            },
          }}
        >
          {Array.isArray(children) ? (
            children.map((child, i) => (
              <motion.div
                key={i}
                variants={baseVariants}
                transition={{ duration }}
              >
                {child}
              </motion.div>
            ))
          ) : (
            <motion.div variants={baseVariants} transition={{ duration }}>
              {children}
            </motion.div>
          )}
        </Component>
      ) : (
        // animate entire wrapper as one
        <Component
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={baseVariants}
          transition={{ duration }}
        >
          {children}
        </Component>
      )}
    </div>
  );
}

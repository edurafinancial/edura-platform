import { motion } from "motion/react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const textVariants = {
  rest: {
    y: 0,
    opacity: 1,
  },
  hover: {
    y: "-120%",
    opacity: 0,
  },
};

const hoverTextVariants = {
  rest: {
    y: "120%",
    opacity: 0,
  },
  hover: {
    y: 0,
    opacity: 1,
  },
};

const transition = {
  duration: 0.35,
  ease: [0.22, 1, 0.36, 1], // smooth, natural UI curve
};

export default function MotionButton({ children, className, ...props }) {
  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover="hover"
      className="inline-block"
    >
      <Button
        {...props}
        className={cn(
          `
          relative overflow-hidden
          bg-blue hover:bg-blue
          h-11 rounded-full
          px-[22px] py-2.5
          text-white cursor-pointer
          `,
          className
        )}
      >
        <span
          className="
            relative block
            font-satoshi font-medium
            text-[16px]
            leading-[1.5]
            tracking-[-0.4px]
          "
        >
          {/* Default text */}
          <motion.span
            className="block"
            variants={textVariants}
            transition={transition}
          >
            {children}
          </motion.span>

          {/* Hover text */}
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            variants={hoverTextVariants}
            transition={transition}
          >
            {children}
          </motion.span>
        </span>
      </Button>
    </motion.div>
  );
}

import { Link } from "react-router";
import { motion } from "motion/react";
import { Button } from "../ui/button";

const MotionButton = motion.create(Button);

export default function AppStoreButton({
  to = "#",
  label = "Available on iOS",
  icon: Icon,
  className = "",
}) {
  return (
    <MotionButton
      asChild
      whileHover={{
        backgroundColor: "var(--blue-68)",
        boxShadow: "0 5px 18px rgba(82,162,237,0.70)",
      }}
      transition={{
        backgroundColor: {
          type: "spring",
          stiffness: 120,
          damping: 22,
          mass: 1.2,
        },
        boxShadow: {
          type: "spring",
          stiffness: 150,
          damping: 26,
          mass: 1.2,
        },
      }}
      className={`flex items-center justify-center gap-2  w-[200px]  h-12 rounded-full  bg-(--blue-63) cursor-pointer   text-(--white-100) font-medium text-base  tracking-[-0.48px]  capitalize   shadow-[inset_0_0_10px_rgba(255,255,255,0.65)] ${className} `}
    >
      <Link to={to} className="flex items-center gap-2">
        <span>{label}</span>
        {Icon && <Icon className="w-5 h-5" />}
      </Link>
    </MotionButton>
  );
}

import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "motion/react";

export default function SplitText({
  text,
  className,
  delay = 0.05,
  mode = "time",
}) {
  const isMobile = useIsMobile();

  // Automatically insert a newline only on mobile/tablet
  const mobileText = isMobile
    ? text.replace(
        "Unlock Your Team's Potential",
        "Unlock Your\nTeam's Potential"
      )
    : text;

  const chars = mobileText.split("");

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {chars.map((char, i) => {
        if (char === "\n") return <br key={`br-${i}`} />;

        const isSpace = char === " ";

        return (
          <motion.span
            key={i}
            style={{
              display: "inline-block",
              width: isSpace ? "0.25em" : "auto",
            }}
            variants={{
              hidden: isMobile
                ? { opacity: 0, y: 110, filter: "blur(10px)" }
                : { opacity: 0, y: 10, filter: "blur(10px)" },

              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition:
                  mode === "time"
                    ? {
                        type: "spring",
                        duration: 0.5,
                        bounce: 0,
                        delay: i * delay,
                      }
                    : {
                        type: "spring",
                        stiffness: 400,
                        damping: 40,
                        mass: 1,
                        delay: i * delay,
                      },
              },
            }}
          >
            {isSpace ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </motion.span>
  );
}

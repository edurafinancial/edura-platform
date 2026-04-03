import { motion } from "framer-motion";

export function AnimatedWords({ text }) {
  const words = text.split(" ");

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.075, // Delay per word
          },
        },
      }}
      className="flex flex-wrap"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: {
              opacity: 0,
              y: 10,
              filter: "blur(2px)",
            },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 40,
                mass: 1,
                duration: 0.25,
              },
            },
          }}
          className="mr-1 inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

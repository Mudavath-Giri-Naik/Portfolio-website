import { motion, type HTMLMotionProps } from "motion/react";

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number };

/** Fades, rises and un-blurs its children as they scroll into view. */
const Reveal = ({ delay = 0, y = 32, children, ...props }: RevealProps) => (
  <motion.div
    initial={{ opacity: 0, y, filter: "blur(8px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    {...props}
  >
    {children}
  </motion.div>
);

export default Reveal;

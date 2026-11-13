"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface KineticTextProps {
  phrases: string[];
  interval?: number;
  className?: string;
}

export function KineticText({
  phrases,
  interval = 3000,
  className = "",
}: KineticTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (phrases.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, interval);
    return () => clearInterval(timer);
  }, [phrases, interval]);

  return (
    <span className={`inline-block relative overflow-hidden py-1 ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={phrases[index]}
          initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(8px)" }}
          transition={{
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block bg-gradient-to-r from-[#0052D4] via-[#0066FF] to-[#00D2FF] bg-clip-text text-transparent"
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

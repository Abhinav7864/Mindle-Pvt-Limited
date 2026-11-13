"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/** A brief, session-scoped brand reveal that hands off into the hero. */
export function AppIntro() {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || sessionStorage.getItem("mindle-intro-seen")) {
      const dismissImmediately = window.setTimeout(() => setVisible(false), 0);
      return () => window.clearTimeout(dismissImmediately);
    }
    const timeout = window.setTimeout(() => {
      sessionStorage.setItem("mindle-intro-seen", "true");
      setVisible(false);
    }, 1550);
    return () => window.clearTimeout(timeout);
  }, [reduceMotion]);

  const skip = () => {
    sessionStorage.setItem("mindle-intro-seen", "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[110] grid place-items-center bg-[#060606]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] } }}
          aria-label="Mindle introduction"
        >
          <div className="relative w-[min(58vw,420px)] overflow-hidden">
            <motion.div
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
            >
              <Image src="/mindle-wordmark-white.png" alt="Mindle" width={749} height={177} priority className="h-auto w-full" />
            </motion.div>
            <motion.div
              className="absolute inset-y-0 right-0 w-full bg-[#060606]"
              initial={{ x: 0 }}
              animate={{ x: "105%" }}
              transition={{ delay: 0.68, duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            />
          </div>
          <div className="absolute bottom-8 flex items-center gap-6 font-mono text-[10px] uppercase tracking-[.22em] text-white/38">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>Product studio</motion.span>
            <motion.button type="button" onClick={skip} className="transition-colors hover:text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>Skip intro</motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

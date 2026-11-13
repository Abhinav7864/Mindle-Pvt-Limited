"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Chapter01Props {
  onExplore: () => void;
  onSkipIntro: () => void;
  isIntroComplete: boolean;
}

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Chapter01Emergence({ onExplore, onSkipIntro, isIntroComplete }: Chapter01Props) {
  const reducedMotion = useReducedMotion();

  return (
    <section id="chapter-01" className="relative min-h-[100svh] w-full flex flex-col justify-between px-6 pt-28 pb-12 md:px-12 lg:px-20">
      {/* Top Telemetry Row */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
        <div className="flex items-center gap-3">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-white/50">
            Chapter 01 · Emergence
          </p>
        </div>
        <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          <span className="hidden sm:inline">24.8° N · India / Global</span>
          {!isIntroComplete && (
            <button
              type="button"
              onClick={onSkipIntro}
              className="text-white/70 hover:text-white transition-colors cursor-pointer border border-white/20 px-3 py-1 rounded-full hover:border-white/50"
            >
              Skip Intro
            </button>
          )}
        </div>
      </div>

      {/* Main Editorial Core */}
      <div className="my-auto max-w-[840px] py-12">
        <motion.div
          variants={reveal}
          custom={reducedMotion ? 0 : 0.15}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-3.5 py-1 backdrop-blur-md"
        >
          <Compass className="h-3 w-3 text-white/60 animate-spin" style={{ animationDuration: "14s" }} />
          <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/70">
            Autonomous Product Studio
          </span>
        </motion.div>

        <motion.h1
          variants={reveal}
          custom={reducedMotion ? 0 : 0.3}
          initial="hidden"
          animate="visible"
          className="mt-8 font-display text-[clamp(3.4rem,7.5vw,7.8rem)] font-semibold leading-[0.88] tracking-[-0.075em] text-white text-balance"
        >
          Ideas deserve to become <span className="text-white/40">extraordinary</span> products.
        </motion.h1>

        <motion.p
          variants={reveal}
          custom={reducedMotion ? 0 : 0.45}
          initial="hidden"
          animate="visible"
          className="mt-8 max-w-xl text-base leading-7 text-white/65 md:text-lg md:leading-8"
        >
          Mindle turns ambitious ideas into intelligent experiences: products that are useful, considered, and built to last.
        </motion.p>

        <motion.div
          variants={reveal}
          custom={reducedMotion ? 0 : 0.6}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button asChild variant="primary" size="lg" className="rounded-none px-7 py-6 font-medium tracking-wide">
            <Link href="/contact">
              Start a conversation <ArrowUpRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
          <button
            type="button"
            onClick={onExplore}
            className="magnetic-link inline-flex items-center gap-2.5 px-4 py-3 text-sm text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <span>Explore the journey</span>
            <ArrowDownRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>

      {/* Chapter 01 Footer Coordinates */}
      <div className="flex items-center justify-between border-t border-white/[0.08] pt-6 font-mono text-[9px] uppercase tracking-[0.22em] text-white/40">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-white/30" />
          <span>Scroll to begin evolution</span>
        </div>
        <div>
          <span>01 / 06</span>
        </div>
      </div>
    </section>
  );
}

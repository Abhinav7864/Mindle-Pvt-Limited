"use client";

import Image from "next/image";
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
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Chapter01Emergence({ onExplore, onSkipIntro, isIntroComplete }: Chapter01Props) {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="chapter-01"
      className="relative min-h-[100svh] w-full flex flex-col justify-between px-6 pt-24 pb-12 md:px-12 lg:px-20"
    >
      {/* Telemetry Navigation Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
        <div className="flex items-center gap-3">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/50">
            Chapter 01 · Emergence
          </p>
        </div>
        <div className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          <span className="hidden sm:inline">24.8° N · India / Global</span>
          {!isIntroComplete && (
            <button
              type="button"
              onClick={onSkipIntro}
              className="text-white/60 hover:text-white transition-colors cursor-pointer border border-white/20 px-3 py-1 rounded-full hover:border-white/50 text-[9px]"
            >
              Skip Intro
            </button>
          )}
        </div>
      </div>

      {/* Main Editorial Hero & Official Logo Reveal */}
      <div className="my-auto max-w-[820px] py-10">
        {/* Official Mindle Emblem Reveal: Exact Vector Master from public/logo.svg */}
        <motion.div
          variants={reveal}
          custom={reducedMotion ? 0 : 0.12}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-4 mb-8"
        >
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/15 bg-black/60 p-1.5 shadow-[0_0_24px_rgba(255,255,255,0.08)] backdrop-blur-md">
            {/* Exact SVG Brandmark */}
            <svg viewBox="0 0 100 100" className="h-full w-full" aria-label="Official Mindle Brandmark">
              <defs>
                <linearGradient id="c1LeftGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#040b1c" />
                  <stop offset="100%" stopColor="#0e2a6d" />
                </linearGradient>
                <linearGradient id="c1RightGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#0066FF" />
                  <stop offset="100%" stopColor="#00D2FF" />
                </linearGradient>
                <linearGradient id="c1LeftDiag" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0e2a6d" />
                  <stop offset="100%" stopColor="#1e52b7" />
                </linearGradient>
                <linearGradient id="c1RightDiag" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0052D4" />
                  <stop offset="100%" stopColor="#00D2FF" />
                </linearGradient>
                <filter id="c1FoldShadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="-1.2" dy="1.2" stdDeviation="1" floodColor="#000" floodOpacity="0.5" />
                </filter>
              </defs>
              <rect x="15" y="20" width="14" height="60" rx="7" fill="url(#c1LeftGrad)" />
              <path d="M 22,35 L 50,68" stroke="url(#c1LeftDiag)" strokeWidth="14" strokeLinecap="round" />
              <path d="M 50,68 L 78,35" stroke="url(#c1RightDiag)" strokeWidth="14" strokeLinecap="round" filter="url(#c1FoldShadow)" />
              <rect x="71" y="20" width="14" height="60" rx="7" fill="url(#c1RightGrad)" />
            </svg>
          </div>

          <div>
            <Image
              src="/mindle-wordmark-white.png"
              alt="Mindle"
              width={160}
              height={38}
              priority
              className="h-6 w-auto object-contain opacity-90"
            />
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.24em] text-white/45">
              Autonomous Product Studio
            </p>
          </div>
        </motion.div>

        {/* Display Headline */}
        <motion.h1
          variants={reveal}
          custom={reducedMotion ? 0 : 0.28}
          initial="hidden"
          animate="visible"
          className="font-display text-[clamp(3.2rem,7vw,7.4rem)] font-semibold leading-[0.9] tracking-[-0.075em] text-white text-balance"
        >
          Ideas deserve to become <span className="text-white/42">extraordinary</span> products.
        </motion.h1>

        {/* Studio Subtitle */}
        <motion.p
          variants={reveal}
          custom={reducedMotion ? 0 : 0.42}
          initial="hidden"
          animate="visible"
          className="mt-7 max-w-lg text-base leading-7 text-white/65 md:text-lg md:leading-8"
        >
          Mindle turns ambitious ideas into intelligent experiences: products that are useful, considered, and built to last.
        </motion.p>

        {/* Conversion Action Triggers */}
        <motion.div
          variants={reveal}
          custom={reducedMotion ? 0 : 0.56}
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

      {/* Chapter 01 Footer Telemetry */}
      <div className="flex items-center justify-between border-t border-white/[0.08] pt-5 font-mono text-[9px] uppercase tracking-[0.22em] text-white/40">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-white/30" />
          <span>The Spark Ignites</span>
        </div>
        <div>
          <span>01 / 06</span>
        </div>
      </div>
    </section>
  );
}

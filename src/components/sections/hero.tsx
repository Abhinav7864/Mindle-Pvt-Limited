"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const reveal = {
  hidden: { opacity: 0, y: 26 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/** The site signature: a product form emerging from a web of possibility. */
function ProductForm() {
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0 : 10;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[570px]">
      <div className="absolute inset-[9%] rounded-full border border-white/[.12]" />
      <div className="absolute inset-[22%] rounded-full border border-white/[.1]" />
      <div className="absolute inset-[36%] rounded-full border border-white/[.08]" />
      <motion.div
        className="absolute inset-[8%] rounded-full border border-dashed border-white/[.16]"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 36, ease: "linear", repeat: Infinity }}
      />
      <motion.svg viewBox="0 0 560 560" className="absolute inset-0 h-full w-full overflow-visible" aria-label="An abstract network evolving into a product form" role="img">
        <defs>
          <filter id="mindle-soften"><feGaussianBlur stdDeviation="1.1" /></filter>
          <radialGradient id="mindle-core"><stop stopColor="#fff" stopOpacity=".85"/><stop offset=".42" stopColor="#bfbfba" stopOpacity=".18"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></radialGradient>
        </defs>
        <motion.path
          d="M76 312 C111 147 268 70 423 130 C544 177 531 397 387 456 C253 511 95 441 76 312Z"
          fill="none"
          stroke="rgba(255,255,255,.5)"
          strokeWidth="1.2"
          strokeDasharray="4 8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, delay: .4, ease: "easeInOut" }}
        />
        <motion.path
          d="M144 272 C191 147 343 154 408 248 C468 335 387 428 279 406 C163 383 114 322 144 272Z"
          fill="none"
          stroke="rgba(255,255,255,.76)"
          strokeWidth="1.4"
          animate={reduceMotion ? undefined : { d: ["M144 272 C191 147 343 154 408 248 C468 335 387 428 279 406 C163 383 114 322 144 272Z", "M125 291 C171 155 353 133 426 242 C480 326 372 443 267 419 C143 392 101 329 125 291Z", "M144 272 C191 147 343 154 408 248 C468 335 387 428 279 406 C163 383 114 322 144 272Z"] }}
          transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle cx="280" cy="280" r="130" fill="url(#mindle-core)" initial={{ scale: .6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2, delay: .25 }} />
        {[[102,274],[184,165],[355,159],[454,263],[390,406],[216,418],[280,280]].map(([cx, cy], index) => (
          <motion.circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={index === 6 ? 6 : 3.5} fill="#f5f5f3" filter="url(#mindle-soften)" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .5 + index * .1 }} />
        ))}
        <motion.path d="M102 274 L184 165 L280 280 L355 159 L454 263 L390 406 L280 280 L216 418 L102 274" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05 }} />
      </motion.svg>
      <div className="absolute inset-[40%] rounded-full border border-white/20 bg-white/[.04] shadow-[0_0_100px_30px_rgba(255,255,255,.08)]" />
      <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[.32em] text-white/35">idea / form / impact</div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative isolate min-h-[min(900px,100svh)] overflow-hidden pt-24">
      <div className="noise-overlay pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-x-0 top-[42%] h-px bg-white/[.08]" />
      <div className="mx-auto grid min-h-[calc(min(900px,100svh)-6rem)] max-w-[1440px] items-center gap-8 px-6 pb-14 md:px-10 lg:grid-cols-[1.03fr_.97fr] lg:px-16">
        <div className="relative z-10 pt-16 lg:pt-8">
          <motion.p variants={reveal} custom={.14} initial="hidden" animate="visible" className="font-mono text-[10px] uppercase tracking-[.24em] text-white/45">
            AI product studio · India / Everywhere
          </motion.p>
          <motion.h1 variants={reveal} custom={.23} initial="hidden" animate="visible" className="mt-7 max-w-4xl font-display text-[clamp(3.5rem,7.1vw,7.35rem)] font-semibold leading-[.9] tracking-[-.075em] text-white">
            Ideas deserve to become <span className="text-white/42">extraordinary</span> products.
          </motion.h1>
          <motion.p variants={reveal} custom={.36} initial="hidden" animate="visible" className="mt-8 max-w-md text-base leading-7 text-white/56 md:text-lg md:leading-8">
            Mindle turns ambitious ideas into intelligent experiences: products that are useful, considered, and built to last.
          </motion.p>
          <motion.div variants={reveal} custom={.48} initial="hidden" animate="visible" className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild variant="primary" size="lg" className="rounded-none px-6 font-medium">
              <Link href="/contact">Start a conversation <ArrowUpRight className="h-4 w-4" /></Link>
            </Button>
            <Link href="#work" className="magnetic-link inline-flex items-center gap-2 px-3 py-3 text-sm text-white/70 hover:text-white">
              Explore our work <ArrowDownRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: .15, ease: [0.22, 1, 0.36, 1] }} className="relative lg:-mr-10">
          <ProductForm />
        </motion.div>
      </div>
      <div className="absolute bottom-6 left-6 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[.2em] text-white/35 md:left-10 lg:left-16"><span className="h-px w-9 bg-white/30" /> Scroll to enter</div>
    </section>
  );
}

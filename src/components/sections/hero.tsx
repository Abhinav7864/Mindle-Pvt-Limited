"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const MindleWorld = dynamic(
  () => import("@/components/scenes/mindle-world").then((module) => module.MindleWorld),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_45%,#2f2f2c_0%,#111_20%,#080808_52%)]" />,
  }
);

const reveal = {
  hidden: { opacity: 0, y: 26 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/** A cinematic, scroll-scrubbed first chapter that gives way to the product story. */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (value) => setProgress(Math.round(value * 100) / 100));

  useLayoutEffect(() => {
    if (reducedMotion || !sectionRef.current || !copyRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "52% top",
          end: "88% top",
          scrub: 0.45,
        },
      }).to(copyRef.current, { yPercent: -18, autoAlpha: 0, ease: "none" });
    }, sectionRef);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="relative h-[185svh] bg-[#080808]">
      <div className="sticky top-0 h-[100svh] min-h-[680px] overflow-hidden">
        <MindleWorld progress={progress} reducedMotion={reducedMotion} />
        <div className="noise-overlay pointer-events-none absolute inset-0 z-[1]" />
        <div className="pointer-events-none absolute inset-x-0 top-[42%] z-[2] h-px bg-white/[.09]" />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(90deg,rgba(8,8,8,.92)_0%,rgba(8,8,8,.48)_36%,rgba(8,8,8,.04)_72%),linear-gradient(0deg,rgba(8,8,8,.74)_0%,transparent_42%)]" />

        <div ref={copyRef} className="relative z-10 mx-auto flex h-full max-w-[1440px] items-center px-6 pt-16 md:px-10 lg:px-16">
          <div className="max-w-[790px] pt-10 lg:pt-0">
            <motion.p variants={reveal} custom={0.14} initial="hidden" animate="visible" className="font-mono text-[10px] uppercase tracking-[.24em] text-white/50">
              AI product studio · India / Everywhere
            </motion.p>
            <motion.h1 variants={reveal} custom={0.23} initial="hidden" animate="visible" className="mt-7 max-w-4xl font-display text-[clamp(3.5rem,7.1vw,7.35rem)] font-semibold leading-[.9] tracking-[-.075em] text-white">
              Ideas deserve to become <span className="text-white/42">extraordinary</span> products.
            </motion.h1>
            <motion.p variants={reveal} custom={0.36} initial="hidden" animate="visible" className="mt-8 max-w-md text-base leading-7 text-white/62 md:text-lg md:leading-8">
              Mindle turns ambitious ideas into intelligent experiences: products that are useful, considered, and built to last.
            </motion.p>
            <motion.div variants={reveal} custom={0.48} initial="hidden" animate="visible" className="mt-10 flex flex-wrap items-center gap-3">
              <Button asChild variant="primary" size="lg" className="rounded-none px-6 font-medium">
                <Link href="/contact">Start a conversation <ArrowUpRight className="h-4 w-4" /></Link>
              </Button>
              <Link href="#work" className="magnetic-link inline-flex items-center gap-2 px-3 py-3 text-sm text-white/80 hover:text-white">
                Explore our work <ArrowDownRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-7 left-6 z-10 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[.2em] text-white/40 md:left-10 lg:left-16">
          <span className="h-px w-9 bg-white/35" /> Scroll to transform
        </div>
        <div className="absolute bottom-7 right-6 z-10 hidden font-mono text-[9px] uppercase tracking-[.2em] text-white/35 md:block">0{Math.min(3, Math.floor(progress * 4) + 1)} / 04</div>
      </div>
    </section>
  );
}

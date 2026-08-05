"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhoneMockup } from "@/components/sections/phone-mockup";
import { StatusBadge } from "@/components/ui/status-badge";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-8 pt-24 sm:pb-12 sm:pt-32 md:pb-16 md:pt-36">
      {/* Backdrop */}
      <div className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)] opacity-50" />

      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-16 px-6 md:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>


          <motion.h1
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="visible"
            className="mt-4 font-display text-[2.25rem] font-extrabold leading-[1.08] tracking-tight text-balance sm:text-5xl md:text-[4.25rem]"
          >
            We build products{" "}
            <span className="text-accent">
              the future runs on
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="visible"
            className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Mindle is a product-first  &amp; software company. We craft
            intelligent SaaS platforms, mobile apps, and developer tools  and
            partner with ambitious teams to build theirs.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            animate="visible"
            className="mt-7 flex flex-wrap items-center gap-3.5"
          >
            <Button asChild variant="primary" size="lg">
              <Link href="/products">
                Explore Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Work With Us</Link>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={4}
            initial="hidden"
            animate="visible"
            className="mt-8 flex items-center gap-2.5 text-xs text-muted-foreground sm:text-sm"
          >
            <Sparkles className="h-4 w-4 text-primary shrink-0" />
            Patent-pending  · 11 Indian languages · Offline-first engineering
          </motion.div>
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto hidden lg:block"
        >
          <div className="animate-[float_6s_ease-in-out_infinite]">
            <div className="animated-border rounded-[2.6rem] p-[2px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]">
              <PhoneMockup className="rounded-[2.5rem] relative bg-background" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroVisual } from "@/components/sections/hero-visual";

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
    <section className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
      {/* Backdrop */}
      <div className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)] opacity-50" />

      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-12 lg:gap-16 px-6 md:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.h1
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate="visible"
            className="font-display text-[2.75rem] font-extrabold leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-[4.25rem]"
          >
            We build products{" "}
            <span className="text-accent">the future runs on</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="visible"
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            Mindle is a product-first AI &amp; software company. We craft
            intelligent SaaS platforms, mobile apps, and developer tools — and
            partner with ambitious teams to build theirs.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="visible"
            className="mt-9 flex flex-wrap items-center gap-4"
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
            custom={3}
            initial="hidden"
            animate="visible"
            className="mt-10 flex items-center gap-3 text-sm text-muted-foreground"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            Patent-pending AI · 11 Indian languages · Offline-first engineering
          </motion.div>
        </div>

        {/* Visual Animation Section */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[540px] block"
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}

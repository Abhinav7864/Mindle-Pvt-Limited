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
    <section className="relative overflow-hidden pb-20 pt-36 md:pb-28 md:pt-44">
      {/* Backdrop */}
      <div className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />
      <div className="absolute left-1/2 top-[-12rem] -z-10 h-[34rem] w-[54rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] blur-2xl" />
      <div className="absolute right-[8%] top-[30%] -z-10 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--secondary)_18%,transparent),transparent)] blur-2xl" />

      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-16 px-6 md:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible">
            <Link
              href="/products/gitaconnect"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/70 py-1.5 pl-2 pr-3.5 text-sm backdrop-blur transition-colors hover:border-primary/40"
            >
              <StatusBadge status="beta" />
              <span className="text-muted-foreground">
                GitaConnect is in beta —{" "}
                <span className="font-medium text-foreground">meet it</span>
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="visible"
            className="mt-6 font-display text-[2.75rem] font-extrabold leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-[4.25rem]"
          >
            We build AI products{" "}
            <span className="text-gradient animate-gradient-text">
              the future runs on
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
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
            custom={3}
            initial="hidden"
            animate="visible"
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button asChild variant="gradient" size="lg">
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
            className="mt-10 flex items-center gap-3 text-sm text-muted-foreground"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            Patent-pending AI · 11 Indian languages · Offline-first engineering
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
            <PhoneMockup className="glow-primary" />
          </div>
          {/* Floating chips */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="glass absolute -right-24 top-16 rounded-2xl border border-border px-4 py-3 shadow-xl"
          >
            <p className="text-xs font-semibold">Anti-hallucination AI</p>
            <p className="text-[11px] text-muted-foreground">
              Verified against 700 verses
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.05, duration: 0.6 }}
            className="glass absolute -left-20 bottom-24 rounded-2xl border border-border px-4 py-3 shadow-xl"
          >
            <p className="text-xs font-semibold">11 languages</p>
            <p className="text-[11px] text-muted-foreground">Language-locked replies</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

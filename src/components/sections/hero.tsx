"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Layers,
  Smartphone,
  Globe2,
  Cpu,
  Copy,
  Check,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { KineticText } from "@/components/ui/kinetic-text";
import { Tilt3D } from "@/components/ui/tilt-3d";
import { StudioRuntimeConsole } from "@/components/sections/studio-runtime-console";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  const [copied, setCopied] = useState(false);
  const cliCommand = "npx mindle@latest create-app";

  const handleCopy = () => {
    navigator.clipboard.writeText(cliCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pb-14 pt-24 sm:pb-20 sm:pt-32 md:pb-24 md:pt-36">
      {/* Dynamic Glow Mesh Backdrops (Mindle Royal Blue & Cyan) */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[550px] w-full max-w-[1250px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top_left,rgba(0,102,255,0.25),transparent_50%),radial-gradient(ellipse_at_top_right,rgba(0,210,255,0.2),transparent_50%)] opacity-80 blur-3xl" />
      <div className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)] opacity-40" />

      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-12 px-6 md:px-8 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          {/* Top Pill */}
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 rounded-full border border-[#00D2FF]/35 bg-[#0066FF]/15 px-3.5 py-1 text-xs font-semibold text-[#00D2FF] shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Product Studio · SaaS Engineering · AI Lab</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="visible"
            className="mt-4 font-display text-[2.25rem] font-extrabold leading-[1.08] tracking-tight text-balance sm:text-5xl md:text-[4.25rem]"
          >
            We build products, SaaS &amp; apps{" "}
            <br className="hidden sm:inline" />
            <KineticText
              phrases={[
                "that shape the future.",
                "built to scale effortlessly.",
                "with intelligent AI.",
                "that users genuinely love.",
              ]}
            />
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="visible"
            className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Mindle is a product-first engineering company. We architect high-performance
            multi-tenant SaaS platforms, modern web applications, native mobile apps, and
            domain-locked AI systems—building our own venture portfolio and engineering
            flagship software with ambitious partners.
          </motion.p>

          {/* Action Buttons & Quick CLI Copy */}
          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button asChild variant="primary" size="lg" className="shadow-lg shadow-accent/20">
              <Link href="#studio-showreel">
                <Play className="h-4 w-4 fill-current mr-1" />
                Watch What We Build
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Work With Us</Link>
            </Button>

            {/* Tesser-inspired CLI copy pill */}
            <div className="flex items-center gap-2 rounded-xl border border-border bg-card/80 px-3 py-2 text-xs font-mono backdrop-blur-md shadow-sm">
              <span className="text-muted-foreground select-none">$</span>
              <span className="text-foreground">{cliCommand}</span>
              <button
                onClick={handleCopy}
                className="ml-1 rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                title="Copy CLI command"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </motion.div>

          {/* Capability Badges Strip */}
          <motion.div
            variants={fadeUp}
            custom={4}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground sm:text-sm pt-4 border-t border-border/50"
          >
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <Layers className="h-4 w-4 text-amber-500 shrink-0" /> Multi-Tenant SaaS
            </span>
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <Globe2 className="h-4 w-4 text-blue-500 shrink-0" /> Full-Stack Web Apps
            </span>
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <Smartphone className="h-4 w-4 text-emerald-500 shrink-0" /> Native Mobile
            </span>
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <Cpu className="h-4 w-4 text-purple-400 shrink-0" /> Grounded AI
            </span>
          </motion.div>
        </div>

        {/* Right Visual: Tesser-Inspired Studio Runtime Console */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto hidden lg:block w-full"
        >
          <Tilt3D maxTilt={10} className="w-full">
            <StudioRuntimeConsole />
          </Tilt3D>
        </motion.div>
      </div>
    </section>
  );
}

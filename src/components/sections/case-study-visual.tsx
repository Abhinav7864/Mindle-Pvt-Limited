"use client";

import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Cpu, Activity } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";

interface Metric {
  label: string;
  value: string;
}

export function CaseStudyVisual({ results }: { results: Metric[] }) {
  const icons = [Sparkles, Cpu, Activity, ShieldCheck];

  return (
    <div className="relative flex min-h-[400px] w-full items-center justify-center overflow-hidden bg-surface-1 p-6 md:p-10 lg:[direction:ltr]">
      {/* Background Grid */}
      <div className="bg-grid absolute inset-0 opacity-40" />

      {/* Animated Light Beam Scanner */}
      <motion.div
        animate={{
          y: ["-100%", "200%"],
          opacity: [0, 0.4, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 4.5,
          ease: "easeInOut",
        }}
        className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-accent/20 to-transparent blur-md -z-10 pointer-events-none"
      />

      {/* Ambient Accent Radial Glow */}
      <div className="absolute -inset-10 rounded-full bg-accent/10 blur-3xl -z-10 pointer-events-none" />

      {/* Main Interactive Stage Container */}
      <div className="relative w-full max-w-md space-y-4 z-10">
        {/* Top Live System Activity HUD Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between rounded-xl border border-border/80 bg-card/90 px-3.5 py-2 text-xs backdrop-blur-md shadow-sm"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="font-semibold text-foreground">Sarvam-30B Engine</span>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            100% Verified
          </span>
        </motion.div>

        {/* 2x2 Floating Animated Stat Cards Grid */}
        <div className="grid gap-3.5 sm:grid-cols-2">
          {results.map((r, idx) => {
            const Icon = icons[idx % icons.length];
            const numValue = parseInt(r.value, 10);
            const isNumber = !isNaN(numValue);

            return (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card p-5 shadow-sm transition-colors duration-300 hover:border-accent/40"
              >
                {/* Top Row: Label + Icon */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {r.label}
                  </span>
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                </div>

                {/* Animated Stat Value */}
                <p className="font-display text-3xl font-extrabold tracking-tight text-accent">
                  {isNumber ? (
                    <AnimatedCounter value={numValue} />
                  ) : (
                    r.value
                  )}
                </p>

                {/* Animated Hover Accent Beam Line */}
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-accent/0 transition-all duration-300 group-hover:bg-accent" />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Feature Pulse Strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-between text-[11px] text-muted-foreground px-1"
        >
          <span className="flex items-center gap-1.5 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            7 Subsystems Patent-Pending
          </span>
          <span className="font-mono text-[10px] text-muted-foreground/80">
            Offline-First · Swift
          </span>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Sparkles, Layers, Cpu, ShieldCheck, Zap, Code2, Server } from "lucide-react";

const studioStats = [
  {
    value: "4+",
    label: "Platforms Built",
    subtext: "SaaS, Mobile & Developer Tools",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    value: "11",
    label: "Languages Native AI",
    subtext: "Strict language-lock models",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    value: "<0.8ms",
    label: "Offline Read Sync",
    subtext: "Device-resident local datastore",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    value: "7",
    label: "Patent Subsystems",
    subtext: "Proprietary AI & system architecture",
    gradient: "from-emerald-400 to-teal-500",
  },
];

export function CompanyHeroVisual() {
  return (
    <div className="relative w-full max-w-[540px] mx-auto select-none">
      {/* Background Ambient Glow */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-accent/25 via-primary/15 to-purple-500/20 opacity-70 blur-3xl animate-pulse -z-10" />

      {/* Floating Badge: Top Right */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="absolute -top-4 -right-2 z-20 hidden sm:flex items-center gap-2 rounded-full border border-border bg-card/90 px-3.5 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-md"
      >
        <Sparkles className="h-3.5 w-3.5 text-primary" />
        <span className="text-foreground">Product-First AI Studio</span>
      </motion.div>

      {/* Floating Badge: Bottom Left */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute -bottom-4 -left-2 z-20 hidden sm:flex items-center gap-2 rounded-full border border-border bg-card/90 px-3.5 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-md"
      >
        <Zap className="h-3.5 w-3.5 text-amber-500" />
        <span className="text-muted-foreground">Engineering Excellence</span>
      </motion.div>

      {/* Main Glass Canvas Card */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-border/80 bg-gradient-to-b from-card via-card/95 to-card/90 p-8 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] backdrop-blur-xl">
        {/* Soft Background Grid Lines Pattern */}
        <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[320px] sm:min-h-[340px]">
          {/* 2x2 Metric Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5 w-full max-w-[440px]">
            {studioStats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + idx * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="group relative flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-card p-5 sm:p-6 text-center shadow-md transition-all duration-300 hover:border-primary/40 hover:shadow-xl"
              >
                {/* Glow on Hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <span
                  className={`font-display text-2.5xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                >
                  {stat.value}
                </span>
                <span className="mt-1.5 text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Bottom Subtitle / Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 flex items-center gap-2 text-xs font-medium text-muted-foreground"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            <span>Mindle Pvt. Ltd. · Building Intelligent Software</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

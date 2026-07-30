"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Database,
  BarChart3,
  Globe2,
  ShieldCheck,
  Zap,
  Cpu,
  CheckCircle2,
  Activity,
  ChevronRight,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";

const modules = [
  {
    id: "ai",
    label: "AI Mentor Engine",
    icon: Sparkles,
    badge: "Anti-Hallucination Verified",
    color: "from-amber-500/20 to-orange-600/20",
    accentColor: "text-amber-500",
    borderColor: "border-amber-500/30",
  },
  {
    id: "offline",
    label: "Offline-First Datastore",
    icon: Database,
    badge: "0ms Local Read Latency",
    color: "from-blue-500/20 to-cyan-600/20",
    accentColor: "text-cyan-400",
    borderColor: "border-cyan-500/30",
  },
  {
    id: "analytics",
    label: "Spiritual Analytics",
    icon: BarChart3,
    badge: "90-Day Trend Engine",
    color: "from-emerald-500/20 to-teal-600/20",
    accentColor: "text-emerald-400",
    borderColor: "border-emerald-500/30",
  },
  {
    id: "languages",
    label: "11 Language Matrix",
    icon: Globe2,
    badge: "Strict Language-Lock",
    color: "from-purple-500/20 to-pink-600/20",
    accentColor: "text-purple-400",
    borderColor: "border-purple-500/30",
  },
];

const languageList = [
  { name: "Sanskrit", native: "संस्कृतम्" },
  { name: "Hindi", native: "हिन्दी" },
  { name: "Tamil", native: "தமிழ்" },
  { name: "Telugu", native: "తెలుగు" },
  { name: "Kannada", native: "கன்னட" },
  { name: "Marathi", native: "मराठी" },
  { name: "Gujarati", native: "ગુજરાતી" },
  { name: "Bengali", native: "বাংলা" },
  { name: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { name: "Malayalam", native: "മലയാളം" },
  { name: "Odia", native: "ଓଡ଼ିଆ" },
];

export function HeroVisual() {
  const [activeTab, setActiveTab] = useState("ai");
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle tabs every 4 seconds unless user interacts
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = modules.findIndex((m) => m.id === prev);
        const nextIndex = (currentIndex + 1) % modules.length;
        return modules[nextIndex].id;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeModule = modules.find((m) => m.id === activeTab) || modules[0];

  return (
    <div
      className="relative w-full max-w-[540px] mx-auto select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Animated Glow Rays */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-accent/30 via-primary/20 to-purple-500/20 opacity-70 blur-3xl animate-pulse -z-10" />

      {/* Floating Status Pill: Top Right */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute -top-5 -right-2 z-20 hidden sm:flex items-center gap-2 rounded-full border border-border bg-card/90 px-3.5 py-1.5 text-xs font-medium shadow-xl backdrop-blur-md"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <Cpu className="h-3.5 w-3.5 text-primary" />
        <span className="text-foreground font-semibold">Sarvam-30B AI Engine</span>
      </motion.div>

      {/* Floating Status Pill: Bottom Left */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute -bottom-5 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-border bg-card/90 px-3.5 py-1.5 text-xs font-medium shadow-xl backdrop-blur-md"
      >
        <ShieldCheck className="h-4 w-4 text-emerald-500" />
        <span className="text-muted-foreground">Domain Lock:</span>
        <span className="text-foreground font-semibold">100% Verified</span>
      </motion.div>

      {/* Main Glass Container */}
      <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/95 p-5 sm:p-6 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.18)] backdrop-blur-xl">
        {/* Header Module Switcher Tabs */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 pb-4 border-b border-border/60">
          {modules.map((m) => {
            const Icon = m.icon;
            const isActive = activeTab === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveTab(m.id)}
                className={cn(
                  "relative flex flex-col items-center justify-center rounded-xl p-2.5 text-xs font-medium transition-all duration-300",
                  isActive
                    ? "bg-accent/15 text-foreground font-semibold shadow-sm"
                    : "text-muted-foreground hover:bg-card-hover hover:text-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 mb-1 transition-transform duration-300",
                    isActive ? "scale-110 " + m.accentColor : "text-muted-foreground"
                  )}
                />
                <span className="text-[11px] truncate w-full text-center">{m.label.split(" ")[0]}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 rounded-xl border border-primary/40 bg-accent/10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Display Stage */}
        <div className="mt-4 relative min-h-[280px] sm:min-h-[300px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex-1 flex flex-col justify-between"
            >
              {/* Tab Header Banner */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className={cn("p-1.5 rounded-lg bg-accent/20", activeModule.accentColor)}>
                    <activeModule.icon className="h-4 w-4" />
                  </span>
                  <span className="font-display font-bold text-sm sm:text-base text-foreground">
                    {activeModule.label}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-0.5 text-[11px] text-muted-foreground font-medium">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  {activeModule.badge}
                </span>
              </div>

              {/* Specific Interactive Visual Content per Tab */}
              {activeTab === "ai" && (
                <div className="space-y-3 py-2">
                  {/* User Prompt Bubble */}
                  <div className="flex items-start gap-2.5 justify-end">
                    <div className="rounded-2xl rounded-tr-sm bg-accent/20 border border-accent/30 p-3 text-xs sm:text-sm text-foreground max-w-[85%]">
                      <p className="font-medium text-accent">"I feel overwhelmed with work decisions today. What does the Gita say?"</p>
                    </div>
                  </div>

                  {/* AI Response Stream Bubble */}
                  <div className="flex items-start gap-2.5">
                    <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground font-bold text-xs shadow-md">
                      <Sparkles className="h-3.5 w-3.5" />
                    </div>
                    <div className="rounded-2xl rounded-tl-sm border border-border bg-card p-3.5 text-xs sm:text-sm shadow-sm space-y-2 max-w-[90%]">
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground pb-1 border-b border-border/50">
                        <span className="font-semibold text-primary">Bhagavad Gita · Chapter 2, Verse 47</span>
                        <span className="text-emerald-500 font-mono flex items-center gap-1">
                          <ShieldCheck className="h-3 w-3" /> Verified
                        </span>
                      </div>
                      <p className="italic text-foreground/90 font-serif leading-relaxed">
                        "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन..."
                      </p>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        You have a right to perform your prescribed duty, but never to the fruits of action. Focus on effort, let go of outcome anxiety.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "offline" && (
                <div className="py-3 space-y-4">
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="rounded-xl border border-border bg-card p-3 text-center">
                      <p className="text-xs text-muted-foreground">Datastore</p>
                      <p className="mt-1 font-display text-lg font-bold text-foreground">700 Verses</p>
                      <p className="text-[10px] text-emerald-500 font-medium">On-Device SQLite</p>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-3 text-center">
                      <p className="text-xs text-muted-foreground">Read Speed</p>
                      <p className="mt-1 font-display text-lg font-bold text-cyan-400">&lt; 0.8 ms</p>
                      <p className="text-[10px] text-cyan-500 font-medium">Zero Network</p>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-3 text-center">
                      <p className="text-xs text-muted-foreground">Cloud Sync</p>
                      <p className="mt-1 font-display text-lg font-bold text-foreground">Retry-Safe</p>
                      <p className="text-[10px] text-emerald-500 font-medium">Background Queue</p>
                    </div>
                  </div>

                  {/* Simulated Real-Time Sync Waveform */}
                  <div className="rounded-xl border border-border bg-card/60 p-3 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-muted-foreground font-medium">
                        <Activity className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
                        Local-First Datastore Activity
                      </span>
                      <span className="font-mono text-[10px] text-emerald-400">100% Offline Capable</span>
                    </div>
                    <div className="flex items-end gap-1.5 h-10 pt-1">
                      {[40, 65, 30, 85, 95, 45, 75, 90, 60, 100, 80, 55, 90, 70].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: "20%" }}
                          animate={{ height: `${h}%` }}
                          transition={{
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 1 + (i % 3) * 0.4,
                            ease: "easeInOut",
                          }}
                          className="flex-1 rounded-full bg-gradient-to-t from-cyan-500 to-blue-400 opacity-80"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "analytics" && (
                <div className="py-2 space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-border bg-card p-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-orange-500/15 text-orange-500 font-bold">
                        <Flame className="h-5 w-5 fill-orange-500" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Current Practice Streak</p>
                        <p className="font-display text-lg font-extrabold text-foreground">42 Days Active</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-500">
                      Top 2%
                    </span>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-3 space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-muted-foreground">90-Day Spiritual Growth</span>
                      <span className="text-accent">+148% Verse Mastery</span>
                    </div>
                    <div className="space-y-2 pt-1">
                      <div>
                        <div className="flex justify-between text-[11px] text-muted-foreground mb-1">
                          <span>Mantra Jaap Repetitions</span>
                          <span className="font-semibold text-foreground">4,536 / 5,000</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "90%" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[11px] text-muted-foreground mb-1">
                          <span>Gita Chapter Completion</span>
                          <span className="font-semibold text-foreground">14 of 18 Chapters</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "78%" }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "languages" && (
                <div className="py-2 space-y-3">
                  <p className="text-xs text-muted-foreground">
                    Strict language-lock AI mentor responds seamlessly in 11 Indian languages:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {languageList.map((lang, idx) => (
                      <motion.div
                        key={lang.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.04, duration: 0.3 }}
                        className={cn(
                          "flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs transition-all",
                          idx === 0 || idx === 1
                            ? "border-purple-500/40 bg-purple-500/10 font-semibold text-purple-300"
                            : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                        )}
                      >
                        <span className="font-medium text-foreground">{lang.name}</span>
                        <span className="text-[10px] text-muted-foreground">({lang.native})</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Quick Feature Strip */}
              <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Zap className="h-3.5 w-3.5 text-amber-500" />
                  Real-Time Dynamic Interactive Engine
                </span>
                <span className="flex items-center gap-0.5 text-primary hover:underline cursor-pointer font-medium">
                  Explore Tech Stack <ChevronRight className="h-3 w-3" />
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

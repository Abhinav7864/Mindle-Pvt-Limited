"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  HeartPulse,
  Music,
  BarChart3,
  ShieldCheck,
  Volume2,
  CheckCircle2,
  Sparkle,
  BookOpen,
  Star,
  Users,
  Languages,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tilt3D } from "@/components/ui/tilt-3d";
import { AnimatedCounter } from "@/components/ui/animated-counter";

interface Metric {
  label: string;
  value: string;
}

const gitaScreens = [
  {
    id: "ai",
    label: "AI Spiritual Mentor",
    sublabel: "Scripture Verified",
    icon: Sparkles,
    image: "/Photo2.png",
    accentColor: "text-amber-500",
    badgeBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    id: "mood",
    label: "Mood → Verse Guidance",
    sublabel: "Emotional Slider Mapping",
    icon: HeartPulse,
    image: "/Photo1.png",
    accentColor: "text-rose-500",
    badgeBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
  {
    id: "mantra",
    label: "Mantra & Jaap Counter",
    sublabel: "140 Mantras & Haptic Mala",
    icon: Music,
    image: "/Photo3.png",
    accentColor: "text-orange-500",
    badgeBg: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
  {
    id: "analytics",
    label: "90-Day Analytics",
    sublabel: "Mood & Practice Trends",
    icon: BarChart3,
    image: "/Photo.png",
    accentColor: "text-emerald-500",
    badgeBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
];

const panchatantraTiers = [
  {
    tier: "early",
    label: "Tier 1: Ages 4–8",
    subtitle: "Playful & Visual Fables",
    badge: "Early Learner",
    question: "The little rabbit is trapped by the fierce lion. What should the rabbit do?",
    options: [
      { text: "Use clever wits to guide the lion to a deep well", isCorrect: true, feedback: "✨ Correct! Intelligence overcomes raw strength." },
      { text: "Try to fight the lion head-on", isCorrect: false, feedback: "💡 Wits and strategy are wiser than fighting brute force." },
    ],
  },
  {
    tier: "youth",
    label: "Tier 2: Ages 9–14",
    subtitle: "Moral Reasoning & Dilemmas",
    badge: "Ethical Strategist",
    question: "Two friends find a bag of gold. One suggests burying it, planning to secretly take it later. What does this teach?",
    options: [
      { text: "Greed destroys trust and creates internal torment", isCorrect: true, feedback: "✨ True moral reasoning: Integrity is the foundation of alliance." },
      { text: "Whoever finds treasure first should hide it alone", isCorrect: false, feedback: "💡 Deceit always unravels and harms both parties." },
    ],
  },
];

export function CaseStudyVisual({
  results,
  slug = "gitaconnect",
}: {
  results: Metric[];
  slug?: string;
}) {
  const isPanchatantra = slug === "panchatantra-ai";

  // GitaConnect states
  const [activeTab, setActiveTab] = useState("ai");
  const [isPaused, setIsPaused] = useState(false);

  // Panchatantra AI states
  const [activeTierIdx, setActiveTierIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Auto-cycle tabs for GitaConnect unless paused
  useEffect(() => {
    if (isPanchatantra || isPaused) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = gitaScreens.findIndex((s) => s.id === prev);
        const nextIndex = (currentIndex + 1) % gitaScreens.length;
        return gitaScreens[nextIndex].id;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, isPanchatantra]);

  const activeGitaScreen = gitaScreens.find((s) => s.id === activeTab) || gitaScreens[0];
  const activeTier = panchatantraTiers[activeTierIdx];

  if (isPanchatantra) {
    return (
      <div className="relative flex min-h-[520px] w-full flex-col items-center justify-center overflow-hidden bg-surface-1 p-6 md:p-10 lg:[direction:ltr]">
        {/* Background Mesh Lighting */}
        <div className="bg-grid absolute inset-0 opacity-30" />
        <div className="absolute -inset-10 rounded-full bg-gradient-to-tr from-emerald-500/20 via-teal-500/15 to-blue-600/15 blur-3xl -z-10 pointer-events-none" />

        <div className="relative w-full max-w-lg z-10 space-y-4">
          <Tilt3D maxTilt={8} className="w-full">
            {/* Tablet Mockup Container for Panchatantra Kids */}
            <div className="relative mx-auto w-full max-w-[340px] rounded-[2.5rem] border-[3px] border-border/80 bg-zinc-950 p-3 shadow-2xl">
              <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5] bg-emerald-950/40">
                <img
                  src="/panchatantra-kids.jpg"
                  alt="Panchatantra AI Kids Explorer"
                  className="w-full h-full object-cover object-top"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                {/* Simulated Floating "Pause & Ponder" Card */}
                <div className="absolute bottom-3 inset-x-3 rounded-2xl border border-emerald-500/30 bg-black/85 p-3.5 backdrop-blur-md text-xs text-white">
                  <div className="flex items-center justify-between pb-1.5 border-b border-zinc-800">
                    <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                      <Star className="h-3.5 w-3.5 fill-emerald-400" />
                      Pause &amp; Ponder Dilemma
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">{activeTier.badge}</span>
                  </div>
                  <p className="mt-1.5 text-[11px] leading-snug text-zinc-200">
                    {activeTier.question}
                  </p>

                  <div className="mt-2 space-y-1.5">
                    {activeTier.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => setSelectedOption(oIdx)}
                        className={`w-full rounded-lg px-2.5 py-1.5 text-left text-[10px] leading-tight transition-all border ${
                          selectedOption === oIdx
                            ? opt.isCorrect
                              ? "bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-semibold"
                              : "bg-amber-500/20 border-amber-500/60 text-amber-300"
                            : "bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:bg-zinc-800"
                        }`}
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>

                  {selectedOption !== null && (
                    <p className="mt-1.5 text-[10px] text-emerald-300 font-medium">
                      {activeTier.options[selectedOption].feedback}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Tilt3D>

          {/* Age Tier Switcher */}
          <div className="grid grid-cols-2 gap-2">
            {panchatantraTiers.map((tier, idx) => (
              <button
                key={tier.tier}
                onClick={() => {
                  setActiveTierIdx(idx);
                  setSelectedOption(null);
                }}
                className={`flex items-center justify-center gap-2 rounded-xl p-2.5 text-xs font-medium border transition-all ${
                  activeTierIdx === idx
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold shadow-sm"
                    : "border-border/60 bg-card/60 text-muted-foreground hover:bg-card hover:text-foreground"
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span className="text-[11px] truncate">{tier.label}</span>
              </button>
            ))}
          </div>

          {/* Results Metrics Bar */}
          <div className="grid grid-cols-4 gap-2 pt-3 border-t border-border/60">
            {results.map((r) => {
              const numValue = parseInt(r.value, 10);
              const isNumber = !isNaN(numValue);
              return (
                <div key={r.label} className="text-center rounded-lg bg-card/80 border border-border/50 p-2">
                  <p className="font-display font-bold text-accent text-sm sm:text-base">
                    {isNumber ? <AnimatedCounter value={numValue} /> : r.value}
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">{r.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // GitaConnect Case Study Visual
  return (
    <div
      className="relative flex min-h-[520px] w-full flex-col items-center justify-center overflow-hidden bg-surface-1 p-6 md:p-10 lg:[direction:ltr]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Mesh Lighting */}
      <div className="bg-grid absolute inset-0 opacity-30" />
      <div className="absolute -inset-10 rounded-full bg-gradient-to-tr from-accent/20 via-amber-500/15 to-purple-600/15 blur-3xl -z-10 pointer-events-none" />

      {/* Main Interactive Stage */}
      <div className="relative w-full max-w-lg z-10">
        <Tilt3D maxTilt={10} className="w-full">
          {/* iPhone Mockup Container */}
          <div className="relative mx-auto w-[270px] sm:w-[290px] rounded-[3rem] border-[3px] border-border/80 bg-black/90 p-2.5 shadow-2xl">
            {/* Dynamic Island Notch */}
            <div className="absolute left-1/2 top-4 z-40 h-4 w-24 -translate-x-1/2 rounded-full bg-black flex items-center justify-between px-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-900 border border-blue-400/30" />
              <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Screen Display */}
            <div className="relative overflow-hidden rounded-[2.4rem] bg-black aspect-[9/19.5] shadow-inner">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeGitaScreen.id}
                  src={activeGitaScreen.image}
                  alt={activeGitaScreen.label}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full object-cover object-top"
                />
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-60" />
            </div>
          </div>
        </Tilt3D>

        {/* Feature Switcher Control Tabs */}
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {gitaScreens.map((screen) => {
            const Icon = screen.icon;
            const isActive = activeTab === screen.id;
            return (
              <button
                key={screen.id}
                onClick={() => setActiveTab(screen.id)}
                className={cn(
                  "group relative flex flex-col items-center justify-center rounded-xl p-2 text-xs font-medium transition-all duration-300 border",
                  isActive
                    ? "border-accent/40 bg-card shadow-sm text-foreground font-semibold"
                    : "border-border/60 bg-card/60 text-muted-foreground hover:bg-card hover:text-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "h-3.5 w-3.5 mb-1 transition-transform group-hover:scale-110",
                    isActive ? screen.accentColor : "text-muted-foreground"
                  )}
                />
                <span className="text-[10px] truncate w-full text-center">
                  {screen.label.split(" ")[0]}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="caseStudyActiveOutline"
                    className="absolute inset-0 rounded-xl border-2 border-accent/60 pointer-events-none"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Results Metrics Bar below the app showcase */}
        <div className="mt-4 grid grid-cols-4 gap-2 pt-3 border-t border-border/60">
          {results.map((r) => {
            const numValue = parseInt(r.value, 10);
            const isNumber = !isNaN(numValue);
            return (
              <div key={r.label} className="text-center rounded-lg bg-card/80 border border-border/50 p-2">
                <p className="font-display font-bold text-accent text-sm sm:text-base">
                  {isNumber ? <AnimatedCounter value={numValue} /> : r.value}
                </p>
                <p className="text-[10px] text-muted-foreground truncate">{r.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

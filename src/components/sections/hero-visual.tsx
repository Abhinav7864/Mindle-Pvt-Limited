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
} from "lucide-react";
import { cn } from "@/lib/utils";

const appScreens = [
  {
    id: "ai",
    label: "AI Spiritual Mentor",
    sublabel: "Scripture-Locked AI",
    icon: Sparkles,
    image: "/Photo2.png",
    accentColor: "text-amber-500",
    borderColor: "border-amber-500/40",
    badgeBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    floatingBadge: {
      title: "Anti-Hallucination AI",
      text: "Verified against 700 Gita verses",
      icon: ShieldCheck,
      iconColor: "text-emerald-500",
    },
  },
  {
    id: "mood",
    label: "Mood → Verse Check-in",
    sublabel: "Emotional Slider Guidance",
    icon: HeartPulse,
    image: "/Photo1.png",
    accentColor: "text-rose-500",
    borderColor: "border-rose-500/40",
    badgeBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    floatingBadge: {
      title: "Feeling Anxious?",
      text: "Instant verse recommendation",
      icon: Sparkle,
      iconColor: "text-rose-500",
    },
  },
  {
    id: "mantra",
    label: "Mantra & Jaap Counter",
    sublabel: "140 Mantras & Haptic Mala",
    icon: Music,
    image: "/Photo3.png",
    accentColor: "text-orange-500",
    borderColor: "border-orange-500/40",
    badgeBg: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    floatingBadge: {
      title: "Digital Jaap Counter",
      text: "Light & heavy haptic feedback",
      icon: Volume2,
      iconColor: "text-amber-500",
    },
  },
  {
    id: "analytics",
    label: "90-Day Analytics",
    sublabel: "Mood & Practice Trends",
    icon: BarChart3,
    image: "/Photo.png",
    accentColor: "text-emerald-500",
    borderColor: "border-emerald-500/40",
    badgeBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    floatingBadge: {
      title: "Spiritual Level: 42",
      text: "Top 2% consistent practitioner",
      icon: CheckCircle2,
      iconColor: "text-emerald-500",
    },
  },
];

export function HeroVisual() {
  const [activeTab, setActiveTab] = useState("ai");
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle through GitaConnect app features
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = appScreens.findIndex((s) => s.id === prev);
        const nextIndex = (currentIndex + 1) % appScreens.length;
        return appScreens[nextIndex].id;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeScreen = appScreens.find((s) => s.id === activeTab) || appScreens[0];

  return (
    <div
      className="relative w-full max-w-[480px] mx-auto select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Sacred Radiant Backlight Glow */}
      <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-amber-500/30 via-orange-600/20 to-purple-600/25 blur-3xl opacity-80 animate-pulse -z-10" />

      {/* Main iPhone 16 Pro Showcase Container */}
      <div className="relative mx-auto w-[290px] sm:w-[310px] rounded-[3.2rem] border-[3px] border-border/80 bg-black/90 p-3 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.35)]">
        {/* Dynamic Island Notch */}
        <div className="absolute left-1/2 top-5 z-40 h-5 w-28 -translate-x-1/2 rounded-full bg-black flex items-center justify-between px-2.5">
          <div className="h-2 w-2 rounded-full bg-blue-950/80 border border-blue-500/30" />
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        {/* Screen Display Frame */}
        <div className="relative overflow-hidden rounded-[2.6rem] bg-black aspect-[9/19.5] shadow-inner">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeScreen.id}
              src={activeScreen.image}
              alt={activeScreen.label}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full object-cover object-top"
            />
          </AnimatePresence>

          {/* Dynamic Screen Overlay Sheen */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-60" />
        </div>
      </div>

      {/* Interactive App Screen Switcher Controls */}
      <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {appScreens.map((screen) => {
          const Icon = screen.icon;
          const isActive = activeTab === screen.id;
          return (
            <button
              key={screen.id}
              onClick={() => setActiveTab(screen.id)}
              className={cn(
                "group relative flex flex-col items-center justify-center rounded-2xl p-2.5 text-xs font-medium transition-all duration-300 border",
                isActive
                  ? "border-accent/40 bg-card shadow-md text-foreground"
                  : "border-border/60 bg-card/60 text-muted-foreground hover:bg-card hover:text-foreground"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 mb-1 transition-transform duration-300 group-hover:scale-110",
                  isActive ? screen.accentColor : "text-muted-foreground"
                )}
              />
              <span className="text-[11px] font-semibold truncate w-full text-center">
                {screen.label.split(" ")[0]}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTabOutline"
                  className="absolute inset-0 rounded-2xl border-2 border-accent/60 pointer-events-none"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

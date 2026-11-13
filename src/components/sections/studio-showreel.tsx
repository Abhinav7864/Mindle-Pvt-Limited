"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Layers,
  Globe2,
  Smartphone,
  Cpu,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Activity,
  CheckCircle2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

interface ShowreelScene {
  id: string;
  title: string;
  category: string;
  headline: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  badgeBg: string;
  stats: { label: string; value: string }[];
}

const scenes: ShowreelScene[] = [
  {
    id: "saas",
    title: "SaaS Platforms",
    category: "01 · Enterprise Architecture",
    headline: "Scalable Multi-Tenant Platforms Built for Revenue",
    description:
      "We build multi-tenant SaaS products from the ground up: isolated schemas with PostgreSQL RLS, automated Stripe subscription billing, role-based access, and real-time observability.",
    icon: Layers,
    accentColor: "text-amber-500",
    badgeBg: "bg-amber-500/10 border-amber-500/30 text-amber-500",
    stats: [
      { label: "Tenant Isolation", value: "PostgreSQL RLS" },
      { label: "Billing Engine", value: "Stripe & LemonSqueezy" },
      { label: "P99 Response", value: "< 24ms" },
      { label: "Architecture", value: "Micro-SaaS & Core" },
    ],
  },
  {
    id: "web",
    title: "Web Applications",
    category: "02 · Modern Full-Stack",
    headline: "High-Speed Full-Stack Web Apps That Convert",
    description:
      "Engineered with Next.js, React, TypeScript, and modern edge infrastructure. Every web application we ship is optimized for instant page loads, robust SEO, and frictionless user experiences.",
    icon: Globe2,
    accentColor: "text-blue-500",
    badgeBg: "bg-blue-500/10 border-blue-500/30 text-blue-500",
    stats: [
      { label: "Framework", value: "Next.js 16 Edge" },
      { label: "Type Safety", value: "100% TypeScript" },
      { label: "Global PoPs", value: "280+ Edge Nodes" },
      { label: "Lighthouse", value: "98+ Avg Score" },
    ],
  },
  {
    id: "mobile",
    title: "Mobile Ecosystems",
    category: "03 · Native iOS & Android",
    headline: "Delightful Mobile Apps With Offline-First Precision",
    description:
      "From App Store deployment to offline-first architectures. We engineer native iOS and Android apps with device-resident datastores, customized haptics, and background cloud queues.",
    icon: Smartphone,
    accentColor: "text-emerald-500",
    badgeBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-500",
    stats: [
      { label: "Local Latency", value: "< 0.8ms SQLite" },
      { label: "Offline Mode", value: "Zero Data Loss" },
      { label: "Haptic Engine", value: "Native Calibrated" },
      { label: "Stack", value: "Swift, SwiftUI, React Native" },
    ],
  },
  {
    id: "ai",
    title: "AI & RAG Systems",
    category: "04 · Intelligent Products",
    headline: "Domain-Restricted AI With Zero Hallucinations",
    description:
      "We build domain-locked AI assistants and autonomous workflows verified against authoritative datasets. Multi-lingual prompt frameworks that converse seamlessly across 11 Indian languages.",
    icon: Cpu,
    accentColor: "text-purple-500",
    badgeBg: "bg-purple-500/10 border-purple-500/30 text-purple-400",
    stats: [
      { label: "Domain Lock", value: "Scripture & Corpus Verified" },
      { label: "Hallucination", value: "0% Tolerated" },
      { label: "Languages", value: "11 Indian Tongues" },
      { label: "Intelligence", value: "Custom RAG & Multi-LLM" },
    ],
  },
];

export function StudioShowreel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasRealVideo, setHasRealVideo] = useState(false);
  const [viewMode, setViewMode] = useState<"video" | "interactive">("video");
  const videoRef = useRef<HTMLVideoElement>(null);

  // Check if an actual video file exists in public/
  useEffect(() => {
    fetch("/mindle-showreel.mp4", { method: "HEAD" })
      .then((res) => {
        if (res.ok) {
          setHasRealVideo(true);
          setViewMode("video");
        }
      })
      .catch(() => {});
  }, []);

  // Auto-progress through showreel scenes when playing
  useEffect(() => {
    if (!isPlaying || hasRealVideo) return;
    const intervalMs = 60;
    const step = (intervalMs / 5000) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIdx((current) => (current + 1) % scenes.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, hasRealVideo]);

  const currentScene = scenes[activeIdx];

  const handleSceneSelect = (index: number) => {
    setActiveIdx(index);
    setProgress(0);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <section id="studio-showreel" className="relative py-16 sm:py-24 md:py-32 overflow-hidden bg-background">
      {/* Background radial lighting */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-full max-w-[1100px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.18),transparent_70%)] blur-3xl" />

      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8">
        <SectionHeading
          eyebrow="What Mindle Builds"
          title={
            <>
              From bold ideas to <span className="text-accent">production reality</span>
            </>
          }
          description="We are a product studio &amp; software company. We craft multi-tenant SaaS platforms, high-speed web apps, native mobile ecosystems, and autonomous AI."
        />

        {/* Cinematic Player Frame */}
        <Reveal className="mt-12">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-border/80 bg-zinc-950 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.6)]">
            {/* Player Header Bar */}
            <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/60 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-mono font-medium text-red-400">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                  Mindle Reel · 4K 60FPS
                </span>
                <span className="hidden sm:inline font-mono text-xs text-zinc-400">
                  Interactive Studio Showcase
                </span>
              </div>

              {/* View Switcher & Play / Pause Button */}
              <div className="flex items-center gap-2.5">
                {hasRealVideo && (
                  <div className="flex items-center rounded-full border border-zinc-700 bg-zinc-800/80 p-0.5 text-xs">
                    <button
                      onClick={() => setViewMode("video")}
                      className={`flex items-center gap-1 rounded-full px-3 py-1 font-medium transition-all ${
                        viewMode === "video"
                          ? "bg-[#0066FF] text-white shadow-sm"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      <Play className="h-3 w-3 fill-current" />
                      <span>Video Film</span>
                    </button>
                    <button
                      onClick={() => setViewMode("interactive")}
                      className={`flex items-center gap-1 rounded-full px-3 py-1 font-medium transition-all ${
                        viewMode === "interactive"
                          ? "bg-[#0066FF] text-white shadow-sm"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      <Sparkles className="h-3 w-3" />
                      <span>Interactive Reel</span>
                    </button>
                  </div>
                )}

                {viewMode === "interactive" && (
                  <button
                    onClick={togglePlay}
                    className="flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800/80 px-3.5 py-1.5 text-xs font-medium text-zinc-200 hover:bg-zinc-700 transition-colors"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="h-3.5 w-3.5 text-amber-400" />
                        <span>Pause Reel</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-3.5 w-3.5 text-emerald-400 fill-emerald-400" />
                        <span>Play Reel</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Video or Interactive Scene Stage */}
            {viewMode === "video" && hasRealVideo ? (
              <div className="relative p-4 sm:p-8 bg-zinc-950 flex flex-col items-center justify-center">
                <div className="relative w-full max-w-[1100px] overflow-hidden rounded-2xl border border-zinc-800 shadow-2xl bg-black">
                  <video
                    ref={videoRef}
                    src="/mindle-showreel.mp4"
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full aspect-video object-contain"
                  />
                </div>
              </div>
            ) : (
              <div className="relative min-h-[440px] sm:min-h-[500px] p-6 sm:p-10 md:p-14 flex flex-col justify-between overflow-hidden">
                {/* Background grid + ambient particle lights */}
                <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
                <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
                <div className="pointer-events-none absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-purple-600/15 blur-3xl" />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentScene.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="grid gap-10 lg:grid-cols-2 items-center z-10"
                    >
                      {/* Left: Explanatory Content */}
                      <div>
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-mono font-semibold ${currentScene.badgeBg}`}
                          >
                            <currentScene.icon className="h-3.5 w-3.5" />
                            {currentScene.category}
                          </span>
                        </div>

                        <h3 className="mt-4 font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                          {currentScene.headline}
                        </h3>

                        <p className="mt-4 text-sm sm:text-base leading-relaxed text-zinc-300">
                          {currentScene.description}
                        </p>

                        <div className="mt-8 grid grid-cols-2 gap-3">
                          {currentScene.stats.map((s) => (
                            <div
                              key={s.label}
                              className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3.5 backdrop-blur-md"
                            >
                              <p className="text-[11px] text-zinc-400 uppercase tracking-wider">{s.label}</p>
                              <p className="mt-1 font-mono font-bold text-sm sm:text-base text-zinc-100">{s.value}</p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-8 flex items-center gap-4">
                          <Button asChild variant="primary" className="shadow-lg shadow-accent/20">
                            <Link href="/contact">
                              Build Your Solution <ArrowRight className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button asChild variant="outline" className="border-zinc-700 text-zinc-200 hover:bg-zinc-800">
                            <Link href="/services">View Capabilities</Link>
                          </Button>
                        </div>
                      </div>

                      {/* Right: Dynamic Interactive Simulation for this Scene */}
                      <div className="relative mx-auto w-full max-w-[480px]">
                        {currentScene.id === "saas" && (
                          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/90 p-5 sm:p-6 shadow-2xl backdrop-blur-xl space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                              <span className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                                <TrendingUp className="h-4 w-4 text-amber-500" />
                                Multi-Tenant SaaS Telemetry
                              </span>
                              <span className="font-mono text-xs text-emerald-400">+148.4% MRR Growth</span>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                              <div className="rounded-xl bg-zinc-950 p-3 border border-zinc-800/80 text-center">
                                <p className="text-[10px] text-zinc-400">ARR Runway</p>
                                <p className="text-sm sm:text-base font-bold text-zinc-100">$1.48M</p>
                              </div>
                              <div className="rounded-xl bg-zinc-950 p-3 border border-zinc-800/80 text-center">
                                <p className="text-[10px] text-zinc-400">Tenants Active</p>
                                <p className="text-sm sm:text-base font-bold text-amber-400">842 Orgs</p>
                              </div>
                              <div className="rounded-xl bg-zinc-950 p-3 border border-zinc-800/80 text-center">
                                <p className="text-[10px] text-zinc-400">RLS Check</p>
                                <p className="text-sm sm:text-base font-bold text-emerald-400">Strict</p>
                              </div>
                            </div>

                            {/* Simulated Traffic Bars */}
                            <div className="space-y-2 pt-2">
                              <div className="flex justify-between text-xs text-zinc-400">
                                <span>Real-time API Ingestion</span>
                                <span className="font-mono text-zinc-300">14.8k req/s</span>
                              </div>
                              <div className="flex items-end gap-1.5 h-12 pt-1">
                                {[45, 70, 35, 90, 80, 50, 95, 60, 85, 100, 75, 65, 90, 85].map((h, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ height: "25%" }}
                                    animate={{ height: `${h}%` }}
                                    transition={{
                                      repeat: Infinity,
                                      repeatType: "reverse",
                                      duration: 1.2 + (i % 3) * 0.3,
                                      ease: "easeInOut",
                                    }}
                                    className="flex-1 rounded-full bg-gradient-to-t from-amber-600 to-amber-400"
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {currentScene.id === "web" && (
                          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/90 p-5 sm:p-6 shadow-2xl backdrop-blur-xl space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                              <span className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                                <Activity className="h-4 w-4 text-blue-500" />
                                Edge SSR Performance Audit
                              </span>
                              <span className="font-mono text-xs text-emerald-400">Lighthouse 100/100</span>
                            </div>

                            <div className="rounded-2xl bg-zinc-950 p-4 border border-zinc-800 space-y-3 font-mono text-xs">
                              <div className="flex justify-between text-zinc-300">
                                <span>First Contentful Paint (FCP)</span>
                                <span className="text-emerald-400 font-bold">0.3s (Ideal)</span>
                              </div>
                              <div className="flex justify-between text-zinc-300">
                                <span>Total Blocking Time (TBT)</span>
                                <span className="text-emerald-400 font-bold">0ms</span>
                              </div>
                              <div className="flex justify-between text-zinc-300">
                                <span>Cumulative Layout Shift</span>
                                <span className="text-emerald-400 font-bold">0.00</span>
                              </div>
                              <div className="flex justify-between text-zinc-300">
                                <span>Edge CDN Cache Hit Ratio</span>
                                <span className="text-blue-400 font-bold">99.4%</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                              <span>Next.js 16 + React 19 Turbopack</span>
                              <span className="text-blue-400 font-medium">Production Deployed</span>
                            </div>
                          </div>
                        )}

                        {currentScene.id === "mobile" && (
                          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/90 p-5 sm:p-6 shadow-2xl backdrop-blur-xl space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                              <span className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                                <Smartphone className="h-4 w-4 text-emerald-500" />
                                Offline-First SQLite Datastore
                              </span>
                              <span className="font-mono text-xs text-emerald-400">&lt; 0.8ms Read</span>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-3.5 text-center">
                                <p className="text-[10px] text-zinc-400">Local Cache</p>
                                <p className="text-sm font-bold text-zinc-100">Zero Network Lag</p>
                              </div>
                              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-3.5 text-center">
                                <p className="text-[10px] text-zinc-400">Background Sync</p>
                                <p className="text-sm font-bold text-emerald-400">Auto-Retry Safe</p>
                              </div>
                            </div>

                            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-3.5 text-xs text-zinc-300 space-y-1.5 font-mono">
                              <p className="text-emerald-400">✔ iOS &amp; Android Native Engines</p>
                              <p className="text-zinc-300">✔ Calibrated Haptic Feedback System</p>
                              <p className="text-zinc-300">✔ 100% Functional During Connectivity Drops</p>
                            </div>
                          </div>
                        )}

                        {currentScene.id === "ai" && (
                          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/90 p-5 sm:p-6 shadow-2xl backdrop-blur-xl space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                              <span className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                                <ShieldCheck className="h-4 w-4 text-purple-400" />
                                Domain-Restricted RAG Shield
                              </span>
                              <span className="font-mono text-xs text-emerald-400">100% Hallucination Free</span>
                            </div>

                            <div className="rounded-2xl bg-zinc-950 p-4 border border-zinc-800 space-y-2.5 text-xs">
                              <div className="flex items-center justify-between text-zinc-400">
                                <span>Multi-Rule Prompt Framework</span>
                                <span className="text-purple-400 font-mono">Active</span>
                              </div>
                              <div className="flex items-center justify-between text-zinc-400">
                                <span>Scripture &amp; Corpus Grounding</span>
                                <span className="text-emerald-400 font-mono">Verified</span>
                              </div>
                              <div className="flex items-center justify-between text-zinc-400">
                                <span>Strict Language Lock</span>
                                <span className="text-zinc-200 font-mono">11 Indian Tongues</span>
                              </div>
                            </div>

                            <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300">
                              💡 Proven in our flagship products: GitaConnect &amp; Panchatantra AI.
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
              </div>
            )}

            {/* Scrubber Progress Line (Mindle Logo Gradient) */}
            <div className="relative h-1 w-full bg-zinc-800">
              <motion.div
                className="h-full bg-gradient-to-r from-[#0052D4] via-[#0066FF] to-[#00D2FF]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Scene Selector Chapter Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-zinc-800/80 bg-zinc-900/60 p-2 gap-1.5">
              {scenes.map((scene, idx) => {
                const Icon = scene.icon;
                const isActive = activeIdx === idx;
                return (
                  <button
                    key={scene.id}
                    onClick={() => handleSceneSelect(idx)}
                    className={`flex items-center gap-2.5 rounded-2xl px-4 py-3 text-left transition-all duration-300 ${
                      isActive
                        ? "bg-zinc-800 text-white shadow-md border border-zinc-700"
                        : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? scene.accentColor : "text-zinc-500"}`} />
                    <div className="truncate">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                        0{idx + 1}
                      </p>
                      <p className="text-xs font-semibold truncate text-zinc-200">{scene.title}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

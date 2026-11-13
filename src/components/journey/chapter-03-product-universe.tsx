"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowUpRight,
  Sparkles,
  Smartphone,
  ShieldCheck,
  HeartPulse,
  Music,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Compass,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { products } from "@/lib/data/products";

// Authentic GitaConnect patent-pending features
const gitaScreens = [
  {
    id: "ai",
    title: "AI Spiritual Mentor",
    subtitle: "Scripture-Locked Conversational Companion",
    desc: "Powered by domain-restricted LLM architecture and multi-rule prompt validation enforcing strict language-lock across 11 Indian tongues and anti-hallucination verification against 700 device-resident verses.",
    image: "/Photo2.png",
    icon: Sparkles,
    metrics: "11 Indian Languages · 0 Hallucinations",
  },
  {
    id: "mood",
    title: "Mood → Verse Guidance",
    subtitle: "Emotional Check-in to Scripture",
    desc: "A three-step emotional assessment with an animated pleasantness slider that maps what you feel directly to the most resonant Gita verse for the moment, saved locally and synced asynchronously.",
    image: "/Photo1.png",
    icon: HeartPulse,
    metrics: "18 Chapters · 700 Verses Datastore",
  },
  {
    id: "mantra",
    title: "140 Mantras & Digital Jaap",
    subtitle: "Deity Mapping & Haptic Mala Feedback",
    desc: "140 mantras surfaced by day-of-week deity schedule, a music-player playback system, and a tap-driven Jaap counter delivering a light haptic pulse per repetition and a heavy pulse on 108 mala completion.",
    image: "/Photo3.png",
    icon: Music,
    metrics: "140 Deity Mantras · 108 Rep Mala Pulse",
  },
  {
    id: "analytics",
    title: "90-Day Spiritual Analytics",
    subtitle: "Multi-Dimensional Practice Trends",
    desc: "Time-series dashboards tracking mood trajectories, reading streak consistency, mantra listening, and Jaap repetition counts across 7-, 30-, and 90-day analytical windows.",
    image: "/Photo.png",
    icon: BarChart3,
    metrics: "90-Day Rolling Window · 100% Offline",
  },
];

export function Chapter03ProductUniverse({
  onFeatureChange,
}: {
  onFeatureChange?: (index: number) => void;
}) {
  const [activeGitaScreen, setActiveGitaScreen] = useState(0);
  const gitaProduct = products.find((p) => p.slug === "gitaconnect") || products[0];
  const panchatantraProduct = products.find((p) => p.slug === "panchatantra-ai") || products[1];

  const handleSelectFeature = (idx: number) => {
    setActiveGitaScreen(idx);
    if (onFeatureChange) onFeatureChange(idx);
  };

  return (
    <section id="chapter-03" className="relative min-h-[140svh] w-full px-6 py-28 md:px-12 lg:px-20">
      <div className="max-w-[1440px] mx-auto">
        {/* Chapter Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">
          <div className="flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400/80" />
            <span>Chapter 03 · Product Universe</span>
          </div>
          <span>03 / 06</span>
        </div>

        {/* ========================================================================= */}
        {/* CHAPTER 03A: GITACONNECT (CULTURAL HERITAGE & CONTEMPORARY PRODUCT DESIGN) */}
        {/* ========================================================================= */}
        <div className="mt-16">
          <Reveal>
            {/* Sanskrit Scriptural Folio Header */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-serif text-lg tracking-widest text-amber-300/80">
                श्रीमद्भगवद्गीता
              </span>
              <span className="h-3 w-px bg-white/20" />
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
                Flagship IP · Patent-Pending · Form 2 Complete Specification
              </p>
            </div>

            <h2 className="mt-5 font-display text-[clamp(2.8rem,5.5vw,5.6rem)] font-semibold leading-[0.92] tracking-[-0.065em] text-white">
              GitaConnect.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
              {gitaProduct.tagline}. Grounded in 700 Sanskrit verses, translated across 11 Indian languages with a strict anti-hallucination domain lock and offline-first storage.
            </p>
          </Reveal>

          {/* Liturgical Folio Stage: Device Viewport is the Centerpiece */}
          <div className="mt-14 rounded-2xl border border-amber-500/20 bg-[radial-gradient(ellipse_at_top_right,rgba(217,119,6,0.08)_0%,rgba(7,7,9,0.7)_60%)] p-6 backdrop-blur-xl md:p-12 transition-all duration-500">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              {/* Left Column: Interactive Feature Selector & Architectural Specs */}
              <div>
                <div className="flex flex-wrap items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.18em]">
                  <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-amber-300">
                    iOS Beta · Patent-Pending
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-white/70">
                    18 Chapters · 700 Verses
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-white/70">
                    11 Indian Languages
                  </span>
                </div>

                {/* 4 Interactive Feature Tabs (Controls 3D Yantra Alignment) */}
                <div className="mt-8 space-y-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                    Select subsystem to rotate 3D celestial alignment:
                  </p>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {gitaScreens.map((screen, idx) => {
                      const Icon = screen.icon;
                      const isActive = activeGitaScreen === idx;
                      return (
                        <button
                          key={screen.id}
                          type="button"
                          onClick={() => handleSelectFeature(idx)}
                          className={`group flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all cursor-pointer ${
                            isActive
                              ? "border-amber-400/80 bg-amber-500/15 text-white shadow-[0_0_24px_rgba(245,158,11,0.15)]"
                              : "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/25 hover:text-white/80"
                          }`}
                        >
                          <Icon
                            className={`h-4 w-4 mt-0.5 shrink-0 ${
                              isActive ? "text-amber-300" : "text-white/40 group-hover:text-white/70"
                            }`}
                          />
                          <div>
                            <span className="block font-display text-xs font-semibold leading-tight text-white">
                              {screen.title}
                            </span>
                            <span className="mt-1 block font-mono text-[9px] text-white/40 group-hover:text-white/60">
                              {screen.metrics}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Subsystem Deep Dive */}
                <div className="mt-6 rounded-xl border border-amber-500/15 bg-black/40 p-5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-amber-300/80">
                    <Compass className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: "12s" }} />
                    <span>{gitaScreens[activeGitaScreen].subtitle}</span>
                  </div>
                  <p className="mt-3 text-xs leading-6 text-white/70">
                    {gitaScreens[activeGitaScreen].desc}
                  </p>
                </div>

                {/* Verified Patent-Draft Subsystems */}
                <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/[0.08] pt-5 text-xs text-white/60 font-mono text-[10px]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                    <span>Device-Resident Datastore</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                    <span>Language-Lock Constraint</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                    <span>Haptic Mala Pulse on 108</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                    <span>Retry-Safe Sync Engine</span>
                  </div>
                </div>

                {/* Direct Conversion Actions */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="https://testflight.apple.com/join/ubbVX87p"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-3 font-display text-sm font-semibold text-black transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_20px_rgba(245,158,11,0.25)]"
                  >
                    <Smartphone className="h-4 w-4" />
                    <span>Join TestFlight Beta</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  <Link
                    href="/products/gitaconnect"
                    className="magnetic-link inline-flex items-center gap-2 px-4 py-3 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    <span>Full patent specification</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Authentic iOS Interface Centerpiece framed by 3D Yantra */}
              <div className="relative mx-auto flex w-full items-center justify-center">
                {/* Liturgical Sanctum Glow Backdrop */}
                <div className="absolute -inset-4 rounded-[3.5rem] bg-gradient-to-b from-amber-500/15 via-transparent to-transparent blur-2xl" />

                <div className="relative aspect-[9/18.5] w-full max-w-[315px] min-h-[580px] overflow-hidden rounded-[2.85rem] border-[4px] border-amber-400/30 bg-black shadow-[0_0_60px_rgba(245,158,11,0.12),0_25px_70px_rgba(0,0,0,0.85)]">
                  {/* Dynamic High-Resolution Screenshot Swapper */}
                  <Image
                    src={gitaScreens[activeGitaScreen].image}
                    alt={gitaScreens[activeGitaScreen].title}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover transition-opacity duration-500"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {/* iPhone Dynamic Island */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 h-4 w-24 rounded-full bg-black/90 border border-white/10" />
                  {/* Bottom Scriptural Caption */}
                  <div className="absolute bottom-4 inset-x-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-amber-200/80">
                    <span>{gitaScreens[activeGitaScreen].title}</span>
                    <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CHAPTER 03B: PANCHATANTRA AI (ILLUSTRATED FOLKLORE UNIVERSE)              */}
        {/* ========================================================================= */}
        <div className="mt-20 rounded-2xl border border-white/[0.1] bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.06)_0%,rgba(7,7,9,0.5)_60%)] p-6 backdrop-blur-xl md:p-12 transition-all duration-500">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            {/* Illustrated Storytelling Stage Frame */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/15 bg-[#111] shadow-[0_0_40px_rgba(16,185,129,0.08)]">
              <Image
                src="/panchatantra-kids.jpg"
                alt="Panchatantra AI Kids Explorer"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-85 transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-emerald-300">
                <span>Adaptive Moral Reasoning Engine</span>
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-emerald-300 border border-emerald-500/30">
                  COPPA Safe · Kids EdTech
                </span>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em]">
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-300">
                  {panchatantraProduct.category}
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-white/70">
                  Platform: {panchatantraProduct.platform}
                </span>
              </div>

              <h3 className="mt-6 font-display text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
                {panchatantraProduct.name}
              </h3>
              <p className="mt-3 text-base font-medium text-white/75">
                {panchatantraProduct.tagline}
              </p>
              <p className="mt-4 leading-7 text-white/55">
                {panchatantraProduct.description}
              </p>

              {/* Highlights */}
              <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {panchatantraProduct.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2 text-xs text-white/70">
                    <BookOpen className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-4">
                <Link
                  href="/products/panchatantra-ai"
                  className="inline-flex items-center gap-2 border border-emerald-400/40 bg-emerald-500/10 px-6 py-3 font-display text-sm font-semibold text-emerald-300 transition-colors hover:bg-emerald-400 hover:text-black"
                >
                  <span>Explore Panchatantra AI</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/contact"
                  className="magnetic-link text-sm text-white/60 hover:text-white"
                >
                  Request institutional demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

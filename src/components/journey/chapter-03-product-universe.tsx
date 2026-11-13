"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Sparkles, Smartphone, ShieldCheck, HeartPulse, Music, BarChart3, BookOpen } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { products } from "@/lib/data/products";

const gitaScreens = [
  {
    id: "ai",
    title: "AI Spiritual Mentor",
    desc: "Domain-locked LLM validated against 700 Gita verses with strict language-lock across 11 Indian tongues.",
    image: "/Photo2.png",
    icon: Sparkles,
  },
  {
    id: "mood",
    title: "Mood → Verse Guidance",
    desc: "Three-step emotional check-in with an animated pleasantness slider mapping feeling to relevant scripture.",
    image: "/Photo1.png",
    icon: HeartPulse,
  },
  {
    id: "mantra",
    title: "Digital Jaap Counter",
    desc: "140 curated mantras with deity schedules and a tap-driven counter delivering mala haptic pulses.",
    image: "/Photo3.png",
    icon: Music,
  },
  {
    id: "analytics",
    title: "90-Day Spiritual Analytics",
    desc: "Time-series dashboards tracking mood, reading consistency, and practice streaks across 7, 30, and 90 days.",
    image: "/Photo.png",
    icon: BarChart3,
  },
];

export function Chapter03ProductUniverse() {
  const [activeGitaScreen, setActiveGitaScreen] = useState(0);
  const gitaProduct = products.find((p) => p.slug === "gitaconnect") || products[0];
  const panchatantraProduct = products.find((p) => p.slug === "panchatantra-ai") || products[1];

  return (
    <section id="chapter-03" className="relative min-h-[140svh] w-full px-6 py-28 md:px-12 lg:px-20">
      <div className="max-w-[1440px] mx-auto">
        {/* Chapter Telemetry Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">
          <div className="flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
            <span>Chapter 03 · Product Universe</span>
          </div>
          <span>03 / 06</span>
        </div>

        {/* Section Headline */}
        <div className="mt-16 max-w-3xl">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
              Living Products
            </p>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,5vw,5.4rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-white">
              Built with purpose, verified in reality.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/60 md:text-lg">
              We own what we make. Every product in our studio solves an authentic human need with dedicated domain engineering, strict privacy guardrails, and craft that endures past launch day.
            </p>
          </Reveal>
        </div>

        {/* Product 01: GitaConnect (Flagship Interactive Showcase) */}
        <div className="mt-24 rounded-2xl border border-white/[0.12] bg-black/60 p-8 backdrop-blur-xl md:p-14">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em]">
                <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-white/80">
                  {gitaProduct.category}
                </span>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-400">
                  Status: {gitaProduct.status} (iOS Beta)
                </span>
                <span className="text-white/40">Patent Pending</span>
              </div>

              <h3 className="mt-6 font-display text-4xl font-semibold tracking-[-0.05em] text-white md:text-5xl lg:text-6xl">
                {gitaProduct.name}
              </h3>
              <p className="mt-4 text-lg font-medium text-white/80">
                {gitaProduct.tagline}
              </p>
              <p className="mt-4 leading-7 text-white/55">
                {gitaProduct.description}
              </p>

              {/* Interactive Screen Selector Tabs */}
              <div className="mt-10 space-y-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                  Select view to inspect architecture:
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {gitaScreens.map((screen, idx) => {
                    const Icon = screen.icon;
                    const isActive = activeGitaScreen === idx;
                    return (
                      <button
                        key={screen.id}
                        type="button"
                        onClick={() => setActiveGitaScreen(idx)}
                        className={`group flex flex-col items-start rounded-lg border p-3 text-left transition-all cursor-pointer ${
                          isActive
                            ? "border-white bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.08)]"
                            : "border-white/10 bg-white/[0.02] text-white/50 hover:border-white/30 hover:text-white/80"
                        }`}
                      >
                        <Icon className={`h-4 w-4 mb-2 ${isActive ? "text-white" : "text-white/40 group-hover:text-white/70"}`} />
                        <span className="font-display text-xs font-medium leading-tight">
                          {screen.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Screen Detail */}
              <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.03] p-4 text-xs leading-6 text-white/65">
                <span className="font-semibold text-white">Feature Insight: </span>
                {gitaScreens[activeGitaScreen].desc}
              </div>

              {/* CTAs */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="https://testflight.apple.com/join/ubbVX87p"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white px-6 py-3 font-display text-sm font-semibold text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Smartphone className="h-4 w-4" />
                  <span>Join TestFlight Beta</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <Link
                  href="/products/gitaconnect"
                  className="magnetic-link inline-flex items-center gap-2 px-4 py-3 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <span>Full product dossier</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* GitaConnect Mobile Viewport */}
            <div className="relative mx-auto flex items-center justify-center">
              <div className="relative aspect-[9/18] w-full max-w-[310px] overflow-hidden rounded-[2.8rem] border-[6px] border-[#222220] bg-black shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_50px_rgba(255,255,255,0.04)]">
                {/* Dynamic Screen Transition */}
                <Image
                  src={gitaScreens[activeGitaScreen].image}
                  alt={gitaScreens[activeGitaScreen].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover transition-all duration-500"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-1/2 -translate-x-1/2 h-4 w-24 rounded-full bg-black/80" />
                <div className="absolute bottom-5 inset-x-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-white/70">
                  <span>{gitaScreens[activeGitaScreen].title}</span>
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product 02: Panchatantra AI */}
        <div className="mt-14 rounded-2xl border border-white/[0.1] bg-black/40 p-8 backdrop-blur-xl md:p-14">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-[#111]">
              <Image
                src="/panchatantra-kids.jpg"
                alt="Panchatantra AI Kids Explorer"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-85 transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-white/70">
                <span>Adaptive Moral Reasoning Engine</span>
                <span className="text-emerald-400">Kids Safe · COPPA</span>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em]">
                <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-white/80">
                  {panchatantraProduct.category}
                </span>
                <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-blue-400">
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
                    <BookOpen className="h-3.5 w-3.5 text-white/40 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-4">
                <Link
                  href="/products/panchatantra-ai"
                  className="inline-flex items-center gap-2 border border-white/30 bg-white/5 px-6 py-3 font-display text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
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

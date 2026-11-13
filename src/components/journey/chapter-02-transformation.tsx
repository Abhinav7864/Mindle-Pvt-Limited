"use client";

import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const principles = [
  {
    num: "01",
    title: "Useful before impressive",
    body: "A product earns attention by making someone's day clearer, easier, or more meaningful. Novelty fades; genuine utility compounds.",
  },
  {
    num: "02",
    title: "Intelligence with boundaries",
    body: "We apply AI where it creates real leverage, engineered with strict domain guardrails, anti-hallucination verification, and context-awareness.",
  },
  {
    num: "03",
    title: "Craft survives launch day",
    body: "Micro-interactions, haptics, typographical pacing, and resilient offline architectures are not cosmetic afterthoughts. They are the product.",
  },
];

const telemetryStats = [
  { value: "11", label: "Indian Languages Locked" },
  { value: "700", label: "Sanskrit Verses Datastore" },
  { value: "100%", label: "Offline-First Sync" },
  { value: "1", label: "Patent Pending Filing" },
];

export function Chapter02Transformation() {
  return (
    <section id="chapter-02" className="relative min-h-[110svh] w-full px-6 py-28 md:px-12 lg:px-20">
      <div className="max-w-[1440px] mx-auto">
        {/* Chapter Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">
          <div className="flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
            <span>Chapter 02 · Transformation</span>
          </div>
          <span>02 / 06</span>
        </div>

        {/* Editorial Statement */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
              The Mindle Thesis
            </p>
            <h2 className="mt-6 font-display text-[clamp(2.8rem,5.5vw,5.8rem)] font-semibold leading-[0.92] tracking-[-0.065em] text-white">
              Technology can be deeply <span className="text-white/40">human</span>.
            </h2>
          </Reveal>

          <Reveal className="lg:pt-14">
            <p className="text-lg leading-8 text-white/70 md:text-xl md:leading-9">
              We are a product-first studio operating across strategy, experience design, resilient systems engineering, and applied AI. Our thesis is straightforward: tame the intricate to make the extraordinary feel effortless.
            </p>
            <div className="mt-8 flex items-center gap-6">
              <Link
                href="/about"
                className="magnetic-link inline-flex items-center gap-2 border-b border-white/80 pb-1 text-sm font-medium text-white hover:border-white"
              >
                Learn our story <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* 3 Principles Architecture */}
        <div className="mt-24 grid gap-8 border-t border-white/[0.1] pt-12 md:grid-cols-3">
          {principles.map((item) => (
            <Reveal
              key={item.num}
              className="relative flex flex-col justify-between rounded-xl border border-white/[0.08] bg-black/20 p-8 backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-black/40"
            >
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/35">
                  Principle {item.num}
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold tracking-[-0.04em] text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/55">
                  {item.body}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
                <CheckCircle2 className="h-3.5 w-3.5 text-white/40" />
                <span>Verified in production</span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Telemetry Strip */}
        <div className="mt-16 grid grid-cols-2 gap-6 border-t border-white/[0.08] pt-10 sm:grid-cols-4">
          {telemetryStats.map((stat) => (
            <div key={stat.label} className="border-l border-white/[0.1] pl-5">
              <p className="font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

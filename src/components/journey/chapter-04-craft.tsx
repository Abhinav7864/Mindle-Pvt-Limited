"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Cpu, Layers, Terminal, Sparkles, Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { services } from "@/lib/data/services";

export function Chapter04Craft({
  onSelectDiscipline,
}: {
  onSelectDiscipline?: (index: number) => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeService = services[selectedIndex] || services[0];

  const handleSelect = (idx: number) => {
    setSelectedIndex(idx);
    if (onSelectDiscipline) onSelectDiscipline(idx);
  };

  return (
    <section id="chapter-04" className="relative min-h-[115svh] w-full px-6 py-28 md:px-12 lg:px-20">
      <div className="max-w-[1440px] mx-auto">
        {/* Chapter Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">
          <div className="flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
            <span>Chapter 04 · The Craft</span>
          </div>
          <span>04 / 06</span>
        </div>

        {/* Section Intro */}
        <div className="mt-16 max-w-3xl">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
              Disciplines & Engineering
            </p>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,5vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.065em] text-white">
              The thinking and making, in one room.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/60 md:text-lg">
              No handoffs between disconnected agencies. Strategy, interface design, machine learning pipelines, and production infrastructure are unified under one rigorous standard.
            </p>
          </Reveal>
        </div>

        {/* Interactive Discipline Studio Console */}
        <div className="mt-20 grid gap-8 lg:grid-cols-[400px_1fr]">
          {/* Discipline Navigation Dial */}
          <div className="space-y-2.5">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40 mb-4">
              Select discipline to inspect:
            </p>
            {services.map((service, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={service.slug}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  className={`group w-full flex items-center justify-between rounded-xl border p-5 text-left transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "border-white bg-white/10 text-white shadow-[0_0_30px_rgba(255,255,255,0.06)]"
                      : "border-white/[0.07] bg-black/40 text-white/50 hover:border-white/20 hover:text-white/80"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[11px] text-white/40 group-hover:text-white/70">
                      0{idx + 1}
                    </span>
                    <span className="font-display text-lg font-medium tracking-tight">
                      {service.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isSelected && (
                      <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                    )}
                    <ArrowUpRight className={`h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${isSelected ? "text-white" : "text-white/30"}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Live Engineering Blueprint Display */}
          <div className="rounded-2xl border border-white/[0.12] bg-black/60 p-8 backdrop-blur-xl md:p-12">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
              <div className="flex items-center gap-3">
                <Terminal className="h-4 w-4 text-white/50" />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                  Subsystem Specification · {activeService.name}
                </span>
              </div>
              <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-wider text-white/40">
                <span>Timeline: {activeService.timeline}</span>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
                {activeService.short}
              </h3>
              <p className="mt-4 text-base leading-8 text-white/65">
                {activeService.what}
              </p>
            </div>

            {/* Architecture Process Steps */}
            <div className="mt-10 border-t border-white/[0.08] pt-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40 mb-5">
                Phased Delivery Architecture:
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {activeService.process.map((step, sIdx) => (
                  <div
                    key={step}
                    className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 text-xs text-white/80"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 font-mono text-[9px] text-white">
                      {sIdx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Production Technology Stack */}
            <div className="mt-8 border-t border-white/[0.08] pt-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40 mb-4">
                Verified Technology Stack:
              </p>
              <div className="flex flex-wrap gap-2">
                {activeService.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Link to Dedicated Service Dossier */}
            <div className="mt-10 pt-4 flex items-center justify-between border-t border-white/[0.08]">
              <Link
                href={`/services#${activeService.slug}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-white/70 transition-colors"
              >
                <span>View full service parameters</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="font-mono text-[11px] uppercase tracking-wider text-white/50 hover:text-white"
              >
                Inquire for project &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

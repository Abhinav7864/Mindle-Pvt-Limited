"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Compass, ShieldCheck, Rocket, Sparkles, HeartHandshake, Users } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { team } from "@/lib/data/team";
import { values } from "@/lib/data/company";

export function Chapter05Studio() {
  return (
    <section id="chapter-05" className="relative min-h-[120svh] w-full px-6 py-28 md:px-12 lg:px-20">
      <div className="max-w-[1440px] mx-auto">
        {/* Chapter Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">
          <div className="flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
            <span>Chapter 05 · The Studio</span>
          </div>
          <span>05 / 06</span>
        </div>

        {/* Editorial Introduction */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">
              The People & Conviction
            </p>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,5.2vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.065em] text-white">
              Small team, high conviction.
            </h2>
          </Reveal>

          <Reveal className="lg:pt-12">
            <p className="text-lg leading-8 text-white/70 md:text-xl md:leading-9">
              Great companies are defined by what they build, not what they bill. Mindle exists to create software products that outlast any single engagement. We own the architecture, sweat the typography, and test in the real world.
            </p>
            <div className="mt-6 flex items-center gap-6">
              <Link
                href="/about"
                className="magnetic-link inline-flex items-center gap-2 border-b border-white pb-1 text-sm font-medium text-white"
              >
                Read our complete manifesto <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Co-Founders Gallery */}
        <div className="mt-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40 mb-8">
            Co-Founders & Core Leadership:
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <Reveal
                key={member.name}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-black/50 backdrop-blur-xl transition-all duration-500 hover:border-white/30"
              >
                {/* Photo Portrait */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#161616]">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover grayscale contrast-110 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center font-display text-4xl font-semibold text-white/30">
                      {member.initials}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                      {member.role}
                    </p>
                    <h3 className="font-display text-xl font-semibold text-white">
                      {member.name}
                    </h3>
                  </div>
                </div>

                {/* Bio text */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <p className="text-xs leading-6 text-white/60">
                    {member.bio}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Core Values Strip */}
        <div className="mt-24 border-t border-white/[0.1] pt-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40 mb-10">
            Operating Ethos:
          </p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm"
                >
                  <Icon className="h-5 w-5 text-white/50 mb-4" />
                  <h4 className="font-display text-lg font-medium text-white">
                    {v.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-white/55">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

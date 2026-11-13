"use client";

import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function Chapter06Connection() {
  return (
    <section id="chapter-06" className="relative min-h-[100svh] w-full flex flex-col justify-between px-6 pt-24 pb-12 md:px-12 lg:px-20">
      <div className="max-w-[1440px] w-full mx-auto my-auto py-12">
        {/* Chapter Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">
          <div className="flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
            <span>Chapter 06 · The Connection</span>
          </div>
          <span>06 / 06</span>
        </div>

        {/* Monumental Resolution Call to Action */}
        <div className="mt-16 max-w-4xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-3.5 py-1 font-mono text-[9px] uppercase tracking-[0.24em] text-white/70 backdrop-blur-md">
              <Sparkles className="h-3 w-3 text-white/60" />
              <span>The Journey Resolves</span>
            </div>

            <h2 className="mt-8 font-display text-[clamp(3.2rem,6.8vw,7.2rem)] font-semibold leading-[0.88] tracking-[-0.075em] text-white text-balance">
              Have an idea? <br />
              <span className="text-white/40">Let's make it real.</span>
            </h2>

            <p className="mt-8 max-w-xl text-base leading-7 text-white/65 md:text-lg md:leading-8">
              Whether you want to explore partnering on our product roadmap, license our AI infrastructure, or build an extraordinary new product together, our doors are open.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button asChild variant="primary" size="lg" className="rounded-none px-8 py-6 font-medium">
                <Link href="/contact">
                  Start a conversation <ArrowUpRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-none border-white/20 px-8 py-6 text-white hover:bg-white hover:text-black">
                <Link href="/products">
                  Explore all products
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Direct Connect Grid */}
        <div className="mt-20 grid gap-6 border-t border-white/[0.1] pt-12 sm:grid-cols-3">
          <div className="border-l border-white/[0.1] pl-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
              Direct Inquiries
            </p>
            <a
              href="mailto:contact@mindle.in"
              className="mt-2 inline-flex items-center gap-2 font-display text-lg text-white hover:text-white/70 transition-colors"
            >
              <Mail className="h-4 w-4 text-white/40" />
              <span>contact@mindle.in</span>
            </a>
          </div>

          <div className="border-l border-white/[0.1] pl-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
              Studio Base
            </p>
            <p className="mt-2 inline-flex items-center gap-2 font-display text-lg text-white">
              <MapPin className="h-4 w-4 text-white/40" />
              <span>India · Global Presence</span>
            </p>
          </div>

          <div className="border-l border-white/[0.1] pl-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
              Response SLA
            </p>
            <p className="mt-2 font-display text-lg text-white">
              Within 24 Hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

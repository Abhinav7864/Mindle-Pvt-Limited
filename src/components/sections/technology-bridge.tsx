"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Smartphone,
  Globe2,
  Zap,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Fingerprint,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { MotionItem } from "@/components/sections/motion-item";

/**
 * Interactive canvas that draws an interconnected node network
 * symbolizing how Mindle connects complex technology to humans.
 */
function NodeNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let dpr = window.devicePixelRatio || 1;
    let cssWidth = canvas.offsetWidth;
    let cssHeight = canvas.offsetHeight;

    const setupSize = () => {
      if (!canvas) return;
      dpr = window.devicePixelRatio || 1;
      cssWidth = canvas.offsetWidth;
      cssHeight = canvas.offsetHeight;
      canvas.width = cssWidth * dpr;
      canvas.height = cssHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setupSize();
    window.addEventListener("resize", setupSize);

    // Dynamic node count based on screen size
    const isMobile = cssWidth < 768;
    const numNodes = isMobile ? 22 : 42;

    const nodes = Array.from({ length: numNodes }).map(() => ({
      x: Math.random() * cssWidth,
      y: Math.random() * cssHeight,
      baseRadius: Math.random() * 2 + 1.8,
      pulsePhase: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      color: Math.random() > 0.4 ? "rgba(0, 102, 255," : "rgba(0, 210, 255,",
    }));

    // Traveling pulses along active lines
    const pulses: Array<{
      fromIdx: number;
      toIdx: number;
      progress: number;
      speed: number;
    }> = [];

    let mouseX = -9999;
    let mouseY = -9999;
    let isMouseOver = false;

    const parentSection = canvas.closest("section");

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      mouseX = clientX - rect.left;
      mouseY = clientY - rect.top;
      isMouseOver = true;
    };

    const handlePointerLeave = () => {
      isMouseOver = false;
      mouseX = -9999;
      mouseY = -9999;
    };

    const targetElement = parentSection || canvas;
    targetElement.addEventListener("mousemove", handlePointerMove as any);
    targetElement.addEventListener("mouseleave", handlePointerLeave);
    targetElement.addEventListener("touchmove", handlePointerMove as any, { passive: true });
    targetElement.addEventListener("touchend", handlePointerLeave);

    let tick = 0;

    const draw = () => {
      ctx.clearRect(0, 0, cssWidth, cssHeight);
      tick += 0.02;

      const connectionDistance = isMobile ? 110 : 140;
      const mouseDistance = isMobile ? 140 : 190;

      // Draw node-to-node links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = 0.28 * (1 - dist / connectionDistance);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0, 102, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Randomly spawn pulses on close connected lines
            if (Math.random() < 0.0012 && pulses.length < 10) {
              pulses.push({
                fromIdx: i,
                toIdx: j,
                progress: 0,
                speed: 0.012 + Math.random() * 0.012,
              });
            }
          }
        }

        // Draw connection beam to mouse
        if (isMouseOver) {
          const mdx = nodes[i].x - mouseX;
          const mdy = nodes[i].y - mouseY;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouseDistance) {
            const mouseAlpha = 0.55 * (1 - mdist / mouseDistance);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = `rgba(0, 210, 255, ${mouseAlpha})`;
            ctx.lineWidth = 1.4;
            ctx.stroke();

            // Gentle magnetic attraction towards cursor
            const force = (1 - mdist / mouseDistance) * 0.25;
            nodes[i].x -= (mdx / mdist) * force;
            nodes[i].y -= (mdy / mdist) * force;
          }
        }

        // Animated breathing radius
        const currentRadius = nodes[i].baseRadius + Math.sin(tick + nodes[i].pulsePhase) * 0.6;

        // Glowing outer halo
        const gradient = ctx.createRadialGradient(
          nodes[i].x,
          nodes[i].y,
          0,
          nodes[i].x,
          nodes[i].y,
          currentRadius * 3
        );
        gradient.addColorStop(0, `${nodes[i].color} 0.9)`);
        gradient.addColorStop(0.5, `${nodes[i].color} 0.25)`);
        gradient.addColorStop(1, `${nodes[i].color} 0)`);

        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, currentRadius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `${nodes[i].color} 0.95)`;
        ctx.fill();

        // Move nodes with soft boundary bounce
        nodes[i].x += nodes[i].vx;
        nodes[i].y += nodes[i].vy;

        if (nodes[i].x < 10) {
          nodes[i].x = 10;
          nodes[i].vx *= -1;
        } else if (nodes[i].x > cssWidth - 10) {
          nodes[i].x = cssWidth - 10;
          nodes[i].vx *= -1;
        }

        if (nodes[i].y < 10) {
          nodes[i].y = 10;
          nodes[i].vy *= -1;
        } else if (nodes[i].y > cssHeight - 10) {
          nodes[i].y = cssHeight - 10;
          nodes[i].vy *= -1;
        }
      }

      // Draw traveling energy pulses along connections
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulses.splice(p, 1);
          continue;
        }

        const from = nodes[pulse.fromIdx];
        const to = nodes[pulse.toIdx];
        if (!from || !to) continue;

        const px = from.x + (to.x - from.x) * pulse.progress;
        const py = from.y + (to.y - from.y) * pulse.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(224, 242, 254, 0.98)";
        ctx.shadowColor = "rgba(0, 210, 255, 0.95)";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", setupSize);
      targetElement.removeEventListener("mousemove", handlePointerMove as any);
      targetElement.removeEventListener("mouseleave", handlePointerLeave);
      targetElement.removeEventListener("touchmove", handlePointerMove as any);
      targetElement.removeEventListener("touchend", handlePointerLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none opacity-85"
    />
  );
}

const techPillars = [
  {
    icon: Sparkles,
    title: "Domain-Restricted AI",
    badge: "AI ➔ Wisdom",
    description:
      "We strip away hallucinations by locking AI models strictly to verified scripture datastores, delivering accurate, trustworthy guidance.",
    accent: "text-amber-500",
    glow: "group-hover:border-amber-500/50",
  },
  {
    icon: Smartphone,
    title: "Offline-First Engineering",
    badge: "Cloud ➔ On-Device",
    description:
      "Your data and scriptures reside directly on your phone with <0.8ms local read speeds, ensuring seamless operation everywhere without network dependency.",
    accent: "text-blue-500",
    glow: "group-hover:border-blue-500/50",
  },
  {
    icon: Globe2,
    title: "11-Language Native Bridge",
    badge: "Global ➔ Local",
    description:
      "We break down language barriers with language-locked prompts in English, Hindi, Tamil, Telugu, Marathi, and 6 other Indian tongues.",
    accent: "text-purple-500",
    glow: "group-hover:border-purple-500/50",
  },
  {
    icon: Fingerprint,
    title: "Haptic Biofeedback & Physicality",
    badge: "Digital ➔ Tactile",
    description:
      "Connecting screen taps to physical sensory feedback through calibrated haptic pulses for mantra Jaap repetitions.",
    accent: "text-emerald-500",
    glow: "group-hover:border-emerald-500/50",
  },
];

export function TechnologyBridgeSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 md:py-32 bg-background border-y border-border/60">
      {/* Background Interactive Node Canvas */}
      <NodeNetworkCanvas />

      {/* Radial Backlight Ambient Glow (Mindle Blue) */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-full max-w-[1000px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.18),transparent_70%)] blur-3xl" />

      <div className="relative mx-auto w-full max-w-[1280px] px-6 md:px-8 z-10 pointer-events-none">
        <SectionHeading
          eyebrow="How Mindle Bridges Tech to You"
          title={
            <>
              Connecting complex technology <br />
              <span className="text-accent">to human everyday experience</span>
            </>
          }
          description="We take cutting-edge AI, local database engineering, and native multi-language systems—and package them into intuitive, beautiful products people actually love using."
        />

        {/* 4 Tech Bridge Pillars Grid */}
        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 pointer-events-auto">
          {techPillars.map((p) => {
            const Icon = p.icon;
            return (
              <MotionItem key={p.title}>
                <div
                  className={`group relative h-full flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card/85 p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${p.glow}`}
                >
                  <div>
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/15">
                        <Icon className={`h-6 w-6 ${p.accent}`} />
                      </div>
                      <span className="rounded-full border border-border bg-muted/80 px-3 py-1 text-[11px] font-semibold text-muted-foreground">
                        {p.badge}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-foreground">
                      {p.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {p.description}
                    </p>
                  </div>

                  {/* Bottom Accent Beam */}
                  <div className="mt-6 pt-4 border-t border-border/50 flex items-center gap-1 text-xs font-semibold text-accent opacity-90">
                    <span>Mindle Engineering</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </MotionItem>
            );
          })}
        </RevealGroup>

        {/* Visual Pipeline Flow Strip */}
        <Reveal className="mt-12 pointer-events-auto">
          <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/90 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground font-bold">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-foreground">
                    The Mindle Connection Engine
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Transforming raw artificial intelligence into personal, offline-first human habits.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
                <span className="rounded-xl border border-border bg-surface-1 px-3.5 py-2 text-foreground">
                  🤖 Domain-Locked LLMs
                </span>
                <ArrowRight className="h-4 w-4 text-accent hidden sm:inline" />
                <span className="rounded-xl border border-border bg-surface-1 px-3.5 py-2 text-foreground">
                  🔒 On-Device Datastores
                </span>
                <ArrowRight className="h-4 w-4 text-accent hidden sm:inline" />
                <span className="rounded-xl border border-accent/40 bg-accent/15 px-3.5 py-2 text-accent">
                  📱 Human Experience
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

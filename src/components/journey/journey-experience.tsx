"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { Chapter01Emergence } from "./chapter-01-emergence";
import { Chapter02Transformation } from "./chapter-02-transformation";
import { Chapter03ProductUniverse } from "./chapter-03-product-universe";
import { Chapter04Craft } from "./chapter-04-craft";
import { Chapter05Studio } from "./chapter-05-studio";
import { Chapter06Connection } from "./chapter-06-connection";

// Browser-only dynamic import of the 3D WebGL World
const MindleWorld = dynamic(
  () => import("@/components/scenes/mindle-world").then((m) => m.MindleWorld),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-[#050505] flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-t border-white/40 animate-spin" />
      </div>
    ),
  }
);

const chapters = [
  { id: "chapter-01", num: "01", name: "Emergence" },
  { id: "chapter-02", num: "02", name: "Transformation" },
  { id: "chapter-03", num: "03", name: "Product Universe" },
  { id: "chapter-04", num: "04", name: "The Craft" },
  { id: "chapter-05", num: "05", name: "The Studio" },
  { id: "chapter-06", num: "06", name: "The Connection" },
];

export function JourneyExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(1);
  const [craftIndex, setCraftIndex] = useState(0);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const reducedMotion = useReducedMotion() ?? false;

  // Master GSAP ScrollTrigger Timeline
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1, // 100ms lag-free damping, preserves native scrolling & keyboard navigation
        onUpdate: (self) => {
          const p = Math.max(0, Math.min(1, self.progress));
          setProgress(p);

          // Calibrated chapter tracking matching exact DOM scroll offsets
          if (p < 0.12) setActiveChapter(1);
          else if (p < 0.26) setActiveChapter(2);
          else if (p < 0.51) setActiveChapter(3);
          else if (p < 0.69) setActiveChapter(4);
          else if (p < 0.90) setActiveChapter(5);
          else setActiveChapter(6);
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        ScrollTrigger.update();
      }, 400);
    }
  };

  const handleSkipIntro = () => {
    setIsIntroComplete(true);
    scrollToChapter("chapter-02");
  };

  return (
    <div ref={containerRef} className="relative w-full bg-[#050505] text-white selection:bg-white selection:text-black">
      {/* Fixed Fullscreen 3D Organic Canvas */}
      <div className="fixed inset-0 z-0 h-[100svh] w-full pointer-events-none">
        <MindleWorld
          progress={progress}
          reducedMotion={reducedMotion}
          activeChapter={activeChapter}
          craftIndex={craftIndex}
          activeFeatureIndex={activeFeatureIndex}
        />
        {/* Subtle cinematic gradient vignette & noise */}
        <div className="noise-overlay pointer-events-none absolute inset-0 z-[1] opacity-70" />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,5,0.45)_70%,rgba(5,5,5,0.85)_100%)]" />
      </div>

      {/* Floating Interactive Chapter Telemetry Pill */}
      <nav
        aria-label="Chapter progress navigation"
        className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-3 rounded-full border border-white/12 bg-black/60 px-4 py-2 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
      >
        <div className="flex items-center gap-2">
          {chapters.map((ch, idx) => {
            const isCurrent = activeChapter === idx + 1;
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => scrollToChapter(ch.id)}
                title={`Jump to Chapter ${ch.num}: ${ch.name}`}
                className={`group flex items-center gap-1.5 transition-all cursor-pointer ${
                  isCurrent ? "text-white" : "text-white/35 hover:text-white/70"
                }`}
              >
                <span
                  className={`inline-block rounded-full transition-all ${
                    isCurrent
                      ? "h-2 w-6 bg-white"
                      : "h-1.5 w-1.5 bg-white/30 group-hover:bg-white/60"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="h-3 w-px bg-white/20 mx-1" />

        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/60 min-w-[130px]">
          <span>{chapters[activeChapter - 1]?.num} / 06 · {chapters[activeChapter - 1]?.name}</span>
        </div>
      </nav>

      {/* Scrollable Storytelling Layers */}
      <div className="relative z-10 w-full">
        <Chapter01Emergence
          onExplore={() => scrollToChapter("chapter-02")}
          onSkipIntro={handleSkipIntro}
          isIntroComplete={isIntroComplete}
        />
        <Chapter02Transformation />
        <Chapter03ProductUniverse onFeatureChange={(idx) => setActiveFeatureIndex(idx)} />
        <Chapter04Craft onSelectDiscipline={(idx) => setCraftIndex(idx)} />
        <Chapter05Studio />
        <Chapter06Connection />
      </div>
    </div>
  );
}

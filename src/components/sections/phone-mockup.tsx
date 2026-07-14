import { Sparkles, Play, Heart, Share2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Stylized GitaConnect phone mockup built with pure CSS —
 * stands in for real screenshots until assets are available.
 */
export function PhoneMockup({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-[290px] select-none rounded-[2.6rem] border border-border bg-card p-2.5 shadow-2xl",
        className
      )}
      aria-hidden="true"
    >
      {/* Notch */}
      <div className="absolute left-1/2 top-4 z-10 h-6 w-28 -translate-x-1/2 rounded-full bg-black/90" />

      <div className="overflow-hidden rounded-[2.1rem] bg-[var(--surface-2)]">
        {/* Status area + header */}
        <div className="bg-[linear-gradient(135deg,#f59e0b22,#7c3aed22)] px-5 pb-5 pt-12">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                Monday · Shiva Mantras
              </p>
              <p className="mt-1 font-display text-base font-bold">
                Namaste, Arjun 🙏
              </p>
            </div>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[linear-gradient(135deg,#f59e0b,#7c3aed)] text-white">
              <Sparkles className="h-4 w-4" />
            </span>
          </div>

          {/* Verse of the day */}
          <div className="mt-4 rounded-2xl border border-border bg-card/80 p-4 backdrop-blur">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
              Verse for your mood · BG 2.47
            </p>
            <p className="mt-2 font-display text-sm font-semibold leading-snug">
              कर्मण्येवाधिकारस्ते मा फलेषु कदाचन
            </p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
              You have a right to your actions alone, never to their fruits.
            </p>
          </div>
        </div>

        {/* Mantra player */}
        <div className="px-5 py-4">
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[linear-gradient(135deg,#f59e0b,#ec4899)] text-white">
              <Play className="h-4 w-4 fill-current" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold">Maha Mrityunjaya</p>
              <div className="mt-1.5 h-1 rounded-full bg-muted">
                <div className="h-1 w-2/3 rounded-full bg-[linear-gradient(90deg,#f59e0b,#7c3aed)]" />
              </div>
            </div>
            <p className="text-[10px] tabular-nums text-muted-foreground">2:47</p>
          </div>

          {/* Jaap counter */}
          <div className="mt-3 flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
            <div className="relative grid h-16 w-16 shrink-0 place-items-center">
              <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
                <circle cx="32" cy="32" r="28" fill="none" stroke="var(--muted)" strokeWidth="5" />
                <circle
                  cx="32" cy="32" r="28" fill="none"
                  stroke="url(#jaapGrad)" strokeWidth="5" strokeLinecap="round"
                  strokeDasharray="176" strokeDashoffset="52"
                />
                <defs>
                  <linearGradient id="jaapGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute font-display text-sm font-bold tabular-nums">76</span>
            </div>
            <div>
              <p className="text-xs font-semibold">Digital Jaap</p>
              <p className="mt-0.5 text-[10px] leading-relaxed text-muted-foreground">
                76 / 108 · light haptic per tap,<br />heavy pulse on mala
              </p>
            </div>
          </div>

          {/* AI mentor chat */}
          <div className="mt-3 rounded-2xl border border-border bg-card p-3">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--success)]" />
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                AI Mentor · हिन्दी
              </p>
            </div>
            <div className="mt-2 rounded-xl rounded-tl-sm bg-muted px-3 py-2 text-[11px] leading-relaxed">
              इस श्लोक का अर्थ है — कर्म करो, फल की चिंता मत करो…
            </div>
          </div>

          {/* Feed actions */}
          <div className="mt-3 flex items-center justify-around rounded-2xl border border-border bg-card px-3 py-2.5 text-muted-foreground">
            <Heart className="h-4 w-4 fill-[#ec4899] text-[#ec4899]" />
            <Share2 className="h-4 w-4" />
            <Info className="h-4 w-4" />
            <span className="text-[10px] font-medium">Spiritual Feed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

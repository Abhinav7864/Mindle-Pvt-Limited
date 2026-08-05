import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Mindle wordmark + gradient "m" glyph. */
export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Mindle  home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <svg
        viewBox="0 0 100 100"
        className="h-9 w-9 transition-transform duration-300 group-hover:scale-105"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logoLeftPillarGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#020B24" />
            <stop offset="100%" stopColor="#041B4E" />
          </linearGradient>

          <linearGradient id="logoRightPillarGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#0066FF" />
            <stop offset="100%" stopColor="#00D2FF" />
          </linearGradient>

          <linearGradient id="logoLeftDiagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#041B4E" />
            <stop offset="100%" stopColor="#0A3E9C" />
          </linearGradient>

          <linearGradient id="logoRightDiagGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0052D4" />
            <stop offset="100%" stopColor="#00D2FF" />
          </linearGradient>

          <filter id="logoFoldShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="-1.2" dy="1.2" stdDeviation="1" floodColor="#000" floodOpacity="0.4" />
          </filter>
        </defs>

        <rect x="15" y="20" width="14" height="60" rx="7" fill="url(#logoLeftPillarGrad)" />

        <path d="M 22,35 L 50,68" stroke="url(#logoLeftDiagGrad)" strokeWidth="14" strokeLinecap="round" />

        <path d="M 50,68 L 78,35" stroke="url(#logoRightDiagGrad)" strokeWidth="14" strokeLinecap="round" filter="url(#logoFoldShadow)" />

        <rect x="71" y="20" width="14" height="60" rx="7" fill="url(#logoRightPillarGrad)" />
      </svg>
      {showWordmark && (
        <span className="font-display text-xl font-bold tracking-tight lowercase">
          mindle
        </span>
      )}
    </Link>
  );
}

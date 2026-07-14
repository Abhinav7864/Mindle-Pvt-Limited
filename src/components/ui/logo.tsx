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
      aria-label="Mindle — home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-[linear-gradient(135deg,var(--primary),var(--secondary))] shadow-[0_6px_20px_-6px_var(--glow)] transition-transform duration-300 group-hover:scale-105">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-white"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 18V8.5c0-1.7 2.2-2.4 3.2-1L12 14l4.8-6.5c1-1.4 3.2-.7 3.2 1V18"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {showWordmark && (
        <span className="font-display text-lg font-bold tracking-tight">
          Mindle
        </span>
      )}
    </Link>
  );
}

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Official Mindle Logo component
 * Uses the authentic brandmark & primary wordmark from Mindle_Separate_Logo_Assets
 */
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
      aria-label="Mindle home"
      className={cn("group inline-flex items-center gap-3", className)}
    >
      {/* Official Mindle "mi" Brandmark */}
      <Image
        src="/brand/05_Mindle_Brandmark_White_Transparent.png"
        alt="Mindle Brandmark"
        width={40}
        height={40}
        priority
        className="h-7 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
      />

      {/* Official Mindle Primary Wordmark */}
      {showWordmark && (
        <Image
          src="/brand/01_Mindle_Primary_White_Transparent.png"
          alt="Mindle"
          width={120}
          height={28}
          priority
          className="h-4.5 w-auto object-contain transition-opacity duration-300 group-hover:opacity-75"
        />
      )}
    </Link>
  );
}
export default Logo;

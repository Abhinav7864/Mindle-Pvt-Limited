import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/** Official Mindle wordmark, supplied by the studio. */
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
      className={cn("group inline-flex items-center", className)}
    >
      {showWordmark && (
        <Image src="/mindle-wordmark-white.png" alt="Mindle" width={749} height={177} priority className="h-auto w-[96px] transition-opacity duration-300 group-hover:opacity-70 sm:w-[110px]" />
      )}
    </Link>
  );
}

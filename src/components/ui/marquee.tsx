import * as React from "react";
import { cn } from "@/lib/utils";

/** Infinite CSS marquee. Duplicates children for a seamless loop. */
export function Marquee({
  children,
  className,
  pauseOnHover = true,
}: {
  children: React.ReactNode;
  className?: string;
  pauseOnHover?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center gap-14 pr-14 animate-[marquee_32s_linear_infinite]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "flex shrink-0 items-center gap-14 pr-14 animate-[marquee_32s_linear_infinite]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
    </div>
  );
}

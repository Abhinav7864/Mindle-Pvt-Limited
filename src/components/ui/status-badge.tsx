import * as React from "react";
import { cn } from "@/lib/utils";

export type ProductStatus = "live" | "beta" | "coming-soon";

const map: Record<
  ProductStatus,
  { label: string; dot: string; text: string; ring: string }
> = {
  live: {
    label: "Live",
    dot: "bg-[var(--success)]",
    text: "text-[var(--success)]",
    ring: "border-[color-mix(in_srgb,var(--success)_35%,transparent)] bg-[color-mix(in_srgb,var(--success)_12%,transparent)]",
  },
  beta: {
    label: "Beta",
    dot: "bg-primary",
    text: "text-primary",
    ring: "border-[color-mix(in_srgb,var(--primary)_35%,transparent)] bg-[color-mix(in_srgb,var(--primary)_12%,transparent)]",
  },
  "coming-soon": {
    label: "Coming Soon",
    dot: "bg-[var(--warning)]",
    text: "text-[var(--warning)]",
    ring: "border-[color-mix(in_srgb,var(--warning)_35%,transparent)] bg-[color-mix(in_srgb,var(--warning)_12%,transparent)]",
  },
};

export function StatusBadge({
  status,
  className,
}: {
  status: ProductStatus;
  className?: string;
}) {
  const s = map[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        s.ring,
        s.text,
        className
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        {status !== "coming-soon" && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-60",
              s.dot
            )}
          />
        )}
        <span className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", s.dot)} />
      </span>
      {s.label}
    </span>
  );
}

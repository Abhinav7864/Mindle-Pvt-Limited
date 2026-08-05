"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import type { ProductCardData } from "@/lib/data/products";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  className,
}: {
  product: ProductCardData;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
      }}
      whileHover={{ y: -6 }}
      className={cn("group h-full", className)}
    >
      <Link
        href={`/products/${product.slug}`}
        className="flex h-full flex-col rounded-2xl border border-border bg-card p-6"
      >
        <div className="flex items-start justify-between gap-3">
          {product.slug === "gitaconnect" ? (
            <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-xl shadow-lg bg-[#f5e6a3]">
              <img src="/Gitalogo.png" alt="GitaConnect" className="h-full w-full object-cover" />
            </span>
          ) : (
            <span
              className="grid h-12 w-12 place-items-center rounded-xl text-lg font-bold text-white shadow-lg"
              style={{
                backgroundImage: `linear-gradient(135deg, ${product.gradient[0]}, ${product.gradient[1]})`,
              }}
              aria-hidden="true"
            >
              {product.name.charAt(0)}
            </span>
          )}
        </div>

        <h3 className="mt-5 flex items-center gap-1.5 font-display text-xl font-bold tracking-tight">
          {product.name}
          <ArrowUpRight className="h-4 w-4 -translate-x-1 translate-y-1 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
        </h3>
        <p className="mt-1 text-sm font-medium text-accent">{product.tagline}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {product.short}
        </p>

        <div className="mt-5 text-xs text-muted-foreground font-medium">
          {product.category} · {product.platform}
        </div>
      </Link>
    </motion.div>
  );
}

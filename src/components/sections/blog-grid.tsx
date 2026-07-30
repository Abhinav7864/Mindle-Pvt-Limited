"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { blogPosts, blogCategories, type BlogCategory } from "@/lib/data/blog";
import { cn } from "@/lib/utils";

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${monthNames[m - 1]} ${d}, ${y}`;
}

export function BlogGrid() {
  const [active, setActive] = React.useState<BlogCategory | "All">("All");
  const posts =
    active === "All" ? blogPosts : blogPosts.filter((p) => p.category === active);

  return (
    <div>
      {/* Category chips */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {(["All", ...blogCategories] as const).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            aria-pressed={active === c}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
              active === c
                ? "border-transparent bg-primary text-primary-foreground shadow-[0_8px_24px_-8px_var(--glow)]"
                : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Posts */}
      <motion.div layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {posts.map((post) => (
            <motion.article
              key={post.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_20px_50px_-24px_var(--glow)]"
            >
              <div
                className="relative flex h-40 items-end overflow-hidden p-5"
                style={{
                  background: `linear-gradient(135deg, ${post.gradient[0]}29, ${post.gradient[1]}29)`,
                }}
              >
                <div className="bg-dots absolute inset-0" />
                <Badge variant="primary" className="relative">
                  {post.category}
                </Badge>
                {post.featured && (
                  <Badge variant="warning" className="relative ml-2">
                    Featured
                  </Badge>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-display text-lg font-bold leading-snug tracking-tight transition-colors group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {post.author} · {formatDate(post.date)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readingTime}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {posts.length === 0 && (
        <p className="mt-16 text-center text-muted-foreground">
          No posts in this category yet check back soon.
        </p>
      )}
    </div>
  );
}

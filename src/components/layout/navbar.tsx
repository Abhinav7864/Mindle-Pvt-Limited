"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";
import { StatusBadge } from "@/components/ui/status-badge";
import { mainNav, productMenu, serviceMenu } from "@/lib/data/nav";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [prevPathname, setPrevPathname] = React.useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpenMenu(null);
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/50 bg-background/80 backdrop-blur-md shadow-sm"
          : "border-b border-transparent bg-transparent"
      )}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between px-6 md:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            const hasMenu = item.label === "Products" || item.label === "Services";
            const active = pathname.startsWith(item.href);
            if (hasMenu) {
              return (
                <div
                  key={item.href}
                  onMouseEnter={() => setOpenMenu(item.label)}
                >
                  <button
                    className={cn(
                      "flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:text-foreground",
                      active || openMenu === item.label
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                    aria-expanded={openMenu === item.label}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        openMenu === item.label && "rotate-180"
                      )}
                    />
                  </button>
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setOpenMenu(null)}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:text-foreground",
                  active ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:grid" />
          <Button asChild variant="primary" size="sm" className="hidden sm:inline-flex">
            <Link href="/contact">Work With Us</Link>
          </Button>
          <MobileNav />
        </div>
      </div>

      {/* Mega menu */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute inset-x-0 top-16 hidden lg:block"
          >
            <div className="mx-auto max-w-[1280px] px-6 md:px-8">
              <div className="bg-background overflow-hidden rounded-2xl border border-border/50 shadow-lg">
                <MegaMenu type={openMenu} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MegaMenu({ type }: { type: string }) {
  if (type === "Products") {
    return (
      <div className="grid grid-cols-2 gap-1 p-3">
        {productMenu.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="group flex items-start gap-3 rounded-xl p-4 transition-colors hover:bg-muted"
          >
            <div className="mt-0.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-semibold">{p.label}</span>
                <StatusBadge status={p.status} />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
            </div>
            <ArrowRight className="mt-1 h-4 w-4 shrink-0 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
          </Link>
        ))}
        <Link
          href="/products"
          className="col-span-2 flex items-center justify-between rounded-xl bg-muted/60 p-4 text-sm font-medium transition-colors hover:bg-muted"
        >
          Explore all products
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-1 p-3">
      {serviceMenu.map((s) => (
        <Link
          key={s.href}
          href={s.href}
          className="group flex items-start justify-between gap-3 rounded-xl p-4 transition-colors hover:bg-muted"
        >
          <div>
            <span className="font-display text-sm font-semibold">{s.label}</span>
            <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
          </div>
          <ArrowRight className="mt-1 h-4 w-4 shrink-0 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
        </Link>
      ))}
    </div>
  );
}

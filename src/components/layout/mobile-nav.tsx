"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { mainNav, productMenu } from "@/lib/data/nav";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = React.useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col bg-background p-6 lg:hidden overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-8 flex flex-col gap-1">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-4 py-3 text-lg font-semibold transition-colors hover:bg-muted"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-6">
              <p className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Products
              </p>
              <div className="mt-2 flex flex-col gap-1">
                {productMenu.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    className="flex items-center justify-between gap-2 rounded-xl px-4 py-2.5 transition-colors hover:bg-muted"
                  >
                    <span className="text-sm font-medium">{p.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-3 pt-8">
              <Button asChild variant="primary" size="lg">
                <Link href="/contact">Work With Us</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

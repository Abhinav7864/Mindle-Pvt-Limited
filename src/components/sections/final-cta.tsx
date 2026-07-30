import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function FinalCTA({
  title = "Let's build what's next together.",
  description = "Whether you want to explore our products or bring us in to build yours, we'd love to talk.",
  primaryLabel = "Work With Us",
  primaryHref = "/contact",
  secondaryLabel = "Explore Products",
  secondaryHref = "/products",
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-surface-2 px-8 py-16 text-center md:px-16 md:py-24">
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl md:text-5xl">
                {title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {description}
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Button asChild variant="primary" size="lg">
                  <Link href={primaryHref}>
                    {primaryLabel} <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={secondaryHref}>{secondaryLabel}</Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

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
    <section className="bg-[#080808] py-24 sm:py-32 lg:py-40">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16">
        <Reveal>
          <div className="relative overflow-hidden border-y border-white/[.14] py-16 text-center md:py-28">
            <div className="noise-overlay absolute inset-0" />
            <div className="relative">
              <p className="font-mono text-[10px] uppercase tracking-[.24em] text-white/45">A good place to start</p>
              <h2 className="mx-auto mt-6 max-w-4xl font-display text-[clamp(3rem,6vw,6.7rem)] font-semibold leading-[.9] tracking-[-.07em] text-balance">
                {title}
              </h2>
              <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-white/55 sm:text-lg sm:leading-8">
                {description}
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Button asChild variant="primary" size="lg" className="rounded-none">
                  <Link
                    href={primaryHref}
                    target={primaryHref.startsWith("http") ? "_blank" : undefined}
                    rel={primaryHref.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {primaryLabel} <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-none border-white/30 hover:bg-white hover:text-black">
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

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/data/services";
import { MotionItem } from "@/components/sections/motion-item";

export function ServicesStrip() {
  return (
    <section className="border-y border-border bg-[var(--surface-1)] py-8 sm:py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8">
        <SectionHeading
          eyebrow="Services"
          title="Need a team that ships like it owns the product?"
          description="Services fund our mission and you get product-grade craft on your build. Strategy to shipped, with the same care we put into our own portfolio."
        />

        <RevealGroup className="mt-8 grid gap-3 grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <MotionItem key={s.slug}>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold">{s.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {s.short}
                </p>
              </div>
            </MotionItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-10 text-center">
          <Button asChild variant="outline">
            <Link href="/services">
              Explore all services <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

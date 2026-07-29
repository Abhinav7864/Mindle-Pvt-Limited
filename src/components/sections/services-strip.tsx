import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/data/services";
import { MotionItem } from "@/components/sections/motion-item";

export function ServicesStrip() {
  return (
    <section className="border-y border-border bg-[var(--surface-1)] py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8">
        <SectionHeading
          eyebrow="Services"
          title="Need a team that ships like it owns the product?"
          description="Services fund our mission — and you get product-grade craft on your build. Strategy to shipped, with the same care we put into our own portfolio."
        />

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <MotionItem key={s.slug}>
              <Link
                href={`/services#${s.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-lg"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold">{s.name}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {s.short}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
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

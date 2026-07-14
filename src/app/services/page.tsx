import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FinalCTA } from "@/components/sections/final-cta";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI development, SaaS, full-stack, mobile, UI/UX, automation, and cloud — product-grade engineering for ambitious teams.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            Product-grade craft, <span className="text-gradient">for hire</span>
          </>
        }
        description="Services fund our product mission — which means you get a team that builds your software like it owns it. Eight disciplines, one standard of craft."
      />

      <section className="py-20 md:py-24">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-6 md:px-8">
          {services.map((s, i) => (
            <Reveal key={s.slug}>
              <article
                id={s.slug}
                className="group scroll-mt-28 rounded-3xl border border-border bg-card p-8 transition-colors hover:border-primary/30 md:p-10"
              >
                <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <s.icon className="h-6 w-6" />
                      </span>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {String(i + 1).padStart(2, "0")}
                        </p>
                        <h2 className="font-display text-xl font-bold tracking-tight md:text-2xl">
                          {s.name}
                        </h2>
                      </div>
                    </div>
                    <p className="mt-5 leading-relaxed text-muted-foreground">
                      {s.what}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {s.technologies.map((t) => (
                        <Badge key={t} variant="outline">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between gap-6 rounded-2xl bg-muted/50 p-6">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Process
                      </p>
                      <ol className="mt-3 space-y-2.5">
                        {s.process.map((step, j) => (
                          <li key={step} className="flex items-center gap-3 text-sm">
                            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                              {j + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        Typical: {s.timeline}
                      </span>
                      <Button asChild size="sm">
                        <Link href={`/contact?service=${s.slug}`}>
                          Start a project <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <FinalCTA
        title="Not sure which service fits?"
        description="Tell us what you're trying to build — we'll recommend the shortest path to shipped."
        primaryLabel="Talk to us"
        secondaryLabel="See case studies"
        secondaryHref="/case-studies"
      />
    </>
  );
}

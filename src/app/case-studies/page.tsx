import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Monitor } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FinalCTA } from "@/components/sections/final-cta";
import { caseStudies } from "@/lib/data/case-studies";
import { CaseStudyVisual } from "@/components/sections/case-study-visual";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Featured Mindle projects the problems, solutions, technologies, and measurable results.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Case Studies"
        title={
          <>
            Proof, <span className="text-accent">not promises</span>
          </>
        }
        description="A look at the problems we've solved, how we solved them, and what changed for the teams we worked with."
      />

      <section className="py-20 md:py-24">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8 px-6 md:px-8">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.slug}>
              <article className="overflow-hidden rounded-3xl border border-border bg-card">
                <div
                  className={`grid gap-0 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}
                >
                  {/* Visual */}
                  <CaseStudyVisual results={cs.results} />

                  {/* Content */}
                  <div className="p-8 md:p-12 lg:[direction:ltr]">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="primary">{cs.category}</Badge>
                      <span className="text-xs text-muted-foreground">{cs.client}</span>
                    </div>
                    <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-balance md:text-3xl">
                      {cs.title}
                    </h2>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{cs.summary}</p>

                    <div className="mt-6 space-y-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Problem
                        </p>
                        <p className="mt-1 text-sm leading-relaxed">{cs.problem}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Solution
                        </p>
                        <p className="mt-1 text-sm leading-relaxed">{cs.solution}</p>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {cs.technologies.map((t) => (
                        <Badge key={t} variant="outline">
                          {t}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-7 flex items-center gap-4 text-xs text-muted-foreground">
                      <Monitor className="h-4 w-4" />
                      {cs.screenshots.map((s) => s.title).join(" · ")}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal className="text-center">
            <Button asChild variant="ghost">
              <Link href="/contact">
                 <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <FinalCTA
        title="Your product could be the next case study."
        description="Bring us the problem  we'll bring the craft."
      />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Briefcase } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { MotionItem } from "@/components/sections/motion-item";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FinalCTA } from "@/components/sections/final-cta";
import { openings, benefits, hiringProcess, culture } from "@/lib/data/careers";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Mindle — open roles, culture, benefits, and a hiring process that respects your time.",
};

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title={
          <>
            Do the best work of your career,{" "}
            <span className="text-gradient">on products you own</span>
          </>
        }
        description="Small team. Real ownership. Products used by real people. If that sounds like home, we'd love to meet you."
      >
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {culture.map((c) => (
            <Badge key={c} variant="primary">
              {c}
            </Badge>
          ))}
        </div>
      </PageHeader>

      {/* Open positions */}
      <section className="py-20 md:py-24" id="open-roles">
        <div className="mx-auto w-full max-w-4xl px-6 md:px-8">
          <SectionHeading eyebrow="Open positions" title="We're hiring" />
          <RevealGroup className="mt-12 flex flex-col gap-3">
            {openings.map((job) => (
              <MotionItem key={job.slug}>
                <Link
                  href={`/contact?role=${job.slug}`}
                  className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_16px_40px_-20px_var(--glow)] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="font-display text-base font-bold">{job.title}</h3>
                      <Badge variant="secondary">{job.department}</Badge>
                    </div>
                    <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">
                      {job.description}
                    </p>
                    <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" /> {job.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5" /> {job.type}
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary">
                    Apply
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </MotionItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-8 text-center text-sm text-muted-foreground">
            Don&apos;t see your role?{" "}
            <Link href="/contact" className="font-medium text-primary hover:underline">
              Pitch us anyway
            </Link>
            — exceptional people always have a seat.
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y border-border bg-[var(--surface-1)] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8">
          <SectionHeading eyebrow="Benefits" title="How we take care of you" />
          <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <MotionItem key={b.title}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary">
                    <b.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold">{b.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {b.description}
                  </p>
                </div>
              </MotionItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Hiring process */}
      <section className="py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8">
          <SectionHeading
            eyebrow="Process"
            title="Four steps, no gauntlets"
            description="Our hiring process is fast, practical, and respectful of your time — usually a week end to end."
          />
          <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {hiringProcess.map((p) => (
              <MotionItem key={p.step}>
                <div className="relative h-full rounded-2xl border border-border bg-card p-6">
                  <span className="font-display text-3xl font-extrabold text-primary/25">
                    {p.step}
                  </span>
                  <h3 className="mt-3 font-display text-base font-semibold">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                </div>
              </MotionItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-12 text-center">
            <Button asChild variant="gradient" size="lg">
              <Link href="#open-roles">
                Browse open roles <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <FinalCTA
        title="Build products people love. Own what you ship."
        description="Join a team where your work goes into products we're proud to put our name on."
        primaryLabel="Apply now"
        primaryHref="/contact"
        secondaryLabel="About Mindle"
        secondaryHref="/about"
      />
    </>
  );
}

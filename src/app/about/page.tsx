import type { Metadata } from "next";
import { Compass, Eye, Heart } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { MotionItem } from "@/components/sections/motion-item";
import { FinalCTA } from "@/components/sections/final-cta";
import { mission, values, timeline } from "@/lib/data/company";
import { team } from "@/lib/data/team";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mindle's mission, vision, values, journey, and the team building a product-first company.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Mindle"
        title={
          <>
            A product-first company,{" "}
            <span className="text-accent">built to last</span>
          </>
        }
        description="Mindle exists to create software products that outlive any single engagement intelligent, human-centered, and crafted with care."
      />

      {/* Mission / Vision / Why */}
      <section className="py-8 sm:py-14 md:py-20">
        <div className="mx-auto grid w-full max-w-[1280px] gap-3 px-6 grid-cols-2 md:grid-cols-3 md:px-8">
          {[
            { icon: Compass, title: "Mission", body: mission.mission },
            { icon: Eye, title: "Vision", body: mission.vision },
            { icon: Heart, title: "Why Mindle exists", body: mission.why },
          ].map((m, i) => (
            <Reveal key={m.title} delay={i}>
              <div className="h-full rounded-2xl border border-border bg-card p-5 sm:p-8">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <m.icon className="h-5 w-5" />
                </span>
                <h2 className="mt-4 font-display text-base font-bold sm:text-lg">{m.title}</h2>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {m.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-border bg-[var(--surface-1)] py-8 sm:py-14 md:py-20">
        <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8">
          <SectionHeading eyebrow="Values" title="What we optimize for" />
          <RevealGroup className="mt-8 grid gap-3 grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <MotionItem key={v.title}>
                <div className="h-full rounded-2xl border border-border bg-card p-5 sm:p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                    <v.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold">{v.title}</h3>
                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {v.description}
                  </p>
                </div>
              </MotionItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Journey timeline */}
      <section className="py-8 sm:py-14 md:py-20">
        <div className="mx-auto w-full max-w-3xl px-6 md:px-8">
          <SectionHeading eyebrow="Journey" title="From thesis to products" />
          <div className="relative mt-10">
            <div className="absolute bottom-4 left-[1.35rem] top-4 w-px bg-border md:left-1/2" />
            <div className="flex flex-col gap-8">
              {timeline.map((t, i) => (
                <Reveal key={`${t.year}-${t.title}`}>
                  <div
                    className={`relative flex gap-5 md:w-1/2 ${
                      i % 2 === 0
                        ? "md:pr-12"
                        : "md:ml-auto md:flex-row-reverse md:pl-12 md:pr-0 md:text-right"
                    }`}
                  >
                    <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-card text-primary shadow-md">
                      <t.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                        {t.year}
                      </p>
                      <h3 className="mt-1 font-display text-base font-bold sm:text-lg">{t.title}</h3>
                      <p className="mt-1 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                        {t.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="border-y border-border bg-[var(--surface-1)] py-8 sm:py-14 md:py-20">
        <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8">
          <SectionHeading
            eyebrow="Team"
            title="The people behind Mindle"
            description="A small, senior team of builders inventors on the GitaConnect patent and owners of everything we ship."
          />
          <RevealGroup className="mt-8 grid gap-3 grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <MotionItem key={m.name}>
                <div className="h-full rounded-2xl border border-border bg-card p-5 sm:p-6 text-center">
                  {m.image ? (
                    <img
                      src={m.image}
                      alt={m.name}
                      className="mx-auto h-24 w-24 sm:h-28 sm:w-28 rounded-full object-cover shadow-md border border-border"
                    />
                  ) : (
                    <span
                      className="mx-auto grid h-24 w-24 sm:h-28 sm:w-28 place-items-center rounded-full text-xl sm:text-2xl font-bold text-white shadow-md"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${m.gradient[0]}, ${m.gradient[1]})`,
                      }}
                      aria-hidden="true"
                    >
                      {m.initials}
                    </span>
                  )}
                  <h3 className="mt-3 font-display text-sm font-bold sm:text-base">{m.name}</h3>
                  <p className="mt-0.5 text-xs font-medium text-primary">{m.role}</p>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {m.bio}
                  </p>
                </div>
              </MotionItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

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
    "Mindle's mission, vision, values, journey, and the team building a product-first AI company.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Mindle"
        title={
          <>
            A product-first company,{" "}
            <span className="text-gradient">built to last</span>
          </>
        }
        description="Mindle exists to create software products that outlive any single engagement — intelligent, human-centered, and crafted with care."
      />

      {/* Mission / Vision / Why */}
      <section className="py-20 md:py-24">
        <div className="mx-auto grid w-full max-w-[1280px] gap-4 px-6 md:grid-cols-3 md:px-8">
          {[
            { icon: Compass, title: "Mission", body: mission.mission },
            { icon: Eye, title: "Vision", body: mission.vision },
            { icon: Heart, title: "Why Mindle exists", body: mission.why },
          ].map((m, i) => (
            <Reveal key={m.title} delay={i}>
              <div className="h-full rounded-3xl border border-border bg-card p-8">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary">
                  <m.icon className="h-5 w-5" />
                </span>
                <h2 className="mt-4 font-display text-lg font-bold">{m.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {m.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-border bg-[var(--surface-1)] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8">
          <SectionHeading eyebrow="Values" title="What we optimize for" />
          <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <MotionItem key={v.title}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/35">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary">
                    <v.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {v.description}
                  </p>
                </div>
              </MotionItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Journey timeline */}
      <section className="py-24 md:py-32">
        <div className="mx-auto w-full max-w-3xl px-6 md:px-8">
          <SectionHeading eyebrow="Journey" title="From thesis to products" />
          <div className="relative mt-14">
            <div className="absolute bottom-4 left-[1.35rem] top-4 w-px bg-border md:left-1/2" />
            <div className="flex flex-col gap-10">
              {timeline.map((t, i) => (
                <Reveal key={`${t.year}-${t.title}`}>
                  <div
                    className={`relative flex gap-6 md:w-1/2 ${
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
                      <h3 className="mt-1 font-display text-lg font-bold">{t.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
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
      <section className="border-y border-border bg-[var(--surface-1)] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8">
          <SectionHeading
            eyebrow="Team"
            title="The people behind Mindle"
            description="A small, senior team of builders — inventors on the GitaConnect patent and owners of everything we ship."
          />
          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <MotionItem key={m.name}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 text-center transition-colors hover:border-primary/35">
                  {m.image ? (
                    <img
                      src={m.image}
                      alt={m.name}
                      className="mx-auto h-32 w-32 rounded-full object-cover shadow-lg border border-border"
                    />
                  ) : (
                    <span
                      className="mx-auto grid h-32 w-32 place-items-center rounded-full text-2xl font-bold text-white shadow-lg"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${m.gradient[0]}, ${m.gradient[1]})`,
                      }}
                      aria-hidden="true"
                    >
                      {m.initials}
                    </span>
                  )}
                  <h3 className="mt-4 font-display text-base font-bold">{m.name}</h3>
                  <p className="mt-0.5 text-sm font-medium text-primary">{m.role}</p>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
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

import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup } from "@/components/ui/reveal";
import { MotionItem } from "@/components/sections/motion-item";
import { personas, companyStats } from "@/lib/data/company";

export function Metrics() {
  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8">
        <Reveal>
          <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {companyStats.map((s) => (
              <div key={s.label} className="bg-card p-8 text-center">
                <p className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
                  <AnimatedCounter
                    value={s.value}
                    suffix={s.suffix ?? ""}
                    prefix={"prefix" in s ? (s.prefix as string) : ""}
                  />
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Personas() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8">
        <SectionHeading
          eyebrow="Who we build for"
          title="Built for the people building  "
        />
        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {personas.map((p) => (
            <MotionItem key={p.title}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/35">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <p.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
              </div>
            </MotionItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { services } from "@/lib/data/services";

export function CapabilitiesRail() {
  return (
    <section className="border-y border-white/[.12] bg-[#f1f1ed] py-24 text-[#0b0b0a] sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <Reveal className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
          <p className="font-mono text-[10px] uppercase tracking-[.24em] text-black/45">How we help</p>
          <h2 className="max-w-4xl font-display text-[clamp(2.8rem,5.1vw,5.6rem)] font-semibold leading-[.92] tracking-[-.065em]">The thinking and making, in one room.</h2>
        </Reveal>
        <div className="mt-20 border-t border-black/20">
          {services.map((service, index) => (
            <Reveal key={service.slug} className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-4 border-b border-black/20 py-6 md:grid-cols-[100px_1fr_1.1fr_auto] md:gap-8 md:py-9">
              <span className="font-mono text-[10px] text-black/45">0{index + 1}</span>
              <h3 className="font-display text-2xl font-medium tracking-[-.035em] md:text-4xl">{service.name}</h3>
              <p className="hidden max-w-md text-sm leading-6 text-black/58 md:block">{service.short}</p>
              <Link href={`/services#${service.slug}`} aria-label={`Explore ${service.name}`} className="magnetic-link grid h-8 w-8 place-items-center border border-black/30 transition-colors hover:bg-black hover:text-white"><ArrowUpRight className="h-4 w-4" /></Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

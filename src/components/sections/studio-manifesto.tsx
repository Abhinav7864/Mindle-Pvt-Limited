import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const principles = [
  ["01", "Useful before impressive", "A product earns attention by making someone’s day clearer, easier, or more meaningful."],
  ["02", "Intelligence with boundaries", "We use AI where it creates genuine leverage, with the context and guardrails it deserves."],
  ["03", "Craft survives launch day", "The finest details are not polish at the end. They are part of the product from the beginning."],
];

export function StudioManifesto() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-44">
      <div className="noise-overlay pointer-events-none absolute inset-0" />
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <Reveal className="grid gap-10 lg:grid-cols-[.65fr_1.35fr]">
          <p className="font-mono text-[10px] uppercase tracking-[.24em] text-white/45">The Mindle point of view</p>
          <div>
            <h2 className="max-w-5xl font-display text-[clamp(2.8rem,5vw,5.65rem)] font-semibold leading-[.94] tracking-[-.065em]">Technology can be deeply human.</h2>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/57">We are a small product studio working across strategy, experience design, engineering, and applied AI. Our practice is simple: make the complex feel natural.</p>
            <Link href="/about" className="magnetic-link mt-9 inline-flex items-center gap-2 text-sm text-white/75 hover:text-white">Meet the studio <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </Reveal>
        <div className="mt-24 grid border-t border-white/[.13] md:grid-cols-3">
          {principles.map(([number, title, copy]) => (
            <Reveal key={number} className="border-b border-white/[.13] py-9 md:border-b-0 md:px-8 md:first:pl-0 md:[&:not(:last-child)]:border-r md:last:pr-0">
              <p className="font-mono text-[10px] tracking-[.18em] text-white/35">{number}</p>
              <h3 className="mt-12 font-display text-2xl font-medium tracking-[-.04em]">{title}</h3>
              <p className="mt-4 max-w-sm leading-7 text-white/48">{copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

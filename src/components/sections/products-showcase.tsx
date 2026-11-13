import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { ProductCard } from "@/components/sections/product-card";
import { PhoneMockup } from "@/components/sections/phone-mockup";
import { products, featuredProduct, toCardData } from "@/lib/data/products";
import { Tilt3D } from "@/components/ui/tilt-3d";

export function ProductsShowcase() {
  const rest = products.filter((p) => p.slug !== featuredProduct.slug);
  return (
    <section className="relative py-12 sm:py-16 md:py-24">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-full max-w-[1000px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.15),transparent_70%)] blur-3xl" />

      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8">
        <SectionHeading
          eyebrow="Products Portfolio"
          title={
            <>
              Products are our <span className="text-accent">centerpiece</span>
            </>
          }
          description="We don't just build software for others—we build and own products that solve real problems."
        />

        {/* Featured: GitaConnect */}
        <Reveal className="mt-12">
          <Tilt3D maxTilt={6} className="w-full">
            <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/90 shadow-2xl backdrop-blur-xl">
              <div className="absolute inset-0 bg-dots opacity-30" />
              <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#00D2FF]/15 blur-3xl" />
              <div className="pointer-events-none absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-[#0066FF]/20 blur-3xl" />

              <div className="relative grid items-center gap-8 p-6 md:p-14 lg:grid-cols-2">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-500">
                      <Sparkles className="h-3 w-3" /> Flagship App · {featuredProduct.category}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
                    {featuredProduct.name}
                  </h3>
                  <p className="mt-2 text-lg font-medium text-accent">
                    {featuredProduct.tagline}
                  </p>
                  <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
                    {featuredProduct.description}
                  </p>
                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {featuredProduct.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button asChild variant="primary" className="shadow-lg shadow-accent/10">
                      <Link href={`/products/${featuredProduct.slug}`}>
                        Explore {featuredProduct.name}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link
                        href={featuredProduct.cta.href}
                        target={featuredProduct.cta.href.startsWith("http") ? "_blank" : undefined}
                        rel={featuredProduct.cta.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {featuredProduct.cta.label}
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="mx-auto block mt-8 lg:mt-0 max-w-[280px] sm:max-w-[320px] lg:max-w-none">
                  <div className="animated-border rounded-[2.6rem] p-[2px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">
                    <PhoneMockup className="rounded-[2.5rem] relative bg-background" />
                  </div>
                </div>
              </div>
            </div>
          </Tilt3D>
        </Reveal>

        {/* Upcoming products */}
        <RevealGroup className="mt-8 grid gap-6 md:grid-cols-3">
          {rest.map((p) => (
            <ProductCard key={p.slug} product={toCardData(p)} />
          ))}
        </RevealGroup>

        <Reveal className="mt-10 text-center">
          <Button asChild variant="ghost">
            <Link href="/products">
              View all products <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}


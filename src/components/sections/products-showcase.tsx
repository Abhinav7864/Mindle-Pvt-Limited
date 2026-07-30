import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { ProductCard } from "@/components/sections/product-card";
import { PhoneMockup } from "@/components/sections/phone-mockup";
import { products, featuredProduct, toCardData } from "@/lib/data/products";

export function ProductsShowcase() {
  const rest = products.filter((p) => p.slug !== featuredProduct.slug);
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8">
        <SectionHeading
          eyebrow="Products"
          title={
            <>
              Products are the <span className="text-accent">centerpiece</span>
            </>
          }
          description="We don't just build software for others we own what we ship. Meet the Mindle portfolio."
        />

        {/* Featured: GitaConnect */}
        <Reveal className="mt-16">
          <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-background shadow-sm">
            <div className="absolute inset-0 bg-dots opacity-40" />

            <div className="relative grid items-center gap-12 p-8 md:p-14 lg:grid-cols-2">
              <div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={featuredProduct.status} />
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Flagship · {featuredProduct.category} · {featuredProduct.platform}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl">
                  {featuredProduct.name}
                </h3>
                <p className="mt-2 text-lg font-medium text-primary">
                  {featuredProduct.tagline}
                </p>
                <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
                  {featuredProduct.description}
                </p>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {featuredProduct.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--success)]" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild variant="primary">
                    <Link href={`/products/${featuredProduct.slug}`}>
                      Explore {featuredProduct.name}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href={featuredProduct.cta.href}>{featuredProduct.cta.label}</Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto hidden lg:block">
                <PhoneMockup />
              </div>
            </div>
          </div>
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

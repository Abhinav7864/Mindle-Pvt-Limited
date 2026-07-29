import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { ProductCard } from "@/components/sections/product-card";
import { RevealGroup } from "@/components/ui/reveal";
import { FinalCTA } from "@/components/sections/final-cta";
import { products, toCardData } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The Mindle product portfolio — AI-powered SaaS platforms, mobile apps, and developer tools. Starting with GitaConnect.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Products"
        title={
          <>
            Software we <span className="text-accent">own and love</span>
          </>
        }
        description="Mindle is a product-first company. This portfolio is why we exist — each product built with the same obsession for craft, trust, and intelligence."
      />

      <section className="py-20 md:py-24">
        <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8">
          <RevealGroup className="grid gap-6 md:grid-cols-2">
            {products.map((p) => (
              <ProductCard key={p.slug} product={toCardData(p)} />
            ))}
          </RevealGroup>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            More products are on the roadmap — this portfolio is designed to grow.
          </p>
        </div>
      </section>

      <FinalCTA
        title="Have a product idea of your own?"
        description="We partner with founders and teams to design and build products with the same craft we put into ours."
        primaryLabel="Work With Us"
        secondaryLabel="See our services"
        secondaryHref="/services"
      />
    </>
  );
}

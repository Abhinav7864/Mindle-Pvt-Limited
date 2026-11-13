import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { products } from "@/lib/data/products";

const images: Record<string, string> = {
  "gita-connect": "/gitaconnect-app.jpg",
  "panchatantra-ai": "/panchatantra-kids.jpg",
};

export function ProductsShowcase() {
  return (
    <section id="work" className="relative border-y border-white/[.1] bg-[#0d0d0d] py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <Reveal className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
          <p className="font-mono text-[10px] uppercase tracking-[.24em] text-white/45">Selected work</p>
          <h2 className="max-w-4xl font-display text-[clamp(2.8rem,5.2vw,5.8rem)] font-semibold leading-[.93] tracking-[-.065em]">
            Building products with a reason to exist.
          </h2>
        </Reveal>

        <div className="mt-16 divide-y divide-white/[.13] border-y border-white/[.13]">
          {products.map((product, index) => (
            <Reveal key={product.slug} className="group grid gap-10 py-12 md:py-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-20">
              <div className={index % 2 ? "lg:order-2" : ""}>
                <p className="font-mono text-[10px] uppercase tracking-[.22em] text-white/42">0{index + 1} / {product.category}</p>
                <h3 className="mt-5 font-display text-4xl font-semibold tracking-[-.055em] md:text-6xl">{product.name}</h3>
                <p className="mt-4 max-w-lg text-lg leading-8 text-white/60">{product.tagline}</p>
                <p className="mt-6 max-w-xl leading-7 text-white/48">{product.short}</p>
                <div className="mt-8 flex items-center gap-5">
                  <Link href={`/products/${product.slug}`} className="magnetic-link inline-flex items-center gap-2 border-b border-white pb-1 text-sm font-medium text-white">
                    View product <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <span className="font-mono text-[10px] uppercase tracking-[.16em] text-white/35">{product.status}</span>
                </div>
              </div>
              <Link href={`/products/${product.slug}`} className={`relative block aspect-[16/10] overflow-hidden bg-[#171717] ${index % 2 ? "lg:order-1" : ""}`} aria-label={`View ${product.name}`}>
                {images[product.slug] ? (
                  <Image src={images[product.slug]} alt="" fill className="object-cover opacity-80 grayscale transition duration-700 group-hover:scale-[1.035] group-hover:grayscale-0" sizes="(min-width: 1024px) 50vw, 100vw" />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between border-t border-white/30 pt-3 font-mono text-[10px] uppercase tracking-[.16em] text-white/70">
                  <span>{product.platform}</span><ArrowUpRight className="h-4 w-4" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-right"><Link href="/products" className="magnetic-link inline-flex items-center gap-2 text-sm text-white/65 hover:text-white">Explore all products <ArrowUpRight className="h-4 w-4" /></Link></Reveal>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { MotionItem } from "@/components/sections/motion-item";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PhoneMockup } from "@/components/sections/phone-mockup";
import { FinalCTA } from "@/components/sections/final-cta";
import { products, getProduct } from "@/lib/data/products";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.tagline}`,
    description: product.short,
    openGraph: { title: product.name, description: product.short },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const isGitaConnect = product.slug === "gitaconnect";

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border pb-20 pt-36 md:pt-44">
        <div className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_70%_70%_at_50%_0%,black,transparent)]" />
        <div
          className="absolute left-1/2 top-[-14rem] -z-10 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full blur-3xl opacity-25"
          style={{
            background: `radial-gradient(closest-side, ${product.gradient[0]}, transparent)`,
          }}
        />
        <div className="mx-auto grid w-full max-w-[1280px] items-center gap-14 px-6 md:px-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="grid h-14 w-14 place-items-center rounded-2xl text-xl font-bold text-white shadow-lg"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${product.gradient[0]}, ${product.gradient[1]})`,
                }}
              >
                {product.name.charAt(0)}
              </span>
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="font-display text-2xl font-bold tracking-tight">
                    {product.name}
                  </h1>
                  <StatusBadge status={product.status} />
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {product.category} · {product.platform}
                </p>
              </div>
            </div>

            <h2 className="mt-8 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-balance sm:text-4xl md:text-5xl">
              {product.hero.headline}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {product.hero.subhead}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="primary" size="lg">
                <Link href={product.cta.href}>
                  {product.cta.label} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Talk to us</Link>
              </Button>
            </div>

            <ul className="mt-9 grid gap-2.5 sm:grid-cols-2">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--success)]" />
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mx-auto hidden lg:block" delay={2}>
            {isGitaConnect ? (
              <div className="animate-[float_6s_ease-in-out_infinite]">
                <PhoneMockup className="shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] rounded-[2.5rem]" />
              </div>
            ) : (
              <div
                className="relative flex aspect-[4/3] w-full max-w-md items-center justify-center overflow-hidden rounded-3xl border border-border"
                style={{
                  background: `linear-gradient(135deg, ${product.gradient[0]}22, ${product.gradient[1]}22)`,
                }}
              >
                <div className="bg-dots absolute inset-0" />
                <div className="relative text-center">
                  <span
                    className="mx-auto grid h-20 w-20 place-items-center rounded-3xl text-3xl font-bold text-white shadow-2xl"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${product.gradient[0]}, ${product.gradient[1]})`,
                    }}
                  >
                    {product.name.charAt(0)}
                  </span>
                  <p className="mt-4 text-sm font-medium text-muted-foreground">
                    In development — join the waitlist
                  </p>
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      {product.stats && (
        <section className="border-b border-border bg-[var(--surface-1)] py-14">
          <div className="mx-auto grid w-full max-w-[1280px] grid-cols-2 gap-8 px-6 md:px-8 lg:grid-cols-4">
            {product.stats.map((s) => (
              <Reveal key={s.label} className="text-center">
                <p className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
                  <AnimatedCounter
                    value={s.value}
                    suffix={s.suffix ?? ""}
                    prefix={s.prefix ?? ""}
                  />
                </p>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8">
          <SectionHeading
            eyebrow="Features"
            title={`Everything inside ${product.name}`}
            description={product.description}
          />
          <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.features.map((f) => (
              <MotionItem key={f.title}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/35">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {f.description}
                  </p>
                </div>
              </MotionItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Screenshots */}
      <section className="border-y border-border bg-[var(--surface-1)] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8">
          <SectionHeading eyebrow="Product" title="A look inside" />
          <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {product.screenshots.map((s, i) => (
              <MotionItem key={s.title}>
                <figure className="group h-full overflow-hidden rounded-2xl border border-border bg-card">
                  <div
                    className="relative flex aspect-[4/5] items-center justify-center overflow-hidden"
                    style={{
                      background: `linear-gradient(${135 + i * 40}deg, ${product.gradient[0]}1f, ${product.gradient[1]}1f)`,
                    }}
                  >
                    <div className="bg-dots absolute inset-0" />
                    <Smartphone className="h-10 w-10 text-muted-foreground/40 transition-transform duration-500 group-hover:scale-110" />
                    <span className="absolute bottom-3 right-3 rounded-full bg-card/80 px-2.5 py-1 text-[10px] font-medium text-muted-foreground backdrop-blur">
                      Preview coming soon
                    </span>
                  </div>
                  <figcaption className="p-4">
                    <p className="text-sm font-semibold">{s.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{s.caption}</p>
                  </figcaption>
                </figure>
              </MotionItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32">
        <div className="mx-auto w-full max-w-3xl px-6 md:px-8">
          <SectionHeading eyebrow="FAQ" title="Questions, answered" />
          <Reveal className="mt-12">
            <Accordion type="single" collapsible className="w-full">
              {product.faq.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      <FinalCTA
        title={`Ready for ${product.name}?`}
        description={product.tagline}
        primaryLabel={product.cta.label}
        primaryHref={product.cta.href}
        secondaryLabel="All products"
        secondaryHref="/products"
      />
    </>
  );
}

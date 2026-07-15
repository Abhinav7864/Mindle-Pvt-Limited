import { Hero } from "@/components/sections/hero";
import { ProductsShowcase } from "@/components/sections/products-showcase";
import { ServicesStrip } from "@/components/sections/services-strip";
import {
  Metrics,
  Personas,
  Testimonials,
} from "@/components/sections/home-sections";
import { FinalCTA } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductsShowcase />
      <ServicesStrip />
      <Metrics />
      <Personas />
      <Testimonials />
      <FinalCTA />
    </>
  );
}

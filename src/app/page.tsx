import { Hero } from "@/components/sections/hero";
import { StudioShowreel } from "@/components/sections/studio-showreel";
import { ProductsShowcase } from "@/components/sections/products-showcase";
import { TechnologyBridgeSection } from "@/components/sections/technology-bridge";
import { ServicesStrip } from "@/components/sections/services-strip";
import { Metrics, Personas } from "@/components/sections/home-sections";
import { FinalCTA } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StudioShowreel />
      <ProductsShowcase />
      <TechnologyBridgeSection />
      <ServicesStrip />
      <Metrics />
      <Personas />
      <FinalCTA />
    </>
  );
}

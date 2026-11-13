import { Hero } from "@/components/sections/hero";
import { ProductsShowcase } from "@/components/sections/products-showcase";
import { StudioManifesto } from "@/components/sections/studio-manifesto";
import { CapabilitiesRail } from "@/components/sections/capabilities-rail";
import { FinalCTA } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StudioManifesto />
      <ProductsShowcase />
      <CapabilitiesRail />
      <FinalCTA />
    </>
  );
}

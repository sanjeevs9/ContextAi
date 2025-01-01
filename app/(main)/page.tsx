
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";

import { Testimonials } from "@/components/Testimonials";
import { PricingSection } from "@/components/pricing/PricingSection";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
     
      <ContainerScroll titleComponent="How It Works"  >
        <HowItWorks />
      </ContainerScroll>
      <Features />
      
      <PricingSection />
      <Testimonials />
    </div>
  );
}

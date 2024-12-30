
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";

import { Testimonials } from "@/components/Testimonials";
import { PricingSection } from "@/components/pricing/PricingSection";


export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <div className="flex justify-center">

      </div>
      <Features />
      <HowItWorks />
      <PricingSection />
      <Testimonials />
    </div>
  );
}

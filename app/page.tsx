import {Header} from "@/components/header/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";
import { Testimonials } from "@/components/Testimonials";
import { PricingSection } from "@/components/pricing/PricingSection";
export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <PricingSection />
      <Testimonials />
      <Footer />
    </div>
  );
}

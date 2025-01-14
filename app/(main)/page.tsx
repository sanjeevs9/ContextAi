"use client"

import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { PricingSection } from "@/components/pricing/PricingSection";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { Toaster, toast } from 'sonner';

function HomeContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      toast('Payment successful! Welcome aboard!');
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen">
      <Hero />
      <ContainerScroll titleComponent="How It Works" >
        <HowItWorks/>
        </ContainerScroll>
      <Features />
      <PricingSection />
      <Testimonials />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}

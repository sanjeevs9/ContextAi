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

import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { SparklesIcon, ShieldCheckIcon, ZapIcon } from "lucide-react"

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
    <Suspense fallback={<div>


 <main className="min-h-screen bg-[#000B1E] text-white">
      <div className="container mx-auto px-4 pt-20">
        {/* AI Badge */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-yellow-500/10 px-3 py-1">
            <SparklesIcon className="h-4 w-4 text-yellow-500" />
            <Skeleton className="h-4 w-40 bg-yellow-500/20" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              <Skeleton className="mx-auto h-12 w-3/4 bg-white/20" />
              <div className="mt-2">
                <Skeleton className="mx-auto h-12 w-1/2 bg-cyan-400/20" />
              </div>
            </h1>
            <div className="mt-6">
              <Skeleton className="mx-auto h-6 w-full max-w-xl bg-white/10" />
              <Skeleton className="mx-auto mt-2 h-6 w-full max-w-lg bg-white/10" />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" variant="ghost" className="h-12 min-w-[200px] animate-pulse bg-yellow-500/20">
              <Skeleton className="h-5 w-32 bg-yellow-500/20" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 min-w-[200px] animate-pulse border-cyan-400/30">
              <Skeleton className="h-5 w-32 bg-cyan-400/20" />
            </Button>
          </div>

          {/* Features */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="h-5 w-5 text-cyan-400" />
              <Skeleton className="h-5 w-32 bg-white/10" />
            </div>
            <div className="flex items-center gap-2">
              <ZapIcon className="h-5 w-5 text-cyan-400" />
              <Skeleton className="h-5 w-32 bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </main>



    </div>}>
      <HomeContent />
    </Suspense>
  );
}

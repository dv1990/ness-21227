import { lazy, Suspense, useCallback, memo } from 'react';
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/homeowner-hero-battery.webp";
import NessFeatureGrid from "@/components/homeowner/NessFeatureGrid";
import { TrustStrip } from "@/components/ui/trust-strip";

// Lazy load below-the-fold sections for better initial load
const LazySection = lazy(() => import("@/components/ui/lazy-section").then(m => ({ default: m.LazySection })));
const PhilosophicalSection = lazy(() => import("@/components/homeowner/PhilosophicalSection").then(m => ({ default: m.PhilosophicalSection })));
const HomeownerConfigurator = lazy(() => import("@/components/homeowner/HomeownerConfigurator").then(m => ({ default: m.HomeownerConfigurator })));
const BelowFoldSections = lazy(() => import("@/components/homeowner/BelowFoldSections").then(m => ({ default: m.BelowFoldSections })));

const ContactHomeowner = () => {
  const scrollToConfigurator = useCallback(() => {
    setTimeout(() => {
      document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  return <Layout className="-mt-16">
      {/* Full-Screen Hero Section */}
      <section className="relative min-h-[90vh] md:h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Premium NESS home battery system with sophisticated wall-mount design"
            className="w-full h-full object-cover"
            loading="eager"
            width={1920}
            height={1080}
            fetchPriority="high"
          />
          {/* Dark overlay for text readability - concentrated on left side only */}
          <div className="absolute inset-y-0 left-0 right-1/2 bg-gradient-to-r from-charcoal/95 via-charcoal/70 to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-3xl space-y-8">
              <div className="space-y-6">
                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] leading-[0.95] text-pearl">
                  Built for<br />
                  <span className="text-gradient-energy">Indian homes.</span>
                </h1>

                <p className="font-display text-xl sm:text-2xl md:text-3xl text-pearl/65 font-light leading-[1.35] tracking-[-0.015em] max-w-2xl">
                  From ₹2.5 Lakh installed.<br />
                  Built in Bangalore. Backed for ten years.
                </p>
              </div>

              <div className="pt-2 sm:pt-4">
                <Button
                  size="lg"
                  onClick={scrollToConfigurator}
                  className="interactive font-display bg-energy hover:bg-energy-bright text-charcoal font-semibold px-10 sm:px-12 py-5 sm:py-6 text-base sm:text-lg rounded-full transition-all duration-300 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,230,118,0.35)] hover:scale-105 active:scale-95"
                  aria-label="Configure your NESS system"
                >
                  Get a Quote
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Stat Cards */}




        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 motion-safe:animate-bounce">
          <div className="w-6 h-10 border-2 border-pearl/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-pearl/50 rounded-full motion-safe:animate-pulse" />
          </div>
        </div>
      </section>

      {/* Canonical trust strip — same shape across all product pages */}
      <TrustStrip variant="dark" />

      {/* Apple-style Feature Grid */}
      <NessFeatureGrid />

      {/* Lazy load below-the-fold sections */}
      <Suspense fallback={<div className="min-h-[400px] bg-gradient-to-b from-charcoal to-graphite" />}>
        <LazySection rootMargin="800px">
          <PhilosophicalSection />
        </LazySection>
      </Suspense>

      {/* Lazy load configurator section with framer-motion */}
      <Suspense fallback={<div className="min-h-screen bg-gradient-to-b from-graphite to-charcoal flex items-center justify-center"><div className="w-8 h-8 border-2 border-energy border-t-transparent rounded-full animate-spin"></div></div>}>
        <LazySection rootMargin="800px">
          <HomeownerConfigurator />
        </LazySection>
      </Suspense>

      {/* Lazy load remaining sections */}
      <Suspense fallback={<div className="min-h-[600px]" />}>
        <LazySection rootMargin="800px">
          <BelowFoldSections />
        </LazySection>
      </Suspense>
    </Layout>;
  };

export default memo(ContactHomeowner);

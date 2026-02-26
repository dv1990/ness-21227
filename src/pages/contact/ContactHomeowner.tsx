import { lazy, Suspense, useCallback, memo } from 'react';
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight } from "lucide-react";
import heroImage from "@/assets/homeowner-hero-battery.webp";
import NessFeatureGrid from "@/components/homeowner/NessFeatureGrid";

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
          <div className="absolute inset-y-0 left-0 right-1/2 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-3xl space-y-8">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full backdrop-blur-sm border border-primary/20">
                <span className="text-sm font-medium text-primary">Intelligent Home Energy</span>
              </div>

              <div className="space-y-6">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight leading-[0.9] text-foreground">
                  Energy that<br />
                  <span className="text-primary font-light">thinks</span> ahead.<br />
                  So you never have to.
                </h1>

                <p className="text-2xl md:text-3xl text-muted-foreground font-light leading-relaxed max-w-2xl">
                  The new luxury isn't a louder generator.<br />
                  It's a silent system that learns your rhythm{' '}
                  <br className="hidden sm:block" />and never asks for attention.
                </p>
              </div>

              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-3 text-sm backdrop-blur-sm bg-background/30 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-foreground">Live monitoring</span>
                </div>
                <div className="flex items-center gap-3 text-sm backdrop-blur-sm bg-background/30 px-4 py-2 rounded-full">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-foreground">10ms response time</span>
                </div>
              </div>

              <div className="pt-6">
                <Button 
                  size="lg" 
                  onClick={scrollToConfigurator}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-300"
                  aria-label="Start the product selection process to find your perfect NESS system"
                >
                  Discover Your System
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Stat Cards */}
        

        

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 motion-safe:animate-bounce">
          <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-foreground/50 rounded-full motion-safe:animate-pulse" />
          </div>
        </div>
      </section>

      {/* Apple-style Feature Grid */}
      <NessFeatureGrid />

      {/* Lazy load below-the-fold sections */}
      <Suspense fallback={<div className="min-h-[400px] bg-gradient-to-b from-background to-muted/20" />}>
        <LazySection>
          <PhilosophicalSection />
        </LazySection>
      </Suspense>

      {/* Lazy load configurator section with framer-motion */}
      <Suspense fallback={<div className="min-h-screen bg-gradient-to-b from-muted/20 to-background flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
        <LazySection rootMargin="300px">
          <HomeownerConfigurator />
        </LazySection>
      </Suspense>

      {/* Lazy load remaining sections */}
      <Suspense fallback={<div className="min-h-[600px]" />}>
        <LazySection>
          <BelowFoldSections />
        </LazySection>
      </Suspense>
    </Layout>;
  };

export default memo(ContactHomeowner);
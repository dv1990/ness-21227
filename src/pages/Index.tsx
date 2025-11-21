import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LazySection } from "@/components/ui/lazy-section";
import { WebPImage } from "@/components/ui/webp-image";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { ProductSectionSkeleton } from "@/components/ui/product-section-skeleton";
import { cn } from "@/lib/utils";
import nessHeroProduct from "@/assets/ness-hero-product.webp";
import nessPodProduct from "@/assets/ness-pod-hero-new.webp";
import nessProProduct from "@/assets-webp/ness-pro-product.webp";
import { useState, useEffect, useRef, memo, lazy, Suspense } from "react";
import { testimonials } from "@/data/testimonials";

// Lazy load icons to reduce initial bundle size
const CheckCircle2 = lazy(() => import("lucide-react").then(m => ({
  default: m.CheckCircle2
})));
const ArrowRight = lazy(() => import("lucide-react").then(m => ({
  default: m.ArrowRight
})));

// Lazy load heavy components to reduce initial bundle
const BelowFoldSections = lazy(() => import("@/components/homeowner/BelowFoldSections").then(m => ({
  default: m.BelowFoldSections
})));
const HomeownerConfigurator = lazy(() => import("@/components/homeowner/HomeownerConfigurator").then(m => ({
  default: m.HomeownerConfigurator
})));

// Import LoadingSpinner for consistent loading states
import { LoadingSpinner } from "@/components/ui/loading-spinner";
const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const nextSectionRef = useRef<HTMLElement>(null);

  // Smooth parallax scroll tracking with RAF
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking && window.scrollY < 800) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);
  return <Layout>
      {/* 1. HERO SECTION */}
      <section 
        className="relative min-h-[600px] sm:min-h-screen w-full overflow-hidden"
        aria-labelledby="hero-heading"
      >
        {/* Full-screen Product Image Background */}
        <div className="absolute inset-0 w-full h-full">
          {/* Product Image - Static confidence */}
          <div className="absolute inset-0 w-full h-full">
            <img src={nessHeroProduct} alt="NESS home battery — reliable backup power for modern Indian homes" className="w-full h-full object-cover object-center" loading="eager" width={1920} height={1080} fetchPriority="high" />
          </div>

          {/* Left-to-right gradient - product fully visible on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/30 via-40% to-transparent" />
        </div>

        {/* Text Content Overlaid - Simplified Jobs-style */}
        <div className="relative z-10 min-h-[600px] sm:h-screen flex items-center max-w-[1600px] mx-auto px-4 sm:px-8 md:px-16 py-20 sm:py-0 will-change-transform" style={{
        transform: `translate3d(0, ${scrollY * 0.15}px, 0)`
      }}>
          <div className="space-y-10 sm:space-y-14 md:space-y-16 max-w-3xl w-full">
            {/* Headline - Jobs-style: Massive spacing, minimal words */}
            <h1 
              id="hero-heading"
              className={cn("font-display text-4xl sm:text-[56px] md:text-[72px] lg:text-[96px] font-bold leading-[1.1] sm:leading-[1.15] tracking-[-0.02em] text-pearl transition-all duration-1000 ease-out", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}
            >
              Life.
              <br />
              <span className="text-energy">Uninterrupted.</span>
            </h1>
            
            {/* Subtext - Elegant whisper */}
            <p className={cn("font-playfair text-2xl sm:text-[28px] md:text-[32px] lg:text-[36px] font-extralight italic leading-[1.7] tracking-[0.02em] max-w-[750px] bg-gradient-to-r from-pearl via-pearl/90 to-pearl/70 bg-clip-text text-transparent transition-all duration-1000 ease-out delay-150", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
              The home battery.
            </p>

            {/* CTA - Simple and inspiring */}
            <div className={cn("pt-4 sm:pt-6 transition-all duration-1000 ease-out delay-300", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
              <Link to="/residential" className="inline-block group">
                <Button size="lg" className="font-sans bg-energy hover:bg-energy-bright text-pearl font-semibold px-12 sm:px-16 py-6 sm:py-8 text-lg sm:text-xl rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-energy/20">
                  <span className="flex items-center justify-center">
                    Experience NESS
                    <Suspense fallback={<span className="ml-3 w-5 h-5 sm:w-6 sm:h-6" />}>
                      <ArrowRight className="ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" />
                    </Suspense>
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* 2. ONE KEY DIFFERENTIATOR - Emotional Impact */}
      <section 
        ref={nextSectionRef} 
        className="py-32 sm:py-40 md:py-48 px-4 sm:px-6 bg-pearl scroll-mt-16"
        aria-labelledby="key-benefit-heading"
      >
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h2 
            id="key-benefit-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light text-graphite mb-8 tracking-tight leading-[1.1]"
          >
            One decision.<br />
            Ten years.<br />
            <span className="text-graphite/40">Zero regrets.</span>
          </h2>
        </div>
      </section>

      {/* 3. PRODUCT SPOTLIGHT - NESS Powerwall - Mobile Optimized */}
      <LazySection rootMargin="400px" fallback={<ProductSectionSkeleton isDark />}>
        <section 
          className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-graphite to-graphite/90 text-pearl"
          aria-labelledby="residential-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
              <div>
                <p className="text-energy text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">For Homeowners</p>
                <h2 
                  id="residential-heading"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 sm:mb-6 tracking-tight"
                >
                  NESS Powerwall
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-pearl/80 mb-8 sm:mb-12 leading-[1.7] font-light">
                  Elegant. Powerful. Silent.
                </p>
                
                <div className="space-y-4 sm:space-y-6 mb-10 sm:mb-14">
                  <Suspense fallback={<div className="h-20" />}>
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-energy flex-shrink-0 mt-1" aria-hidden="true" />
                      <div>
                        <p className="font-medium text-lg sm:text-xl">Everything. Everywhere.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-energy flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-lg sm:text-xl">10ms switchover</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-energy flex-shrink-0 mt-1" aria-hidden="true" />
                      <div>
                        <p className="font-medium text-lg sm:text-xl">Works with solar</p>
                      </div>
                    </div>
                  </Suspense>
                </div>

                <div>
                  <Link to="/residential">
                    <Button size="lg" className="bg-energy hover:bg-energy-bright text-pearl px-10 sm:px-12 py-6 sm:py-7 text-lg sm:text-xl rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-energy/30">
                      Experience NESS
                      <Suspense fallback={<span className="ml-2 w-5 h-5" />}>
                        <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                      </Suspense>
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative mt-8 md:mt-0">
                <WebPImage src={nessProProduct} alt="NESS Powerwall - Premium home battery backup system" className="w-full h-auto rounded-2xl" priority={false} />
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* 4. PRODUCT SPOTLIGHT - NESS Pod */}
      <LazySection rootMargin="400px" fallback={<ProductSectionSkeleton />}>
        <section 
          className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-pearl text-graphite"
          aria-labelledby="commercial-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
              <div className="relative order-2 md:order-1">
                <WebPImage 
                  src={nessPodProduct} 
                  alt="NESS Pod - Commercial battery backup system" 
                  className="w-full h-auto rounded-2xl" 
                  priority={false} 
                />
              </div>

              <div className="order-1 md:order-2">
                <p className="text-energy text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">For Business</p>
                <h2 
                  id="commercial-heading"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 sm:mb-6 tracking-tight"
                >
                  NESS Pod
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-graphite/80 mb-8 sm:mb-12 leading-[1.7] font-light">
                  Power your business. Uninterrupted.
                </p>
                
                <div className="space-y-4 sm:space-y-6 mb-10 sm:mb-14">
                  <Suspense fallback={<div className="h-20" />}>
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-energy flex-shrink-0 mt-1" aria-hidden="true" />
                      <div>
                        <p className="font-medium text-lg sm:text-xl">Scalable capacity</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-energy flex-shrink-0 mt-1" aria-hidden="true" />
                      <div>
                        <p className="font-medium text-lg sm:text-xl">Industrial-grade reliability</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-energy flex-shrink-0 mt-1" aria-hidden="true" />
                      <div>
                        <p className="font-medium text-lg sm:text-xl">Reduce operating costs</p>
                      </div>
                    </div>
                  </Suspense>
                </div>

                <div>
                  <Link to="/commercial">
                    <Button size="lg" className="bg-energy hover:bg-energy-bright text-pearl px-10 sm:px-12 py-6 sm:py-7 text-lg sm:text-xl rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-energy/30">
                      Explore Solutions
                      <Suspense fallback={<span className="ml-2 w-5 h-5" />}>
                        <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                      </Suspense>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* 5. SOCIAL PROOF - One Powerful Story */}
      <LazySection>
        <section 
          className="py-32 sm:py-40 md:py-48 bg-charcoal"
          aria-labelledby="testimonials-heading"
        >
          <div className="max-w-5xl mx-auto px-6 sm:px-8">
            <div className="flex flex-col items-center text-center space-y-12 sm:space-y-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-energy/10 flex items-center justify-center text-2xl sm:text-3xl font-light text-pearl border-2 border-energy/30">
                {testimonials[0].initials}
              </div>

              <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-pearl leading-[1.4] max-w-4xl">
                {testimonials[0].quote}
              </blockquote>

              <div className="pt-4">
                <p className="text-xl sm:text-2xl text-pearl font-medium mb-2">{testimonials[0].name}</p>
                <p className="text-base sm:text-lg text-pearl/60 font-light">{testimonials[0].location}</p>
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* 6. BELOW FOLD CONTENT - Lazy Loaded */}
      <Suspense fallback={
        <div className="py-32 flex items-center justify-center">
          <LoadingSpinner size="lg" label="Loading content..." />
        </div>
      }>
        <BelowFoldSections />
      </Suspense>

      {/* 7. CONFIGURATOR - Lazy Loaded */}
      <Suspense fallback={
        <div className="py-32 flex items-center justify-center bg-muted/10">
          <div className="text-center space-y-4">
            <LoadingSpinner size="lg" label="Loading configurator..." />
            <p className="text-sm text-muted-foreground">Preparing your system designer...</p>
          </div>
        </div>
      }>
        <HomeownerConfigurator />
      </Suspense>
    </Layout>;
};
export default memo(Index);
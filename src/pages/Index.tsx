import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LazySection } from "@/components/ui/lazy-section";
import { WebPImage } from "@/components/ui/webp-image";
import { ProductSectionSkeleton } from "@/components/ui/product-section-skeleton";
import { cn } from "@/lib/utils";
import nessHeroProduct from "@/assets/ness-hero-product.webp";
import nessPodProduct from "@/assets/ness-pod-hero-new.webp";
import nessProProduct from "@/assets-webp/ness-pro-product.webp";
import { useState, useEffect, useRef, memo, lazy, Suspense } from "react";
import { CheckCircle2, ArrowRight, Star, Shield, MapPin } from "lucide-react";
import { testimonials } from "@/data/testimonials";

// Lazy load heavy components to reduce initial bundle
const BelowFoldSections = lazy(() =>
  import("@/components/homeowner/BelowFoldSections").then((m) => ({
    default: m.BelowFoldSections,
  })),
);
const HomeownerConfigurator = lazy(() =>
  import("@/components/homeowner/HomeownerConfigurator").then((m) => ({
    default: m.HomeownerConfigurator,
  })),
);

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const nextSectionRef = useRef<HTMLElement>(null);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout className="-mt-16">
      {/* 1. HERO SECTION — No parallax, no text shadows, reduced overlay */}
      <section className="relative min-h-[100svh] w-full overflow-hidden" aria-labelledby="hero-heading">
        {/* Full-screen Product Image Background */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={nessHeroProduct}
            alt="NESS home battery — reliable backup power for modern Indian homes"
            className="w-full h-full object-cover object-center"
            loading="eager"
            width={1920}
            height={1080}
            fetchPriority="high"
          />
          {/* Reduced overlay — let the product breathe */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/30 via-40% to-transparent" />
        </div>

        {/* Text Content — static, confident, no parallax */}
        <div className="relative z-10 min-h-[100svh] flex items-center max-w-[1600px] mx-auto px-4 sm:px-8 md:px-16 py-20 sm:py-0">
          <div className="space-y-10 sm:space-y-14 md:space-y-16 max-w-3xl w-full">
            {/* Headline */}
            <h1
              id="hero-heading"
              className={cn(
                "font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[88px] font-light leading-[1.1] sm:leading-[1.15] tracking-[-0.02em] text-pearl transition-all duration-1000 ease-out",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              )}
            >
              Life.
              <br />
              <span className="text-energy">Uninterrupted.</span>
            </h1>

            {/* Sub-copy — elevates, doesn't remind of pain */}
            <p
              className={cn(
                "font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-[1.35] tracking-[-0.015em] max-w-[850px] text-pearl/90 transition-all duration-1000 ease-out delay-150",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              )}
            >
              The home battery. Reimagined.
            </p>

            {/* Dual CTAs — capture different intent stages */}
            <div
              className={cn(
                "pt-4 sm:pt-6 flex flex-col sm:flex-row items-start gap-4 transition-all duration-1000 ease-out delay-300",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              )}
            >
              <Link to="/residential" className="inline-block group">
                <Button
                  size="lg"
                  className="interactive font-sans bg-pearl hover:bg-white text-charcoal font-semibold px-8 py-4 sm:px-12 sm:py-6 text-base sm:text-lg rounded-full transition-all duration-300 shadow-2xl hover:shadow-[0_20px_60px_rgba(255,255,255,0.3)]"
                >
                  <span className="flex items-center justify-center">
                    Explore NESS
                    <ArrowRight className="ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </Button>
              </Link>
              <Link to="/contact/homeowner" className="inline-block group">
                <Button
                  size="lg"
                  className="interactive font-sans bg-transparent border border-pearl/40 hover:border-pearl text-pearl hover:bg-pearl/10 font-medium px-8 py-4 sm:px-10 sm:py-6 text-base sm:text-lg rounded-full transition-all duration-300"
                >
                  Talk to an Expert
                </Button>
              </Link>
            </div>

            {/* Product context — subtle identification */}
            <p
              className={cn(
                "text-pearl/40 text-xs sm:text-sm font-light tracking-widest uppercase mt-8 transition-all duration-1000 ease-out delay-500",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              )}
            >
              The NESS Powerwall — Home Battery System
            </p>
          </div>
        </div>
      </section>

      {/* TRUST BAR — compact social proof between hero and content */}
      <section className="py-6 sm:py-8 bg-charcoal border-t border-pearl/5" aria-label="Trust indicators">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-14 text-pearl/50 text-xs sm:text-sm font-light tracking-wide">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-energy fill-energy" aria-hidden="true" />
              <span>4.9/5 from 500+ homes</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-energy" aria-hidden="true" />
              <span>IEC 62619 Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-energy" aria-hidden="true" />
              <span>Engineered for India</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ONE KEY DIFFERENTIATOR — consistent font-light weight, tighter mobile spacing */}
      <section
        ref={nextSectionRef}
        className="py-24 md:py-32 lg:py-48 px-4 sm:px-6 bg-pearl scroll-mt-16 texture-overlay"
        aria-labelledby="key-benefit-heading"
      >
        <div className="max-w-5xl mx-auto text-center space-y-12 sm:space-y-16">
          <h2
            id="key-benefit-heading"
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-graphite tracking-[-0.03em] leading-[1.15] sm:leading-[1.2]"
          >
            <span className="block">One decision.</span>
            <span className="block mt-2 sm:mt-4">Ten years.</span>
            <span className="block mt-2 sm:mt-4 text-energy">Zero regrets.</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-graphite/50 font-light max-w-2xl mx-auto leading-[1.8] tracking-wide">
            Every NESS system comes with a comprehensive 10-year warranty.
            <span className="block mt-4 text-graphite/70 font-normal">
              One investment. A decade of peace of mind.
            </span>
          </p>
        </div>
      </section>

      {/* 3. PRODUCT SPOTLIGHT — NESS Powerwall */}
      <LazySection rootMargin="400px" fallback={<ProductSectionSkeleton isDark />}>
        <section
          className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-graphite to-graphite/90 text-pearl texture-overlay"
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
                  <div className="flex items-start gap-4">
                    <CheckCircle2
                      className="w-6 h-6 sm:w-7 sm:h-7 text-energy flex-shrink-0 mt-1"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-medium text-lg sm:text-xl">Everything. Everywhere.</p>
                      <p className="text-pearl/60 text-sm sm:text-base mt-1">Powers your entire home</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-energy flex-shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-lg sm:text-xl">10ms switchover</p>
                      <p className="text-pearl/60 text-sm sm:text-base mt-1">Instant backup (10ms response)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2
                      className="w-6 h-6 sm:w-7 sm:h-7 text-energy flex-shrink-0 mt-1"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-medium text-lg sm:text-xl">Works with solar</p>
                    </div>
                  </div>
                </div>

                <div>
                  <Link to="/residential">
                    <Button
                      size="lg"
                      className="interactive bg-energy hover:bg-energy-bright text-pearl px-10 sm:px-12 py-6 sm:py-7 text-lg sm:text-xl rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-energy/30"
                    >
                      Explore NESS
                      <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative mt-8 md:mt-0">
                <WebPImage
                  src={nessProProduct}
                  alt="NESS Powerwall - Premium home battery backup system"
                  className="w-full h-auto rounded-2xl"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* 4. SOCIAL PROOF — Customer Stories */}
      <LazySection>
        <section className="py-24 sm:py-32 md:py-40 bg-charcoal texture-overlay" aria-labelledby="testimonials-heading">
          <div className="max-w-6xl mx-auto px-6 sm:px-8">
            {/* Section header */}
            <p className="text-energy text-xs sm:text-sm uppercase tracking-widest text-center mb-16 sm:mb-20">
              From our customers
            </p>

            {/* Featured testimonial — hero-sized */}
            <div className="flex flex-col items-center text-center space-y-10 sm:space-y-12 mb-20 sm:mb-24">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-energy/10 flex items-center justify-center text-2xl sm:text-3xl font-light text-pearl border-2 border-energy/30">
                {testimonials[0].initials}
              </div>

              <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-pearl leading-[1.4] max-w-4xl">
                {testimonials[0].quote}
              </blockquote>

              <div className="pt-2">
                <p className="text-xl sm:text-2xl text-pearl font-medium mb-2">{testimonials[0].name}</p>
                <p className="text-base sm:text-lg text-pearl/60 font-light">{testimonials[0].location}</p>
              </div>
            </div>

            {/* Supporting testimonials — staggered grid */}
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              {testimonials.slice(1).map((t) => (
                <div
                  key={t.name}
                  className="bg-pearl/[0.03] border border-pearl/10 rounded-2xl p-8 sm:p-10 space-y-6 hover:bg-pearl/[0.06] transition-colors duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-energy/10 flex items-center justify-center text-base font-light text-pearl border border-energy/20">
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-pearl font-medium">{t.name}</p>
                      <p className="text-pearl/50 text-sm font-light">{t.location}</p>
                    </div>
                  </div>
                  <blockquote className="text-lg sm:text-xl text-pearl/80 font-light leading-relaxed">
                    "{t.quote}"
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </section>
      </LazySection>

      {/* 5. PRODUCT SPOTLIGHT — NESS Pod */}
      <LazySection rootMargin="400px" fallback={<ProductSectionSkeleton />}>
        <section
          className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-br from-slate-50 via-pearl to-slate-100 text-graphite texture-overlay relative overflow-hidden"
          aria-labelledby="commercial-heading"
        >
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} aria-hidden="true" />
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
                  <div className="flex items-start gap-4">
                    <CheckCircle2
                      className="w-6 h-6 sm:w-7 sm:h-7 text-energy flex-shrink-0 mt-1"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-medium text-lg sm:text-xl">Scalable capacity</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2
                      className="w-6 h-6 sm:w-7 sm:h-7 text-energy flex-shrink-0 mt-1"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-medium text-lg sm:text-xl">Industrial-grade reliability</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2
                      className="w-6 h-6 sm:w-7 sm:h-7 text-energy flex-shrink-0 mt-1"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-medium text-lg sm:text-xl">Reduce operating costs</p>
                    </div>
                  </div>
                </div>

                <div>
                  <Link to="/commercial">
                    <Button
                      size="lg"
                      className="interactive bg-energy hover:bg-energy-bright text-pearl px-10 sm:px-12 py-6 sm:py-7 text-lg sm:text-xl rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-energy/30"
                    >
                      Explore Solutions
                      <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* 6. BELOW FOLD CONTENT */}
      <Suspense
        fallback={
          <div className="py-24 bg-pearl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="space-y-4 mb-12 animate-pulse">
                <div className="h-8 bg-graphite/10 rounded w-1/3 mx-auto" />
                <div className="h-6 bg-graphite/10 rounded w-2/3 mx-auto" />
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-64 bg-graphite/10 rounded-2xl mb-4" />
                    <div className="h-6 bg-graphite/10 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-graphite/10 rounded w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      >
        <BelowFoldSections />
      </Suspense>

      {/* 7. CONFIGURATOR */}
      <Suspense
        fallback={
          <div className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="space-y-4 mb-12 animate-pulse">
                <div className="h-10 bg-muted rounded w-1/2 mx-auto" />
                <div className="h-6 bg-muted rounded w-3/4 mx-auto" />
              </div>
              <div className="space-y-6">
                <div className="h-32 bg-muted rounded-xl animate-pulse" />
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-24 bg-muted rounded-lg animate-pulse" />
                  ))}
                </div>
                <div className="h-48 bg-muted rounded-xl animate-pulse" />
              </div>
            </div>
          </div>
        }
      >
        <HomeownerConfigurator />
      </Suspense>
    </Layout>
  );
};
export default memo(Index);

import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { LazySection } from "@/components/ui/lazy-section";
import { WebPImage } from "@/components/ui/webp-image";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { ProductSectionSkeleton } from "@/components/ui/product-section-skeleton";
import { cn } from "@/lib/utils";
import nessHeroProduct from "@/assets/ness-hero-product.webp";
import nessPodProduct from "@/assets/ness-pod-hero-new.webp";
import nessProProduct from "@/assets-webp/ness-pro-product.webp";
import { useState, useEffect, lazy, Suspense, useRef, memo } from "react";
import { useThrottle } from "@/hooks/use-performance";

// Lazy load heavy components to reduce initial bundle
const BelowFoldSections = lazy(() => import("@/components/homeowner/BelowFoldSections").then(m => ({
  default: m.BelowFoldSections
})));
const HomeownerConfigurator = lazy(() => import("@/components/homeowner/HomeownerConfigurator").then(m => ({
  default: m.HomeownerConfigurator
})));
const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const nextSectionRef = useRef<HTMLElement>(null);

  // Testimonial auto-rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll to next section
  const scrollToNext = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return <Layout>
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[600px] sm:min-h-screen w-full overflow-hidden">
        {/* Full-screen Product Image Background */}
        <div className="absolute inset-0 w-full h-full">
          {/* Optimized ambient glow - CSS only */}
          <div className="absolute inset-0 hidden sm:block hero-glow" />

          {/* Product Image - With breathing animation */}
          <div className="absolute inset-0 w-full h-full hero-image product-breathe">
            <ResponsiveImage 
              src={nessHeroProduct} 
              alt="NESS home battery — reliable backup power for modern Indian homes" 
              className="w-full h-full object-cover object-center" 
              priority={true} 
              loading="eager"
              width={1920}
              height={1080}
              sizes="100vw"
              fetchPriority="high"
            />
          </div>

          {/* Darker, premium gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        {/* Text Content Overlaid - Simplified Jobs-style */}
        <div className="relative z-10 min-h-[600px] sm:h-screen flex items-center max-w-[1600px] mx-auto px-4 sm:px-8 md:px-16 py-20 sm:py-0 will-change-transform" style={{
        transform: `translate3d(0, ${scrollY * 0.15}px, 0)`
      }}>
          <div className="space-y-10 sm:space-y-14 md:space-y-16 max-w-3xl w-full">
            {/* Headline - Jobs-style: Massive spacing, minimal words */}
            <h1 className={cn("font-display text-4xl sm:text-[56px] md:text-[72px] lg:text-[96px] font-bold leading-[1.5] sm:leading-[1.6] tracking-[-0.02em] text-white transition-all duration-1000 ease-out", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
              Life.
              <br />
              <span style={{ 
                color: '#00C853',
                textShadow: '0 0 30px rgba(0, 200, 83, 0.6), 0 0 60px rgba(0, 200, 83, 0.4)'
              }}>Uninterrupted.</span>
            </h1>
            
            {/* Subtext - Cut by 70%, one powerful line */}
            <p className={cn("font-sans text-xl sm:text-[24px] md:text-[28px] font-light leading-[1.6] tracking-[-0.015em] max-w-[600px] transition-all duration-1000 ease-out delay-150", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")} style={{
            color: '#E5E7EB'
          }}>
              The intelligent home battery that keeps your life running.
            </p>

            {/* CTA - Benefit-focused, no subtext clutter */}
            <div className={cn("pt-4 sm:pt-6 transition-all duration-1000 ease-out delay-300", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
              <Link to="/residential" className="inline-block group">
                <Button size="lg" className="relative font-sans bg-[#00C853] hover:bg-[#00E676] text-white font-semibold px-12 sm:px-16 py-6 sm:py-8 text-lg sm:text-xl rounded-2xl shadow-[0_0_40px_rgba(0,200,83,0.4)] hover:shadow-[0_0_60px_rgba(0,230,118,0.7)] transition-all duration-500 overflow-hidden" style={{
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
              }}>
                  <span className="relative z-10 flex items-center justify-center">
                    Never Worry About Power Again
                    <ArrowRight className="ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#00E676] to-[#00C853] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator with interaction */}
        <button onClick={scrollToNext} className={cn("absolute bottom-8 left-1/2 -translate-x-1/2 group cursor-pointer transition-all duration-700 ease-out hover:bottom-6", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")} aria-label="Scroll to next section">
          <div className="relative">
            <div className="w-8 h-12 border-2 border-white/30 rounded-full flex items-start justify-center p-2 group-hover:border-energy/50 transition-colors duration-300">
              <div className="w-1.5 h-3 bg-white/50 rounded-full motion-safe:animate-bounce group-hover:bg-energy/80 transition-colors duration-300" />
            </div>
            <ChevronDown className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-5 h-5 text-white/30 group-hover:text-energy/50 motion-safe:animate-bounce transition-colors duration-300" aria-hidden="true" />
          </div>
        </button>
      </section>

      {/* 2. ONE KEY DIFFERENTIATOR - Mobile Optimized */}
      <section ref={nextSectionRef} className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-white scroll-mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light text-graphite mb-4 sm:mb-6 md:mb-8 tracking-tight">
            Lasts 10+ years.
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-graphite/60 font-light leading-relaxed px-4">While others need replacement every 5 years, NESS is engineered to endure. One investment. A decade of reliability. Zero maintenance.</p>
        </div>
      </section>

      {/* 3. PRODUCT SPOTLIGHT - NESS Powerwall - Mobile Optimized */}
      <LazySection rootMargin="400px" fallback={<ProductSectionSkeleton isDark />}>
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-graphite to-graphite/90 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
              <div>
                <p className="text-energy text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">For Homeowners</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 sm:mb-6 tracking-tight">
                  NESS Powerwall
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 leading-relaxed font-light">
                  Elegant. Powerful. Silent. Everything your home needs, nothing it doesn't.
                </p>
                
                <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-energy flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-base sm:text-lg">Powers your entire home</p>
                      <p className="text-sm sm:text-base text-white/60 font-light">From AC to refrigerator, run everything simultaneously</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-energy flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-base sm:text-lg">Instant backup</p>
                      <p className="text-sm sm:text-base text-white/60 font-light">10ms switchover—WiFi stays connected, work never stops</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-energy flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-base sm:text-lg">Solar ready</p>
                      <p className="text-sm sm:text-base text-white/60 font-light">Seamless integration with any solar system</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link to="/residential" className="w-full sm:w-auto">
                    <Button size="lg" className="bg-energy hover:bg-energy-glow text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-full shadow-glow hover:shadow-[0_0_40px_rgba(0,200,83,0.4)] transition-all duration-500 w-full sm:w-auto">
                      Design My System
                      <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                  </Link>
                  <Link to="/residential" className="w-full sm:w-auto">
                    
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

      {/* 3B. C&I PRODUCT SPOTLIGHT - NESS Pod - Mobile Optimized */}
      <LazySection rootMargin="400px" fallback={<ProductSectionSkeleton />}>
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
              <div className="relative order-2 md:order-1 mt-8 md:mt-0">
                <WebPImage src={nessPodProduct} alt="NESS Pod - Commercial & Industrial battery backup system" className="w-full h-auto rounded-2xl" priority={false} />
              </div>

              <div className="order-1 md:order-2">
                <p className="text-energy text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">For Business</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-graphite mb-4 sm:mb-6 tracking-tight">
                  NESS Pod
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-graphite/70 mb-6 sm:mb-8 leading-relaxed font-light">
                  When downtime isn't an option. Built for businesses that can't afford to stop.
                </p>
                
                <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-energy flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-base sm:text-lg text-graphite">Scalable power</p>
                      <p className="text-sm sm:text-base text-graphite/60 font-light">45-200 kWh systems for commercial needs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-energy flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-base sm:text-lg text-graphite">Cut diesel costs</p>
                      <p className="text-sm sm:text-base text-graphite/60 font-light">Reduce dependency by 80%</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-energy flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-base sm:text-lg text-graphite">Remote monitoring</p>
                      <p className="text-sm sm:text-base text-graphite/60 font-light">Track performance from anywhere</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link to="/commercial" className="w-full sm:w-auto">
                    <Button size="lg" className="bg-energy hover:bg-energy-glow text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-full shadow-glow hover:shadow-[0_0_40px_rgba(0,200,83,0.4)] transition-all duration-500 w-full sm:w-auto">
                      Explore Commercial
                      <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                  </Link>
                  <Link to="/commercial" className="w-full sm:w-auto">
                    
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* 4. SOCIAL PROOF - Testimonials - Mobile Optimized */}
      <LazySection>
        <section className="py-16 sm:py-24 md:py-32 bg-charcoal">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-3 sm:mb-4 tracking-tight">
              Trusted by thousands
            </h2>
            <p className="text-white/60 text-base sm:text-lg font-light">
              across India
            </p>
          </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-8">
              <div className="relative min-h-[300px] sm:min-h-[350px] flex items-center justify-center">
                {testimonials.map(testimonial => {
              const testimonialIndex = testimonials.indexOf(testimonial);
              return <div key={`testimonial-${testimonialIndex}`} className={cn("absolute inset-0 transition-all duration-1000 ease-in-out will-change-transform", currentTestimonial === testimonialIndex ? "opacity-100 translate-x-0" : testimonialIndex < currentTestimonial ? "opacity-0 -translate-x-full pointer-events-none" : "opacity-0 translate-x-full pointer-events-none")}>
                  <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8 px-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-energy/10 flex items-center justify-center text-xl sm:text-2xl font-light text-white border-2 border-energy/30">
                      {testimonial.initials}
                    </div>

                    <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white leading-relaxed max-w-2xl">
                      {testimonial.quote}
                    </blockquote>

                    <div className="pt-2 sm:pt-4">
                      <p className="text-base sm:text-lg text-pearl font-medium">{testimonial.name}</p>
                      <p className="text-xs sm:text-sm text-pearl/60 font-light">{testimonial.location}</p>
                    </div>
                    </div>
                  </div>;
            })}

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
                  {testimonials.map((_, dotIndex) => <button key={`dot-${dotIndex}`} onClick={() => setCurrentTestimonial(dotIndex)} className={cn("w-2 h-2 rounded-full transition-all duration-500", currentTestimonial === dotIndex ? "w-6 sm:w-8 bg-energy" : "bg-white/30 hover:bg-white/50")} aria-label={`View testimonial ${dotIndex + 1}`} />)}
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* 5. BELOW FOLD CONTENT - Lazy Loaded */}
      <Suspense fallback={<div className="py-32 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>}>
        <BelowFoldSections />
      </Suspense>

      {/* 6. CONFIGURATOR - Lazy Loaded */}
      <Suspense fallback={<div className="py-32 flex items-center justify-center bg-muted/10">
          <div className="text-center space-y-4">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-muted-foreground">Loading configurator...</p>
          </div>
        </div>}>
        <HomeownerConfigurator />
      </Suspense>
    </Layout>;
};

// Testimonials
const testimonials = [{
  initials: "MK",
  quote: "Two years. Not one reset. Not one worry.",
  name: "Dr. Mohan Krishna",
  location: "Bengaluru • Off-grid since 2022"
}, {
  initials: "RG",
  quote: "Our operations run smoother than ever. The grid is just backup now.",
  name: "Rajesh Gupta",
  location: "Delhi • EV Charging Hub"
}, {
  initials: "PS",
  quote: "The configurator made it simple. The installation was flawless.",
  name: "Priya Sharma",
  location: "Gurgaon • Villa Community"
}];
export default memo(Index);
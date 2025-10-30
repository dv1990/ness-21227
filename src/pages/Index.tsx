import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Battery, Clock, ArrowRight, Play, Users, CheckCircle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { LazySection } from "@/components/ui/lazy-section";
import { PerformanceImage } from "@/components/ui/performance-image";
import { cn } from "@/lib/utils";
import nessHeroProduct from "@/assets/ness-hero-product.webp";
import nessPodProduct from "@/assets/ness-pod-hero-new.webp";
import nessProProduct from "@/assets-webp/ness-pro-product.webp";
import { useState, useEffect, lazy, Suspense } from "react";

// Lazy load AnimatedCounter to reduce initial bundle
const AnimatedCounter = lazy(() => 
  import("@/components/ui/animated-counter").then(m => ({ default: m.AnimatedCounter }))
);

const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Testimonial auto-rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return <Layout>
      {/* 1. HERO SECTION */}
      <section 
        className="relative min-h-[600px] sm:min-h-screen w-full overflow-hidden"
      >
        {/* Full-screen Product Image Background */}
        <div 
          className="absolute inset-0 w-full h-full"
        >
          {/* Primary ambient glow - brighter and more vibrant */}
          <div
            className="absolute inset-0 hidden sm:flex items-center justify-center"
            style={{ opacity: 0.7 }}
          >
            <div
              className="w-full h-full"
              style={{
                background: 'radial-gradient(ellipse at 65% 50%, #00FF88 0%, #00E676 12%, #00C853 25%, rgba(0,200,83,0.5) 45%, transparent 60%)',
                filter: 'blur(70px)'
              }}
            />
          </div>

          {/* Strong spotlight on product area */}
          <div
            className="absolute inset-0 hidden sm:block"
            style={{ opacity: 0.6 }}
          >
            <div
              className="absolute"
              style={{
                top: '15%',
                right: '5%',
                width: '55%',
                height: '70%',
                background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 40%, transparent 65%)',
                filter: 'blur(50px)'
              }}
            />
          </div>

          {/* Edge lighting effect on right side */}
          <div
            className="absolute inset-0 hidden sm:block"
            style={{ opacity: 0.5 }}
          >
            <div
              className="absolute"
              style={{
                top: '25%',
                right: '0%',
                width: '35%',
                height: '50%',
                background: 'linear-gradient(to left, rgba(0,230,118,0.3) 0%, rgba(0,200,83,0.2) 30%, transparent 60%)',
                filter: 'blur(40px)'
              }}
            />
          </div>

          {/* Product Image - Full Screen with maximum clarity and brightness */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{ filter: 'contrast(1.2) saturate(1.35) brightness(1.2)' }}
          >
            <PerformanceImage
              src={nessHeroProduct}
              alt="NESS home battery — reliable backup power for modern Indian homes"
              className="w-full h-full object-cover object-center"
              priority={true}
            />
          </div>

          {/* Minimal gradient overlay - much lighter on right side */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, #0B1220cc 0%, #0B122099 50%, #0B1220cc 100%), linear-gradient(110deg, #0B1220f5 0%, #0B1220cc 18%, #0B122066 38%, #1C1F2608 55%, transparent 70%)'
            }}
          />
        </div>

        {/* Text Content Overlaid - Mobile Optimized */}
        <div className="relative z-10 min-h-[600px] sm:h-screen flex items-center max-w-[1600px] mx-auto px-4 sm:px-8 md:px-16 py-20 sm:py-0">
          <div 
            className="space-y-6 sm:space-y-8 md:space-y-10 max-w-2xl w-full"
          >
            {/* Headline with colored highlights - Mobile optimized */}
            <h1 
              className="font-display text-3xl sm:text-[42px] md:text-[56px] lg:text-[72px] font-bold leading-[1.1] sm:leading-[1.05] tracking-[0.02em] text-white"
            >
              When the grid goes <span className="inline-block" style={{ color: '#00C853' }}>dark,</span> your life stays <span style={{ color: '#00C853' }}>lit.</span>
            </h1>
            
            {/* Subtext - Mobile optimized */}
            <p 
              className="font-sans text-base sm:text-[18px] font-normal leading-[1.5] sm:leading-[1.4] tracking-[-0.011em] max-w-[440px]"
              style={{ color: '#E5E7EB' }}
            >
              Meet NESS — the intelligent home battery that keeps your home bright, connected, and alive.
              <span className="hidden sm:inline">
                <br />
                Clean energy. Seamlessly delivered. Beautifully lit.
              </span>
            </p>

            {/* CTA - Mobile optimized */}
            <div 
              className="pt-2 sm:pt-4 space-y-3 sm:space-y-4"
            >
              <Link to="/residential" className="inline-block w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="font-sans bg-[#00C853] hover:bg-[#00E676] text-white font-semibold px-8 sm:px-10 py-5 sm:py-7 text-base sm:text-lg rounded-xl shadow-[0_0_30px_rgba(0,200,83,0.3)] hover:shadow-[0_0_44px_rgba(0,230,118,0.5)] transition-all duration-300 w-full sm:w-auto"
                  style={{
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  Design My System →
                </Button>
              </Link>
              
              {/* CTA Subtext */}
              <p
                className="font-sans text-xs sm:text-[14px] font-normal tracking-[0.005em]"
                style={{ color: '#A1A1AA' }}
              >
                Find your perfect setup in under 30 seconds.
              </p>
            </div>

            {/* Footer Tagline */}
            <p
              className="font-sans text-xs sm:text-[14px] font-normal tracking-[0.01em]"
              style={{ color: '#9CA3AF' }}
            >
              Engineered in India for homes that never pause.
            </p>
          </div>
        </div>
      </section>

      {/* 2. ONE KEY DIFFERENTIATOR - Mobile Optimized */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light text-graphite mb-4 sm:mb-6 md:mb-8 tracking-tight">
            Lasts 10+ years.
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-graphite/60 font-light leading-relaxed px-4">
            While others need replacement every 2 years, NESS is engineered to endure. 
            One investment. A decade of reliability. Zero maintenance.
          </p>
        </div>
      </section>

      {/* 3. PRODUCT SPOTLIGHT - NESS Powerwall - Mobile Optimized */}
      <LazySection>
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
                    <Button variant="outline" size="lg" className="border-2 border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-full w-full sm:w-auto">
                      View All Models
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative mt-8 md:mt-0">
                <PerformanceImage
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

      {/* 3B. C&I PRODUCT SPOTLIGHT - NESS Pod - Mobile Optimized */}
      <LazySection>
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
              <div className="relative order-2 md:order-1 mt-8 md:mt-0">
                <PerformanceImage
                  src={nessPodProduct}
                  alt="NESS Pod - Commercial & Industrial battery backup system"
                  className="w-full h-auto rounded-2xl"
                  priority={false}
                />
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
                      <p className="text-sm sm:text-base text-graphite/60 font-light">20-50 kWh systems for commercial needs</p>
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
                    <Button variant="outline" size="lg" className="border-2 border-graphite/30 text-graphite hover:bg-graphite/5 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-full w-full sm:w-auto">
                      Get a Quote
                    </Button>
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
                {testimonials.map((testimonial) => {
                  const testimonialIndex = testimonials.indexOf(testimonial);
                  return (
                  <div 
                    key={`testimonial-${testimonialIndex}`}
                  className={cn(
                    "absolute inset-0 transition-all duration-1000 ease-in-out will-change-transform",
                    currentTestimonial === testimonialIndex 
                      ? "opacity-100 translate-x-0" 
                      : testimonialIndex < currentTestimonial 
                        ? "opacity-0 -translate-x-full pointer-events-none" 
                        : "opacity-0 translate-x-full pointer-events-none"
                  )}
                >
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
                  </div>
                );
                })}

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
                  {testimonials.map((_, dotIndex) => (
                    <button 
                      key={`dot-${dotIndex}`}
                      onClick={() => setCurrentTestimonial(dotIndex)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-500",
                      currentTestimonial === dotIndex 
                        ? "w-6 sm:w-8 bg-energy" 
                        : "bg-white/30 hover:bg-white/50"
                    )}
                    aria-label={`View testimonial ${dotIndex + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* 5. FINAL CTA - Mobile Optimized */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-graphite text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 sm:mb-6 tracking-tight">
            Power that lasts.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 mb-8 sm:mb-12 font-light">
            Design your system in under 2 minutes.
          </p>

          <Link to="/residential" className="inline-block w-full sm:w-auto">
            <Button size="lg" className="bg-energy hover:bg-energy-glow text-white px-8 sm:px-12 py-5 sm:py-7 text-base sm:text-lg rounded-full shadow-glow hover:shadow-[0_0_50px_rgba(0,200,83,0.5)] transition-all duration-500 w-full sm:w-auto">
              Design My System
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>;
};

// Testimonials
const testimonials = [
  {
    initials: "MK",
    quote: "Two years. Not one reset. Not one worry.",
    name: "Dr. Mohan Krishna",
    location: "Bengaluru • Off-grid since 2022"
  },
  {
    initials: "RG",
    quote: "Our operations run smoother than ever. The grid is just backup now.",
    name: "Rajesh Gupta",
    location: "Delhi • EV Charging Hub"
  },
  {
    initials: "PS",
    quote: "The configurator made it simple. The installation was flawless.",
    name: "Priya Sharma",
    location: "Gurgaon • Villa Community"
  }
];

export default Index;

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
        className="relative min-h-screen w-full overflow-hidden"
      >
        {/* Full-screen Product Image Background */}
        <div 
          className="absolute inset-0 w-full h-full"
        >
          {/* Vibrant ambient glow behind product */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: 0.25 }}
          >
            <div
              className="w-full h-full"
              style={{
                background: 'radial-gradient(ellipse at 70% 50%, #00E676 0%, #00C853 20%, #00BFA5 40%, transparent 70%)',
                filter: 'blur(90px)'
              }}
            />
          </div>

          {/* Product Image - Full Screen with enhanced clarity */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{ filter: 'contrast(1.05) saturate(1.1)' }}
          >
            <PerformanceImage
              src={nessHeroProduct}
              alt="NESS home battery — reliable backup power for modern Indian homes"
              className="w-full h-full object-cover"
              priority={true}
            />
          </div>

          {/* Gradient overlay - minimal coverage on product side */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(110deg, #0B1220f5 0%, #0B1220dd 20%, #0B122088 40%, #1C1F2622 60%, transparent 80%)'
            }}
          />
        </div>

        {/* Text Content Overlaid */}
        <div className="relative z-10 h-screen flex items-center max-w-[1600px] mx-auto px-8 md:px-16">
          <div 
            className="space-y-8 md:space-y-10 max-w-2xl"
          >
            {/* Headline with colored highlights */}
            <h1 
              className="font-display text-[42px] md:text-[72px] font-bold leading-[1.05] tracking-[0.02em] text-white"
            >
              When the grid goes <span className="mr-[0.3em]" style={{ color: '#00C853' }}>dark</span>, your life stays <span style={{ color: '#00C853' }}>lit.</span>
            </h1>
            
            {/* Subtext */}
            <p 
              className="font-sans text-[18px] font-normal leading-[1.4] tracking-[-0.011em] max-w-[440px]"
              style={{ color: '#E5E7EB' }}
            >
              Meet NESS — the intelligent home battery that keeps your home bright, connected, and alive.
              <br />
              Clean energy. Seamlessly delivered. Beautifully lit.
            </p>

            {/* CTA */}
            <div 
              className="pt-4 space-y-4"
            >
              <Link to="/residential">
                <Button 
                  size="lg" 
                  className="font-sans bg-[#00C853] hover:bg-[#00E676] text-white font-semibold px-10 py-7 text-lg rounded-xl shadow-[0_0_30px_rgba(0,200,83,0.3)] hover:shadow-[0_0_44px_rgba(0,230,118,0.5)] transition-all duration-300"
                  style={{
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  Design My System →
                </Button>
              </Link>
              
              {/* CTA Subtext */}
              <p
                className="font-sans text-[14px] font-normal tracking-[0.005em]"
                style={{ color: '#A1A1AA' }}
              >
                Find your perfect setup in under 30 seconds.
              </p>
            </div>

            {/* Footer Tagline */}
            <p
              className="font-sans text-[14px] font-normal tracking-[0.01em]"
              style={{ color: '#9CA3AF' }}
            >
              Engineered in India for homes that never pause.
            </p>
          </div>
        </div>
      </section>

      {/* 2. ONE KEY DIFFERENTIATOR */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-light text-graphite mb-8 tracking-tight">
            Lasts 10+ years.
          </h2>
          <p className="text-xl md:text-2xl text-graphite/60 font-light leading-relaxed">
            While others need replacement every 2 years, NESS is engineered to endure. 
            One investment. A decade of reliability. Zero maintenance.
          </p>
        </div>
      </section>

      {/* 3. PRODUCT SPOTLIGHT - NESS Powerwall */}
      <LazySection>
        <section className="py-20 px-6 bg-gradient-to-b from-graphite to-graphite/90 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-energy text-sm uppercase tracking-widest mb-4">For Homeowners</p>
                <h2 className="text-5xl md:text-6xl font-light mb-6 tracking-tight">
                  NESS Powerwall
                </h2>
                <p className="text-xl text-white/80 mb-8 leading-relaxed font-light">
                  Elegant. Powerful. Silent. Everything your home needs, nothing it doesn't.
                </p>
                
                <div className="space-y-4 mb-10">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-energy flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-lg">Powers your entire home</p>
                      <p className="text-white/60 font-light">From AC to refrigerator, run everything simultaneously</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-energy flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-lg">Instant backup</p>
                      <p className="text-white/60 font-light">10ms switchover—WiFi stays connected, work never stops</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-energy flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-lg">Solar ready</p>
                      <p className="text-white/60 font-light">Seamless integration with any solar system</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/residential">
                    <Button size="lg" className="bg-energy hover:bg-energy-glow text-white px-8 py-6 text-lg rounded-full shadow-glow hover:shadow-[0_0_40px_rgba(0,200,83,0.4)] transition-all duration-500">
                      Design My System
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/residential">
                    <Button variant="outline" size="lg" className="border-2 border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 px-8 py-6 text-lg rounded-full">
                      View All Models
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative">
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

      {/* 3B. C&I PRODUCT SPOTLIGHT - NESS Pod */}
      <LazySection>
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative order-2 md:order-1">
                <PerformanceImage
                  src={nessPodProduct}
                  alt="NESS Pod - Commercial & Industrial battery backup system"
                  className="w-full h-auto rounded-2xl"
                  priority={false}
                />
              </div>

              <div className="order-1 md:order-2">
                <p className="text-energy text-sm uppercase tracking-widest mb-4">For Business</p>
                <h2 className="text-5xl md:text-6xl font-light text-graphite mb-6 tracking-tight">
                  NESS Pod
                </h2>
                <p className="text-xl text-graphite/70 mb-8 leading-relaxed font-light">
                  When downtime isn't an option. Built for businesses that can't afford to stop.
                </p>
                
                <div className="space-y-4 mb-10">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-energy flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-lg text-graphite">Scalable power</p>
                      <p className="text-graphite/60 font-light">20-50 kWh systems for commercial needs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-energy flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-lg text-graphite">Cut diesel costs</p>
                      <p className="text-graphite/60 font-light">Reduce dependency by 80%</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-energy flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-lg text-graphite">Remote monitoring</p>
                      <p className="text-graphite/60 font-light">Track performance from anywhere</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/commercial">
                    <Button size="lg" className="bg-energy hover:bg-energy-glow text-white px-8 py-6 text-lg rounded-full shadow-glow hover:shadow-[0_0_40px_rgba(0,200,83,0.4)] transition-all duration-500">
                      Explore Commercial
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/commercial">
                    <Button variant="outline" size="lg" className="border-2 border-graphite/30 text-graphite hover:bg-graphite/5 px-8 py-6 text-lg rounded-full">
                      Get a Quote
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* 4. SOCIAL PROOF - Testimonials */}
      <LazySection>
        <section className="py-32 bg-charcoal">
          <div className="max-w-4xl mx-auto px-8 text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-light text-white mb-4 tracking-tight">
              Trusted by thousands
            </h2>
            <p className="text-white/60 text-lg font-light">
              across India
            </p>
          </div>

            <div className="max-w-5xl mx-auto px-8">
              <div className="relative min-h-[350px] flex items-center justify-center">
                {testimonials.map((testimonial) => {
                  const testimonialIndex = testimonials.indexOf(testimonial);
                  return (
                  <div 
                    key={`testimonial-${testimonialIndex}`}
                  className={cn(
                    "absolute inset-0 transition-all duration-1000 ease-in-out",
                    currentTestimonial === testimonialIndex 
                      ? "opacity-100 translate-x-0" 
                      : testimonialIndex < currentTestimonial 
                        ? "opacity-0 -translate-x-full" 
                        : "opacity-0 translate-x-full"
                  )}
                >
                  <div className="flex flex-col items-center text-center space-y-8">
                    <div className="w-16 h-16 rounded-full bg-energy/10 flex items-center justify-center text-2xl font-light text-white border-2 border-energy/30">
                      {testimonial.initials}
                    </div>

                    <blockquote className="text-2xl md:text-3xl font-light text-white leading-relaxed max-w-2xl">
                      {testimonial.quote}
                    </blockquote>

                    <div className="pt-4">
                      <p className="text-lg text-pearl font-medium">{testimonial.name}</p>
                      <p className="text-sm text-pearl/60 font-light">{testimonial.location}</p>
                    </div>
                    </div>
                  </div>
                );
                })}

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-3">
                  {testimonials.map((_, dotIndex) => (
                    <button 
                      key={`dot-${dotIndex}`}
                      onClick={() => setCurrentTestimonial(dotIndex)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-500",
                      currentTestimonial === dotIndex 
                        ? "w-8 bg-energy" 
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

      {/* 5. FINAL CTA */}
      <section className="py-32 px-6 bg-graphite text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-light mb-6 tracking-tight">
            Power that lasts.
          </h2>
          <p className="text-xl text-white/70 mb-12 font-light">
            Design your system in under 2 minutes.
          </p>

          <Link to="/residential">
            <Button size="lg" className="bg-energy hover:bg-energy-glow text-white px-12 py-7 text-lg rounded-full shadow-glow hover:shadow-[0_0_50px_rgba(0,200,83,0.5)] transition-all duration-500">
              Design My System
              <ArrowRight className="ml-2 w-5 h-5" />
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

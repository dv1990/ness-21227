import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LazySection } from "@/components/ui/lazy-section";
import { WebPImage } from "@/components/ui/webp-image";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { ProductSectionSkeleton } from "@/components/ui/product-section-skeleton";
import { cn } from "@/lib/utils";
import heroHomeowners from "@/assets-webp/hero-homeowners.webp";
import heroHomeSolar from "@/assets/hero-home-solar.webp";
import homeownerHeroBattery from "@/assets/homeowner-hero-battery.webp";
import nessHeroProduct from "@/assets/ness-hero-product.webp";
import nessPodProduct from "@/assets/ness-pod-hero-new.webp";
import nessProProduct from "@/assets-webp/ness-pro-product.webp";
import { useState, useEffect, useRef, memo, lazy, Suspense } from "react";
import { testimonials } from "@/data/testimonials";

// Lazy load icons to reduce initial bundle size
const CheckCircle2 = lazy(() => import("lucide-react").then(m => ({
  default: m.CheckCircle2
})));
const ChevronDown = lazy(() => import("lucide-react").then(m => ({
  default: m.ChevronDown
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

// Panel configuration for Mary Wells-style hero
const panels = [
  {
    id: 1,
    bgImage: heroHomeowners,
    bgSpeed: 0.3,
    gradient: "from-charcoal/90 via-charcoal/80 to-charcoal/70",
    content: {
      main: "Life.",
      highlight: "Uninterrupted.",
      subtext: "Because your home shouldn't pause just because the grid does."
    }
  },
  {
    id: 2,
    bgImage: heroHomeSolar,
    bgSpeed: 0.25,
    gradient: "from-charcoal/70 via-charcoal/60 to-charcoal/50",
    content: {
      main: "You make the power.",
      highlight: "power",
      subtext: "Why depend on someone else to generate it? The sun gives it freely — but most homes let it slip away."
    }
  },
  {
    id: 3,
    bgImage: homeownerHeroBattery,
    bgSpeed: 0.35,
    gradient: "from-charcoal/75 via-charcoal/65 to-charcoal/55",
    content: {
      main: "Your energy. Stored. Ready. Yours.",
      highlight: "energy",
      highlight2: "power",
      subtext: "There's nothing more reassuring than storing the power you create."
    }
  },
  {
    id: 4,
    bgImage: nessHeroProduct,
    bgSpeed: 0.4,
    gradient: "from-charcoal/50 via-charcoal/40 to-transparent",
    content: {
      main: "Meet NESS,",
      highlight: "NESS",
      subtext: "Your partner in energy freedom. Elegantly storing the solar energy you'd otherwise lose — so your home stays bright, steady, and yours alone."
    }
  }
];

// Utility to apply brand green color to specific words
const applyBrandColor = (text: string, highlights: string[]) => {
  const words = text.split(' ');
  return words.map((word, i) => {
    const cleanWord = word.replace(/[.,]/g, '');
    const isBrand = highlights.includes(cleanWord);
    return (
      <span 
        key={i}
        className={isBrand ? 'text-energy' : ''}
        style={isBrand ? { textShadow: '0 0 20px hsl(var(--energy-core) / 0.3)' } : undefined}
      >
        {word}{' '}
      </span>
    );
  });
};

const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentPanel, setCurrentPanel] = useState(0);
  const [panelProgress, setPanelProgress] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const nextSectionRef = useRef<HTMLElement>(null);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Parallax scroll tracking with RAF for 60fps
  useEffect(() => {
    let rafId: number;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          const heroSection = heroRef.current;
          if (!heroSection) return;

          const rect = heroSection.getBoundingClientRect();
          const heroHeight = heroSection.offsetHeight;
          const viewportHeight = window.innerHeight;

          // Calculate scroll progress through hero (0-1)
          const scrolled = Math.max(0, -rect.top);
          const maxScroll = heroHeight - viewportHeight;
          const progress = Math.max(0, Math.min(1, scrolled / maxScroll));

          // Determine current panel (0-3)
          const panel = Math.min(Math.floor(progress * 4), 3);
          const panelProg = (progress * 4) % 1;

          setScrollProgress(progress);
          setCurrentPanel(panel);
          setPanelProgress(panelProg);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Calculate panel opacity for smooth transitions
  const calculatePanelOpacity = (panelIndex: number) => {
    const globalProgress = scrollProgress * 4;
    const distance = Math.abs(globalProgress - panelIndex);
    
    if (distance > 1) return 0;
    return 1 - distance;
  };

  // Smooth scroll to next section
  const scrollToNext = () => {
    nextSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <Layout>
      {/* Mary Wells Parallax Hero - 400vh total */}
      <section 
        ref={heroRef}
        className="relative h-[400vh] w-full"
        aria-label="Interactive story: Life with NESS battery"
      >
        {/* Sticky container for all panels */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {panels.map((panel, index) => {
            const opacity = calculatePanelOpacity(index);
            const isActive = currentPanel === index;
            
            return (
              <div
                key={panel.id}
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  opacity,
                  pointerEvents: isActive ? 'auto' : 'none',
                  willChange: 'opacity'
                }}
              >
                {/* Background Layer - slowest parallax */}
                <div 
                  className="absolute inset-0 will-change-transform"
                  style={{
                    transform: `translate3d(0, ${scrollProgress * panel.bgSpeed * 100}px, 0)`,
                  }}
                >
                  <WebPImage
                    src={panel.bgImage}
                    alt={`Panel ${panel.id} background`}
                    className="w-full h-full object-cover scale-110"
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "low"}
                  />
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-b",
                    panel.gradient
                  )} />
                </div>

                {/* Text Content Layer - medium parallax */}
                <div 
                  className="relative z-10 h-full flex items-center justify-center will-change-transform"
                  style={{
                    transform: `translate3d(0, ${scrollProgress * 0.6 * 100}px, 0)`,
                  }}
                >
                  <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
                    {/* Panel-specific content */}
                    {index === 0 && (
                      <div className="space-y-6 animate-fade-up">
                        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-tight">
                          <span className="block text-pearl mb-2">Life.</span>
                          <span 
                            className="block text-energy"
                            style={{ 
                              textShadow: '0 0 40px hsl(var(--energy-core) / 0.4)',
                              animation: 'fade-up 0.8s ease-out 0.3s both'
                            }}
                          >
                            Uninterrupted.
                          </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-pearl/80 font-light max-w-3xl mx-auto">
                          Because your home shouldn't pause just because the grid does.
                        </p>
                      </div>
                    )}

                    {index === 1 && (
                      <div className="space-y-6 animate-fade-up">
                        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-pearl">
                          {applyBrandColor("You make the power.", ["power"])}
                        </h2>
                        <p className="text-xl md:text-2xl text-pearl/80 font-light max-w-3xl mx-auto">
                          Why depend on someone else to generate it? The sun gives it freely — but most homes let it slip away.
                        </p>
                      </div>
                    )}

                    {index === 2 && (
                      <div className="space-y-6">
                        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-pearl space-y-2">
                          <span className="block animate-fade-up" style={{ animationDelay: '0ms' }}>
                            {applyBrandColor("Your energy.", ["energy"])}
                          </span>
                          <span className="block animate-fade-up" style={{ animationDelay: '200ms' }}>
                            Stored.
                          </span>
                          <span className="block animate-fade-up" style={{ animationDelay: '400ms' }}>
                            Ready.
                          </span>
                          <span className="block animate-fade-up" style={{ animationDelay: '600ms' }}>
                            Yours.
                          </span>
                        </h2>
                        <p className="text-xl md:text-2xl text-pearl/80 font-light max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: '800ms' }}>
                          {applyBrandColor("There's nothing more reassuring than storing the power you create.", ["power"])}
                        </p>
                      </div>
                    )}

                    {index === 3 && (
                      <div className="space-y-8 animate-fade-up">
                        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-pearl">
                          Meet {applyBrandColor("NESS,", ["NESS"])}
                        </h2>
                        <p className="text-xl md:text-2xl text-pearl/80 font-light max-w-3xl mx-auto" style={{ letterSpacing: '0.02em' }}>
                          Your partner in energy freedom. Elegantly storing the solar energy you'd otherwise lose — so your home stays bright, steady, and yours alone.
                        </p>
                        
                        {/* CTA - Only visible in Panel 4 */}
                        <div 
                          className="pt-8 animate-fade-up"
                          style={{ 
                            animationDelay: '600ms',
                            opacity: Math.max(0, (panelProgress - 0.3) / 0.7),
                            transform: `translateY(${Math.max(0, (1 - panelProgress)) * 20}px)`
                          }}
                        >
                          <Button 
                            asChild
                            size="lg"
                            className="btn-premium text-lg px-8 py-6 bg-energy hover:bg-energy/90 text-charcoal font-medium shadow-elegant"
                          >
                            <Link to="/residential">
                              Never Worry About Power Again
                              <Suspense fallback={<span className="ml-2">→</span>}>
                                <ArrowRight className="ml-2 h-5 w-5" />
                              </Suspense>
                            </Link>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Scroll indicator - only on first panel */}
                {index === 0 && opacity > 0.5 && (
                  <button
                    onClick={scrollToNext}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-pearl/60 hover:text-pearl transition-colors animate-bounce"
                    aria-label="Scroll to next section"
                  >
                    <Suspense fallback={<div className="w-8 h-8" />}>
                      <ChevronDown className="w-8 h-8" />
                    </Suspense>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Built to Last - First section after hero */}
      <section ref={nextSectionRef} className="relative py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-light mb-6">
              Built to Last a <span className="text-energy">Lifetime</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              While others design for obsolescence, we engineer for permanence. 
              NESS isn't just a battery — it's a commitment to your energy independence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "25-Year Warranty",
                description: "Not marketing. Not conditional. A genuine promise backed by engineering excellence."
              },
              {
                title: "Field-Serviceable Design",
                description: "Every component accessible. Every part replaceable. Your investment protected for decades."
              },
              {
                title: "Made for Indian Conditions",
                description: "Designed and tested for extreme heat, humidity, and voltage fluctuations that others ignore."
              }
            ].map((feature, idx) => (
              <div key={idx} className="glass-premium p-8 rounded-2xl">
                <div className="mb-4">
                  <Suspense fallback={<div className="w-12 h-12 bg-energy/20 rounded-full" />}>
                    <CheckCircle2 className="w-12 h-12 text-energy" />
                  </Suspense>
                </div>
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Spotlight: Residential */}
      <LazySection
        fallback={<ProductSectionSkeleton />}
        rootMargin="100px"
      >
        <section className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <ResponsiveImage
                src={nessPodProduct}
                alt="NESS Powerwall - Home battery system"
                className="rounded-2xl shadow-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-6">
              <h2 className="font-display text-4xl md:text-5xl font-light">
                NESS <span className="text-energy">Powerwall</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                The heart of your home's energy system. Modular, expandable, and built to last 25 years.
              </p>
              <ul className="space-y-4">
                {[
                  "5.12 kWh per module, scale up to 40+ kWh",
                  "True 25-year warranty on all components",
                  "Works with any solar inverter",
                  "Field-serviceable design"
                ].map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Suspense fallback={<span className="w-5 h-5 rounded-full bg-energy/20" />}>
                      <CheckCircle2 className="w-5 h-5 text-energy mt-1 flex-shrink-0" />
                    </Suspense>
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="btn-premium">
                <Link to="/residential">
                  Explore Residential Solutions
                  <Suspense fallback={<span className="ml-2">→</span>}>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Suspense>
                </Link>
              </Button>
            </div>
          </div>
        </div>
        </section>
      </LazySection>

      {/* Product Spotlight: Commercial */}
      <LazySection
        fallback={<ProductSectionSkeleton />}
        rootMargin="100px"
      >
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 lg:order-2">
              <h2 className="font-display text-4xl md:text-5xl font-light">
                NESS <span className="text-energy">Pod</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Commercial-grade energy storage that pays for itself. Designed for businesses that refuse to compromise.
              </p>
              <ul className="space-y-4">
                {[
                  "100 kWh to multi-MWh configurations",
                  "Peak shaving saves 40-60% on electricity bills",
                  "Remote monitoring and predictive maintenance",
                  "ISO 9001 certified manufacturing"
                ].map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Suspense fallback={<span className="w-5 h-5 rounded-full bg-energy/20" />}>
                      <CheckCircle2 className="w-5 h-5 text-energy mt-1 flex-shrink-0" />
                    </Suspense>
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="btn-premium">
                <Link to="/commercial-enhanced">
                  Explore Commercial Solutions
                  <Suspense fallback={<span className="ml-2">→</span>}>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Suspense>
                </Link>
              </Button>
            </div>
            <div className="lg:order-1">
              <ResponsiveImage
                src={nessProProduct}
                alt="NESS Pod - Commercial battery system"
                className="rounded-2xl shadow-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
        </section>
      </LazySection>

      {/* Customer Testimonials */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-light mb-12">
            What Our Customers Say
          </h2>
          <div className="relative min-h-[200px]">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className={cn(
                  "absolute inset-0 transition-opacity duration-500",
                  idx === currentTestimonial ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
              >
                <blockquote className="text-xl md:text-2xl font-light text-muted-foreground mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <cite className="not-italic">
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                </cite>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTestimonial(idx)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  idx === currentTestimonial ? "bg-energy w-8" : "bg-muted-foreground/30"
                )}
                aria-label={`View testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lazy load below-the-fold sections */}
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <BelowFoldSections />
      </Suspense>

      {/* Lazy load configurator */}
      <Suspense fallback={<div className="min-h-screen bg-muted/30" />}>
        <HomeownerConfigurator />
      </Suspense>
    </Layout>
  );
};

export default memo(Index);

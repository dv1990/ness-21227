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

  // Testimonial auto-rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Parallax scroll tracking with RAF
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (ticking) return;
      
      ticking = true;
      window.requestAnimationFrame(() => {
        const heroSection = heroRef.current;
        if (!heroSection) {
          ticking = false;
          return;
        }
        
        const rect = heroSection.getBoundingClientRect();
        const heroHeight = heroSection.offsetHeight;
        const viewportHeight = window.innerHeight;
        
        // Calculate scroll progress through hero (0-1)
        const scrolled = Math.max(0, -rect.top);
        const maxScroll = heroHeight - viewportHeight;
        const progress = Math.max(0, Math.min(1, scrolled / maxScroll));
        
        // Determine current panel (0-3)
        const panel = Math.floor(progress * 4);
        const panelProg = (progress * 4) % 1;
        
        setScrollProgress(progress);
        setCurrentPanel(Math.min(panel, 3));
        setPanelProgress(panelProg);
        
        ticking = false;
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate panel opacity based on scroll
  const calculatePanelOpacity = (panelIndex: number) => {
    if (panelIndex === currentPanel) {
      return 1;
    }
    if (panelIndex === currentPanel - 1) {
      return Math.max(0, 1 - panelProgress);
    }
    if (panelIndex === currentPanel + 1) {
      return Math.max(0, panelProgress);
    }
    return 0;
  };

  // Smooth scroll to next section
  const scrollToNext = () => {
    nextSectionRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <Layout>
      {/* MARY WELLS-STYLE PARALLAX HERO */}
      <section 
        ref={heroRef}
        className="relative w-full"
        style={{ 
          height: '400vh',
          contain: 'layout style paint'
        }}
        aria-label="Interactive story: Life with NESS battery"
      >
        {panels.map((panel, index) => {
          const isActive = index === currentPanel;
          const opacity = calculatePanelOpacity(index);
          const isPanel4 = index === 3;
          
          return (
            <div
              key={panel.id}
              className="sticky top-0 h-screen w-full overflow-hidden"
              style={{
                opacity,
                pointerEvents: isActive ? 'auto' : 'none',
                willChange: 'opacity'
              }}
            >
              {/* Background Layer with Parallax */}
              <div 
                className="absolute inset-0 w-full h-full"
                style={{
                  transform: `translateY(${scrollProgress * panel.bgSpeed * 100}px) scale(${1 + scrollProgress * 0.05})`,
                  willChange: 'transform'
                }}
              >
                <img
                  src={panel.bgImage}
                  alt=""
                  loading={index === 0 ? 'eager' : 'lazy'}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: index === 3 ? 'center' : 'center top' }}
                />
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-b",
                  panel.gradient
                )} />
              </div>

              {/* Text Content Layer */}
              <div 
                className="relative z-10 h-full w-full flex items-center"
                style={{
                  transform: `translateY(${scrollProgress * 0.6 * 100}px)`,
                  willChange: 'transform'
                }}
              >
                <div className="container mx-auto px-6 sm:px-12 lg:px-20 max-w-7xl">
                  <div className="max-w-3xl">
                    {/* Panel 1: Life. Uninterrupted. */}
                    {index === 0 && (
                      <div 
                        className="space-y-6"
                        style={{
                          opacity: Math.min(1, panelProgress * 2),
                          transform: `translateY(${Math.max(0, (1 - panelProgress) * 20)}px)`
                        }}
                      >
                        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-light tracking-tight">
                          <span className="text-pearl block">Life.</span>
                          <span 
                            className="text-energy block"
                            style={{
                              opacity: Math.max(0, (panelProgress - 0.2) * 2),
                              transform: `translateY(${Math.max(0, 1 - ((panelProgress - 0.2) * 2)) * 30}px)`,
                              textShadow: '0 0 30px hsl(var(--energy-core) / 0.4)'
                            }}
                          >
                            Uninterrupted.
                          </span>
                        </h1>
                        <p 
                          className="text-xl sm:text-2xl text-pearl/90 font-light max-w-2xl"
                          style={{
                            opacity: Math.max(0, (panelProgress - 0.4) * 2)
                          }}
                        >
                          {panel.content.subtext}
                        </p>
                      </div>
                    )}

                    {/* Panel 2: You make the power */}
                    {index === 1 && (
                      <div 
                        className="space-y-6"
                        style={{
                          opacity: Math.min(1, panelProgress * 2),
                          transform: `translateY(${Math.max(0, (1 - panelProgress) * 20)}px)`
                        }}
                      >
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-pearl">
                          {applyBrandColor("You make the power.", ["power"])}
                        </h2>
                        <p 
                          className="text-xl sm:text-2xl text-pearl/90 font-light max-w-2xl"
                          style={{
                            opacity: Math.max(0, (panelProgress - 0.3) * 2)
                          }}
                        >
                          {panel.content.subtext}
                        </p>
                      </div>
                    )}

                    {/* Panel 3: Your energy. Stored. */}
                    {index === 2 && (
                      <div 
                        className="space-y-6"
                        style={{
                          opacity: Math.min(1, panelProgress * 2),
                          transform: `translateY(${Math.max(0, (1 - panelProgress) * 20)}px)`
                        }}
                      >
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-pearl space-y-2">
                          <span className="block">
                            {applyBrandColor("Your energy.", ["energy"])}
                          </span>
                          <span 
                            className="block"
                            style={{
                              opacity: Math.max(0, (panelProgress - 0.2) * 3),
                              transform: `translateY(${Math.max(0, 1 - ((panelProgress - 0.2) * 3)) * 20}px)`
                            }}
                          >
                            Stored.
                          </span>
                          <span 
                            className="block"
                            style={{
                              opacity: Math.max(0, (panelProgress - 0.35) * 3),
                              transform: `translateY(${Math.max(0, 1 - ((panelProgress - 0.35) * 3)) * 20}px)`
                            }}
                          >
                            Ready.
                          </span>
                          <span 
                            className="block"
                            style={{
                              opacity: Math.max(0, (panelProgress - 0.5) * 3),
                              transform: `translateY(${Math.max(0, 1 - ((panelProgress - 0.5) * 3)) * 20}px)`
                            }}
                          >
                            Yours.
                          </span>
                        </h2>
                        <p 
                          className="text-xl sm:text-2xl text-pearl/90 font-light max-w-2xl"
                          style={{
                            opacity: Math.max(0, (panelProgress - 0.6) * 2)
                          }}
                        >
                          {applyBrandColor(panel.content.subtext, ["power"])}
                        </p>
                      </div>
                    )}

                    {/* Panel 4: Meet NESS */}
                    {index === 3 && (
                      <div 
                        className="space-y-8"
                        style={{
                          opacity: Math.min(1, panelProgress * 2),
                          transform: `translateY(${Math.max(0, (1 - panelProgress) * 20)}px) scale(${0.95 + Math.min(panelProgress, 1) * 0.05})`
                        }}
                      >
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-pearl">
                          {applyBrandColor("Meet NESS,", ["NESS"])}
                        </h2>
                        <p 
                          className="text-xl sm:text-2xl text-pearl/90 font-light max-w-2xl"
                          style={{
                            opacity: Math.max(0, (panelProgress - 0.2) * 2),
                            letterSpacing: '0.01em'
                          }}
                        >
                          {panel.content.subtext}
                        </p>
                        
                        {/* CTA - Only visible in Panel 4 */}
                        <div
                          style={{
                            opacity: Math.max(0, (panelProgress - 0.4) * 2),
                            transform: `translateY(${Math.max(0, 1 - ((panelProgress - 0.4) * 2)) * 20}px)`
                          }}
                        >
                          <Button
                            asChild
                            size="lg"
                            className="bg-energy hover:bg-energy-bright text-charcoal font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <Link to="/residential">
                              Never Worry About Power Again
                              <Suspense fallback={null}>
                                <ArrowRight className="ml-2 h-5 w-5" />
                              </Suspense>
                            </Link>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Scroll Indicator - Only on Panel 1 */}
              {index === 0 && (
                <button
                  onClick={scrollToNext}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce"
                  aria-label="Scroll to next section"
                  style={{
                    opacity: Math.max(0, 1 - panelProgress * 2)
                  }}
                >
                  <Suspense fallback={<div className="w-6 h-6" />}>
                    <ChevronDown className="w-8 h-8 text-pearl/80" />
                  </Suspense>
                </button>
              )}
            </div>
          );
        })}
      </section>

      {/* 2. DIFFERENTIATOR SECTION */}
      <section 
        ref={nextSectionRef}
        className="py-24 sm:py-32 bg-whisper"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-light text-charcoal mb-6">
            Built to Last a <span className="text-energy font-semibold">Lifetime</span>
          </h2>
          <p className="text-xl text-silver max-w-3xl mx-auto">
            While others measure battery life in cycles, NESS is engineered for 25+ years of reliable service.
            Your investment today powers your home for decades to come.
          </p>
        </div>
      </section>

      {/* 3. PRODUCT SPOTLIGHTS */}
      <LazySection>
        {/* NESS Powerwall - Residential Hero */}
        <section className="py-20 sm:py-32 bg-pearl">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Content */}
              <div className="space-y-8 order-2 lg:order-1">
                <div>
                  <p className="text-sm font-semibold text-energy tracking-wider uppercase mb-3">
                    For Homeowners
                  </p>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-charcoal mb-6">
                    NESS Powerwall
                  </h2>
                  <p className="text-xl text-graphite leading-relaxed">
                    The elegant solution for residential energy independence. Store your solar power, 
                    backup your essentials, and take control of your electricity bills.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Suspense fallback={<div className="w-6 h-6 rounded-full bg-energy/20" />}>
                      <CheckCircle2 className="w-6 h-6 text-energy flex-shrink-0 mt-0.5" />
                    </Suspense>
                    <div>
                      <h3 className="font-semibold text-charcoal mb-1">Seamless Solar Integration</h3>
                      <p className="text-graphite">Store excess solar during the day, use it all night long</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Suspense fallback={<div className="w-6 h-6 rounded-full bg-energy/20" />}>
                      <CheckCircle2 className="w-6 h-6 text-energy flex-shrink-0 mt-0.5" />
                    </Suspense>
                    <div>
                      <h3 className="font-semibold text-charcoal mb-1">Instant Backup Power</h3>
                      <p className="text-graphite">Automatic switchover in milliseconds during outages</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Suspense fallback={<div className="w-6 h-6 rounded-full bg-energy/20" />}>
                      <CheckCircle2 className="w-6 h-6 text-energy flex-shrink-0 mt-0.5" />
                    </Suspense>
                    <div>
                      <h3 className="font-semibold text-charcoal mb-1">Smart Energy Management</h3>
                      <p className="text-graphite">AI-powered optimization reduces your bills by up to 70%</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button asChild size="lg" className="bg-charcoal hover:bg-graphite text-pearl">
                    <Link to="/residential">
                      Explore Residential Solutions
                      <Suspense fallback={null}>
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Suspense>
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Product Image */}
              <div className="order-1 lg:order-2">
                <div className="relative aspect-square lg:aspect-auto lg:h-[600px]">
                  <ResponsiveImage
                    src={nessHeroProduct}
                    alt="NESS Powerwall - Residential battery storage system"
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NESS Pod - Commercial Hero */}
        <section className="py-20 sm:py-32 bg-whisper">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Product Image */}
              <div>
                <div className="relative aspect-square lg:aspect-auto lg:h-[600px]">
                  <ResponsiveImage
                    src={nessPodProduct}
                    alt="NESS Pod - Commercial and industrial energy storage"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-8">
                <div>
                  <p className="text-sm font-semibold text-energy tracking-wider uppercase mb-3">
                    For Business
                  </p>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-charcoal mb-6">
                    NESS Pod
                  </h2>
                  <p className="text-xl text-graphite leading-relaxed">
                    Enterprise-grade energy storage that scales with your business. Reduce demand charges, 
                    ensure business continuity, and achieve sustainability goals.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Suspense fallback={<div className="w-6 h-6 rounded-full bg-energy/20" />}>
                      <CheckCircle2 className="w-6 h-6 text-energy flex-shrink-0 mt-0.5" />
                    </Suspense>
                    <div>
                      <h3 className="font-semibold text-charcoal mb-1">Peak Shaving & Demand Management</h3>
                      <p className="text-graphite">Cut electricity costs by up to 40% with intelligent load management</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Suspense fallback={<div className="w-6 h-6 rounded-full bg-energy/20" />}>
                      <CheckCircle2 className="w-6 h-6 text-energy flex-shrink-0 mt-0.5" />
                    </Suspense>
                    <div>
                      <h3 className="font-semibold text-charcoal mb-1">Diesel Generator Replacement</h3>
                      <p className="text-graphite">Clean, silent, and cost-effective alternative to fossil fuel backup</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Suspense fallback={<div className="w-6 h-6 rounded-full bg-energy/20" />}>
                      <CheckCircle2 className="w-6 h-6 text-energy flex-shrink-0 mt-0.5" />
                    </Suspense>
                    <div>
                      <h3 className="font-semibold text-charcoal mb-1">Modular & Scalable Design</h3>
                      <p className="text-graphite">Start with what you need, expand as your business grows</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button asChild size="lg" className="bg-charcoal hover:bg-graphite text-pearl">
                    <Link to="/commercial">
                      Discover Commercial Solutions
                      <Suspense fallback={null}>
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Suspense>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* 4. SOCIAL PROOF - Customer Testimonials */}
      <section className="py-20 sm:py-32 bg-charcoal text-pearl">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-light text-center mb-16">
            Trusted by <span className="text-energy">Thousands</span> Across India
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative min-h-[200px] flex items-center justify-center">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={cn(
                    "absolute inset-0 transition-all duration-700 ease-in-out",
                    index === currentTestimonial
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-8"
                  )}
                  style={{ pointerEvents: index === currentTestimonial ? 'auto' : 'none' }}
                >
                  <blockquote className="text-center space-y-6">
                    <p className="text-xl sm:text-2xl text-pearl/90 leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>
                    <footer>
                      <p className="font-semibold text-pearl">{testimonial.name}</p>
                      <p className="text-pearl/70">{testimonial.location}</p>
                    </footer>
                  </blockquote>
                </div>
              ))}
            </div>

            {/* Testimonial Navigation Dots */}
            <div className="flex justify-center gap-2 mt-12">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === currentTestimonial
                      ? "bg-energy w-8"
                      : "bg-pearl/30 hover:bg-pearl/50"
                  )}
                  aria-label={`Show testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. BELOW FOLD CONTENT - Lazy loaded */}
      <Suspense fallback={<ProductSectionSkeleton />}>
        <BelowFoldSections />
      </Suspense>

      {/* 6. CONFIGURATOR - Lazy loaded */}
      <Suspense fallback={<ProductSectionSkeleton />}>
        <HomeownerConfigurator />
      </Suspense>
    </Layout>
  );
};

export default memo(Index);

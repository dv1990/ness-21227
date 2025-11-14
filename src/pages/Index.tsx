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

const CheckCircle2 = lazy(() => import("lucide-react").then(m => ({
  default: m.CheckCircle2
})));
const ChevronDown = lazy(() => import("lucide-react").then(m => ({
  default: m.ChevronDown
})));
const ArrowRight = lazy(() => import("lucide-react").then(m => ({
  default: m.ArrowRight
})));

const BelowFoldSections = lazy(() => import("@/components/homeowner/BelowFoldSections").then(m => ({
  default: m.BelowFoldSections
})));
const HomeownerConfigurator = lazy(() => import("@/components/homeowner/HomeownerConfigurator").then(m => ({
  default: m.HomeownerConfigurator
})));

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        if (!heroRef.current) return;

        const heroRect = heroRef.current.getBoundingClientRect();
        const heroHeight = heroRect.height;
        const viewportHeight = window.innerHeight;
        const scrolled = -heroRect.top;
        const maxScroll = heroHeight - viewportHeight;

        const progress = Math.max(0, Math.min(1, scrolled / maxScroll));
        setScrollProgress(progress);

        const panelIndex = Math.floor(progress * panels.length);
        const panelStart = panelIndex / panels.length;
        const panelEnd = (panelIndex + 1) / panels.length;
        const localProgress = (progress - panelStart) / (panelEnd - panelStart);

        setCurrentPanel(Math.min(panelIndex, panels.length - 1));
        setPanelProgress(localProgress);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calculatePanelOpacity = (panelId: number): number => {
    const panelIndex = panelId - 1;
    if (currentPanel === panelIndex) {
      return 1;
    } else if (currentPanel === panelIndex - 1) {
      return panelProgress;
    } else if (currentPanel === panelIndex + 1) {
      return 1 - panelProgress;
    }
    return 0;
  };

  const scrollToNext = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout>
      <section
        ref={heroRef}
        className="relative h-[400vh] w-full"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {panels.map((panel) => (
            <div
              key={panel.id}
              className="absolute inset-0 transition-opacity duration-700 ease-out"
              style={{
                opacity: calculatePanelOpacity(panel.id),
                pointerEvents: calculatePanelOpacity(panel.id) > 0.5 ? 'auto' : 'none'
              }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
                style={{
                  backgroundImage: `url(${panel.bgImage})`,
                  transform: `translateY(${scrollProgress * 100 * panel.bgSpeed}px) scale(${1 + scrollProgress * 0.1})`
                }}
              />
              <div className={cn("absolute inset-0 bg-gradient-to-b", panel.gradient)} />

              <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                <div 
                  className="max-w-4xl transform transition-all duration-1000"
                  style={{
                    opacity: calculatePanelOpacity(panel.id),
                    transform: `translateY(${calculatePanelOpacity(panel.id) < 1 ? '20px' : '0'})`
                  }}
                >
                  <h1 className="mb-6 text-5xl font-normal tracking-tight text-pearl md:text-7xl lg:text-8xl">
                    {panel.content.highlight 
                      ? applyBrandColor(panel.content.main, [panel.content.highlight, panel.content.highlight2].filter(Boolean) as string[])
                      : panel.content.main
                    }
                  </h1>
                  <p className="mx-auto max-w-2xl text-lg text-silver md:text-xl lg:text-2xl">
                    {panel.content.subtext}
                  </p>

                  {panel.id === 4 && (
                    <div 
                      className="mt-12 opacity-0 transition-opacity duration-1000 delay-500"
                      style={{
                        opacity: calculatePanelOpacity(4) > 0.8 ? 1 : 0
                      }}
                    >
                      <Button
                        asChild
                        size="lg"
                        className="bg-energy hover:bg-energy-bright text-charcoal font-medium px-8 py-6 text-lg rounded-full shadow-[0_0_30px_rgba(139,195,74,0.3)] hover:shadow-[0_0_40px_rgba(139,195,74,0.5)] transition-all duration-300"
                      >
                        <Link to="/homeowners">Discover Your System</Link>
                      </Button>
                    </div>
                  )}
                </div>

                {panel.id < 4 && (
                  <button
                    onClick={scrollToNext}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 text-pearl/60 hover:text-pearl transition-colors duration-300"
                    aria-label="Scroll to next section"
                  >
                    <Suspense fallback={<div className="h-8 w-8" />}>
                      <ChevronDown className="h-8 w-8 animate-bounce" />
                    </Suspense>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        ref={nextSectionRef}
        className="relative bg-pearl py-24"
      >
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-4xl font-normal text-charcoal md:text-5xl">
              Built to Last
            </h2>
            <p className="mb-12 text-lg text-graphite md:text-xl">
              NESS batteries are engineered for longevity, designed to perform
              reliably for decades, not just years.
            </p>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { title: "15+ Years", desc: "Warranty coverage" },
                { title: "99.5%", desc: "Round-trip efficiency" },
                { title: "100%", desc: "Depth of discharge" }
              ].map((stat, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white p-8 shadow-lg transition-transform hover:scale-105"
                >
                  <div className="mb-2 text-3xl font-semibold text-energy">
                    {stat.title}
                  </div>
                  <div className="text-graphite">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LazySection rootMargin="200px">
        <section className="bg-charcoal py-24 text-pearl">
          <div className="container mx-auto px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 text-4xl font-normal md:text-5xl">
                  Product Spotlight:{" "}
                  <span className="text-energy">Residential</span>
                </h2>
                <p className="mb-8 text-lg text-silver">
                  The NESS Pod is perfect for homes looking to store solar
                  energy and maintain power during outages.
                </p>
                <ul className="mb-8 space-y-4">
                  {[
                    "5.12 kWh per unit, stackable",
                    "Seamless grid integration",
                    "Smart energy management",
                    "Silent operation"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Suspense fallback={<div className="h-5 w-5 mt-0.5" />}>
                        <CheckCircle2 className="h-5 w-5 mt-0.5 text-energy flex-shrink-0" />
                      </Suspense>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-energy text-energy hover:bg-energy hover:text-charcoal"
                >
                  <Link to="/products/ness-pod">
                    Learn More{" "}
                    <Suspense fallback={<span className="ml-2">→</span>}>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Suspense>
                  </Link>
                </Button>
              </div>
              <div className="relative">
                <Suspense fallback={<ProductSectionSkeleton />}>
                  <ResponsiveImage
                    src={nessPodProduct}
                    alt="NESS Pod residential battery system"
                    className="w-full rounded-2xl"
                    loading="lazy"
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      <LazySection rootMargin="200px">
        <section className="bg-gradient-to-b from-pearl to-white py-24">
          <div className="container mx-auto px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="order-2 lg:order-1 relative">
                <Suspense fallback={<ProductSectionSkeleton />}>
                  <ResponsiveImage
                    src={nessProProduct}
                    alt="NESS Pro commercial battery system"
                    className="w-full rounded-2xl"
                    loading="lazy"
                  />
                </Suspense>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="mb-6 text-4xl font-normal text-charcoal md:text-5xl">
                  Product Spotlight:{" "}
                  <span className="text-energy">Commercial</span>
                </h2>
                <p className="mb-8 text-lg text-graphite">
                  The NESS Pro is built for businesses that need reliable,
                  scalable energy storage.
                </p>
                <ul className="mb-8 space-y-4">
                  {[
                    "51.2 kWh per unit, highly scalable",
                    "Peak shaving & demand management",
                    "Remote monitoring & control",
                    "Ruggedized for harsh conditions"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Suspense fallback={<div className="h-5 w-5 mt-0.5" />}>
                        <CheckCircle2 className="h-5 w-5 mt-0.5 text-energy flex-shrink-0" />
                      </Suspense>
                      <span className="text-charcoal">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  size="lg"
                  className="bg-energy hover:bg-energy-bright text-charcoal"
                >
                  <Link to="/products/ness-pro">
                    Explore NESS Pro{" "}
                    <Suspense fallback={<span className="ml-2">→</span>}>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Suspense>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      <section className="bg-charcoal py-24 text-pearl">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-12 text-3xl font-normal md:text-4xl">
              What Our Customers Say
            </h2>
            <div className="relative min-h-[200px]">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-1000",
                    index === currentTestimonial ? "opacity-100" : "opacity-0"
                  )}
                >
                  <blockquote className="mb-6 text-xl italic text-silver md:text-2xl">
                    "{testimonial.quote}"
                  </blockquote>
                  <cite className="not-italic">
                    <div className="font-medium text-pearl">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-silver">
                      {testimonial.location}
                    </div>
                  </cite>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-[400px] bg-pearl" />}>
        <BelowFoldSections />
      </Suspense>

      <Suspense fallback={<div className="min-h-[600px] bg-white" />}>
        <HomeownerConfigurator />
      </Suspense>
    </Layout>
  );
};

export default memo(Index);

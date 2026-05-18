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
import { ArrowRight, Star, Shield, MapPin, Zap, Quote } from "lucide-react";
import { GradientOrbField } from "@/components/ui/gradient-orb";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { LiveTicker } from "@/components/ui/live-ticker";
import { testimonials } from "@/data/testimonials";
import { SmoothFade, StaggerReveal } from "@/components/ui/smooth-animations";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { useIsMobile } from "@/hooks/use-mobile";

// Lazy load heavy below-fold content
const HomeownerConfigurator = lazy(() =>
  import("@/components/homeowner/HomeownerConfigurator").then((m) => ({
    default: m.HomeownerConfigurator,
  })),
);
const ScrollProductShowcase = lazy(() => import("@/components/ScrollProductShowcase"));
const EnergyFlowDiagram = lazy(() => import("@/components/EnergyFlowDiagram"));

/* ─────────────────────────────────────────────
   MAGNETIC WRAPPER — subtle cursor-pull on CTAs (desktop only)
   ───────────────────────────────────────────── */
const MagneticWrapper = memo(function MagneticWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = 60;
      if (distance < maxDistance) {
        const strength = (maxDistance - distance) / maxDistance;
        el.style.transform = `translate(${(x / distance) * strength * 6}px, ${(y / distance) * strength * 6}px)`;
      }
    };
    const handleMouseLeave = () => {
      el.style.transform = "translate(0, 0)";
    };
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("transition-transform duration-300 ease-out inline-block", className)}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
});

/* ─────────────────────────────────────────────
   INTERSTITIAL — word-by-word fade reveal
   ───────────────────────────────────────────── */
const Interstitial = memo(function Interstitial({ text }: { text: string }) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.3 });
  const words = text.split(" ");
  // Respect reduced motion
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="py-16 sm:py-20 md:py-28 bg-charcoal relative overflow-hidden"
    >
      <GradientOrbField variant="warm" />
      <p className="relative z-10 text-center font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-pearl/30 italic tracking-tight max-w-4xl mx-auto px-6">
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block mr-[0.3em] transition-all duration-500 ease-out"
            style={
              prefersReduced
                ? { opacity: 1 }
                : {
                    opacity: isIntersecting ? 1 : 0,
                    transform: isIntersecting ? "translateY(0)" : "translateY(8px)",
                    transitionDelay: isIntersecting ? `${i * 40}ms` : "0ms",
                  }
            }
          >
            {word}
          </span>
        ))}
      </p>
    </div>
  );
});

/* ─────────────────────────────────────────────
   HERO SCROLL STEPS — 3 cinematic text reveals
   ───────────────────────────────────────────── */
const HERO_STEPS = [
  {
    top: "Power without",
    accent: "permission.",
    sub: "Life, uninterrupted.",
    showCTA: true,
  },
  {
    top: "Free energy",
    accent: "lands on your roof.",
    sub: "Every day. Most homes waste it. Not yours.",
    showCTA: false,
  },
  {
    top: "Clean energy",
    accent: "is the new luxury.",
    sub: "Silent. Seamless. Backed by a decade-long true warranty.",
    showCTA: false,
  },
] as const;

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(heroRef, { disabled: isMobile });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // 3-step hero — each step owns ~33% of scroll range
  const heroStep = isMobile ? 0 : scrollProgress < 0.33 ? 0 : scrollProgress < 0.67 ? 1 : 2;
  const overlayOpacity = isMobile ? 1 : Math.max(0.12, 0.9 - scrollProgress * 0.6);
  const productScale = isMobile ? 1 : 1 + scrollProgress * 0.04;

  return (
    <Layout className="-mt-16">

      {/* ════════════════════════════════════════════
          SECTION 1 — THE HERO (Scroll-Linked)
          Desktop: 180vh runway with sticky 100vh viewport.
          Text fades up → product reveals as you scroll.
          Mobile: Static 100vh hero (no scroll-link).
          ════════════════════════════════════════════ */}
      <div
        ref={heroRef}
        className={cn(
          "relative w-full bg-charcoal",
          isMobile ? "min-h-[100svh]" : "h-[360vh]",
        )}
      >
        <section
          className={cn(
            "relative w-full overflow-hidden",
            isMobile ? "min-h-[100svh]" : "sticky top-0 h-[100vh]",
          )}
          aria-labelledby="hero-heading"
        >
          {/* Full-screen product background — scales on scroll */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={nessHeroProduct}
              alt="NESS home battery — clean energy storage for modern Indian homes"
              className="w-full h-full object-cover object-center will-change-transform"
              loading="eager"
              width={1920}
              height={1080}
              fetchPriority="high"
              style={{
                transform: `scale(${productScale})`,
                transformOrigin: "center center",
              }}
            />
            {/* Overlays fade out on scroll to reveal product */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 via-40% to-charcoal/20 will-change-[opacity]"
              style={{ opacity: overlayOpacity }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent will-change-[opacity]"
              style={{ opacity: overlayOpacity }}
            />
          </div>

          {/* Ambient orbs behind text */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <GradientOrbField variant="warm" />
          </div>

          {/* Hero content — 3-step scroll reveal */}
          <div className="relative z-10 min-h-[100svh] md:min-h-[100vh] flex items-center max-w-[1600px] mx-auto px-4 sm:px-8 md:px-16 py-20 sm:py-0">
            <div className="relative max-w-3xl w-full" style={{ minHeight: "22rem" }}>

              {HERO_STEPS.map((step, i) => {
                const isActive = i === heroStep;
                const isPast = i < heroStep;
                return (
                  <div
                    key={i}
                    className="absolute inset-0 flex flex-col justify-center gap-8 sm:gap-12 md:gap-14"
                    style={{
                      opacity: isMobile ? (i === 0 ? 1 : 0) : isActive ? 1 : 0,
                      transform: isMobile
                        ? "none"
                        : `translateY(${isActive ? 0 : isPast ? -24 : 24}px)`,
                      transition: "opacity 0.65s ease, transform 0.65s ease",
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                    aria-hidden={!isActive}
                  >
                    {/* Headline */}
                    <h1
                      id={i === 0 ? "hero-heading" : undefined}
                      className={cn(
                        "font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-bold leading-[0.95] tracking-[-0.03em] text-pearl",
                        i === 0 && (isVisible ? "transition-all duration-1000 ease-out opacity-100 translate-y-0" : "opacity-0 translate-y-8"),
                      )}
                    >
                      {step.top}
                      <br />
                      <span className="text-gradient-energy">{step.accent}</span>
                    </h1>

                    {/* Sub-headline */}
                    <p
                      className={cn(
                        "font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-[1.35] tracking-[-0.015em] max-w-[700px] text-pearl/60",
                        i === 0 && (isVisible ? "transition-all duration-1000 ease-out delay-200 opacity-100 translate-y-0" : "opacity-0 translate-y-8"),
                      )}
                    >
                      {step.sub}
                    </p>

                    {/* CTAs — only on step 0 */}
                    {step.showCTA && (
                      <div
                        className={cn(
                          "pt-2 sm:pt-4 flex flex-col sm:flex-row items-start gap-4",
                          isVisible ? "transition-all duration-1000 ease-out delay-400 opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                        )}
                      >
                        <MagneticWrapper>
                          <Link to="/homeowners" className="inline-block group">
                            <Button
                              size="lg"
                              className="interactive font-display bg-energy hover:bg-energy-bright text-charcoal font-semibold px-8 py-4 sm:px-12 sm:py-6 text-base sm:text-lg rounded-full transition-all duration-300 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,230,118,0.3)] hover:scale-105 active:scale-95"
                            >
                              <span className="flex items-center justify-center">
                                Own Your Energy
                                <ArrowRight className="ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" />
                              </span>
                            </Button>
                          </Link>
                        </MagneticWrapper>
                        <Link to="/contact/homeowner" className="inline-block group">
                          <Button
                            size="lg"
                            className="interactive font-display bg-transparent border border-pearl/30 hover:border-pearl/60 text-pearl hover:bg-pearl/10 font-light px-8 py-4 sm:px-10 sm:py-6 text-base sm:text-lg rounded-full transition-all duration-300"
                          >
                            Talk to an Expert
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step indicator + scroll hint */}
          {!isMobile && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3" aria-hidden="true">
              {/* Step dots */}
              <div className="flex gap-2">
                {HERO_STEPS.map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full transition-all duration-500"
                    style={{
                      width: heroStep === i ? 20 : 6,
                      height: 6,
                      background: heroStep === i ? "hsl(142 69% 58%)" : "rgba(255,255,255,0.2)",
                    }}
                  />
                ))}
              </div>
              {/* Scroll line — fades after step 0 */}
              <div
                className="flex flex-col items-center gap-1 transition-opacity duration-500"
                style={{ opacity: heroStep === 0 ? 0.5 : 0.2 }}
              >
                <span className="text-pearl/40 text-xs tracking-[0.2em] uppercase">Scroll</span>
                <div className="w-px h-6 bg-gradient-to-b from-pearl/30 to-transparent animate-energy-pulse" />
              </div>
            </div>
          )}
        </section>
      </div>

      {/* ────────────────────────────────────
          TRUST BAR — Elevated Indian identity
          ──────────────────────────────────── */}
      <section className="py-5 sm:py-6 bg-charcoal border-t border-pearl/5" aria-label="Trust indicators">
        <SmoothFade duration={600}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-14 text-pearl/40 text-xs sm:text-sm font-light tracking-wide">
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
                <span>Bangalore Deep Tech · Est. 2020</span>
              </div>
            </div>
          </div>
        </SmoothFade>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 2 — THE PROCLAMATION
          "One box. Sun in. Freedom out."
          ════════════════════════════════════════════ */}
      <section
        className="relative py-28 md:py-40 lg:py-52 px-4 sm:px-6 bg-charcoal overflow-hidden"
        aria-labelledby="proclamation-heading"
      >
        <GradientOrbField variant="standard" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10 sm:space-y-14">
          <SmoothFade>
            <h2
              id="proclamation-heading"
              className="font-display tracking-[-0.03em] leading-[1.05]"
            >
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-pearl">
                One box. Sun in.
              </span>
              <span className="block mt-3 sm:mt-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-pearl/35">
                Freedom out.
              </span>
            </h2>
          </SmoothFade>

          <SmoothFade delay={150}>
            <p className="text-base sm:text-lg md:text-xl text-pearl/40 font-light max-w-2xl mx-auto leading-[1.8]">
              Your home already generates power. Now it keeps it.
              <span className="block mt-3 text-pearl/55 font-normal">
                Store solar. Use it tonight. Stop paying the grid.
              </span>
            </p>
          </SmoothFade>
        </div>
      </section>

      {/* ── Interstitial ── */}
      <Interstitial text="The cleanest power plant in India fits on your wall." />

      {/* ════════════════════════════════════════════
          SECTION 2.5 — SCROLL PRODUCT SHOWCASE
          Apple-style pinned scroll with feature callouts
          ════════════════════════════════════════════ */}
      <Suspense fallback={<div className="h-screen bg-charcoal" />}>
        <ScrollProductShowcase />
      </Suspense>

      {/* ════════════════════════════════════════════
          SECTION 3 — POWERWALL AS SCULPTURE
          Product floating on dark. Green underglow.
          ════════════════════════════════════════════ */}
      <LazySection rootMargin="400px" fallback={<ProductSectionSkeleton isDark />}>
        <section
          className="relative py-24 sm:py-32 md:py-40 px-4 sm:px-6 bg-charcoal overflow-hidden"
          aria-labelledby="residential-heading"
        >
          <GradientOrbField variant="warm" />

          <div className="relative z-10 max-w-7xl mx-auto">
            {/* Section headline */}
            <SmoothFade>
              <div className="text-center mb-16 sm:mb-20 md:mb-28">
                <p className="text-energy text-xs sm:text-sm uppercase tracking-[0.2em] mb-4 animate-energy-pulse">For Homeowners</p>
                <h2
                  id="residential-heading"
                  className="font-display tracking-[-0.03em] leading-[1.05]"
                >
                  <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-pearl">
                    Your home.
                  </span>
                  <span className="block mt-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gradient-energy">
                    Self-powered.
                  </span>
                </h2>
              </div>
            </SmoothFade>

            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              {/* Features */}
              <div className="space-y-8 sm:space-y-10">
                <SmoothFade delay={100}>
                  <p className="text-lg sm:text-xl md:text-2xl text-pearl/60 font-light leading-[1.7] max-w-lg">
                    Store solar energy. Power your home day and night. Silent, elegant,
                    and completely independent from the grid.
                  </p>
                </SmoothFade>

                <StaggerReveal stagger={120} className="space-y-5 sm:space-y-6">
                  {[
                    { title: "Store the sun", desc: "Your panels generate during the day. The battery holds it. Use it after sunset, when grid power costs the most." },
                    { title: "Whole-home power", desc: "AC, fridge, Wi-Fi, lights — everything runs. Not just essentials. Everything." },
                    { title: "Pay the grid less", desc: "Off-peak charging, peak-hour discharging. A typical Bangalore home saves ~₹47,000 a year." },
                  ].map((f) => (
                    <div key={f.title} className="flex items-start gap-4 group">
                      <div className="w-8 h-8 rounded-full bg-energy/10 border border-energy/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-energy/20 transition-colors">
                        <Zap className="w-4 h-4 text-energy" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-display font-semibold text-lg sm:text-xl text-pearl">{f.title}</p>
                        <p className="text-pearl/50 text-sm sm:text-base mt-1 font-light">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </StaggerReveal>

                <SmoothFade delay={300}>
                  <div className="pt-4">
                    <MagneticWrapper>
                      <Link to="/homeowners">
                        <Button
                          size="lg"
                          className="interactive font-display bg-energy hover:bg-energy-bright text-charcoal font-semibold px-10 sm:px-12 py-5 sm:py-6 text-lg rounded-full transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,230,118,0.3)] hover:scale-105 active:scale-95"
                        >
                          Own Your Energy
                          <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                        </Button>
                      </Link>
                    </MagneticWrapper>
                  </div>
                </SmoothFade>
              </div>

              {/* Product — floating with glow */}
              <SmoothFade duration={1000} delay={200}>
                <div className="relative mt-8 md:mt-0">
                  <div className="relative">
                    <WebPImage
                      src={nessProProduct}
                      alt="NESS Pro home battery — clean energy storage for Indian homes"
                      className="w-full h-auto rounded-2xl product-glow"
                      priority={false}
                    />
                    {/* Energy reflection underneath */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-24 product-reflection rounded-full" />
                  </div>
                </div>
              </SmoothFade>
            </div>
          </div>
        </section>
      </LazySection>

      {/* ── Interstitial ── */}
      <Interstitial text="500 Indian homes already run on sunlight." />

      {/* ════════════════════════════════════════════
          SECTION 3.5 — ENERGY FLOW DIAGRAM
          Animated SVG: solar → battery → home
          ════════════════════════════════════════════ */}
      <Suspense fallback={<div className="h-64 bg-charcoal" />}>
        <EnergyFlowDiagram />
      </Suspense>

      {/* ════════════════════════════════════════════
          SECTION 4 — THE MOVEMENT — Social Proof
          Light breather. Cinematic testimonial. City marquee.
          ════════════════════════════════════════════ */}
      <LazySection>
        <section className="relative py-24 sm:py-32 md:py-40 section-bleed-from-light overflow-hidden" aria-labelledby="social-proof-heading">
          <div className="max-w-6xl mx-auto px-6 sm:px-8">
            {/* Live counter */}
            <SmoothFade>
              <div className="text-center mb-16 sm:mb-24">
                <LiveTicker
                  label="Indian homes powered by clean energy"
                  startValue={500}
                  incrementRate={0.001}
                  suffix="+"
                  className="mb-6"
                />
              </div>
            </SmoothFade>

            {/* Featured testimonial — cinematic, no card */}
            <SmoothFade delay={100}>
              <div className="flex flex-col items-center text-center space-y-8 sm:space-y-10 mb-16 sm:mb-20">
                <Quote className="w-10 h-10 text-energy/20" aria-hidden="true" />
                <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-light text-graphite/80 leading-[1.4] max-w-4xl">
                  "{testimonials[0].quote}"
                </blockquote>
                <div className="pt-2">
                  <p className="text-lg sm:text-xl text-graphite font-medium">{testimonials[0].name}</p>
                  <p className="text-sm sm:text-base text-graphite/50 font-light mt-1">{testimonials[0].location}</p>
                </div>
              </div>
            </SmoothFade>

            {/* City presence marquee */}
            <div className="relative overflow-hidden py-6 border-t border-b border-graphite/10">
              <div className="animate-marquee whitespace-nowrap flex gap-8">
                {["Bangalore", "Chennai", "Mumbai", "Hyderabad", "Delhi", "Pune", "Kochi", "Gurgaon", "Jaipur", "Ahmedabad",
                  "Bangalore", "Chennai", "Mumbai", "Hyderabad", "Delhi", "Pune", "Kochi", "Gurgaon", "Jaipur", "Ahmedabad"].map((city, i) => (
                  <span key={`${city}-${i}`} className="text-sm uppercase tracking-[0.3em] text-graphite/20 font-light">
                    {city}
                  </span>
                ))}
              </div>
            </div>

            {/* Glass trust badges */}
            <StaggerReveal stagger={100} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-12 sm:mt-16">
              {[
                { label: "IEC 62619", sub: "Certified" },
                { label: "BIS", sub: "Certified" },
                { label: "4.9★", sub: "Customer rating" },
                { label: "10 Year", sub: "Full Warranty" },
              ].map((badge) => (
                <div key={badge.label} className="text-center py-5 sm:py-6 px-4 rounded-xl border border-graphite/10 bg-pearl/80 backdrop-blur-sm">
                  <p className="font-display font-semibold text-lg sm:text-xl text-graphite">{badge.label}</p>
                  <p className="text-xs sm:text-sm text-graphite/50 font-light mt-1 uppercase tracking-wide">{badge.sub}</p>
                </div>
              ))}
            </StaggerReveal>
          </div>
        </section>
      </LazySection>

      {/* ════════════════════════════════════════════
          SECTION 5 — NESS POD AS SCULPTURE
          Commercial product. Dark canvas. Scale without limits.
          ════════════════════════════════════════════ */}
      <LazySection rootMargin="400px" fallback={<ProductSectionSkeleton isDark />}>
        <section
          className="relative py-24 sm:py-32 md:py-40 px-4 sm:px-6 bg-charcoal overflow-hidden"
          aria-labelledby="commercial-heading"
        >
          <GradientOrbField variant="standard" />

          <div className="relative z-10 max-w-7xl mx-auto">
            {/* Section headline */}
            <SmoothFade>
              <div className="text-center mb-16 sm:mb-20 md:mb-28">
                <p className="text-energy text-xs sm:text-sm uppercase tracking-[0.2em] mb-4 animate-energy-pulse">For Business</p>
                <h2
                  id="commercial-heading"
                  className="font-display tracking-[-0.03em] leading-[1.05]"
                >
                  <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-pearl">
                    Scale without
                  </span>
                  <span className="block mt-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gradient-energy">
                    limits.
                  </span>
                </h2>
              </div>
            </SmoothFade>

            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              {/* Product — floating with glow */}
              <SmoothFade duration={1000} delay={200}>
                <div className="relative">
                  <div className="relative">
                    <WebPImage
                      src={nessPodProduct}
                      alt="NESS Pod — Commercial clean energy storage system"
                      className="w-full h-auto rounded-2xl product-glow"
                      priority={false}
                    />
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-24 product-reflection rounded-full" />
                  </div>
                </div>
              </SmoothFade>

              {/* Features */}
              <div className="space-y-8 sm:space-y-10">
                <SmoothFade delay={100}>
                  <p className="text-lg sm:text-xl md:text-2xl text-pearl/60 font-light leading-[1.7] max-w-lg">
                    Clean energy storage at commercial scale. The NESS Pod helps businesses
                    cut carbon, cut costs, and never depend on diesel again.
                  </p>
                </SmoothFade>

                <StaggerReveal stagger={120} className="space-y-5 sm:space-y-6">
                  {[
                    { title: "Zero diesel. Zero emissions.", desc: "Replace generators with stored solar. Clean power, 24/7." },
                    { title: "Scalable capacity", desc: "Stack units to match any demand. Grow without rewiring." },
                    { title: "Built for Indian conditions", desc: "Tested at 45°C heat, monsoon humidity, and voltage chaos." },
                  ].map((f) => (
                    <div key={f.title} className="flex items-start gap-4 group">
                      <div className="w-8 h-8 rounded-full bg-energy/10 border border-energy/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-energy/20 transition-colors">
                        <Zap className="w-4 h-4 text-energy" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-display font-semibold text-lg sm:text-xl text-pearl">{f.title}</p>
                        <p className="text-pearl/50 text-sm sm:text-base mt-1 font-light">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </StaggerReveal>

                <SmoothFade delay={300}>
                  <div className="pt-4">
                    <MagneticWrapper>
                      <Link to="/commercial">
                        <Button
                          size="lg"
                          className="interactive font-display bg-energy hover:bg-energy-bright text-charcoal font-semibold px-10 sm:px-12 py-5 sm:py-6 text-lg rounded-full transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,230,118,0.3)] hover:scale-105 active:scale-95"
                        >
                          Explore Solutions
                          <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                        </Button>
                      </Link>
                    </MagneticWrapper>
                  </div>
                </SmoothFade>
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* SECTION 6 (formerly "The NESS Difference") REMOVED — pure recap of
          sections 3, 5, and ScrollProductShowcase. Removing it eliminated the
          three biggest verbatim repetitions on the page ("AC/fridge/Wi-Fi —
          not just essentials, Everything", "Solar That Works at Night",
          "Clean. Silent. Zero Emissions"). */}

      {/* ════════════════════════════════════════════
          SECTION 7 — THE DECLARATION — Stats
          Oversized numbers. Clean energy story.
          ════════════════════════════════════════════ */}
      <LazySection>
        <section className="relative py-24 sm:py-32 md:py-40 bg-charcoal overflow-hidden" aria-label="Key statistics">
          <GradientOrbField variant="intense" />

          <div className="relative z-10 max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 sm:gap-12 text-center">
              {[
                { value: 47, suffix: "K", label: "₹ saved per year", desc: "Typical 5kW solar + 10kWh NESS Bangalore household" },
                { value: 6000, suffix: "+", label: "Charge cycles tested", desc: "Sixteen years of daily use. Cells still hold 80%." },
                { value: 4, suffix: " hr", label: "Install, no civil work", desc: "One crew. No rewiring. No downtime." },
              ].map((stat, i) => (
                <div key={stat.label} className="space-y-4">
                  <SmoothFade delay={i * 150}>
                    <div className="text-energy">
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                        className="font-display text-[clamp(4rem,12vw,8rem)] font-bold leading-none tracking-tight"
                      />
                    </div>
                  </SmoothFade>
                  <SmoothFade delay={i * 150 + 400}>
                    <p className="text-sm uppercase tracking-[0.2em] text-pearl/40 font-light">{stat.label}</p>
                    <p className="text-pearl/25 text-xs sm:text-sm font-light mt-2">{stat.desc}</p>
                  </SmoothFade>
                </div>
              ))}
            </div>
          </div>
        </section>
      </LazySection>

      {/* Interstitial #3 removed — defensive Silicon Valley comparison,
          redundant with ScrollProductShowcase's "Built for Indian summers,
          not California weather" line. Two defensive jabs on one page was
          one too many. */}

      {/* ════════════════════════════════════════════
          SECTION 8 — CUSTOMER STORIES
          Supporting testimonials on dark canvas
          ════════════════════════════════════════════ */}
      <LazySection>
        <section className="py-24 sm:py-32 md:py-40 bg-charcoal" aria-labelledby="testimonials-heading">
          <div className="max-w-6xl mx-auto px-6 sm:px-8">
            <SmoothFade>
              <p
                id="testimonials-heading"
                className="text-energy text-xs sm:text-sm uppercase tracking-[0.2em] text-center mb-16 sm:mb-20"
              >
                Voices from 500+ homes
              </p>
            </SmoothFade>

            <StaggerReveal stagger={200} className="grid md:grid-cols-2 gap-6 sm:gap-8">
              {[
                {
                  quote: "What made me choose NESS was the silence. My generator used to wake the neighborhood. Now, nobody even knows when the power goes out.",
                  name: "Rajesh Malhotra",
                  location: "Villa Owner · Bangalore · 18 months",
                  initials: "RM",
                },
                {
                  quote: "We had solar panels sitting idle during outages. Added a NESS battery in two hours. Now our solar actually works when we need it most.",
                  name: "Priya Venkatesh",
                  location: "Homeowner · Chennai · Standalone Battery",
                  initials: "PV",
                },
              ].map((t) => (
                <div
                  key={t.name}
                  className="relative p-8 sm:p-10 rounded-2xl border border-pearl/10 bg-pearl/[0.03] hover:bg-pearl/[0.06] transition-colors duration-300"
                >
                  <Quote className="w-8 h-8 text-energy/20 mb-6" aria-hidden="true" />
                  <blockquote className="text-lg sm:text-xl text-pearl/80 leading-relaxed mb-8 font-light">
                    "{t.quote}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-energy/10 border border-energy/20 flex items-center justify-center text-sm font-medium text-energy">
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-pearl">{t.name}</p>
                      <p className="text-xs text-pearl/40 font-light">{t.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </StaggerReveal>
          </div>
        </section>
      </LazySection>

      {/* ── CONFIGURATOR (lazy loaded) ──
          Moved ABOVE the Final CTA so the funnel reads:
          configurator (try the product) → final CTA (own it). */}
      <Suspense
        fallback={
          <div className="py-24 bg-charcoal">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="space-y-4 mb-12 animate-pulse">
                <div className="h-10 bg-pearl/10 rounded w-1/2 mx-auto" />
                <div className="h-6 bg-pearl/10 rounded w-3/4 mx-auto" />
              </div>
            </div>
          </div>
        }
      >
        <HomeownerConfigurator />
      </Suspense>

      {/* ════════════════════════════════════════════
          SECTION 9 — THE INVITATION — Final CTA
          Concrete outcome-led copy (Mom-test passing) replacing the
          previous "See what's next" filler.
          ════════════════════════════════════════════ */}
      <section className="relative py-28 sm:py-36 md:py-44 bg-charcoal overflow-hidden" aria-label="Call to action">
        <GradientOrbField variant="intense" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-10 sm:space-y-12">
          <SmoothFade>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-pearl tracking-[-0.03em] leading-[1.05]">
              Stop paying<br />
              <span className="text-gradient-energy">peak tariffs.</span>
            </h2>
          </SmoothFade>
          <SmoothFade delay={150}>
            <p className="text-lg sm:text-xl md:text-2xl text-pearl/40 font-light max-w-2xl mx-auto leading-relaxed">
              500 Indian families already did.
              <span className="block mt-2 text-pearl/55">You're one quote away.</span>
            </p>
          </SmoothFade>

          <SmoothFade delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <MagneticWrapper>
                <Link to="/homeowners">
                  <Button
                    size="lg"
                    className="interactive font-display bg-energy hover:bg-energy-bright text-charcoal font-semibold px-10 sm:px-14 py-5 sm:py-7 text-lg sm:text-xl rounded-full transition-all duration-300 shadow-[0_20px_60px_rgba(0,230,118,0.25)] hover:shadow-[0_25px_80px_rgba(0,230,118,0.4)] hover:scale-105 active:scale-95"
                  >
                    Get a Quote
                    <ArrowRight className="ml-3 w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                  </Button>
                </Link>
              </MagneticWrapper>
              <Link to="/contact/homeowner">
                <Button
                  size="lg"
                  className="interactive font-display bg-transparent border border-pearl/20 hover:border-pearl/40 text-pearl hover:bg-pearl/5 font-light px-8 sm:px-12 py-5 sm:py-7 text-lg sm:text-xl rounded-full transition-all duration-300"
                >
                  Talk to an Expert
                </Button>
              </Link>
            </div>
          </SmoothFade>
        </div>
      </section>
    </Layout>
  );
};

export default memo(Index);

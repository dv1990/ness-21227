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
import { ArrowRight, Star, Shield, MapPin, Zap, Home, Quote } from "lucide-react";
import { GradientOrbField } from "@/components/ui/gradient-orb";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { LiveTicker } from "@/components/ui/live-ticker";
import { testimonials } from "@/data/testimonials";
import { SmoothFade, StaggerReveal } from "@/components/ui/smooth-animations";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

// Lazy load heavy below-fold content
const HomeownerConfigurator = lazy(() =>
  import("@/components/homeowner/HomeownerConfigurator").then((m) => ({
    default: m.HomeownerConfigurator,
  })),
);

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
      ref={ref}
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

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout className="-mt-16">

      {/* ════════════════════════════════════════════
          SECTION 1 — THE HERO
          Dark canvas. Product image. Provocative headline.
          ════════════════════════════════════════════ */}
      <section className="relative min-h-[100svh] w-full overflow-hidden" aria-labelledby="hero-heading">
        {/* Full-screen product background */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={nessHeroProduct}
            alt="NESS home battery — clean energy storage for modern Indian homes"
            className="w-full h-full object-cover object-center"
            loading="eager"
            width={1920}
            height={1080}
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 via-40% to-charcoal/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
        </div>

        {/* Ambient orbs behind text */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <GradientOrbField variant="warm" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 min-h-[100svh] flex items-center max-w-[1600px] mx-auto px-4 sm:px-8 md:px-16 py-20 sm:py-0">
          <div className="space-y-8 sm:space-y-12 md:space-y-14 max-w-3xl w-full">

            {/* Headline — Outfit 700, provocative */}
            <h1
              id="hero-heading"
              className={cn(
                "font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-bold leading-[0.95] tracking-[-0.03em] text-pearl transition-all duration-1000 ease-out",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              )}
            >
              Power without
              <br />
              <span className="text-gradient-energy">permission.</span>
            </h1>

            {/* Sub-headline — Outfit 300, elaboration */}
            <p
              className={cn(
                "font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-[1.35] tracking-[-0.015em] max-w-[700px] text-pearl/50 transition-all duration-1000 ease-out delay-200",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              )}
            >
              Your roof collects it. Your wall stores it.
              <span className="block mt-1 text-pearl/70">The grid becomes optional.</span>
            </p>

            {/* CTAs */}
            <div
              className={cn(
                "pt-2 sm:pt-4 flex flex-col sm:flex-row items-start gap-4 transition-all duration-1000 ease-out delay-400",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              )}
            >
              <MagneticWrapper>
                <Link to="/residential" className="inline-block group">
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

            {/* Product identifier */}
            <p
              className={cn(
                "text-pearl/25 text-xs sm:text-sm font-light tracking-[0.2em] uppercase mt-6 transition-all duration-1000 ease-out delay-500",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              )}
            >
              NESS — Clean Energy Storage
            </p>
          </div>
        </div>
      </section>

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
                    { title: "Store the sun", desc: "Capture solar energy during the day. Use it at night. Your roof becomes a power station." },
                    { title: "Whole-home power", desc: "AC, fridge, Wi-Fi, lights — everything runs. Not just essentials. Everything." },
                    { title: "10ms switchover", desc: "Grid drops? You won't notice. 200× faster than a blink." },
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
                      <Link to="/residential">
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
                      alt="NESS Powerwall — Clean energy storage for your home"
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
                { label: "4.9★", sub: "500+ homes" },
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

      {/* ════════════════════════════════════════════
          SECTION 6 — THE DIFFERENCE
          Why NESS — refined trust features on dark canvas
          ════════════════════════════════════════════ */}
      <LazySection>
        <section
          className="relative py-24 md:py-32 lg:py-40 bg-graphite overflow-hidden"
          aria-labelledby="benefits-heading"
        >
          <GradientOrbField variant="warm" />

          <div className="relative z-10 max-w-6xl mx-auto px-6">
            <SmoothFade>
              <div className="text-center mb-16 sm:mb-20">
                <h2
                  id="benefits-heading"
                  className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-pearl tracking-[-0.03em] leading-[1.05]"
                >
                  The NESS <span className="text-gradient-energy">Difference</span>
                </h2>
                <p className="text-lg sm:text-xl text-pearl/40 font-light max-w-2xl mx-auto mt-6 leading-relaxed">
                  Clean energy engineering meets everyday independence.
                </p>
              </div>
            </SmoothFade>

            <StaggerReveal stagger={150} className="grid md:grid-cols-3 gap-4 md:gap-5">
              {[
                {
                  icon: Shield,
                  title: "Clean. Silent. Zero Emissions.",
                  desc: "No diesel. No fumes. No noise. Just stored sunlight powering your home in absolute silence.",
                },
                {
                  icon: Zap,
                  title: "Solar That Works at Night",
                  desc: "Your panels generate during the day. NESS stores it. Use clean energy 24/7 — even when the sun's down.",
                },
                {
                  icon: Home,
                  title: "Whole Home. Not Half Measures.",
                  desc: "AC, refrigerator, Wi-Fi, entertainment — all at once, all night on clean energy. Not just essentials. Everything.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="group relative p-7 sm:p-8 rounded-2xl border border-pearl/10 bg-pearl/[0.03] transition-all duration-300 hover:bg-pearl/[0.06] hover:border-pearl/20"
                >
                  <div className="w-14 h-14 bg-energy/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-energy/20 transition-colors duration-300">
                    <card.icon className="w-7 h-7 text-energy" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-pearl mb-3">{card.title}</h3>
                  <p className="text-pearl/50 leading-relaxed font-light text-sm sm:text-base">{card.desc}</p>
                </div>
              ))}
            </StaggerReveal>
          </div>
        </section>
      </LazySection>

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
                { value: 100, suffix: "%", label: "Solar compatible", desc: "Store every watt your panels generate" },
                { value: 45, suffix: "°C", label: "Tested operating temperature", desc: "Engineered for Indian summers" },
                { value: 10, suffix: " yr", label: "Full replacement warranty", desc: "A decade of clean, free energy" },
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

      {/* ── Interstitial ── */}
      <Interstitial text="Bangalore-built. Tested in conditions Silicon Valley can't imagine." />

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

      {/* ════════════════════════════════════════════
          SECTION 9 — THE INVITATION — Final CTA
          Intense energy-green glow. "See what's next."
          ════════════════════════════════════════════ */}
      <section className="relative py-28 sm:py-36 md:py-44 bg-charcoal overflow-hidden" aria-label="Call to action">
        <GradientOrbField variant="intense" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-10 sm:space-y-12">
          <SmoothFade>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-pearl tracking-[-0.03em] leading-[1.05]">
              See what's <span className="text-gradient-energy">next.</span>
            </h2>
          </SmoothFade>
          <SmoothFade delay={150}>
            <p className="text-lg sm:text-xl md:text-2xl text-pearl/40 font-light max-w-2xl mx-auto leading-relaxed">
              The future of home energy is already installed in 500+ Indian homes.
              <span className="block mt-2 text-pearl/55">Yours could be next.</span>
            </p>
          </SmoothFade>

          <SmoothFade delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <MagneticWrapper>
                <Link to="/residential">
                  <Button
                    size="lg"
                    className="interactive font-display bg-energy hover:bg-energy-bright text-charcoal font-semibold px-10 sm:px-14 py-5 sm:py-7 text-lg sm:text-xl rounded-full transition-all duration-300 shadow-[0_20px_60px_rgba(0,230,118,0.25)] hover:shadow-[0_25px_80px_rgba(0,230,118,0.4)] hover:scale-105 active:scale-95"
                  >
                    Own Your Energy
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

      {/* ── CONFIGURATOR (lazy loaded) ── */}
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
    </Layout>
  );
};

export default memo(Index);

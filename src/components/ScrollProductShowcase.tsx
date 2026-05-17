import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Brain, Shield, Award, ChevronDown } from "lucide-react";
import { WebPImage } from "@/components/ui/webp-image";
import { useIsMobile } from "@/hooks/use-mobile";
import nessProProduct from "@/assets-webp/ness-pro-product.webp";

const FEATURES = [
  {
    id: 0,
    icon: Shield,
    eyebrow: "Safety first",
    label: "LFP Cell Chemistry",
    desc: "Lithium Iron Phosphate — thermally stable at 50°C+, zero thermal runaway risk. Built for Indian summers, not California weather.",
    stat: "6,000+",
    statLabel: "cycle lifetime",
    dotX: "54%",
    dotY: "28%",
    color: "hsl(142 69% 58%)",
  },
  {
    id: 1,
    icon: Zap,
    eyebrow: "Always on",
    label: "10ms Auto-Switchover",
    desc: "Grid drops? You get 10 milliseconds of silence — then clean, seamless power. 200× faster than any diesel generator can start.",
    stat: "10ms",
    statLabel: "transfer time",
    dotX: "72%",
    dotY: "47%",
    color: "hsl(48 96% 53%)",
  },
  {
    id: 2,
    icon: Brain,
    eyebrow: "Intelligent",
    label: "Smart Energy Brain",
    desc: "Learns your solar curve, tariff schedule, and usage patterns. Charges cheap. Discharges smart. Optimises every rupee automatically.",
    stat: "5M+",
    statLabel: "data points analysed",
    dotX: "38%",
    dotY: "63%",
    color: "hsl(210 100% 66%)",
  },
  {
    id: 3,
    icon: Award,
    eyebrow: "Real protection",
    label: "10-Year True Warranty",
    desc: "Not limited. Not pro-rated. Full coverage on capacity, performance, and parts — for a full decade. Read the actual terms.",
    stat: "10 years",
    statLabel: "full coverage",
    dotX: "58%",
    dotY: "80%",
    color: "hsl(280 80% 70%)",
  },
] as const;

function MobileShowcase() {
  return (
    <section className="bg-charcoal py-24 sm:py-32 px-6" aria-label="Product features">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-energy text-xs uppercase tracking-[0.2em] mb-4">What's inside</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-pearl tracking-tight leading-tight">
            Engineered for<br />
            <span className="text-gradient-energy">one job.</span>
          </h2>
        </div>

        <div className="relative mb-16">
          <WebPImage
            src={nessProProduct}
            alt="NESS home battery system"
            className="w-full max-w-xs mx-auto h-auto"
            priority={false}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 40% at 50% 80%, hsl(142 69% 58% / 0.08), transparent)" }}
          />
        </div>

        <div className="space-y-10">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex gap-5"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${f.color}18`, border: `1px solid ${f.color}30` }}
                >
                  <Icon className="w-5 h-5" style={{ color: f.color }} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest mb-1 font-medium" style={{ color: f.color }}>
                    {f.eyebrow}
                  </p>
                  <h3 className="font-display font-semibold text-xl text-pearl mb-2">{f.label}</h3>
                  <p className="text-pearl/50 text-sm leading-relaxed">{f.desc}</p>
                  <p className="mt-3 font-display font-bold text-2xl" style={{ color: f.color }}>
                    {f.stat}{" "}
                    <span className="text-sm font-normal text-pearl/30">{f.statLabel}</span>
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Link to="/homeowners">
            <Button
              size="lg"
              className="font-display bg-energy hover:bg-energy-bright text-charcoal font-semibold px-10 py-5 rounded-full"
            >
              Own Your Energy <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function DesktopShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Per-feature opacity
  const f0Opacity = useTransform(scrollYProgress, [0, 0.05, 0.20, 0.28], [1, 1, 1, 0]);
  const f1Opacity = useTransform(scrollYProgress, [0.20, 0.28, 0.45, 0.53], [0, 1, 1, 0]);
  const f2Opacity = useTransform(scrollYProgress, [0.45, 0.53, 0.70, 0.78], [0, 1, 1, 0]);
  const f3Opacity = useTransform(scrollYProgress, [0.70, 0.78, 0.95, 1.0], [0, 1, 1, 1]);

  // Per-feature Y slide
  const f0Y = useTransform(scrollYProgress, [0, 0.05, 0.20, 0.28], ["0px", "0px", "0px", "-28px"]);
  const f1Y = useTransform(scrollYProgress, [0.20, 0.28, 0.45, 0.53], ["28px", "0px", "0px", "-28px"]);
  const f2Y = useTransform(scrollYProgress, [0.45, 0.53, 0.70, 0.78], ["28px", "0px", "0px", "-28px"]);
  const f3Y = useTransform(scrollYProgress, [0.70, 0.78, 0.95, 1.0], ["28px", "0px", "0px", "0px"]);

  // Hotspot dot scales
  const dot0Scale = useTransform(scrollYProgress, [0, 0.05, 0.22, 0.28], [1.4, 1.4, 1.4, 0.7]);
  const dot1Scale = useTransform(scrollYProgress, [0.22, 0.28, 0.47, 0.53], [0.7, 1.4, 1.4, 0.7]);
  const dot2Scale = useTransform(scrollYProgress, [0.47, 0.53, 0.70, 0.78], [0.7, 1.4, 1.4, 0.7]);
  const dot3Scale = useTransform(scrollYProgress, [0.70, 0.78, 0.95, 1.0], [0.7, 1.4, 1.4, 1.4]);

  // Nav dot dimensions (width pills)
  const nav0W = useTransform(scrollYProgress, [0, 0.05, 0.23, 0.25], [24, 24, 24, 6]);
  const nav1W = useTransform(scrollYProgress, [0.23, 0.28, 0.48, 0.53], [6, 24, 24, 6]);
  const nav2W = useTransform(scrollYProgress, [0.48, 0.53, 0.70, 0.78], [6, 24, 24, 6]);
  const nav3W = useTransform(scrollYProgress, [0.70, 0.78, 0.95, 1.0], [6, 24, 24, 24]);

  // Nav dot opacities
  const nav0O = useTransform(scrollYProgress, [0, 0.23, 0.25], [1, 1, 0.35]);
  const nav1O = useTransform(scrollYProgress, [0.23, 0.28, 0.48, 0.53], [0.35, 1, 1, 0.35]);
  const nav2O = useTransform(scrollYProgress, [0.48, 0.53, 0.70, 0.78], [0.35, 1, 1, 0.35]);
  const nav3O = useTransform(scrollYProgress, [0.70, 0.78, 1.0], [0.35, 1, 1]);

  // Image subtle parallax
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

  // Progress bar
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const featureOpacities = [f0Opacity, f1Opacity, f2Opacity, f3Opacity];
  const featureYs = [f0Y, f1Y, f2Y, f3Y];
  const dotScales = [dot0Scale, dot1Scale, dot2Scale, dot3Scale];
  const navWidths = [nav0W, nav1W, nav2W, nav3W];
  const navOpacities = [nav0O, nav1O, nav2O, nav3O];

  return (
    <div
      ref={containerRef}
      className="relative bg-charcoal"
      style={{ height: "500vh" }}
      aria-label="Product feature showcase"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        {/* Top progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-pearl/5 z-20">
          <motion.div className="h-full bg-energy" style={{ width: progressWidth }} />
        </div>

        {/* Ambient background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 30% 60%, hsl(142 50% 20% / 0.06), transparent), radial-gradient(ellipse 50% 40% at 80% 40%, hsl(210 80% 20% / 0.05), transparent)",
          }}
        />

        {/* Header */}
        <div className="relative z-10 pt-10 pb-4 text-center">
          <p className="text-energy text-xs uppercase tracking-[0.2em] mb-2">What's inside</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-pearl tracking-tight">
            Engineered for{" "}
            <span className="text-gradient-energy">one job.</span>
          </h2>
        </div>

        {/* Main content */}
        <div className="flex-1 flex items-center relative z-10">
          <div className="w-full max-w-7xl mx-auto px-8 lg:px-16 grid grid-cols-2 gap-8 lg:gap-20 items-center">

            {/* LEFT — product image with hotspots */}
            <div className="relative flex items-center justify-center">
              <motion.div className="relative w-full max-w-xs lg:max-w-sm mx-auto" style={{ y: imageY }}>
                <WebPImage
                  src={nessProProduct}
                  alt="NESS home battery system — interactive feature tour"
                  className="w-full h-auto drop-shadow-2xl"
                  priority={false}
                />

                {/* Ground glow */}
                <div
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 rounded-full blur-3xl opacity-30"
                  style={{ background: "hsl(142 69% 40%)" }}
                />

                {/* Hotspot dots */}
                {FEATURES.map((f, i) => (
                  <motion.div
                    key={f.id}
                    className="absolute"
                    style={{
                      left: f.dotX,
                      top: f.dotY,
                      transform: "translate(-50%, -50%)",
                      scale: dotScales[i],
                    }}
                  >
                    {/* Ping ring */}
                    <motion.div
                      className="absolute rounded-full"
                      style={{
                        width: 12,
                        height: 12,
                        background: f.color,
                        opacity: featureOpacities[i],
                        top: "50%",
                        left: "50%",
                        x: "-50%",
                        y: "-50%",
                      }}
                      animate={{ scale: [1, 2.8], opacity: [0.7, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    />
                    {/* Dot */}
                    <div
                      className="relative w-3 h-3 rounded-full border-2 border-charcoal shadow-lg"
                      style={{ background: f.color }}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Scroll hint */}
              <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-pearl/25 text-xs select-none"
                style={{ opacity: f0Opacity }}
              >
                <ChevronDown className="w-4 h-4 animate-bounce" aria-hidden="true" />
                <span>scroll to explore</span>
              </motion.div>
            </div>

            {/* RIGHT — feature text */}
            <div className="relative h-72 lg:h-80">
              {FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.id}
                    className="absolute inset-0 flex flex-col justify-center"
                    style={{ opacity: featureOpacities[i], y: featureYs[i] }}
                  >
                    <p
                      className="text-xs uppercase tracking-[0.2em] mb-3 font-medium flex items-center gap-2"
                      style={{ color: f.color }}
                    >
                      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                      {f.eyebrow}
                    </p>

                    <h3 className="font-display text-3xl lg:text-4xl xl:text-[2.75rem] font-bold text-pearl leading-tight mb-4 tracking-tight">
                      {f.label}
                    </h3>

                    <p className="text-pearl/50 text-base lg:text-lg font-light leading-relaxed max-w-md mb-7">
                      {f.desc}
                    </p>

                    <div
                      className="inline-flex items-baseline gap-2 px-5 py-3 rounded-2xl self-start"
                      style={{
                        background: `${f.color}10`,
                        border: `1px solid ${f.color}22`,
                      }}
                    >
                      <span
                        className="font-display font-bold text-3xl lg:text-4xl"
                        style={{ color: f.color }}
                      >
                        {f.stat}
                      </span>
                      <span className="text-pearl/35 text-sm">{f.statLabel}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Nav dots — bottom */}
        <div className="pb-8 flex items-center justify-center gap-2 relative z-10">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.id}
              className="h-1.5 rounded-full"
              style={{
                background: f.color,
                width: navWidths[i],
                opacity: navOpacities[i],
              }}
            />
          ))}
        </div>
      </div>

      {/* Post-scroll CTA block at very bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-screen flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30%" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-pearl/30 text-sm mb-6 uppercase tracking-widest">Ready?</p>
          <Link to="/homeowners">
            <Button
              size="lg"
              className="font-display bg-energy hover:bg-energy-bright text-charcoal font-semibold px-14 py-7 text-xl rounded-full shadow-2xl shadow-energy/20 hover:shadow-energy/40 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Own Your Energy
              <ArrowRight className="ml-3 w-5 h-5" aria-hidden="true" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export function ScrollProductShowcase() {
  const isMobile = useIsMobile();
  if (isMobile) return <MobileShowcase />;
  return <DesktopShowcase />;
}

export default ScrollProductShowcase;

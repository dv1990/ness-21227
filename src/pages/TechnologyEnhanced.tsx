import Layout from "@/components/Layout";
import { MagneticButton } from "@/components/EnhancedInteractions";
import { ArrowRight, Award, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { WebPImage } from "@/components/ui/webp-image";
import { WhyNess } from "@/components/WhyNess";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Battery3D } from "@/components/ui/battery-3d";
import { AnimatedCard } from "@/components/ui/animated-card";
import { LiveTicker } from "@/components/ui/live-ticker";

// Import images
import batteryTechnology from "@/assets-webp/battery-technology.webp";
import rdLaboratory from "@/assets/rd-laboratory.jpg";
import systemArchitecture from "@/assets/system-architecture.jpg";
import nucuPcb from "@/assets/nucu-pcb-premium.webp";
import NucuSection from "@/components/NucuSection";

const TechnologyEnhanced = () => {

  return (
    <Layout className="-mt-16">
      {/* Hero - Precision Engineering */}
      <section className="min-h-screen bg-background flex items-center">
        
        <div className="max-w-[1280px] mx-auto px-8 py-24 w-full">
          <div className="text-center space-y-12">
            
            {/* Eyebrow */}
            <div className="text-caption text-muted-foreground uppercase tracking-[0.12em] font-medium">
              Battery Systems
            </div>
            
            {/* Headline */}
            <h1 className="text-display-large md:text-[8rem] font-light text-foreground leading-[0.9] tracking-[-0.04em]">
              Your family
              <br />
              deserves better.
            </h1>

            {/* Core Stats - Animated Numbers */}
            <div className="max-w-5xl mx-auto pt-16 pb-8">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
                <div className="space-y-2">
                  <div className="text-6xl font-light text-primary tabular-nums">
                    <AnimatedCounter value={6000} duration={2500} />
                  </div>
                  <div className="text-caption text-muted-foreground uppercase tracking-[0.08em]">
                    Cycle Life
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-6xl font-light text-foreground tabular-nums">
                    <AnimatedCounter value={15} duration={2000} />
                  </div>
                  <div className="text-caption text-muted-foreground uppercase tracking-[0.08em]">
                    Year Warranty
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-6xl font-light text-foreground tabular-nums">
                    {"<"}<AnimatedCounter value={35} duration={1500} />
                  </div>
                  <div className="text-caption text-muted-foreground uppercase tracking-[0.08em]">
                    dB Noise
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-6xl font-light text-primary tabular-nums">
                    0
                  </div>
                  <div className="text-caption text-muted-foreground uppercase tracking-[0.08em]">
                    Fire Events
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-5xl md:text-6xl font-light text-primary tabular-nums">
                    <AnimatedCounter value={25000} duration={2500} suffix="+" />
                  </div>
                  <div className="text-caption text-muted-foreground uppercase tracking-[0.08em]">
                    Cycles Proven
                  </div>
                </div>
              </div>
            </div>
            
            {/* 3D Battery Visualization */}
            <div className="max-w-4xl mx-auto pt-16">
              <div className="rounded-2xl overflow-hidden bg-muted/5 border border-border/50">
                <Battery3D view="pack" className="h-[400px]" />
              </div>
            </div>

            {/* Direct statement */}
            <p className="text-body-large text-muted-foreground max-w-3xl mx-auto leading-relaxed font-normal">
              It just works. Safely. Silently. Always.
            </p>

            {/* CTA */}
            <div className="pt-4">
              <Link to="/contact/homeowner">
                <MagneticButton variant="primary" size="lg" className="text-base font-medium px-10 py-5">
                  See How We Keep You Safe
                </MagneticButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Technology - Engineering Focus */}
      <section className="py-32 bg-background">
        <div className="max-w-[1280px] mx-auto px-8">
          
          <div className="text-center mb-24 space-y-6">
            <h2 className="text-display font-light text-foreground leading-tight tracking-[-0.03em]">
              Three promises we keep.
            </h2>
            <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
              To every homeowner. Every installer. Every night.
            </p>
          </div>

          {/* Decision 1: Chemistry */}
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            <div className="space-y-8">
              <div className="inline-block px-5 py-1.5 bg-primary/10 rounded-full">
                <span className="text-caption text-primary uppercase tracking-[0.08em]">Safety First</span>
              </div>
              <h3 className="text-display-medium font-light text-foreground leading-tight tracking-[-0.02em]">
                It won't catch fire.
              </h3>
              <p className="text-body-large text-muted-foreground leading-relaxed">
                LiFePO₄ chemistry. Thermally stable to 600°C.
                <br />
                Zero fire events. Ever.
              </p>
              <div className="pt-6 space-y-3 border-t border-border">
                <div className="flex items-baseline gap-3">
                  <div className="text-5xl font-light text-foreground tabular-nums">
                    <AnimatedCounter value={6000} duration={2500} />
                  </div>
                  <div className="text-body text-muted-foreground">cycles at 80% DoD</div>
                </div>
                <div className="flex items-baseline gap-3">
                  <div className="text-5xl font-light text-primary tabular-nums">0</div>
                  <div className="text-body text-muted-foreground">thermal events recorded</div>
                </div>
              </div>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden">
              <WebPImage
                src={batteryTechnology}
                alt="LiFePO4 cell testing"
                className="w-full"
                priority={false}
              />
            </div>
          </div>

          {/* Decision 2: Manufacturing */}
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            <div className="relative rounded-2xl overflow-hidden order-2 lg:order-1">
            <WebPImage
                src={rdLaboratory}
                alt="Manufacturing process"
                className="w-full"
                priority={false}
              />
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              <div className="inline-block px-5 py-1.5 bg-primary/10 rounded-full">
                <span className="text-caption text-primary uppercase tracking-[0.08em]">Obsessive Matching</span>
              </div>
              <h3 className="text-display-medium font-light text-foreground leading-tight tracking-[-0.02em]">
                Every cell knows its partner.
              </h3>
              <p className="text-body-large text-muted-foreground leading-relaxed">
                Cells matched within 2 millivolts.
                <br />
                Seven quality checks. Every unit.
                <br />
                Your battery will thank you in year 10.
              </p>
              <div className="pt-6 space-y-3 border-t border-border">
                <div className="flex items-baseline gap-3">
                  <div className="text-5xl font-light text-primary tabular-nums">
                    ±<AnimatedCounter value={2} duration={1500} />mV
                  </div>
                  <div className="text-body text-muted-foreground">matching precision</div>
                </div>
                <div className="flex items-baseline gap-3">
                  <div className="text-5xl font-light text-foreground tabular-nums">
                    <AnimatedCounter value={100} duration={2000} />%
                  </div>
                  <div className="text-body text-muted-foreground">functional test rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Decision 3: Nunam Intelligence */}
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-block px-5 py-1.5 bg-primary/10 rounded-full">
                <span className="text-caption text-primary uppercase tracking-[0.08em]">Nunam Intelligence</span>
              </div>
              <h3 className="text-display-medium font-light text-foreground leading-tight tracking-[-0.02em]">
                The brain that never sleeps.
              </h3>
              <p className="text-body-large text-muted-foreground leading-relaxed">
                17,280 checks per day. Every cell. Every 5 seconds.
                <br />
                Predicting problems before they happen.
                <br />
                You sleep. Nunam watches.
              </p>
              <div className="pt-6 space-y-3 border-t border-border">
                <div className="flex items-baseline gap-3">
                  <div className="text-5xl font-light text-primary tabular-nums">
                    <AnimatedCounter value={17280} duration={2500} />
                  </div>
                  <div className="text-body text-muted-foreground">health checks per day</div>
                </div>
                <div className="flex items-baseline gap-3">
                  <div className="text-5xl font-light text-foreground tabular-nums">24/7</div>
                  <div className="text-body text-muted-foreground">seamless operation</div>
                </div>
                <div className="flex items-baseline gap-3">
                  <div className="text-5xl font-light text-primary tabular-nums">10+</div>
                  <div className="text-body text-muted-foreground">years of reliability</div>
                </div>
              </div>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden">
              <WebPImage
                src={systemArchitecture}
                alt="System monitoring interface"
                className="w-full"
                priority={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* NUCU - The Brain Behind NESS */}
      <NucuSection nucuPcb={nucuPcb} />

      {/* Live Intelligence - Human Comfort */}
      <section className="py-32 bg-charcoal text-pearl">
        <div className="max-w-[1280px] mx-auto px-8">
          
          <div className="text-center mb-20 space-y-6">
            <div className="inline-block px-5 py-1.5 bg-primary/20 rounded-full mb-4">
              <span className="text-caption text-primary uppercase tracking-[0.08em]">Right Now</span>
            </div>
            <h2 className="text-display font-light leading-tight tracking-[-0.03em]">
              While you read this...
            </h2>
            <p className="text-body-large text-pearl/60 max-w-2xl mx-auto leading-relaxed">
              Thousands of batteries. Working. Learning. Protecting.
            </p>
          </div>

          {/* Live Ticker Stats */}
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <LiveTicker
              label="Data Points Collected"
              startValue={10}
              incrementRate={0.00285} // ~10M data points growing steadily
              suffix="M"
              decimals={3}
              humanMessage="Every heartbeat of every battery. Every cell. Every moment. Stored forever."
              className="text-center"
            />

            <LiveTicker
              label="Energy Delivered"
              startValue={100}
              incrementRate={0.00125} // ~4.5 MWh per hour = 0.00125 per second
              suffix="+ MWh"
              decimals={2}
              humanMessage="That's enough to power 8,400 homes right now. Including yours."
              className="text-center"
            />

            <LiveTicker
              label="Cycles Proven"
              startValue={25000}
              incrementRate={0.042} // growing with each new installation
              suffix="+"
              decimals={0}
              humanMessage="Each one a promise kept. A light that stayed on. A fridge that kept running."
              className="text-center"
            />
          </div>

          {/* Human Context */}
          <div className="max-w-3xl mx-auto text-center pt-12 space-y-8">
            <div className="h-px bg-pearl/10"></div>
            <p className="text-xl md:text-2xl text-pearl/70 font-light leading-relaxed italic">
              "Every battery tells a story.
              <br />
              <span className="text-pearl/50 text-lg not-italic">
                We remember them all.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Trust & Certifications */}
      <section className="py-32 bg-muted/10">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-24 space-y-6">
            <h2 className="text-display font-light text-foreground leading-tight tracking-[-0.03em]">
              Trusted. Tested. Certified.
            </h2>
            <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it.
            </p>
          </div>

          {/* Certifications */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            <AnimatedCard hover="glow" className="p-8 text-center">
              <Award className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h3 className="text-body-large font-medium text-foreground mb-2">
                IEC 62619 Certified
              </h3>
              <p className="text-body text-muted-foreground">
                International safety standards for lithium-ion batteries
              </p>
            </AnimatedCard>

            <AnimatedCard hover="glow" delay={100} className="p-8 text-center">
              <Award className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h3 className="text-body-large font-medium text-foreground mb-2">
                CE Marked
              </h3>
              <p className="text-body text-muted-foreground">
                European conformity for electrical safety
              </p>
            </AnimatedCard>

            <AnimatedCard hover="glow" delay={200} className="p-8 text-center">
              <Award className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h3 className="text-body-large font-medium text-foreground mb-2">
                ISO 9001 Factory
              </h3>
              <p className="text-body text-muted-foreground">
                Quality management system certification
              </p>
            </AnimatedCard>
          </div>

          {/* Customer Testimonials */}
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedCard hover="lift" className="p-10 space-y-6">
              <div className="flex gap-2 text-primary">
                {[...Array(5)].map((_, i) => (
                  <CheckCircle2 key={`tech-rating-1-${i}`} className="w-5 h-5" />
                ))}
              </div>
              <p className="text-body-large text-foreground leading-relaxed italic">
                "Installed 50+ NESS systems. Zero callbacks. My customers sleep better, and so do I."
              </p>
              <div className="text-body text-muted-foreground">
                — Rajesh Kumar, Solar Installer, Mumbai
              </div>
            </AnimatedCard>

            <AnimatedCard hover="lift" delay={100} className="p-10 space-y-6">
              <div className="flex gap-2 text-primary">
                {[...Array(5)].map((_, i) => (
                  <CheckCircle2 key={`tech-rating-2-${i}`} className="w-5 h-5" />
                ))}
              </div>
              <p className="text-body-large text-foreground leading-relaxed italic">
                "Been running for 3 years. Still performs like day one. Worth every rupee."
              </p>
              <div className="text-body text-muted-foreground">
                — Priya Sharma, Homeowner, Bangalore
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* The Secret Recipe - Manufacturing Process */}
      <section className="py-32 bg-background">
        <WhyNess />
      </section>

      {/* For Installers */}
      <section className="py-32 bg-background">
        <div className="max-w-[1280px] mx-auto px-8">
          
          <div className="text-center mb-24 space-y-6">
            <h2 className="text-display font-light text-foreground leading-tight tracking-[-0.03em]">
              For installers who care about sleep.
            </h2>
            <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
              Install it once. Forget about it. No 2am callbacks. Ever.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="space-y-4 text-center">
              <div className="text-7xl font-light text-foreground tabular-nums">
                <AnimatedCounter value={2} duration={1500} />-<AnimatedCounter value={4} duration={1500} />h
              </div>
              <div className="text-caption text-muted-foreground uppercase tracking-[0.08em]">
                Install Time
              </div>
              <p className="text-body text-muted-foreground pt-2 leading-relaxed">
                Plug and play. Like it should be.
              </p>
            </div>

            <div className="space-y-4 text-center">
              <div className="text-7xl font-light text-primary tabular-nums">
                <AnimatedCounter value={99} duration={2000} />%
              </div>
              <div className="text-caption text-muted-foreground uppercase tracking-[0.08em]">
                First-Time Success
              </div>
              <p className="text-body text-muted-foreground pt-2 leading-relaxed">
                Because we actually test our products.
              </p>
            </div>

            <div className="space-y-4 text-center">
              <div className="text-7xl font-light text-foreground tabular-nums">
                {"<"}<AnimatedCounter value={1} duration={1500} />%
              </div>
              <div className="text-caption text-muted-foreground uppercase tracking-[0.08em]">
                Callback Rate
              </div>
              <p className="text-body text-muted-foreground pt-2 leading-relaxed">
                Your phone won't ring at midnight.
              </p>
            </div>
          </div>

          <div className="text-center pt-8">
            <Link to="/installers">
              <MagneticButton variant="secondary" size="lg" className="text-base font-medium px-10 py-5">
                Join Our Network
              </MagneticButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-muted/5">
        <div className="max-w-[1280px] mx-auto px-8 text-center">
          <div className="space-y-16">
            
            <div className="space-y-8">
              <h2 className="text-display font-light text-foreground leading-tight tracking-[-0.03em]">
                Want to know more?
              </h2>
              
              <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
                Let's talk. Real people. Real answers. No jargon.
              </p>
            </div>

            <Link to="/contact/homeowner">
              <MagneticButton variant="primary" size="lg" className="text-base font-medium px-10 py-5">
                Talk to Us
                <ArrowRight className="ml-2 w-4 h-4" />
              </MagneticButton>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TechnologyEnhanced;

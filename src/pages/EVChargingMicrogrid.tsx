import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PerformanceImage } from '@/components/ui/performance-image';
import heroImage from '@/assets/ev-hero-sunrise.webp';

const EVChargingMicrogrid = () => {
  const [stickyNav, setStickyNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setStickyNav(window.scrollY > 600);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout>
      {/* Minimal Sticky Nav */}
      <div className={cn(
        "fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border/50 transition-all duration-700",
        stickyNav ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      )}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-sm tracking-wide text-foreground">NESS MICROGRID</span>
          <div className="flex gap-6">
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm tracking-wide text-foreground hover:opacity-60 transition-opacity"
            >
              Contact
            </button>
          </div>
        </div>
      </div>

      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <DeploymentsSection />
      <ImpactSection />
      <UseCasesSection />
      <FinalSection />
    </Layout>
  );
};

// Hero Section
const HeroSection = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
  }, []);

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <PerformanceImage
          src={heroImage}
          alt="NESS Battery Energy Storage System"
          className="w-full h-full"
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 sm:px-12 relative z-10">
        <div className={cn(
          "max-w-5xl transition-all duration-1000 ease-out",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight text-primary-foreground mb-12 leading-[0.95] tracking-tight">
            Never lose<br />
            a customer to<br />
            a grid failure.
          </h1>

          <p className="text-xl sm:text-2xl text-primary-foreground/80 max-w-2xl mb-16 leading-relaxed font-light tracking-wide">
            24×7 EV charging powered by open-access solar and NESS batteries.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <Button 
              size="lg"
              variant="hero"
              className="px-12 py-7 text-base rounded-none"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started
            </Button>
          </div>

          {/* Minimal 24x7 Indicator */}
          <div className="mt-20 flex items-center gap-8 text-primary-foreground/60 text-sm tracking-widest uppercase">
            <span>24 Hours</span>
            <div className="h-px w-12 bg-primary-foreground/20" />
            <span>7 Days</span>
            <div className="h-px w-12 bg-primary-foreground/20" />
            <span>Zero Downtime</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Problem Section
const ProblemSection = () => {
  return (
    <section className="py-32 md:py-48 bg-background">
      <div className="container mx-auto px-6 sm:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-extralight mb-20 leading-tight text-foreground">
            When the grid fails
          </h2>

          <div className="space-y-1 border-t border-border/50">
            {[
              { title: 'Grid downtime', subtitle: 'Lost revenue every minute offline' },
              { title: 'Peak demand charges', subtitle: 'Heavy bills during charging hours' },
              { title: 'Unreliable power', subtitle: 'Damaged reputation and lost customers' }
            ].map((item, i) => (
              <div 
                key={i}
                className="group py-8 border-b border-border/50 transition-colors hover:bg-muted/30"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h3 className="text-2xl sm:text-3xl font-light text-foreground">{item.title}</h3>
                  <p className="text-base text-muted-foreground sm:text-right max-w-md">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Solution Section
const SolutionSection = () => {
  return (
    <section className="py-32 md:py-48 bg-muted/20">
      <div className="container mx-auto px-6 sm:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-extralight mb-12 leading-tight text-foreground">
            Power that's yours
          </h2>
          
          <p className="text-xl sm:text-2xl text-muted-foreground mb-24 max-w-3xl font-light leading-relaxed">
            NESS Microgrid combines open-access solar with battery storage and smart control—cutting costs, eliminating downtime, and ensuring reliable operation.
          </p>

          {/* Clean Flow */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/50">
            {['Solar', 'Battery', 'Charger', 'Vehicle'].map((item, i) => (
              <div key={i} className="bg-card p-12 flex items-center justify-center">
                <span className="text-xl font-light tracking-wide text-foreground">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-sm tracking-widest uppercase text-muted-foreground/60">
              Grid-tied for backup & export
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Deployments Section
const DeploymentsSection = () => {
  return (
    <section className="py-32 md:py-48 bg-background">
      <div className="container mx-auto px-6 sm:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-extralight mb-8 leading-tight text-foreground">
            Proven where<br />uptime matters most
          </h2>

          <div className="grid md:grid-cols-2 gap-px bg-border/50 mt-20">
            <div className="bg-card p-12">
              <div className="mb-8">
                <h3 className="text-3xl font-light mb-2 text-foreground">Bangalore Airport</h3>
                <p className="text-sm text-muted-foreground/60 tracking-wide">KARNATAKA</p>
              </div>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                24×7 solar-assisted EV charging, keeping operations uninterrupted through grid fluctuations.
              </p>
              <div className="flex gap-8 text-sm tracking-widest uppercase text-muted-foreground/60">
                <span>24×7</span>
                <span>High-load</span>
                <span>Mission-critical</span>
              </div>
            </div>

            <div className="bg-card p-12">
              <div className="mb-8">
                <h3 className="text-3xl font-light mb-2 text-foreground">Surat Bus Depot</h3>
                <p className="text-sm text-muted-foreground/60 tracking-wide">GUJARAT (GSRTC)</p>
              </div>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Renewable micro-grid for public e-bus charging, reducing diesel backup use to zero.
              </p>
              <div className="flex gap-8 text-sm tracking-widest uppercase text-muted-foreground/60">
                <span>Zero diesel</span>
                <span>Fleet charging</span>
                <span>Public transport</span>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-20 grid grid-cols-3 gap-px bg-border/50">
            <div className="bg-card p-12 text-center">
              <div className="text-5xl font-extralight mb-2 text-foreground">99.9%</div>
              <div className="text-sm tracking-wide text-muted-foreground">Uptime</div>
            </div>
            <div className="bg-card p-12 text-center">
              <div className="text-5xl font-extralight mb-2 text-foreground">−40%</div>
              <div className="text-sm tracking-wide text-muted-foreground">OPEX</div>
            </div>
            <div className="bg-card p-12 text-center">
              <div className="text-5xl font-extralight mb-2 text-foreground">0 L</div>
              <div className="text-sm tracking-wide text-muted-foreground">Diesel</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Impact Section
const ImpactSection = () => {
  return (
    <section className="py-32 md:py-48 bg-muted/20">
      <div className="container mx-auto px-6 sm:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-extralight mb-20 leading-tight text-foreground">
            Numbers that matter
          </h2>

          <div className="space-y-1 border-t border-border/50">
            {[
              { metric: 'Energy Cost', improvement: '↓ 25–40%' },
              { metric: 'Demand Charges', improvement: '↓ 40–60%' },
              { metric: 'CO₂ Emissions', improvement: '↓ 90–100%' },
              { metric: 'Uptime', improvement: '99.9%' },
              { metric: 'ROI Period', improvement: '2–4 years' }
            ].map((item, i) => (
              <div 
                key={i}
                className="py-8 border-b border-border/50 flex justify-between items-center"
              >
                <span className="text-xl sm:text-2xl font-light text-foreground">{item.metric}</span>
                <span className="text-2xl sm:text-3xl font-light text-foreground">{item.improvement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Use Cases Section
const UseCasesSection = () => {
  return (
    <section className="py-32 md:py-48 bg-background">
      <div className="container mx-auto px-6 sm:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-extralight mb-12 leading-tight text-foreground">
            Designed for those<br />who keep India's<br />EV movement running
          </h2>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-border/50">
            {['Fleet Depots', 'Bus Depots', 'Highways', 'Airports', 'Industrial Yards'].map((item, i) => (
              <div 
                key={i}
                className="bg-card p-12 flex items-center justify-center text-center hover:bg-muted/30 transition-colors"
              >
                <span className="text-base font-light tracking-wide text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Final Section
const FinalSection = () => {
  return (
    <section id="contact" className="py-48 md:py-64 bg-charcoal text-primary-foreground">
      <div className="container mx-auto px-6 sm:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl sm:text-7xl md:text-8xl font-extralight mb-16 leading-tight">
            Be the network<br />that never shuts down
          </h2>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg"
              variant="hero-glass"
              className="px-12 py-7 text-base rounded-none transition-all"
              onClick={() => window.location.href = '/contact/distributor'}
            >
              Get in Touch
            </Button>
          </div>

          <div className="mt-20 pt-20 border-t border-primary-foreground/10">
            <p className="text-sm tracking-widest uppercase text-primary-foreground/40">
              Trusted by Bangalore International Airport · Surat Bus Depot (GSRTC)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EVChargingMicrogrid;

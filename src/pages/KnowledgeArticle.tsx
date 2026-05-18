import React from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowLeft, Share2, Bookmark, CheckCircle, XCircle, Zap, Battery, Sun, TrendingUp, Shield, AlertTriangle, Star, ArrowRight, Calculator, Lightbulb, Fan, Wifi, Smartphone, Refrigerator, AirVent, Droplets, Car, Crown, Sparkles, Home, Building2, Gauge, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

// Editorial helper components — reusable across article bodies.
const Rule = () => (
  <div className="flex justify-center my-12 sm:my-16" aria-hidden>
    <span className="font-display text-2xl text-muted-foreground tracking-[1em] pl-[1em]">⁂</span>
  </div>
);

const PullQuote = ({ children, attribution }: { children: React.ReactNode; attribution?: string }) => (
  <blockquote className="my-12 sm:my-16 relative">
    <span className="hidden lg:block absolute -left-12 top-0 font-display text-7xl leading-none text-energy/60 select-none">“</span>
    <p className="font-display italic font-light text-3xl sm:text-5xl text-foreground leading-[1.05] tracking-[-0.02em]">
      {children}
    </p>
    {attribution && (
      <footer className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        — {attribution}
      </footer>
    )}
  </blockquote>
);

// Drop-cap wrapper for the first paragraph of any section.
const dropCap =
  "first-letter:float-left first-letter:font-display first-letter:font-bold first-letter:text-7xl sm:first-letter:text-8xl first-letter:leading-[0.85] first-letter:mr-3 first-letter:mt-1 first-letter:text-foreground";

// Import images - using optimized WebP versions
import familyEnergyLifestyle from "@/assets-webp/family-energy-lifestyle.webp";
import batteryTechnology from "@/assets-webp/battery-technology.webp";
import greenFutureCity from "@/assets-webp/green-future-city.webp";
import nessPodProduct from "@/assets-webp/ness-pod-product.webp";
import nessCubeProduct from "@/assets-webp/ness-cube-product.webp";
import nessProProduct from "@/assets-webp/ness-pro-product.webp";
import commercialComplex from "@/assets-webp/commercial-complex.webp";
import evCharging from "@/assets-webp/ev-charging.webp";

// Article content data
const articleContent: Record<string, {
  number: string;
  category: string;
  title: string;
  subtitle: string;
  readTime: string;
  date: string;
  byline: string;
  heroImage: string;
  content: React.ReactNode;
}> = {
  "why-solar-battery": {
    number: "01",
    category: "Essay · Energy Economics",
    title: "Why adopt solar and battery now",
    subtitle: "Rising tariffs, an unreliable grid, and the quiet collapse of the old electricity contract. A case for the only setup that pays for itself before it pays you back.",
    readTime: "8 min read",
    date: "May 2026",
    byline: "The Editors",
    heroImage: familyEnergyLifestyle,
    content: <WhySolarBatteryContent />
  },
  "product-guide": {
    number: "02",
    category: "Field Guide · Selection",
    title: "How to choose the right product",
    subtitle: "A three-question framework — usage, loads, duration — that replaces the catalogue with a conversation.",
    readTime: "6 min read",
    date: "May 2026",
    byline: "Engineering Desk",
    heroImage: batteryTechnology,
    content: <ProductGuideContent />
  },
  "calculator": {
    number: "03",
    category: "Interactive · Finance",
    title: "Your savings calculator",
    subtitle: "Bills, payback periods, tariff drift, the cost of carbon. Plug in your numbers; the page does the arithmetic.",
    readTime: "Interactive",
    date: "May 2026",
    byline: "Numbers Desk",
    heroImage: greenFutureCity,
    content: <CalculatorContent />
  },
  "all-in-one": {
    number: "04",
    category: "Argument · Systems Design",
    title: "Why all-in-one wins",
    subtitle: "Fifty percent of failures begin where two vendors meet. The case for one box, one warranty, one phone number.",
    readTime: "5 min read",
    date: "May 2026",
    byline: "The Editors",
    heroImage: commercialComplex,
    content: <AllInOneContent />
  },
  "hybrid-installation": {
    number: "05",
    category: "Manual · Procedure",
    title: "Hybrid installation, simplified",
    subtitle: "Six steps from rooftop survey to handover. Time estimates, common pitfalls, what to label.",
    readTime: "10 min read",
    date: "May 2026",
    byline: "Field Operations",
    heroImage: evCharging,
    content: <HybridInstallationContent />
  },
  "best-practices": {
    number: "06",
    category: "Notes · Craft",
    title: "Do's and don'ts on site",
    subtitle: "What the warranty claims tell us. Five things that protect the install; five that quietly destroy it.",
    readTime: "7 min read",
    date: "May 2026",
    byline: "Field Operations",
    heroImage: batteryTechnology,
    content: <BestPracticesContent />
  }
};

// Why Solar + Battery Content
function WhySolarBatteryContent() {
  return (
    <div className="space-y-12">
      {/* The Hook */}
      <section className="space-y-6">
        <p className="text-xl sm:text-2xl text-foreground font-medium leading-relaxed">
          Let me ask you something: <span className="text-energy">How much did you pay for electricity last year?</span>
        </p>
        <p className="text-body-large text-muted-foreground leading-relaxed">
          If you're like most Indian homeowners, the answer probably made you wince. Between rising tariffs, 
          unexpected power cuts, and the constant hum of your inverter, electricity has become one of your 
          biggest household headaches.
        </p>
        <p className="text-body-large text-muted-foreground leading-relaxed">
          But here's what most people don't realize: <strong className="text-foreground">the solution isn't just solar panels.</strong> 
          It's solar + battery. And 2024 is the year everything changed.
        </p>
      </section>

      {/* Visual Stat Box */}
      <div className="glass-card-accent rounded-3xl p-8 sm:p-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl sm:text-5xl font-bold text-energy mb-2">₹15+</p>
            <p className="text-muted-foreground">per unit electricity cost by 2026</p>
          </div>
          <div>
            <p className="text-4xl sm:text-5xl font-bold text-foreground mb-2">300+</p>
            <p className="text-muted-foreground">hours of power cuts yearly (avg)</p>
          </div>
          <div>
            <p className="text-4xl sm:text-5xl font-bold text-energy mb-2">40%</p>
            <p className="text-muted-foreground">battery cost drop since 2020</p>
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">The Problem: Solar Alone Isn't Enough</h2>
        
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">The 6 PM Problem</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your solar panels generate maximum power between 10 AM and 4 PM. But when do you actually 
                use the most electricity? <strong className="text-foreground">6 PM to 11 PM</strong> — exactly when solar stops working.
                Without batteries, you're still paying peak rates when it matters most.
              </p>
            </div>
          </div>
        </div>

        <p className="text-body-large text-muted-foreground leading-relaxed">
          Traditional solar setups export excess daytime power to the grid (if you're lucky enough to have 
          net metering). But here's the catch: utilities pay you ₹2-3 per unit and charge you ₹8-12 per unit 
          during peak hours. <span className="text-energy font-semibold">That's a 4x loss.</span>
        </p>
      </section>

      {/* Solution Section */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">The Solution: Store It, Use It, Save It</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card-light rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="w-14 h-14 bg-energy/20 rounded-2xl flex items-center justify-center">
              <Sun className="w-7 h-7 text-energy" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Daytime: Generate & Store</h3>
            <p className="text-muted-foreground leading-relaxed">
              Your solar panels soak up the sun while you're at work. Instead of exporting that energy 
              for pennies, batteries store it for when you actually need it.
            </p>
          </div>
          
          <div className="glass-card-light rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="w-14 h-14 bg-energy/20 rounded-2xl flex items-center justify-center">
              <Battery className="w-7 h-7 text-energy" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Evening: Power Your Life</h3>
            <p className="text-muted-foreground leading-relaxed">
              Come home to a fully powered house. Run your AC, cook dinner, charge devices — all from 
              stored solar energy. Zero grid dependency during peak hours.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Checklist */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">What You Actually Get</h2>
        
        <div className="space-y-4">
          {[
            { text: "Power through outages — no more generator noise or diesel costs", icon: Shield },
            { text: "Cut electricity bills by 70-90% — use your own stored energy", icon: TrendingUp },
            { text: "Hedge against rising tariffs — lock in your energy costs today", icon: Zap },
            { text: "Increase property value — solar homes sell for 4% more", icon: Star },
            { text: "Reduce carbon footprint — 3-4 tons of CO₂ saved annually", icon: CheckCircle },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors">
              <div className="w-10 h-10 bg-energy/20 rounded-full flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-energy" />
              </div>
              <p className="text-body-large text-foreground pt-1.5">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Now Section */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">Why 2024 is the Perfect Time</h2>
        
        <div className="bg-gradient-to-br from-energy/10 to-transparent rounded-3xl p-8 sm:p-10 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-energy font-semibold text-lg">Battery Prices Crashed</p>
              <p className="text-muted-foreground">LFP batteries are 40% cheaper than 2020. The ROI has never been better.</p>
            </div>
            <div className="space-y-2">
              <p className="text-energy font-semibold text-lg">Technology Matured</p>
              <p className="text-muted-foreground">10-year warranties are standard. Systems last 15-25 years with minimal maintenance.</p>
            </div>
            <div className="space-y-2">
              <p className="text-energy font-semibold text-lg">Grid Getting Worse</p>
              <p className="text-muted-foreground">Load shedding is increasing. Energy independence isn't a luxury — it's insurance.</p>
            </div>
            <div className="space-y-2">
              <p className="text-energy font-semibold text-lg">Subsidies Available</p>
              <p className="text-muted-foreground">Government schemes can reduce upfront costs by 20-40%. These won't last forever.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="glass-card rounded-3xl p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">Ready to See Your Savings?</h2>
        <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
          Use our calculator to see exactly how much you could save based on your current electricity usage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/knowledge/calculator">
            <Button size="lg" className="min-h-[56px] px-8 text-lg bg-energy hover:bg-energy/90 text-charcoal">
              <Calculator className="w-5 h-5 mr-2" />
              Calculate My Savings
            </Button>
          </Link>
          <Link to="/knowledge/product-guide">
            <Button size="lg" variant="outline" className="min-h-[56px] px-8 text-lg">
              Find the Right Product
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

// Product Guide Content
function ProductGuideContent() {
  const [activeStep, setActiveStep] = React.useState(1);
  
  const products = [
    {
      name: "NESS Pod",
      image: nessPodProduct,
      capacity: "5-10 kWh",
      bestFor: "1-2 BHK apartments, small families",
      features: ["Compact design", "Wall-mounted", "Perfect for essentials"],
      price: "₹2.5-4L",
      icon: Home,
      recommended: false
    },
    {
      name: "NESS Cube",
      image: nessCubeProduct,
      capacity: "10-20 kWh",
      bestFor: "3-4 BHK homes, medium families",
      features: ["Whole-home backup", "EV charging ready", "Smart monitoring"],
      price: "₹4-7L",
      icon: Sparkles,
      recommended: true
    },
    {
      name: "NESS Pro",
      image: nessProProduct,
      capacity: "20-50+ kWh",
      bestFor: "Villas, commercial, high usage",
      features: ["Scalable capacity", "Three-phase support", "Industrial grade"],
      price: "₹7-15L+",
      icon: Building2,
      recommended: false
    }
  ];

  const usageTiers = [
    { 
      range: "200-400", 
      label: "Light User", 
      icon: Lightbulb,
      description: "Small apartments, basic appliances",
      gradient: "from-emerald-500/20 to-emerald-600/5"
    },
    { 
      range: "400-800", 
      label: "Medium User", 
      icon: Home,
      description: "Family homes with AC usage",
      gradient: "from-energy/20 to-energy/5"
    },
    { 
      range: "800+", 
      label: "Heavy User", 
      icon: Building2,
      description: "Large homes, multiple ACs, EV",
      gradient: "from-orange-500/20 to-orange-600/5"
    }
  ];

  const essentialAppliances = [
    { name: "Lights", icon: Lightbulb, power: "50W" },
    { name: "Fans", icon: Fan, power: "75W" },
    { name: "WiFi", icon: Wifi, power: "15W" },
    { name: "Phone", icon: Smartphone, power: "20W" },
    { name: "Fridge", icon: Refrigerator, power: "150W" }
  ];

  const wholeHomeAppliances = [
    { name: "All essentials", icon: CheckCircle, power: "310W" },
    { name: "AC", icon: AirVent, power: "1.5kW" },
    { name: "Water heater", icon: Droplets, power: "2kW" },
    { name: "EV charger", icon: Car, power: "3.3kW" }
  ];

  const steps = [
    { num: 1, title: "Usage", subtitle: "How much?" },
    { num: 2, title: "Backup", subtitle: "What loads?" },
    { num: 3, title: "Duration", subtitle: "How long?" }
  ];

  // Track scroll to update active step
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-step]');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
          const step = parseInt(section.getAttribute('data-step') || '1');
          setActiveStep(step);
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="space-y-12 relative">
      {/* Sticky Progress Indicator */}
      <div className="sticky top-20 z-40 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 bg-background/80 backdrop-blur-xl border-b border-border/50 transition-all duration-300">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between">
            {steps.map((step, i) => (
              <React.Fragment key={step.num}>
                <button
                  onClick={() => {
                    const section = document.querySelector(`[data-step="${step.num}"]`);
                    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`flex items-center gap-3 transition-all duration-300 group ${
                    activeStep >= step.num ? 'opacity-100' : 'opacity-50'
                  }`}
                >
                  <div className={`
                    relative w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                    transition-all duration-500 
                    ${activeStep === step.num 
                      ? 'bg-gradient-to-br from-energy via-energy to-energy/80 text-charcoal shadow-lg shadow-energy/30 scale-110' 
                      : activeStep > step.num 
                        ? 'bg-energy/20 text-energy border-2 border-energy/50'
                        : 'bg-muted text-muted-foreground'
                    }
                  `}>
                    {activeStep > step.num ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step.num
                    )}
                    {activeStep === step.num && (
                      <span className="absolute -inset-1 rounded-full bg-energy/20 animate-ping" />
                    )}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className={`text-sm font-semibold transition-colors ${
                      activeStep === step.num ? 'text-energy' : 'text-foreground'
                    }`}>{step.title}</p>
                    <p className="text-xs text-muted-foreground">{step.subtitle}</p>
                  </div>
                </button>
                {i < steps.length - 1 && (
                  <div className="flex-1 mx-2 sm:mx-4 h-0.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-energy to-energy/60 transition-all duration-500"
                      style={{ width: activeStep > step.num ? '100%' : '0%' }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Intro */}
      <section className="space-y-6 pt-4">
        <p className="text-xl sm:text-2xl text-foreground font-medium leading-relaxed">
          Choosing a solar + battery system shouldn't feel like solving a puzzle. <span className="text-energy">Let me simplify it for you.</span>
        </p>
        <p className="text-body-large text-muted-foreground leading-relaxed">
          I've seen hundreds of homeowners overwhelmed by specs, jargon, and sales pitches. The truth? 
          Picking the right system comes down to answering just <strong className="text-foreground">three simple questions.</strong>
        </p>
      </section>

      {/* Step 1 - Premium Usage Tier Cards */}
      <section className="space-y-6" data-step="1">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-energy via-energy to-energy/70 rounded-2xl flex items-center justify-center text-charcoal font-bold text-xl shadow-lg shadow-energy/25 rotate-3 hover:rotate-0 transition-transform duration-300">
              1
            </div>
            <Gauge className="absolute -bottom-1 -right-1 w-5 h-5 text-energy bg-background rounded-full p-0.5" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">How much electricity do you use?</h2>
        </div>
        
        <div className="glass-card-light rounded-2xl p-6 sm:p-8">
          <p className="text-body-large text-muted-foreground mb-8">
            Check your last 3 electricity bills. Find your average monthly consumption (in kWh or units).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {usageTiers.map((tier, i) => (
              <div 
                key={i}
                className={`
                  relative overflow-hidden rounded-2xl p-6 text-center
                  bg-gradient-to-br ${tier.gradient}
                  border border-border/50 hover:border-energy/50
                  hover:-translate-y-1 hover:shadow-xl hover:shadow-energy/10
                  transition-all duration-300 cursor-pointer group
                `}
              >
                <div className="absolute top-3 right-3 w-10 h-10 bg-background/50 backdrop-blur rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <tier.icon className="w-5 h-5 text-energy" />
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">{tier.range}</p>
                <p className="text-sm text-muted-foreground mb-3">units/month</p>
                <p className="text-energy font-semibold text-lg">{tier.label}</p>
                <p className="text-xs text-muted-foreground mt-2">{tier.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step 2 - Appliance Icons */}
      <section className="space-y-6" data-step="2">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-energy via-energy to-energy/70 rounded-2xl flex items-center justify-center text-charcoal font-bold text-xl shadow-lg shadow-energy/25 -rotate-3 hover:rotate-0 transition-transform duration-300">
              2
            </div>
            <Battery className="absolute -bottom-1 -right-1 w-5 h-5 text-energy bg-background rounded-full p-0.5" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">What do you want to power during outages?</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Essential Backup */}
          <div className="glass-card-light rounded-2xl p-6 sm:p-8 space-y-6 hover:shadow-xl transition-shadow group">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Essential Backup</h3>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-medium">
                Budget Friendly
              </span>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {essentialAppliances.map((appliance, i) => (
                <div 
                  key={i}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/30 hover:bg-energy/10 transition-colors group/item cursor-default"
                >
                  <div className="w-10 h-10 bg-energy/10 group-hover/item:bg-energy/20 rounded-xl flex items-center justify-center transition-colors">
                    <appliance.icon className="w-5 h-5 text-energy" />
                  </div>
                  <span className="text-xs text-muted-foreground text-center">{appliance.name}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <p className="text-muted-foreground text-sm">Total power draw</p>
              <p className="text-energy font-bold text-lg">~310W</p>
            </div>
            <p className="text-energy font-semibold flex items-center gap-2">
              <Battery className="w-4 h-4" />
              Need: 5-10 kWh
            </p>
          </div>
          
          {/* Whole-Home Backup */}
          <div className="glass-card-light rounded-2xl p-6 sm:p-8 space-y-6 hover:shadow-xl transition-shadow group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-energy/10 to-transparent rounded-bl-full" />
            <div className="flex items-center justify-between relative">
              <h3 className="text-xl font-semibold text-foreground">Whole-Home Backup</h3>
              <span className="px-3 py-1 bg-energy/10 text-energy rounded-full text-xs font-medium flex items-center gap-1">
                <Star className="w-3 h-3" /> Popular
              </span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {wholeHomeAppliances.map((appliance, i) => (
                <div 
                  key={i}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/30 hover:bg-energy/10 transition-colors group/item cursor-default"
                >
                  <div className="w-10 h-10 bg-energy/10 group-hover/item:bg-energy/20 rounded-xl flex items-center justify-center transition-colors">
                    <appliance.icon className="w-5 h-5 text-energy" />
                  </div>
                  <span className="text-xs text-muted-foreground text-center leading-tight">{appliance.name}</span>
                  <span className="text-[10px] text-energy font-medium">{appliance.power}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <p className="text-muted-foreground text-sm">Peak power draw</p>
              <p className="text-energy font-bold text-lg">~7kW</p>
            </div>
            <p className="text-energy font-semibold flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Need: 15-30+ kWh
            </p>
          </div>
        </div>
      </section>

      {/* Step 3 */}
      <section className="space-y-6" data-step="3">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-energy via-energy to-energy/70 rounded-2xl flex items-center justify-center text-charcoal font-bold text-xl shadow-lg shadow-energy/25 rotate-2 hover:rotate-0 transition-transform duration-300">
              3
            </div>
            <Clock className="absolute -bottom-1 -right-1 w-5 h-5 text-energy bg-background rounded-full p-0.5" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">How long should backup last?</h2>
        </div>
        
        <div className="glass-card-accent rounded-2xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-energy/5 to-transparent rounded-bl-full" />
          <div className="relative space-y-6">
            <div className="flex flex-wrap gap-4">
              {[2, 4, 6, 8, 12].map((hours) => (
                <div 
                  key={hours}
                  className="px-5 py-3 bg-muted/50 hover:bg-energy/10 border border-border hover:border-energy/50 rounded-xl cursor-pointer transition-all hover:scale-105"
                >
                  <span className="text-lg font-bold text-foreground">{hours}</span>
                  <span className="text-sm text-muted-foreground ml-1">hours</span>
                </div>
              ))}
            </div>
            <div className="bg-background/50 rounded-xl p-4 border border-energy/20">
              <p className="text-body-large text-foreground mb-2">
                <strong>Simple math:</strong> If you need 5kW of power for 4 hours during an outage, you need <span className="text-energy font-bold">5 × 4 = 20 kWh</span> of battery storage.
              </p>
              <p className="text-muted-foreground text-sm">
                💡 Pro tip: Most homes do fine with 4-6 hours of backup for essential loads. If you're in an area with frequent 
                8+ hour outages, size up accordingly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Comparison - Premium Cards with Recommended Badge */}
      <section className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground text-center">Our Products: At a Glance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, i) => (
            <div 
              key={i} 
              className={`
                relative glass-card-light rounded-3xl p-6 sm:p-8 space-y-6 
                hover:-translate-y-3 transition-all duration-500 group
                ${product.recommended 
                  ? 'ring-2 ring-energy shadow-xl shadow-energy/20 scale-[1.02] md:scale-105' 
                  : 'hover:shadow-xl'
                }
              `}
            >
              {/* Recommended Badge */}
              {product.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-energy via-energy to-energy/80 rounded-full shadow-lg shadow-energy/30">
                    <Crown className="w-4 h-4 text-charcoal" />
                    <span className="text-charcoal font-bold text-sm whitespace-nowrap">Most Popular</span>
                  </div>
                </div>
              )}
              
              <div className={`
                aspect-square bg-gradient-to-br rounded-2xl flex items-center justify-center p-8
                ${product.recommended 
                  ? 'from-energy/20 via-energy/10 to-muted/20' 
                  : 'from-muted/50 to-muted/20'
                }
                group-hover:scale-[1.02] transition-transform duration-300
              `}>
                <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain drop-shadow-lg" loading="lazy" />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center
                    ${product.recommended ? 'bg-energy/20' : 'bg-muted'}
                  `}>
                    <product.icon className={`w-5 h-5 ${product.recommended ? 'text-energy' : 'text-muted-foreground'}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{product.name}</h3>
                </div>
                
                <p className="text-energy font-semibold text-lg">{product.capacity}</p>
                <p className="text-muted-foreground">{product.bestFor}</p>
                
                <ul className="space-y-2">
                  {product.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 ${product.recommended ? 'text-energy' : 'text-muted-foreground'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                
                <div className="pt-4 border-t border-border/50">
                  <p className="text-2xl font-bold text-foreground">{product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="glass-card rounded-3xl p-8 sm:p-12 text-center space-y-6 bg-gradient-to-br from-energy/5 to-transparent">
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">Still Not Sure?</h2>
        <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
          Our team can analyze your electricity bills and recommend the perfect system for your home.
        </p>
        <Link to="/contact">
          <Button size="lg" className="min-h-[56px] px-8 text-lg bg-foreground text-background hover:bg-foreground/90 group">
            Get Free Consultation
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </section>
    </div>
  );
}

// Calculator Content
function CalculatorContent() {
  return (
    <div className="space-y-12">
      {/* Interactive Calculator */}
      <section className="space-y-6">
        <p className="text-xl sm:text-2xl text-foreground font-medium leading-relaxed">
          Let's crunch your numbers. <span className="text-energy">See exactly what solar + battery saves you.</span>
        </p>
      </section>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Avg. Monthly Bill", value: "₹5,000", sub: "before solar" },
          { label: "After Solar+Battery", value: "₹800", sub: "90% reduction" },
          { label: "Annual Savings", value: "₹50,400", sub: "first year" },
          { label: "10-Year Savings", value: "₹6.5L+", sub: "with tariff rise" },
        ].map((stat, i) => (
          <div key={i} className="glass-card-light rounded-2xl p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
            <p className="text-2xl sm:text-3xl font-bold text-energy">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Simple Calculator Form */}
      <section className="glass-card-accent rounded-3xl p-8 sm:p-12 space-y-8">
        <h2 className="text-2xl font-semibold text-foreground text-center">Calculate Your Savings</h2>
        
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="space-y-3">
            <label className="text-foreground font-medium">Your monthly electricity bill (₹)</label>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="1000" 
                max="20000" 
                step="500"
                defaultValue="5000"
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-energy"
              />
              <span className="text-2xl font-bold text-energy min-w-[100px] text-right">₹5,000</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-foreground font-medium">Average power cuts per month (hours)</label>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="0" 
                max="100" 
                step="5"
                defaultValue="20"
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-energy"
              />
              <span className="text-2xl font-bold text-energy min-w-[80px] text-right">20 hrs</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-foreground font-medium">Your state electricity tariff growth (annual %)</label>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="3" 
                max="15" 
                step="1"
                defaultValue="8"
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-energy"
              />
              <span className="text-2xl font-bold text-energy min-w-[60px] text-right">8%</span>
            </div>
          </div>
        </div>

        {/* Results Preview */}
        <div className="border-t border-border/50 pt-8 mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <p className="text-muted-foreground">Your 10-Year Savings</p>
              <p className="text-4xl sm:text-5xl font-bold text-energy">₹6.5L</p>
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground">Payback Period</p>
              <p className="text-4xl sm:text-5xl font-bold text-foreground">4.2 yrs</p>
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground">CO₂ Saved</p>
              <p className="text-4xl sm:text-5xl font-bold text-foreground">32 tons</p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Calculate */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">How This Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: "1",
              title: "Current Costs",
              desc: "We take your current bill and project it forward with average 8% annual tariff increases."
            },
            {
              step: "2",
              title: "Solar Generation",
              desc: "Based on your roof size and location, we estimate annual solar production."
            },
            {
              step: "3",
              title: "Net Savings",
              desc: "System cost minus incentives, compared to cumulative bill savings over 25 years."
            }
          ].map((item, i) => (
            <div key={i} className="glass-card-light rounded-2xl p-6 space-y-4">
              <div className="w-10 h-10 bg-energy rounded-full flex items-center justify-center text-charcoal font-bold">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="glass-card rounded-3xl p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">Want a Precise Quote?</h2>
        <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
          These are estimates. For an exact quote based on your roof, location, and usage patterns, talk to our team.
        </p>
        <Link to="/contact">
          <Button size="lg" className="min-h-[56px] px-8 text-lg bg-energy hover:bg-energy/90 text-charcoal">
            Get Exact Quote
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </section>
    </div>
  );
}

// All-in-One Content
function AllInOneContent() {
  return (
    <div className="space-y-12">
      {/* Hook */}
      <section className="space-y-6">
        <p className="text-xl sm:text-2xl text-foreground font-medium leading-relaxed">
          Here's what nobody tells you about traditional solar installations: <span className="text-energy">50% of problems come from mismatched components.</span>
        </p>
        <p className="text-body-large text-muted-foreground leading-relaxed">
          Different brands of panels, inverters, batteries, and BMS units talking to each other through 
          cobbled-together wiring. When something fails, everyone points fingers. The panel guy blames the 
          inverter. The inverter guy blames the battery. You're left in the dark — literally.
        </p>
      </section>

      {/* Comparison */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">Traditional vs All-in-One</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="w-8 h-8 text-red-500" />
              <h3 className="text-xl font-semibold text-foreground">Traditional Setup</h3>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" /> 4-6 separate components to source</li>
              <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" /> Complex wiring, more failure points</li>
              <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" /> 2-3 days installation time</li>
              <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" /> Multiple warranties to manage</li>
              <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" /> Finger-pointing when issues arise</li>
            </ul>
          </div>
          
          <div className="bg-energy/10 border border-energy/20 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-8 h-8 text-energy" />
              <h3 className="text-xl font-semibold text-foreground">All-in-One System</h3>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-energy mt-1 flex-shrink-0" /> One integrated unit, factory-tested</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-energy mt-1 flex-shrink-0" /> Minimal wiring, plug-and-play</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-energy mt-1 flex-shrink-0" /> 4-6 hours installation time</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-energy mt-1 flex-shrink-0" /> Single warranty, one call</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-energy mt-1 flex-shrink-0" /> One company, one solution</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Installer Benefits */}
      <section className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">Why Installers Love All-in-One</h2>
        
        <div className="glass-card-accent rounded-3xl p-8 sm:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-4xl font-bold text-energy">60%</p>
              <p className="text-muted-foreground">Faster installations</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-energy">75%</p>
              <p className="text-muted-foreground">Fewer service calls</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-energy">90%</p>
              <p className="text-muted-foreground">Customer satisfaction</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-energy">2x</p>
              <p className="text-muted-foreground">More jobs per month</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="glass-card rounded-3xl p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">Ready to Simplify Your Installs?</h2>
        <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
          Join our network of installers and get priority access to all-in-one systems with better margins.
        </p>
        <Link to="/installers">
          <Button size="lg" className="min-h-[56px] px-8 text-lg bg-foreground text-background hover:bg-foreground/90">
            Become a Partner
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </section>
    </div>
  );
}

// Hybrid Installation Content
function HybridInstallationContent() {
  const steps = [
    {
      num: 1,
      title: "Site Assessment",
      time: "30 min",
      details: [
        "Check roof orientation and shading",
        "Measure available installation area",
        "Assess electrical panel capacity",
        "Document existing wiring"
      ]
    },
    {
      num: 2,
      title: "System Design",
      time: "1-2 hrs",
      details: [
        "Size solar array based on consumption",
        "Select appropriate battery capacity",
        "Design single-line diagram",
        "Plan cable routing"
      ]
    },
    {
      num: 3,
      title: "Mounting & Panels",
      time: "2-3 hrs",
      details: [
        "Install mounting rails with proper tilt",
        "Mount panels and secure clamps",
        "Connect panel strings in series/parallel",
        "Install DC isolator"
      ]
    },
    {
      num: 4,
      title: "Inverter & Battery",
      time: "1-2 hrs",
      details: [
        "Mount inverter in ventilated location",
        "Connect DC cables from solar array",
        "Install and connect battery unit",
        "Set up BMS communication"
      ]
    },
    {
      num: 5,
      title: "AC Connection",
      time: "1-2 hrs",
      details: [
        "Connect to main distribution board",
        "Install AC isolator and surge protection",
        "Configure grid/backup changeover",
        "Test all safety switches"
      ]
    },
    {
      num: 6,
      title: "Commissioning",
      time: "30-60 min",
      details: [
        "Power up and configure inverter settings",
        "Test grid export/import limits",
        "Verify backup switchover",
        "Hand over to customer with demo"
      ]
    }
  ];

  return (
    <div className="space-y-12">
      {/* Intro */}
      <section className="space-y-6">
        <p className="text-xl sm:text-2xl text-foreground font-medium leading-relaxed">
          Installing hybrid solar systems doesn't have to be complicated. <span className="text-energy">Follow this proven 6-step process.</span>
        </p>
        <p className="text-body-large text-muted-foreground leading-relaxed">
          This guide is based on 500+ successful installations. Each step includes time estimates, 
          common pitfalls to avoid, and pro tips from experienced installers.
        </p>
      </section>

      {/* Timeline */}
      <section className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">The 6-Step Process</h2>
        
        <div className="space-y-6">
          {steps.map((step, i) => (
            <div key={i} className="glass-card-light rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-energy rounded-full flex items-center justify-center text-charcoal font-bold text-xl flex-shrink-0">
                    {step.num}
                  </div>
                  <div className="sm:hidden">
                    <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                    <p className="text-energy text-sm flex items-center gap-1 mt-1">
                      <Clock className="w-4 h-4" /> {step.time}
                    </p>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="hidden sm:block">
                    <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                    <p className="text-energy text-sm flex items-center gap-1 mt-1">
                      <Clock className="w-4 h-4" /> {step.time}
                    </p>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {step.details.map((detail, j) => (
                      <li key={j} className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-energy mt-0.5 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Total Time */}
      <section className="glass-card-accent rounded-3xl p-8 sm:p-12 text-center">
        <p className="text-muted-foreground mb-2">Total Installation Time</p>
        <p className="text-5xl sm:text-6xl font-bold text-energy">6-10 Hours</p>
        <p className="text-muted-foreground mt-4">For a typical 5-10kW residential hybrid system</p>
      </section>

      {/* CTA */}
      <section className="glass-card rounded-3xl p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">Need Detailed Technical Docs?</h2>
        <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
          Download our complete installation manual with wiring diagrams, settings guides, and troubleshooting flowcharts.
        </p>
        <Link to="/downloads">
          <Button size="lg" className="min-h-[56px] px-8 text-lg bg-foreground text-background hover:bg-foreground/90">
            Download Installation Guide
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </section>
    </div>
  );
}

// Best Practices Content
function BestPracticesContent() {
  const dos = [
    { title: "Always test grid voltage before connecting", desc: "Measure phase voltage and frequency. Systems need 210-250V, 49.5-50.5Hz." },
    { title: "Use properly rated DC cables", desc: "Solar DC cables should be 4mm² minimum for runs under 15m. Use 6mm² for longer runs." },
    { title: "Ensure adequate ventilation", desc: "Inverters need 20cm clearance on all sides. Battery rooms need passive or active ventilation." },
    { title: "Document everything", desc: "Take photos of wiring, settings, and labels. Future service calls will thank you." },
    { title: "Test backup switchover", desc: "Simulate a power cut before handover. Verify seamless transfer to battery power." },
  ];

  const donts = [
    { title: "Never skip the site survey", desc: "Shading issues and weak structures cause 80% of post-install problems." },
    { title: "Don't mix battery brands", desc: "Different BMS protocols cause communication failures and reduce lifespan." },
    { title: "Avoid undersized cables", desc: "Voltage drop = lost power and overheating. Size cables for 3% max drop." },
    { title: "Don't ignore grounding", desc: "Proper earthing prevents lightning damage and electrical hazards." },
    { title: "Never bypass safety switches", desc: "DC isolators, AC breakers, and surge protection are non-negotiable." },
  ];

  return (
    <div className="space-y-12">
      {/* Intro */}
      <section className="space-y-6">
        <p className="text-xl sm:text-2xl text-foreground font-medium leading-relaxed">
          The difference between a good installer and a great one? <span className="text-energy">Knowing what NOT to do.</span>
        </p>
        <p className="text-body-large text-muted-foreground leading-relaxed">
          These best practices come from analyzing warranty claims, service callbacks, and customer complaints 
          across thousands of installations. Learn from others' mistakes.
        </p>
      </section>

      {/* Do's */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-8 h-8 text-energy" />
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">The Do's</h2>
        </div>
        
        <div className="space-y-4">
          {dos.map((item, i) => (
            <div key={i} className="bg-energy/10 border border-energy/20 rounded-2xl p-6 flex gap-4">
              <CheckCircle className="w-6 h-6 text-energy flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Don'ts */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <XCircle className="w-8 h-8 text-red-500" />
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">The Don'ts</h2>
        </div>
        
        <div className="space-y-4">
          {donts.map((item, i) => (
            <div key={i} className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 flex gap-4">
              <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pro Tip */}
      <section className="glass-card-accent rounded-3xl p-8 sm:p-12">
        <div className="flex items-start gap-4">
          <Star className="w-8 h-8 text-energy flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Pro Tip: The 24-Hour Check</h3>
            <p className="text-body-large text-muted-foreground">
              After every installation, call the customer within 24 hours. Ask: "Is everything working as expected?" 
              This simple practice catches issues before they become complaints, builds trust, and generates referrals.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="glass-card rounded-3xl p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">Want Hands-On Training?</h2>
        <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
          Join our certified installer program. Get practical training, certification, and priority access to support.
        </p>
        <Link to="/installers">
          <Button size="lg" className="min-h-[56px] px-8 text-lg bg-foreground text-background hover:bg-foreground/90">
            Explore Training Programs
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </section>
    </div>
  );
}

// Main Component
const KnowledgeArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? articleContent[slug] : null;

  if (!article) {
    return (
      <Layout>
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 py-24 sm:py-40">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-energy mb-6">
            ❋ Errata
          </p>
          <h1 className="font-display font-medium tracking-[-0.03em] text-foreground text-5xl sm:text-7xl leading-[0.95] mb-6">
            The entry you sought <span className="italic font-light">is not on the shelf.</span>
          </h1>
          <p className="font-display italic text-xl text-muted-foreground mb-10 max-w-xl">
            Either the catalogue has changed, or the page never made it past the editor.
          </p>
          <Link
            to="/knowledge"
            className="inline-flex items-baseline gap-3 font-mono text-xs uppercase tracking-[0.25em] text-foreground border-b border-dashed border-foreground/40 hover:border-energy hover:text-energy pb-1 transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            Return to the index
          </Link>
        </div>
      </Layout>
    );
  }

  const related = Object.entries(articleContent).filter(([k]) => k !== slug).slice(0, 3);

  return (
    <Layout>
      {/* ─── FOLIO STRIP ─────────────────────────────────────────── */}
      <div className="bg-background border-b border-foreground/10 pt-20 sm:pt-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground border-b border-foreground/15 pb-3">
            <Link to="/knowledge" className="inline-flex items-center gap-2 hover:text-foreground transition-colors">
              <ArrowLeft className="w-3 h-3" />
              The Library
            </Link>
            <span className="hidden sm:inline">Vol. 04 — Issue 02</span>
            <span>Article #{article.number} / 06</span>
          </div>
        </div>
      </div>

      {/* ─── MASTHEAD ────────────────────────────────────────────── */}
      <section className="bg-background pt-10 sm:pt-16 pb-12 sm:pb-20 border-b border-foreground/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 lg:col-span-2">
              <p className="font-display text-[5rem] sm:text-[7rem] leading-none font-bold text-foreground/90">
                #{article.number}
              </p>
            </div>

            <div className="col-span-12 lg:col-span-8">
              <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-energy mb-4">
                {article.category}
              </p>
              <h1 className="font-display font-medium tracking-[-0.03em] leading-[0.95] text-foreground text-4xl sm:text-6xl lg:text-7xl mb-6">
                {article.title}.
              </h1>
              <p className="font-display italic font-light text-xl sm:text-2xl text-muted-foreground leading-snug max-w-3xl">
                {article.subtitle}
              </p>

              {/* Horizontal metadata strip */}
              <div className="mt-10 border-y border-foreground/15 py-4 flex flex-wrap items-center gap-x-8 gap-y-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                <span><span className="text-foreground/60">By</span> <span className="text-foreground">{article.byline}</span></span>
                <span><span className="text-foreground/60">Filed</span> <span className="text-foreground">{article.date}</span></span>
                <span><span className="text-foreground/60">Reading</span> <span className="text-foreground">{article.readTime}</span></span>
                <div className="ml-auto flex gap-4">
                  <Button variant="ghost" size="sm" className="h-7 px-2 gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
                    <Share2 className="w-3 h-3" /> Share
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 px-2 gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
                    <Bookmark className="w-3 h-3" /> Save
                  </Button>
                </div>
              </div>
            </div>

            <aside className="hidden lg:block col-span-2 pl-6 border-l border-foreground/15">
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
                Marginalia
              </p>
              <p className="font-display italic text-sm text-foreground leading-snug">
                Read in the order presented, or as the mood takes you. The footnotes are short.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* ─── HERO IMAGE PLATE ────────────────────────────────────── */}
      <section className="bg-whisper py-8 sm:py-12 border-b border-foreground/10">
        <div className="container mx-auto px-4 sm:px-6">
          <figure className="relative">
            <img
              src={article.heroImage}
              alt={article.title}
              className="w-full h-[40vh] sm:h-[55vh] object-cover grayscale-[15%]"
              loading="eager"
            />
            <figcaption className="mt-3 flex flex-wrap justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <span>Plate I — Illustration for {article.title}</span>
              <span>NESS Archive</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ─── ARTICLE BODY ────────────────────────────────────────── */}
      <section className="bg-background py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-12 gap-x-6">
            {/* Marginalia (lg+) */}
            <aside className="hidden lg:block col-span-2">
              <div className="sticky top-24 space-y-6">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
                    The Piece
                  </p>
                  <p className="font-display italic text-sm text-foreground leading-snug">
                    #{article.number} · {article.readTime}
                  </p>
                </div>
                <div className="pt-4 border-t border-foreground/15">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
                    Section
                  </p>
                  <p className="font-display italic text-sm text-foreground leading-snug">
                    {article.category}
                  </p>
                </div>
                <div className="pt-4 border-t border-foreground/15">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
                    Filed under
                  </p>
                  <p className="font-display italic text-sm text-foreground leading-snug">
                    {article.byline}, {article.date}
                  </p>
                </div>
              </div>
            </aside>

            {/* Narrow reading column */}
            <article
              className="col-span-12 lg:col-span-8 max-w-[680px] mx-auto editorial-prose"
            >
              <div className={dropCap}>
                {article.content}
              </div>
            </article>

            {/* Right margin — small mobile-style page number */}
            <aside className="hidden lg:block col-span-2 pl-6 border-l border-foreground/10">
              <div className="sticky top-24 font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground space-y-2">
                <p>¶ Footnotes appear inline.</p>
                <p>§ Section breaks marked ⁂.</p>
                <p>Pull quotes break the column.</p>
              </div>
            </aside>
          </div>

          {/* Page-number folio */}
          <div className="mt-16 sm:mt-20 max-w-[680px] mx-auto lg:ml-[calc(16.6%+1.5rem)] lg:mr-0 flex items-baseline justify-between border-t border-foreground/15 pt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <span>End of article</span>
            <span>Page {String(parseInt(article.number, 10) * 6).padStart(2, "0")} / 38</span>
          </div>
        </div>
      </section>

      {/* ─── NEXT IN THE LIBRARY ─────────────────────────────────── */}
      <section className="bg-whisper py-16 sm:py-24 border-y border-foreground/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-baseline justify-between border-b border-foreground/20 pb-3 mb-8 sm:mb-10">
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-foreground">
              ❋ Next in The Library
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Three more entries
            </p>
          </div>

          <ul className="border-t border-foreground/30">
            {related.map(([key, art]) => (
              <li key={key} className="border-b border-foreground/15">
                <Link
                  to={`/knowledge/${key}`}
                  className="group grid grid-cols-12 gap-x-4 sm:gap-x-6 py-6 sm:py-8 items-baseline hover:bg-background/60 transition-colors -mx-2 px-2 sm:-mx-4 sm:px-4"
                >
                  <span className="col-span-2 sm:col-span-1 font-mono text-xs sm:text-sm text-muted-foreground tabular-nums">
                    #{art.number}
                  </span>
                  <div className="col-span-10 sm:col-span-8">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
                      {art.category}
                    </p>
                    <h3 className="font-display font-medium tracking-[-0.02em] text-foreground text-2xl sm:text-3xl leading-[1.05] group-hover:italic group-hover:text-energy transition-all">
                      {art.title}
                    </h3>
                  </div>
                  <div className="col-span-12 sm:col-span-3 mt-2 sm:mt-0 flex sm:justify-end items-baseline gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    <span className="hidden sm:inline"><Clock className="w-3 h-3 inline mr-1" />{art.readTime}</span>
                    <span className="text-foreground group-hover:text-energy transition-colors">→</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 text-center">
            <Link
              to="/knowledge"
              className="inline-flex items-baseline gap-3 font-mono text-xs uppercase tracking-[0.25em] text-foreground border-b border-dashed border-foreground/40 hover:border-energy hover:text-energy pb-1 transition-colors"
            >
              Return to the index
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default KnowledgeArticle;
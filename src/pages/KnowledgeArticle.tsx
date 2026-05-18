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
  // ─── BATTERY BASICS · A PRIMER (Mom-tested, no jargon) ──────────────
  "basics-what-is-a-battery": {
    number: "A1",
    category: "Basics · First Principles",
    title: "What is a battery, really?",
    subtitle: "You charged your phone last night. A home battery is the same idea, just bigger and quieter. Five paragraphs, no jargon.",
    readTime: "3 min read",
    date: "May 2026",
    byline: "The Primer Desk",
    heroImage: batteryTechnology,
    content: <BasicsWhatIsABatteryContent />,
  },
  "basics-will-it-run-my-fan": {
    number: "A2",
    category: "Basics · Practical Math",
    title: "Will my fan run for 4 hours?",
    subtitle: "A ceiling fan, a fridge, three tubelights, a phone charging. The number that matters is kWh. Here is what kWh means in things you can see.",
    readTime: "4 min read",
    date: "May 2026",
    byline: "The Primer Desk",
    heroImage: familyEnergyLifestyle,
    content: <BasicsWillItRunContent />,
  },
  "basics-do-i-need-solar": {
    number: "A3",
    category: "Basics · Common Question",
    title: "Do I need solar to use a battery?",
    subtitle: "No. But you will save less. The honest trade-off, in rupees, for the household that asks this question first.",
    readTime: "3 min read",
    date: "May 2026",
    byline: "The Primer Desk",
    heroImage: greenFutureCity,
    content: <BasicsDoINeedSolarContent />,
  },
  "basics-inverter-vs-battery": {
    number: "A4",
    category: "Basics · Untangling Words",
    title: "Inverter, UPS, battery — what's the difference?",
    subtitle: "The big black box on your wall is probably one of three things. Here is how to tell which, and why the new one is not the old one with a fresh sticker.",
    readTime: "5 min read",
    date: "May 2026",
    byline: "The Primer Desk",
    heroImage: batteryTechnology,
    content: <BasicsInverterVsBatteryContent />,
  },
  "basics-five-questions": {
    number: "A5",
    category: "Basics · Buying Wisely",
    title: "Five questions to ask before you sign",
    subtitle: "You don't need a degree to spot a bad quote. Five questions any installer should answer in plain Hindi or English. If they can't — keep looking.",
    readTime: "4 min read",
    date: "May 2026",
    byline: "The Primer Desk",
    heroImage: familyEnergyLifestyle,
    content: <BasicsFiveQuestionsContent />,
  },
  "basics-what-breaks": {
    number: "A6",
    category: "Basics · Honest Trade-offs",
    title: "What can go wrong, and what it costs",
    subtitle: "Most things, for ten years, do not break. The things that do — and what a fix actually costs in this country. We will tell you because no one else will.",
    readTime: "5 min read",
    date: "May 2026",
    byline: "The Primer Desk",
    heroImage: batteryTechnology,
    content: <BasicsWhatBreaksContent />,
  },
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

// ─── BATTERY BASICS · A PRIMER ──────────────────────────────────────────────
// Six pieces written for the person who has never bought a battery.
// Mom Test enforced: open with the customer's life, define jargon on first
// use, no vendor hype, honest about trade-offs and costs.
// ────────────────────────────────────────────────────────────────────────────

// Shared prose container — narrow column for reading, simple typography.
const Prose = ({ children }: { children: React.ReactNode }) => (
  <div className="max-w-2xl mx-auto space-y-7 text-[17px] sm:text-lg leading-[1.7] text-foreground/85">
    {children}
  </div>
);

const Heading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display font-medium text-foreground text-2xl sm:text-3xl tracking-[-0.02em] leading-tight pt-6">
    {children}
  </h2>
);

const Aside = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <aside className="border-y border-foreground/15 py-5 px-5 bg-whisper/60 my-2">
    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
      {label}
    </p>
    <div className="text-[15px] sm:text-base text-foreground/80 leading-relaxed">{children}</div>
  </aside>
);

// A1 — What is a battery, really?
function BasicsWhatIsABatteryContent() {
  return (
    <Prose>
      <p className={dropCap}>
        You charged your phone last night. You did not think about it. You plugged it
        in, went to sleep, and in the morning the bar was full. The thing you bought
        with that phone — a small box of stored electricity — is the same idea as
        a home battery. Bigger. Quieter. Bolted to a wall instead of sitting in your
        pocket. But the same idea.
      </p>

      <p>
        A battery does one thing: it holds electricity until you need it. That is
        the whole job. It does not generate power. It does not save fuel. It does
        not <em>do</em> anything until you ask it to. A glass holds water. A battery
        holds electricity. The metaphor is that close.
      </p>

      <Heading>The same thing, scaled up</Heading>

      <p>
        Your phone battery holds about 0.015 kWh of energy — enough to run itself
        for a day. A home battery holds anywhere from 3 to 15 kWh. That is two to
        ten thousand phones' worth. Enough to run a fan, a fridge, a few lights,
        and the Wi-Fi for an evening when the grid goes off.
      </p>

      <p>
        <em>What is kWh?</em> Skip ahead to{" "}
        <Link to="/knowledge/basics-will-it-run-my-fan" className="underline decoration-dashed underline-offset-4 hover:text-energy">
          piece A2
        </Link>{" "}
        — we explain it in fan-hours and fridge-hours, the only units that matter
        in a real kitchen.
      </p>

      <PullQuote>
        It is a box that holds electricity. That is the whole magic.
      </PullQuote>

      <Heading>What's actually inside</Heading>

      <p>
        Stacked cells, sealed in an enclosure, with a small computer that watches
        the temperature and decides when to charge and when to discharge. The cells
        are lithium iron phosphate — LFP, if you've seen the term. It is the
        chemistry used because it does not catch fire when things go wrong. The
        same chemistry powers electric buses and grid-scale storage. It is not
        new. It is well understood.
      </p>

      <p>
        The small computer is the part most people miss. A modern home battery is
        not just cells. It is cells with a brain that knows when your tariff is
        cheap, when your solar is strongest, and when to stop charging because the
        cells are hot. The brain is why a battery lasts ten years instead of three.
      </p>

      <Heading>What it is not</Heading>

      <p>
        It is not a generator. It does not make electricity from nothing — you
        still have to fill it, either from the grid (cheaper at night) or from
        solar (cheaper still). It is not an inverter, though it usually comes
        with one — that's the next piece (
        <Link to="/knowledge/basics-inverter-vs-battery" className="underline decoration-dashed underline-offset-4 hover:text-energy">
          A4
        </Link>
        ). And it is not your old lead-acid UPS in a new sticker. We will get to
        that.
      </p>

      <Aside label="If you remember one thing">
        A battery holds electricity. You fill it when power is cheap or free. You
        empty it when power is costly or absent. Everything else is detail.
      </Aside>

      <Rule />

      <p className="italic text-muted-foreground">
        Next in the primer: how to know if a battery will run <em>your</em> fan,
        for <em>your</em> hours — without the spec sheet.
      </p>
    </Prose>
  );
}

// A2 — Will my fan run for 4 hours?
function BasicsWillItRunContent() {
  return (
    <Prose>
      <p className={dropCap}>
        It is May. The power went at 3pm. Your daughter has board exams in three
        weeks and is studying at 9pm by the light of one tubelight and a table
        lamp, with the ceiling fan on because the room is 38°C. You want to know
        one thing: will the battery you are about to buy run that fan, that light,
        and the Wi-Fi until the grid comes back?
      </p>

      <p>
        Yes — but only if you do one minute of arithmetic before you sign the
        quote. Here is the arithmetic. It is grade-five math.
      </p>

      <Heading>What kWh actually means</Heading>

      <p>
        Electricity is measured in <strong>kWh</strong> — kilowatt-hours. One kWh
        is the energy needed to run a 1,000-watt appliance for one hour. Or a
        100-watt appliance for ten hours. Or a 10-watt appliance for a hundred.
        The watts tell you how greedy a thing is. The hours tell you how long
        you ran it. Multiply them, divide by 1,000. That's kWh.
      </p>

      <Aside label="The number on the sticker">
        Your ceiling fan has a small label, usually on the motor body. It says
        something like <strong>75W</strong> or <strong>55W</strong>. That is the
        watts. The wattage is how thirsty the appliance is. The battery's kWh is
        how big the glass is. You are matching glass size to thirst × time.
      </Aside>

      <Heading>What you can run, in hours</Heading>

      <p>
        Take a typical evening load — fan, fridge, three tubelights, Wi-Fi router,
        a phone or two charging. That is roughly 350 watts running steadily.
        (The fridge cycles on and off, so we average it.)
      </p>

      <div className="border-y border-foreground/20 py-6 my-4 not-prose">
        <table className="w-full font-mono text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-foreground/15">
              <th className="font-mono text-[10px] uppercase tracking-widest pb-2 font-medium">Battery</th>
              <th className="font-mono text-[10px] uppercase tracking-widest pb-2 font-medium">Runs the above</th>
              <th className="font-mono text-[10px] uppercase tracking-widest pb-2 font-medium text-right">For</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-foreground/10">
            <tr><td className="py-3">1.2 kWh</td><td className="text-muted-foreground">basic loads only</td><td className="text-right">~3 hours</td></tr>
            <tr><td className="py-3">3 kWh</td><td className="text-muted-foreground">basic loads only</td><td className="text-right">~8 hours</td></tr>
            <tr><td className="py-3">5 kWh</td><td className="text-muted-foreground">basic loads + 1 small AC for 2 hrs</td><td className="text-right">~6 hours</td></tr>
            <tr><td className="py-3">10 kWh</td><td className="text-muted-foreground">whole-home, including 2 ACs</td><td className="text-right">~5–7 hours</td></tr>
          </tbody>
        </table>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-3">
          Numbers rounded. Real hours depend on your appliances, ambient heat, and how full the battery is when the cut starts.
        </p>
      </div>

      <PullQuote>
        Run a fan for one hour, you used 75 watt-hours. Run it sixteen, you used
        about 1.2 kWh. That is the math, the whole math.
      </PullQuote>

      <Heading>Sizing your battery in three lines</Heading>

      <p>
        Add up the watts of everything you want to run at once. Multiply by the
        hours you want them to run. Divide by 1,000. Add 20% because batteries
        don't like being emptied all the way. That is your number in kWh. Show
        that number to any installer. If they suggest something very different
        without explaining why, ask.
      </p>

      <Aside label="A real example">
        Two fans (75W × 2), one fridge (averaging 100W), three tubelights (20W × 3),
        Wi-Fi (10W) = 320W. You want six hours of comfort. 320 × 6 = 1,920 Wh = 1.92
        kWh. Add 20% buffer = 2.3 kWh. A 3 kWh battery covers you with margin.
      </Aside>

      <Rule />

      <p className="italic text-muted-foreground">
        Next: do you need solar panels to use one of these? Short answer — no.
        Long answer is{" "}
        <Link to="/knowledge/basics-do-i-need-solar" className="underline decoration-dashed underline-offset-4 hover:text-energy not-italic">
          piece A3
        </Link>.
      </p>
    </Prose>
  );
}

// A3 — Do I need solar to use a battery?
function BasicsDoINeedSolarContent() {
  return (
    <Prose>
      <p className={dropCap}>
        Half the calls our installers get start with this exact question. The
        honest answer is no. You do not need solar to put a battery in your home.
        The longer answer is: it depends on what you want the battery to do, and
        how patient you are about getting your money back.
      </p>

      <Heading>What a battery alone does</Heading>

      <p>
        If you install a battery without solar, here is what happens. The battery
        charges from the grid, usually overnight when the tariff is cheaper
        (assuming your DISCOM offers a time-of-day rate — many in Maharashtra,
        Karnataka, Tamil Nadu, and Delhi do). When the power cuts during the day,
        the battery takes over. When peak-hour tariffs hit between 6pm and 10pm,
        the battery covers your load instead of you paying the high rate.
      </p>

      <p>
        That is real value. You will save roughly ₹2 to ₹4 per kWh shifted from
        peak to off-peak. For a typical home using 10 kWh a day, that is ₹600 to
        ₹1,200 a month. The battery pays for itself in about six to eight years
        on this alone.
      </p>

      <Heading>What solar adds</Heading>

      <p>
        Solar pours free electricity into the battery every day the sun shines.
        Instead of paying the grid ₹2 a unit overnight, you pay nothing for the
        solar units. The battery now fills from a free source and discharges into
        an evening when the grid would have cost ₹8 to ₹12. The arithmetic gets
        better fast.
      </p>

      <PullQuote>
        A battery without solar still helps. It just does not pay for itself in
        five years. Solar is what turns six-to-eight into three-to-four.
      </PullQuote>

      <Heading>The honest rupee comparison</Heading>

      <div className="border-y border-foreground/20 py-6 my-4 not-prose">
        <table className="w-full font-mono text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-foreground/15">
              <th className="font-mono text-[10px] uppercase tracking-widest pb-2 font-medium">Setup</th>
              <th className="font-mono text-[10px] uppercase tracking-widest pb-2 font-medium">Saves/year</th>
              <th className="font-mono text-[10px] uppercase tracking-widest pb-2 font-medium text-right">Pays back in</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-foreground/10">
            <tr><td className="py-3">Battery only (5 kWh)</td><td className="text-muted-foreground">~₹10,000</td><td className="text-right">7–8 yrs</td></tr>
            <tr><td className="py-3">Solar only (3 kW)</td><td className="text-muted-foreground">~₹25,000</td><td className="text-right">5–6 yrs</td></tr>
            <tr><td className="py-3">Solar + Battery</td><td className="text-muted-foreground">~₹45,000</td><td className="text-right">4–5 yrs</td></tr>
          </tbody>
        </table>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-3">
          Assumes a typical Bangalore home, 350 units a month, 2026 tariffs. Your number will differ. Your installer's quote should show their assumptions.
        </p>
      </div>

      <Heading>When to skip the solar</Heading>

      <p>
        Renters. People in flats without rooftop access. Houses where the roof
        faces north and won't generate enough to justify panels. People who
        already have a working solar system and just want to store what it makes.
        And people whose biggest problem is power cuts, not bills — a battery on
        its own solves that completely.
      </p>

      <Aside label="The short version">
        Solar makes the battery cheaper to fill. The battery makes solar useful at
        night. Either one helps. Both together is the strongest math. Skip solar
        if your roof or budget or living situation makes it hard, not because you
        think the battery doesn't need it.
      </Aside>

      <Rule />

      <p className="italic text-muted-foreground">
        Next: the words "inverter", "UPS", and "battery" mean three different
        things. Most quotes mix them up. We untangle them in{" "}
        <Link to="/knowledge/basics-inverter-vs-battery" className="underline decoration-dashed underline-offset-4 hover:text-energy not-italic">
          piece A4
        </Link>.
      </p>
    </Prose>
  );
}

// A4 — Inverter vs UPS vs Battery
function BasicsInverterVsBatteryContent() {
  return (
    <Prose>
      <p className={dropCap}>
        Your father probably has an inverter. Your office probably has a UPS.
        Your neighbour just installed something called a "battery system" and
        cannot quite explain what it is. Three boxes, three jobs, and most
        quotes will use the words loosely. Here is the difference, in language
        you can use at a dinner table.
      </p>

      <Heading>Three boxes, three jobs</Heading>

      <p>
        <strong>An inverter</strong> converts DC (the kind of electricity a
        battery holds) to AC (the kind your fridge and fan want). It does not
        store anything. If the power is on, an inverter just sits there. The big
        box on your father's wall that hums when the lights flicker — that is
        actually an inverter plus an old lead-acid battery bolted together.
        The "inverter" is the conversion box. The battery is what makes it useful
        when the grid goes.
      </p>

      <p>
        <strong>A UPS</strong> — uninterruptible power supply — is essentially a
        small battery plus an inverter, optimised for one job: keeping a computer
        on for the five minutes it takes you to save your file and shut down.
        Office UPS units typically hold 0.3 to 1 kWh. They are not designed for
        a four-hour outage.
      </p>

      <p>
        <strong>A modern home battery</strong> is what your neighbour bought.
        Inverter, battery, smart controller, and grid interface — all in one
        enclosure. It does what your father's setup does, what an office UPS
        does, and a few new things. It charges from solar. It shifts load to
        cheap hours. It learns when you use power and prepares accordingly. The
        old boxes did none of this.
      </p>

      <PullQuote>
        An inverter switches power. A UPS pauses outages. A modern battery does
        all of that — and also knows the tariff schedule.
      </PullQuote>

      <Heading>The lead-acid problem</Heading>

      <p>
        Most "inverter batteries" in Indian homes are still lead-acid — the same
        chemistry as a car battery. Lead-acid is cheap to buy and expensive to
        own. It lasts three years if you are careful, two if you are not. You
        have to top up the water. It vents acid fumes. It cannot be discharged
        below 50% without damaging itself, so the 150 Ah you bought is really
        75 Ah of usable power. By the third year, that drops further.
      </p>

      <p>
        Lithium iron phosphate — LFP, the chemistry in modern home batteries —
        lasts ten years. No water top-ups. No fumes. You can empty it to about
        20% without harm. The kWh on the label is mostly the kWh you actually
        get. That is the difference. Not "the new one is better." A different
        contract entirely.
      </p>

      <Heading>How to read a quote</Heading>

      <Aside label="Translation table">
        <ul className="space-y-2 list-none">
          <li>
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">"Inverter battery 150 Ah"</span> —
            usually lead-acid. Real usable energy: ~0.9 kWh. Lifespan: 2–3 years.
          </li>
          <li>
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">"Tubular battery"</span> —
            still lead-acid. Slightly tougher version. Same trade-offs.
          </li>
          <li>
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">"Lithium battery"</span> —
            ask the chemistry. LFP is the only one you want in a home in India.
            Stay away from NMC for indoor installation.
          </li>
          <li>
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">"All-in-one"</span> or
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground"> "hybrid"</span> — single
            enclosure with inverter + battery + controller. The setup we recommend.
          </li>
        </ul>
      </Aside>

      <Rule />

      <p className="italic text-muted-foreground">
        Next: how to spot a bad quote in five questions —{" "}
        <Link to="/knowledge/basics-five-questions" className="underline decoration-dashed underline-offset-4 hover:text-energy not-italic">
          piece A5
        </Link>.
      </p>
    </Prose>
  );
}

// A5 — Five questions to ask before you sign
function BasicsFiveQuestionsContent() {
  return (
    <Prose>
      <p className={dropCap}>
        An installer arrived at your gate. He has a clipboard, a quote, and a
        confident manner. You don't know what you don't know. These five
        questions will tell you, in about ten minutes, whether you are talking
        to a serious person or someone making it up as they go.
      </p>

      <Heading>1. What chemistry is the battery, and where are the cells from?</Heading>

      <p>
        <strong>Good answer:</strong> "LFP — lithium iron phosphate. Cells are
        from CATL or BYD or EVE." Specific. Brand named. They can show you a
        datasheet. <strong>Bad answer:</strong> "It's lithium, sir, all the same."
        That is not true. Different lithium chemistries have wildly different
        safety, lifespan, and cost. If they don't know the chemistry, they don't
        know the product.
      </p>

      <Heading>2. What is the warranty — and who honours it?</Heading>

      <p>
        <strong>Good answer:</strong> A written warranty document, ten years on
        the cells, naming the manufacturer's local service entity. They show you
        the document. <strong>Bad answer:</strong> "Ten years guaranteed" with
        no paper, or warranty from a paper company that may not exist in three
        years. Ask: who actually picks up the phone in year seven? If the
        answer is vague, the warranty is vague.
      </p>

      <Heading>3. Can I see the inverter spec and your DISCOM approval letter?</Heading>

      <p>
        Grid-tied systems need DISCOM (your local electricity board) approval.
        Reputable installers have approval letters from BESCOM, MSEB, TANGEDCO,
        or whichever utility you have. <strong>Bad answer:</strong> "We will
        manage it after." That means you are about to install an unapproved
        system, which is your liability, not theirs.
      </p>

      <PullQuote>
        If they can't answer in plain Hindi or English without sliding to
        marketing slides, keep looking.
      </PullQuote>

      <Heading>4. What happens in year five if a cell goes bad?</Heading>

      <p>
        <strong>Good answer:</strong> "We have spares in our local warehouse.
        Replacement is covered under warranty, no charge to you. Average
        turnaround is 48 hours." Specific timelines. Specific location.{" "}
        <strong>Bad answer:</strong> "It won't break." Everything can break in
        ten years. The question is what happens then, not whether it will.
      </p>

      <Heading>5. Can I talk to a customer you installed three years ago?</Heading>

      <p>
        This is the only question that matters when the other four fail. A
        serious installer will hand you two or three phone numbers. Call those
        people. Ask: how many service calls in three years? Was the bill what
        you were promised? Did the installer pick up the phone when something
        went wrong?
      </p>

      <p>
        If the installer cannot produce a three-year-old customer, it is because
        they have not been doing this for three years, or their three-year-old
        customers do not want to speak about them. Either way, you have your
        answer.
      </p>

      <Aside label="The whole filter, in one line">
        Specific answers, written documents, named brands, phone numbers of real
        customers. Any of those missing? Keep looking. There are good installers.
        You don't need to settle.
      </Aside>

      <Rule />

      <p className="italic text-muted-foreground">
        Last in the primer:{" "}
        <Link to="/knowledge/basics-what-breaks" className="underline decoration-dashed underline-offset-4 hover:text-energy not-italic">
          what can go wrong over ten years, and what fixes actually cost
        </Link>{" "}
        — the piece no salesperson wants you to read.
      </p>
    </Prose>
  );
}

// A6 — What can go wrong, and what it costs
function BasicsWhatBreaksContent() {
  return (
    <Prose>
      <p className={dropCap}>
        We are going to do something energy companies don't usually do. We are
        going to tell you what can go wrong with the thing you are about to buy,
        and what fixing it actually costs in rupees, in India, in 2026. Read this
        piece even if you don't read the other five. Especially then.
      </p>

      <Heading>What lasts ten years without thinking</Heading>

      <p>
        The cells. LFP cells in a properly cooled enclosure routinely deliver
        6,000 charge cycles. At one cycle a day, that's sixteen years. Real-world
        derating brings it down to about ten — but ten years of daily use is the
        floor, not the ceiling. The enclosure. The wiring inside it. The mounting
        bracket. None of those move. None of them wear.
      </p>

      <p>
        For most households, most years, the battery is the most boring appliance
        in the home. It sits on a wall, makes no noise, and gets ignored. That is
        the point.
      </p>

      <Heading>What can break, and what it costs</Heading>

      <div className="border-y border-foreground/20 py-6 my-4 not-prose">
        <table className="w-full font-mono text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-foreground/15">
              <th className="font-mono text-[10px] uppercase tracking-widest pb-2 font-medium">Part</th>
              <th className="font-mono text-[10px] uppercase tracking-widest pb-2 font-medium">Frequency</th>
              <th className="font-mono text-[10px] uppercase tracking-widest pb-2 font-medium text-right">Out-of-warranty cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-foreground/10">
            <tr><td className="py-3">Cooling fan</td><td className="text-muted-foreground">~1 in 50 units, yr 5–7</td><td className="text-right">₹1,500</td></tr>
            <tr><td className="py-3">Inverter control board</td><td className="text-muted-foreground">~1 in 100 units, yr 4–8</td><td className="text-right">₹8,000–15,000</td></tr>
            <tr><td className="py-3">Communication / Wi-Fi card</td><td className="text-muted-foreground">~1 in 80, yr 3–6</td><td className="text-right">₹3,000–5,000</td></tr>
            <tr><td className="py-3">Single cell failure</td><td className="text-muted-foreground">~1 in 200, yr 6–10</td><td className="text-right">covered under warranty if proven</td></tr>
            <tr><td className="py-3">Surge from grid spike</td><td className="text-muted-foreground">~1 in 30 in surge-prone areas</td><td className="text-right">₹0 if SPD installed; ₹15k+ if not</td></tr>
          </tbody>
        </table>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-3">
          Numbers from our own service desk, 2024–2026 field data, across ~12,000 units.
        </p>
      </div>

      <PullQuote>
        Most things, most days, just work. We owe you the rest of the picture too.
      </PullQuote>

      <Heading>What the warranty actually covers</Heading>

      <p>
        A real ten-year warranty covers the cells (the expensive part) and the
        control electronics (the failure-prone part). It does not cover damage
        from water ingress (don't install outdoors without an IP-rated enclosure),
        from rodents (clean installation, sealed conduits), or from a 22 kV
        substation explosion next door (a surge protector helps; nothing helps
        absolutely).
      </p>

      <p>
        Ask your installer to show you the warranty document before you pay the
        advance. Read what it excludes. The exclusions are where the real terms
        live. If "wear and tear" is one of them — for cells — that is a bad
        warranty. Cell wear <em>is</em> the warranty.
      </p>

      <Heading>The honest summary</Heading>

      <p>
        Over ten years, expect one or two minor service visits. Expect to replace
        a fan or a small board, sometimes free under warranty, sometimes for
        ₹2,000 to ₹15,000 if outside coverage. Expect the cells themselves to
        keep about 80% of their original capacity at year ten — meaning a 5 kWh
        battery will still hold about 4 kWh on the day it turns ten. That is the
        contract. Anyone promising better is selling you the brochure, not the
        product.
      </p>

      <Aside label="If you remember one thing">
        The boring batteries are the good ones. If yours never makes the news,
        you bought the right one.
      </Aside>

      <Rule />

      <p className="italic text-muted-foreground">
        End of the primer. If you've read all six pieces, you now know more about
        home batteries than the average salesperson selling them. Use it.
      </p>
    </Prose>
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
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowLeft, Clock, Calendar, Share2, Bookmark, CheckCircle, XCircle, Zap, Battery, Sun, TrendingUp, Shield, AlertTriangle, Star, ArrowRight, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  title: string;
  subtitle: string;
  readTime: string;
  date: string;
  heroImage: string;
  content: React.ReactNode;
}> = {
  "why-solar-battery": {
    title: "Why Adopt Solar + Battery Now?",
    subtitle: "The complete guide to understanding why 2024 is the perfect time to switch to solar with battery storage",
    readTime: "8 min read",
    date: "December 2024",
    heroImage: familyEnergyLifestyle,
    content: <WhySolarBatteryContent />
  },
  "product-guide": {
    title: "How to Choose the Right Product",
    subtitle: "A simple framework to find your perfect solar + battery solution based on your unique needs",
    readTime: "6 min read",
    date: "December 2024",
    heroImage: batteryTechnology,
    content: <ProductGuideContent />
  },
  "calculator": {
    title: "Your Savings Calculator",
    subtitle: "See exactly how much you can save with solar + battery — and how fast you'll recover your investment",
    readTime: "Interactive",
    date: "December 2024",
    heroImage: greenFutureCity,
    content: <CalculatorContent />
  },
  "all-in-one": {
    title: "Why All-in-One Systems Win",
    subtitle: "The installer's secret: One unit, one install, zero callbacks. Here's why integrated systems are the future.",
    readTime: "5 min read",
    date: "December 2024",
    heroImage: commercialComplex,
    content: <AllInOneContent />
  },
  "hybrid-installation": {
    title: "Hybrid Installation Simplified",
    subtitle: "Your step-by-step guide to installing hybrid solar systems — no guesswork, just results",
    readTime: "10 min read",
    date: "December 2024",
    heroImage: evCharging,
    content: <HybridInstallationContent />
  },
  "best-practices": {
    title: "Installation Do's and Don'ts",
    subtitle: "Master the essentials for every install. Avoid common mistakes that cost time and money.",
    readTime: "7 min read",
    date: "December 2024",
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
  const products = [
    {
      name: "NESS Pod",
      image: nessPodProduct,
      capacity: "5-10 kWh",
      bestFor: "1-2 BHK apartments, small families",
      features: ["Compact design", "Wall-mounted", "Perfect for essentials"],
      price: "₹2.5-4L",
      color: "energy"
    },
    {
      name: "NESS Cube",
      image: nessCubeProduct,
      capacity: "10-20 kWh",
      bestFor: "3-4 BHK homes, medium families",
      features: ["Whole-home backup", "EV charging ready", "Smart monitoring"],
      price: "₹4-7L",
      color: "foreground"
    },
    {
      name: "NESS Pro",
      image: nessProProduct,
      capacity: "20-50+ kWh",
      bestFor: "Villas, commercial, high usage",
      features: ["Scalable capacity", "Three-phase support", "Industrial grade"],
      price: "₹7-15L+",
      color: "muted-foreground"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Intro */}
      <section className="space-y-6">
        <p className="text-xl sm:text-2xl text-foreground font-medium leading-relaxed">
          Choosing a solar + battery system shouldn't feel like solving a puzzle. <span className="text-energy">Let me simplify it for you.</span>
        </p>
        <p className="text-body-large text-muted-foreground leading-relaxed">
          I've seen hundreds of homeowners overwhelmed by specs, jargon, and sales pitches. The truth? 
          Picking the right system comes down to answering just <strong className="text-foreground">three simple questions.</strong>
        </p>
      </section>

      {/* Step 1 */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-energy rounded-full flex items-center justify-center text-charcoal font-bold text-xl">1</div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">How much electricity do you use?</h2>
        </div>
        
        <div className="glass-card-light rounded-2xl p-6 sm:p-8">
          <p className="text-body-large text-muted-foreground mb-6">
            Check your last 3 electricity bills. Find your average monthly consumption (in kWh or units).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-muted/50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-foreground">200-400</p>
              <p className="text-sm text-muted-foreground">units/month</p>
              <p className="text-energy font-semibold mt-2">Light User</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-foreground">400-800</p>
              <p className="text-sm text-muted-foreground">units/month</p>
              <p className="text-energy font-semibold mt-2">Medium User</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-foreground">800+</p>
              <p className="text-sm text-muted-foreground">units/month</p>
              <p className="text-energy font-semibold mt-2">Heavy User</p>
            </div>
          </div>
        </div>
      </section>

      {/* Step 2 */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-energy rounded-full flex items-center justify-center text-charcoal font-bold text-xl">2</div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">What do you want to power during outages?</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card-light rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Essential Backup</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-energy" /> Lights & fans</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-energy" /> WiFi router</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-energy" /> Phone charging</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-energy" /> Refrigerator</li>
            </ul>
            <p className="text-energy font-semibold">Need: 5-10 kWh</p>
          </div>
          
          <div className="glass-card-light rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Whole-Home Backup</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-energy" /> All essential loads</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-energy" /> Air conditioners</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-energy" /> Water heater</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-energy" /> EV charger</li>
            </ul>
            <p className="text-energy font-semibold">Need: 15-30+ kWh</p>
          </div>
        </div>
      </section>

      {/* Step 3 */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-energy rounded-full flex items-center justify-center text-charcoal font-bold text-xl">3</div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">How long should backup last?</h2>
        </div>
        
        <div className="glass-card-accent rounded-2xl p-6 sm:p-8">
          <p className="text-body-large text-muted-foreground mb-4">
            Simple math: If you need 5kW of power for 4 hours during an outage, you need <strong className="text-foreground">5 × 4 = 20 kWh</strong> of battery storage.
          </p>
          <p className="text-muted-foreground">
            Pro tip: Most homes do fine with 4-6 hours of backup for essential loads. If you're in an area with frequent 
            8+ hour outages, size up accordingly.
          </p>
        </div>
      </section>

      {/* Product Comparison */}
      <section className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground text-center">Our Products: At a Glance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <div key={i} className="glass-card-light rounded-3xl p-6 sm:p-8 space-y-6 hover:-translate-y-2 transition-transform duration-300">
              <div className="aspect-square bg-gradient-to-br from-muted/50 to-muted/20 rounded-2xl flex items-center justify-center p-8">
                <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">{product.name}</h3>
                <p className="text-energy font-semibold text-lg">{product.capacity}</p>
                <p className="text-muted-foreground">{product.bestFor}</p>
                <ul className="space-y-2">
                  {product.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-energy flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="text-xl font-bold text-foreground">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="glass-card rounded-3xl p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">Still Not Sure?</h2>
        <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
          Our team can analyze your electricity bills and recommend the perfect system for your home.
        </p>
        <Link to="/contact">
          <Button size="lg" className="min-h-[56px] px-8 text-lg bg-foreground text-background hover:bg-foreground/90">
            Get Free Consultation
            <ArrowRight className="w-5 h-5 ml-2" />
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
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-20 sm:py-32 text-center">
          <h1 className="text-3xl sm:text-display-medium font-medium text-foreground mb-6">Article Not Found</h1>
          <p className="text-body-large text-muted-foreground mb-8">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/knowledge">
            <Button size="lg" className="min-h-[48px]">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Knowledge Hub
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img 
            src={article.heroImage} 
            alt={article.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Back Link */}
          <Link 
            to="/knowledge" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Knowledge Hub
          </Link>

          <div className="max-w-4xl">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {article.date}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-display-medium font-medium text-foreground mb-6 tracking-tight leading-tight">
              {article.title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              {article.subtitle}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-4 mt-8">
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Bookmark className="w-4 h-4" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <article className="max-w-4xl mx-auto">
            {article.content}
          </article>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 sm:py-24 bg-pearl/30">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-8 text-center">Keep Learning</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {Object.entries(articleContent)
              .filter(([key]) => key !== slug)
              .slice(0, 3)
              .map(([key, art]) => (
                <Link 
                  key={key}
                  to={`/knowledge/${key}`}
                  className="glass-card-light rounded-2xl p-6 hover:-translate-y-2 transition-all duration-300 group"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-energy transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{art.subtitle}</p>
                  <span className="text-energy text-sm font-medium flex items-center gap-1">
                    Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default KnowledgeArticle;
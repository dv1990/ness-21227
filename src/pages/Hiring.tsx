import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Rocket,
  Microscope,
  Shuffle,
  Heart,
  IndianRupee,
  ShieldCheck,
  BookOpen,
  Zap,
  Send,
  MessageSquare,
  Code2,
  Users,
  MapPin,
  Briefcase,
  ChevronDown,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { AnimatedCard } from "@/components/ui/animated-card";

import manufacturingImg from "@/assets/manufacturing-facility.jpg";
import trainingImg from "@/assets/training-workshop.jpg";
import batteryImg from "@/assets-webp/battery-technology.webp";

// ─── Data ────────────────────────────────────────────────────────────────────

interface JobRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

const DEPARTMENTS = ["All", "Engineering", "Product", "Operations", "Sales"] as const;

const ROLES: JobRole[] = [
  {
    id: "embedded-firmware",
    title: "Embedded Firmware Engineer",
    department: "Engineering",
    location: "Bangalore",
    type: "Full-time",
    description:
      "Design and implement firmware for our BMS and energy management systems. You'll work at the intersection of power electronics and embedded software, writing code that protects real families.",
    requirements: [
      "3+ years with C/C++ on ARM Cortex-M microcontrollers",
      "Experience with CAN, SPI, I2C, UART protocols",
      "Battery management system or power electronics background",
      "Comfortable reading schematics and working with hardware teams",
      "Bonus: RTOS experience (FreeRTOS, Zephyr)",
    ],
  },
  {
    id: "power-electronics",
    title: "Power Electronics Engineer",
    department: "Engineering",
    location: "Bangalore",
    type: "Full-time",
    description:
      "Design inverter topologies and charging circuits for our AIO Series. From schematic to production — you own the full stack.",
    requirements: [
      "4+ years designing DC-DC converters, inverters, or chargers",
      "Proficiency with SPICE simulation and PCB layout review",
      "Experience with magnetics design and thermal management",
      "Understanding of safety standards (IEC 62619, UL)",
      "Bonus: GaN or SiC device experience",
    ],
  },
  {
    id: "full-stack",
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Bangalore",
    type: "Full-time",
    description:
      "Build the monitoring dashboard and configurator tools that homeowners and installers use every day. React, TypeScript, real-time data. Code that people depend on.",
    requirements: [
      "3+ years with React/TypeScript and Node.js",
      "Experience with real-time data (WebSockets, MQTT, or similar)",
      "Database design (PostgreSQL, TimescaleDB, or InfluxDB)",
      "Understanding of CI/CD and cloud deployment (AWS/GCP)",
      "Bonus: IoT or energy domain experience",
    ],
  },
  {
    id: "product-manager",
    title: "Product Manager — Home Energy",
    department: "Product",
    location: "Bangalore",
    type: "Full-time",
    description:
      "Own the homeowner product experience end-to-end. From configurator UX to installer onboarding. Talk to customers weekly. Ship monthly.",
    requirements: [
      "3+ years in product management for hardware or IoT products",
      "Strong user research and data analysis skills",
      "Experience working cross-functionally with engineering and design",
      "Comfort with technical concepts (APIs, firmware, hardware)",
      "Bonus: Energy or clean-tech industry experience",
    ],
  },
  {
    id: "supply-chain",
    title: "Supply Chain Manager",
    department: "Operations",
    location: "Bangalore",
    type: "Full-time",
    description:
      "Source cells, manage vendors, optimize logistics across India. You'll build the supply chain for a product that didn't exist 3 years ago.",
    requirements: [
      "5+ years in supply chain or procurement (electronics/batteries preferred)",
      "Vendor negotiation and relationship management",
      "Experience with inventory planning and demand forecasting",
      "Knowledge of import/export regulations for lithium-ion products",
      "Bonus: ERP system implementation experience",
    ],
  },
  {
    id: "sales-south",
    title: "Regional Sales Manager — South India",
    department: "Sales",
    location: "Bangalore / Chennai",
    type: "Full-time",
    description:
      "Build relationships with EPCs, installers, and channel partners across Karnataka, Tamil Nadu, and Kerala. Consultative selling for a product that sells itself once people see it.",
    requirements: [
      "4+ years in B2B sales (solar, energy, or building materials preferred)",
      "Established network of EPC contractors or electrical distributors in South India",
      "Consultative selling approach — this isn't transactional",
      "Willingness to travel 40-50% across the region",
      "Bonus: Solar or energy storage sales experience",
    ],
  },
];

const CULTURE_CARDS = [
  {
    icon: Rocket,
    title: "You'll ship in your first week.",
    body: "Not a metaphor. Your code, your circuit, your decision — live in production before your onboarding paperwork clears. Terrified? Wrong place. Thrilled? Keep reading.",
  },
  {
    icon: Microscope,
    title: "We argue about millivolts.",
    body: "Three-hour debates about cell chemistry. 12 quality checks on every unit. We've rejected entire production batches over a 2% deviation. Exhausting? Absolutely. That's the point.",
  },
  {
    icon: Shuffle,
    title: "Nobody here has a normal resume.",
    body: "Our firmware lead built racing drones. Supply chain manager? Former chef. We hire for obsession, not pedigree. Show us what you've built at 2am when nobody asked you to.",
  },
  {
    icon: Heart,
    title: "We build for the midnight moment.",
    body: "The child's exam at 11pm. The ICU ventilator at 3am. The wedding reception that can't go dark. Our product disappears into the background of life — until the grid fails. Then it's everything.",
  },
];

const BENEFITS = [
  {
    icon: IndianRupee,
    title: "Top-of-market pay + equity.",
    body: "We're early. You're early. Build wealth, not just a salary.",
  },
  {
    icon: ShieldCheck,
    title: "Health from day one.",
    body: "Full family coverage. No waiting periods. No fine print. No exceptions.",
  },
  {
    icon: BookOpen,
    title: "Annual learning budget.",
    body: "Conferences, courses, books — whatever makes you dangerous. Your growth isn't a cost center.",
  },
  {
    icon: Zap,
    title: "NESS for your home.",
    body: "Employee discount on our products. Practice what we preach.",
  },
];

const HIRING_STEPS = [
  {
    icon: Send,
    title: "Apply",
    body: "Your resume + a line about what excites you. No cover letter required.",
  },
  {
    icon: MessageSquare,
    title: "Intro Chat",
    body: "30-min call. We'll tell you about us. You tell us what you're looking for. Honest.",
  },
  {
    icon: Code2,
    title: "Build Something",
    body: "A real problem from our stack. Take-home or live — your choice. No whiteboard puzzles.",
  },
  {
    icon: Users,
    title: "Meet the Team",
    body: "Lunch with the people you'd work with. Ask us anything. This goes both ways.",
  },
];

const LIFE_IMAGES = [
  {
    src: manufacturingImg,
    caption: "2am Friday — the team that cracked the 10ms switchover bug",
  },
  {
    src: trainingImg,
    caption: "Rooftop lunch debates that accidentally become the product roadmap",
  },
  {
    src: batteryImg,
    caption: "Testing in 45\u00B0C Rajasthan heat. Because Indian conditions aren't lab conditions.",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

const Careers = () => {
  const [activeDepartment, setActiveDepartment] = useState<string>("All");
  const [expandedRole, setExpandedRole] = useState<string | null>(null);

  const filteredRoles =
    activeDepartment === "All"
      ? ROLES
      : ROLES.filter((r) => r.department === activeDepartment);

  const scrollToRoles = () => {
    document.getElementById("open-roles")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout className="-mt-16">
      {/* ───── Section 1: Hero — Tribe Declaration ───── */}
      <section className="relative min-h-screen flex items-center bg-pearl overflow-hidden">
        {/* Subtle tech pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 relative z-10 w-full">
          <div className="space-y-12 md:space-y-20 text-center">
            <div className="space-y-8 md:space-y-12">
              <div className="inline-block px-4 md:px-5 py-2 bg-charcoal/5 rounded-full backdrop-blur-sm">
                <span className="text-[10px] md:text-sm uppercase tracking-[0.12em] md:tracking-[0.15em] text-charcoal/60 font-medium whitespace-nowrap">
                  Bangalore &middot; Deep Tech &middot; Clean Energy
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight text-charcoal leading-[0.95] tracking-tight px-4">
                We declared war
                <br />
                on <span className="font-light italic">blackouts.</span>
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl text-charcoal/60 font-light leading-[1.6] max-w-3xl mx-auto px-4">
                50 engineers. One obsession. 300 million Indian homes
                deserve power that never fails. We're building the machine that delivers it.
              </p>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-2 gap-8 md:gap-16 max-w-xl mx-auto pt-4 md:pt-8">
              <div className="space-y-3">
                <div className="text-5xl md:text-6xl font-extralight text-charcoal tabular-nums">
                  <AnimatedCounter value={50} duration={1800} suffix="+" />
                </div>
                <div className="text-xs md:text-sm uppercase tracking-[0.15em] text-charcoal/50">
                  Team Members
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-5xl md:text-6xl font-extralight text-charcoal tabular-nums">
                  <AnimatedCounter value={4} duration={1500} suffix="+" />
                </div>
                <div className="text-xs md:text-sm uppercase tracking-[0.15em] text-charcoal/50">
                  Years of R&D
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                onClick={scrollToRoles}
                className="bg-charcoal text-pearl hover:bg-charcoal/90 text-base px-8 py-6 rounded-full"
              >
                See Open Roles
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Link to="/company/about" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-charcoal/20 text-charcoal hover:bg-charcoal/5 text-base px-8 py-6 rounded-full w-full sm:w-auto"
                >
                  Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Section 2: Origin & Stakes ───── */}
      <section className="py-20 md:py-32 lg:py-40 bg-charcoal text-pearl relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% 100%, hsl(151 100% 45% / 0.08), transparent),
              radial-gradient(ellipse 60% 40% at 20% 80%, hsl(151 100% 45% / 0.04), transparent)
            `,
          }}
        />
        <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
          <div className="space-y-12 md:space-y-16">
            <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-[1.5] text-pearl/90 text-center">
              A hospital in Tamil Nadu.
              <br className="hidden md:block" />
              Six hours without power. The backup generator{" "}
              <span className="italic">failed.</span>
              <br className="hidden md:block" />
              A ventilator went silent.
            </p>

            <p className="text-xl md:text-2xl text-pearl/60 font-medium leading-[1.7] max-w-3xl mx-auto text-center">
              That's not a statistic. That's why we don't sleep well.
            </p>

            <p className="text-lg md:text-xl text-pearl/40 font-light leading-[1.7] max-w-3xl mx-auto text-center">
              The grid wasn't built for this century. Diesel generators poison the air.
              We're building what replaces both.
            </p>

            {/* Impact metrics */}
            <div className="grid grid-cols-3 gap-6 md:gap-12 pt-8 md:pt-12 border-t border-pearl/10 max-w-3xl mx-auto">
              <div className="text-center space-y-2">
                <div className="text-3xl md:text-5xl font-extralight text-energy tabular-nums">
                  <AnimatedCounter value={500} duration={2000} suffix="+" />
                </div>
                <div className="text-xs md:text-sm uppercase tracking-[0.15em] text-pearl/40">
                  Indian Homes Powered
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl md:text-5xl font-extralight text-energy tabular-nums">
                  <AnimatedCounter value={99} duration={1800} suffix="%" />
                </div>
                <div className="text-xs md:text-sm uppercase tracking-[0.15em] text-pearl/40">
                  System Uptime
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl md:text-5xl font-extralight text-energy tabular-nums">
                  <AnimatedCounter value={10} duration={1500} suffix="ms" />
                </div>
                <div className="text-xs md:text-sm uppercase tracking-[0.15em] text-pearl/40">
                  Switchover Speed
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Section 3: Culture — What Nobody Tells You ───── */}
      <section className="py-20 md:py-32 lg:py-40 bg-whisper">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-24 space-y-6 md:space-y-8">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight text-charcoal leading-[1.1] tracking-tight px-4">
              What nobody tells you
              <br />
              about working here.
            </h2>
            <p className="text-lg md:text-xl text-charcoal/60 font-light max-w-2xl mx-auto">
              No corporate platitudes. Here's what it's actually like.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {CULTURE_CARDS.map((card, i) => (
              <AnimatedCard
                key={card.title}
                hover="lift"
                delay={i * 100}
                className="bg-pearl border border-platinum/30 rounded-2xl overflow-hidden"
              >
                <div className="p-8 md:p-10 space-y-5">
                  <div className="w-12 h-12 rounded-full bg-whisper flex items-center justify-center">
                    <card.icon className="w-6 h-6 text-charcoal" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-light text-charcoal leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-base md:text-lg text-charcoal/70 leading-[1.7]">{card.body}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Section 4: Life at NESS — Raw, Not Polished ───── */}
      <section className="py-20 md:py-32 bg-whisper">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extralight text-charcoal tracking-tight">
              Inside the machine.
            </h2>
            <p className="text-lg text-charcoal/60 font-light">
              Bangalore R&D. No stock photos. No staged smiles. This is what it actually looks like.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {LIFE_IMAGES.map((img, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-default"
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <p className="text-sm md:text-base text-pearl/90 font-light leading-snug">
                    {img.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Section 5: The Deal — Benefits as Identity ───── */}
      <section className="py-20 md:py-32 lg:py-40 bg-pearl">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12 md:mb-20 space-y-8">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extralight text-charcoal tracking-tight leading-[1.1]">
              What you get.
              <br />
              What we expect.
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-charcoal/60 font-light leading-[1.7] max-w-3xl mx-auto">
              Top-of-market pay. Full health cover from day one. A learning budget that actually exists.
              In return? Ship like someone's power depends on it.{" "}
              <span className="text-charcoal font-medium italic">Because it does.</span>
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {BENEFITS.map((b, i) => (
              <AnimatedCard
                key={b.title}
                hover="lift"
                delay={i * 80}
                className="bg-whisper border border-platinum/30 rounded-2xl overflow-hidden"
              >
                <div className="p-8 md:p-10 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-pearl flex items-center justify-center">
                    <b.icon className="w-6 h-6 text-charcoal" />
                  </div>
                  <h3 className="text-lg md:text-xl font-light text-charcoal">{b.title}</h3>
                  <p className="text-base text-charcoal/60 leading-relaxed">{b.body}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Section 6: Hiring Process ───── */}
      <section className="py-20 md:py-32 bg-whisper">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extralight text-charcoal tracking-tight">
              Four conversations. Zero games.
            </h2>
            <p className="text-lg text-charcoal/60 font-light">
              No whiteboard riddles. No six-round marathons. Here's the entire process.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Connecting line — horizontal on md+, vertical on mobile */}
            <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-px border-t-2 border-dashed border-charcoal/15" />
            <div className="md:hidden absolute top-0 bottom-0 left-6 w-px border-l-2 border-dashed border-charcoal/15" />

            <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-4">
              {HIRING_STEPS.map((step, i) => (
                <div key={step.title} className="flex md:flex-col items-start md:items-center gap-5 md:gap-4 md:flex-1 relative">
                  <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-pearl border-2 border-charcoal/10 flex items-center justify-center shrink-0 relative z-10">
                    <step.icon className="w-5 h-5 md:w-7 md:h-7 text-charcoal/70" />
                  </div>
                  <div className="md:text-center space-y-2 pt-1 md:pt-4">
                    <div className="text-xs uppercase tracking-[0.15em] text-charcoal/40 font-medium">
                      Step {i + 1}
                    </div>
                    <h3 className="text-lg md:text-xl font-light text-charcoal">{step.title}</h3>
                    <p className="text-sm md:text-base text-charcoal/60 leading-relaxed max-w-[240px]">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── Section 7: Open Roles ───── */}
      <section id="open-roles" className="py-20 md:py-32 lg:py-40 bg-pearl scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extralight text-charcoal tracking-tight">
              Pick your fight.
            </h2>
            <p className="text-lg text-charcoal/60 font-light">
              Open roles at Bangalore HQ. Every one of them matters.
            </p>
          </div>

          {/* Department filter pills */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDepartment(dept)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeDepartment === dept
                    ? "bg-charcoal text-pearl shadow-md"
                    : "bg-whisper text-charcoal/60 hover:bg-platinum hover:text-charcoal"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Role cards */}
          <div className="space-y-4">
            {filteredRoles.map((role) => {
              const isExpanded = expandedRole === role.id;
              return (
                <div
                  key={role.id}
                  className="bg-whisper border border-platinum/40 rounded-xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setExpandedRole(isExpanded ? null : role.id)}
                    className="w-full px-6 py-5 md:px-8 md:py-6 flex items-center justify-between gap-4 text-left hover:bg-platinum/30 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-light text-charcoal truncate">
                        {role.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="inline-flex items-center gap-1 text-xs text-charcoal/50 bg-pearl px-3 py-1 rounded-full">
                          <Briefcase className="w-3 h-3" />
                          {role.department}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-charcoal/50 bg-pearl px-3 py-1 rounded-full">
                          <MapPin className="w-3 h-3" />
                          {role.location}
                        </span>
                        <span className="text-xs text-charcoal/40 bg-pearl px-3 py-1 rounded-full">
                          {role.type}
                        </span>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-charcoal/40 shrink-0 transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-6 md:px-8 md:pb-8 space-y-5 border-t border-platinum/30 pt-5">
                      <p className="text-base text-charcoal/70 leading-relaxed">
                        {role.description}
                      </p>
                      <div>
                        <h4 className="text-sm uppercase tracking-[0.1em] text-charcoal/40 font-medium mb-3">
                          What we're looking for
                        </h4>
                        <ul className="space-y-2">
                          {role.requirements.map((req, i) => (
                            <li
                              key={i}
                              className="text-sm text-charcoal/60 leading-relaxed flex items-start gap-2"
                            >
                              <span className="w-1.5 h-1.5 bg-energy rounded-full mt-2 shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <a
                        href={`mailto:careers@nunam.com?subject=Application%3A%20${encodeURIComponent(role.title)}`}
                        className="inline-block"
                      >
                        <Button className="bg-charcoal text-pearl hover:bg-charcoal/90 rounded-full px-8">
                          Apply Now
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </a>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredRoles.length === 0 && (
              <div className="text-center py-12 text-charcoal/40">
                No openings in this department right now. Check back soon or send an open application below.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ───── Section 8: Open Application CTA ───── */}
      <section className="py-20 md:py-32 lg:py-40 bg-charcoal text-pearl relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% 100%, hsl(151 100% 45% / 0.06), transparent),
              radial-gradient(ellipse 60% 40% at 80% 80%, hsl(151 100% 45% / 0.03), transparent)
            `,
          }}
        />
        <div className="max-w-3xl mx-auto px-6 md:px-12 relative z-10 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extralight leading-[1.1] tracking-tight">
            Don't fit a box?
            <br />
            <span className="text-energy italic">Good.</span>
          </h2>
          <p className="text-lg md:text-xl text-pearl/60 font-light leading-[1.7] max-w-2xl mx-auto">
            Don't see your role? Tell us what you'd build with a team and six months.
            That's a more interesting application than any resume we've ever read.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a href="mailto:careers@nunam.com?subject=I%20have%20an%20idea">
              <Button
                size="lg"
                className="bg-energy text-charcoal hover:bg-energy-bright font-medium text-base px-8 py-6 rounded-full w-full sm:w-auto"
              >
                Tell Us Your Idea
                <Send className="ml-2 w-4 h-4" />
              </Button>
            </a>
            <a
              href="https://www.linkedin.com/company/nunam"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-pearl/20 text-pearl hover:bg-pearl/10 text-base px-8 py-6 rounded-full w-full sm:w-auto"
              >
                Find us on LinkedIn
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;

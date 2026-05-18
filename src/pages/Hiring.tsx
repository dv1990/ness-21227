import { useState } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import {
  MapPin,
  Briefcase,
  ChevronDown,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

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
      "You own every line of firmware between the battery and the family it protects. BMS logic, energy management, failsafe routines — when your code runs, it's the last line of defense. No review committee will save you. Your standards will.",
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
      "Inverter topologies. Charging circuits. Thermal management. From first schematic to the unit that ships — it's yours. If it fails in a Rajasthan summer, that's on you. If it runs flawlessly for 10 years, that's on you too.",
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
      "The dashboard a homeowner checks at 2am during a storm. The configurator an installer uses on a rooftop in Chennai. You own every pixel and every millisecond of response time. Real-time data, real consequences.",
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
      "The entire homeowner experience is your territory — from first click to first blackout survived. You talk to customers weekly, ship monthly, and own the outcome. No one will tell you what to prioritize. That's your job.",
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
      "Every cell, every vendor, every shipment across India — that's your supply chain to build from scratch. When a production run is late, you don't escalate. You fix it. The product didn't exist 3 years ago. Neither did this role.",
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
      "South India is your territory — Karnataka, Tamil Nadu, Kerala. Every EPC relationship, every installer partnership, every channel decision is yours to make. You don't wait for leads. You build a market.",
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
    numeral: "I.",
    title: "You own it from day one.",
    body: "First week: real code in production. Real circuits on the bench. No shadowing period. No training wheels. You either own your output or you don't belong here.",
  },
  {
    numeral: "II.",
    title: "Your name is on every unit.",
    body: "12 quality checks. Every single unit. We've scrapped entire batches over a 2% deviation — and the engineer who caught it made the call alone. No committee. If your standard is 'good enough,' you'll hate it here.",
  },
  {
    numeral: "III.",
    title: "Nobody will hand you a playbook.",
    body: "Our firmware lead built racing drones. Supply chain manager was a chef. We don't hire résumés — we hire people who've solved problems nobody assigned them. Figure-it-out is the only job description.",
  },
  {
    numeral: "IV.",
    title: "You answer to the family at 3am.",
    body: "Not a manager. Not a sprint review. The child studying for exams. The ICU ventilator. The wedding that can't go dark. Every shortcut you take, someone's power depends on. Own that weight or don't apply.",
  },
];

const BENEFITS = [
  {
    glyph: "§",
    title: "Equity. Not a bonus — a stake.",
    body: "Owners get ownership. We're early, the upside is real, and your work compounds. Build wealth alongside the company you're building.",
  },
  {
    glyph: "¶",
    title: "Your family is covered. Period.",
    body: "Full health coverage from day one. No waiting periods. No fine print. We don't ask you to sacrifice your family for a deadline — ever.",
  },
  {
    glyph: "†",
    title: "Get dangerous. We'll fund it.",
    body: "Annual budget for courses, conferences, books — whatever makes you harder to replace. Your growth is the company's growth.",
  },
  {
    glyph: "❋",
    title: "Run NESS in your own home.",
    body: "Employee pricing on our products. If you're going to own the problem, you should own the solution too.",
  },
];

const HIRING_STEPS = [
  {
    title: "Show Up",
    body: "Resume + one line: what would you own here? That tells us more than any cover letter.",
  },
  {
    title: "Real Talk",
    body: "30 minutes. No scripts. We'll be honest about what's hard. You be honest about what you want.",
  },
  {
    title: "Prove It",
    body: "A real problem from our stack. Take-home or live — your call. We judge ownership, not trivia.",
  },
  {
    title: "Meet Your Team",
    body: "Lunch with the people you'd work beside. Grill us. If we're not right for you, we want to know too.",
  },
];

const LIFE_IMAGES = [
  {
    src: manufacturingImg,
    caption: "2am Friday — the team that cracked the 10ms switchover bug",
    folio: "PLATE I",
  },
  {
    src: trainingImg,
    caption: "Rooftop lunch debates that accidentally become the product roadmap",
    folio: "PLATE II",
  },
  {
    src: batteryImg,
    caption: "Testing in 45°C Rajasthan heat. Because Indian conditions aren't lab conditions.",
    folio: "PLATE III",
  },
];

// ─── Small editorial bits ────────────────────────────────────────────────────

const FolioStrip = ({ left, center, right }: { left: string; center?: string; right: string }) => (
  <div className="flex items-center justify-between gap-4 border-y border-charcoal/20 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/60">
    <span>{left}</span>
    {center && <span className="hidden md:inline">{center}</span>}
    <span>{right}</span>
  </div>
);

const SectionNumber = ({ index, total, label }: { index: string; total: string; label: string }) => (
  <div className="flex items-baseline gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-charcoal/60">
    <span className="text-charcoal">{index}</span>
    <span className="h-px flex-1 bg-charcoal/20" />
    <span>{label}</span>
    <span className="h-px w-8 bg-charcoal/20" />
    <span>{total}</span>
  </div>
);

// ─── Component ───────────────────────────────────────────────────────────────

const Careers = () => {
  const [activeDepartment, setActiveDepartment] = useState<string>("All");
  const [expandedRole, setExpandedRole] = useState<string | null>(null);

  const filteredRoles =
    activeDepartment === "All"
      ? ROLES
      : ROLES.filter((r) => r.department === activeDepartment);

  return (
    <Layout className="-mt-16">
      {/* ───── 00 · MASTHEAD ───── */}
      <section className="relative bg-pearl overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-28 md:pt-36 pb-16">
          {/* top folio */}
          <div className="border-t-2 border-charcoal pt-3">
            <div className="flex items-center justify-between font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-charcoal/70">
              <span>The NESS Dispatch</span>
              <span className="hidden md:inline">Issue №01 · Vol. 04</span>
              <span>Bangalore · Est. MMXXII</span>
            </div>
          </div>

          {/* Masthead title */}
          <div className="grid grid-cols-12 gap-4 md:gap-6 mt-10 md:mt-16">
            <div className="col-span-12 md:col-span-9">
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-charcoal/60 mb-4">
                The Careers Issue / A Hiring Manifesto
              </div>
              <h1 className="font-display font-light text-[18vw] md:text-[15vw] lg:text-[180px] leading-[0.82] tracking-[-0.04em] text-charcoal">
                Black<span className="italic font-extralight">outs</span>
                <br />
                end <span className="text-energy">·</span> here.
              </h1>
            </div>
            <aside className="col-span-12 md:col-span-3 md:pt-2 space-y-4 md:border-l md:border-charcoal/15 md:pl-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/50">
                Marginalia ↓
              </div>
              <p className="font-serif italic text-base text-charcoal/70 leading-[1.55]">
                A small note from the editor — this isn't a careers page. It's a list of problems
                that need owners. If you scroll for perks, you'll be disappointed. If you scroll
                for stakes, welcome.
              </p>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/40">
                — Yours, ed.
              </div>
            </aside>
          </div>

          {/* sub-deck */}
          <div className="grid grid-cols-12 gap-4 md:gap-6 mt-12 md:mt-16">
            <div className="col-span-12 md:col-span-7 md:col-start-3">
              <p className="font-serif text-xl md:text-2xl text-charcoal leading-[1.55] first-letter:font-display first-letter:font-light first-letter:text-7xl md:first-letter:text-8xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.85]">
                No committees. No spectators. Fifty engineers who each own a piece of the problem
                — from lab bench to living room. If you need permission to act, this isn't your
                place. <em>Own it, or scroll past.</em>
              </p>
            </div>
          </div>

          {/* metadata strip */}
          <div className="mt-16 md:mt-24">
            <FolioStrip left="50+ on the masthead" center="Four years on press" right="Page 01 / 08" />
            <div className="grid grid-cols-2 gap-0 mt-0">
              <div className="border-r border-charcoal/15 py-6 pr-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/50 mb-2">
                  Headcount
                </div>
                <div className="font-display font-extralight text-6xl md:text-7xl text-charcoal tabular-nums tracking-tight">
                  50<span className="text-energy">+</span>
                </div>
              </div>
              <div className="py-6 pl-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/50 mb-2">
                  Years on the bench
                </div>
                <div className="font-display font-extralight text-6xl md:text-7xl text-charcoal tabular-nums tracking-tight">
                  04
                </div>
              </div>
            </div>
            <FolioStrip left="" right="Continued overleaf →" />
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <a href="#open-roles" className="group inline-flex items-center gap-3 px-6 py-4 bg-charcoal text-pearl font-mono text-[11px] uppercase tracking-[0.22em]">
              See the classifieds
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              to="/company/about"
              className="inline-flex items-center gap-3 px-6 py-4 border border-charcoal/40 text-charcoal font-mono text-[11px] uppercase tracking-[0.22em] hover:bg-charcoal hover:text-pearl transition-colors"
            >
              Read our field guide →
            </Link>
          </div>
        </div>
      </section>

      {/* ───── 01 · DISPATCH / The Origin Story ───── */}
      <section className="bg-charcoal text-pearl">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-pearl/50 flex items-center gap-4 mb-12">
            <span className="text-pearl">01</span>
            <span className="h-px flex-1 bg-pearl/20" />
            <span>Dispatch · The Stakes</span>
            <span className="h-px w-8 bg-pearl/20" />
            <span>of 04</span>
          </div>

          <div className="grid grid-cols-12 gap-4 md:gap-8">
            <div className="col-span-12 md:col-span-2 md:pt-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-pearl/40">
                Filed from
              </div>
              <div className="font-serif italic text-pearl/80 mt-1">Tamil Nadu</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-pearl/40 mt-6">
                Dateline
              </div>
              <div className="font-mono text-pearl/80 mt-1 text-sm">03:12 AM</div>
            </div>

            <div className="col-span-12 md:col-span-8 md:col-start-3 space-y-8">
              <p className="font-serif text-3xl md:text-5xl leading-[1.15] text-pearl tracking-tight">
                A hospital in Tamil Nadu. Six hours without power. The backup generator{" "}
                <em className="text-energy not-italic font-display font-light underline decoration-energy/40 decoration-from-font underline-offset-[6px]">
                  failed.
                </em>{" "}
                A ventilator went silent.
              </p>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-1 font-display text-6xl md:text-7xl text-energy leading-none">
                  &ldquo;
                </div>
                <p className="col-span-12 md:col-span-11 font-serif italic text-lg md:text-xl text-pearl/70 leading-[1.7]">
                  That's not a statistic. That's the problem you'd own. Three hundred million homes
                  on a failing grid. Diesel generators poisoning the air. Nobody's coming to fix
                  this. So we are. The question is whether you're the kind of person who reads
                  that and feels <span className="text-pearl not-italic">responsible.</span>
                </p>
              </div>

              <div className="pt-8 border-t border-pearl/15 grid grid-cols-3 gap-6 md:gap-12">
                <div>
                  <div className="font-display font-extralight text-4xl md:text-6xl tabular-nums text-pearl">500<span className="text-energy">+</span></div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-pearl/40 mt-2">Homes powered</div>
                </div>
                <div>
                  <div className="font-display font-extralight text-4xl md:text-6xl tabular-nums text-pearl">99<span className="text-pearl/40 text-2xl md:text-3xl align-top">%</span></div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-pearl/40 mt-2">Uptime</div>
                </div>
                <div>
                  <div className="font-display font-extralight text-4xl md:text-6xl tabular-nums text-pearl">10<span className="text-pearl/40 text-2xl md:text-3xl align-top">ms</span></div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-pearl/40 mt-2">Switchover</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center font-mono text-pearl/30 tracking-[0.5em]">⁂</div>
        </div>
      </section>

      {/* ───── 02 · THE MANIFESTO ───── */}
      <section className="bg-pearl">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36">
          <SectionNumber index="02" total="of 04" label="The Manifesto · Four Articles" />

          <div className="grid grid-cols-12 gap-4 md:gap-6 mt-12 md:mt-16">
            <div className="col-span-12 md:col-span-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/50 mb-4">
                On the matter of —
              </div>
              <h2 className="font-display font-light text-6xl md:text-8xl lg:text-[140px] leading-[0.88] tracking-[-0.035em] text-charcoal">
                Extreme
                <br />
                <em className="font-extralight text-charcoal/30">ownership.</em>
              </h2>
            </div>
            <aside className="col-span-12 md:col-span-4 md:pt-12 md:border-l md:border-charcoal/15 md:pl-6 space-y-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/50">
                A footnote*
              </div>
              <p className="font-serif italic text-base text-charcoal/70 leading-[1.55]">
                Not a slogan. Not a poster on the wall. Four articles of how we actually behave
                when nobody's watching — printed here so you can hold us to them.
              </p>
              <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-charcoal/40 pt-2">
                * see overleaf for the four
              </div>
            </aside>
          </div>

          {/* The four articles — newspaper columns */}
          <div className="mt-16 md:mt-24 border-t border-charcoal pt-8">
            <div className="grid md:grid-cols-2 gap-x-12 md:gap-x-16 gap-y-12">
              {CULTURE_CARDS.map((card, i) => (
                <article key={card.title} className={`relative ${i < 2 ? "md:pb-12 md:border-b md:border-charcoal/15" : ""}`}>
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="font-display font-light text-4xl md:text-5xl text-energy tabular-nums">
                      {card.numeral}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/40 flex-1 border-b border-dotted border-charcoal/30 pb-1">
                      Article № {i + 1}
                    </span>
                  </div>
                  <h3 className="font-display font-light text-2xl md:text-3xl text-charcoal leading-[1.15] tracking-tight mb-4">
                    {card.title}
                  </h3>
                  <p className="font-serif text-base md:text-lg text-charcoal/80 leading-[1.7] first-letter:font-display first-letter:text-5xl first-letter:font-light first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:leading-[0.85] first-letter:text-charcoal">
                    {card.body}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-24 text-center font-mono text-charcoal/30 tracking-[0.5em]">§ § §</div>
        </div>
      </section>

      {/* ───── PLATES · Inside the machine ───── */}
      <section className="bg-whisper">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
          <FolioStrip left="Photo plates" center="Bangalore R&D" right="Unretouched" />

          <div className="grid grid-cols-12 gap-4 md:gap-6 mt-8 mb-12">
            <div className="col-span-12 md:col-span-7">
              <h2 className="font-display font-light text-4xl md:text-6xl text-charcoal leading-[0.95] tracking-tight">
                Inside <em className="font-extralight text-charcoal/40">the machine.</em>
              </h2>
            </div>
            <aside className="col-span-12 md:col-span-4 md:col-start-9 md:pt-2">
              <p className="font-serif italic text-charcoal/60 text-sm leading-[1.6]">
                No stock photos. No staged smiles. This is what it actually looks like —
                a Tuesday, a Thursday, a 2am Friday.
              </p>
            </aside>
          </div>

          <div className="grid md:grid-cols-12 gap-4 md:gap-6">
            {LIFE_IMAGES.map((img, i) => (
              <figure
                key={i}
                className={`relative ${
                  i === 0 ? "md:col-span-7" : i === 1 ? "md:col-span-5" : "md:col-span-12"
                }`}
              >
                <div className={`relative overflow-hidden bg-charcoal/5 ${i === 2 ? "aspect-[21/9]" : "aspect-[4/3]"}`}>
                  <img
                    src={img.src}
                    alt={img.caption}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover grayscale-[15%] transition-all duration-700 hover:grayscale-0"
                  />
                </div>
                <figcaption className="mt-3 flex items-baseline gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/60">
                  <span className="text-charcoal">{img.folio}</span>
                  <span className="h-px w-6 bg-charcoal/30" />
                  <span className="font-serif italic normal-case tracking-normal text-charcoal/70 text-sm">
                    {img.caption}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ───── 03 · THE DEAL ───── */}
      <section className="bg-pearl">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36">
          <SectionNumber index="03" total="of 04" label="The Deal · Owner Terms" />

          <div className="grid grid-cols-12 gap-4 md:gap-6 mt-12 md:mt-16">
            <div className="col-span-12 md:col-span-6">
              <h2 className="font-display font-light text-6xl md:text-8xl leading-[0.9] tracking-[-0.035em] text-charcoal">
                Owners
                <br />
                get <em className="font-extralight text-charcoal/40">owner</em>
                <br />
                terms.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 md:col-start-8 md:pt-6">
              <p className="font-serif text-lg md:text-xl text-charcoal/80 leading-[1.7]">
                We'll never ask you to sacrifice your health, your family, or your sanity for a
                deadline. In return, you treat every unit that leaves this building like your
                family's power depends on it.{" "}
                <em className="text-charcoal font-display not-italic underline decoration-energy decoration-2 underline-offset-4">
                  Because someone's does.
                </em>
              </p>
            </div>
          </div>

          {/* Benefits — as bonded clauses */}
          <div className="mt-16 md:mt-24 border-t border-charcoal">
            {BENEFITS.map((b, i) => (
              <article
                key={b.title}
                className="grid grid-cols-12 gap-4 md:gap-6 border-b border-charcoal/15 py-8 md:py-10"
              >
                <div className="col-span-2 md:col-span-1 font-display font-light text-3xl md:text-5xl text-energy leading-none">
                  {b.glyph}
                </div>
                <div className="col-span-10 md:col-span-2">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/40">
                    Clause
                  </div>
                  <div className="font-mono text-charcoal text-sm mt-1 tabular-nums">
                    0{i + 1} / 0{BENEFITS.length}
                  </div>
                </div>
                <h3 className="col-span-12 md:col-span-4 font-display font-light text-xl md:text-2xl text-charcoal leading-tight tracking-tight">
                  {b.title}
                </h3>
                <p className="col-span-12 md:col-span-5 font-serif text-base text-charcoal/70 leading-[1.7]">
                  {b.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───── PROCESS ───── */}
      <section className="bg-whisper">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <FolioStrip left="The Process" center="Four steps. No theatre." right="≈ 2 weeks" />

          <h2 className="font-display font-light text-5xl md:text-7xl text-charcoal leading-[0.95] tracking-tight mt-10 mb-16">
            Four steps.
            <br />
            <em className="font-extralight text-charcoal/40">No theatre.</em>
          </h2>

          <div className="grid md:grid-cols-4 gap-0 border-t border-charcoal">
            {HIRING_STEPS.map((step, i) => (
              <div
                key={step.title}
                className={`py-8 md:py-10 ${i < HIRING_STEPS.length - 1 ? "md:border-r" : ""} border-b md:border-b-0 border-charcoal/15 md:pr-6 ${i > 0 ? "md:pl-6" : ""}`}
              >
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="font-display font-light text-5xl md:text-6xl tabular-nums text-charcoal">
                    0{i + 1}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/40">
                    /04
                  </span>
                </div>
                <h3 className="font-display font-light text-xl md:text-2xl text-charcoal mb-3">
                  {step.title}
                </h3>
                <p className="font-serif text-sm md:text-base text-charcoal/70 leading-[1.65]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── 04 · THE CLASSIFIEDS ───── */}
      <section id="open-roles" className="bg-pearl scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36">
          <SectionNumber index="04" total="of 04" label="The Classifieds · Open Roles" />

          <div className="grid grid-cols-12 gap-4 md:gap-6 mt-12 md:mt-16">
            <div className="col-span-12 md:col-span-8">
              <h2 className="font-display font-light text-5xl md:text-7xl lg:text-8xl text-charcoal leading-[0.92] tracking-[-0.03em]">
                Problems
                <br />
                that need <em className="font-extralight text-energy">owners.</em>
              </h2>
            </div>
            <aside className="col-span-12 md:col-span-4 md:pt-6">
              <p className="font-serif italic text-charcoal/70 text-base leading-[1.6]">
                These aren't job titles — they're territories. Pick one and make it yours. Read
                each like a deed, not a description.
              </p>
            </aside>
          </div>

          {/* Department filter */}
          <div className="mt-12 mb-8 flex flex-wrap gap-x-6 gap-y-3 border-y border-charcoal py-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/50">
              Filter by desk →
            </span>
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDepartment(dept)}
                className={`font-mono text-[11px] uppercase tracking-[0.22em] transition-colors ${
                  activeDepartment === dept
                    ? "text-charcoal border-b border-energy"
                    : "text-charcoal/50 hover:text-charcoal border-b border-dotted border-transparent"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Classified ads */}
          <div className="divide-y divide-charcoal/20 border-b border-charcoal">
            {filteredRoles.map((role, idx) => {
              const isExpanded = expandedRole === role.id;
              return (
                <article key={role.id} className="py-6 md:py-8">
                  <button
                    onClick={() => setExpandedRole(isExpanded ? null : role.id)}
                    className="w-full text-left group"
                  >
                    <div className="grid grid-cols-12 gap-4 md:gap-6 items-baseline">
                      <div className="col-span-12 md:col-span-1 font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/40 tabular-nums">
                        № {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div className="col-span-10 md:col-span-7">
                        <h3 className="font-display font-light text-2xl md:text-4xl text-charcoal leading-tight tracking-tight group-hover:text-energy transition-colors">
                          {role.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/60">
                          <span className="inline-flex items-center gap-1.5">
                            <Briefcase className="w-3 h-3" />
                            {role.department}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="w-3 h-3" />
                            {role.location}
                          </span>
                          <span>· {role.type}</span>
                        </div>
                      </div>
                      <div className="col-span-2 md:col-span-4 flex md:justify-end items-baseline gap-3">
                        <span className="hidden md:inline font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/40 group-hover:text-charcoal transition-colors">
                          {isExpanded ? "Close ad ↑" : "Read ad ↓"}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-charcoal/60 transition-transform duration-300 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="grid grid-cols-12 gap-4 md:gap-6 mt-8 pt-6 border-t border-dashed border-charcoal/20">
                      <div className="col-span-12 md:col-span-1 hidden md:block" />
                      <div className="col-span-12 md:col-span-7 space-y-6">
                        <p className="font-serif text-lg text-charcoal/85 leading-[1.7] first-letter:font-display first-letter:text-5xl first-letter:font-light first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:leading-[0.85] first-letter:text-energy">
                          {role.description}
                        </p>
                      </div>
                      <div className="col-span-12 md:col-span-4 space-y-4">
                        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/40 border-b border-charcoal/30 pb-2">
                          What we look for
                        </div>
                        <ul className="space-y-2">
                          {role.requirements.map((req, i) => (
                            <li
                              key={i}
                              className="font-serif text-sm text-charcoal/70 leading-[1.6] flex gap-2"
                            >
                              <span className="text-energy">→</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                        <a
                          href={`mailto:careers@nunam.com?subject=Application%3A%20${encodeURIComponent(role.title)}`}
                          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-charcoal border-b border-energy pb-1 hover:text-energy transition-colors"
                        >
                          Claim this territory <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}

            {filteredRoles.length === 0 && (
              <div className="py-16 text-center font-serif italic text-charcoal/50">
                No classifieds at this desk this week. Send an open application overleaf —
                we read every one.
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/50">
            <span>End of classifieds</span>
            <span>Page 07 / 08</span>
          </div>
        </div>
      </section>

      {/* ───── COLOPHON / OPEN CALL ───── */}
      <section className="bg-charcoal text-pearl">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-24 md:py-36">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-pearl/50 flex items-center gap-4 mb-12">
            <span className="text-pearl">Colophon</span>
            <span className="h-px flex-1 bg-pearl/20" />
            <span>An Open Call</span>
          </div>

          <h2 className="font-display font-light text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-[-0.03em]">
            No role listed?
            <br />
            <em className="font-extralight text-energy">Create one.</em>
          </h2>

          <div className="grid grid-cols-12 gap-4 md:gap-6 mt-12">
            <div className="col-span-12 md:col-span-7 md:col-start-3">
              <p className="font-serif text-lg md:text-xl text-pearl/80 leading-[1.7] first-letter:font-display first-letter:text-7xl first-letter:font-light first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.85] first-letter:text-energy">
                The best people who ever joined us weren't applying for a position — they were
                claiming a problem. Tell us what you'd own, how you'd fix it, and why it can't
                wait. <em>Address your letter to the editor.</em>
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:careers@nunam.com?subject=I%20have%20an%20idea"
              className="inline-flex items-center gap-3 px-6 py-4 bg-energy text-charcoal font-mono text-[11px] uppercase tracking-[0.22em] hover:bg-energy-bright transition-colors"
            >
              Claim your problem <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/company/nunam"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 border border-pearl/30 text-pearl font-mono text-[11px] uppercase tracking-[0.22em] hover:bg-pearl/10 transition-colors"
            >
              Find us on LinkedIn <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="mt-20 pt-6 border-t border-pearl/15 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-pearl/40">
            <span>The NESS Dispatch · Careers Issue</span>
            <span>Set in Outfit & system serif · Bangalore</span>
            <span className="hidden md:inline">Page 08 / 08</span>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;

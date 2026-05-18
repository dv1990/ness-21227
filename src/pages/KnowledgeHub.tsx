import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

// ──────────────────────────────────────────────────────────────────────────
// THE LIBRARY · VOL. 04 · MAY 2026
// An editorial index of articles. Card-less. Rule-driven. Catalog-like.
// ──────────────────────────────────────────────────────────────────────────

type Entry = {
  slug: string;
  number: string;
  category: string;
  title: string;
  dek: string;
  byline: string;
  readTime: string;
  pages: string;
  audience: "homeowner" | "installer" | "newcomer";
};

const ENTRIES: Entry[] = [
  // ─── BATTERY BASICS · A PRIMER ──────────────────────────────────────
  // Six pieces written for the person who has never bought a battery before.
  // No jargon without translation. No vendor hype. Mom-tested copy.
  {
    slug: "basics-what-is-a-battery",
    number: "A1",
    category: "Basics · First Principles",
    title: "What is a battery, really?",
    dek: "You charged your phone last night. A home battery is the same idea, just bigger and quieter. Five paragraphs, no jargon.",
    byline: "The Primer Desk",
    readTime: "3 MIN",
    pages: "A1–A4",
    audience: "newcomer",
  },
  {
    slug: "basics-will-it-run-my-fan",
    number: "A2",
    category: "Basics · Practical Math",
    title: "Will my fan run for 4 hours?",
    dek: "A ceiling fan, a fridge, three tubelights, a phone charging. The number that matters is kWh. Here is what kWh means in things you can see.",
    byline: "The Primer Desk",
    readTime: "4 MIN",
    pages: "A5–A9",
    audience: "newcomer",
  },
  {
    slug: "basics-do-i-need-solar",
    number: "A3",
    category: "Basics · Common Question",
    title: "Do I need solar to use a battery?",
    dek: "No. But you will save less. The honest trade-off, in rupees, for the household that asks this question first.",
    byline: "The Primer Desk",
    readTime: "3 MIN",
    pages: "A10–A12",
    audience: "newcomer",
  },
  {
    slug: "basics-inverter-vs-battery",
    number: "A4",
    category: "Basics · Untangling Words",
    title: "Inverter, UPS, battery — what's the difference?",
    dek: "The big black box on your wall is probably one of three things. Here is how to tell which, and why the new one is not the old one with a fresh sticker.",
    byline: "The Primer Desk",
    readTime: "5 MIN",
    pages: "A13–A17",
    audience: "newcomer",
  },
  {
    slug: "basics-five-questions",
    number: "A5",
    category: "Basics · Buying Wisely",
    title: "Five questions to ask before you sign",
    dek: "You don't need a degree to spot a bad quote. Five questions any installer should answer in plain Hindi or English. If they can't — keep looking.",
    byline: "The Primer Desk",
    readTime: "4 MIN",
    pages: "A18–A22",
    audience: "newcomer",
  },
  {
    slug: "basics-what-breaks",
    number: "A6",
    category: "Basics · Honest Trade-offs",
    title: "What can go wrong, and what it costs",
    dek: "Most things, for ten years, do not break. The things that do — and what a fix actually costs in this country. We will tell you because no one else will.",
    byline: "The Primer Desk",
    readTime: "5 MIN",
    pages: "A23–A28",
    audience: "newcomer",
  },
  // ─── THE ORIGINAL SIX ───────────────────────────────────────────────
  {
    slug: "why-solar-battery",
    number: "01",
    category: "Essay · Energy Economics",
    title: "Why adopt solar and battery now",
    dek: "Rising tariffs, an unreliable grid, and the quiet collapse of the old electricity contract. A case for the only setup that pays for itself before it pays you back.",
    byline: "The Editors",
    readTime: "8 MIN",
    pages: "04–11",
    audience: "homeowner",
  },
  {
    slug: "product-guide",
    number: "02",
    category: "Field Guide · Selection",
    title: "How to choose the right product",
    dek: "A three-question framework — usage, loads, duration — that replaces the catalogue with a conversation.",
    byline: "Engineering Desk",
    readTime: "6 MIN",
    pages: "12–17",
    audience: "homeowner",
  },
  {
    slug: "calculator",
    number: "03",
    category: "Interactive · Finance",
    title: "Your savings calculator",
    dek: "Bills, payback periods, tariff drift, the cost of carbon. Plug in your numbers; the page does the arithmetic.",
    byline: "Numbers Desk",
    readTime: "INTERACTIVE",
    pages: "18–19",
    audience: "homeowner",
  },
  {
    slug: "all-in-one",
    number: "04",
    category: "Argument · Systems Design",
    title: "Why all-in-one wins",
    dek: "Fifty percent of failures begin where two vendors meet. The case for one box, one warranty, one phone number.",
    byline: "The Editors",
    readTime: "5 MIN",
    pages: "20–23",
    audience: "installer",
  },
  {
    slug: "hybrid-installation",
    number: "05",
    category: "Manual · Procedure",
    title: "Hybrid installation, simplified",
    dek: "Six steps from rooftop survey to handover. Time estimates, common pitfalls, what to label.",
    byline: "Field Operations",
    readTime: "10 MIN",
    pages: "24–31",
    audience: "installer",
  },
  {
    slug: "best-practices",
    number: "06",
    category: "Notes · Craft",
    title: "Do's and don'ts on site",
    dek: "What the warranty claims tell us. Five things that protect the install; five that quietly destroy it.",
    byline: "Field Operations",
    readTime: "7 MIN",
    pages: "32–37",
    audience: "installer",
  },
];

const FEATURED = ENTRIES[0];
const REST = ENTRIES.slice(1);

const KnowledgeHub = () => {
  const [filter, setFilter] = useState<"all" | "newcomer" | "homeowner" | "installer">("all");
  const [query, setQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return REST.filter((e) => {
      const matchAud = filter === "all" || e.audience === filter;
      const matchQ =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.dek.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q);
      return matchAud && matchQ;
    });
  }, [filter, query]);

  return (
    <Layout>
      {/* ─── MASTHEAD ──────────────────────────────────────────────── */}
      <section className="bg-background pt-16 sm:pt-24 pb-8 sm:pb-12 border-b border-foreground/10">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Folio strip */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground border-b border-foreground/15 pb-3 mb-10 sm:mb-16">
            <span>NESS · The Library</span>
            <span className="hidden sm:inline">Vol. 04 — Issue 02</span>
            <span>May 2026</span>
          </div>

          <div
            className={`grid grid-cols-12 gap-x-6 gap-y-6 transition-opacity duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="col-span-12 lg:col-span-7">
              <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-energy mb-4">
                Knowledge
              </p>
              <h1 className="font-display font-bold text-foreground tracking-[-0.04em] leading-[0.88] text-[14vw] sm:text-[10vw] lg:text-[8.5rem]">
                How NESS<br />
                <span className="italic font-light">works,</span><br />
                in twelve<br />
                pieces.
              </h1>
            </div>

            <div className="col-span-12 lg:col-span-5 lg:pt-8 flex flex-col justify-end">
              <p className="font-display text-xl sm:text-2xl text-foreground leading-snug mb-6">
                Twelve short reads on electricity, batteries, rooftops, and the
                small economics of going slightly off the grid. Six of them are
                for the person who has never bought a battery before.
              </p>
              <div className="border-t border-foreground/15 pt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground space-y-1">
                <p>Written in Bangalore</p>
                <p>For newcomers, homeowners &amp; installers</p>
                <p>Twelve pieces · ~60 minutes total</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED / LEAD ESSAY ─────────────────────────────────── */}
      <section className="bg-whisper py-16 sm:py-24 border-b border-foreground/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-baseline justify-between border-b border-foreground/20 pb-3 mb-8 sm:mb-10">
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-foreground">
              ❋ The Lead Essay
            </p>
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Pages {FEATURED.pages}
            </p>
          </div>

          <Link
            to={`/knowledge/${FEATURED.slug}`}
            className="group block"
          >
            <div className="grid grid-cols-12 gap-x-6 gap-y-8 items-start">
              <div className="col-span-12 md:col-span-2">
                <p className="font-display text-[5rem] sm:text-[7rem] leading-none font-bold text-foreground/90 group-hover:text-energy transition-colors duration-500">
                  #{FEATURED.number}
                </p>
              </div>
              <div className="col-span-12 md:col-span-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4">
                  {FEATURED.category}
                </p>
                <h2 className="font-display font-medium tracking-[-0.02em] leading-[0.95] text-foreground text-4xl sm:text-6xl lg:text-7xl mb-6 group-hover:italic transition-all duration-300">
                  {FEATURED.title}.
                </h2>
                <p className="font-display text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
                  {FEATURED.dek}
                </p>
                <p className="inline-block mt-8 font-mono text-xs uppercase tracking-[0.2em] text-foreground border-b border-dashed border-foreground/40 group-hover:border-energy group-hover:text-energy transition-colors">
                  Read the essay  →
                </p>
              </div>
              <div className="col-span-12 md:col-span-3 md:pl-6 md:border-l md:border-foreground/15">
                <dl className="font-mono text-[11px] uppercase tracking-[0.18em] space-y-3 text-muted-foreground">
                  <div>
                    <dt className="text-foreground/60">By</dt>
                    <dd className="mt-0.5 text-foreground">{FEATURED.byline}</dd>
                  </div>
                  <div>
                    <dt className="text-foreground/60">Reading time</dt>
                    <dd className="mt-0.5 text-foreground">{FEATURED.readTime}</dd>
                  </div>
                  <div>
                    <dt className="text-foreground/60">For</dt>
                    <dd className="mt-0.5 text-foreground">Homeowners</dd>
                  </div>
                </dl>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ─── INDEX / TABLE OF CONTENTS ─────────────────────────────── */}
      <section className="bg-background py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-12 gap-x-6 gap-y-8 items-end mb-10 sm:mb-14">
            <div className="col-span-12 md:col-span-6">
              <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
                ⁂ Index
              </p>
              <h2 className="font-display font-medium tracking-[-0.03em] text-foreground text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
                Everything else,<br />
                <span className="italic font-light">in order.</span>
              </h2>
            </div>

            <div className="col-span-12 md:col-span-6 md:pl-6">
              {/* Search */}
              <label className="block">
                <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  Flip to —
                </span>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="title, subject, byline…"
                  className="w-full bg-transparent border-0 border-b border-foreground/20 focus:border-foreground focus:outline-none py-2 font-display text-xl sm:text-2xl text-foreground placeholder:text-foreground/30 placeholder:italic"
                />
              </label>

              {/* Filter chips — page tabs */}
              <div className="mt-5 flex gap-6 font-mono text-[11px] uppercase tracking-[0.2em]">
                {([
                  ["all", "All"],
                  ["newcomer", "Newcomers"],
                  ["homeowner", "Homeowners"],
                  ["installer", "Installers"],
                ] as const).map(([k, label]) => (
                  <button
                    key={k}
                    onClick={() => setFilter(k)}
                    className={`pb-1 transition-colors ${
                      filter === k
                        ? "text-foreground border-b-2 border-energy"
                        : "text-muted-foreground hover:text-foreground border-b-2 border-transparent"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* The actual index — rules, not cards */}
          <ul className="border-t border-foreground/30">
            {filtered.map((entry, i) => (
              <li
                key={entry.slug}
                className={`border-b border-foreground/15 transition-opacity duration-700 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: `${120 + i * 60}ms` }}
              >
                <Link
                  to={`/knowledge/${entry.slug}`}
                  className="group grid grid-cols-12 gap-x-4 sm:gap-x-6 py-6 sm:py-8 items-baseline hover:bg-whisper/60 transition-colors duration-300 -mx-2 px-2 sm:-mx-4 sm:px-4"
                >
                  <span className="col-span-2 sm:col-span-1 font-mono text-xs sm:text-sm text-muted-foreground tabular-nums">
                    #{entry.number}
                  </span>

                  <div className="col-span-10 sm:col-span-7">
                    <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
                      {entry.category}
                    </p>
                    <h3 className="font-display font-medium tracking-[-0.02em] text-foreground text-2xl sm:text-3xl lg:text-4xl leading-[1.05] group-hover:italic group-hover:text-energy transition-all duration-300">
                      {entry.title}
                    </h3>
                    <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl hidden sm:block">
                      {entry.dek}
                    </p>
                  </div>

                  <div className="hidden sm:flex col-span-2 flex-col font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground leading-relaxed">
                    <span className="text-foreground/80">{entry.byline}</span>
                    <span>{entry.readTime}</span>
                  </div>

                  <div className="col-span-12 sm:col-span-2 mt-2 sm:mt-0 flex sm:justify-end items-baseline gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    <span className="tabular-nums">p.{entry.pages}</span>
                    <span className="text-foreground group-hover:text-energy transition-colors">→</span>
                  </div>
                </Link>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="py-12 text-center">
                <p className="font-display italic text-2xl text-muted-foreground">
                  Nothing in this drawer. Try another shelf.
                </p>
              </li>
            )}
          </ul>

          {/* Folio strip / page numbers */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-2 border-t border-foreground/15 pt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <span>The Library · End of Index</span>
            <span>Page 03 / 38</span>
          </div>
        </div>
      </section>

      {/* ─── CLOSING NOTE ──────────────────────────────────────────── */}
      <section className="bg-charcoal text-pearl py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-energy mb-6">
              § Correspondence
            </p>
            <p className="font-display text-3xl sm:text-5xl leading-[1.1] tracking-[-0.02em] mb-8">
              <span className="italic font-light">Couldn't find</span> what you were looking for? Write to the desk — we read everything, eventually.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-baseline gap-3 font-mono text-xs uppercase tracking-[0.25em] text-pearl border-b border-dashed border-pearl/50 hover:border-energy hover:text-energy pb-1 transition-colors"
            >
              Address the editors
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default KnowledgeHub;

import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const aboutLocalBusinessLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "NESS Energy Systems",
  url: "https://ness.energy",
  email: "hello@ness.energy",
  telephone: "+91-80-1234-5678",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Tech Park, Whitefield",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    postalCode: "560066",
    addressCountry: "IN",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
};
import { GradientOrbField } from "@/components/ui/gradient-orb";
import { SmoothFade } from "@/components/ui/smooth-animations";

// ─── Small editorial primitives ──────────────────────────────────────────────

const Folio = ({
  left,
  center,
  right,
  tone = "light",
}: {
  left: string;
  center?: string;
  right: string;
  tone?: "light" | "dark";
}) => {
  const text = tone === "dark" ? "text-pearl/60" : "text-charcoal/60";
  const rule = tone === "dark" ? "border-pearl/20" : "border-charcoal/20";
  return (
    <div className={`flex items-center justify-between gap-4 border-y ${rule} py-2 font-mono text-[10px] uppercase tracking-[0.22em] ${text}`}>
      <span>{left}</span>
      {center && <span className="hidden md:inline">{center}</span>}
      <span>{right}</span>
    </div>
  );
};

const ChapterHead = ({
  number,
  kicker,
  title,
  tone = "light",
}: {
  number: string;
  kicker: string;
  title: React.ReactNode;
  tone?: "light" | "dark";
}) => {
  const muted = tone === "dark" ? "text-pearl/50" : "text-charcoal/50";
  const accent = tone === "dark" ? "text-pearl" : "text-charcoal";
  const rule = tone === "dark" ? "bg-pearl/20" : "bg-charcoal/20";
  return (
    <div className="space-y-8">
      <div className={`flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.22em] ${muted}`}>
        <span className={accent}>Chapter {number}</span>
        <span className={`h-px flex-1 ${rule}`} />
        <span>{kicker}</span>
      </div>
      <h2 className={`font-display font-light text-5xl md:text-7xl lg:text-8xl leading-[0.92] tracking-[-0.035em] ${accent}`}>
        {title}
      </h2>
    </div>
  );
};

const About = () => {
  return (
    <Layout className="-mt-16">
      {/* ───── FRONTISPIECE ───── */}
      <section className="bg-pearl">
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-28 md:pt-36 pb-16">
          <div className="border-t-2 border-charcoal pt-3 flex items-center justify-between font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-charcoal/70">
            <span>The Company</span>
            <span className="hidden md:inline">A Field Guide · First Edition</span>
            <span>NESS · Bangalore</span>
          </div>

          <div className="grid grid-cols-12 gap-4 md:gap-6 mt-16 md:mt-24">
            <div className="col-span-12 md:col-span-9">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/50 mb-6">
                A Field Guide · in five chapters
              </div>
              <h1 className="font-display font-extralight text-[18vw] md:text-[14vw] lg:text-[170px] leading-[0.82] tracking-[-0.04em] text-charcoal">
                The
                <br />
                <em className="italic font-light">company</em>
                <span className="text-energy">.</span>
              </h1>
            </div>
            <aside className="col-span-12 md:col-span-3 md:pt-4 md:border-l md:border-charcoal/15 md:pl-6 space-y-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/50">
                A note on form
              </div>
              <p className="font-serif italic text-base text-charcoal/70 leading-[1.55]">
                This is the company in long form — a booklet, not a brochure. Made in India,
                made with care, made to be read end to end. Marginalia from the founding team
                runs in the right-hand column.
              </p>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/40">
                — The Founders
              </div>
            </aside>
          </div>

          {/* Standfirst with drop cap */}
          <div className="grid grid-cols-12 gap-4 md:gap-6 mt-16 md:mt-20">
            <div className="col-span-12 md:col-span-8 md:col-start-3">
              <p className="font-serif text-2xl md:text-3xl text-charcoal leading-[1.4] first-letter:font-display first-letter:text-[7rem] md:first-letter:text-[9rem] first-letter:font-light first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:leading-[0.78] first-letter:text-energy">
                NESS isn't just about electricity. It's about empathy, reliability, and belonging
                — energy that feels human: calm when you need it, strong when you rely on it.
              </p>
            </div>
          </div>

          {/* Stat shelf */}
          <div className="mt-20 md:mt-28 grid grid-cols-12 border-y border-charcoal">
            <div className="col-span-6 md:col-span-3 py-6 px-4 border-r border-charcoal/15">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/50">Years on the bench</div>
              <div className="font-display font-extralight text-5xl md:text-6xl tabular-nums text-charcoal mt-2">04</div>
            </div>
            <div className="col-span-6 md:col-span-3 py-6 px-4 md:border-r border-charcoal/15">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/50">Quality checks</div>
              <div className="font-display font-extralight text-5xl md:text-6xl tabular-nums text-charcoal mt-2">12</div>
            </div>
            <div className="col-span-6 md:col-span-3 py-6 px-4 border-r border-charcoal/15 border-t md:border-t-0">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/50">Homes powered</div>
              <div className="font-display font-extralight text-5xl md:text-6xl tabular-nums text-charcoal mt-2">500<span className="text-energy">+</span></div>
            </div>
            <div className="col-span-6 md:col-span-3 py-6 px-4 border-t md:border-t-0">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/50">System uptime</div>
              <div className="font-display font-extralight text-5xl md:text-6xl tabular-nums text-charcoal mt-2">99.94<span className="text-charcoal/40 text-2xl align-top">%</span></div>
            </div>
          </div>

          <div className="mt-12 text-center font-mono text-charcoal/30 tracking-[0.5em]">⁂</div>
        </div>
      </section>

      {/* ───── CHAPTER 01 · THE FRAMING ───── */}
      <section className="bg-whisper">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <ChapterHead
            number="01"
            kicker="The Framing · Three Cares"
            title={
              <>
                We don't store energy.
                <br />
                <em className="font-extralight text-charcoal/40">We nurture it.</em>
              </>
            }
          />

          <div className="grid grid-cols-12 gap-4 md:gap-6 mt-10">
            <div className="col-span-12 md:col-span-8 md:col-start-3">
              <p className="font-serif text-lg md:text-xl text-charcoal/80 leading-[1.7]">
                Behind every NESS battery is a team that cares — engineers who see energy as a
                responsibility, not a commodity. There are three places that care goes: into the
                home, into the hands of the partner who installs it, and into the world it
                leaves behind.
              </p>
            </div>
          </div>

          {/* Three cares as journal entries */}
          <div className="mt-20 grid md:grid-cols-3 gap-x-10 gap-y-12 border-t border-charcoal pt-10">
            <article className="space-y-5">
              <div className="flex items-baseline gap-3">
                <span className="font-display font-light text-5xl text-energy">i.</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/40 flex-1 border-b border-dotted border-charcoal/30 pb-1">
                  Care for homes
                </span>
              </div>
              <h3 className="font-display font-light text-2xl text-charcoal leading-tight">
                For the mother's prayer. The child's online class.
              </h3>
              <p className="font-serif text-base text-charcoal/75 leading-[1.7]">
                From your mother's prayers to your child's online class, NESS quietly keeps life
                moving. Every home deserves uninterrupted comfort.
              </p>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/40 italic border-t border-charcoal/15 pt-3">
                10+ years. Every morning. No worry.
              </div>
            </article>

            <article className="space-y-5 md:border-x md:border-charcoal/15 md:px-10">
              <div className="flex items-baseline gap-3">
                <span className="font-display font-light text-5xl text-energy">ii.</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/40 flex-1 border-b border-dotted border-charcoal/30 pb-1">
                  Care for those who power others
                </span>
              </div>
              <h3 className="font-display font-light text-2xl text-charcoal leading-tight">
                For the EPC partner. The rooftop installer.
              </h3>
              <p className="font-serif text-base text-charcoal/75 leading-[1.7]">
                For every EPC partner and installer, NESS means simplicity, reliability, and
                zero-headache service — so they can build reputations on trust, not
                troubleshooting.
              </p>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/40 italic border-t border-charcoal/15 pt-3">
                Works the first time. Every time.
              </div>
            </article>

            <article className="space-y-5">
              <div className="flex items-baseline gap-3">
                <span className="font-display font-light text-5xl text-energy">iii.</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/40 flex-1 border-b border-dotted border-charcoal/30 pb-1">
                  Care for the planet
                </span>
              </div>
              <h3 className="font-display font-light text-2xl text-charcoal leading-tight">
                Circular by intent. Efficient by design.
              </h3>
              <p className="font-serif text-base text-charcoal/75 leading-[1.7]">
                NESS is built for a cleaner, more conscious energy future. Every installation
                leaves the world slightly better than we found it.
              </p>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/40 italic border-t border-charcoal/15 pt-3">
                Clean energy. Sustainable choice.
              </div>
            </article>
          </div>

          <div className="mt-20 text-center font-mono text-charcoal/30 tracking-[0.5em]">§ § §</div>
        </div>
      </section>

      {/* ───── CHAPTER 02 · THE LAB ───── */}
      <section className="bg-charcoal text-pearl">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <ChapterHead
            number="02"
            kicker="The Lab · R&D in Bangalore"
            tone="dark"
            title={
              <>
                Behind every NESS
                <br />
                <em className="font-extralight text-pearl/40">is a promise.</em>
              </>
            }
          />

          <div className="grid grid-cols-12 gap-4 md:gap-6 mt-12">
            <div className="col-span-12 md:col-span-8 md:col-start-3">
              <p className="font-serif text-lg md:text-xl text-pearl/80 leading-[1.7] first-letter:font-display first-letter:text-7xl first-letter:font-light first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.85] first-letter:text-energy">
                Our Bangalore R&D center isn't just about technology — it's where caring meets
                precision. Where engineers obsess over reliability so you never have to. Where
                we test for ten years of peace, not just performance specs.
              </p>
            </div>
          </div>

          {/* Cell test data — as ledger */}
          <div className="mt-16 md:mt-24 grid grid-cols-12 gap-0 border-y border-pearl/20">
            {[
              { figure: "30,000+", label: "Cells tested" },
              { figure: "5M+", label: "Data points" },
              { figure: "15+", label: "Battery engineers" },
              { figure: "06+", label: "Years on the bench" },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`col-span-6 md:col-span-3 py-8 md:py-10 px-4 ${
                  i < 3 ? "md:border-r" : ""
                } ${i < 2 ? "border-r" : i === 2 ? "border-r md:border-r" : ""} ${i >= 2 ? "border-t md:border-t-0" : ""} border-pearl/15`}
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-pearl/40">
                  № {String(i + 1).padStart(2, "0")}
                </div>
                <div className="font-display font-extralight text-4xl md:text-5xl tabular-nums text-pearl mt-3">
                  {s.figure}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-pearl/60 mt-2">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Manufacturing ledger */}
          <div className="grid grid-cols-12 gap-4 md:gap-6 mt-16 md:mt-20">
            <aside className="col-span-12 md:col-span-3 md:pt-2">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-pearl/40 mb-3">
                Marginalia
              </div>
              <p className="font-serif italic text-pearl/60 text-sm leading-[1.6]">
                What follows is a partial extract from the manufacturing ledger — the numbers we
                hold ourselves to, printed for the record.
              </p>
            </aside>

            <div className="col-span-12 md:col-span-9">
              <div className="border-t border-pearl/30">
                {[
                  { k: "Cell matching precision", v: "±2 mV" },
                  { k: "Quality control points", v: "12" },
                  { k: "Customer downtime", v: "< 0.01%" },
                  { k: "Post-production QA", v: "48 hours" },
                ].map((r, i) => (
                  <div
                    key={r.k}
                    className="grid grid-cols-12 gap-4 items-baseline border-b border-pearl/15 py-5"
                  >
                    <div className="col-span-1 font-mono text-[10px] uppercase tracking-[0.22em] text-pearl/40 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="col-span-7 font-serif text-base md:text-lg text-pearl/80">
                      {r.k}
                    </div>
                    <div className="col-span-4 text-right font-display font-light text-2xl md:text-3xl tabular-nums text-pearl">
                      {r.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── CHAPTER 03 · THE WITNESS ───── */}
      <section className="bg-pearl">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <ChapterHead
            number="03"
            kicker="The Witness · What lasts"
            title={
              <>
                Real homes.
                <br />
                <em className="font-extralight text-charcoal/40">Real comfort.</em>
              </>
            }
          />

          <div className="grid grid-cols-12 gap-4 md:gap-6 mt-12">
            <div className="col-span-12 md:col-span-8 md:col-start-3">
              <p className="font-serif text-lg md:text-xl text-charcoal/80 leading-[1.7]">
                Ten thousand families trust NESS to quietly care for their energy. From sunrise
                to sunset, we're there — invisibly, reliably.
              </p>
            </div>
          </div>

          {/* Pull quote */}
          <div className="my-20 md:my-28 relative">
            <span className="absolute -top-8 md:-top-16 left-0 md:-left-4 font-display font-light text-[160px] md:text-[240px] text-energy/30 leading-none select-none">
              &ldquo;
            </span>
            <blockquote className="relative pl-8 md:pl-20">
              <p className="font-serif italic text-3xl md:text-5xl lg:text-6xl text-charcoal leading-[1.15] tracking-tight">
                Power cuts don't just disrupt electricity. They interrupt life. NESS gives
                families their comfort back.
              </p>
              <footer className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/50">
                — A homeowner · Chennai · 2025
              </footer>
            </blockquote>
          </div>

          {/* Witness stats — ledger format */}
          <div className="border-y border-charcoal">
            {[
              { fig: "500+", label: "Systems deployed", note: "Every home a testament" },
              { fig: "100+", label: "MWh delivered", note: "Clean. Reliable. Continuous." },
              { fig: "25,000+", label: "Cycles proven", note: "Each one a promise kept" },
              { fig: "99.94%", label: "System uptime", note: "Because almost isn't enough" },
            ].map((s, i) => (
              <div
                key={s.label}
                className="grid grid-cols-12 gap-4 items-baseline border-b last:border-b-0 border-charcoal/15 py-6 md:py-8"
              >
                <div className="col-span-1 font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/40 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="col-span-11 md:col-span-4 font-display font-extralight text-5xl md:text-7xl tabular-nums text-charcoal leading-none">
                  {s.fig}
                </div>
                <div className="col-span-6 md:col-span-3 font-mono text-[10px] md:text-xs uppercase tracking-[0.22em] text-charcoal/60">
                  {s.label}
                </div>
                <div className="col-span-6 md:col-span-4 font-serif italic text-sm md:text-base text-charcoal/60">
                  {s.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CHAPTER 04 · THE WHY ───── */}
      <section className="bg-whisper">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <ChapterHead
            number="04"
            kicker="The Why · A Promise & a Mission"
            title={
              <>
                Why NESS
                <br />
                <em className="font-extralight text-charcoal/40">exists.</em>
              </>
            }
          />

          <div className="grid grid-cols-12 gap-4 md:gap-6 mt-10">
            <div className="col-span-12 md:col-span-7 md:col-start-3">
              <p className="font-serif text-xl md:text-2xl text-charcoal/80 leading-[1.6]">
                NESS was born from a simple idea — that power should never be cold or
                complicated. It should <em className="text-charcoal underline decoration-energy decoration-2 underline-offset-4">care.</em>
              </p>
            </div>
          </div>

          {/* The Promise — as a triptych */}
          <div className="mt-20 md:mt-24">
            <Folio left="The Promise" center="In three parts" right="01 / 02" />
            <div className="grid md:grid-cols-3 gap-0 border-b border-charcoal">
              {[
                {
                  to: "To Customers",
                  body: "Peace of mind, powered effortlessly.",
                },
                {
                  to: "To Partners",
                  body: "Systems that work the first time, and every time after.",
                },
                {
                  to: "To the Planet",
                  body: "Every installation leaves the world slightly better.",
                },
              ].map((p, i) => (
                <div
                  key={p.to}
                  className={`py-10 md:py-12 px-2 md:px-8 ${
                    i < 2 ? "md:border-r" : ""
                  } ${i < 2 ? "border-b md:border-b-0" : ""} border-charcoal/15`}
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/40 mb-4">
                    Article {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="font-display font-light text-lg text-energy mb-3">{p.to}</div>
                  <p className="font-serif text-xl md:text-2xl text-charcoal leading-[1.35]">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* The Mission */}
          <div className="mt-16 grid grid-cols-12 gap-4 md:gap-6">
            <aside className="col-span-12 md:col-span-3 md:pt-2">
              <Folio left="The Mission" right="02 / 02" />
            </aside>
            <div className="col-span-12 md:col-span-9 md:pt-2">
              <p className="font-serif text-2xl md:text-4xl text-charcoal leading-[1.3] first-letter:font-display first-letter:text-7xl md:first-letter:text-8xl first-letter:font-light first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:leading-[0.78] first-letter:text-charcoal">
                To make clean, uninterrupted power simple and accessible — so you can focus on
                what matters most: living, creating, connecting.
              </p>
              <p className="mt-8 font-serif italic text-base md:text-lg text-charcoal/60 pl-1 border-l-2 border-energy pl-4">
                We don't just store energy — we nurture it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── CHAPTER 05 · THE VOICE ───── */}
      <section className="bg-pearl">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <ChapterHead
            number="05"
            kicker="The Voice · Three temperaments"
            title={
              <>
                How we
                <br />
                <em className="font-extralight text-charcoal/40">speak.</em>
              </>
            }
          />

          <div className="mt-16 grid md:grid-cols-3 gap-0 border-t border-charcoal">
            {[
              {
                k: "Warm",
                anti: "not technical",
                body: "We speak like humans, not manuals. Because energy should feel human: calm when you need it, strong when you rely on it.",
              },
              {
                k: "Confident",
                anti: "not loud",
                body: "Our silence is our strength. The best power is the one that quietly cares — invisible when life flows as it should.",
              },
              {
                k: "Inclusive",
                anti: "not corporate",
                body: "We celebrate the community of people who care about energy — the Energy Warriors building a cleaner future together.",
              },
            ].map((v, i) => (
              <div
                key={v.k}
                className={`py-10 md:py-12 px-2 md:px-8 ${i < 2 ? "md:border-r" : ""} ${i < 2 ? "border-b md:border-b-0" : ""} border-charcoal/15`}
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/40 mb-6">
                  Temperament {String(i + 1).padStart(2, "0")} of 03
                </div>
                <h3 className="font-display font-light text-4xl md:text-5xl text-charcoal leading-none tracking-tight">
                  {v.k},
                </h3>
                <div className="font-serif italic text-charcoal/50 text-lg mt-1 mb-6">
                  {v.anti}.
                </div>
                <p className="font-serif text-base text-charcoal/75 leading-[1.7]">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── COLOPHON ───── */}
      <section className="bg-charcoal text-pearl">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-pearl/50 flex items-center gap-4 mb-12">
            <span className="text-pearl">Colophon</span>
            <span className="h-px flex-1 bg-pearl/20" />
            <span>An invitation</span>
          </div>

          <h2 className="font-display font-light text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-[-0.03em]">
            Join the community
            <br />
            <em className="font-extralight text-energy">that cares.</em>
          </h2>

          <div className="grid grid-cols-12 gap-4 md:gap-6 mt-12">
            <div className="col-span-12 md:col-span-8 md:col-start-3">
              <p className="font-serif text-lg md:text-xl text-pearl/80 leading-[1.7] first-letter:font-display first-letter:text-7xl first-letter:font-light first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.85] first-letter:text-energy">
                We call them Energy Warriors — people who choose sustainable living, who install
                with care, who power homes and hearts with clean energy. Together, we're
                creating a movement where caring is the most powerful energy of all.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact/homeowner"
              className="inline-flex items-center gap-3 px-6 py-4 bg-pearl text-charcoal font-mono text-[11px] uppercase tracking-[0.22em] hover:bg-pearl/90 transition-colors"
            >
              Talk to us <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/installers"
              className="inline-flex items-center gap-3 px-6 py-4 border border-pearl/30 text-pearl font-mono text-[11px] uppercase tracking-[0.22em] hover:bg-pearl/10 transition-colors"
            >
              Partner with us
            </Link>
          </div>

          <div className="mt-20 pt-6 border-t border-pearl/15 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-pearl/40">
            <span>The Field Guide · NESS</span>
            <span className="hidden md:inline italic font-serif normal-case tracking-normal">
              the best power is the one that quietly cares
            </span>
            <span>Bangalore</span>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;

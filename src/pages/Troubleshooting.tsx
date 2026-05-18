import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone, Clock } from "lucide-react";
import Layout from "@/components/Layout";

// ---------------------------------------------------------------------------
// THE FIELD MANUAL — an index of diagnostic topics for NESS systems.
// Hand-set, asymmetric, deliberately editorial. No card grids.
// ---------------------------------------------------------------------------

type Topic = {
  n: string;
  symptom: string;
  blurb: string;
  time: string;
  slug: string;
};

type ProductBlock = {
  code: string;
  name: string;
  tagline: string;
  topics: Topic[];
};

const MOST_COMMON: Topic[] = [
  {
    n: "01",
    symptom: "System won't power on",
    blurb:
      "No LEDs, no fan, no app heartbeat. Usually a tripped breaker, occasionally a loose DC tap.",
    time: "5 min",
    slug: "system-wont-power-on",
  },
  {
    n: "02",
    symptom: "App can't connect",
    blurb:
      "The pairing handshake fails or the dashboard shows ‘last seen 3 hours ago’. Almost always Wi-Fi.",
    time: "8 min",
    slug: "app-cant-connect",
  },
  {
    n: "03",
    symptom: "Battery shows wrong state of charge",
    blurb:
      "Reads 100% but runs out in twenty minutes. The pack needs a calibration cycle, not a replacement.",
    time: "1 charge cycle",
    slug: "wrong-state-of-charge",
  },
  {
    n: "04",
    symptom: "Audible alarm with red LED",
    blurb:
      "A continuous beep means the system has parked itself. Read the LED code before doing anything else.",
    time: "10 min",
    slug: "audible-alarm-red-led",
  },
  {
    n: "05",
    symptom: "Slow charging from solar",
    blurb:
      "Panels are clean, sun is up, charge rate is half of yesterday. Usually a string voltage mismatch.",
    time: "15 min",
    slug: "slow-solar-charging",
  },
];

const PRODUCTS: ProductBlock[] = [
  {
    code: "PRO",
    name: "NESS Pro",
    tagline: "The whole-home unit. Most of these fix in under twenty minutes.",
    topics: [
      { n: "P-01", symptom: "Switchover delay > 10 ms", blurb: "Sensitive electronics flicker during grid outage.", time: "12 min", slug: "switchover-delay" },
      { n: "P-02", symptom: "Inverter trip on grid restore", blurb: "Comes back, trips immediately, comes back.", time: "20 min", slug: "inverter-trip-on-grid-restore" },
      { n: "P-03", symptom: "Cooling fan stays on at night", blurb: "Pack is warmer than ambient — investigate before bedtime.", time: "10 min", slug: "fan-stays-on" },
      { n: "P-04", symptom: "Grid export blocked", blurb: "Export meter reads zero despite surplus generation.", time: "25 min", slug: "grid-export-blocked" },
      { n: "P-05", symptom: "Firmware update stuck at 84%", blurb: "Progress bar frozen. Don’t pull the plug.", time: "30 min", slug: "firmware-stuck" },
      { n: "P-06", symptom: "EV charger handshake fails", blurb: "Pro talks to the wallbox, wallbox refuses to start.", time: "15 min", slug: "ev-charger-handshake" },
      { n: "P-07", symptom: "Generator input not detected", blurb: "Backup genset runs, Pro doesn’t see it.", time: "20 min", slug: "generator-not-detected" },
    ],
  },
  {
    code: "AIO",
    name: "NESS AIO",
    tagline: "All-in-one inverter and pack. Single chassis, single set of failure modes.",
    topics: [
      { n: "A-01", symptom: "WiFi keeps dropping", blurb: "Reconnects fine, drops again every few hours.", time: "15 min", slug: "wifi-keeps-dropping" },
      { n: "A-02", symptom: "Display dimmed or blank", blurb: "Unit is alive, screen is not.", time: "8 min", slug: "display-blank" },
      { n: "A-03", symptom: "Output voltage out of range", blurb: "Multimeter reads 245 V on a 230 V system.", time: "20 min", slug: "voltage-out-of-range" },
      { n: "A-04", symptom: "Pack imbalance warning", blurb: "One cell group lagging the rest by more than 50 mV.", time: "1 cycle", slug: "pack-imbalance" },
      { n: "A-05", symptom: "Audible relay clicking", blurb: "Periodic clack from inside the chassis.", time: "10 min", slug: "relay-clicking" },
      { n: "A-06", symptom: "App pairing loop", blurb: "‘Add device’ never gets past 60%.", time: "12 min", slug: "app-pairing-loop" },
    ],
  },
  {
    code: "CUB",
    name: "NESS Cube",
    tagline: "Modular stack for small businesses. Most issues are wiring, not electronics.",
    topics: [
      { n: "C-01", symptom: "Module offline in dashboard", blurb: "One brick out of the stack reports as missing.", time: "10 min", slug: "module-offline" },
      { n: "C-02", symptom: "Stack temperature rising", blurb: "Middle module 8 °C hotter than its neighbours.", time: "20 min", slug: "stack-temperature" },
      { n: "C-03", symptom: "Three-phase imbalance", blurb: "Phase B carries 30% more current than A or C.", time: "30 min", slug: "phase-imbalance" },
      { n: "C-04", symptom: "BMS communication timeout", blurb: "Master can’t reach a slave BMS every few minutes.", time: "15 min", slug: "bms-timeout" },
      { n: "C-05", symptom: "Cooling pump cycling", blurb: "Liquid loop ramps up and down every minute.", time: "20 min", slug: "cooling-pump-cycling" },
    ],
  },
  {
    code: "POD",
    name: "NESS Pod",
    tagline: "Apartment-scale. Quiet, until it isn’t.",
    topics: [
      { n: "D-01", symptom: "Buzzing transformer", blurb: "Audible mains hum during charge.", time: "5 min", slug: "buzzing-transformer" },
      { n: "D-02", symptom: "Wall LED amber, not red", blurb: "A warning, not a fault. Still worth checking.", time: "5 min", slug: "wall-led-amber" },
      { n: "D-03", symptom: "Schedule not applying", blurb: "Off-peak charging window ignored.", time: "10 min", slug: "schedule-not-applying" },
      { n: "D-04", symptom: "Bluetooth pairing rejected", blurb: "Phone sees the Pod, Pod refuses the phone.", time: "8 min", slug: "bluetooth-pairing" },
      { n: "D-05", symptom: "App reports negative charge", blurb: "Battery shows −2%. It isn’t.", time: "5 min", slug: "negative-charge" },
    ],
  },
];

const Rule = ({ label }: { label?: string }) => (
  <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.3em] text-silver/80">
    <span className="h-px flex-1 bg-charcoal/15" />
    {label && <span>{label}</span>}
    <span className="h-px flex-1 bg-charcoal/15" />
  </div>
);

const Troubleshooting = () => {
  return (
    <Layout>
      <article className="bg-pearl text-charcoal">
        {/* ─────────────────────────── MASTHEAD ─────────────────────────── */}
        <header className="border-b border-charcoal/15">
          <div className="container mx-auto max-w-6xl px-6 pt-16 pb-6">
            <div className="flex flex-wrap items-baseline justify-between gap-y-2 text-[10px] font-mono uppercase tracking-[0.3em] text-silver">
              <span>The Field Manual</span>
              <span>Issue 01 · May 2026</span>
              <span>NESS by Nunam</span>
            </div>
          </div>

          <div className="container mx-auto max-w-6xl px-6 pb-16 pt-10">
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-display font-bold leading-[0.85] tracking-[-0.04em] text-[clamp(3rem,11vw,9rem)]"
            >
              The Field
              <br />
              <span className="italic font-light">Manual.</span>
            </motion.h1>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8">
              <p className="md:col-span-7 md:col-start-2 text-lg leading-relaxed first-letter:float-left first-letter:text-7xl first-letter:font-display first-letter:font-bold first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.85]">
                Most problems sort themselves. The rest are solved in this manual. If yours
                isn’t here — and occasionally it won’t be — call us. A real engineer picks up
                the phone. Usually before noon, always before dinner.
              </p>
              <aside className="md:col-span-3 md:col-start-10 border-l border-charcoal/20 pl-5 text-[13px] leading-relaxed text-silver">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/60 mb-2">
                  How to read this
                </div>
                Each entry is a symptom, not a cause. Find what looks like yours. Click
                through. The guide on the other side walks you down the diagnosis tree. No
                jargon, no dead ends.
              </aside>
            </div>
          </div>
        </header>

        {/* ─────────────────────────── MOST COMMON ─────────────────────────── */}
        <section className="container mx-auto max-w-6xl px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-6 mb-12">
            <div className="md:col-span-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-silver mb-2">
                Section A
              </div>
              <h2 className="font-display text-4xl md:text-5xl leading-[0.9] tracking-tight">
                Most
                <br />
                Common.
              </h2>
            </div>
            <p className="md:col-span-6 md:col-start-5 text-base leading-relaxed text-charcoal/80 self-end">
              Five symptoms account for roughly four out of every five support calls we
              answer. Start here. <em>The most common cause is also the most boring one</em>
              — that’s usually good news.
            </p>
          </div>

          <Rule />

          <ul className="divide-y divide-charcoal/10">
            {MOST_COMMON.map((t, i) => (
              <li key={t.slug}>
                <Link
                  to={`/support/troubleshooting/common/${t.slug}`}
                  className="group grid grid-cols-12 gap-4 py-7 items-baseline hover:bg-whisper/60 -mx-3 px-3 transition-colors"
                >
                  <div className="col-span-2 sm:col-span-1 font-mono text-sm text-silver tabular-nums">
                    {t.n}
                  </div>
                  <div className="col-span-10 sm:col-span-7">
                    <h3 className="font-display text-2xl sm:text-3xl md:text-4xl leading-[1.05] tracking-tight">
                      {t.symptom}
                    </h3>
                    <p className="mt-2 text-sm text-silver leading-relaxed max-w-xl">
                      {t.blurb}
                    </p>
                  </div>
                  <div className="hidden sm:flex sm:col-span-2 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-silver">
                    <Clock className="w-3 h-3" />
                    {t.time}
                  </div>
                  <div className="col-span-12 sm:col-span-2 flex sm:justify-end items-center gap-1 font-mono text-[11px] uppercase tracking-[0.25em] text-charcoal group-hover:text-energy transition-colors">
                    Diagnose
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    {i === 0 && (
                      <span className="sr-only">— start here if you’re new</span>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ─────────────────────────── DIVIDER ─────────────────────────── */}
        <div className="container mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-center py-6 text-2xl text-charcoal/40 select-none">
            ⁂
          </div>
        </div>

        {/* ─────────────────────────── PRODUCT SECTIONS ─────────────────────────── */}
        {PRODUCTS.map((p, idx) => (
          <section
            key={p.code}
            className={`border-t border-charcoal/15 ${idx % 2 === 1 ? "bg-whisper/50" : ""}`}
          >
            <div className="container mx-auto max-w-6xl px-6 py-20">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-8">
                {/* Left rail: huge code + product name */}
                <div className="md:col-span-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-silver mb-3">
                    Section {String.fromCharCode(66 + idx)} · By Product
                  </div>
                  <div className="font-display font-bold leading-[0.85] tracking-[-0.04em] text-[clamp(4rem,9vw,7rem)] text-charcoal/90">
                    {p.code}
                  </div>
                  <h2 className="mt-2 font-display text-3xl md:text-4xl tracking-tight">
                    {p.name}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-silver max-w-xs italic">
                    {p.tagline}
                  </p>

                  {/* Marginalia per product */}
                  {idx === 0 && (
                    <aside className="hidden md:block mt-10 border-l border-charcoal/20 pl-5 text-[12px] leading-relaxed text-silver max-w-[14rem]">
                      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/60 mb-2">
                        While you wait
                      </div>
                      A torch and a multimeter solve more Pro tickets than anything else.
                      Keep both within arm’s reach.
                    </aside>
                  )}
                  {idx === 1 && (
                    <aside className="hidden md:block mt-10 border-l border-charcoal/20 pl-5 text-[12px] leading-relaxed text-silver max-w-[14rem]">
                      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/60 mb-2">
                        Tip
                      </div>
                      The AIO logs the last 96 hours locally. Pull the log <span className="font-mono">.csv</span> from the app before
                      power-cycling — half the answers live in there.
                    </aside>
                  )}
                </div>

                {/* Right: topic directory */}
                <div className="md:col-span-8">
                  <Rule label={`${p.topics.length} entries`} />
                  <ul className="divide-y divide-charcoal/10">
                    {p.topics.map((t) => (
                      <li key={t.slug}>
                        <Link
                          to={`/support/troubleshooting/${p.code.toLowerCase()}/${t.slug}`}
                          className="group grid grid-cols-12 gap-3 py-5 items-baseline hover:bg-pearl -mx-3 px-3 transition-colors"
                        >
                          <div className="col-span-3 sm:col-span-2 font-mono text-[11px] text-silver tabular-nums">
                            {t.n}
                          </div>
                          <div className="col-span-9 sm:col-span-7">
                            <h3 className="font-display text-xl sm:text-2xl leading-[1.1] tracking-tight">
                              {t.symptom}
                            </h3>
                            <p className="mt-1.5 text-[13px] text-silver leading-relaxed">
                              {t.blurb}
                            </p>
                          </div>
                          <div className="col-span-7 sm:col-span-2 font-mono text-[10px] uppercase tracking-[0.2em] text-silver">
                            <span className="block">usually</span>
                            <span className="text-charcoal">{t.time}</span>
                          </div>
                          <div className="col-span-5 sm:col-span-1 flex sm:justify-end items-center font-mono text-[10px] uppercase tracking-[0.25em] text-charcoal group-hover:text-energy transition-colors">
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* ─────────────────────────── ESCALATION FOLIO ─────────────────────────── */}
        <section className="border-t border-charcoal/15 bg-charcoal text-pearl">
          <div className="container mx-auto max-w-6xl px-6 py-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
              <div className="md:col-span-7">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-pearl/60 mb-4">
                  Section F · Still Stuck
                </div>
                <h2 className="font-display font-bold leading-[0.9] tracking-[-0.03em] text-[clamp(2.5rem,7vw,6rem)]">
                  Call us.
                  <br />
                  <span className="italic font-light text-energy">Real engineer.</span>
                </h2>
                <p className="mt-6 max-w-lg text-pearl/70 leading-relaxed">
                  If a guide didn’t cut it, that’s on us. We answer the phone ourselves —
                  no script, no queue music longer than the song. Have your system serial,
                  the LED state, and a rough timeline of when it started.
                </p>
              </div>
              <div className="md:col-span-5 border-l border-pearl/15 pl-8">
                <a
                  href="tel:+918012345678"
                  className="flex items-center gap-3 font-display text-3xl md:text-4xl tracking-tight hover:text-energy transition-colors"
                >
                  <Phone className="w-7 h-7" />
                  +91 80 1234 5678
                </a>
                <dl className="mt-6 grid grid-cols-2 gap-y-3 font-mono text-[11px] uppercase tracking-[0.2em] text-pearl/60">
                  <dt>Hours</dt>
                  <dd className="text-pearl/90">Mon–Sat · 9–7</dd>
                  <dt>Avg pickup</dt>
                  <dd className="text-pearl/90">11 seconds</dd>
                  <dt>Email</dt>
                  <dd className="text-pearl/90">help@ness.energy</dd>
                </dl>
              </div>
            </div>
          </div>

          {/* Folio strip */}
          <div className="border-t border-pearl/15">
            <div className="container mx-auto max-w-6xl px-6 py-4 flex flex-wrap items-center justify-between gap-y-1 text-[10px] font-mono uppercase tracking-[0.3em] text-pearl/50">
              <span>p. 01 / 01</span>
              <span>The Field Manual</span>
              <span>ness.energy/support</span>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
};

export default Troubleshooting;

import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  AlertTriangle,
  CheckCircle2,
  Wrench,
  Clock,
  Phone,
} from "lucide-react";
import Layout from "@/components/Layout";

// ---------------------------------------------------------------------------
// THE GUIDE — a single diagnostic article rendered from URL params.
// Future: pull real diagnostic content from CMS keyed by [product, issue]
// ---------------------------------------------------------------------------

const slugToTitle = (s?: string) =>
  (s ?? "Untitled Issue")
    .split("-")
    .map((w) => (w.length <= 3 ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");

const productName = (p?: string) => {
  const code = (p ?? "").toLowerCase();
  if (code === "pro") return "NESS Pro";
  if (code === "aio") return "NESS AIO";
  if (code === "cub" || code === "cube") return "NESS Cube";
  if (code === "pod") return "NESS Pod";
  if (code === "common") return "Common Issues";
  return `NESS ${code.toUpperCase()}`;
};

type Step = { n: string; do: string; expect: string; note?: string };

const SYMPTOMS = [
  "The unit responds intermittently — sometimes on, sometimes silent",
  "An LED indicator is in a state you don’t recognise",
  "The app reports the system as offline, or stale by several minutes",
  "A previously stable behaviour started drifting in the past 24–72 hours",
];

const DIAGNOSE: Step[] = [
  {
    n: "01",
    do: "Read the LED state on the front panel. Note the colour, count the blinks, and time the gap.",
    expect:
      "A documented code from the badge inside the front cover. If the pattern is steady amber, you are in warning territory, not failure.",
    note: "If the LED is off entirely, skip ahead to step 03.",
  },
  {
    n: "02",
    do: "Open the NESS app and check ‘Last seen’ under System → Health.",
    expect:
      "A timestamp within the last 60 seconds. Anything older than 5 minutes means the unit has dropped off the network, even if it is still operating locally.",
  },
  {
    n: "03",
    do: "Confirm AC input. Use a known-good appliance on the same circuit, not a multimeter.",
    expect:
      "Appliance runs as expected. If it doesn’t, the problem is upstream of the NESS — breaker, RCD, or service line.",
  },
  {
    n: "04",
    do: "Power-cycle the unit using the front button — hold for 8 seconds. Wait the full sixty before re-checking.",
    expect:
      "A clean reboot sequence: white LED for ~10 s, brief amber, then steady green. Anything else is a fault state, not a boot state.",
    note: "Do NOT pull the DC isolator unless the guide explicitly says to.",
  },
  {
    n: "05",
    do: "Export the last 24 h of telemetry from App → System → Diagnostics → Share log.",
    expect:
      "A .csv file under 4 MB. Keep it — support will ask for it before they ask for anything else.",
  },
];

const FIX: Step[] = [
  {
    n: "01",
    do: "If LED was steady amber: clear the warning from App → Alerts → Acknowledge, then watch for 10 minutes.",
    expect:
      "Warning does not reappear. If it does, the underlying condition is still active — do not keep clearing it.",
  },
  {
    n: "02",
    do: "If network was the issue: forget the Wi-Fi profile on the unit, then re-pair via Bluetooth using the app’s ‘Re-link network’ flow.",
    expect:
      "Pairing completes in under 90 seconds. ‘Last seen’ updates to ‘just now’.",
  },
  {
    n: "03",
    do: "If the unit did not reboot cleanly: open the front cover, locate the recessed reset button, and hold for 15 s with the unit powered.",
    expect:
      "A full factory boot sequence. Your schedules and Wi-Fi will be preserved; only diagnostic counters are cleared.",
    note: "If the unit is hot to the touch, stop. Let it cool for 30 minutes before any reset.",
  },
  {
    n: "04",
    do: "Run a calibration cycle: charge to 100%, discharge to 10%, charge to 100% again, uninterrupted.",
    expect:
      "State of charge readings return to within 2% of true. This typically takes 18–28 hours depending on load.",
  },
];

const Rule = ({ label }: { label?: string }) => (
  <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.3em] text-silver/80">
    <span className="h-px flex-1 bg-charcoal/15" />
    {label && <span>{label}</span>}
    <span className="h-px flex-1 bg-charcoal/15" />
  </div>
);

const TroubleshootingGuide = () => {
  const { product, issue } = useParams<{ product: string; issue: string }>();
  const title = slugToTitle(issue);
  const pName = productName(product);

  return (
    <Layout>
      <article className="bg-pearl text-charcoal">
        {/* ─────────────────────────── MASTHEAD ─────────────────────────── */}
        <header className="border-b border-charcoal/15">
          <div className="container mx-auto max-w-5xl px-6 pt-14 pb-4">
            <Link
              to="/support/troubleshooting"
              className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.3em] text-silver hover:text-charcoal transition-colors"
            >
              <ChevronLeft className="w-3 h-3" />
              Back to the Manual
            </Link>
          </div>

          <div className="container mx-auto max-w-5xl px-6 pb-4">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[10px] font-mono uppercase tracking-[0.3em] text-silver">
              <span>Field Manual</span>
              <span className="text-charcoal/30">/</span>
              <span>{pName}</span>
              <span className="text-charcoal/30">/</span>
              <span className="text-charcoal">{title}</span>
            </div>
          </div>

          <div className="container mx-auto max-w-5xl px-6 pb-14 pt-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-silver mb-4">
              The Guide · Entry № {(issue ?? "").slice(0, 2).toUpperCase() || "00"}
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display font-bold leading-[0.88] tracking-[-0.035em] text-[clamp(2.5rem,8vw,7rem)]"
            >
              {title}.
            </motion.h1>

            {/* Metadata strip */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-6 border-y border-charcoal/15 py-5 font-mono text-[11px] uppercase tracking-[0.2em]">
              <div>
                <div className="text-silver/80 text-[10px] mb-1">Difficulty</div>
                <div className="text-charcoal">Moderate · 2 / 5</div>
              </div>
              <div>
                <div className="text-silver/80 text-[10px] mb-1">Time</div>
                <div className="text-charcoal flex items-center gap-1">
                  <Clock className="w-3 h-3" /> 15–25 min
                </div>
              </div>
              <div>
                <div className="text-silver/80 text-[10px] mb-1">Tools</div>
                <div className="text-charcoal flex items-center gap-1">
                  <Wrench className="w-3 h-3" /> Phone, torch
                </div>
              </div>
              <div>
                <div className="text-silver/80 text-[10px] mb-1">Last reviewed</div>
                <div className="text-charcoal">May 2026</div>
              </div>
            </div>
          </div>
        </header>

        {/* ─────────────────────────── OPENER ─────────────────────────── */}
        <section className="container mx-auto max-w-5xl px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-8">
            <p className="md:col-span-8 text-lg leading-relaxed first-letter:float-left first-letter:text-7xl first-letter:font-display first-letter:font-bold first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.85]">
              Before you do anything else, read this paragraph all the way through. Most
              {" "}{title.toLowerCase()} reports turn out to be one of three things, and they
              announce themselves clearly if you give them ten seconds. The guide below walks
              the diagnosis in order. <em>Don’t skip ahead.</em> Steps three and four exist
              because we’ve learned, the hard way, that they catch the thing you’d otherwise
              spend an hour chasing.
            </p>
            <aside className="md:col-span-4 border-l border-charcoal/20 pl-5 text-[13px] leading-relaxed text-silver">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/60 mb-2">
                Marginalia
              </div>
              Keep the app open on a second device while you work through this. The
              telemetry updates every ~3 seconds and you’ll often see the fault clear in
              real time.
            </aside>
          </div>
        </section>

        {/* ─────────────────────────── SYMPTOMS ─────────────────────────── */}
        <section className="container mx-auto max-w-5xl px-6 py-12 border-t border-charcoal/15">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-6">
            <div className="md:col-span-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-silver mb-2">
                § 1
              </div>
              <h2 className="font-display text-4xl md:text-5xl leading-[0.9] tracking-tight">
                Symptoms.
              </h2>
              <p className="mt-3 text-sm text-silver italic">
                What you are probably seeing.
              </p>
            </div>
            <ul className="md:col-span-9 space-y-3">
              {SYMPTOMS.map((s, i) => (
                <li key={i} className="flex gap-4 py-3 border-b border-charcoal/10 last:border-b-0">
                  <span className="font-mono text-[11px] text-silver tabular-nums mt-1.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base md:text-lg leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ─────────────────────────── DIAGNOSE ─────────────────────────── */}
        <section className="border-t border-charcoal/15 bg-whisper/50">
          <div className="container mx-auto max-w-5xl px-6 py-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-4 mb-10">
              <div className="md:col-span-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-silver mb-2">
                  § 2
                </div>
                <h2 className="font-display text-4xl md:text-5xl leading-[0.9] tracking-tight">
                  Diagnose.
                </h2>
              </div>
              <p className="md:col-span-7 text-base text-silver self-end max-w-xl">
                Five steps. In order. <em>Each one tells you whether to continue or stop.</em>
              </p>
            </div>

            <Rule label="5 steps" />

            <ol className="divide-y divide-charcoal/15">
              {DIAGNOSE.map((s) => (
                <li key={s.n} className="grid grid-cols-12 gap-x-6 gap-y-3 py-8">
                  <div className="col-span-12 sm:col-span-2 font-mono text-3xl md:text-4xl text-charcoal/90 tabular-nums leading-none">
                    {s.n}
                  </div>
                  <div className="col-span-12 sm:col-span-5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-silver mb-2">
                      Do
                    </div>
                    <p className="text-base md:text-lg leading-relaxed">{s.do}</p>
                    {s.note && (
                      <p className="mt-3 inline-flex items-start gap-2 text-[12px] font-mono uppercase tracking-[0.15em] text-amber-700 bg-amber-50 border border-amber-200 px-3 py-2 rounded-sm">
                        <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{s.note}</span>
                      </p>
                    )}
                  </div>
                  <div className="col-span-12 sm:col-span-5 sm:border-l sm:border-charcoal/15 sm:pl-6">
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-silver mb-2">
                      Expect
                    </div>
                    <p className="text-base leading-relaxed text-charcoal/80">{s.expect}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ─────────────────────────── FIX ─────────────────────────── */}
        <section className="border-t border-charcoal/15">
          <div className="container mx-auto max-w-5xl px-6 py-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-4 mb-10">
              <div className="md:col-span-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-silver mb-2">
                  § 3
                </div>
                <h2 className="font-display text-4xl md:text-5xl leading-[0.9] tracking-tight">
                  Fix.
                </h2>
              </div>
              <p className="md:col-span-7 text-base text-silver self-end max-w-xl">
                Apply only the steps that match what you found above. Skipping is encouraged
                here — unnecessary resets do not improve anything.
              </p>
            </div>

            <Rule label="4 remedies" />

            <ol className="divide-y divide-charcoal/15">
              {FIX.map((s) => (
                <li key={s.n} className="grid grid-cols-12 gap-x-6 gap-y-3 py-8">
                  <div className="col-span-12 sm:col-span-2 font-mono text-3xl md:text-4xl text-energy tabular-nums leading-none">
                    {s.n}
                  </div>
                  <div className="col-span-12 sm:col-span-5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-silver mb-2">
                      Action
                    </div>
                    <p className="text-base md:text-lg leading-relaxed">{s.do}</p>
                    {s.note && (
                      <p className="mt-3 inline-flex items-start gap-2 text-[12px] font-mono uppercase tracking-[0.15em] text-amber-700 bg-amber-50 border border-amber-200 px-3 py-2 rounded-sm">
                        <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{s.note}</span>
                      </p>
                    )}
                  </div>
                  <div className="col-span-12 sm:col-span-5 sm:border-l sm:border-charcoal/15 sm:pl-6">
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-silver mb-2">
                      Resolved when
                    </div>
                    <p className="inline-flex items-start gap-2 text-base leading-relaxed text-charcoal/80">
                      <CheckCircle2 className="w-4 h-4 mt-1 shrink-0 text-energy" />
                      <span>{s.expect}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ─────────────────────────── STILL NOT FIXED ─────────────────────────── */}
        <section className="border-t border-charcoal/15 bg-charcoal text-pearl">
          <div className="container mx-auto max-w-5xl px-6 py-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
              <div className="md:col-span-7">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-pearl/60 mb-4">
                  § 4 · Escalation
                </div>
                <h2 className="font-display font-bold leading-[0.9] tracking-[-0.03em] text-[clamp(2.5rem,7vw,5.5rem)]">
                  Still not
                  <br />
                  <span className="italic font-light text-energy">fixed?</span>
                </h2>
                <p className="mt-6 max-w-lg text-pearl/70 leading-relaxed">
                  If you got here, the guide failed you. We want to know. Call the line
                  below — please have the items in the right column ready, it shortens the
                  call by about ten minutes on average.
                </p>
                <a
                  href="tel:+918012345678"
                  className="mt-6 inline-flex items-center gap-3 font-display text-2xl md:text-3xl tracking-tight hover:text-energy transition-colors"
                >
                  <Phone className="w-6 h-6" />
                  +91 80 1234 5678
                </a>
              </div>
              <aside className="md:col-span-5 border-l border-pearl/15 pl-8">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-pearl/60 mb-4">
                  Have ready
                </div>
                <ul className="space-y-3 text-pearl/85">
                  <li className="flex gap-3">
                    <span className="font-mono text-[11px] text-pearl/50 tabular-nums mt-1">01</span>
                    <span>System serial (sticker, inside the front cover)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-[11px] text-pearl/50 tabular-nums mt-1">02</span>
                    <span>The LED state, in words (“steady amber, no blink”)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-[11px] text-pearl/50 tabular-nums mt-1">03</span>
                    <span>The .csv log you exported in Diagnose step 05</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-[11px] text-pearl/50 tabular-nums mt-1">04</span>
                    <span>Roughly when this started, and what (if anything) changed</span>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </section>

        {/* ─────────────────────────── RELATED ─────────────────────────── */}
        <section className="border-t border-charcoal/15">
          <div className="container mx-auto max-w-5xl px-6 py-16">
            <div className="flex items-center justify-center py-2 text-2xl text-charcoal/40 select-none">
              ❋
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-silver text-center mb-10">
              Related in this manual
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-charcoal/15">
              {[
                { slug: "system-wont-power-on", label: "System won’t power on" },
                { slug: "app-cant-connect", label: "App can’t connect" },
                { slug: "audible-alarm-red-led", label: "Audible alarm with red LED" },
              ].map((r) => (
                <li key={r.slug} className="bg-pearl">
                  <Link
                    to={`/support/troubleshooting/${product ?? "common"}/${r.slug}`}
                    className="group block p-6 hover:bg-whisper transition-colors h-full"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-silver mb-3">
                      Next entry
                    </div>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-xl leading-tight tracking-tight">
                        {r.label}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 mt-1 shrink-0 text-charcoal/60 group-hover:text-energy transition-colors" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Folio strip */}
          <div className="border-t border-charcoal/15">
            <div className="container mx-auto max-w-5xl px-6 py-4 flex flex-wrap items-center justify-between gap-y-1 text-[10px] font-mono uppercase tracking-[0.3em] text-silver">
              <span>{pName} · {title}</span>
              <span>The Field Manual</span>
              <span>ness.energy/support</span>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
};

export default TroubleshootingGuide;

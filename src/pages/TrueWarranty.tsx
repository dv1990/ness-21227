import { useEffect, memo } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { WebPImage } from "@/components/ui/webp-image";
import { ArrowRight } from "lucide-react";

import nessPodProduct from "@/assets-webp/ness-pod-product.webp";

// ─── A single contract clause ────────────────────────────────────────────────

const Clause = ({
  numeral,
  title,
  children,
}: {
  numeral: string;
  title: string;
  children: React.ReactNode;
}) => (
  <article className="grid grid-cols-12 gap-4 md:gap-8 border-b border-charcoal/20 py-10 md:py-14">
    <div className="col-span-12 md:col-span-2">
      <div className="font-display font-light text-6xl md:text-7xl text-charcoal tabular-nums leading-none">
        {numeral}
      </div>
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/40 mt-3">
        Clause {numeral}
      </div>
    </div>
    <div className="col-span-12 md:col-span-3">
      <h3 className="font-display font-light text-xl md:text-2xl text-charcoal leading-tight tracking-tight">
        {title}
      </h3>
    </div>
    <div className="col-span-12 md:col-span-7 font-serif text-base md:text-lg text-charcoal/85 leading-[1.75] space-y-4">
      {children}
    </div>
  </article>
);

const TrueWarranty = () => {
  useEffect(() => {
    document.title = "True Warranty | NESS Energy";
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <Layout className="-mt-16">
      {/* ───── FRONTISPIECE · THE PACT ───── */}
      <section className="bg-pearl">
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-28 md:pt-36 pb-16">
          <div className="border-t-2 border-charcoal pt-3 flex items-center justify-between font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-charcoal/70">
            <span>Warranty</span>
            <span className="hidden md:inline">10 years · 347 words · No asterisks</span>
            <span>NESS · Bangalore</span>
          </div>

          <div className="grid grid-cols-12 gap-4 md:gap-6 mt-16 md:mt-24">
            <div className="col-span-12 md:col-span-9">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/50 mb-6">
                Plain English · 347 words · No asterisks
              </div>
              <h1 className="font-display font-extralight text-[14vw] md:text-[10vw] lg:text-[130px] leading-[0.85] tracking-[-0.04em] text-charcoal">
                Our 10-year
                <br />
                <em className="italic font-light">promise</em>
                <span className="text-energy">.</span>
              </h1>
            </div>

            {/* The seal */}
            <aside className="col-span-12 md:col-span-3 md:pt-6 flex md:justify-end">
              <div className="relative w-40 h-40 md:w-44 md:h-44">
                <div className="absolute inset-0 rounded-full border-2 border-energy" />
                <div className="absolute inset-2 rounded-full border border-energy/40 border-dashed" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-energy">
                    Sealed · Stamped
                  </div>
                  <div className="font-display font-light text-3xl text-charcoal mt-2 leading-none">
                    X
                  </div>
                  <div className="font-display font-light text-3xl text-charcoal leading-none">
                    YEARS
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-energy mt-2">
                    NESS · MMXXVI
                  </div>
                </div>
                <svg
                  className="absolute inset-0 w-full h-full animate-[spin_60s_linear_infinite]"
                  viewBox="0 0 100 100"
                  aria-hidden
                >
                  <path
                    id="seal-text"
                    d="M 50,50 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
                    fill="none"
                  />
                  <text className="fill-charcoal/60 font-mono" style={{ fontSize: "5px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                    <textPath href="#seal-text">
                      A ten-year promise · plain english · no fine print ·
                    </textPath>
                  </text>
                </svg>
              </div>
            </aside>
          </div>

          {/* Opening — solemn declaration */}
          <div className="grid grid-cols-12 gap-4 md:gap-6 mt-16 md:mt-24">
            <div className="col-span-12 md:col-span-9 md:col-start-2">
              <p className="font-serif text-3xl md:text-5xl text-charcoal leading-[1.18] tracking-tight first-letter:font-display first-letter:text-[10rem] md:first-letter:text-[14rem] first-letter:font-light first-letter:float-left first-letter:mr-5 first-letter:mt-3 first-letter:leading-[0.78] first-letter:text-energy">
                I, NESS, do solemnly promise this: if your battery fails within ten years, we
                replace it — <em className="font-display font-light not-italic underline decoration-energy decoration-2 underline-offset-[6px]">completely, freely, without ceremony.</em>{" "}
                That is the whole story.
              </p>
            </div>
          </div>

          {/* Three stat shelves */}
          <div className="mt-20 md:mt-28 grid grid-cols-12 border-y border-charcoal">
            <div className="col-span-4 py-6 px-4 border-r border-charcoal/15">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/50">Replaced, no questions</div>
              <div className="font-display font-extralight text-5xl md:text-7xl tabular-nums text-charcoal mt-2">02</div>
            </div>
            <div className="col-span-4 py-6 px-4 border-r border-charcoal/15">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/50">Avg. claim processing</div>
              <div className="font-display font-extralight text-5xl md:text-7xl tabular-nums text-charcoal mt-2">48<span className="text-charcoal/40 text-2xl md:text-3xl align-top">h</span></div>
            </div>
            <div className="col-span-4 py-6 px-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/50">Valid claims honored</div>
              <div className="font-display font-extralight text-5xl md:text-7xl tabular-nums text-charcoal mt-2">100<span className="text-charcoal/40 text-2xl md:text-3xl align-top">%</span></div>
            </div>
          </div>

          <div className="mt-12 text-center font-mono text-charcoal/30 tracking-[0.5em]">⁂</div>
        </div>
      </section>

      {/* ───── THE FIVE CLAUSES ───── */}
      <section className="bg-whisper">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/60 flex items-center gap-4 mb-12">
            <span className="text-charcoal">The Articles</span>
            <span className="h-px flex-1 bg-charcoal/20" />
            <span>Five clauses · in plain English</span>
          </div>

          <div className="grid grid-cols-12 gap-4 md:gap-6 mb-16">
            <div className="col-span-12 md:col-span-9">
              <h2 className="font-display font-light text-5xl md:text-7xl lg:text-8xl text-charcoal leading-[0.9] tracking-[-0.035em]">
                Our warranty,
                <br />
                <em className="font-extralight text-charcoal/40">in five clauses.</em>
              </h2>
            </div>
            <aside className="col-span-12 md:col-span-3 md:pt-4">
              <p className="font-serif italic text-charcoal/60 text-sm leading-[1.6]">
                Three hundred and forty-seven words — printed here in full, so there is nothing
                hidden in the corner of a page you wouldn't read.
              </p>
            </aside>
          </div>

          {/* Clauses */}
          <div className="border-t-2 border-charcoal">
            <Clause numeral="I" title="The Replacement">
              <p>
                If your NESS battery fails within ten years, we replace it.{" "}
                <em className="text-charcoal font-display not-italic">Completely. Free.</em>
              </p>
              <p>
                Or, if you prefer, we give you a pro-rata refund based on the remaining warranty
                period. Your choice — never ours.
              </p>
            </Clause>

            <Clause numeral="II" title="The Watch">
              <p>
                We monitor every battery, every hour, every day. If we see a problem developing,
                we call you before you call us. Most issues are caught long before they affect
                your power.
              </p>
              <p className="font-serif italic text-charcoal/60 text-sm">
                — That's not marketing. That's how we keep our warranty costs down and your lights on.
              </p>
            </Clause>

            <Clause numeral="III" title="The Real World">
              <p>
                Your battery works in 45°C Indian summers with real loads, or we replace it. No
                lab-condition clauses. No 25°C fine print. No paragraph that mysteriously
                excludes the place you live.
              </p>
            </Clause>

            <Clause numeral="IV" title="No Blame-Shifting">
              <p>
                No waiting five years for repairs while the warranty quietly converts to a
                pro-rata trickle. No paragraph that says the installer voided it. No paragraph
                that says the weather voided it.
              </p>
              <p>
                If our battery fails, that is our problem. Not yours.
              </p>
            </Clause>

            <Clause numeral="V" title="The Whole Story">
              <p className="font-display font-light text-charcoal not-italic text-xl md:text-2xl leading-snug">
                That's it. That's our warranty.
              </p>
              <p className="font-serif italic text-charcoal/60">
                Three hundred and forty-seven words. Plain English. Sealed in this pact and
                signed beneath.
              </p>
            </Clause>
          </div>
        </div>
      </section>

      {/* ───── HOW WE KEEP THIS PROMISE ───── */}
      <section className="bg-pearl">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="grid grid-cols-12 gap-4 md:gap-8 items-center">
            <div className="col-span-12 md:col-span-7 space-y-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/60 flex items-center gap-4">
                <span className="text-charcoal">An aside ·</span>
                <span>How the pact is kept</span>
              </div>

              <h2 className="font-display font-light text-5xl md:text-7xl text-charcoal leading-[0.95] tracking-[-0.03em]">
                We see problems
                <br />
                <em className="font-extralight text-charcoal/40">before you do.</em>
              </h2>

              <p className="font-serif text-xl md:text-2xl text-charcoal/80 leading-[1.55] first-letter:font-display first-letter:text-7xl first-letter:font-light first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.85] first-letter:text-energy">
                Every battery talks to us. If something is wrong at 2 AM, we call you at 9 AM —
                before your power goes out. That is the entire trick. The warranty is the
                visible part of a discipline that begins long before the truck leaves the
                factory.
              </p>

              <div className="pt-4 border-t border-charcoal/20 font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/50">
                Footnote † — see Clause II
              </div>
            </div>

            <figure className="col-span-12 md:col-span-5">
              <div className="bg-whisper p-6 md:p-10">
                <WebPImage src={nessPodProduct} alt="NESS Pod Battery" className="w-full" priority={false} />
              </div>
              <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/60 flex items-baseline gap-3">
                <span className="text-charcoal">Plate I</span>
                <span className="h-px w-6 bg-charcoal/30" />
                <span className="font-serif italic normal-case tracking-normal text-charcoal/70 text-sm">
                  The unit that bears this promise.
                </span>
              </figcaption>
            </figure>
          </div>

          <div className="mt-20 text-center font-mono text-charcoal/30 tracking-[0.5em]">§ § §</div>
        </div>
      </section>

      {/* ───── COMPARISON · TWO COLUMNS ───── */}
      <section className="bg-whisper">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/60 flex items-center gap-4 mb-12">
            <span className="text-charcoal">A comparison</span>
            <span className="h-px flex-1 bg-charcoal/20" />
            <span>Side by side · for the record</span>
          </div>

          <h2 className="font-display font-light text-5xl md:text-7xl text-charcoal leading-[0.95] tracking-[-0.035em] mb-16">
            What makes it
            <br />
            <em className="font-extralight text-charcoal/40">different?</em>
          </h2>

          <div className="grid md:grid-cols-2 gap-0 border-y-2 border-charcoal">
            {/* Others */}
            <div className="md:border-r border-charcoal/30">
              <div className="px-2 md:px-8 py-6 border-b border-charcoal/20">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/40">
                  Column A
                </div>
                <h3 className="font-display font-extralight text-3xl md:text-4xl text-charcoal/50 mt-1">
                  Others
                </h3>
              </div>
              {[
                { h: "Repair only after 5 years", s: "If it fails, you wait. And hope." },
                { h: "Lab conditions", s: "25°C tests. Not your reality." },
                { h: "Blame-shifting", s: "Pages of exclusions and asterisks." },
              ].map((c, i) => (
                <div
                  key={c.h}
                  className={`px-2 md:px-8 py-8 ${i < 2 ? "border-b border-charcoal/15" : ""}`}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-display font-light text-3xl text-charcoal/40 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <p className="font-serif text-xl text-charcoal/60">{c.h}</p>
                      <p className="font-serif italic text-sm text-charcoal/50 mt-1">{c.s}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* NESS */}
            <div className="border-t md:border-t-0 border-charcoal/30">
              <div className="px-2 md:px-8 py-6 border-b border-charcoal/20 bg-charcoal/5">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-energy">
                  Column B · this pact
                </div>
                <h3 className="font-display font-light text-3xl md:text-4xl text-charcoal mt-1">
                  NESS
                </h3>
              </div>
              {[
                { h: "Full replacement. All 10 years.", s: "Or pro-rata refund. Your choice." },
                { h: "Real-world tested", s: "45°C Indian summers. Actual loads." },
                { h: "We stand with you", s: "Plain language. Zero fine print." },
              ].map((c, i) => (
                <div
                  key={c.h}
                  className={`px-2 md:px-8 py-8 ${i < 2 ? "border-b border-charcoal/15" : ""}`}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-display font-light text-3xl text-energy tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <p className="font-serif text-xl text-charcoal">{c.h}</p>
                      <p className="font-serif italic text-sm text-charcoal/60 mt-1">{c.s}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── A PRINCIPLE THAT COSTS US ───── */}
      <section className="bg-charcoal text-pearl">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-pearl/60 flex items-center gap-4 mb-12">
            <span className="text-pearl">A confession</span>
            <span className="h-px flex-1 bg-pearl/20" />
            <span>Why we can afford this</span>
          </div>

          <h2 className="font-display font-light text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-[-0.035em]">
            Why we can afford
            <br />
            <em className="font-extralight text-pearl/40">this warranty.</em>
          </h2>

          <div className="grid grid-cols-12 gap-4 md:gap-6 mt-12 md:mt-16">
            <div className="col-span-12 md:col-span-8 md:col-start-3 space-y-8">
              <p className="font-serif text-2xl md:text-3xl text-pearl leading-[1.4] first-letter:font-display first-letter:text-8xl first-letter:font-light first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:leading-[0.78] first-letter:text-energy">
                Other companies spend millions on marketing. We spend it on better batteries.
                Better testing. Better monitoring.
              </p>

              <p className="font-serif text-lg md:text-xl text-pearl/70 leading-[1.7] pl-4 border-l-2 border-energy">
                Our warranty costs us money when competitors walk away. But it costs us less
                than their marketing budgets. And you — you get a battery that actually works.
              </p>
            </div>
          </div>

          {/* Three figures */}
          <div className="mt-20 md:mt-24 grid grid-cols-12 border-y border-pearl/20">
            <div className="col-span-4 py-8 px-4 border-r border-pearl/15">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-pearl/40">Pre-launch testing</div>
              <div className="font-display font-extralight text-4xl md:text-6xl tabular-nums text-pearl mt-3">04<span className="text-pearl/40 text-lg md:text-xl align-top ml-2">years</span></div>
            </div>
            <div className="col-span-4 py-8 px-4 border-r border-pearl/15">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-pearl/40">Charge cycles proven</div>
              <div className="font-display font-extralight text-4xl md:text-6xl tabular-nums text-pearl mt-3">25,000<span className="text-energy">+</span></div>
            </div>
            <div className="col-span-4 py-8 px-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-pearl/40">Indian-summer testing</div>
              <div className="font-display font-extralight text-4xl md:text-6xl tabular-nums text-pearl mt-3">45<span className="text-pearl/40 text-2xl md:text-3xl align-top">°C</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── THE FULL DOCUMENT ───── */}
      <section id="warranty-terms" className="bg-pearl">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/60 flex items-center gap-4 mb-12">
            <span className="text-charcoal">Colophon</span>
            <span className="h-px flex-1 bg-charcoal/20" />
            <span>The whole document · signed</span>
          </div>

          <h2 className="font-display font-light text-5xl md:text-7xl lg:text-8xl text-charcoal leading-[0.9] tracking-[-0.035em]">
            Download the
            <br />
            full warranty.
            <br />
            <em className="font-extralight text-energy">All 347 words.</em>
          </h2>

          <div className="grid grid-cols-12 gap-4 md:gap-6 mt-12">
            <div className="col-span-12 md:col-span-9">
              <p className="font-serif text-xl md:text-2xl text-charcoal/80 leading-[1.55]">
                Written in plain English. No legal degree needed. The document is identical to
                the clauses printed above — just stamped, sealed, and signed for your records.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link
              to="/downloads"
              className="inline-flex items-center gap-3 px-6 py-4 bg-charcoal text-pearl font-mono text-[11px] uppercase tracking-[0.22em] hover:bg-charcoal/90 transition-colors"
            >
              Download warranty PDF <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact/homeowner"
              className="inline-flex items-center gap-3 px-6 py-4 border border-charcoal/40 text-charcoal font-mono text-[11px] uppercase tracking-[0.22em] hover:bg-charcoal hover:text-pearl transition-colors"
            >
              Ask us anything
            </Link>
          </div>

          {/* Signature block */}
          <div className="mt-20 md:mt-28 grid grid-cols-12 gap-4 md:gap-8 border-t border-charcoal pt-8">
            <div className="col-span-12 md:col-span-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/50">Signed for the issuer</div>
              <div className="mt-3 font-display italic font-light text-3xl text-charcoal">NESS, by Nunam</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/50">Bangalore · A ten-year promise</div>
            </div>
            <div className="col-span-12 md:col-span-6 md:text-right">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/50">Filed under</div>
              <div className="mt-3 font-serif italic text-charcoal/80 text-lg">
                The Pact · Ten-Year Promise
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-charcoal/50">Page 04 / 04</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default memo(TrueWarranty);

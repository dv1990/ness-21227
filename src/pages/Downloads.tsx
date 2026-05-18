import Layout from "@/components/Layout";
import { useMemo, useState } from "react";
import { Download } from "lucide-react";

// ──────────────────────────────────────────────────────────────────────────
// THE ARCHIVE · TECHNICAL RECORDS · 2026
// A reference desk for installers, integrators, and technicians.
// ──────────────────────────────────────────────────────────────────────────

type Doc = {
  filename: string;
  version: string;
  size: string;
  date: string;
  description: string;
};

type Section = {
  num: string;
  symbol: string;
  title: string;
  caption: string;
  docs: Doc[];
};

const SECTIONS: Section[] = [
  {
    num: "I",
    symbol: "¶",
    title: "Manuals",
    caption: "Installation, commissioning, and operation manuals — current revision and prior.",
    docs: [
      { filename: "NESS-PRO-MANUAL-v2.4.pdf", version: "v2.4", size: "4.2 MB", date: "May 2026", description: "Installation, commissioning, operation. Three-phase, 20–50 kWh." },
      { filename: "NESS-CUBE-MANUAL-v3.1.pdf", version: "v3.1", size: "3.8 MB", date: "Apr 2026", description: "Whole-home hybrid installation and homeowner handover." },
      { filename: "NESS-POD-MANUAL-v2.0.pdf", version: "v2.0", size: "2.6 MB", date: "Feb 2026", description: "Wall-mounted 5–10 kWh compact unit — apartments and small homes." },
      { filename: "NESS-PRO-MANUAL-v2.3.pdf", version: "v2.3", size: "4.1 MB", date: "Dec 2025", description: "Superseded. Retained for installs prior to firmware 4.x." },
      { filename: "NESS-CUBE-MANUAL-v3.0.pdf", version: "v3.0", size: "3.7 MB", date: "Oct 2025", description: "Superseded. Pre-thermal-update revision." },
      { filename: "NESS-PRO-QUICKSTART-v1.2.pdf", version: "v1.2", size: "1.1 MB", date: "Mar 2026", description: "Two-page rapid commissioning card for trained installers." },
    ],
  },
  {
    num: "II",
    symbol: "§",
    title: "Firmware",
    caption: "Signed images for inverter, BMS, and gateway. Verify SHA-256 before flashing.",
    docs: [
      { filename: "ness-inverter-fw-4.2.1.bin", version: "v4.2.1", size: "12.4 MB", date: "May 2026", description: "Latest stable. Improves cold-start behaviour below 5 °C." },
      { filename: "ness-bms-fw-3.7.0.bin", version: "v3.7.0", size: "3.2 MB", date: "Apr 2026", description: "Battery management — cell balancing refinements, LFP profile." },
      { filename: "ness-gateway-fw-2.9.4.bin", version: "v2.9.4", size: "8.6 MB", date: "Apr 2026", description: "Cloud gateway. Adds local API and MQTT v5." },
      { filename: "ness-inverter-fw-4.1.8.bin", version: "v4.1.8", size: "12.2 MB", date: "Feb 2026", description: "Previous stable. Roll back from 4.2.x if grid faults observed." },
      { filename: "ness-bms-fw-3.6.2.bin", version: "v3.6.2", size: "3.1 MB", date: "Jan 2026", description: "Prior BMS image — retained for compatibility." },
      { filename: "RELEASE-NOTES-2026Q2.txt", version: "—", size: "42 KB", date: "May 2026", description: "Plain-text changelog covering all Q2 2026 firmware updates." },
    ],
  },
  {
    num: "III",
    symbol: "❋",
    title: "Single-Line Diagrams",
    caption: "Reference SLDs in DWG, PDF, and editable SVG. For DISCOM and structural submittals.",
    docs: [
      { filename: "SLD-NESS-PRO-3PH-grid-tie.pdf", version: "Rev D", size: "780 KB", date: "Mar 2026", description: "Three-phase grid-tied with battery backup. Submittal-ready." },
      { filename: "SLD-NESS-CUBE-1PH-hybrid.pdf", version: "Rev C", size: "640 KB", date: "Mar 2026", description: "Single-phase hybrid. Whole-home with critical-loads panel." },
      { filename: "SLD-NESS-POD-essentials.pdf", version: "Rev B", size: "510 KB", date: "Feb 2026", description: "Essentials-only backup. Lights, fans, refrigerator, router." },
      { filename: "SLD-NESS-PRO-3PH-grid-tie.dwg", version: "Rev D", size: "1.4 MB", date: "Mar 2026", description: "AutoCAD source. Editable layers for layout adjustments." },
      { filename: "SLD-EV-integration.pdf", version: "Rev A", size: "720 KB", date: "Apr 2026", description: "AC-coupled EV charger on the protected side of the gateway." },
      { filename: "SLD-template-blank.dwg", version: "Rev A", size: "320 KB", date: "Jan 2026", description: "Empty template with title block, layers, and standard symbols." },
    ],
  },
  {
    num: "IV",
    symbol: "¶",
    title: "Installation Guides",
    caption: "Step-by-step site procedures, with photography. Print and bring to site.",
    docs: [
      { filename: "INSTALL-rooftop-mounting.pdf", version: "v1.3", size: "5.6 MB", date: "Apr 2026", description: "Tile, sheet, and concrete roof procedures. Wind-zone notes for India." },
      { filename: "INSTALL-cable-routing.pdf", version: "v1.1", size: "2.4 MB", date: "Mar 2026", description: "DC + AC cable runs, conduit selection, derating tables." },
      { filename: "INSTALL-grounding-earthing.pdf", version: "v1.2", size: "1.9 MB", date: "Feb 2026", description: "Earthing scheme, lightning protection, surge-arrester placement." },
      { filename: "INSTALL-commissioning-checklist.pdf", version: "v2.0", size: "320 KB", date: "May 2026", description: "Single-page tear-out checklist. 24 items, sign-off boxes." },
      { filename: "INSTALL-handover-pack.pdf", version: "v1.4", size: "3.1 MB", date: "Apr 2026", description: "Homeowner handover: app pairing, basic operation, warranty card." },
      { filename: "INSTALL-troubleshooting-flowcharts.pdf", version: "v1.0", size: "2.8 MB", date: "Mar 2026", description: "Decision-tree diagnostics for common no-export and BMS faults." },
    ],
  },
  {
    num: "V",
    symbol: "§",
    title: "Datasheets",
    caption: "Single-page technical specifications. Suitable for tender documents.",
    docs: [
      { filename: "DS-NESS-PRO-3ph.pdf", version: "Rev 5", size: "480 KB", date: "May 2026", description: "Three-phase, 20–50 kWh. Electrical, mechanical, thermal." },
      { filename: "DS-NESS-CUBE.pdf", version: "Rev 4", size: "440 KB", date: "Apr 2026", description: "10–20 kWh whole-home. Hybrid inverter integrated." },
      { filename: "DS-NESS-POD.pdf", version: "Rev 3", size: "380 KB", date: "Feb 2026", description: "5–10 kWh wall-mount. Compact and quiet." },
      { filename: "DS-LFP-cell-spec.pdf", version: "Rev 2", size: "260 KB", date: "Jan 2026", description: "Underlying LFP cell chemistry and cycle-life curves." },
      { filename: "DS-MPPT-tracker.pdf", version: "Rev 2", size: "240 KB", date: "Jan 2026", description: "MPPT efficiency curves, max input, operating range." },
      { filename: "DS-thermal-envelope.pdf", version: "Rev 1", size: "210 KB", date: "Dec 2025", description: "Operating temperature and derating envelope." },
    ],
  },
  {
    num: "VI",
    symbol: "❋",
    title: "Compliance",
    caption: "Test certificates, BIS, IEC, and DISCOM submittal documents.",
    docs: [
      { filename: "CERT-BIS-IS-16221-2.pdf", version: "2025", size: "1.1 MB", date: "Nov 2025", description: "BIS IS 16221 (Part 2) — inverter safety certification." },
      { filename: "CERT-IEC-62619.pdf", version: "2025", size: "980 KB", date: "Oct 2025", description: "IEC 62619 — secondary lithium cell safety for stationary use." },
      { filename: "CERT-IEC-61683-efficiency.pdf", version: "2025", size: "840 KB", date: "Sep 2025", description: "Inverter efficiency test report under IEC 61683." },
      { filename: "DECL-CE-conformity.pdf", version: "2026", size: "220 KB", date: "Jan 2026", description: "CE declaration of conformity for export installations." },
      { filename: "DISCOM-net-metering-template.docx", version: "v3", size: "85 KB", date: "Apr 2026", description: "Pre-filled net-metering application — edit for your DISCOM." },
      { filename: "WARRANTY-terms-2026.pdf", version: "2026.1", size: "310 KB", date: "Jan 2026", description: "Standard warranty terms, India and export markets." },
    ],
  },
];

const ALL_DOCS_COUNT = SECTIONS.reduce((n, s) => n + s.docs.length, 0);

const Downloads = () => {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "name" | "size">("date");

  const sortDocs = (docs: Doc[]) => {
    const copy = [...docs];
    if (sortBy === "name") return copy.sort((a, b) => a.filename.localeCompare(b.filename));
    if (sortBy === "size") {
      const toBytes = (s: string) => {
        const n = parseFloat(s);
        if (s.includes("MB")) return n * 1024;
        if (s.includes("KB")) return n;
        return n;
      };
      return copy.sort((a, b) => toBytes(b.size) - toBytes(a.size));
    }
    // date (rough — newest first by parsing month/year)
    const monthIdx = (s: string) => {
      const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      const [m, y] = s.split(" ");
      return parseInt(y, 10) * 12 + months.indexOf(m);
    };
    return copy.sort((a, b) => monthIdx(b.date) - monthIdx(a.date));
  };

  const sectionsFiltered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SECTIONS.map((s) => ({
      ...s,
      docs: sortDocs(
        s.docs.filter(
          (d) =>
            !q ||
            d.filename.toLowerCase().includes(q) ||
            d.description.toLowerCase().includes(q) ||
            s.title.toLowerCase().includes(q),
        ),
      ),
    })).filter((s) => s.docs.length > 0);
  }, [query, sortBy]);

  return (
    <Layout>
      {/* ─── MASTHEAD ──────────────────────────────────────────────── */}
      <section className="bg-background pt-16 sm:pt-24 pb-10 border-b border-foreground/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground border-b border-foreground/15 pb-3 mb-10 sm:mb-16">
            <span>NESS · The Archive</span>
            <span className="hidden sm:inline">Technical Records · Vol. II</span>
            <span>2026 Edition</span>
          </div>

          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 lg:col-span-8">
              <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-energy mb-4">
                § The Archive
              </p>
              <h1 className="font-display font-bold text-foreground tracking-[-0.04em] leading-[0.88] text-[14vw] sm:text-[10vw] lg:text-[8.5rem]">
                Manuals,<br />
                <span className="italic font-light">firmware,</span><br />
                diagrams.
              </h1>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:pt-8 flex flex-col justify-end">
              <p className="font-display text-xl sm:text-2xl text-foreground leading-snug mb-6 italic">
                The reference desk. Every document an installer or integrator
                might need, with version numbers that actually mean something.
              </p>
              <dl className="border-t border-foreground/15 pt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground space-y-1">
                <div className="flex justify-between"><dt>Documents on file</dt><dd className="text-foreground tabular-nums">{ALL_DOCS_COUNT}</dd></div>
                <div className="flex justify-between"><dt>Sections</dt><dd className="text-foreground tabular-nums">{SECTIONS.length}</dd></div>
                <div className="flex justify-between"><dt>Last revision</dt><dd className="text-foreground">May 2026</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTROLS ──────────────────────────────────────────────── */}
      <section className="bg-whisper py-10 sm:py-12 border-b border-foreground/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-7">
              <label className="block">
                <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  Find a record —
                </span>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="filename, subject, version…"
                  className="w-full bg-transparent border-0 border-b border-foreground/20 focus:border-foreground focus:outline-none py-2 font-display text-xl sm:text-2xl text-foreground placeholder:text-foreground/30 placeholder:italic"
                />
              </label>
            </div>
            <div className="col-span-12 md:col-span-5 md:pl-6">
              <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
                Sort the shelf by —
              </span>
              <div className="flex gap-6 font-mono text-[11px] uppercase tracking-[0.2em]">
                {([
                  ["date", "Date"],
                  ["name", "Name"],
                  ["size", "Size"],
                ] as const).map(([k, label]) => (
                  <button
                    key={k}
                    onClick={() => setSortBy(k)}
                    className={`pb-1 transition-colors ${
                      sortBy === k
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
        </div>
      </section>

      {/* ─── SECTIONS ──────────────────────────────────────────────── */}
      <section className="bg-background py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 space-y-20 sm:space-y-28">
          {sectionsFiltered.length === 0 && (
            <p className="font-display italic text-2xl text-muted-foreground text-center py-20">
              Nothing on this shelf. Try a different word.
            </p>
          )}
          {sectionsFiltered.map((section) => (
            <div key={section.num} className="grid grid-cols-12 gap-x-6 gap-y-6">
              {/* Section header — marginalia style */}
              <header className="col-span-12 lg:col-span-3">
                <div className="lg:sticky lg:top-24 space-y-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-energy">
                    Section {section.num} · {section.symbol}
                  </p>
                  <h2 className="font-display font-medium tracking-[-0.02em] text-foreground text-4xl sm:text-5xl leading-[0.95]">
                    {section.title}.
                  </h2>
                  <p className="font-display italic text-base text-muted-foreground leading-relaxed max-w-xs">
                    {section.caption}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground pt-2">
                    {section.docs.length} record{section.docs.length === 1 ? "" : "s"}
                  </p>
                </div>
              </header>

              {/* Records list */}
              <ul className="col-span-12 lg:col-span-9 border-t border-foreground/30">
                {section.docs.map((doc, i) => (
                  <li key={doc.filename} className="border-b border-foreground/15">
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="group grid grid-cols-12 gap-x-3 sm:gap-x-4 py-5 sm:py-6 items-baseline hover:bg-whisper/60 transition-colors -mx-2 px-2"
                    >
                      <span className="col-span-12 sm:col-span-1 font-mono text-[10px] sm:text-xs text-muted-foreground tabular-nums order-1 sm:order-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <div className="col-span-12 sm:col-span-7 order-2 sm:order-none">
                        <p className="font-mono text-sm sm:text-base text-foreground group-hover:text-energy transition-colors break-all">
                          {doc.filename}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground leading-snug">
                          {doc.description}
                        </p>
                      </div>

                      <div className="col-span-6 sm:col-span-3 order-3 sm:order-none font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-muted-foreground space-y-0.5 mt-2 sm:mt-0">
                        <span className="block text-foreground/90">{doc.version}</span>
                        <span className="block tabular-nums">{doc.size}</span>
                        <span className="block">{doc.date}</span>
                      </div>

                      <div className="col-span-6 sm:col-span-1 order-4 sm:order-none flex sm:justify-end items-center mt-2 sm:mt-0">
                        <Download
                          className="w-4 h-4 text-foreground/60 group-hover:text-energy group-hover:translate-y-0.5 transition-all"
                          strokeWidth={1.5}
                        />
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Folio */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-foreground/20 pt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <span>The Archive · End of file</span>
            <span>Page 38 / 38</span>
          </div>
        </div>
      </section>

      {/* ─── DESK NOTE ─────────────────────────────────────────────── */}
      <section className="bg-charcoal text-pearl py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-energy mb-6">
              § Reference Desk
            </p>
            <p className="font-display text-3xl sm:text-5xl leading-[1.1] tracking-[-0.02em] mb-8">
              Missing a document? <span className="italic font-light">Ask the desk.</span> We keep older revisions on request.
            </p>
            <a
              href="/contact"
              className="inline-flex items-baseline gap-3 font-mono text-xs uppercase tracking-[0.25em] text-pearl border-b border-dashed border-pearl/50 hover:border-energy hover:text-energy pb-1 transition-colors"
            >
              Write to the archivist
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Downloads;

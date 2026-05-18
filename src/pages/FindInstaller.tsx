import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";

interface CustomerData {
  name: string;
  email: string;
  phone: string;
  pincode: string;
}

interface Installer {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  rating: number;
  reviewCount: number;
  googleReviewsUrl: string;
  partnershipLevel: "Authorized" | "Premium" | "Elite";
  yearsOfExperience: number;
  projectsCompleted: number;
  certifications: string[];
  specialties: string[];
  distance: string;
  region: "South" | "West" | "North" | "East";
}

// MOCK DATA — Replace with real API integration before production launch.
const mockInstallers: Record<string, Installer[]> = {
  "110001": [
    {
      id: "1",
      name: "SolarTech Solutions Delhi",
      address: "A-42, Connaught Place",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110001",
      phone: "+91-9876543210",
      email: "info@solartech-delhi.com",
      rating: 4.8,
      reviewCount: 127,
      googleReviewsUrl: "https://google.com/reviews/solartech-solutions",
      partnershipLevel: "Elite",
      yearsOfExperience: 8,
      projectsCompleted: 350,
      certifications: ["BIS Certified", "MNRE Approved", "ISO 9001"],
      specialties: ["Residential Solar", "Battery Backup", "Grid-Tie Systems"],
      distance: "2.3 km",
      region: "North",
    },
    {
      id: "2",
      name: "Power Plus Energy",
      address: "Plot 15, Sector 18, Rohini",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110085",
      phone: "+91-9123456789",
      email: "contact@powerplus.in",
      rating: 4.6,
      reviewCount: 89,
      googleReviewsUrl: "https://google.com/reviews/power-plus-energy",
      partnershipLevel: "Premium",
      yearsOfExperience: 6,
      projectsCompleted: 220,
      certifications: ["BIS Certified", "MNRE Approved"],
      specialties: ["Commercial Solar", "Maintenance", "System Design"],
      distance: "8.7 km",
      region: "North",
    },
  ],
  "400001": [
    {
      id: "3",
      name: "Mumbai Solar Experts",
      address: "Office 301, Nariman Point",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400021",
      phone: "+91-8765432109",
      email: "hello@mumbaisolar.com",
      rating: 4.9,
      reviewCount: 203,
      googleReviewsUrl: "https://google.com/reviews/mumbai-solar-experts",
      partnershipLevel: "Elite",
      yearsOfExperience: 12,
      projectsCompleted: 480,
      certifications: ["BIS Certified", "MNRE Approved", "ISO 9001", "IEC 61215"],
      specialties: ["High-rise Installation", "Marine Environment", "Premium Systems"],
      distance: "1.8 km",
      region: "West",
    },
  ],
  "560001": [
    {
      id: "4",
      name: "Bangalore Energy Solutions",
      address: "12th Main, Indiranagar",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560038",
      phone: "+91-7654321098",
      email: "info@bangaloreEnergy.com",
      rating: 4.7,
      reviewCount: 156,
      googleReviewsUrl: "https://google.com/reviews/bangalore-energy",
      partnershipLevel: "Premium",
      yearsOfExperience: 10,
      projectsCompleted: 320,
      certifications: ["BIS Certified", "MNRE Approved", "KEDA Certified"],
      specialties: ["Tech Parks", "Villa Complexes", "Battery Integration"],
      distance: "4.2 km",
      region: "South",
    },
  ],
};

const FolioStrip = ({ left, right }: { left: string; right: string }) => (
  <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/50 py-3 border-y border-charcoal/15">
    <span>{left}</span>
    <span>{right}</span>
  </div>
);

const FindInstaller = () => {
  const [step, setStep] = useState<"form" | "results">("form");
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    email: "",
    phone: "",
    pincode: "",
  });
  const [installers, setInstallers] = useState<Installer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const grouped = useMemo(() => {
    const out: Record<string, Installer[]> = { South: [], West: [], North: [], East: [] };
    installers.forEach((i) => out[i.region]?.push(i));
    return out;
  }, [installers]);

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setCustomerData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    const found = mockInstallers[customerData.pincode] || [];
    setInstallers(found);
    setStep("results");
    setIsLoading(false);
  };

  const handleBack = () => {
    setStep("form");
    setInstallers([]);
  };

  if (step === "form") {
    return (
      <Layout className="-mt-16">
        <div className="bg-pearl text-charcoal pt-24 min-h-screen">
          <section className="px-6 md:px-12 lg:px-20 pt-8">
            <div className="mx-auto max-w-screen-xl">
              <FolioStrip
                left="THE NETWORK · CERTIFIED INSTALLERS · INDIA"
                right="ATLAS 01 · MAY 2026"
              />

              <div className="grid grid-cols-12 gap-6 pt-16 pb-12">
                <div className="col-span-12 md:col-span-2">
                  <Link
                    to="/homeowners"
                    className="font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/60 hover:text-charcoal border-b border-charcoal/30 pb-1"
                  >
                    ← To homeowners
                  </Link>
                </div>
                <div className="col-span-12 md:col-span-10">
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-charcoal/50 mb-6">
                    A directory of certified NESS partners
                  </p>
                  <h1 className="font-display font-light leading-[0.85] tracking-tight text-[clamp(3rem,10vw,9rem)]">
                    The<br/>
                    <em className="italic text-charcoal/70">network.</em>
                  </h1>
                  <p className="mt-10 max-w-xl text-xl md:text-2xl font-light leading-snug text-charcoal/80">
                    BIS-certified. MNRE-approved. Tell us where you are —
                    we'll send back the names worth knowing.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-20 py-16 border-t border-charcoal/15">
            <div className="mx-auto max-w-3xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-charcoal/60 mb-10">
                Form 05 · your details
              </p>

              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="grid grid-cols-12 gap-4 items-baseline">
                  <div className="col-span-12 md:col-span-2">
                    <p className="font-display text-3xl font-light text-charcoal/30">01.</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-charcoal/60 mt-1">
                      Looking in
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-10">
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      value={customerData.pincode}
                      onChange={(e) => handleInputChange("pincode", e.target.value)}
                      maxLength={6}
                      pattern="[0-9]{6}"
                      required
                      className="w-full bg-transparent border-0 border-b border-charcoal/30 focus:border-charcoal rounded-none px-0 py-3 font-display text-3xl md:text-5xl font-light placeholder:text-charcoal/25 outline-none tracking-widest"
                      placeholder="6-digit PIN"
                    />
                    <p className="font-mono text-[10px] uppercase tracking-widest text-charcoal/50 mt-3">
                      e.g. 110001 · 400001 · 560001
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                  <div className="grid grid-cols-12 gap-4 items-baseline">
                    <div className="col-span-12 md:col-span-3">
                      <p className="font-display text-3xl font-light text-charcoal/30">02.</p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-charcoal/60 mt-1">
                        Name
                      </p>
                    </div>
                    <div className="col-span-12 md:col-span-9">
                      <input
                        type="text"
                        value={customerData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        className="w-full bg-transparent border-0 border-b border-charcoal/30 focus:border-charcoal rounded-none px-0 py-3 font-display text-xl font-light placeholder:text-charcoal/30 outline-none"
                        placeholder="Your name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-4 items-baseline">
                    <div className="col-span-12 md:col-span-3">
                      <p className="font-display text-3xl font-light text-charcoal/30">03.</p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-charcoal/60 mt-1">
                        Phone
                      </p>
                    </div>
                    <div className="col-span-12 md:col-span-9">
                      <input
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={customerData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                        className="w-full bg-transparent border-0 border-b border-charcoal/30 focus:border-charcoal rounded-none px-0 py-3 font-display text-xl font-light placeholder:text-charcoal/30 outline-none"
                        placeholder="+91 …"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4 items-baseline">
                  <div className="col-span-12 md:col-span-2">
                    <p className="font-display text-3xl font-light text-charcoal/30">04.</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-charcoal/60 mt-1">
                      Email
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-10">
                    <input
                      type="email"
                      autoComplete="email"
                      value={customerData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="w-full bg-transparent border-0 border-b border-charcoal/30 focus:border-charcoal rounded-none px-0 py-3 font-display text-xl font-light placeholder:text-charcoal/30 outline-none"
                      placeholder="you@home.com"
                    />
                  </div>
                </div>

                <div className="pt-8 flex flex-col md:flex-row md:items-baseline md:justify-between gap-6 border-t border-charcoal/15">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/50">
                    BIS · MNRE · 500+ projects · zero spam
                  </p>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group inline-flex items-center gap-3 font-display text-3xl md:text-4xl font-light disabled:opacity-50"
                  >
                    <span className="border-b-2 border-energy pb-1 group-hover:border-charcoal transition-colors">
                      {isLoading ? "Searching…" : "Show me the network"}
                    </span>
                    <span aria-hidden className="text-energy">→</span>
                  </button>
                </div>
              </form>
            </div>
          </section>

          <footer className="px-6 md:px-12 lg:px-20 pb-16">
            <div className="mx-auto max-w-screen-xl">
              <FolioStrip left="ATLAS 01 · COVER" right="NESS · CERTIFIED INSTALLERS" />
            </div>
          </footer>
        </div>
      </Layout>
    );
  }

  // ────────────────────── RESULTS / DIRECTORY ──────────────────────
  return (
    <Layout>
      <div className="bg-pearl text-charcoal min-h-screen">
        <section className="px-6 md:px-12 lg:px-20 pt-24">
          <div className="mx-auto max-w-screen-xl">
            <FolioStrip
              left={`THE NETWORK · NEAR ${customerData.pincode}`}
              right={`${installers.length} ENTR${installers.length === 1 ? "Y" : "IES"} FOUND`}
            />

            <div className="grid grid-cols-12 gap-6 pt-12 pb-10">
              <div className="col-span-12 md:col-span-2">
                <button
                  onClick={handleBack}
                  className="font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/60 hover:text-charcoal border-b border-charcoal/30 pb-1"
                >
                  ← New search
                </button>
              </div>
              <div className="col-span-12 md:col-span-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-charcoal/50 mb-6">
                  Directory · sorted by region
                </p>
                <h1 className="font-display font-light leading-[0.9] tracking-tight text-[clamp(2.5rem,7vw,6rem)]">
                  Installers near<br/>
                  <em className="italic text-charcoal/70">{customerData.pincode}.</em>
                </h1>
              </div>
            </div>
          </div>
        </section>

        {installers.length === 0 ? (
          <section className="px-6 md:px-12 lg:px-20 py-24 border-t border-charcoal/15">
            <div className="mx-auto max-w-2xl text-center space-y-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-charcoal/50">
                Footnote · no entries
              </p>
              <h3 className="font-display text-4xl md:text-5xl font-light leading-tight">
                We don't have a partner<br/>
                in <em className="italic text-charcoal/70">{customerData.pincode}</em> yet.
              </h3>
              <p className="text-lg font-light text-charcoal/75 leading-relaxed">
                Try a nearby PIN, or write to us directly — we'll point you to
                the closest certified installer.
              </p>
              <Link
                to="/contact/homeowner"
                className="inline-block font-display text-2xl font-light border-b-2 border-energy pb-1 hover:border-charcoal transition-colors"
              >
                Write to NESS →
              </Link>
            </div>
          </section>
        ) : (
          <section className="px-6 md:px-12 lg:px-20 pb-24">
            <div className="mx-auto max-w-screen-xl space-y-20">
              {(["South", "West", "North", "East"] as const).map((region) => {
                const list = grouped[region];
                if (!list || list.length === 0) return null;
                return (
                  <div key={region} className="border-t border-charcoal/30 pt-8">
                    <div className="grid grid-cols-12 gap-6 mb-8">
                      <div className="col-span-12 md:col-span-3">
                        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/60">
                          Region
                        </p>
                        <p className="font-display text-5xl md:text-6xl font-light leading-none mt-2">
                          {region}
                        </p>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-charcoal/50 mt-3">
                          {list.length} entr{list.length === 1 ? "y" : "ies"}
                        </p>
                      </div>
                    </div>

                    <div className="divide-y divide-charcoal/15 border-t border-charcoal/15">
                      {list.map((inst, idx) => (
                        <article key={inst.id} className="py-10 grid grid-cols-12 gap-6">
                          <div className="col-span-2 md:col-span-1">
                            <p className="font-display text-3xl md:text-4xl font-light text-charcoal/30">
                              {String(idx + 1).padStart(2, "0")}
                            </p>
                          </div>

                          <div className="col-span-10 md:col-span-7 space-y-4">
                            <div>
                              <h3 className="font-display text-3xl md:text-4xl font-light leading-tight">
                                {inst.name}
                              </h3>
                              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-charcoal/60 mt-2">
                                {inst.partnershipLevel} partner · {inst.distance} away
                              </p>
                            </div>
                            <p className="font-mono text-xs leading-relaxed text-charcoal/80">
                              {inst.address}<br/>
                              {inst.city}, {inst.state} — {inst.pincode}
                            </p>
                            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-charcoal/70">
                              <span>
                                <span className="text-charcoal/40">tel · </span>
                                <a href={`tel:${inst.phone}`} className="underline-offset-4 hover:underline">{inst.phone}</a>
                              </span>
                              <span>
                                <span className="text-charcoal/40">email · </span>
                                <a href={`mailto:${inst.email}`} className="underline-offset-4 hover:underline break-all">{inst.email}</a>
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-2 pt-2">
                              {inst.certifications.map((c) => (
                                <span
                                  key={c}
                                  className="font-mono text-[10px] uppercase tracking-[0.2em] border border-charcoal/30 px-2 py-1 text-charcoal/70"
                                >
                                  {c}
                                </span>
                              ))}
                            </div>
                            <p className="font-mono text-[11px] uppercase tracking-widest text-charcoal/50">
                              specialties · {inst.specialties.join(" · ")}
                            </p>
                          </div>

                          <aside className="col-span-12 md:col-span-4 md:pl-6 md:border-l border-charcoal/20 space-y-4 md:text-right">
                            <div>
                              <p className="font-display text-5xl font-light text-energy">{inst.rating}</p>
                              <p className="font-mono text-[10px] uppercase tracking-widest text-charcoal/60">
                                {inst.reviewCount} reviews
                              </p>
                            </div>
                            <div className="flex gap-6 md:justify-end font-mono text-[11px] uppercase tracking-widest text-charcoal/60">
                              <span>{inst.yearsOfExperience} yrs</span>
                              <span>{inst.projectsCompleted} projects</span>
                            </div>
                            <div className="flex gap-4 md:justify-end pt-2">
                              <a
                                href={`tel:${inst.phone}`}
                                className="font-mono text-[11px] uppercase tracking-[0.25em] border-b border-energy pb-1 hover:border-charcoal transition-colors"
                              >
                                Call →
                              </a>
                              <a
                                href={`mailto:${inst.email}`}
                                className="font-mono text-[11px] uppercase tracking-[0.25em] border-b border-charcoal/40 pb-1 hover:border-charcoal transition-colors"
                              >
                                Write →
                              </a>
                              <a
                                href={inst.googleReviewsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-[11px] uppercase tracking-[0.25em] border-b border-charcoal/40 pb-1 hover:border-charcoal transition-colors"
                              >
                                Reviews ↗
                              </a>
                            </div>
                          </aside>
                        </article>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <footer className="px-6 md:px-12 lg:px-20 pb-16">
          <div className="mx-auto max-w-screen-xl">
            <FolioStrip left="END · ATLAS 01" right="NESS · CERTIFIED NETWORK · 2026" />
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default FindInstaller;

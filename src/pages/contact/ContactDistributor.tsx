import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  company: z.string().trim().min(2, "Company name is required").max(120),
  contactName: z.string().trim().min(2, "Contact name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().optional(),
  territories: z.string().trim().min(2, "Tell us which territories you cover").max(300),
  portfolio: z.string().trim().min(2, "Tell us about your current portfolio").max(500),
  volume: z.string().min(1, "Please pick a monthly volume estimate"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000),
  consent: z.boolean().refine((v) => v === true, { message: "You must agree to be contacted" }),
});

type FormData = z.infer<typeof formSchema>;

const volumes = [
  { value: "lt-50", label: "Under 50 units / mo" },
  { value: "50-200", label: "50 – 200 / mo" },
  { value: "200-500", label: "200 – 500 / mo" },
  { value: "500-plus", label: "500+ / mo" },
];

const FolioStrip = ({ left, right }: { left: string; right: string }) => (
  <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/50 py-3 border-y border-charcoal/15">
    <span>{left}</span>
    <span>{right}</span>
  </div>
);

const ContactDistributor = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { consent: false },
  });

  const consent = watch("consent");
  const volume = watch("volume");

  const onSubmit = async (data: FormData) => {
    try {
      const { sendEmail } = await import("@/lib/email-service");
      await sendEmail({
        from_name: data.contactName,
        from_email: data.email,
        from_phone: data.phone || "",
        company: data.company,
        message:
          `Territories: ${data.territories}\n` +
          `Current portfolio: ${data.portfolio}\n` +
          `Monthly volume estimate: ${data.volume}\n\n` +
          data.message,
        form_type: "Distributor Enquiry",
        project_type: "Distribution",
      });
      toast({
        title: "Enquiry sent.",
        description: "Our partnerships team will write back within two business days.",
      });
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      toast({
        title: "Couldn't send",
        description: "Please try again, or write to us directly.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="bg-pearl text-charcoal">
        {/* ─────────────── MASTHEAD ─────────────── */}
        <section className="px-6 md:px-12 lg:px-20 pt-24">
          <div className="mx-auto max-w-screen-xl">
            <FolioStrip
              left="THE WHOLESALE LINE · INDIA"
              right="FORM 04 · DISTRIBUTION ENQUIRY"
            />

            <div className="grid grid-cols-12 gap-6 pt-16 pb-20">
              <div className="col-span-12 md:col-span-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/60">
                  Wholesale<br/>& distribution
                </p>
              </div>
              <div className="col-span-12 md:col-span-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-charcoal/50 mb-6">
                  A note to distributors, regional partners, and B2B resellers
                </p>
                <h1 className="font-display font-light leading-[0.85] tracking-tight text-[clamp(3rem,9vw,8.5rem)]">
                  Distribution<br/>
                  <em className="italic text-charcoal/70">enquiries.</em>
                </h1>
                <div className="mt-12 grid grid-cols-12 gap-6">
                  <p className="col-span-12 md:col-span-7 text-xl md:text-2xl font-light leading-snug text-charcoal/80">
                    We don't add distributors. We pick partners — regional networks
                    already trusted in solar, electrical, and clean energy retail.
                  </p>
                  <aside className="col-span-12 md:col-span-4 md:col-start-9 md:pl-6 md:border-l border-charcoal/20">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/50 mb-3">
                      From the partnerships desk
                    </p>
                    <p className="font-display text-xl italic font-light leading-snug text-charcoal/80">
                      "If a customer can't trust the channel, they won't trust the battery."
                    </p>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────── EDITORIAL OPENING ─────────────── */}
        <section className="px-6 md:px-12 lg:px-20 py-20 border-t border-charcoal/15">
          <div className="mx-auto max-w-screen-xl grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <p className="font-display text-7xl font-light text-charcoal/20 leading-none">01</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-charcoal/60 mt-3">
                The terms<br/>of partnership
              </p>
            </div>
            <div className="col-span-12 md:col-span-9 space-y-6 text-lg md:text-xl font-light leading-relaxed text-charcoal/80">
              <p className="font-display text-3xl md:text-4xl font-light leading-snug text-charcoal">
                Energy storage isn't a SKU. It's a long relationship —
                between a household, an installer, and a brand that has to
                show up for a decade.
              </p>
              <p>
                NESS works with a small set of regional distributors who
                already serve electrical and solar networks across India.
                We're not chasing breadth. We're building a chain where the
                product, the install, and the after-sale all carry the same
                signature.
              </p>
              <p className="italic">
                If that's how you sell, we'd like to hear from you.
              </p>
            </div>
          </div>
        </section>

        <div className="px-6 md:px-12 lg:px-20">
          <div className="mx-auto max-w-screen-xl text-center py-6 text-2xl text-charcoal/30 font-display">❋</div>
        </div>

        {/* ─────────────── TERRITORIES + OFFER ─────────────── */}
        <section className="px-6 md:px-12 lg:px-20 py-20 border-t border-charcoal/15 bg-whisper/40">
          <div className="mx-auto max-w-screen-xl grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <p className="font-display text-7xl font-light text-charcoal/20 leading-none">02</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-charcoal/60 mt-3">
                What we offer<br/>& look for
              </p>
            </div>
            <div className="col-span-12 md:col-span-9 grid md:grid-cols-2 gap-12">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-energy mb-4">
                  i. what you get
                </p>
                <ul className="space-y-5 text-lg font-light leading-snug">
                  {[
                    "Protected territories — one partner per region",
                    "Distributor margins built for honest channel economics",
                    "Marketing co-op funds, regional launch support",
                    "Engineer training & certification, on-site",
                    "Priority on stock allocation during scale-up",
                    "Direct line to product + after-sales engineering",
                  ].map((line, i) => (
                    <li key={line} className="grid grid-cols-12 gap-3">
                      <span className="col-span-1 font-mono text-[10px] uppercase tracking-widest text-charcoal/50 pt-2">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="col-span-11">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-energy mb-4">
                  ii. what we look for
                </p>
                <ul className="space-y-5 text-lg font-light leading-snug">
                  {[
                    "Existing distribution in solar, electrical, or HVAC retail",
                    "Coverage across at least one full state, or a tier-1 metro",
                    "An installer/EPC network already trained or trainable",
                    "After-sales infrastructure — service van, helpline, parts",
                    "A reputation you'd put your family name on",
                  ].map((line, i) => (
                    <li key={line} className="grid grid-cols-12 gap-3">
                      <span className="col-span-1 font-mono text-[10px] uppercase tracking-widest text-charcoal/50 pt-2">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="col-span-11">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────── TERRITORIES STRIP ─────────────── */}
        <section className="px-6 md:px-12 lg:px-20 py-16 border-t border-charcoal/15">
          <div className="mx-auto max-w-screen-xl">
            <FolioStrip left="OPEN TERRITORIES · MAY 2026" right="ONE PARTNER PER REGION" />
            <div className="grid md:grid-cols-4 gap-6 pt-10">
              {[
                { region: "South", note: "Karnataka, Tamil Nadu, Kerala, Telangana, AP" },
                { region: "West", note: "Maharashtra, Gujarat, Goa, MP" },
                { region: "North", note: "Delhi-NCR, Punjab, Haryana, UP, Rajasthan" },
                { region: "East & NE", note: "WB, Odisha, Assam, Bihar, Jharkhand" },
              ].map((t) => (
                <div key={t.region} className="border-t border-charcoal/30 pt-4">
                  <p className="font-display text-3xl font-light">{t.region}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-charcoal/60 mt-2 leading-relaxed">
                    {t.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────── THE LETTER ─────────────── */}
        <section id="contact" className="px-6 md:px-12 lg:px-20 py-24 border-t border-charcoal/15">
          <div className="mx-auto max-w-3xl">
            <FolioStrip left="FORM 04 · DISTRIBUTION ENQUIRY" right="REPLY · WITHIN 2 BIZ DAYS" />

            {!isSubmitted ? (
              <>
                <div className="pt-16 pb-12">
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-charcoal/60 mb-6">
                    Chapter three · write to us
                  </p>
                  <h2 className="font-display text-5xl md:text-7xl font-light leading-[0.9]">
                    Dear NESS,
                  </h2>
                  <p className="mt-8 text-lg md:text-xl font-light italic text-charcoal/75 leading-relaxed max-w-xl">
                    A few lines about your company, your channel, and the markets
                    you'd cover. We read each one.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                  <LetterField n="01." label="Company" error={errors.company?.message}>
                    <input
                      {...register("company")}
                      className="w-full bg-whisper border-0 border-b-2 border-charcoal/50 focus:border-energy rounded-none px-3 py-3 transition-colors font-display text-2xl font-light placeholder:text-charcoal/30 outline-none"
                      placeholder="Your company name"
                    />
                  </LetterField>

                  <div className="grid md:grid-cols-2 gap-12">
                    <LetterField n="02." label="Contact person" error={errors.contactName?.message}>
                      <input
                        {...register("contactName")}
                        className="w-full bg-whisper border-0 border-b-2 border-charcoal/50 focus:border-energy rounded-none px-3 py-3 transition-colors font-display text-xl font-light placeholder:text-charcoal/30 outline-none"
                        placeholder="Your name"
                      />
                    </LetterField>
                    <LetterField n="03." label="Phone — optional" error={undefined}>
                      <input
                        type="tel"
                        {...register("phone")}
                        className="w-full bg-whisper border-0 border-b-2 border-charcoal/50 focus:border-energy rounded-none px-3 py-3 transition-colors font-display text-xl font-light placeholder:text-charcoal/30 outline-none"
                        placeholder="+91 …"
                      />
                    </LetterField>
                  </div>

                  <LetterField n="04." label="Work email" error={errors.email?.message}>
                    <input
                      type="email"
                      {...register("email")}
                      className="w-full bg-whisper border-0 border-b-2 border-charcoal/50 focus:border-energy rounded-none px-3 py-3 transition-colors font-display text-xl font-light placeholder:text-charcoal/30 outline-none"
                      placeholder="you@firm.com"
                    />
                  </LetterField>

                  <LetterField n="05." label="Territories you cover" error={errors.territories?.message}>
                    <input
                      {...register("territories")}
                      className="w-full bg-whisper border-0 border-b-2 border-charcoal/50 focus:border-energy rounded-none px-3 py-3 transition-colors font-light text-lg placeholder:text-charcoal/30 outline-none"
                      placeholder="e.g. Karnataka + TN, or Delhi-NCR"
                    />
                  </LetterField>

                  <LetterField n="06." label="Current portfolio" error={errors.portfolio?.message}>
                    <input
                      {...register("portfolio")}
                      className="w-full bg-whisper border-0 border-b-2 border-charcoal/50 focus:border-energy rounded-none px-3 py-3 transition-colors font-light text-lg placeholder:text-charcoal/30 outline-none"
                      placeholder="brands you distribute, channels you run"
                    />
                  </LetterField>

                  <LetterField n="07." label="Monthly volume estimate" error={errors.volume?.message}>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {volumes.map((v) => {
                        const active = volume === v.value;
                        return (
                          <button
                            key={v.value}
                            type="button"
                            onClick={() => setValue("volume", v.value, { shouldValidate: true })}
                            className={`font-mono text-xs uppercase tracking-[0.2em] px-3 py-2 border transition-colors ${
                              active
                                ? "bg-charcoal text-pearl border-charcoal"
                                : "bg-transparent text-charcoal/70 border-charcoal/30 hover:border-charcoal"
                            }`}
                          >
                            {v.label}
                          </button>
                        );
                      })}
                    </div>
                  </LetterField>

                  <LetterField n="08." label="A short note" error={errors.message?.message}>
                    <textarea
                      {...register("message")}
                      rows={5}
                      className="w-full bg-whisper border-0 border-b-2 border-charcoal/50 focus:border-energy rounded-none px-3 py-3 transition-colors font-light text-lg placeholder:text-charcoal/30 outline-none resize-none leading-relaxed"
                      placeholder="Why your channel? What would you bring to a NESS partnership?"
                    />
                  </LetterField>

                  <div className="flex items-start gap-4 pt-4 border-t border-charcoal/15">
                    <input
                      type="checkbox"
                      id="consent-distributor"
                      checked={consent}
                      onChange={(e) => setValue("consent", e.target.checked, { shouldValidate: true })}
                      className="mt-1 w-4 h-4 accent-charcoal"
                    />
                    <label htmlFor="consent-distributor" className="text-sm font-light text-charcoal/70 leading-relaxed cursor-pointer">
                      I agree to be contacted about distribution opportunities and understand the privacy policy.
                    </label>
                  </div>
                  {errors.consent && (
                    <p className="text-sm text-red-700 -mt-8 font-mono uppercase tracking-wider text-xs" role="alert">{errors.consent.message}</p>
                  )}

                  <div className="pt-8 flex flex-col md:flex-row md:items-baseline md:justify-between gap-6 border-t border-charcoal/15">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/50">
                      Signed, sealed.<br/>
                      Reply within two business days.
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group inline-flex items-center gap-3 font-display text-3xl md:text-4xl font-light disabled:opacity-50"
                    >
                      <span className="border-b-2 border-energy pb-1 group-hover:border-charcoal transition-colors">
                        {isSubmitting ? "Sending…" : "Send this letter"}
                      </span>
                      <span aria-hidden className="text-energy">→</span>
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="py-32 text-center space-y-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-energy">
                  Received · {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                </p>
                <h3 className="font-display text-5xl md:text-7xl font-light leading-[0.95]">
                  Thank you.<br/>
                  <em className="italic text-charcoal/70">Our partnerships<br/>team will write back.</em>
                </h3>
                <p className="text-lg font-light text-charcoal/75 max-w-md mx-auto leading-relaxed">
                  We read every enquiry. If there's a fit, you'll hear from us within
                  two business days.
                </p>
              </div>
            )}
          </div>
        </section>

        <footer className="px-6 md:px-12 lg:px-20 pb-16">
          <div className="mx-auto max-w-screen-xl">
            <FolioStrip left="END · DISTRIBUTION DESK" right="NESS · PARTNERSHIPS · 2026" />
          </div>
        </footer>
      </div>
    </Layout>
  );
};

const LetterField = ({
  n,
  label,
  error,
  children,
}: {
  n: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div className="grid grid-cols-12 gap-4 items-baseline">
    <div className="col-span-12 md:col-span-2">
      <p className="font-display text-3xl font-light text-charcoal/30">{n}</p>
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-charcoal/60 mt-1">{label}</p>
    </div>
    <div className="col-span-12 md:col-span-10">
      {children}
      {error && <p className="mt-2 text-xs text-red-700 font-mono uppercase tracking-wider" role="alert">{error}</p>}
    </div>
  </div>
);

export default ContactDistributor;

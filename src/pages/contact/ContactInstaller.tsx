import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Layout from "@/components/Layout";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import SystemConfigurator from "@/components/SystemConfigurator";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  company: z.string().trim().min(2, "Company name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().optional(),
  projectType: z.string().min(1, "Please select a project type"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to be contacted",
  }),
});

type FormData = z.infer<typeof formSchema>;

const projectTypes = [
  { value: "ci-rooftop", label: "C&I rooftop" },
  { value: "utility-microgrid", label: "Utility / Microgrid" },
  { value: "ev-charging", label: "EV charging hub" },
  { value: "resort-hospitality", label: "Resort / Hospitality" },
  { value: "industrial-backup", label: "Industrial backup" },
  { value: "other", label: "Other" },
];

const Rule = () => <hr className="border-0 border-t border-charcoal/20" />;

const FolioStrip = ({ left, right }: { left: string; right: string }) => (
  <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/50 py-3 border-y border-charcoal/15">
    <span>{left}</span>
    <span>{right}</span>
  </div>
);

const ContactInstaller = () => {
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
  const projectType = watch("projectType");

  const onSubmit = async (data: FormData) => {
    try {
      const { sendEmail } = await import('@/lib/email-service');
      await sendEmail({
        from_name: data.fullName || '',
        from_email: data.email || '',
        from_phone: data.phone || '',
        company: data.company || '',
        message: `Project Type: ${data.projectType}\n\n${data.message}`,
        form_type: 'Installer Contact',
        project_type: data.projectType,
      });
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout className="-mt-16">
      <div className="bg-pearl text-charcoal pt-24">

        {/* ─────────────── MASTHEAD ─────────────── */}
        <section className="px-6 md:px-12 lg:px-20 pt-12">
          <div className="mx-auto max-w-screen-xl">
            <FolioStrip
              left="THE NESS REVIEW · BANGALORE"
              right="ISSUE 04 · FOR INSTALLERS · MAY 2026"
            />

            <div className="grid grid-cols-12 gap-6 pt-16 pb-24">
              <div className="col-span-12 md:col-span-2">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-charcoal/60">
                  Cover<br/>Story
                </p>
              </div>
              <div className="col-span-12 md:col-span-10">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-charcoal/50 mb-6">
                  For EPC Installers · A field letter
                </p>
                <h1 className="font-display font-light leading-[0.85] tracking-tight text-[clamp(3rem,10vw,9rem)]">
                  The easiest<br/>
                  battery you'll<br/>
                  <em className="font-light italic text-charcoal/70">ever install.</em>
                </h1>
                <div className="mt-12 grid grid-cols-12 gap-6 items-end">
                  <p className="col-span-12 md:col-span-7 text-xl md:text-2xl font-light leading-snug text-charcoal/80">
                    Powered by digital intelligence. Built for reliability — without the headaches.
                  </p>
                  <div className="col-span-12 md:col-span-5 font-mono text-[11px] uppercase tracking-[0.25em] text-charcoal/50 md:text-right">
                    Fix it. Forget it.<br/>
                    Powered by digital trust.
                  </div>
                </div>
                <div className="mt-12">
                  <button
                    onClick={scrollToContact}
                    className="group inline-flex items-center gap-3 font-display text-2xl md:text-3xl font-light"
                  >
                    <span className="border-b border-energy pb-1 group-hover:border-charcoal transition-colors">
                      Become a NESS partner
                    </span>
                    <span aria-hidden className="text-energy">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────── CH. 01 — THE PAUSE ─────────────── */}
        <section className="px-6 md:px-12 lg:px-20 py-24 border-t border-charcoal/15">
          <div className="mx-auto max-w-screen-xl grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <p className="font-display text-7xl font-light text-charcoal/20 leading-none">01</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-charcoal/60 mt-3">
                Chapter one<br/>The pause
              </p>
            </div>
            <div className="col-span-12 md:col-span-6">
              <h2 className="font-display text-4xl md:text-5xl font-light leading-tight">
                Every installer<br/>knows this moment.
              </h2>
              <div className="mt-8 space-y-3 text-lg md:text-xl font-light leading-relaxed text-charcoal/80">
                <p>The panels go up smooth.</p>
                <p>The inverter syncs perfectly.</p>
                <p className="italic">Then comes the battery — and the pause.</p>
              </div>
              <p className="mt-10 font-display text-2xl md:text-3xl font-light leading-snug">
                One wrong configuration, and the customer calls never stop.
              </p>
            </div>
            <aside className="col-span-12 md:col-span-3 md:pl-6 md:border-l border-charcoal/20 space-y-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/50">
                Marginalia / the numbers
              </p>
              {[
                { stat: "3 hrs", label: "average troubleshooting per install" },
                { stat: "47%", label: "callbacks that are config-related" },
                { stat: "₹45k", label: "lost per botched commissioning" },
              ].map((m) => (
                <div key={m.label}>
                  <div className="font-display text-4xl font-light">{m.stat}</div>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-charcoal/60 mt-1 leading-snug">
                    {m.label}
                  </div>
                </div>
              ))}
            </aside>
          </div>
        </section>

        <div className="px-6 md:px-12 lg:px-20">
          <div className="mx-auto max-w-screen-xl text-center py-8 text-2xl text-charcoal/30 font-display">⁂</div>
        </div>

        {/* ─────────────── CH. 02 — THE SHIFT ─────────────── */}
        <section className="px-6 md:px-12 lg:px-20 py-24 border-t border-charcoal/15 bg-whisper/40">
          <div className="mx-auto max-w-screen-xl grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <p className="font-display text-7xl font-light text-charcoal/20 leading-none">02</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-charcoal/60 mt-3">
                Chapter two<br/>The shift
              </p>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="font-display text-5xl md:text-7xl font-light leading-[0.95]">
                NESS ends<br/>
                <em className="italic text-charcoal/70">that story.</em>
              </h2>
              <p className="mt-8 text-xl md:text-2xl font-light max-w-xl text-charcoal/80">
                You plug it in, and it just works.
              </p>

              <div className="mt-16 grid md:grid-cols-3 gap-12 md:gap-8">
                {[
                  { n: "i.", title: "Auto-configured", body: "No menus. No calibration. The battery sets itself up in 3 hours." },
                  { n: "ii.", title: "Cloud-verified", body: "Every unit is monitored and validated in real-time from our cloud." },
                  { n: "iii.", title: "Smart support", body: "Predictive alerts catch issues before your customer even notices." },
                ].map((b) => (
                  <div key={b.title} className="space-y-3">
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-energy">{b.n}</p>
                    <h3 className="font-display text-2xl font-light">{b.title}</h3>
                    <p className="text-base font-light leading-relaxed text-charcoal/75">{b.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────── CH. 03 — WHAT YOU GET ─────────────── */}
        <section className="px-6 md:px-12 lg:px-20 py-24 border-t border-charcoal/15">
          <div className="mx-auto max-w-screen-xl">
            <div className="grid grid-cols-12 gap-6 mb-16">
              <div className="col-span-12 md:col-span-3">
                <p className="font-display text-7xl font-light text-charcoal/20 leading-none">03</p>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-charcoal/60 mt-3">
                  Chapter three<br/>What you get
                </p>
              </div>
              <div className="col-span-12 md:col-span-9">
                <h2 className="font-display text-4xl md:text-5xl font-light leading-tight">
                  Why EPCs choose NESS.
                </h2>
                <p className="mt-4 text-lg font-light text-charcoal/70 italic max-w-xl">
                  More than a battery. A partnership that protects your reputation.
                </p>
              </div>
            </div>

            <Rule />

            <div className="divide-y divide-charcoal/15">
              {[
                { stat: "15 min", label: "avg install", title: "Plug & play setup", body: "No hidden menus. No messy calibration." },
                { stat: "94%", label: "satisfaction", title: "Fewer customer calls", body: "Predictable systems, happier clients." },
                { stat: "3×", label: "faster", title: "Faster handovers", body: "Commission, sign off, move on." },
                { stat: "23%", label: "margin boost", title: "Higher margins", body: "Time saved is margin protected." },
              ].map((row, i) => (
                <div key={row.title} className="grid grid-cols-12 gap-6 py-8 items-baseline">
                  <div className="col-span-2 md:col-span-1 font-mono text-xs uppercase tracking-[0.3em] text-charcoal/50">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="col-span-10 md:col-span-5">
                    <h3 className="font-display text-3xl md:text-4xl font-light">{row.title}</h3>
                    <p className="mt-2 text-base font-light text-charcoal/70 max-w-md">{row.body}</p>
                  </div>
                  <div className="col-span-12 md:col-span-6 md:text-right">
                    <span className="font-display text-5xl md:text-6xl font-light text-energy">{row.stat}</span>
                    <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/50">
                      {row.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────── PROOF STRIP ─────────────── */}
        <section className="px-6 md:px-12 lg:px-20 py-12 border-y border-charcoal/15 bg-charcoal text-pearl">
          <div className="mx-auto max-w-screen-xl flex flex-col md:flex-row items-baseline justify-between gap-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-energy">
              Field-proven · footnote
            </p>
            <p className="font-display text-2xl md:text-4xl font-light leading-snug">
              Powering <span className="text-energy">1000+ homes</span> across India
              <span className="text-pearl/60"> — zero diesel, zero downtime.</span>
            </p>
          </div>
        </section>

        {/* ─────────────── CH. 04 — TOOLS ─────────────── */}
        <section className="px-6 md:px-12 lg:px-20 py-24 border-t border-charcoal/15">
          <div className="mx-auto max-w-screen-xl grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <p className="font-display text-7xl font-light text-charcoal/20 leading-none">04</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-charcoal/60 mt-3">
                Chapter four<br/>Tools of the trade
              </p>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="font-display text-4xl md:text-6xl font-light leading-tight">
                The system<br/>configurator.
              </h2>
              <p className="mt-6 text-lg md:text-xl font-light text-charcoal/75 max-w-2xl leading-relaxed">
                Generate accurate system specifications and professional proposals
                in minutes — load pattern analysis, optimal component sizing,
                environmental impact reports, professional documentation.
              </p>

              <div className="mt-10 flex items-baseline gap-6">
                <span className="font-display text-6xl font-light text-energy">2.3</span>
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-charcoal/60">
                  min · average<br/>config time
                </span>
              </div>

              <div className="mt-10">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="group inline-flex items-center gap-3 font-display text-2xl font-light">
                      <span className="border-b border-energy pb-1 group-hover:border-charcoal transition-colors">
                        Launch the configurator
                      </span>
                      <span aria-hidden className="text-energy">→</span>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
                    <SystemConfigurator />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────── BELIEF ─────────────── */}
        <section className="px-6 md:px-12 lg:px-20 py-32 bg-charcoal text-pearl border-t border-charcoal">
          <div className="mx-auto max-w-screen-xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-energy mb-12">
              Editorial · the belief
            </p>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95]">
              India doesn't just<br/>
              need more solar —<br/>
              <em className="italic text-pearl/60">it needs power that<br/>stays trusted.</em>
            </h2>
            <p className="mt-12 max-w-2xl text-xl md:text-2xl font-light text-pearl/80 leading-relaxed">
              You build the future. We keep it running — quietly, continuously, confidently.
            </p>
            <div className="mt-12 flex items-center gap-6">
              <button
                onClick={scrollToContact}
                className="group inline-flex items-center gap-3 font-display text-2xl md:text-3xl font-light"
              >
                <span className="border-b border-energy pb-1 group-hover:border-pearl transition-colors">
                  Become a NESS partner
                </span>
                <span aria-hidden className="text-energy">→</span>
              </button>
            </div>
          </div>
        </section>

        {/* ─────────────── CH. 05 — THE LETTER ─────────────── */}
        <section id="contact" className="px-6 md:px-12 lg:px-20 py-24 bg-pearl">
          <div className="mx-auto max-w-3xl">
            <FolioStrip left="FORM 03 · INSTALLER ENQUIRY" right="REPLY WITHIN 24 HRS" />

            {!isSubmitted ? (
              <>
                <div className="pt-16 pb-12">
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-charcoal/60 mb-6">
                    Chapter five · write to us
                  </p>
                  <h2 className="font-display text-5xl md:text-7xl font-light leading-[0.9]">
                    Dear NESS,
                  </h2>
                  <p className="mt-8 text-lg md:text-xl font-light italic text-charcoal/75 leading-relaxed">
                    Tell us about your project. We'll simplify the storage —
                    and protect your margins.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                  <LetterField
                    n="01."
                    label="Full name"
                    error={errors.fullName?.message}
                  >
                    <input
                      type="text"
                      {...register("fullName")}
                      className="w-full bg-whisper border-0 border-b-2 border-charcoal/50 focus:border-energy focus:ring-0 rounded-none px-3 py-3 transition-colors font-display text-2xl font-light placeholder:text-charcoal/30 outline-none"
                      placeholder="Your full name"
                    />
                  </LetterField>

                  <LetterField
                    n="02."
                    label="Company"
                    error={errors.company?.message}
                  >
                    <input
                      type="text"
                      {...register("company")}
                      className="w-full bg-whisper border-0 border-b-2 border-charcoal/50 focus:border-energy focus:ring-0 rounded-none px-3 py-3 transition-colors font-display text-2xl font-light placeholder:text-charcoal/30 outline-none"
                      placeholder="Your firm"
                    />
                  </LetterField>

                  <div className="grid md:grid-cols-2 gap-12">
                    <LetterField n="03." label="Work email" error={errors.email?.message}>
                      <input
                        type="email"
                        {...register("email")}
                        className="w-full bg-whisper border-0 border-b-2 border-charcoal/50 focus:border-energy focus:ring-0 rounded-none px-3 py-3 transition-colors font-display text-xl font-light placeholder:text-charcoal/30 outline-none"
                        placeholder="you@firm.com"
                      />
                    </LetterField>

                    <LetterField n="04." label="Phone — optional" error={undefined}>
                      <input
                        type="tel"
                        {...register("phone")}
                        className="w-full bg-whisper border-0 border-b-2 border-charcoal/50 focus:border-energy focus:ring-0 rounded-none px-3 py-3 transition-colors font-display text-xl font-light placeholder:text-charcoal/30 outline-none"
                        placeholder="+91 …"
                      />
                    </LetterField>
                  </div>

                  <LetterField n="05." label="Project type" error={errors.projectType?.message}>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {projectTypes.map((p) => {
                        const active = projectType === p.value;
                        return (
                          <button
                            key={p.value}
                            type="button"
                            onClick={() => setValue("projectType", p.value, { shouldValidate: true })}
                            className={`font-mono text-xs uppercase tracking-[0.2em] px-3 py-2 border transition-colors ${
                              active
                                ? "bg-charcoal text-pearl border-charcoal"
                                : "bg-transparent text-charcoal/70 border-charcoal/30 hover:border-charcoal"
                            }`}
                          >
                            {p.label}
                          </button>
                        );
                      })}
                    </div>
                  </LetterField>

                  <LetterField n="06." label="Your message" error={errors.message?.message}>
                    <textarea
                      {...register("message")}
                      rows={5}
                      className="w-full bg-whisper border-0 border-b-2 border-charcoal/50 focus:border-energy focus:ring-0 rounded-none px-3 py-3 transition-colors font-light text-lg placeholder:text-charcoal/30 outline-none resize-none leading-relaxed"
                      placeholder="Tell us where you're installing, what you're building, what's slowing you down…"
                    />
                  </LetterField>

                  <div className="flex items-start gap-4 pt-4 border-t border-charcoal/15">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={consent}
                      onChange={(e) => setValue("consent", e.target.checked, { shouldValidate: true })}
                      className="mt-1 w-4 h-4 accent-charcoal"
                    />
                    <label htmlFor="consent" className="text-sm font-light text-charcoal/70 leading-relaxed cursor-pointer">
                      I agree to be contacted about NESS solutions and understand the privacy policy.
                    </label>
                  </div>
                  {errors.consent && (
                    <p className="text-sm text-red-700 -mt-8" role="alert">{errors.consent.message}</p>
                  )}

                  <div className="pt-8 flex flex-col md:flex-row md:items-baseline md:justify-between gap-6 border-t border-charcoal/15">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/50">
                      Signed, sealed.<br/>Reply within 24 hrs · usually faster.
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
                  <em className="italic text-charcoal/70">We'll write back.</em>
                </h3>
                <p className="text-lg font-light text-charcoal/75 max-w-md mx-auto leading-relaxed">
                  We'll reach out within one business day. Meanwhile, check your inbox
                  for a quick commissioning checklist.
                </p>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="font-mono text-xs uppercase tracking-[0.3em] text-charcoal/60 hover:text-charcoal border-b border-charcoal/30 pb-1"
                >
                  ← Back to top
                </button>
              </div>
            )}
          </div>
        </section>

        <footer className="px-6 md:px-12 lg:px-20 pb-16">
          <div className="mx-auto max-w-screen-xl">
            <FolioStrip left="END · INSTALLER ISSUE" right="NESS · POWERED BY DIGITAL TRUST" />
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
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-charcoal/60 mt-1">
        {label}
      </p>
    </div>
    <div className="col-span-12 md:col-span-10">
      {children}
      {error && <p className="mt-2 text-xs text-red-700 font-mono uppercase tracking-wider" role="alert">{error}</p>}
    </div>
  </div>
);

export default ContactInstaller;

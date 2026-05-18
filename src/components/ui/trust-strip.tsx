/* ─────────────────────────────────────────────────────────────────────────
   TrustStrip — single canonical trust signature for the site.

   Findings from the Apple-VP review surfaced that the same 4 signals were
   rendered in three different formats across the site (compressed bar on
   home, 4-up badge grid on Section 4, inline pills on /homeowners). This
   component is the one shape. Drop it under the hero on any product page.

   The signals are deliberately ordered: rating first (social), then a
   certification (technical), then a tested fact (consequence), then a
   warranty (commitment). Customer's emotional path through them is:
   trust the people -> trust the tech -> trust the outcome -> trust us.
   ───────────────────────────────────────────────────────────────────── */

import { Star, Shield, Thermometer, Award } from "lucide-react";

const SIGNALS = [
  { icon: Star,        label: "4.9 / 5",          sub: "from 500+ homes" },
  { icon: Shield,      label: "IEC 62619",        sub: "certified" },
  { icon: Thermometer, label: "Tested at 45°C",   sub: "Indian summers" },
  { icon: Award,       label: "10-year",          sub: "full warranty" },
] as const;

interface TrustStripProps {
  /** Dark = pearl text on charcoal; light = charcoal text on pearl */
  variant?: "dark" | "light";
  className?: string;
}

export function TrustStrip({ variant = "dark", className = "" }: TrustStripProps) {
  const isDark = variant === "dark";
  const textPri = isDark ? "text-pearl" : "text-charcoal";
  const textSec = isDark ? "text-pearl/45" : "text-charcoal/55";
  const accent  = "text-energy";
  const divider = isDark ? "border-pearl/8" : "border-charcoal/10";
  const bg      = isDark ? "bg-charcoal" : "bg-whisper";

  return (
    <section
      className={`${bg} border-y ${divider} ${className}`}
      aria-label="Trust signals"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-6 sm:py-7">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {SIGNALS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex items-center gap-3">
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${accent} flex-shrink-0`} aria-hidden="true" />
                <div className="min-w-0">
                  <p className={`font-display font-semibold text-sm sm:text-base ${textPri} leading-tight truncate`}>
                    {s.label}
                  </p>
                  <p className={`text-[11px] sm:text-xs font-light ${textSec} leading-tight truncate uppercase tracking-wide`}>
                    {s.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TrustStrip;

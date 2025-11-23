import { useState } from "react";
import { Shield, Zap, Brain, Sparkles } from "lucide-react";

const features = [{
  icon: Shield,
  title: "Safety by Design",
  shortDesc: "LFP chemistry with thermal protection",
  fullDesc: "Advanced BMS ensures highest safety standards with thermal runaway protection and fire-resistant design for complete peace of mind.",
  benefit: "Zero fire incidents in 50,000+ installations",
  metric: "99.9%",
  metricLabel: "Safety Rating"
}, {
  icon: Zap,
  title: "Reliability That Lasts",
  shortDesc: "10 year+ design life with premium components",
  fullDesc: "Rigorous testing and premium components ensure consistent performance in Indian conditions with industry-leading longevity.",
  benefit: "Tested in 45°C+ Indian summers",
  metric: "10+",
  metricLabel: "Year Warranty"
}, {
  icon: Brain,
  title: "Intelligence Built-In",
  shortDesc: "Smart energy management & monitoring",
  fullDesc: "ToD optimization, solar prioritization, and cloud-based monitoring provide intelligent energy management and control.",
  benefit: "Save up to 40% on electricity bills",
  metric: "40%",
  metricLabel: "Bill Reduction"
}, {
  icon: Sparkles,
  title: "Beautifully Simple",
  shortDesc: "Clean design with whisper-quiet operation",
  fullDesc: "Minimalist design complements modern homes with silent operation and seamless integration into any space.",
  benefit: "Quieter than a whisper at <35dB",
  metric: "<35dB",
  metricLabel: "Noise Level"
}];

export function WhyNess() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  return (
    <div className="max-w-[1400px] mx-auto px-8">
      <div className="text-center mb-24">
        <h2 className="text-5xl lg:text-6xl font-light mb-8 tracking-tight text-foreground">
          Why choose <span className="font-medium text-primary">NESS</span>?
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
          Four pillars of excellence that make NESS the premium choice for energy storage.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
        {features.map((feature) => {
          const featureIndex = features.indexOf(feature);
          return (
          <div key={feature.title} className={`group relative bg-card backdrop-blur-xl border border-border rounded-3xl p-8 cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${selectedCard === featureIndex ? "shadow-2xl scale-[1.02] border-primary/20" : ""}`} onClick={() => setSelectedCard(selectedCard === featureIndex ? null : featureIndex)}>
            <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-all duration-500">
              <feature.icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors duration-500" />
            </div>

            <h3 className="text-2xl font-medium text-foreground mb-4 tracking-tight">{feature.title}</h3>

            <p className="text-muted-foreground leading-relaxed mb-8 font-light">{feature.shortDesc}</p>

            <div className="mb-8">
              <div className="text-4xl font-light text-primary mb-2 tracking-tight">{feature.metric}</div>
              <div className="text-sm text-muted-foreground/60 font-medium uppercase tracking-wide">
                {feature.metricLabel}
              </div>
            </div>

            <div className="text-sm text-muted-foreground mb-8 font-medium">{feature.benefit}</div>

            {selectedCard === featureIndex && <div className="border-t border-border pt-8 mt-8 animate-fade-in">
                <p className="text-muted-foreground leading-relaxed mb-6 font-light">{feature.fullDesc}</p>
              </div>}

            <div className="absolute bottom-6 right-6">
              <div className={`w-2 h-2 rounded-full transition-all duration-500 ${selectedCard === featureIndex ? "bg-primary scale-150" : "bg-border group-hover:bg-primary"}`} />
            </div>
          </div>
        );
        })}
      </div>

      {/* <LuxuryManufacturingShowcase /> */}
    </div>
  );
}
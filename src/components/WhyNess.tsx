import { useState, useEffect } from "react";
import { Shield, Zap, Brain, Sparkles, ArrowRight } from "lucide-react";
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
const STEPS = [{
  key: "measure",
  label: "Measure",
  title: "Precision Testing"
}, {
  key: "grade",
  label: "Grade",
  title: "Quality Sorting"
}, {
  key: "group",
  label: "Group",
  title: "Perfect Matching"
}, {
  key: "assemble",
  label: "Assemble",
  title: "Expert Assembly"
}, {
  key: "qualify",
  label: "Qualify",
  title: "Final Validation"
}, {
  key: "digitalShield",
  label: "Digital Shield",
  title: "Smart Protection"
}, {
  key: "customer",
  label: "Customer",
  title: "Premium Experience"
}];
const MANUFACTURING_STORY = {
  home: {
    tagline: "Crafted for perfection. Built for life.",
    steps: ["Every cell undergoes precision measurement to ensure optimal performance from day one.", "Cells are meticulously graded and sorted for perfect compatibility and longevity.", "Matched cells are grouped into balanced teams for consistent, reliable power delivery.", "Expert assembly in temperature-controlled environments ensures premium quality.", "Rigorous validation testing guarantees only the finest systems reach your home.", "Advanced digital intelligence provides continuous monitoring and protection.", "Delivered as a complete premium experience, engineered for your peace of mind."]
  }
};

function LuxuryStepIndicator({
  step,
  index,
  isActive,
  onClick
}: {
  step: any; // TODO: Define proper step type
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return <button onClick={onClick} className="group relative focus:outline-none hover:scale-105 active:scale-95 transition-transform duration-300">
      <div className={`
          w-20 h-20 rounded-2xl border backdrop-blur-xl
          flex items-center justify-center relative overflow-hidden
          transition-all duration-700 ease-out
          ${isActive ? "bg-card/95 border-border shadow-lg -translate-y-0.5" : "bg-card/60 border-border/40 hover:bg-card/80"}
        `}>
        <StepIcon name={step.key} active={isActive} />

        {isActive && <div className="absolute bottom-2 w-1 h-1 rounded-full bg-primary animate-pulse" />}
      </div>

      <div className="mt-3 text-center">
        <div className={`text-sm font-medium transition-colors duration-300 ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
          {step.label}
        </div>
      </div>
    </button>;
}
function StepIcon({
  name,
  active,
  color
}: {
  name: string;
  active: boolean;
  color?: string;
}) {
  const strokeWidth = 1.5;
  const iconProps = {
    width: "32",
    height: "32",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const
  };
  switch (name) {
    case "measure":
      return <svg {...iconProps}>
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
          <circle cx="11" cy="11" r="3" />
        </svg>;
    case "grade":
      return <svg {...iconProps}>
          <path d="M3 6h18" />
          <path d="M3 12h18" />
          <path d="M3 18h18" />
          <circle cx="9" cy="6" r="1" />
          <circle cx="15" cy="12" r="1" />
          <circle cx="12" cy="18" r="1" />
        </svg>;
    case "group":
      return <svg {...iconProps}>
          <circle cx="9" cy="12" r="3" />
          <circle cx="15" cy="12" r="3" />
          <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        </svg>;
    case "assemble":
      return <svg {...iconProps}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>;
    case "qualify":
      return <svg {...iconProps}>
          <path d="M9 12l2 2 4-4" />
          <circle cx="12" cy="12" r="9" />
        </svg>;
    case "digitalShield":
      return <svg {...iconProps}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <circle cx="12" cy="11" r="1" />
        </svg>;
    case "customer":
      return <svg {...iconProps}>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>;
    default:
      return null;
  }
}
function LuxuryProgressRail({
  activeStep,
  totalSteps,
  onStepChange
}: {
  activeStep: number;
  totalSteps: number;
  onStepChange: (step: number) => void;
}) {
  const progress = activeStep / (totalSteps - 1);
  return <div className="relative mt-12 mb-8">
        <div className="h-1 bg-muted rounded-full overflow-hidden cursor-pointer" onClick={e => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const newStep = Math.round(x / rect.width * (totalSteps - 1));
      onStepChange(newStep);
    }}>
        <div className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-800 ease-out" style={{
        width: `${Math.max(8, progress * 100)}%`
      }} />
      </div>

      {/* Step markers */}
      <div className="absolute top-0 left-0 right-0 flex justify-between">
        {Array.from({
        length: totalSteps
      }).map((_, stepIdx) => <div key={stepIdx} className={`w-1 h-1 rounded-full transition-all duration-300 ${stepIdx <= activeStep ? "bg-primary scale-150" : "bg-muted"} ${stepIdx === activeStep ? "scale-150" : ""}`} />)}
      </div>
    </div>;
}
function LuxuryManufacturingShowcase() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % STEPS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying]);
  const currentStep = STEPS[activeStep];
  const currentStory = MANUFACTURING_STORY.home.steps[activeStep];
  return;
}
function getStepImportance(stepIndex: number): string {
  const importance = ["Without precise measurement, batteries would be unreliable and potentially dangerous. We test every single cell.", "Mismatched cells cause premature failure. Our grading ensures only compatible cells work together.", "Perfect grouping means balanced performance and maximum lifespan for your investment.", "Expert assembly in controlled conditions prevents defects that could appear years later.", "Final validation catches any issues before they reach your home, ensuring zero surprises.", "Digital intelligence provides 24/7 monitoring and protection, like having an engineer on-site.", "Every system is delivered as a complete premium experience, not just a product."];
  return importance[stepIndex] || "";
}
export function WhyNess() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  return <div className="max-w-[1400px] mx-auto px-8">
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
    </div>;
}
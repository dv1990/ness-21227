import { memo } from "react";
import { cn } from "@/lib/utils";

interface GradientOrbProps {
  /** CSS position values */
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  /** Size in pixels — auto-shrinks on mobile */
  size?: number;
  /** Color preset */
  color?: "energy" | "amber" | "blue";
  /** Opacity multiplier 0-1 */
  intensity?: number;
  /** Animation delay in seconds */
  delay?: number;
  className?: string;
}

const COLOR_MAP = {
  energy: "151, 100%, 45%",
  amber: "33, 100%, 65%",
  blue: "210, 50%, 50%",
};

export const GradientOrb = memo(function GradientOrb({
  top,
  left,
  right,
  bottom,
  size = 600,
  color = "energy",
  intensity = 1,
  delay = 0,
  className,
}: GradientOrbProps) {
  const hsl = COLOR_MAP[color];
  const opacity = 0.07 * intensity;
  // Mobile: 50% size
  const mobileSize = Math.round(size * 0.5);

  return (
    <div
      className={cn(
        "absolute rounded-full pointer-events-none",
        "animate-orb-drift motion-reduce:animate-none",
        className,
      )}
      style={{
        top, left, right, bottom,
        width: `min(${size}px, 80vw)`,
        height: `min(${size}px, 80vw)`,
        background: `radial-gradient(circle, hsla(${hsl}, ${opacity}), transparent 70%)`,
        filter: `blur(min(80px, 12vw))`,
        animationDelay: `${delay}s`,
      }}
      aria-hidden="true"
    />
  );
});

/**
 * Pre-configured orb fields for dark sections.
 */
export const GradientOrbField = memo(function GradientOrbField({
  variant = "standard",
  className,
}: {
  variant?: "standard" | "intense" | "warm";
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)} aria-hidden="true">
      {variant === "warm" && (
        <>
          <GradientOrb top="-10%" left="-5%" color="energy" intensity={0.8} delay={0} />
          <GradientOrb bottom="-15%" right="-10%" color="amber" intensity={0.5} delay={7} size={500} />
        </>
      )}
      {variant === "intense" && (
        <>
          <GradientOrb top="-15%" left="-10%" color="energy" intensity={1.2} delay={0} size={700} />
          <GradientOrb bottom="-20%" right="-5%" color="energy" intensity={1} delay={5} />
          <GradientOrb top="30%" right="20%" color="amber" intensity={0.4} delay={12} size={400} />
        </>
      )}
      {variant === "standard" && (
        <>
          <GradientOrb top="-10%" left="-5%" color="energy" intensity={0.8} delay={0} />
          <GradientOrb bottom="-10%" right="-10%" color="energy" intensity={0.6} delay={8} size={500} />
          <GradientOrb top="40%" left="60%" color="amber" intensity={0.3} delay={14} size={400} />
        </>
      )}
    </div>
  );
});

export default GradientOrb;

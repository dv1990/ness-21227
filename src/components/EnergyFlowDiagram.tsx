import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sun, Home, Zap, Wifi } from "lucide-react";

/* SVG viewBox: 0 0 900 400
   Nodes:
     Solar panel  — (140, 200)
     NESS Battery — (450, 200)
     Home         — (760, 200)
   Curved paths connect them via SVG cubic bezier.
*/

const PATH_SOLAR_TO_BATT = "M 190,200 C 290,140 350,140 410,200";
const PATH_BATT_TO_HOME  = "M 490,200 C 550,140 630,140 710,200";

const PARTICLE_COUNT = 4;

function Particles({ pathId, delay = 0, color }: { pathId: string; delay?: number; color: string }) {
  return (
    <>
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <circle key={i} r="4" fill={color} opacity="0.9">
          <animateMotion
            dur="2.4s"
            repeatCount="indefinite"
            begin={`${delay + (i * 2.4) / PARTICLE_COUNT}s`}
            calcMode="linear"
          >
            <mpath href={`#${pathId}`} />
          </animateMotion>
        </circle>
      ))}
    </>
  );
}

function PathLine({ id, d, active }: { id: string; d: string; active: boolean }) {
  return (
    <>
      {/* Track */}
      <path
        id={id}
        d={d}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Animated draw */}
      <motion.path
        d={d}
        fill="none"
        stroke="hsl(142 69% 58%)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1"
        strokeDashoffset="1"
        pathLength={1}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={active ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </>
  );
}

interface NodeProps {
  cx: number;
  cy: number;
  icon: React.ElementType;
  label: string;
  sublabel: string;
  active: boolean;
  delay: number;
  accent?: boolean;
}

function DiagramNode({ cx, cy, icon: Icon, label, sublabel, active, delay, accent }: NodeProps) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.8 }}
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay, ease: "backOut" }}
      style={{ originX: `${cx}px`, originY: `${cy}px` }}
    >
      {/* Outer glow ring */}
      {accent && (
        <circle
          cx={cx}
          cy={cy}
          r="56"
          fill="none"
          stroke="hsl(142 69% 58%)"
          strokeWidth="1"
          opacity="0.2"
        />
      )}
      {/* Node circle */}
      <circle
        cx={cx}
        cy={cy}
        r="44"
        fill={accent ? "hsl(142 69% 58% / 0.12)" : "rgba(255,255,255,0.04)"}
        stroke={accent ? "hsl(142 69% 58% / 0.35)" : "rgba(255,255,255,0.10)"}
        strokeWidth="1.5"
      />
      {/* Render icon via foreignObject — clean approach */}
      <foreignObject x={cx - 16} y={cy - 16} width="32" height="32">
        <div
          style={{
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: accent ? "hsl(142 69% 58%)" : "rgba(255,255,255,0.55)",
          }}
        >
          <Icon size={22} />
        </div>
      </foreignObject>
      {/* Label */}
      <text
        x={cx}
        y={cy + 66}
        textAnchor="middle"
        fill="rgba(255,255,255,0.80)"
        fontSize="13"
        fontFamily="Outfit, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.02em"
      >
        {label}
      </text>
      <text
        x={cx}
        y={cy + 84}
        textAnchor="middle"
        fill="rgba(255,255,255,0.30)"
        fontSize="11"
        fontFamily="Outfit, system-ui, sans-serif"
        fontWeight="300"
      >
        {sublabel}
      </text>
    </motion.g>
  );
}

interface FlowLabelProps {
  x: number;
  y: number;
  text: string;
  active: boolean;
  delay: number;
}

function FlowLabel({ x, y, text, active, delay }: FlowLabelProps) {
  return (
    <motion.text
      x={x}
      y={y}
      textAnchor="middle"
      fill="hsl(142 69% 58%)"
      fontSize="10"
      fontFamily="Outfit, system-ui, sans-serif"
      fontWeight="500"
      letterSpacing="0.12em"
      initial={{ opacity: 0 }}
      animate={active ? { opacity: 0.7 } : { opacity: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      {text}
    </motion.text>
  );
}

const EnergyFlowDiagram = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      className="relative py-24 sm:py-32 md:py-40 bg-charcoal overflow-hidden"
      aria-label="How NESS energy storage works"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 60%, hsl(142 69% 58% / 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-energy text-xs sm:text-sm uppercase tracking-[0.2em] mb-4">
            How it works
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-pearl tracking-[-0.03em] leading-[1.05]">
            Sunlight to{" "}
            <span className="text-gradient-energy">freedom</span>
          </h2>
          <p className="text-pearl/40 text-lg font-light mt-6 max-w-xl mx-auto leading-relaxed">
            Solar charges your NESS battery during the day. You draw clean,
            stored energy at night — the grid optional.
          </p>
        </motion.div>

        {/* SVG Diagram */}
        <div ref={ref} className="w-full">
          <svg
            viewBox="0 0 900 340"
            className="w-full max-w-3xl mx-auto"
            aria-hidden="true"
            style={{ overflow: "visible" }}
          >
            {/* Paths (track + animated draw) */}
            <PathLine id="solar-to-batt" d={PATH_SOLAR_TO_BATT} active={inView} />
            <PathLine id="batt-to-home"  d={PATH_BATT_TO_HOME}  active={inView} />

            {/* Particles (SVG animateMotion — GPU-composited) */}
            {inView && (
              <>
                <Particles pathId="solar-to-batt" delay={1.2} color="hsl(142 69% 58%)" />
                <Particles pathId="batt-to-home"  delay={1.6} color="hsl(142 69% 58%)" />
              </>
            )}

            {/* Flow labels */}
            <FlowLabel x={300} y={148} text="SOLAR CHARGE" active={inView} delay={1.4} />
            <FlowLabel x={620} y={148} text="CLEAN POWER"  active={inView} delay={1.8} />

            {/* Nodes */}
            <DiagramNode
              cx={140} cy={200}
              icon={Sun}
              label="Solar Panels"
              sublabel="100% compatible"
              active={inView}
              delay={0.1}
            />
            <DiagramNode
              cx={450} cy={200}
              icon={Zap}
              label="NESS Battery"
              sublabel="Stores every watt"
              active={inView}
              delay={0.4}
              accent
            />
            <DiagramNode
              cx={760} cy={200}
              icon={Home}
              label="Your Home"
              sublabel="24/7 clean energy"
              active={inView}
              delay={0.7}
            />
          </svg>
        </div>

        {/* Bottom stat pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-16"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 2 }}
        >
          {[
            { icon: Zap,  label: "10ms switchover — seamless" },
            { icon: Sun,  label: "Solar-first logic built in" },
            { icon: Wifi, label: "Remote monitoring 24/7" },
          ].map((pill) => (
            <div
              key={pill.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-pearl/10 bg-pearl/[0.04] text-pearl/50 text-xs sm:text-sm font-light"
            >
              <pill.icon className="w-3.5 h-3.5 text-energy flex-shrink-0" />
              {pill.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EnergyFlowDiagram;

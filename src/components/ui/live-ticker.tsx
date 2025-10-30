import React, { useEffect, useState, useRef } from 'react';
import { AnimatedCounter } from './animated-counter';

interface LiveTickerProps {
  label: string;
  startValue: number;
  incrementRate: number; // how much to add per second
  suffix?: string;
  prefix?: string;
  decimals?: number;
  humanMessage?: string;
  className?: string;
}

export const LiveTicker: React.FC<LiveTickerProps> = ({
  label,
  startValue,
  incrementRate,
  suffix = '',
  prefix = '',
  decimals = 0,
  humanMessage,
  className = ''
}) => {
  const [value, setValue] = useState(startValue);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsedSeconds = (Date.now() - startTimeRef.current) / 1000;
      const newValue = startValue + (incrementRate * elapsedSeconds);
      setValue(newValue);
    }, 100); // Update every 100ms for smooth animation

    return () => clearInterval(interval);
  }, [startValue, incrementRate]);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="space-y-2">
        <div className="text-6xl md:text-7xl font-light text-primary tabular-nums">
          {prefix}
          <AnimatedCounter 
            value={value} 
            duration={100} 
            decimals={decimals}
          />
          {suffix}
        </div>
        <div className="text-caption text-muted-foreground uppercase tracking-[0.08em]">
          {label}
        </div>
      </div>
      
      {humanMessage && (
        <p className="text-sm text-muted-foreground/70 italic leading-relaxed max-w-xs">
          {humanMessage}
        </p>
      )}
    </div>
  );
};

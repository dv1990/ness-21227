import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

// Apple-style magnetic button with subtle animations
export const MagneticButton = ({ 
  children, 
  variant = "primary",
  size = "default",
  onClick,
  className = ""
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "lg";
  onClick?: () => void;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const baseClasses = "group relative overflow-hidden transition-all duration-300 ease-out";
  const variantClasses = {
    primary: "bg-foreground text-background hover:bg-foreground/90 hover:scale-105 hover:shadow-2xl",
    secondary: "border-2 border-foreground/10 text-foreground hover:border-foreground/30 hover:bg-foreground/5",
    ghost: "text-muted-foreground hover:text-foreground"
  };
  const sizeClasses = {
    default: "px-8 py-4 rounded-full text-base font-medium",
    lg: "px-12 py-6 rounded-full text-lg font-medium"
  };

  return (
    <Button 
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <span className={`relative z-10 transition-transform duration-300 ${isHovered ? 'translate-x-[-2px]' : ''}`}>
        {children}
      </span>
      {variant === "ghost" && (
        <ArrowRight className={`w-4 h-4 ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
      )}
      
      {/* Subtle shine effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 transition-transform duration-700 ${isHovered ? 'translate-x-full' : '-translate-x-full'}`} />
    </Button>
  );
};

// Apple-style play button with ripple effect
export const PlayButton = ({ 
  onClick, 
  label = "Watch the film",
  size = "default"
}: {
  onClick?: () => void;
  label?: string;
  size?: "default" | "lg";
}) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 1000);
    
    onClick?.();
  };

  return (
    <button 
      className="group relative inline-flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors duration-300 overflow-hidden"
      onClick={createRipple}
    >
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute w-20 h-20 bg-primary/20 rounded-full animate-ping"
          style={{ left: ripple.x, top: ripple.y }}
        />
      ))}
      
      <div className="relative w-12 h-12 rounded-full border border-muted-foreground/20 flex items-center justify-center group-hover:border-foreground/40 group-hover:scale-105 transition-all duration-300">
        <Play className="w-5 h-5 ml-0.5 group-hover:scale-110 transition-transform" />
      </div>
      <span className="font-light relative">{label}</span>
    </button>
  );
};

// Apple-style floating card with parallax
export const FloatingCard = ({ 
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`
        bg-background/95 backdrop-blur-xl border border-muted-foreground/10 rounded-2xl
        transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}
        hover:scale-105 hover:shadow-xl hover:-translate-y-2
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// Apple-style progressive disclosure
export const ProgressiveDisclosure = ({ 
  trigger, 
  content,
  className = ""
}: {
  trigger: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`space-y-6 ${className}`}>
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="group flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors duration-300"
      >
        {trigger}
        <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
      </button>
      
      <div className={`
        overflow-hidden transition-all duration-500 ease-out
        ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
      `}>
        <div className="pt-4 border-t border-border/20">
          {content}
        </div>
      </div>
    </div>
  );
};

// Apple-style floating element with smooth parallax
export const FloatingElement = ({ 
  children,
  direction = "up",
  speed = 1,
  delay = 0,
  className = ""
}: {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  speed?: number;
  delay?: number;
  className?: string;
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 100);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [delay]);

  const getTransform = () => {
    const parallaxOffset = scrollY * (speed * 0.1);
    const directionMap = {
      up: `translateY(${-parallaxOffset}px)`,
      down: `translateY(${parallaxOffset}px)`,
      left: `translateX(${-parallaxOffset}px)`,
      right: `translateX(${parallaxOffset}px)`
    };
    return directionMap[direction];
  };

  return (
    <div 
      className={`transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'} ${className}`}
      style={{ transform: getTransform() }}
    >
      {children}
    </div>
  );
};

// Apple-style parallax container
export const ParallaxContainer = ({ 
  children,
  speed = 0.5,
  className = ""
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`relative ${className}`}
      style={{ transform: `translateY(${scrollY * speed}px)` }}
    >
      {children}
    </div>
  );
};

export default {
  MagneticButton,
  PlayButton,
  FloatingCard,
  ProgressiveDisclosure,
  FloatingElement,
  ParallaxContainer
};
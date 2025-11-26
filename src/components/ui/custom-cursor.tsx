import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let rafId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const updateCursor = () => {
      // Smooth follow with lerp
      currentX = lerp(currentX, targetX, 0.15);
      currentY = lerp(currentY, targetY, 0.15);
      
      setPosition({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setIsVisible(true);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, .interactive');
      setIsHovering(!!isInteractive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Start animation loop
    rafId = requestAnimationFrame(updateCursor);

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseenter', handleMouseEnter as any, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    
    // Track hover on interactive elements
    document.addEventListener('mouseover', handleMouseEnter as any, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter as any);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter as any);
    };
  }, []);

  // Hide on mobile/touch devices
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        className={cn(
          'fixed pointer-events-none z-[9999] mix-blend-difference transition-all duration-150 ease-out',
          isVisible ? 'opacity-100' : 'opacity-0',
          isClicking ? 'scale-75' : 'scale-100'
        )}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform, opacity',
        }}
      >
        <div
          className={cn(
            'w-2 h-2 rounded-full bg-pearl transition-all duration-200',
            isHovering && 'scale-150 bg-energy'
          )}
        />
      </div>

      {/* Cursor ring */}
      <div
        className={cn(
          'fixed pointer-events-none z-[9998] transition-all duration-300 ease-out',
          isVisible ? 'opacity-100' : 'opacity-0',
          isClicking ? 'scale-75' : 'scale-100'
        )}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform, opacity',
        }}
      >
        <div
          className={cn(
            'w-10 h-10 rounded-full border border-pearl/30 transition-all duration-200',
            isHovering && 'w-14 h-14 border-energy/50'
          )}
        />
      </div>
    </>
  );
};

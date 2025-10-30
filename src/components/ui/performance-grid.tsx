import React, { useMemo } from 'react';

interface PerformanceGridProps {
  rows?: number;
  cols?: number;
  className?: string;
}

const PerformanceGrid: React.FC<PerformanceGridProps> = ({ 
  rows = 12, 
  cols = 12, 
  className = "opacity-5" 
}) => {
  // Memoize the grid generation to prevent re-creation on every render
  const gridItems = useMemo(() => {
    const totalItems = rows * cols;
    return Array.from({ length: totalItems }, (_, i) => (
      <div key={`grid-${i}`} className="border border-foreground/10"></div>
    ));
  }, [rows, cols]);

  return (
    <div className={`absolute inset-0 ${className}`}>
      <div 
        className="grid gap-px h-full"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`
        }}
      >
        {gridItems}
      </div>
    </div>
  );
};

export default PerformanceGrid;
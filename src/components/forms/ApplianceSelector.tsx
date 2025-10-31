import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Zap, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Appliance } from '@/types/product';
import { useState, useMemo } from 'react';

interface ApplianceSelectorProps {
  appliances: Appliance[];
  selectedAppliances: string[];
  onToggle: (applianceId: string) => void;
  onAddCustom?: (name: string, watts: number, hours: number) => void;
}

export const ApplianceSelector: React.FC<ApplianceSelectorProps> = ({
  appliances,
  selectedAppliances,
  onToggle,
  onAddCustom
}) => {
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customWatts, setCustomWatts] = useState('');
  const [customHours, setCustomHours] = useState('');

  const handleAddCustom = () => {
    if (customName && customWatts && customHours && onAddCustom) {
      onAddCustom(customName, parseInt(customWatts), parseInt(customHours));
      setCustomName('');
      setCustomWatts('');
      setCustomHours('');
      setShowCustomForm(false);
    }
  };

  // Memoize expensive calculation
  const totalWatts = useMemo(() => 
    selectedAppliances.reduce((sum, id) => {
      const appliance = appliances.find(a => a.id === id);
      return sum + (appliance?.watts || 0);
    }, 0),
    [selectedAppliances, appliances]
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-lg flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" aria-hidden="true" />
            What do you want to power during outages?
          </Label>
          <p className="text-sm text-muted-foreground mt-1" id="appliance-description">
            Select all that apply • Total: <span className="font-semibold text-foreground">{totalWatts}W</span>
          </p>
        </div>
        {onAddCustom && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCustomForm(!showCustomForm)}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Custom
          </Button>
        )}
      </div>

      {/* Custom Appliance Form */}
      {showCustomForm && onAddCustom && (
        <div className="p-4 border rounded-lg bg-muted/30 space-y-3 animate-fade-in">
          <h4 className="font-medium text-sm">Add Custom Appliance</h4>
          <div className="grid grid-cols-3 gap-3">
            <Input
              placeholder="Name"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="bg-background"
            />
            <Input
              type="number"
              placeholder="Watts"
              value={customWatts}
              onChange={(e) => setCustomWatts(e.target.value)}
              className="bg-background"
            />
            <Input
              type="number"
              placeholder="Hours/day"
              value={customHours}
              onChange={(e) => setCustomHours(e.target.value)}
              className="bg-background"
            />
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleAddCustom}
              disabled={!customName || !customWatts || !customHours}
            >
              Add
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowCustomForm(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      
      <div 
        className="grid grid-cols-2 md:grid-cols-3 gap-3"
        role="group"
        aria-labelledby="appliance-description"
      >
        {appliances.map((appliance) => {
          const isSelected = selectedAppliances.includes(appliance.id);
          return (
      <div
        key={appliance.id}
        onClick={() => onToggle(appliance.id)}
        role="checkbox"
        aria-checked={isSelected}
        aria-label={`${appliance.name} - ${appliance.watts} watts`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle(appliance.id);
          }
        }}
        className={cn(
          "flex items-center gap-3 p-3 md:p-4 rounded-lg border-2 cursor-pointer transition-all touch-manipulation active:scale-95",
          isSelected
            ? "border-primary bg-primary/5 shadow-sm"
            : "border-border hover:border-primary/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "min-h-[72px]"
        )}
      >
        <div className={cn(
          "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all",
          isSelected
            ? "bg-primary text-primary-foreground scale-110"
            : "bg-muted"
        )}>
          <appliance.icon className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm md:text-base">{appliance.name}</div>
          <div className="text-xs text-muted-foreground">{appliance.watts}W • {appliance.hours}h/day</div>
        </div>
        {isSelected && (
          <div className="flex-shrink-0">
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
              <svg className="w-3 h-3 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        )}
      </div>
          );
        })}
      </div>
    </div>
  );
};

import { Label } from '@/components/ui/label';
import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Appliance } from '@/types/product';

interface ApplianceSelectorProps {
  appliances: Appliance[];
  selectedAppliances: string[];
  onToggle: (applianceId: string) => void;
}

export const ApplianceSelector: React.FC<ApplianceSelectorProps> = ({
  appliances,
  selectedAppliances,
  onToggle
}) => {
  return (
    <div className="space-y-4">
      <Label className="text-lg flex items-center gap-2">
        <Zap className="w-5 h-5 text-primary" aria-hidden="true" />
        What do you want to power during outages?
      </Label>
      <p className="text-sm text-muted-foreground" id="appliance-description">
        Select all that apply
      </p>
      
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
          "flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all",
          isSelected
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        )}
      >
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center",
          isSelected
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        )}>
          <appliance.icon className="w-5 h-5" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm">{appliance.name}</div>
          <div className="text-xs text-muted-foreground">{appliance.watts}W</div>
        </div>
      </div>
          );
        })}
      </div>
    </div>
  );
};

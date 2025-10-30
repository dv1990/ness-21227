import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Home, Sun, Zap } from 'lucide-react';
import type { Product, Appliance } from '@/types/product';

interface ConfigurationSummaryProps {
  selectedProduct: Product;
  homeSize: string;
  hasSolar: string;
  selectedAppliances: string[];
  appliances: Appliance[];
}

export const ConfigurationSummary: React.FC<ConfigurationSummaryProps> = ({
  selectedProduct,
  homeSize,
  hasSolar,
  selectedAppliances,
  appliances
}) => {
  const totalWatts = selectedAppliances.reduce((sum, appId) => {
    const appliance = appliances.find(a => a.id === appId);
    return sum + (appliance?.watts || 0);
  }, 0);

  return (
    <Card className="p-6 bg-muted/30">
      <div className="flex items-start gap-3 mb-4">
        <Package className="w-6 h-6 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">Your Configuration</h3>
          <p className="text-sm text-muted-foreground">Review your selections below</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Selected Product */}
        <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
          <img 
            src={selectedProduct.image} 
            alt={selectedProduct.name}
            className="w-16 h-16 object-contain"
          />
          <div className="flex-1">
            <div className="font-medium">{selectedProduct.name}</div>
            <div className="text-sm text-muted-foreground">{selectedProduct.tier}</div>
            <Badge variant="secondary" className="mt-1">{selectedProduct.capacity}</Badge>
          </div>
          <div className="text-xl font-light">{selectedProduct.price}</div>
        </div>

        {/* Configuration Details */}
        <div className="space-y-3 pt-3 border-t border-border/50">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Home className="w-4 h-4" aria-hidden="true" />
              Home Size
            </span>
            <span className="font-medium">{homeSize}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Sun className="w-4 h-4" aria-hidden="true" />
              Solar Panels
            </span>
            <span className="font-medium">{hasSolar}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Zap className="w-4 h-4" aria-hidden="true" />
              Total Load
            </span>
            <span className="font-medium">{totalWatts}W</span>
          </div>
        </div>

        {/* Selected Appliances */}
        {selectedAppliances.length > 0 && (
          <div className="pt-3 border-t border-border/50">
            <div className="text-sm font-medium mb-2">Appliances to Power:</div>
            <div className="space-y-1">
              {selectedAppliances.map(appId => {
                const appliance = appliances.find(a => a.id === appId);
                return appliance ? (
                  <div key={appId} className="text-xs text-muted-foreground flex items-center justify-between">
                    <span>• {appliance.name}</span>
                    <span>{appliance.watts}W</span>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

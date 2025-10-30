import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  isSelected?: boolean;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isSelected = false,
  onSelect
}) => {
  return (
    <Card
      className={cn(
        "group cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-primary/50",
        isSelected && "ring-2 ring-primary"
      )}
      onClick={() => onSelect(product)}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`Select ${product.name} - ${product.idealFor}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(product);
        }
      }}
    >
      <div className="p-6 space-y-6">
        {/* Image */}
        <div className="aspect-square bg-muted/30 rounded-xl flex items-center justify-center p-6">
          <img 
            src={product.image} 
            alt={`${product.name} battery system`}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform"
          />
        </div>

        {/* Content */}
        <div className="space-y-3">
          <div>
            <Badge variant="secondary" className="mb-2">{product.tier}</Badge>
            <h3 className="text-2xl font-semibold">{product.name}</h3>
          </div>

          <div className="flex items-baseline justify-between text-sm">
            <span className="text-muted-foreground">Capacity</span>
            <span className="text-lg font-medium">{product.capacity}</span>
          </div>

          <div className="flex items-baseline justify-between text-sm">
            <span className="text-muted-foreground">Backup</span>
            <span className="text-lg font-medium">{product.backupTime}</span>
          </div>

          <div className="pt-3 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-3">{product.idealFor}</p>
            <div className="space-y-2">
              {product.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description for AIO product */}
          {product.description && (
            <div className="pt-3 border-t border-border/50">
              <p className="text-xs text-muted-foreground/80 leading-relaxed">
                <strong className="text-foreground">What is All-In-One?</strong> {product.description}
              </p>
            </div>
          )}

          <div className="pt-4">
            <div className="text-3xl font-light mb-2">{product.price}</div>
            <Button className="w-full">
              {product.id === 'oneaio' ? 'Configure' : `Select ${product.name}`}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

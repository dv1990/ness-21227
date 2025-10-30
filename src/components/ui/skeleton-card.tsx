import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface SkeletonCardProps {
  className?: string;
  variant?: 'product' | 'testimonial' | 'feature' | 'stat';
}

export const SkeletonCard = ({ className, variant = 'product' }: SkeletonCardProps) => {
  const variants = {
    product: (
      <CardContent className="p-8 space-y-6">
        <Skeleton className="aspect-square rounded-2xl" />
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-8 w-20" />
          <div className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-14" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          <Skeleton className="h-8 w-full rounded-full" />
        </div>
      </CardContent>
    ),
    testimonial: (
      <CardContent className="p-8 space-y-6">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, idx) => (
            <Skeleton key={idx} className="w-5 h-5 rounded-sm" />
          ))}
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="text-right space-y-1">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </CardContent>
    ),
    feature: (
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-full" />
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
        </div>
      </CardContent>
    ),
    stat: (
      <CardContent className="p-8 space-y-4 text-center">
        <Skeleton className="w-12 h-12 rounded-lg mx-auto" />
        <Skeleton className="h-8 w-20 mx-auto" />
        <Skeleton className="h-4 w-24 mx-auto" />
      </CardContent>
    )
  };

  return (
    <Card className={cn('glass-card animate-pulse', className)}>
      {variants[variant]}
    </Card>
  );
};
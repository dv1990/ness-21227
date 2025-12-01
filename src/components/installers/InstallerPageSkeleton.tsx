import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const InstallerPageSkeleton = () => {
  return (
    <div className="space-y-0">
      {/* Hero Skeleton */}
      <section className="min-h-[60vh] flex items-center bg-background">
        <div className="max-w-6xl mx-auto px-8 w-full">
          <div className="max-w-3xl space-y-8">
            <Skeleton className="h-32 w-full max-w-2xl" />
            <Skeleton className="h-24 w-full max-w-xl" />
            <Skeleton className="h-14 w-64 rounded-full" />
          </div>
        </div>
      </section>

      {/* Program Details Skeleton */}
      <section className="py-32 bg-muted/10">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-20">
            <Skeleton className="h-16 w-96 mx-auto mb-6" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-border">
                <CardContent className="p-8">
                  <Skeleton className="w-16 h-16 rounded-2xl mb-6" />
                  <Skeleton className="h-8 w-48 mb-4" />
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((j) => (
                      <Skeleton key={j} className="h-5 w-full" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Skeleton */}
      <section className="py-32 bg-background">
        <div className="max-w-4xl mx-auto px-8">
          <Card className="border-border">
            <CardContent className="p-12">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="w-5 h-5" />
                    ))}
                  </div>
                  <Skeleton className="h-32 w-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-64" />
                    <Skeleton className="h-4 w-56" />
                  </div>
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-32 w-full rounded-xl" />
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-24 w-full rounded-xl" />
                    <Skeleton className="h-24 w-full rounded-xl" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

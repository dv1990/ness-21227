import { Skeleton } from "@/components/ui/skeleton";

export const ProductSectionSkeleton = ({ isDark = false }: { isDark?: boolean }) => {
  return (
    <section className={`py-12 sm:py-16 md:py-20 px-4 sm:px-6 ${isDark ? 'bg-gradient-to-b from-graphite to-graphite/90' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          <div className={isDark ? "order-1" : "order-2 md:order-1"}>
            <Skeleton className={`h-6 w-32 mb-4 ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
            <Skeleton className={`h-12 sm:h-16 w-3/4 mb-6 ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
            <Skeleton className={`h-20 w-full mb-8 ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
            
            <div className="space-y-4 mb-10">
              {[1, 2, 3].map((num) => (
                <div key={`skeleton-feature-${num}`} className="flex items-start gap-3">
                  <Skeleton className={`w-6 h-6 rounded-full flex-shrink-0 ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
                  <div className="flex-1 space-y-2">
                    <Skeleton className={`h-4 w-40 ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
                    <Skeleton className={`h-3 w-full ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Skeleton className={`h-14 w-full sm:w-48 rounded-full ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
              <Skeleton className={`h-14 w-full sm:w-48 rounded-full ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
            </div>
          </div>

          <div className={`relative ${isDark ? "order-2" : "order-1 md:order-2"}`}>
            <Skeleton className={`w-full aspect-square rounded-2xl ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
          </div>
        </div>
      </div>
    </section>
  );
};

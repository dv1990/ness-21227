# Progressive Lazy Loading Implementation

## Overview
Comprehensive route-based code splitting and intelligent prefetching system to minimize initial bundle size and maximize perceived performance.

## Architecture

### 1. **Automatic Route Splitting** (vite.config.ts)
- Each major page gets its own chunk (`page-home`, `page-commercial`, etc.)
- Related pages grouped together (`pages-contact`, `pages-company`, `pages-products`)
- Vendor libraries split by usage pattern (UI, forms, charts, etc.)
- React ecosystem in single chunk to prevent duplicate instances

**Expected Impact**: 
- Initial bundle reduced by ~40-50%
- Each route loads only required code
- Shared dependencies cached between routes

### 2. **Multi-Layer Prefetching Strategy**

#### Layer 1: Critical Routes (main.tsx)
Automatically prefetches most-visited routes after initial page load:
- `/commercial` → `/homeowners` → `/contact` → `/installers` → `/warranty`
- Staggered by 300ms to avoid network congestion
- Uses `requestIdleCallback` to avoid blocking main thread

#### Layer 2: Hover Prefetching (NavigationEnhanced.tsx)
All navigation links prefetch on hover/focus with 100ms debounce:
```tsx
<Link to="/path" onMouseEnter={() => prefetchRoute('/path')} />
```

#### Layer 3: Intersection Observer (use-route-prefetch.tsx)
Automatically prefetch routes when links become visible:
```tsx
const ref = useRoutePrefetch('/path');
<Link ref={ref} to="/path">Link</Link>
```

#### Layer 4: Smart Link Component (PrefetchLink.tsx)
Enhanced Link with automatic prefetching:
```tsx
<PrefetchLink to="/path">Link</PrefetchLink>
```

## Usage Examples

### For Navigation Links
```tsx
import { PrefetchLink } from '@/components/PrefetchLink';

<PrefetchLink to="/commercial">
  Commercial
</PrefetchLink>
```

### For Below-Fold Links
```tsx
import { useRoutePrefetch } from '@/hooks/use-route-prefetch';

const Component = () => {
  const linkRef = useRoutePrefetch('/warranty');
  
  return (
    <Link ref={linkRef} to="/warranty">
      Learn about warranty
    </Link>
  );
};
```

### Manual Prefetching
```tsx
import { prefetchRoute } from '@/lib/route-prefetch';

// Prefetch on user action
onClick={() => {
  prefetchRoute('/next-page');
  // ... other logic
}}
```

## Performance Metrics

### Before Optimization
- Initial bundle: ~800KB
- Route navigation: ~200-300ms (cold)
- Time to Interactive: ~2.5s

### After Optimization (Expected)
- Initial bundle: ~400-450KB (50% reduction)
- Route navigation: ~50-100ms (warm prefetch)
- Time to Interactive: ~1.5s

## Monitoring

### Build Analysis
```bash
npm run build
# Check dist/assets/ for chunk sizes
# Main chunks should be: react-vendor (~150KB), router (~50KB), page-home (~80KB)
```

### Runtime Monitoring
1. Open DevTools → Network
2. Navigate site → Watch for prefetched chunks
3. Hover navigation → See instant chunk loads
4. Click links → Near-instant navigation

## Best Practices

1. **Always use lazy() for pages**: Ensures automatic code splitting
2. **Use PrefetchLink for navigation**: Automatic hover prefetching
3. **Add intersection observer for CTAs**: Prefetch before user clicks
4. **Avoid manual imports of pages**: Breaks code splitting
5. **Keep shared components in separate chunks**: Better caching

## Route Map (route-prefetch.ts)
All routes configured for prefetching:
- `/commercial`, `/ci` → CommercialEnhanced
- `/homeowners`, `/residential` → ContactHomeowner  
- `/contact` → ContactEnhanced
- `/installers` → InstallersEnhanced
- `/warranty` → TrueWarranty
- And more...

## Future Enhancements

1. **Predictive Prefetching**: Use analytics to predict next route
2. **Network-Aware Loading**: Adjust prefetch based on connection speed
3. **Priority Hints**: Use `<link rel="prefetch">` for critical routes
4. **Service Worker Caching**: Aggressive caching of prefetched chunks

## Troubleshooting

### Issue: Routes not prefetching
- Check console for errors
- Verify route exists in `routeMap` in route-prefetch.ts
- Check Network tab for prefetch requests

### Issue: Large initial bundle
- Run `npm run build` and check chunk sizes
- Ensure pages use `lazy()` import
- Verify vite.config.ts `manualChunks` configuration

### Issue: Slow navigation
- Check if prefetching is enabled
- Verify chunks are being loaded on hover
- Check for network throttling in DevTools

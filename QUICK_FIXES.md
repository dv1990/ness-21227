# Quick Fixes - Priority Actions

## 🔴 Critical Fixes (Do First)

### 1. Fix EmailJS Configuration
**File:** `src/lib/email-service.ts`

**Current:**
```typescript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
```

**Fix:**
```typescript
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
  if (import.meta.env.DEV) {
    console.warn('⚠️ EmailJS configuration missing. Forms will not work.');
  }
}

export const sendEmail = async (data: EmailData): Promise<boolean> => {
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    throw new Error('EmailJS is not configured. Please set environment variables.');
  }
  // ... rest of function
};
```

**Action:** Create `.env.example` file with:
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

---

### 2. Fix Performance Monitor FCP/TTFB
**File:** `src/lib/performance.ts`

**Current (lines 126-141):**
```typescript
window.addEventListener('load', () => {
  const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  if (perfData) {
    const fcp = perfData.responseStart - perfData.fetchStart; // ❌ Wrong
    const ttfb = perfData.responseStart - perfData.requestStart; // ✅ Correct
    // ...
  }
});
```

**Fix:**
```typescript
private observePerformance() {
  // ... existing LCP, FID, CLS observers ...

  // FCP observer
  try {
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        this.metrics.fcp = fcpEntry.startTime;
        this.checkBudget('FCP_THRESHOLD', fcpEntry.startTime);
      }
    });
    fcpObserver.observe({ entryTypes: ['paint'] });
    this.observers.push(fcpObserver);
  } catch (e) {
    // Observer not supported
  }

  // TTFB from navigation timing
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (perfData) {
        const ttfb = perfData.responseStart - perfData.requestStart;
        this.metrics.ttfb = ttfb;
        this.checkBudget('TTFB_THRESHOLD', ttfb);
      }
    }, { once: true });
  }
}
```

**Also add cleanup:**
```typescript
class PerformanceMonitor {
  private observers: PerformanceObserver[] = [];

  cleanup() {
    this.observers.forEach(obs => obs.disconnect());
    this.observers = [];
  }
}
```

---

### 3. Align TypeScript Configuration
**File:** `tsconfig.json`

**Current:**
```json
{
  "compilerOptions": {
    "noImplicitAny": false,
    "noUnusedParameters": false,
    "strictNullChecks": false,
    "noUnusedLocals": false
  }
}
```

**Fix:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

**Note:** This may require fixing type errors throughout the codebase. Do this incrementally.

---

## 🟡 Medium Priority Fixes

### 4. Guard Console Statements
**Files to fix:**
- `src/pages/CommercialEnhanced.tsx:731`
- `src/components/SystemConfigurator.tsx:229`
- `src/components/ProductSelectorWizard.tsx:311`
- `src/components/ServiceWorkerPrompt.tsx:14,17`

**Pattern:**
```typescript
// Before
console.error("Form submission error:", error);

// After
if (import.meta.env.DEV) {
  console.error("Form submission error:", error);
}
```

---

### 5. Fix Intersection Observer Dependencies
**File:** `src/hooks/use-intersection-observer.tsx:75`

**Current:**
```typescript
}, [threshold, rootMargin, triggerOnce, enabled, isIntersecting]);
```

**Fix:**
```typescript
}, [threshold, rootMargin, triggerOnce, enabled]);
// Remove isIntersecting - it's managed by the observer callback
```

---

### 6. Optimize Image Preloading
**File:** `src/lib/image-optimizer.ts:50-78`

**Current:** Creates 3 preload links per image

**Fix:**
```typescript
export const preloadCriticalImages = async (imageSrcs: string[]) => {
  if (typeof window === 'undefined') return;

  // Detect format support once
  const supportsAVIF = await isAVIFSupported();
  const supportsWebP = await isWebPSupported();

  imageSrcs.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.fetchPriority = 'high';
    
    if (supportsAVIF) {
      link.href = getOptimizedImageSrc(src, 'avif');
      link.type = 'image/avif';
    } else if (supportsWebP) {
      link.href = getOptimizedImageSrc(src, 'webp');
      link.type = 'image/webp';
    } else {
      link.href = src;
    }
    
    document.head.appendChild(link);
  });
};
```

---

## 🟢 Low Priority (Nice to Have)

### 7. Remove Deprecated Hook
**File:** `src/hooks/use-scroll-animation.tsx`

**Action:** 
1. Search for imports: `grep -r "use-scroll-animation" src/`
2. If no imports found, delete the file
3. If imports found, migrate to `use-intersection-observer`

---

### 8. Refactor Route Prefetching
**File:** `src/lib/route-prefetch.ts`

**Current:** Large switch statement

**Better approach:**
```typescript
const routeMap: Record<string, () => Promise<any>> = {
  '/commercial': () => import('../pages/CommercialEnhanced'),
  '/commercial-enhanced': () => import('../pages/CommercialEnhanced'),
  '/ci': () => import('../pages/CommercialEnhanced'),
  '/contact': () => import('../pages/ContactEnhanced'),
  '/contact-enhanced': () => import('../pages/ContactEnhanced'),
  // ... add all routes
};

export const prefetchRoute = (route: string) => {
  if (prefetchedRoutes.has(route)) return;
  
  const loader = routeMap[route];
  if (loader) {
    prefetchedRoutes.add(route);
    loader();
  }
};
```

---

## 📝 Testing Checklist

After applying fixes, test:

- [ ] Email forms submit successfully
- [ ] Performance metrics display correctly in dev mode
- [ ] No TypeScript errors after strict mode
- [ ] No console output in production build
- [ ] Images load with correct format
- [ ] No memory leaks (check DevTools Performance tab)
- [ ] Intersection observers work correctly

---

## 🚀 Quick Win Summary

**Estimated Time:**
- Critical fixes: 2-3 hours
- Medium priority: 1-2 hours
- Low priority: 1 hour

**Impact:**
- ✅ Production-ready email functionality
- ✅ Accurate performance monitoring
- ✅ Better type safety
- ✅ Cleaner production builds
- ✅ Better performance (image preloading)


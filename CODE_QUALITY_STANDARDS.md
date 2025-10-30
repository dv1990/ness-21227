# NESS Energy - Code Quality Standards

## 🚀 Performance Standards

### Critical Performance Requirements
- **Page Load Time**: < 2 seconds on 3G connections
- **First Contentful Paint**: < 1.5 seconds
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3 seconds

### Image Optimization
- All images must have descriptive `alt` attributes
- Use responsive images with `srcSet` when appropriate
- Lazy load images below the fold
- Compress images to appropriate quality levels

### React Performance
- ❌ **Never use array indices as keys** unless the array is static
- ✅ **Use unique identifiers** for list items
- ✅ **Memoize expensive computations** with `useMemo`
- ✅ **Optimize re-renders** with `useCallback` for event handlers

## 🔧 Code Quality Rules

### Navigation & Routing
- ❌ **Never use `<a href>`** for internal navigation
- ✅ **Always use `<Link to>`** from react-router-dom
- ✅ **Implement proper error boundaries** for route protection

### Console Logging
- ❌ **No console.log in production code**
- ✅ **Use structured logging** from `src/lib/code-quality.ts`
- ✅ **Log errors appropriately** with context

### Accessibility (A11Y)
- ✅ **All images must have meaningful alt text**
- ✅ **Interactive elements must have ARIA labels**
- ✅ **Maintain proper heading hierarchy** (h1 → h2 → h3)
- ✅ **Ensure keyboard navigation** works everywhere

### TypeScript Standards
- ✅ **Define explicit interfaces** for all props
- ✅ **Use strict type checking**
- ❌ **No `any` types** without explicit justification
- ✅ **Handle null/undefined** explicitly

## 🎨 Design System Compliance

### Color Usage
- ✅ **Use semantic color tokens** from index.css
- ❌ **Never use hardcoded colors** like `text-white`, `bg-black`
- ✅ **All colors must support dark mode**
- ✅ **Maintain WCAG AA contrast ratios**

### Component Architecture
- ✅ **Keep components under 200 lines**
- ✅ **Single responsibility principle**
- ✅ **Extract reusable logic** into custom hooks
- ✅ **Use composition over inheritance**

## 🔍 Code Review Checklist

### Before Submitting
- [ ] No console.log statements
- [ ] All images have alt text
- [ ] Using Link instead of anchor tags
- [ ] Proper TypeScript typing
- [ ] Performance considerations addressed
- [ ] Accessibility standards met
- [ ] Design system tokens used

### Performance Checks
- [ ] No unnecessary re-renders
- [ ] Efficient key props for lists
- [ ] Images optimized and lazy loaded
- [ ] Bundle size impact assessed
- [ ] Core Web Vitals maintained

### User Experience
- [ ] Loading states implemented
- [ ] Error states handled gracefully
- [ ] Mobile responsiveness verified
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility

## 🛠️ Development Tools

### Required Extensions
- ESLint with React hooks plugin
- Prettier for code formatting
- TypeScript for type checking
- React Developer Tools

### Performance Monitoring
```typescript
import { performanceMonitor } from '@/lib/performance-monitor';

// Track component performance
const { endTracking } = usePerformanceTracking('MyComponent');

// Track feature usage
const featureTracker = performanceMonitor.markFeature('user-action');
// ... feature code ...
featureTracker.end();
```

### Code Quality Utilities
```typescript
import { logger, generateUniqueKey, a11y } from '@/lib/code-quality';

// Proper logging
logger.info('User action completed', { userId, action });

// Generate proper keys
const key = generateUniqueKey(item, index, 'product');

// Generate alt text
const altText = a11y.generateAltText('Product image', product.name);
```

## 🚨 Enforcement

### Automated Checks
- Pre-commit hooks prevent commits with console.log
- TypeScript strict mode enabled
- ESLint rules enforce React best practices
- Lighthouse CI checks performance metrics

### Manual Review Requirements
- All PRs require code review
- Performance impact assessment for large changes
- Accessibility testing for UI changes
- Cross-browser compatibility verification

---

**Remember**: Code quality is not negotiable. Every line of code affects user experience.
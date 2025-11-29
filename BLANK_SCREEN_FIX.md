# Blank Screen Fix - Deployment Issues

## 🔴 Critical Issues Found

### 1. Hardcoded Source Paths in index.html ❌

**Problem:** `index.html` contains hardcoded paths to source files that don't exist in production:

```html
<!-- ❌ These paths don't work in production -->
<link rel="preload" as="image" href="/src/assets/ness-hero-product.webp" />
<link rel="modulepreload" href="/src/main.tsx" />
<script type="module" src="/src/main.tsx"></script>
```

**Why This Breaks:**
- In production, Vite builds files to `dist/` with hashed filenames
- `/src/` paths don't exist in production builds
- Browser tries to load `/src/main.tsx` → 404 → Blank screen

### 2. Vite Auto-Injection

**Solution:** Vite automatically injects the correct script tag during build. Don't manually add it.

---

## ✅ Fixes Applied

### 1. Removed Hardcoded Source Paths

**Removed:**
- ❌ `<link rel="preload" as="image" href="/src/assets/...">` 
- ❌ `<link rel="modulepreload" href="/src/main.tsx">`
- ❌ `<script type="module" src="/src/main.tsx"></script>`

**Why:**
- Vite automatically injects the correct script tag during `npm run build`
- Preload links should be handled by Vite or added programmatically
- Source paths (`/src/`) only work in development

### 2. Let Vite Handle Script Injection

**After Build:**
Vite will automatically inject:
```html
<script type="module" src="/assets/main-[hash].js"></script>
```

---

## 🚀 Additional Fixes Needed

### Check for Missing Modules

Verify these files exist:
- ✅ `src/lib/font-optimizer.ts` 
- ✅ `src/lib/critical-css.ts`

If missing, either:
1. Create them, or
2. Remove imports from `src/main.tsx`

---

## 📝 Testing Steps

### 1. Build Locally
```bash
npm run build
```

### 2. Check Build Output
```bash
ls -la dist/
```
Should see:
- `dist/index.html` ✅
- `dist/assets/` directory ✅
- `dist/assets/main-[hash].js` ✅

### 3. Preview Build
```bash
npm run preview
```
Open browser and verify:
- ✅ Page loads (not blank)
- ✅ No 404 errors in console
- ✅ All assets load correctly

### 4. Check Browser Console
Open DevTools → Console:
- ❌ Should NOT see: `Failed to load resource: /src/main.tsx`
- ❌ Should NOT see: `404` errors for `/src/` paths
- ✅ Should see: App loads successfully

---

## 🔍 Debugging Blank Screen

### Common Causes:

1. **JavaScript Errors**
   - Open DevTools → Console
   - Look for red errors
   - Check Network tab for failed requests

2. **Missing Build Files**
   - Verify `dist/index.html` exists
   - Verify `dist/assets/` contains JS files

3. **Base Path Issues**
   - Check `vite.config.ts` has `base: '/'`
   - If deploying to subdirectory, update base path

4. **Service Worker Issues**
   - Clear browser cache
   - Disable service worker in DevTools → Application → Service Workers

5. **Router Issues**
   - Verify `BrowserRouter` is used (not HashRouter)
   - Check server redirects all routes to `index.html`

---

## ✅ Verification Checklist

After fixes:

- [ ] `index.html` has no `/src/` paths
- [ ] `index.html` has no manual `<script>` tag (Vite injects it)
- [ ] `npm run build` succeeds
- [ ] `dist/index.html` exists
- [ ] `dist/assets/` contains built files
- [ ] `npm run preview` shows working app
- [ ] Browser console has no 404 errors
- [ ] Deploy to Lovable works

---

## 🎯 Expected Result

**Before:**
- ❌ Blank screen
- ❌ 404 errors for `/src/main.tsx`
- ❌ Console errors

**After:**
- ✅ App loads correctly
- ✅ No 404 errors
- ✅ All assets load
- ✅ Routes work

---

## 📋 Quick Fix Summary

1. ✅ Removed hardcoded `/src/` paths from `index.html`
2. ✅ Removed manual script tag (Vite injects automatically)
3. ✅ Let Vite handle all asset injection during build

**Files Changed:**
- `index.html` - Removed problematic preload/modulepreload links and script tag


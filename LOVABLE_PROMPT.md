# Lovable Prompt - Deployment Fixes

## 🔴 Critical: Blank Screen Fix (Do This First!)

### Token-Optimized Prompt (25 tokens)
```
Fix blank screen: Remove hardcoded /src/ paths from index.html. Delete lines 90, 94, and 127 that reference /src/main.tsx or /src/assets/. Vite injects scripts automatically during build. These paths cause 404 errors in production.
```

**Priority:** 🔴 Critical | **Token Count:** ~25 tokens

---

## ✅ Router Fix (Already Applied)

### Token-Optimized Prompt (20 tokens)
```
Replace HashRouter with BrowserRouter in src/App.tsx import. Change "HashRouter as Router" to "BrowserRouter as Router". Fixes Lovable deployment.
```

**Token Count:** ~20 tokens | **Status:** ✅ Already fixed

---

## Alternative Prompts

### Minimal Version (15 tokens)
```
Change HashRouter to BrowserRouter in App.tsx. Fixes Lovable URLs.
```

### Detailed Version (35 tokens)
```
In src/App.tsx, replace HashRouter with BrowserRouter. Change import from "HashRouter as Router" to "BrowserRouter as Router". Keep all routes unchanged. This fixes Lovable public URL deployment.
```

### Context-Rich Version (50 tokens)
```
Fix deployment: Replace HashRouter with BrowserRouter in src/App.tsx line 5. Change "import { HashRouter as Router }" to "import { BrowserRouter as Router }". All routing config, future flags, and Routes remain identical. This enables clean URLs for Lovable deployment.
```

---

## What This Does

1. ✅ Changes `HashRouter` → `BrowserRouter` in `src/App.tsx`
2. ✅ Fixes Lovable public URL deployment
3. ✅ Enables clean URLs (`/path` instead of `/#/path`)
4. ✅ No other changes needed

---

## Expected Result

**Before:**
- URLs: `https://lovable.app/#/commercial`
- Deployment: ❌ Broken on Lovable

**After:**
- URLs: `https://lovable.app/commercial`
- Deployment: ✅ Works on Lovable

---

## Verification

After implementation:
1. Check `src/App.tsx` line 5 shows `BrowserRouter`
2. Build succeeds: `npm run build`
3. Deploy to Lovable
4. Test public URL works


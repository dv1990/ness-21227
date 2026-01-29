
# Fix: Deployed Site Blank Page

## Problem Identified

The deployed site at `https://ness-21227.lovable.app/` shows a blank page because of a critical configuration issue in `index.html`.

### Root Cause

**Line 106 in `index.html`:**
```html
<script type="module" src="/src/main.tsx"></script>
```

This path `/src/main.tsx` only works in development mode. In production:
- Vite compiles source files into `/assets/main-[hash].js`
- The `/src/` folder does not exist in the production build
- The browser cannot load the app because the script fails to load
- No visible error because the SPA redirect returns HTML instead of 404

### Why You See No Console Errors

The SPA redirect rule (`/* -> /index.html`) intercepts the 404 and returns the HTML page again, which is valid content (not an error). The browser receives a 200 status with HTML content instead of the JavaScript bundle, so there's no error thrown - just a blank page with no React app mounted.

---

## Solution

**Remove the manual script tag from `index.html` (line 106).**

Vite automatically injects the correct script tag during the build process:
```html
<!-- Vite injects this automatically during 'npm run build' -->
<script type="module" src="/assets/main-abc123.js"></script>
```

### Files to Modify

**`index.html`** - Remove line 106

```text
Before:
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>  <!-- DELETE THIS LINE -->
  </body>

After:
  <body>
    <div id="root"></div>
    <!-- Vite injects script automatically during build -->
  </body>
```

---

## Technical Details

### How Vite Script Injection Works

1. **Development:** Vite serves `/src/main.tsx` directly via its dev server
2. **Production Build:** Vite transforms the source and:
   - Creates hashed bundles in `/assets/`
   - Automatically modifies `index.html` to reference the correct bundle
   - Removes any `/src/` references

When you have a manual `<script src="/src/main.tsx">` tag:
- In dev: Works (Vite intercepts and serves the source)
- In prod: Breaks (file doesn't exist, app never loads)

### The SPA Redirect Masking

Your `netlify.toml` has:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This means when the browser requests `/src/main.tsx`:
- The file doesn't exist
- Netlify returns `/index.html` with status 200
- Browser receives HTML (not JS)
- No network error shown (200 status)
- But React never loads because no valid JS executed

---

## Verification After Fix

After deploying:

1. Open `https://ness-21227.lovable.app/` in incognito window
2. Open DevTools > Network tab
3. Reload the page
4. You should see `/assets/main-[hash].js` loaded (not `/src/main.tsx`)
5. The React app should render correctly

---

## Summary

| Step | Action |
|------|--------|
| 1 | Delete line 106 in `index.html` (`<script type="module" src="/src/main.tsx"></script>`) |
| 2 | Re-deploy to Lovable |
| 3 | Test deployed site in incognito browser |

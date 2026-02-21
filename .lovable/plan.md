

# Fix: Published Site Blank Page (Build Output Broken)

## Root Cause

The published site serves completely empty HTML — just `<div id="root"></div>` with no scripts, no CSS, no head content. This is caused by **overly aggressive build configuration** in `vite.config.ts`.

### Problem 1: Destructive Tree-Shaking Settings

The rollup `treeshake` configuration (lines 181-187) uses settings that strip too much:

- `moduleSideEffects: false` — tells Rollup that **no module has side effects**, which can cause it to remove CSS imports, initialization code, and even Vite's internal HTML processing
- `preset: 'smallest'` — the most aggressive tree-shaking mode
- `propertyReadSideEffects: false` — can break framework internals

These settings work fine in the dev server (which doesn't use Rollup), but break the production build.

### Problem 2: Plugin Import Mismatch

`vite.config.ts` imports `@vitejs/plugin-react-swc` but `package.json` lists `@vitejs/plugin-react` as the main dependency. While the SWC variant exists in devDependencies, this inconsistency can cause unpredictable build behavior.

---

## Fix Plan

### Step 1: Remove aggressive tree-shaking from `vite.config.ts`

Replace the destructive rollup `treeshake` block with safe defaults:

```
// REMOVE this entire block (lines 181-187):
treeshake: {
  moduleSideEffects: false,
  propertyReadSideEffects: false,
  tryCatchDeoptimization: false,
  preset: 'smallest',
  manualPureFunctions: ['console.log', 'console.info', 'console.debug'],
}

// REPLACE with:
treeshake: {
  manualPureFunctions: ['console.log', 'console.info', 'console.debug'],
}
```

This keeps the useful console-stripping but removes the settings that break the build output.

### Step 2: Fix plugin import consistency

Change `vite.config.ts` line 2 from:
```
import react from "@vitejs/plugin-react-swc";
```
to:
```
import react from "@vitejs/plugin-react";
```

This matches the main dependency in `package.json`.

### Step 3: Re-publish and verify

After the code changes, publish the app and test the deployed URL in an incognito window.

---

## Technical Details

### Why the dev preview works but published site doesn't

- **Dev server**: Vite serves source files directly via its dev server — no Rollup bundling, no tree-shaking
- **Production build**: Vite uses Rollup to bundle everything — `moduleSideEffects: false` tells Rollup to strip any module that only has side effects (like CSS imports, Vite's HTML injection plugin internals)
- Result: the built `dist/index.html` is empty because Rollup stripped the script/CSS injections

### Files to modify

| File | Change |
|------|--------|
| `vite.config.ts` | Remove destructive tree-shaking settings, fix plugin import |

### Expected result

After publishing:
- The HTML will include the full `<head>` with meta tags, CSS links
- Script tags for the JS bundles will be injected by Vite
- The React app will mount and render correctly


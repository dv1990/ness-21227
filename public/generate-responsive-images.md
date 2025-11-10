# Responsive Image Generation Guide

This guide explains how to generate responsive image variants for optimal performance.

## Required Image Variants

For each hero and critical image, generate the following variants:

### Hero Images (Full Width)
- 640w - Mobile portrait
- 750w - Mobile landscape / Small tablet
- 828w - Tablet portrait
- 1080w - Tablet landscape / Small laptop
- 1200w - Laptop
- 1920w - Desktop

### Product Images (Contained)
- 400w - Mobile
- 640w - Tablet
- 828w - Small laptop
- 1080w - Laptop
- 1200w - Desktop

## Generation Methods

### Option 1: Using Sharp (Node.js) - Recommended for Build Process

```bash
npm install sharp --save-dev
```

```javascript
// scripts/generate-responsive-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const heroWidths = [640, 750, 828, 1080, 1200, 1920];
const productWidths = [400, 640, 828, 1080, 1200];

async function generateVariants(inputPath, outputDir, widths, quality = 80) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  
  for (const width of widths) {
    await sharp(inputPath)
      .resize(width, null, { 
        fit: 'cover',
        withoutEnlargement: true 
      })
      .webp({ quality })
      .toFile(path.join(outputDir, `${filename}-${width}w.webp`));
    
    console.log(`✓ Generated ${filename}-${width}w.webp`);
  }
}

// Generate hero image variants
generateVariants(
  './src/assets/ness-hero-product.webp',
  './src/assets-webp',
  heroWidths
);

// Generate other critical images
generateVariants(
  './src/assets/homeowner-hero-battery.webp',
  './src/assets-webp',
  heroWidths
);
```

### Option 2: Using ImageMagick (CLI)

```bash
# Install ImageMagick
brew install imagemagick  # macOS
apt-get install imagemagick  # Ubuntu/Debian

# Generate variants
for width in 640 750 828 1080 1200 1920; do
  convert input.jpg -resize ${width}x -quality 80 output-${width}w.webp
done
```

### Option 3: Using Squoosh CLI

```bash
npm install -g @squoosh/cli

squoosh-cli --webp '{"quality":80}' \
  --resize '{"enabled":true,"width":640}' \
  input.jpg -d output/
```

### Option 4: Using Online Tools

For non-technical users:
1. **Squoosh.app** - https://squoosh.app/
   - Upload image
   - Select WebP format
   - Adjust quality to 80%
   - Resize to each width
   - Download

2. **CloudConvert** - https://cloudconvert.com/
   - Batch conversion support
   - Can resize and convert in one step

## Priority Images to Generate

### Critical Hero Images (Priority: HIGH)
```
src/assets/ness-hero-product.webp
  → ness-hero-product-640w.webp
  → ness-hero-product-750w.webp
  → ness-hero-product-828w.webp
  → ness-hero-product-1080w.webp
  → ness-hero-product-1200w.webp
  → ness-hero-product-1920w.webp

src/assets/homeowner-hero-battery.webp
  → homeowner-hero-battery-640w.webp
  → homeowner-hero-battery-750w.webp
  → homeowner-hero-battery-828w.webp
  → homeowner-hero-battery-1080w.webp
  → homeowner-hero-battery-1200w.webp
  → homeowner-hero-battery-1920w.webp
```

### Secondary Images (Priority: MEDIUM)
```
src/assets/ness-pod-hero-new.webp
src/assets-webp/ness-pro-product.webp
```

## Recommended Build Script

Add to `package.json`:

```json
{
  "scripts": {
    "images:generate": "node scripts/generate-responsive-images.js",
    "build": "npm run images:generate && vite build"
  }
}
```

## Quality Guidelines

- **Hero images**: 80% quality, WebP format
- **Product images**: 85% quality (higher for product clarity)
- **Background images**: 75% quality (less critical)
- **Icons/Logos**: PNG (lossless), don't resize

## File Naming Convention

```
[original-name]-[width]w.[extension]

Examples:
ness-hero-product-640w.webp
ness-hero-product-1920w.webp
homeowner-hero-battery-828w.webp
```

## Implementation Check

After generating variants, verify they're being used:

1. Open browser DevTools → Network tab
2. Filter by "Img"
3. Check that correct size is loaded based on viewport
4. Mobile should load 640-828w variants
5. Desktop should load 1200-1920w variants

## Performance Impact

Expected improvements:
- **Mobile**: 60-70% smaller image size
- **Tablet**: 40-50% smaller image size  
- **Desktop**: 20-30% smaller (with better quality)
- **LCP improvement**: 30-50% faster on mobile

## Automation (Optional)

For automatic generation on build:

```javascript
// vite.config.ts
import imagemin from 'vite-plugin-imagemin';

export default {
  plugins: [
    imagemin({
      webp: {
        quality: 80
      }
    })
  ]
}
```

## CDN Alternative

Instead of local generation, use an image CDN like:
- Cloudinary
- imgix
- Cloudflare Images

These automatically generate variants on-the-fly.

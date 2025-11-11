# Responsive Image Generation Guide with AVIF Support

This guide explains how to generate responsive image variants with AVIF, WebP, and JPEG formats for optimal performance and compression.

## Image Format Strategy

### Progressive Format Support (Best → Fallback)
1. **AVIF** - Next-gen format, 30-50% smaller than WebP, best compression
2. **WebP** - Modern format, 25-35% smaller than JPEG, wide browser support
3. **JPEG** - Universal fallback, 100% browser support

## Required Image Variants

For each hero and critical image, generate variants in **all three formats** (AVIF, WebP, JPEG):

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

## File Structure

```
src/
  assets/          # Original JPEG files
  assets-webp/     # WebP variants
  assets-avif/     # AVIF variants (NEW)
```

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

async function generateVariants(inputPath, widths, quality = 80) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const baseDir = path.dirname(inputPath);
  
  for (const width of widths) {
    const resizedImage = sharp(inputPath)
      .resize(width, null, { 
        fit: 'cover',
        withoutEnlargement: true 
      });
    
    // Generate AVIF (best compression - 30-50% smaller than WebP)
    await resizedImage
      .clone()
      .avif({ quality, effort: 6 })
      .toFile(path.join(baseDir, '../assets-avif', `${filename}-${width}w.avif`));
    console.log(`✓ Generated ${filename}-${width}w.avif`);
    
    // Generate WebP (good compression, wide support)
    await resizedImage
      .clone()
      .webp({ quality })
      .toFile(path.join(baseDir, '../assets-webp', `${filename}-${width}w.webp`));
    console.log(`✓ Generated ${filename}-${width}w.webp`);
    
    // Generate JPEG (universal fallback)
    await resizedImage
      .clone()
      .jpeg({ quality, progressive: true })
      .toFile(path.join(baseDir, `${filename}-${width}w.jpg`));
    console.log(`✓ Generated ${filename}-${width}w.jpg`);
  }
}

// Generate hero image variants
generateVariants(
  './src/assets/ness-hero-product.jpg',
  heroWidths
);

// Generate other critical images
generateVariants(
  './src/assets/homeowner-hero-battery.jpg',
  heroWidths
);
```

### Option 2: Using ImageMagick (CLI)

```bash
# Install ImageMagick with AVIF support
brew install imagemagick  # macOS
apt-get install imagemagick libheif-dev  # Ubuntu/Debian

# Generate all format variants
for width in 640 750 828 1080 1200 1920; do
  # AVIF (best compression)
  convert input.jpg -resize ${width}x -quality 80 output-${width}w.avif
  
  # WebP (good compression)
  convert input.jpg -resize ${width}x -quality 80 output-${width}w.webp
  
  # JPEG (fallback)
  convert input.jpg -resize ${width}x -quality 80 output-${width}w.jpg
done
```

### Option 3: Using Squoosh CLI

```bash
npm install -g @squoosh/cli

# Generate AVIF
squoosh-cli --avif '{"quality":80,"effort":6}' \
  --resize '{"enabled":true,"width":640}' \
  input.jpg -d assets-avif/

# Generate WebP
squoosh-cli --webp '{"quality":80}' \
  --resize '{"enabled":true,"width":640}' \
  input.jpg -d assets-webp/

# Generate JPEG
squoosh-cli --mozjpeg '{"quality":80}' \
  --resize '{"enabled":true,"width":640}' \
  input.jpg -d assets/
```

### Option 4: Using Online Tools

For non-technical users:
1. **Squoosh.app** - https://squoosh.app/
   - Upload image
   - Select AVIF format (best compression)
   - Adjust quality to 80%, effort to 6
   - Resize to each width
   - Download
   - Repeat for WebP and JPEG formats

2. **CloudConvert** - https://cloudconvert.com/
   - Batch conversion support
   - Supports AVIF, WebP, and JPEG
   - Can resize and convert in one step

## Priority Images to Generate

### Critical Hero Images (Priority: HIGH)
Generate in all 3 formats (AVIF, WebP, JPEG):

```
src/assets/ness-hero-product.jpg
  → assets-avif/ness-hero-product-640w.avif (and all widths)
  → assets-webp/ness-hero-product-640w.webp (and all widths)
  → assets/ness-hero-product-640w.jpg (and all widths)

src/assets/homeowner-hero-battery.jpg
  → assets-avif/homeowner-hero-battery-640w.avif
  → assets-webp/homeowner-hero-battery-640w.webp
  → assets/homeowner-hero-battery-640w.jpg
```

### Secondary Images (Priority: MEDIUM)
```
src/assets/ness-pod-hero-new.jpg
src/assets/ness-pro-product.jpg
```

All images should have variants at: 640w, 750w, 828w, 1080w, 1200w, 1920w

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

### AVIF Settings (Best Compression)
- **Hero images**: 80% quality, effort: 6
- **Product images**: 85% quality, effort: 6
- **Background images**: 75% quality, effort: 4

### WebP Settings (Good Compression)
- **Hero images**: 80% quality
- **Product images**: 85% quality
- **Background images**: 75% quality

### JPEG Settings (Universal Fallback)
- **Hero images**: 80% quality, progressive
- **Product images**: 85% quality, progressive
- **Background images**: 75% quality, progressive

### Special Cases
- **Icons/Logos**: PNG (lossless), don't resize
- **SVG**: Keep as-is, no conversion needed

## File Naming Convention

```
[original-name]-[width]w.[extension]

Examples:
ness-hero-product-640w.avif
ness-hero-product-640w.webp
ness-hero-product-640w.jpg
ness-hero-product-1920w.avif
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

Expected improvements with AVIF:
- **Mobile**: 70-80% smaller image size (vs original JPEG)
- **Tablet**: 50-65% smaller image size  
- **Desktop**: 40-50% smaller (with better quality)
- **LCP improvement**: 40-60% faster on mobile
- **Data savings**: 30-50% smaller than WebP alone

### Format Comparison (Example: 1920px hero image)
- **Original JPEG**: 500 KB
- **WebP**: 325 KB (35% smaller)
- **AVIF**: 200 KB (60% smaller, 38% smaller than WebP)

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

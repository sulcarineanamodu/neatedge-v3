# Neatedge Premium Homepage Redesign - Stock Photography Sources

## Commercial Use Attribution

All images sourced from Unsplash (free for commercial use under Unsplash License).
Photographer attribution preserved in metadata where applicable.

## Image Inventory

### Hero Section
**Image 1: Professional office cleaning hero**
- URL: https://images.unsplash.com/photo-1552321554-5fefe8c9ef14
- Location: Hero background (line 124)
- Local copy: /public/image-hero.png
- Use: Premium hero background with navy overlay
- Dimensions: Full-width responsive hero section
- Format: PNG optimized via Next.js Image component

---

### Services Section - Editorial Layout

**Image 2: End-of-Tenancy Feature (Large)**
- URL: https://images.unsplash.com/photo-1556909114-f6e7ad7d3136
- Location: Services grid, featured large image (line 295)
- Use: Bright, clean apartment interior post-cleaning
- Alt text: "End of Tenancy Cleaning - Bright modern apartment"
- Dimensions: 1000x800px

**Image 3: Deep Cleaning (Tall Feature)**
- URL: https://images.unsplash.com/photo-1585771724684-38269d6639fd
- Location: Services grid, tall right column (line 328)
- Use: Close-up professional cleaning work
- Alt text: "Deep Cleaning - Professional cleaning work"
- Dimensions: 700x600px

**Image 4: Office Cleaning**
- URL: https://images.unsplash.com/photo-1552664730-d307ca884978
- Location: Services grid, supporting card (line 361)
- Use: Professional office workspace
- Alt text: "Office Cleaning"
- Dimensions: 500x400px

**Image 5: Carpet Cleaning**
- URL: https://images.unsplash.com/photo-1625246333195-78d9c38ad576
- Location: Services grid, supporting card (line 388)
- Use: Floor/carpet focus
- Alt text: "Carpet Cleaning"
- Dimensions: 400x350px

**Image 6: Commercial Cleaning**
- URL: https://images.unsplash.com/photo-1576091160550-112173fba483
- Location: Services grid, supporting card (line 415)
- Use: Modern commercial space
- Alt text: "Commercial Cleaning"
- Dimensions: 400x350px

---

### Residential + Commercial Split Section

**Image 7: Residential Cleaning Section**
- URL: https://images.unsplash.com/photo-1556909114-f6e7ad7d3136
- Location: Residential section (line 448)
- Use: Beautiful residential home interior
- Alt text: "Beautiful residential home interior"
- Dimensions: 700x600px

**Image 8: Commercial Cleaning Section**
- URL: https://images.unsplash.com/photo-1552664730-d307ca884978
- Location: Commercial section (line 478)
- Use: Professional commercial office space
- Alt text: "Professional commercial office space"
- Dimensions: 700x600px

---

### Property Professionals Section

**Image 9: Modern Apartment Turnaround**
- URL: https://images.unsplash.com/photo-1502672260266-1c1ef2d93688
- Location: Property Professionals section (line 515)
- Use: Modern apartment property turnaround
- Alt text: "Modern apartment property turnaround"
- Dimensions: 700x600px

---

### Why Neatedge Section

**Image 10: Professional Cleaner at Work**
- URL: https://images.unsplash.com/photo-1563207153-f403bf289096
- Location: Why Neatedge section (line 646)
- Use: Candid professional cleaner ensuring high standards
- Alt text: "Professional cleaner ensuring high standards"
- Dimensions: 700x600px

---

### Final CTA Section

**Image 11: Premium Property Interior (Full-Width)**
- URL: https://images.unsplash.com/photo-1576091160550-112173fba483
- Location: Final CTA background (line 687)
- Use: Full-width image-led final call-to-action
- Alt text: "Premium modern property interior"
- Dimensions: 1920x800px (responsive)

---

## Image Optimization Details

### Next.js Image Component Configuration
- All images use Next.js `<Image>` component for optimization
- Remote patterns configured in next.config.js to allow all HTTPS images
- Quality set to 85 for optimal balance between file size and visual quality
- Lazy loading enabled for below-fold images
- Responsive `sizes` attributes for adaptive loading

### Formats & Compression
- Primary format: WebP (with automatic fallback to PNG)
- AVIF format available through Next.js automatic optimization
- All images responsive from 375px (mobile) to 1920px (desktop)

### Accessibility
- Descriptive alt text for all images
- Semantic HTML structure
- WCAG AAA compliant contrast ratios

---

## Licensing

All images are licensed under the Unsplash License which allows:
- Free download and use
- Commercial and non-commercial purposes
- Modification and adaptation
- No permission or attribution required (though appreciated)

**Unsplash License Reference:** https://unsplash.com/license

---

## Image Testing Checklist

- [x] All URLs resolve and return valid image content
- [x] Images are responsive across breakpoints (375px, 390px, 430px, 768px, 1280px, 1440px, 1728px, 1920px)
- [x] No broken remote image dependencies
- [x] Alt text is descriptive and accessible
- [x] Images use Next.js Image component for optimization
- [x] Lazy loading configured for performance
- [x] No visible watermarks or third-party branding
- [x] Commercial use rights confirmed (Unsplash License)

---

## Performance Metrics

- **Hero image:** Optimized for hero LCP (Largest Contentful Paint)
- **Below-fold images:** Lazy loaded to improve Core Web Vitals
- **Responsive images:** Serve appropriately sized images per device
- **Total assets:** 11 images across homepage
- **Estimated page size impact:** ~1.2-1.8MB (uncompressed) / ~250-350KB (compressed via Next.js)


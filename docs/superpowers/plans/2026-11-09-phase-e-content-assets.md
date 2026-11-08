# Phase E — Content & Assets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Research, download, organize, optimize, and document high-quality automotive photography for the entire showroom. Create an asset manifest with verified licensing. Integrate images into the website with proper fallbacks.

**Architecture:** Images stored in `public/images/` following the required directory structure. Asset manifest at `public/images/manifest.json`. Images referenced via Next.js Image component or direct paths with fallbacks.

**Tech Stack:** Node.js (https/fs for downloads), sharp (image optimization), Next.js Image component

**Spec:** `docs/superpowers/specs/2026-11-09-velocity-showroom-design.md`

## Global Constraints

- No random placeholder images, generic gradients, emoji cars, or unrelated stock photography
- All images must be from legitimate sources (Unsplash, Pexels, Wikimedia Commons, manufacturer media)
- Licenses must be verified and documented — never invent licensing info
- Demo content clearly identified, never presented as real inventory
- Consistent image proportions per category
- Fallback behavior for missing images (skeletons, neutral placeholders)
- All checks (typecheck, lint, build, tests) pass before each commit

## Review Focus

- Each vehicle has model-accurate photography (not generic car images)
- No hotlinking — all assets downloaded locally
- License documented for every image in manifest
- Missing images don't break layouts
- Responsive image sizes generated

---

## Task 1: Create directory structure and placeholder assets

**Files:**
- Create: `public/images/hero/`
- Create: `public/images/vehicles/porsche/`
- Create: `public/images/vehicles/mercedes/`
- Create: `public/images/vehicles/bmw/`
- Create: `public/images/vehicles/ferrari/`
- Create: `public/images/vehicles/lamborghini/`
- Create: `public/images/vehicles/audi/`
- Create: `public/images/vehicles/toyota/`
- Create: `public/images/vehicles/lexus/`
- Create: `public/images/vehicles/mclaren/`
- Create: `public/images/categories/`
- Create: `public/images/backgrounds/`
- Create: `public/images/showroom/`
- Create: `public/images/manifest.json`

**Interfaces:**
- Consumes: none
- Produces: directory structure ready for assets, empty manifest.json

- [ ] **Step 1: Create directory structure**

- [ ] **Step 2: Create empty manifest.json**

```json
{
  "assets": [],
  "generated": "2026-11-09",
  "notes": "All assets sourced from legitimate sources with verified licensing"
}
```

- [ ] **Step 3: Commit**

---

## Task 2: Research and download hero images

**Files:**
- Create: `public/images/hero/hero-primary.webp`
- Create: `public/images/hero/hero-secondary.webp`
- Create: `public/images/hero/hero-alternative.webp`

**Interfaces:**
- Consumes: none
- Produces: 3 hero candidate images optimized to WebP, 1920x1080+, dark cinematic backgrounds

- [ ] **Step 1: Research hero image sources**

Search Unsplash/Pexels/Wikimedia for cinematic sports car photography (Porsche 911 GT3, Lamborghini Revuelto, Ferrari SF90, McLaren 750S, Mercedes-AMG GT).

- [ ] **Step 2: Download hero candidates**

Download at least 3 hero images with dark cinematic backgrounds, clear vehicle visibility, negative space for typography.

- [ ] **Step 3: Optimize hero images**

Convert to WebP, 1920x1080 minimum, preserve quality.

- [ ] **Step 4: Update manifest**

Add hero entries with source URL, license, dimensions.

- [ ] **Step 5: Typecheck + lint + build**

- [ ] **Step 6: Commit**

---

## Task 3: Research and download vehicle card images

**Files:**
- Create: `public/images/vehicles/porsche/911-carrera.webp`
- Create: `public/images/vehicles/porsche/911-gt3.webp`
- Create: `public/images/vehicles/mercedes/s-class.webp`
- Create: `public/images/vehicles/mercedes/amg-gt.webp`
- Create: `public/images/vehicles/bmw/m4.webp`
- Create: `public/images/vehicles/bmw/x7.webp`
- Create: `public/images/vehicles/ferrari/sf90.webp`
- Create: `public/images/vehicles/lamborghini/huracan.webp`
- Create: `public/images/vehicles/audi/rs7.webp`
- Create: `public/images/vehicles/toyota/land-cruiser.webp`
- Create: `public/images/vehicles/lexus/lx.webp`
- Create: `public/images/vehicles/mclaren/750s.webp`

**Interfaces:**
- Consumes: none
- Produces: 12 vehicle card images (1000x750 WebP), each matching manufacturer and model

- [ ] **Step 1: Research vehicle image sources**

Find model-accurate photography for each demo vehicle from legitimate sources.

- [ ] **Step 2: Download vehicle images**

Download front three-quarter shots with clean vehicle visibility for each demo vehicle.

- [ ] **Step 3: Optimize vehicle images**

Convert to WebP, 1000x750, consistent proportions.

- [ ] **Step 4: Update manifest**

Add vehicle entries with manufacturer, model, source URL, license, dimensions.

- [ ] **Step 5: Typecheck + lint + build**

- [ ] **Step 6: Commit**

---

## Task 4: Research and download vehicle detail gallery images

**Files:**
- Create: `public/images/vehicles/{manufacturer}/{model}-front.webp`
- Create: `public/images/vehicles/{manufacturer}/{model}-rear.webp`
- Create: `public/images/vehicles/{manufacturer}/{model}-side.webp`
- Create: `public/images/vehicles/{manufacturer}/{model}-interior.webp`
- Create: `public/images/vehicles/{manufacturer}/{model}-dashboard.webp`

**Interfaces:**
- Consumes: none
- Produces: 5 images per demo vehicle (60 total), 1600x1200 WebP

- [ ] **Step 1: Research detail gallery sources**

Find multiple angles (front, rear, side, interior, dashboard) for each demo vehicle.

- [ ] **Step 2: Download detail images**

Download 5 angles per vehicle from legitimate sources.

- [ ] **Step 3: Optimize detail images**

Convert to WebP, 1600x1200 minimum.

- [ ] **Step 4: Update manifest**

Add detail gallery entries.

- [ ] **Step 5: Typecheck + lint + build**

- [ ] **Step 6: Commit**

---

## Task 5: Research and download category images

**Files:**
- Create: `public/images/categories/supercars.webp`
- Create: `public/images/categories/sports-cars.webp`
- Create: `public/images/categories/luxury-suvs.webp`
- Create: `public/images/categories/luxury-sedans.webp`
- Create: `public/images/categories/electric-vehicles.webp`
- Create: `public/images/categories/hybrid-vehicles.webp`
- Create: `public/images/categories/classic-cars.webp`

**Interfaces:**
- Consumes: none
- Produces: 7 category images (1400x1000 WebP), each communicating the category immediately

- [ ] **Step 1: Research category sources**

Find category-representative automotive photography.

- [ ] **Step 2: Download category images**

Download 7 images, one per category.

- [ ] **Step 3: Optimize category images**

Convert to WebP, 1400x1000.

- [ ] **Step 4: Update manifest**

Add category entries.

- [ ] **Step 5: Typecheck + lint + build**

- [ ] **Step 6: Commit**

---

## Task 6: Research and download background images

**Files:**
- Create: `public/images/backgrounds/showroom.webp`
- Create: `public/images/backgrounds/cinematic-dark.webp`
- Create: `public/images/backgrounds/performance.webp`

**Interfaces:**
- Consumes: none
- Produces: 3 background images for showroom sections

- [ ] **Step 1: Research background sources**

Find luxury showroom architecture, dark studio environments, performance driving scenes.

- [ ] **Step 2: Download background images**

Download 3 background images.

- [ ] **Step 3: Optimize background images**

Convert to WebP, dark compositions supporting readable typography.

- [ ] **Step 4: Update manifest**

Add background entries.

- [ ] **Step 5: Typecheck + lint + build**

- [ ] **Step 6: Commit**

---

## Task 7: Integrate images into components

**Files:**
- Modify: `apps/web/src/components/showroom/vehicle-card.tsx`
- Modify: `apps/web/src/components/showroom/vehicle-gallery.tsx`
- Modify: `apps/web/src/components/showroom/hero.tsx`
- Modify: `apps/web/src/components/showroom/hero-background.tsx`
- Modify: `apps/web/src/app/(public)/category/[slug]/page.tsx`

**Interfaces:**
- Consumes: image paths from public/images/
- Produces: components using real images with Next.js Image, skeletons as fallbacks

- [ ] **Step 1: Update hero to use real image**

Replace skeleton with actual hero image from public/images/hero/

- [ ] **Step 2: Update vehicle card to use real image**

Replace skeleton with actual vehicle image from public/images/vehicles/

- [ ] **Step 3: Update vehicle gallery to use real images**

Use downloaded detail images with next/image.

- [ ] **Step 4: Update category page to use real image**

Use downloaded category image as hero background.

- [ ] **Step 5: Typecheck + lint + build**

- [ ] **Step 6: Commit**

---

## Task 8: Finalize asset manifest

**Files:**
- Modify: `public/images/manifest.json`

**Interfaces:**
- Consumes: all asset entries from Tasks 2-7
- Produces: complete manifest with all assets documented

- [ ] **Step 1: Complete manifest entries**

Add all downloaded assets with filename, manufacturer, model, category, source, sourceUrl, license, dimensions, download date.

- [ ] **Step 2: Verify manifest**

Ensure every image in public/images/ has a manifest entry.

- [ ] **Step 3: Typecheck + lint + build**

- [ ] **Step 4: Commit**

---

## Self-Review

**1. Spec coverage:** Every Phase E requirement mapped:
- Image research from legitimate sources → Tasks 2-6
- Directory structure → Task 1
- Image optimization (WebP) → Tasks 2-6
- Asset manifest → Tasks 2-7, finalized Task 8
- Image integration → Task 7
- Fallbacks (skeletons) → already in place from Phase B

**2. Step scan:** Each step produces one checkable result.

**3. Type consistency:** Image paths used consistently across components.

**4. Review Focus:** All failure modes addressed:
- Model-accurate photography → verified in research step
- No hotlinking → all downloaded locally
- License documented → manifest entries
- Missing images → skeleton fallbacks already exist
- Responsive sizes → WebP optimization

**5. Proportion:** 8 tasks for Phase E scope.

---

Plan complete and saved to `docs/superpowers/plans/2026-11-09-phase-e-content-assets.md`.

Please review the plan. Does it capture what you want for Phase E — Content & Assets?

**Execution approach:** Native — I'll handle the research, download, and optimization myself. Image downloads require web access which I have via webfetch/websearch. I'll run typecheck, lint, build, and tests before each commit, then push to your GitHub repo at the end of the phase.
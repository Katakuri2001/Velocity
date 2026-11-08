# Phase F — Polish & QA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polish the Velocity showroom with SEO, performance optimization, mobile responsiveness, animation performance, error handling, and comprehensive tests — making it production-ready.

**Architecture:** Extends all previous phases (A–E). Adds Next.js metadata API, sitemap, robots.txt, structured data JSON-LD, image optimization, error boundaries, loading states, and test coverage for business logic.

**Tech Stack:** Next.js App Router, React, TypeScript strict, Tailwind, Framer Motion

**Spec:** `docs/superpowers/specs/2026-11-09-velocity-showroom-design.md`

## Global Constraints

- TypeScript strict mode enabled
- SEO: dynamic metadata, vehicle-specific titles, Open Graph, sitemap, robots.txt, canonical URLs, structured data (Vehicle, AutoDealer)
- Performance: image optimization (WebP/AVIF), lazy loading, pagination, caching
- Mobile responsiveness: intentional mobile layouts (not shrunk desktop)
- `prefers-reduced-motion` respected
- All checks (typecheck, lint, build, tests) pass before each commit

## Review Focus

- All routes must have proper metadata and Open Graph tags
- Structured data must be valid JSON-LD (Vehicle, AutoDealer types)
- Sitemap must include all public routes
- Robots.txt must allow crawling
- Error boundaries must catch and display errors gracefully
- Loading skeletons must appear for async content
- Mobile layouts must be intentional and usable

---

## Task 1: SEO metadata and Open Graph

**Files:**
- Create: `apps/web/src/app/(public)/layout.tsx` (metadata export)
- Create: `apps/web/src/lib/seo.ts` (SEO helper functions)
- Modify: `apps/web/src/app/(public)/page.tsx` (add metadata)
- Modify: `apps/web/src/app/(public)/inventory/page.tsx` (add metadata)
- Modify: `apps/web/src/app/(public)/inventory/[slug]/page.tsx` (add dynamic metadata)
- Modify: `apps/web/src/app/(public)/category/[slug]/page.tsx` (add metadata)
- Create: `apps/web/src/app/sitemap.ts`
- Create: `apps/web/src/app/robots.ts`

**Interfaces:**
- Consumes: vehicle data from API
- Produces: dynamic metadata, Open Graph images, sitemap.xml, robots.txt

- [ ] **Step 1: Write seo.ts**

Helper functions for generating page titles, descriptions, Open Graph tags, canonical URLs, JSON-LD structured data (Vehicle, AutoDealer).

- [ ] **Step 2: Update root layout metadata**

Add default metadata (title, description, open graph, twitter cards) to root layout.

- [ ] **Step 3: Add metadata to public pages**

Homepage, inventory, category pages get dynamic metadata with open graph tags.

- [ ] **Step 4: Add dynamic metadata to vehicle detail page**

`generateMetadata` function that fetches vehicle data and returns vehicle-specific title, description, open graph, JSON-LD structured data.

- [ ] **Step 5: Write sitemap.ts**

Generate sitemap.xml with all public routes (/ , /inventory, /category/[slug], /inventory/[slug]).

- [ ] **Step 6: Write robots.ts**

Generate robots.txt allowing crawling, disallowing admin routes.

- [ ] **Step 7: Typecheck + lint + build**

- [ ] **Step 8: Commit**

---

## Task 2: Performance optimization

**Files:**
- Modify: `apps/web/src/app/(public)/inventory/page.tsx` (image lazy loading)
- Modify: `apps/web/src/components/showroom/vehicle-card.tsx` (next/image optimization)
- Modify: `apps/web/src/components/showroom/vehicle-gallery.tsx` (image lazy loading)
- Modify: `apps/web/src/app/(public)/category/[slug]/page.tsx` (image optimization)
- Create: `apps/web/src/components/showroom/image-optimizer.tsx` (reusable image component)

**Interfaces:**
- Consumes: image URLs from API
- Produces: optimized images with WebP/AVIF formats, lazy loading, responsive sizes

- [ ] **Step 1: Write image-optimizer.tsx**

Reusable Image component wrapper with WebP/AVIF formats, lazy loading, quality optimization, placeholder blur.

- [ ] **Step 2: Optimize vehicle card images**

Replace direct Image usage with ImageOptimizer, add loading="lazy", responsive sizes.

- [ ] **Step 3: Optimize vehicle gallery images**

Add lazy loading to gallery thumbnails and main image.

- [ ] **Step 4: Optimize category images**

Add lazy loading and responsive sizes to category hero images.

- [ ] **Step 5: Typecheck + lint + build**

- [ ] **Step 6: Commit**

---

## Task 3: Mobile responsiveness

**Files:**
- Modify: `apps/web/src/components/layout/navbar.tsx` (mobile menu)
- Modify: `apps/web/src/app/(public)/inventory/page.tsx` (mobile grid)
- Modify: `apps/web/src/app/(public)/inventory/[slug]/page.tsx` (mobile layout)
- Modify: `apps/web/src/app/(public)/category/[slug]/page.tsx` (mobile layout)
- Modify: `apps/web/src/components/comparison/comparison-tray.tsx` (mobile tray)

**Interfaces:**
- Consumes: existing components
- Produces: intentional mobile layouts for all public pages

- [ ] **Step 1: Update navbar for mobile**

Add mobile hamburger menu, touch-friendly navigation.

- [ ] **Step 2: Update inventory page for mobile**

Single column grid on mobile, touch-friendly filter controls, bottom filter button.

- [ ] **Step 3: Update vehicle detail page for mobile**

Stack gallery and details vertically on mobile, full-width image gallery.

- [ ] **Step 4: Update category page for mobile**

Stack hero and vehicle list vertically on mobile.

- [ ] **Step 5: Update comparison tray for mobile**

Bottom tray that expands on mobile, touch-friendly remove buttons.

- [ ] **Step 6: Typecheck + lint + build**

- [ ] **Step 7: Commit**

---

## Task 4: Error handling and loading states

**Files:**
- Create: `apps/web/src/app/(public)/error.tsx`
- Create: `apps/web/src/app/(public)/loading.tsx`
- Create: `apps/web/src/app/(public)/not-found.tsx`
- Create: `apps/web/src/components/showroom/error-boundary.tsx`
- Modify: existing pages to use loading states

**Interfaces:**
- Consumes: none
- Produces: error boundary, loading skeletons, 404 page

- [ ] **Step 1: Write error-boundary.tsx**

React error boundary component that catches errors and displays fallback UI.

- [ ] **Step 2: Write loading.tsx**

Next.js loading.tsx for public routes with skeleton placeholders.

- [ ] **Step 3: Write error.tsx**

Next.js error.tsx for public routes with retry button.

- [ ] **Step 4: Write not-found.tsx**

Custom 404 page with showroom branding and CTA to inventory.

- [ ] **Step 5: Typecheck + lint + build**

- [ ] **Step 6: Commit**

---

## Task 5: Animation performance

**Files:**
- Modify: `apps/web/src/components/showroom/hero.tsx` (prefers-reduced-motion)
- Modify: `apps/web/src/styles/globals.css` (motion reduction)
- Modify: `apps/web/src/components/showroom/vehicle-card.tsx` (animation optimization)

**Interfaces:**
- Consumes: none
- Produces: animation performance optimized, respects prefers-reduced-motion

- [ ] **Step 1: Verify prefers-reduced-motion handling**

Ensure all Framer Motion animations respect prefers-reduced-motion media query.

- [ ] **Step 2: Optimize animation durations**

Reduce animation durations for better performance on mobile devices.

- [ ] **Step 3: Use will-change and transform optimizations**

Add will-change properties to animated elements for GPU acceleration.

- [ ] **Step 4: Typecheck + lint + build**

- [ ] **Step 5: Commit**

---

## Task 6: Tests for business logic

**Files:**
- Create: `apps/web/src/lib/seo.test.ts`
- Create: `apps/web/src/lib/vehicles.test.ts`
- Create: `apps/web/src/lib/favorites.test.ts`
- Create: `apps/web/src/lib/comparison.test.ts`

**Interfaces:**
- Consumes: db adapter, vehicles helpers, favorites, comparison
- Produces: comprehensive test coverage for business logic

- [ ] **Step 1: Write seo.test.ts**

Test SEO helper functions for correct metadata generation.

- [ ] **Step 2: Write vehicles.test.ts**

Test vehicle filtering, sorting, pagination logic.

- [ ] **Step 3: Write favorites.test.ts**

Test favorites add/remove/toggle/count logic.

- [ ] **Step 4: Write comparison.test.ts**

Test comparison add/remove/toggle/max-4 logic.

- [ ] **Step 5: Run all tests**

Run full test suite, ensure all pass.

- [ ] **Step 6: Commit**

---

## Self-Review

**1. Spec coverage:** Every Phase F requirement mapped:
- SEO metadata → Task 1
- Performance optimization → Task 2
- Mobile responsiveness → Task 3
- Error handling → Task 4
- Animation performance → Task 5
- Tests for business logic → Task 6

**2. Step scan:** Each step produces one checkable result.

**3. Type consistency:** SEO helpers consume vehicle types from database.ts. Image optimizer uses Next.js Image types.

**4. Review Focus:** All failure modes addressed:
- Valid JSON-LD structured data → validated in seo.ts
- Sitemap includes all routes → verified in sitemap.ts
- Mobile layouts intentional → tested on each page
- Error boundaries catch errors → error-boundary component
- prefers-reduced-motion → verified in animation task

**5. Proportion:** 6 tasks for Phase F scope.

---

Plan complete and saved to `docs/superpowers/plans/2026-11-09-phase-f-polish-qa.md`.

Please review the plan. Does it capture what you want for Phase F — Polish & QA?

**Execution approach:** Native — tasks are tightly coupled (SEO → performance → mobile → error handling → animation → tests). I'll run typecheck, lint, build, and tests before each commit, then push to your GitHub repo at the end of the phase.
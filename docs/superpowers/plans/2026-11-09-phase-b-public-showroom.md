# Phase B — Public Showroom Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the public vehicle discovery experience — inventory listing with filters/sorting/pagination, vehicle detail page with gallery and specs, and category pages.

**Architecture:** Extends Phase A foundation. Server-side API routes fetch from the local DB adapter (swapable to D1). Client components use Framer Motion for reveals and glass interactions. Route groups: `(public)` for public pages.

**Tech Stack:** Next.js App Router, React, TypeScript strict, Tailwind, Framer Motion, lucide-react

**Spec:** `docs/superpowers/specs/2026-11-09-velocity-showroom-design.md`

## Global Constraints

- TypeScript strict mode enabled
- No Prisma, no PostgreSQL — D1-compatible raw SQL via local adapter (Phase A `db.ts`)
- Primary background: `#08090B`; Secondary background: `#101216`
- Elevated surface: `rgba(255,255,255,0.055)`; Glass border: `rgba(255,255,255,0.12)`
- Primary text: `#F5F5F5`; Secondary text: `#A3A6AC`
- Accent: champagne silver + electric blue
- Liquid glass applied selectively — photography remains the focus
- `prefers-reduced-motion` respected
- Demo data flagged with `is_demo = true`
- All checks (typecheck, lint, build, tests) pass before each commit

## Review Focus

- Missing vehicle images must not break layout — use Skeleton fallback
- Filter state must persist in URL query params
- Sort controls must work against real inventory data
- Empty states must render gracefully (no vehicles found)
- 404 for non-existent vehicle slugs
- Image aspect ratios consistent across cards

---

## Task 1: Vehicle data layer (API routes + types)

**Files:**
- Create: `apps/web/src/app/api/vehicles/route.ts`
- Create: `apps/web/src/app/api/vehicles/[slug]/route.ts`
- Create: `apps/web/src/app/api/manufacturers/route.ts`
- Create: `apps/web/src/app/api/categories/route.ts`
- Create: `apps/web/src/lib/vehicles.ts` (helper functions)

**Interfaces:**
- Consumes: `db` from `apps/web/src/lib/db.ts`, types from `apps/web/src/types/database.ts`
- Produces: GET `/api/vehicles` (list with filters), GET `/api/vehicles/[slug]` (single), GET `/api/manufacturers`, GET `/api/categories`

- [ ] **Step 1: Write vehicles API list route**

`GET /api/vehicles?manufacturer=&category=&availability=&minPrice=&maxPrice=&sort=&page=&limit=` — queries vehicles table, applies filters, returns paginated results with count.

- [ ] **Step 2: Write vehicles API detail route**

`GET /api/vehicles/[slug]` — fetches single vehicle with its images and specifications. Returns 404 if not found.

- [ ] **Step 3: Write manufacturers API route**

`GET /api/manufacturers` — lists active manufacturers with vehicle counts.

- [ ] **Step 4: Write categories API route**

`GET /api/categories` — lists active categories.

- [ ] **Step 5: Write vehicle helper functions**

`getVehicleBySlug(slug)`, `getFilteredVehicles(filters)`, `getRelatedVehicles(vehicle)` in `apps/web/src/lib/vehicles.ts`.

- [ ] **Step 6: Typecheck + lint + build**

Run: `npx tsc --noEmit && npx eslint . && npm run build`

- [ ] **Step 7: Commit**

```bash
git add apps/web/src/app/api/ apps/web/src/lib/vehicles.ts
git commit -m "feat: vehicle data API routes and helpers"
```

---

## Task 2: Vehicle card component (with liquid glass hover)

**Files:**
- Create: `apps/web/src/components/showroom/vehicle-card.tsx`
- Create: `apps/web/src/components/showroom/vehicle-card-skeleton.tsx`

**Interfaces:**
- Consumes: `Vehicle`, `VehicleImage` types; `Card`, `Button`, `GlassPanel`, `Skeleton` from UI primitives; Framer Motion
- Produces: `VehicleCard` component with image hover scale, glass info panel, action buttons (view, favorite, compare)

- [ ] **Step 1: Write vehicle-card-skeleton.tsx**

`VehicleCardSkeleton` — loading placeholder matching card dimensions.

- [ ] **Step 2: Write vehicle-card.tsx**

`VehicleCard({ vehicle })` — image with hover scale (Framer Motion `whileHover`), glass info panel revealing on hover, price, year, mileage, transmission, fuel, favorite button, compare button, view details link.

- [ ] **Step 3: Verify card renders with mock data**

Quick render test or dev server check.

- [ ] **Step 4: Typecheck + lint + build**

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/components/showroom/vehicle-card.tsx apps/web/src/components/showroom/vehicle-card-skeleton.tsx
git commit -m "feat: vehicle card component with liquid glass hover"
```

---

## Task 3: Inventory page with filters and sorting

**Files:**
- Create: `apps/web/src/app/(public)/inventory/page.tsx`
- Create: `apps/web/src/components/inventory/filter-sidebar.tsx`
- Create: `apps/web/src/components/inventory/vehicle-grid.tsx`
- Create: `apps/web/src/components/inventory/vehicle-list.tsx`
- Create: `apps/web/src/components/inventory/sort-controls.tsx`
- Create: `apps/web/src/components/inventory/view-mode-toggle.tsx`

**Interfaces:**
- Consumes: `VehicleCard`, API routes from Task 1, `Button`, `GlassPanel` from UI primitives
- Produces: `/inventory` page with filter sidebar, vehicle grid/list, sort controls, pagination, result count

- [ ] **Step 1: Write inventory page shell**

Fetch vehicles on load, manage filter/sort state in URL query params, render grid or list view.

- [ ] **Step 2: Write filter sidebar**

Manufacturer multi-select, condition, body type, price range, year, mileage, transmission, fuel, availability filters. Clear-all functionality.

- [ ] **Step 3: Write vehicle grid and list views**

Grid (premium) and compact list modes using `VehicleCard`.

- [ ] **Step 4: Write sort controls**

Latest arrivals, price low-high, price high-low, newest year, lowest mileage, highest horsepower.

- [ ] **Step 5: Write view mode toggle**

Switch between grid and list, persist preference.

- [ ] **Step 6: Add pagination**

Load-more or page-based pagination with result counts.

- [ ] **Step 7: Typecheck + lint + build**

- [ ] **Step 8: Commit**

```bash
git add apps/web/src/app/(public)/inventory/ apps/web/src/components/inventory/
git commit -m "feat: inventory page with filters, sorting, pagination"
```

---

## Task 4: Vehicle detail page

**Files:**
- Create: `apps/web/src/app/(public)/inventory/[slug]/page.tsx`
- Create: `apps/web/src/components/showroom/vehicle-gallery.tsx`
- Create: `apps/web/src/components/showroom/vehicle-identity.tsx`
- Create: `apps/web/src/components/showroom/vehicle-specifications.tsx`
- Create: `apps/web/src/components/showroom/vehicle-features.tsx`
- Create: `apps/web/src/components/showroom/vehicle-enquiry-panel.tsx`
- Create: `apps/web/src/components/showroom/related-vehicles.tsx`

**Interfaces:**
- Consumes: `GET /api/vehicles/[slug]` API, `Vehicle`, `VehicleImage`, `VehicleSpecification` types; Framer Motion, glass components
- Produces: `/inventory/[slug]` with image gallery, identity, specifications table, features, related vehicles, enquiry panel

- [ ] **Step 1: Write vehicle gallery**

Main image + thumbnails, next/prev navigation, image counter, full-screen viewing placeholder, Framer Motion transitions.

- [ ] **Step 2: Write vehicle identity**

Manufacturer, model, variant, year, condition, price, availability, stock number. Primary actions: Enquire, Book test drive, Add to favorites, Compare.

- [ ] **Step 3: Write vehicle specifications**

Engine, performance, transmission, vehicle, dimensions sections. EAV-based specs from `vehicle_specifications`. Only show available fields.

- [ ] **Step 4: Write vehicle features**

Categories: Exterior, Interior, Safety, Technology, Comfort, Performance.

- [ ] **Step 5: Write vehicle enquiry panel**

Premium form: name, phone, email, preferred contact, message, test drive checkbox.

- [ ] **Step 6: Write related vehicles**

Same manufacturer, similar price, same body type. Render as horizontal scroll.

- [ ] **Step 7: Assemble detail page**

Fetch vehicle by slug, 404 if not found, compose all sections. Respect `prefers-reduced-motion`.

- [ ] **Step 8: Typecheck + lint + build**

- [ ] **Step 9: Commit**

```bash
git add apps/web/src/app/(public)/inventory/[slug]/ apps/web/src/components/showroom/vehicle-gallery.tsx apps/web/src/components/showroom/vehicle-identity.tsx apps/web/src/components/showroom/vehicle-specifications.tsx apps/web/src/components/showroom/vehicle-features.tsx apps/web/src/components/showroom/vehicle-enquiry-panel.tsx apps/web/src/components/showroom/related-vehicles.tsx
git commit -m "feat: vehicle detail page with gallery, specs, features, enquiry"
```

---

## Task 5: Category pages

**Files:**
- Create: `apps/web/src/app/(public)/category/[slug]/page.tsx`
- Create: `apps/web/src/components/showroom/category-hero.tsx`
- Create: `apps/web/src/components/showroom/category-vehicle-list.tsx`

**Interfaces:**
- Consumes: `GET /api/categories`, `GET /api/vehicles` API, `VehicleCard`
- Produces: `/category/[slug]` with category hero image, title, description, vehicle count, filtered vehicle list

- [ ] **Step 1: Write category hero**

Large automotive photography, category title, description, vehicle count.

- [ ] **Step 2: Write category vehicle list**

Vehicles filtered by category, using `VehicleCard`, with pagination.

- [ ] **Step 3: Assemble category page**

Fetch category by slug, 404 if not found, render hero + vehicle list.

- [ ] **Step 4: Typecheck + lint + build**

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/app/(public)/category/ apps/web/src/components/showroom/category-hero.tsx apps/web/src/components/showroom/category-vehicle-list.tsx
git commit -m "feat: category pages with hero and vehicle list"
```

---

## Task 6: Demo data seed (clearly marked as demo)

**Files:**
- Create: `apps/web/scripts/seed-demo.ts`
- Create: `apps/web/src/lib/seed-data.ts`

**Interfaces:**
- Consumes: `db` from `apps/web/src/lib/db.ts`
- Produces: Seed script that inserts demo manufacturers, categories, vehicles (with `is_demo = 1`), images, and specifications

- [ ] **Step 1: Write seed data**

Realistic demo vehicles: Porsche 911 Carrera, Mercedes-Benz S-Class, BMW M4, Ferrari SF90, Lamborghini Huracan, Audi RS7, Toyota Land Cruiser, Lexus LX, McLaren 750S. All with `is_demo = 1`.

- [ ] **Step 2: Write seed script**

Insert manufacturers, categories, vehicles, images, specifications into local DB.

- [ ] **Step 3: Run seed script**

Verify data is inserted and queryable.

- [ ] **Step 4: Typecheck + lint + build**

- [ ] **Step 5: Commit**

```bash
git add apps/web/scripts/seed-demo.ts apps/web/src/lib/seed-data.ts
git commit -m "feat: demo data seed script (clearly marked as demo)"
```

---

## Self-Review

**1. Spec coverage:** Every Phase B requirement mapped:
- Inventory page with filters/sorting/pagination → Tasks 1, 3
- Vehicle detail page with gallery/specs/features/enquiry → Task 4
- Category pages → Task 5
- Demo data seed → Task 6
- Vehicle data API → Task 1
- Vehicle card component → Task 2

**2. Step scan:** Each step produces one checkable result. No step carries more than one action.

**3. Type consistency:** Types from Phase A (`database.ts`) consumed by Task 1. `VehicleCard` from Task 2 consumed by Tasks 3 and 5. API routes from Task 1 consumed by Tasks 3, 4, 5.

**4. Review Focus:** All failure modes addressed:
- Missing images → Skeleton fallback in vehicle card
- Filter state in URL → Task 3 uses URL query params
- Empty states → handled in inventory page
- 404 for missing slugs → Tasks 4 and 5
- Consistent aspect ratios → vehicle card enforces dimensions

**5. Proportion:** Plan is proportionate to Phase B scope — 6 tasks.

---

Plan complete and saved to `docs/superpowers/plans/2026-11-09-phase-b-public-showroom.md`.

Please review the plan. Does it capture what you want for Phase B — Public Showroom Core?

**Execution approach:** Native (I implement every task myself). Tasks are tightly coupled (API → components → pages → seed data), so Native is most efficient. I'll run typecheck, lint, build, and tests before each commit, then push to your GitHub repo at the end of the phase.
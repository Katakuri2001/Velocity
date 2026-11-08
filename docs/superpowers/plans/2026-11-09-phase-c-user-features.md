# Phase C — User Features Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build user-facing features — favorites (localStorage), vehicle comparison tray (up to 4, localStorage), enquiry form submission, and test drive booking form.

**Architecture:** Client-side state with localStorage persistence. API routes for submitting enquiries and test drive requests. Extends Phase A (auth, DB) and Phase B (vehicles, inventory).

**Tech Stack:** Next.js App Router, React, TypeScript strict, Tailwind, Framer Motion, lucide-react

**Spec:** `docs/superpowers/specs/2026-11-09-velocity-showroom-design.md`

## Global Constraints

- TypeScript strict mode enabled
- LocalStorage persistence for guests (no account required)
- Up to 4 vehicles in comparison
- Favorites persist across sessions for guest users
- Enquiry and test drive submissions stored in DB (enquiries, test_drive_requests tables)
- `prefers-reduced-motion` respected
- All checks (typecheck, lint, build, tests) pass before each commit

## Review Focus

- Comparison tray must not exceed 4 vehicles
- localStorage must handle missing/corrupt data gracefully
- Empty states for favorites and comparison pages
- Form validation before submission
- Submission status feedback (success/error)
- Comparison highlights differences between vehicles

---

## Task 1: Favorites system (localStorage)

**Files:**
- Create: `apps/web/src/lib/favorites.ts`
- Create: `apps/web/src/components/favorites/favorites-provider.tsx`
- Create: `apps/web/src/components/favorites/use-favorites.ts`
- Create: `apps/web/src/components/favorites/favorite-button.tsx`

**Interfaces:**
- Consumes: none
- Produces: `favoritesProvider`, `useFavorites()` hook (add, remove, toggle, isFavorited, getAll, count), `FavoriteButton` component

- [ ] **Step 1: Write favorites.ts**

localStorage utility: `getFavorites(): string[]`, `addFavorite(vehicleId: string)`, `removeFavorite(vehicleId: string)`, `toggleFavorite(vehicleId: string)`, `isFavorite(vehicleId: string)`, `clearFavorites()`. Handle missing localStorage (SSR) and corrupt JSON gracefully.

- [ ] **Step 2: Write favorites-provider.tsx**

React context provider exposing favorites state to client components.

- [ ] **Step 3: Write use-favorites.ts**

Hook wrapping context with typed methods.

- [ ] **Step 4: Write favorite-button.tsx**

`FavoriteButton({ vehicleId, isFavorited, size? })` — heart icon, toggles favorite state, Framer Motion animation on click.

- [ ] **Step 5: Typecheck + lint + build**

- [ ] **Step 6: Commit**

---

## Task 2: Favorites page

**Files:**
- Create: `apps/web/src/app/(public)/favorites/page.tsx`
- Create: `apps/web/src/components/favorites/favorites-empty.tsx`

**Interfaces:**
- Consumes: `useFavorites()` hook, `VehicleCard`, `GET /api/vehicles` API
- Produces: `/favorites` page showing user's favorited vehicles

- [ ] **Step 1: Write favorites-empty.tsx**

Empty state with CTA to browse inventory.

- [ ] **Step 2: Write favorites page**

Fetch favorited vehicle IDs from localStorage, fetch vehicle details from API, render as grid. Empty state when no favorites.

- [ ] **Step 3: Typecheck + lint + build**

- [ ] **Step 4: Commit**

---

## Task 3: Comparison system (localStorage)

**Files:**
- Create: `apps/web/src/lib/comparison.ts`
- Create: `apps/web/src/components/comparison/comparison-provider.tsx`
- Create: `apps/web/src/components/comparison/use-comparison.ts`
- Create: `apps/web/src/components/comparison/compare-button.tsx`
- Create: `apps/web/src/components/comparison/comparison-tray.tsx`

**Interfaces:**
- Consumes: none
- Produces: `useComparison()` hook (add, remove, toggle, isCompared, getAll, count, clear), `CompareButton`, `ComparisonTray` (floating, shows up to 4 selected vehicles)

- [ ] **Step 1: Write comparison.ts**

localStorage utility for comparison: `getComparison(): string[]`, `addToComparison(vehicleId: string)`, `removeFromComparison(vehicleId: string)`, `isCompared(vehicleId: string)`, `clearComparison()`. Max 4 vehicles.

- [ ] **Step 2: Write comparison-provider.tsx**

React context provider.

- [ ] **Step 3: Write use-comparison.ts**

Hook wrapping context.

- [ ] **Step 4: Write compare-button.tsx**

`CompareButton({ vehicleId, isCompared, size? })` — toggles comparison selection, disabled when at max 4 and not already selected.

- [ ] **Step 5: Write comparison-tray.tsx**

Floating tray at bottom of screen showing compared vehicles (thumbnail, model, price, remove button). "View comparison" link.

- [ ] **Step 6: Typecheck + lint + build**

- [ ] **Step 7: Commit**

---

## Task 4: Comparison page

**Files:**
- Create: `apps/web/src/app/(public)/compare/page.tsx`
- Create: `apps/web/src/components/comparison/comparison-table.tsx`
- Create: `apps/web/src/components/comparison/comparison-empty.tsx`

**Interfaces:**
- Consumes: `useComparison()` hook, `GET /api/vehicles/[slug]` API
- Produces: `/compare` page with side-by-side technical comparison table, highlights differences

- [ ] **Step 1: Write comparison-empty.tsx**

Empty state when no vehicles selected.

- [ ] **Step 2: Write comparison-table.tsx**

Technical comparison table: Manufacturer, Model, Year, Price, Mileage, Engine, Horsepower, Torque, Acceleration, Top speed, Transmission, Fuel type, Drivetrain, Condition. Highlights differing values.

- [ ] **Step 3: Write compare page**

Fetch compared vehicle details, render table, allow removing vehicles, clear all.

- [ ] **Step 4: Typecheck + lint + build**

- [ ] **Step 5: Commit**

---

## Task 5: Enquiry form submission

**Files:**
- Create: `apps/web/src/app/api/enquiries/route.ts`
- Create: `apps/web/src/components/enquiry/enquiry-form.tsx`

**Interfaces:**
- Consumes: `db` from Phase A, `enquiries` table
- Produces: `POST /api/enquiries` API route, `EnquiryForm` component

- [ ] **Step 1: Write enquiries API route**

`POST /api/enquiries` — validates fields (name, email, phone, message, vehicle_id, preferred_contact), inserts into `enquiries` table with status 'new', writes audit log. Returns success/error.

- [ ] **Step 2: Write enquiry-form.tsx**

`EnquiryForm({ vehicleId? })` — form with name, phone, email, preferred contact, message, test drive checkbox. Validation, submission feedback.

- [ ] **Step 3: Typecheck + lint + build**

- [ ] **Step 4: Commit**

---

## Task 6: Test drive booking form

**Files:**
- Create: `apps/web/src/app/api/test-drives/route.ts`
- Create: `apps/web/src/components/test-drive/test-drive-form.tsx`

**Interfaces:**
- Consumes: `db` from Phase A, `test_drive_requests` table
- Produces: `POST /api/test-drives` API route, `TestDriveForm` component

- [ ] **Step 1: Write test drives API route**

`POST /api/test-drives` — validates fields (name, email, phone, vehicle_id, preferred_date, preferred_time), inserts into `test_drive_requests` table with status 'pending', writes audit log. Returns success/error.

- [ ] **Step 2: Write test-drive-form.tsx**

`TestDriveForm({ vehicleId? })` — form with name, phone, email, preferred date, preferred time. Validation, submission feedback. Notes that appointment is not confirmed until showroom confirms.

- [ ] **Step 3: Typecheck + lint + build**

- [ ] **Step 4: Commit**

---

## Self-Review

**1. Spec coverage:** Every Phase C requirement mapped:
- Favorites (add/remove, localStorage, persistent for guests) → Task 1
- Favorites page → Task 2
- Comparison (up to 4, localStorage, persisted) → Task 3
- Comparison page with differences highlighted → Task 4
- Enquiry form submission → Task 5
- Test drive booking form → Task 6

**2. Step scan:** Each step produces one checkable result.

**3. Type consistency:** `useFavorites` and `useComparison` hooks consume localStorage utilities from Tasks 1 and 3. Comparison page consumes comparison hook from Task 3.

**4. Review Focus:** All failure modes addressed:
- Max 4 vehicles in comparison → `comparison.ts` enforces limit
- Corrupt localStorage → try/catch with fallback to empty array
- Empty states → favorites-empty, comparison-empty components
- Form validation → required fields, submission feedback
- prefers-reduced-motion → Framer Motion respects it

**5. Proportion:** 6 tasks for Phase C scope.

---

Plan complete and saved to `docs/superpowers/plans/2026-11-09-phase-c-user-features.md`.

Please review the plan. Does it capture what you want for Phase C — User Features?

**Execution approach:** Native — tasks are tightly coupled (localStorage utils → hooks → components → pages → API routes). I'll run typecheck, lint, build, and tests before each commit, then push to your GitHub repo at the end of the phase.
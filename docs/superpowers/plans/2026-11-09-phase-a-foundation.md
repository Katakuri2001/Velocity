# Phase A — Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a production-ready Next.js App Router repository with TypeScript strict mode, Tailwind CSS, Framer Motion, D1 database schema (raw SQL), local storage adapter, session-based auth skeleton, shared UI primitives, and design tokens — the foundation all later phases build on.

**Architecture:** Single Next.js app in `apps/web` with App Router. API routes are server-side and will run on Cloudflare Workers via Pages later. Database schema lives in `packages/db/migrations/` as raw SQL (D1-compatible, no Prisma). Storage and auth are behind adapter interfaces so Cloudflare (R2, Cloudflare Auth) can be swapped in later without code changes.

**Tech Stack:** Next.js 14+ (App Router), React 18+, TypeScript strict mode, Tailwind CSS, Framer Motion, better-sqlite3 (local DB adapter), lucide-react (icons), clsx + tailwind-merge (utility)

**Spec:** `docs/superpowers/specs/2026-11-09-velocity-showroom-design.md`

## Global Constraints

- TypeScript strict mode enabled (`"strict": true` in tsconfig.json)
- No Prisma, no PostgreSQL — D1-compatible raw SQL migrations only
- Cloudflare ecosystem preferred; Cloudflare bindings inactive until authentication
- Primary background: `#08090B`; Secondary background: `#101216`
- Elevated surface: `rgba(255,255,255,0.055)`; Glass border: `rgba(255,255,255,0.12)`
- Primary text: `#F5F5F5`; Secondary text: `#A3A6AC`
- Accent: champagne silver + electric blue (restrained, no excessive neon)
- Typography: Inter/Manrope (interface), Space Grotesk (technical), editorial display (headlines)
- Liquid glass applied selectively — never overwhelming photography
- `prefers-reduced-motion` respected
- Demo data flagged with `is_demo = true`; never presented as real inventory
- All 14 database entities from spec section 3

## Review Focus

- Missing `wrangler.toml` — scaffolded but inactive; must not break local dev
- Local DB adapter signature must match future D1 adapter exactly (same method names, same return types)
- Auth skeleton must expose `getSession()`, `signIn()`, `signOut()` for later Cloudflare swap
- Image import paths must work both locally (`public/images/`) and via R2 later
- `prefers-reduced-motion` media query must gate all Framer Motion animations
- Empty/missing image must not break layout — fallback component required

---

## Task 1: Repo scaffolding and core config

**Files:**
- Create: `package.json`
- Create: `next.config.js`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `tsconfig.json`
- Create: `.gitignore`
- Create: `apps/web/package.json`
- Create: `apps/web/next.config.js`
- Create: `apps/web/tailwind.config.ts`
- Create: `apps/web/postcss.config.js`
- Create: `apps/web/tsconfig.json`
- Create: `wrangler.toml` (inactive scaffold)
- Create: `README.md`

**Interfaces:**
- Consumes: none
- Produces: working `npm install` + `npm run dev` on `http://localhost:3000` showing Next.js default page

- [ ] **Step 1: Write package.json files**

```json
// Root package.json: workspaces, devDependencies (typescript, tailwindcss, postcss, autoprefixer, concurrently)
// apps/web/package.json: dependencies (next, react, react-dom, framer-motion, lucide-react, clsx, tailwind-merge, better-sqlite3)
```

- [ ] **Step 2: Write Next.js, Tailwind, PostCSS, TypeScript configs**

Tailwind config includes custom design tokens (colors, fonts, animation) per spec section 4.

- [ ] **Step 3: Write wrangler.toml scaffold**

Declares D1 database binding and R2 bucket binding but commented out / inactive until Cloudflare auth is configured.

- [ ] **Step 4: Run `npm install` and `npm run dev`**

Run: `cd /home/kkn/Projects/ksh/Velocity && npm install && cd apps/web && npm run dev`
Expected: Next.js starts on port 3000, default page loads without errors

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: repo scaffolding with Next.js, Tailwind, TypeScript, Framer Motion"
```

---

## Task 2: Design tokens and global styles

**Files:**
- Create: `apps/web/src/styles/globals.css`
- Create: `apps/web/src/lib/design-tokens.ts`
- Create: `apps/web/src/lib/cn.ts` (clsx + tailwind-merge helper)

**Interfaces:**
- Consumes: none
- Produces: exported `designTokens` object with colors, typography, spacing, motion values; `cn()` utility function

- [ ] **Step 1: Write design-tokens.ts**

Exports `colors` (primaryBg `#08090B`, secondaryBg `#101216`, elevatedSurface `rgba(255,255,255,0.055)`, glassBorder `rgba(255,255,255,0.12)`, primaryText `#F5F5F5`, secondaryText `#A3A6AC`, accentChampagne, accentElectricBlue), `fonts`, `spacing`, `borderRadius`, `motion` (easing, duration).

- [ ] **Step 2: Write globals.css**

Tailwind base styles with design tokens as CSS variables, dark background by default, `@layer base` reset, smooth scroll, `prefers-reduced-motion` handling.

- [ ] **Step 3: Write cn.ts**

```ts
export function cn(...inputs: ClassValue[]): string {
  return tailwindMerge(clsx(inputs))
}
```

- [ ] **Step 4: Verify Tailwind builds without errors**

Run: `cd apps/web && npx tailwindcss -i ./src/styles/globals.css -o ./dist/output.css --minify`
Expected: compiled CSS file generated without errors

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/styles apps/web/src/lib/cn.ts apps/web/src/lib/design-tokens.ts
git commit -m "feat: design tokens and global styles"
```

---

## Task 3: Shared UI primitives (button, card, dialog, glass)

**Files:**
- Create: `apps/web/src/components/ui/button.tsx`
- Create: `apps/web/src/components/ui/card.tsx`
- Create: `apps/web/src/components/ui/dialog.tsx`
- Create: `apps/web/src/components/ui/glass-panel.tsx`
- Create: `apps/web/src/components/ui/skeleton.tsx`

**Interfaces:**
- Consumes: `cn()` from `apps/web/src/lib/cn.ts`, design tokens from `apps/web/src/lib/design-tokens.ts`
- Produces: exported React components `Button`, `Card`, `Dialog`, `GlassPanel`, `Skeleton`

- [ ] **Step 1: Write button.tsx**

`Button({ children, variant?, size?, className?, disabled?, onClick?, ...props })` — variants: `primary` (accent electric blue), `secondary` (glass), `outline` (glass border), `ghost`; sizes: `sm`, `md`, `lg`.

- [ ] **Step 2: Write card.tsx**

`Card({ children, className?, ...props })` — glass surface with elevated background and thin border.

- [ ] **Step 3: Write dialog.tsx**

`Dialog({ open, onOpenChange, children, ...props })` — glass dialog with backdrop blur.

- [ ] **Step 4: Write glass-panel.tsx**

`GlassPanel({ children, className?, ...props })` — `backdrop-blur`, elevated surface bg, glass border, subtle gradient overlay.

- [ ] **Step 5: Write skeleton.tsx**

`Skeleton({ className?, ...props })` — animated pulse placeholder for images and text.

- [ ] **Step 6: Verify components compile and render**

Run: `cd apps/web && npx tsc --noEmit`
Expected: no TypeScript errors

- [ ] **Step 7: Commit**

```bash
git add apps/web/src/components/ui/
git commit -m "feat: shared UI primitives (button, card, dialog, glass, skeleton)"
```

---

## Task 4: Database schema and local DB adapter

**Files:**
- Create: `packages/db/schema.sql`
- Create: `packages/db/migrations/0001_initial.sql`
- Create: `apps/web/src/lib/db.ts` (local adapter interface + implementation)
- Create: `apps/web/src/types/database.ts`

**Interfaces:**
- Consumes: none
- Produces: `db` object with methods `query<T>(sql, params?)`, `run(sql, params?)`, `get<T>(sql, params?)`; TypeScript types for all 14 entities

- [ ] **Step 1: Write database.ts entity types**

Types for all 14 entities: `User`, `Role`, `Manufacturer`, `VehicleCategory`, `Vehicle`, `VehicleImage`, `VehicleFeature`, `VehicleSpecification`, `Favorite`, `Enquiry`, `TestDriveRequest`, `HomepageContent`, `ShowroomSetting`, `AuditLog`. Include `is_demo: boolean` on vehicles.

- [ ] **Step 2: Write schema.sql**

Full DDL for all 14 tables with foreign keys, indexes, and `is_demo` column on vehicles.

- [ ] **Step 3: Write migrations/0001_initial.sql**

Same DDL split into migration format (CREATE TABLE statements in dependency order).

- [ ] **Step 4: Write db.ts local adapter**

Implements `query`, `run`, `get` using `better-sqlite3` against a local SQLite file (`apps/web/data/local.db`). Exports typed `db` object.

- [ ] **Step 5: Verify DB adapter initializes and runs a query**

Run a small script that opens the local DB, runs `SELECT 1`, closes it.
Expected: returns 1 without error

- [ ] **Step 6: Commit**

```bash
git add packages/db/ apps/web/src/lib/db.ts apps/web/src/types/database.ts
git commit -m "feat: database schema and local SQLite adapter"
```

---

## Task 5: Auth skeleton (session-based)

**Files:**
- Create: `apps/web/src/lib/auth.ts`
- Create: `apps/web/src/middleware.ts`
- Create: `apps/web/src/components/auth/session-provider.tsx`

**Interfaces:**
- Consumes: `db` from `apps/web/src/lib/db.ts`
- Produces: `getSession()`, `signIn(email, password)`, `signOut()`, `requireAuth()`, `requireRole(role)` functions; `SessionProvider` React component

- [ ] **Step 1: Write auth.ts**

Session-based auth with JWT cookies (local secret). `getSession()` reads cookie and validates. `signIn()` verifies against `users` table. `signOut()` clears cookie.

- [ ] **Step 2: Write session-provider.tsx**

React context provider exposing `session`, `login`, `logout` to client components.

- [ ] **Step 3: Write middleware.ts**

Next.js middleware that checks auth on `(admin)/*` routes and redirects unauthenticated users to `/login`.

- [ ] **Step 4: Verify auth middleware compiles**

Run: `cd apps/web && npx tsc --noEmit`
Expected: no TypeScript errors

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/lib/auth.ts apps/web/src/middleware.ts apps/web/src/components/auth/
git commit -m "feat: session-based auth skeleton with RBAC middleware"
```

---

## Task 6: App shell layout and navigation

**Files:**
- Create: `apps/web/src/app/layout.tsx`
- Create: `apps/web/src/app/page.tsx`
- Create: `apps/web/src/components/layout/navbar.tsx`
- Create: `apps/web/src/components/layout/footer.tsx`
- Create: `apps/web/src/components/layout/shell.tsx`

**Interfaces:**
- Consumes: `SessionProvider` from auth task, `GlassPanel`, `Button`, `Card` from UI primitives
- Produces: root layout with `SessionProvider`, navbar (floating glass), footer, shell wrapper

- [ ] **Step 1: Write layout.tsx**

Root layout with `SessionProvider`, `Shell` component, metadata defaults, `inter` and `spaceGrotesk` fonts loaded.

- [ ] **Step 2: Write navbar.tsx**

Floating glass navigation with showroom logo, nav links (Home, Inventory, Compare, Favorites), auth actions (Login/Signup), mobile hamburger menu.

- [ ] **Step 3: Write shell.tsx**

Page wrapper with secondary background, min-height, container constraints.

- [ ] **Step 4: Write page.tsx placeholder**

Homepage placeholder rendering "Velocity — Showroom coming soon" with hero background color.

- [ ] **Step 5: Write footer.tsx**

Simple footer with showroom info and links.

- [ ] **Step 6: Run dev server and verify page loads**

Run: `cd apps/web && npm run dev`
Expected: `http://localhost:3000` renders shell with navbar and placeholder page

- [ ] **Step 7: Commit**

```bash
git add apps/web/src/app/ apps/web/src/components/layout/
git commit -m "feat: app shell layout with glass navigation"
```

---

## Task 7: Homepage hero placeholder

**Files:**
- Create: `apps/web/src/components/showroom/hero.tsx`
- Create: `apps/web/src/app/(public)/page.tsx`
- Create: `apps/web/src/components/showroom/hero-background.tsx`

**Interfaces:**
- Consumes: `GlassPanel`, `Button`, `Skeleton` from UI primitives; Framer Motion
- Produces: `Hero` component with cinematic entrance animation, headline, CTAs, scroll indicator

- [ ] **Step 1: Write hero-background.tsx**

Full-screen dark container with subtle gradient and optional background image placeholder (skeleton if no image).

- [ ] **Step 2: Write hero.tsx**

`Hero({ eyebrow, headline, supportText, primaryCta, secondaryCta })` with Framer Motion entrance sequence: fade-in from black, stagger text reveal, button fade-in, subtle parallax on mousemove. Respects `prefers-reduced-motion`.

- [ ] **Step 3: Write (public)/page.tsx**

Imports and renders `Hero` with Velocity content: "THE ART OF AUTOMOTIVE EXCELLENCE", "BEYOND THE ORDINARY.", "EXPLORE COLLECTION", "DISCOVER OUR SHOWROOM".

- [ ] **Step 4: Verify hero renders without console errors**

Run dev server, check browser console for errors.
Expected: hero section renders, animations run, no errors

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/components/showroom/ apps/web/src/app/(public)/
git commit -m "feat: cinematic homepage hero section"
```

---

## Task 8: Test infrastructure setup

**Files:**
- Create: `apps/web/jest.config.js` or `vitest.config.ts`
- Create: `apps/web/src/lib/db.test.ts` (test for DB adapter)
- Create: `apps/web/src/lib/auth.test.ts` (test for auth functions)

**Interfaces:**
- Consumes: `db` from `apps/web/src/lib/db.ts`, auth functions from `apps/web/src/lib/auth.ts`
- Produces: passing test suite

- [ ] **Step 1: Write vitest config**

Configure vitest for Next.js + TypeScript environment.

- [ ] **Step 2: Write db.test.ts**

Test that local DB adapter initializes, runs `SELECT 1`, and can create/read a row in a test table.

- [ ] **Step 3: Write auth.test.ts**

Test `getSession()` returns null without cookie, `signIn()` with invalid credentials returns error.

- [ ] **Step 4: Run tests**

Run: `cd apps/web && npx vitest run`
Expected: all tests pass

- [ ] **Step 5: Commit**

```bash
git add apps/web/vitest.config.ts apps/web/src/lib/*.test.ts
git commit -m "test: setup vitest and test DB adapter and auth"
```

---

## Self-Review

**1. Spec coverage:** Every Phase A requirement from the spec is mapped:
- Repo setup → Task 1
- Next.js + Tailwind + TypeScript strict → Task 1
- Framer Motion → Task 1 (dependency), Task 7 (usage)
- D1 schema migrations → Task 4
- Local storage adapter → Task 4 (db.ts)
- Auth skeleton → Task 5
- Shared UI components → Task 3
- Design tokens → Task 2
- wrangler.toml scaffold → Task 1
- Demo data flag → Task 4 (schema includes `is_demo`)

**2. Step scan:** Each step produces exactly one checkable result (test pass, file creates, dev server runs, commit). No step carries more than one action.

**3. Type consistency:** Types defined in Task 4 (`database.ts`) are consumed by Task 5 (auth) and Task 7 (hero). Component names (`Button`, `Card`, `GlassPanel`, `Skeleton`) match across Tasks 3 and 7.

**4. Review Focus:** All five failure modes addressed:
- wrangler.toml inactive → Task 1 step 3
- DB adapter signature matches D1 → Task 4 (interface defined, swapable later)
- Auth skeleton exposes standard methods → Task 5
- Image paths work locally and via R2 → addressed in Task 4/Task 7 (skeleton fallback)
- prefers-reduced-motion → Task 2 (globals.css) and Task 7 (hero respects it)
- Missing image fallback → Task 3 (Skeleton component)

**5. Proportion:** Plan is proportionate to Phase A scope — 8 tasks covering foundation only. Later phases (B–F) will get their own plans when reached.

---

Plan complete and saved to `docs/superpowers/plans/2026-11-09-phase-a-foundation.md`.

Please review the plan. Does it capture what you want for Phase A?

**Execution approach:** I recommend **Native** — I implement every task myself in this session, since Phase A tasks are tightly coupled (each builds on the previous task's interfaces: config → tokens → UI → DB → auth → shell → hero → tests). A mid-tier session model works well here because the plan carries the exact signatures and file paths.

Once you confirm, I'll begin implementing Phase A, Task by Task, committing after each task and pushing to your GitHub repo at the end of the phase.
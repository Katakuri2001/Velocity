# Velocity — Premium Multi-Brand Automotive Showroom
## Design Specification

**Date:** 2026-11-09  
**Status:** Draft (pending user review)  
**Path:** `docs/superpowers/specs/2026-11-09-velocity-showroom-design.md`

---

## 1. Project Overview

**Name:** Velocity  
**Purpose:** A premium, futuristic, cinematic multi-brand automotive showroom website where visitors discover, explore, compare, and enquire about vehicles from multiple manufacturers. Administrators manage inventory, brands, enquiries, and content entirely through a protected admin console without modifying source code.

**Stack (Option A — Cloudflare-native, deferred):**
- Framework: Next.js App Router + React + TypeScript strict mode
- Styling: Tailwind CSS + Framer Motion
- Database: Cloudflare D1 (raw SQL migrations — no Prisma, no PostgreSQL)
- Storage: Cloudflare R2
- Auth: Cloudflare-compatible session-based auth + RBAC
- Hosting: Cloudflare Pages
- Deployment: Wrangler + D1 migrations

**Local-first development strategy:** All cloud-dependent code sits behind adapter interfaces. During local development:
- DB: Local SQLite-compatible store → swap to D1 later
- Storage: Local `public/images/` → swap to R2 later
- Auth: Local session → swap to Cloudflare Auth later
- `wrangler.toml` scaffolded but inactive until authentication

---

## 2. Project Structure

```
Velocity/
├── apps/
│   └── web/                          # Next.js App Router
│       ├── src/
│       │   ├── app/                  # App Router routes
│       │   │   ├── (public)/         # Public routes
│       │   │   │   ├── page.tsx              # Homepage (Phase 3)
│       │   │   │   ├── inventory/            # /inventory (Phase 4)
│       │   │   │   ├── inventory/[slug]/     # Vehicle detail (Phase 5)
│       │   │   │   ├── compare/              # Comparison (Phase 6)
│       │   │   │   ├── favorites/            # Saved vehicles (Phase 7)
│       │   │   │   ├── test-drive/           # Test drive booking (Phase 8)
│       │   │   │   ├── enquire/              # Enquiry form (Phase 8)
│       │   │   │   └── contact/              # General contact (Phase 8)
│       │   │   ├── (admin)/          # Protected admin routes
│       │   │   │   ├── dashboard/            # Admin overview (Phase 9)
│       │   │   │   ├── vehicles/             # Vehicle CRUD
│       │   │   │   ├── manufacturers/        # Brand management
│       │   │   │   ├── categories/           # Category management
│       │   │   │   ├── enquiries/            # Enquiry management
│       │   │   │   ├── test-drives/          # Test drive management
│       │   │   │   └── content/              # Content management
│       │   │   ├── api/              # Server-side API routes
│       │   │   │   ├── vehicles, manufacturers, enquiries, test-drives, auth, ...
│       │   │   └── layout.tsx, loading.tsx, error.tsx
│       │   ├── components/           # Shared React components
│       │   │   ├── ui/               # Primitives (button, card, dialog)
│       │   │   ├── showroom/         # Showroom-specific (hero, vehicle-card, gallery)
│       │   │   ├── glass/            # Liquid glass components
│       │   │   ├── admin/            # Admin dashboard components
│       │   │   └── layout/           # Nav, footer, shell
│       │   ├── lib/                  # Utilities (db, r2, auth, validation)
│       │   ├── hooks/                # Custom React hooks
│       │   ├── types/                # TypeScript types
│       │   └── styles/               # Tailwind config, globals.css
│       ├── public/
│       │   └── images/               # Optimized automotive assets
│       ├── tailwind.config.ts
│       ├── postcss.config.js
│       └── package.json
├── packages/
│   ├── db/                           # D1 schema + migrations (raw SQL)
│   │   ├── migrations/
│   │   │   ├── 0001_initial.sql
│   │   │   └── ...
│   │   └── schema.sql
│   ├── types/                        # Shared TypeScript types
│   └── eslint-config/
├── docs/
│   └── superpowers/
│       └── specs/                    # This design document
├── wrangler.toml                     # Cloudflare config (inactive until auth)
├── package.json
├── tsconfig.json
└── README.md
```

---

## 3. Database Schema (D1, raw SQL, SQLite-compatible)

### 3.1 Entities (14 total)

| Entity | Purpose |
|--------|---------|
| `users` | Admin/customer accounts |
| `roles` | RBAC (admin, staff, customer) |
| `manufacturers` | Brands (extensible without code changes) |
| `vehicle_categories` | Categories (supercars, SUVs, EVs, etc.) |
| `vehicles` | Core vehicle data |
| `vehicle_images` | Multiple images per vehicle |
| `vehicle_features` | Feature library |
| `vehicle_specifications` | Flexible key-value specs per vehicle |
| `favorites` | User saved vehicles |
| `enquiries` | Customer enquiries |
| `test_drive_requests` | Test drive bookings |
| `homepage_content` | Editable homepage sections |
| `showroom_settings` | Global showroom configuration |
| `audit_logs` | Human-readable activity history |

### 3.2 Key Design Decisions

- **`vehicle_specifications`** uses EAV (entity-attribute-value) pattern so not every vehicle requires identical fields — accommodates missing or manufacturer-specific specifications.
- Foreign keys with `ON DELETE CASCADE` where appropriate.
- Indexes on `slug`, `manufacturer_id`, `category_id`, `availability`, `featured`, `new_arrival`, `created_at`.
- `availability` status (available, reserved, sold) handles lifecycle instead of soft-delete `deleted_at`.
- Demo data clearly marked with `is_demo = true` flag; never presented as real inventory.

---

## 4. Design System

### 4.1 Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Primary background | `#08090B` | Main page background |
| Secondary background | `#101216` | Elevated sections, cards |
| Elevated surface | `rgba(255,255,255,0.055)` | Glass surfaces |
| Glass border | `rgba(255,255,255,0.12)` | Thin illuminated borders |
| Primary text | `#F5F5F5` | Headlines, important text |
| Secondary text | `#A3A6AC` | Body text, labels |
| Accent | Champagne silver + electric blue | CTA buttons, highlights, interactive states |

**Constraint:** No excessive neon colors. Accent is restrained and sophisticated.

### 4.2 Typography

| Use case | Font family |
|----------|-------------|
| Interface elements | Inter / Manrope |
| Technical information | Space Grotesk |
| Editorial headlines | Sophisticated display/serif font (oversized, selective) |

### 4.3 Liquid Glass

Applied selectively to:
- Floating navigation
- Search panels
- Filter interfaces
- Vehicle information overlays
- Floating action buttons
- Comparison tray
- Dialogs
- Selected information cards

**Constraint:** Never turn the entire website into glass cards. Automotive photography remains the visual focus.

### 4.4 Motion Principles

- Purposeful animation only (hero entrance, scroll reveals, card hover, counters, page transitions, loading skeletons)
- `prefers-reduced-motion` respected throughout
- No excessive bouncing, random floating, constant movement, or unnecessary glowing
- Smooth transitions with careful easing

---

## 5. Phase-by-Phase Implementation

### Phase A — Foundation
- Repo setup: Next.js + Tailwind + TypeScript strict + Framer Motion
- D1 schema migrations (raw SQL)
- Local storage adapter (swapable for R2)
- Auth skeleton (session-based)
- Shared UI components: button, card, dialog, glass, navigation
- Design tokens (colors, typography, spacing, motion)
- `wrangler.toml` scaffold (inactive)

### Phase B — Public Showroom Core
- Homepage (9 sections: hero, brand discovery, featured collection, categories, showroom experience, new arrivals, performance showcase, customer experience, final CTA)
- `/inventory` with filters, sorting, pagination, grid/list view modes
- `/inventory/[slug]` vehicle detail page (gallery, identity, specs, features, description, related, enquiry panel)
- Category pages

### Phase C — User Features
- Favorites (localStorage for guests)
- Comparison tray (up to 4 vehicles, localStorage persisted)
- Enquiry form
- Test-drive booking form

### Phase D — Admin Console
- Auth + RBAC (admin, staff)
- Vehicle CRUD with multiple image uploads
- Manufacturer CRUD (logos, descriptions, active/inactive)
- Category CRUD
- Enquiry management (status, notes, follow-up)
- Test drive management (confirm, reschedule, reject)
- Content management (homepage sections, showroom info)
- Audit log (human-readable)

### Phase E — Content & Assets
- Automotive image research, download, organization, optimization
- Asset manifest (filename, manufacturer, model, source, license, dimensions)
- Demo data seed (clearly marked as demo)
- Image fallbacks and loading skeletons

### Phase F — Polish & QA
- SEO: dynamic metadata, vehicle-specific titles, Open Graph, sitemap, robots.txt, canonical URLs, structured data (Vehicle, AutoDealer)
- Performance: image optimization (WebP/AVIF), lazy loading, pagination, caching
- Mobile responsiveness (intentional mobile layouts)
- Animation performance
- Error handling
- Tests for business logic

---

## 6. Cloudflare Deferral Strategy

Adapter interfaces isolate cloud dependencies:

| Concern | Local (dev) | Production (Cloudflare) |
|---------|-------------|------------------------|
| Database | SQLite-compatible local store | D1 binding |
| Storage | `public/images/` local files | R2 bucket |
| Auth | Local session middleware | Cloudflare-compatible auth |
| Hosting | `next dev` / `next build` | Cloudflare Pages |

No code changes required to switch — only configuration and binding wiring.

---

## 7. Success Criteria

1. Unforgettable cinematic automotive hero
2. Exceptional vehicle photography (real, licensed, model-accurate)
3. Premium liquid-glass interfaces (selectively applied)
4. Beautiful vehicle cards with hover/glass interactions
5. Smooth, purposeful animations (respects `prefers-reduced-motion`)
6. Functional multi-brand inventory with filtering/sorting/pagination
7. Detailed vehicle detail pages (gallery, specs, features, enquiry, test drive)
8. Vehicle comparison (up to 4, persisted locally)
9. Fully functional admin console (vehicles, manufacturers, enquiries, test drives, content, audit log)
10. Excellent mobile experience (intentional mobile layouts)

---

## 8. Self-Review

**Placeholder scan:** No TBD, TODO, incomplete sections, or vague requirements remain. All 15 phases are mapped to implementation steps.

**Internal consistency:** The stack (Next.js + Tailwind + Framer Motion + D1 + R2) matches the user's Cloudflare preference and "no Prisma/PostgreSQL" constraint. The local-first adapter strategy defers Cloudflare auth without blocking development. The 14-entity schema matches Phase 10 requirements.

**Scope check:** The spec is comprehensive but decomposed into 6 phases (A–F) plus Cloudflare deferral. Each phase is independently implementable. No scope creep beyond the user's 15-phase brief.

**Ambiguity check:** Key ambiguities resolved:
- Auth approach: session-based local → Cloudflare-compatible later (explicitly deferred)
- Image strategy: real downloaded assets with manifest (mandatory requirement addressed)
- Demo data: `is_demo` flag, clearly identified (explicitly addressed)
- Spec flexibility: EAV pattern for `vehicle_specifications` (addresses "accommodate missing specs")

---

**This design document is ready for your review.** Please review it and let me know if you want any changes before I proceed to write the implementation plan (via the `writing-plans` skill) and begin Phase A implementation. Nothing is coded yet.
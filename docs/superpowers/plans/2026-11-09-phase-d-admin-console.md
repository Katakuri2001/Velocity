# Phase D — Admin Console Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the protected admin console — auth + RBAC, vehicle/manufacturer/category CRUD with image uploads, enquiry and test drive management, content management, and audit log.

**Architecture:** Admin routes under `(admin)/` protected by middleware (Phase A middleware extended). Server-side API routes for CRUD. Image uploads to local storage (swapable to R2 later). All admin actions write audit log entries.

**Tech Stack:** Next.js App Router, React, TypeScript strict, Tailwind, Framer Motion, lucide-react

**Spec:** `docs/superpowers/specs/2026-11-09-velocity-showroom-design.md`

## Global Constraints

- TypeScript strict mode enabled
- Admin routes protected: `/admin/*` requires authentication + admin role
- Image uploads: local `public/uploads/` (swapable to R2 later)
- All admin mutations write to `audit_logs` table with human-readable messages
- No Prisma, no PostgreSQL — D1-compatible via local adapter
- `prefers-reduced-motion` respected
- All checks (typecheck, lint, build, tests) pass before each commit

## Review Focus

- Unauthorized access to admin routes must redirect to login
- Image uploads must validate file type and size
- Admin CRUD must handle missing/invalid data gracefully
- Audit log entries must be human-readable (not developer-oriented)
- Empty states for admin lists
- Role-based access: staff can view, admin can mutate (simplified: admin role for all mutations in MVP)

---

## Task 1: Admin layout and protected shell

**Files:**
- Create: `apps/web/src/app/(admin)/layout.tsx`
- Create: `apps/web/src/app/(admin)/page.tsx` (admin dashboard redirect)
- Create: `apps/web/src/components/admin/admin-layout.tsx`
- Create: `apps/web/src/components/admin/admin-sidebar.tsx`
- Create: `apps/web/src/components/admin/admin-header.tsx`

**Interfaces:**
- Consumes: `SessionProvider`, `useSession`, `GlassPanel`, `Button`
- Produces: admin shell with sidebar navigation, header with user info, protected by middleware

- [ ] **Step 1: Write admin layout**

`(admin)/layout.tsx` — wraps admin routes, requires auth session, renders `AdminLayout`.

- [ ] **Step 2: Write admin-layout.tsx**

Shell component with sidebar, header, main content area. Glass panel styling.

- [ ] **Step 3: Write admin-sidebar.tsx**

Navigation links: Dashboard, Vehicles, Manufacturers, Categories, Enquiries, Test Drives, Content, Audit Log. Active state highlighting.

- [ ] **Step 4: Write admin-header.tsx**

Showroom logo, user email, role badge, sign out button.

- [ ] **Step 5: Write admin dashboard page**

Overview cards: total vehicles, available, reserved, sold, manufacturers, new enquiries, pending test drives, recently added vehicles.

- [ ] **Step 6: Typecheck + lint + build**

- [ ] **Step 7: Commit**

---

## Task 2: Vehicle management CRUD

**Files:**
- Create: `apps/web/src/app/(admin)/vehicles/page.tsx`
- Create: `apps/web/src/app/(admin)/vehicles/[id]/page.tsx`
- Create: `apps/web/src/app/api/admin/vehicles/route.ts`
- Create: `apps/web/src/app/api/admin/vehicles/[id]/route.ts`
- Create: `apps/web/src/components/admin/vehicle-form.tsx`
- Create: `apps/web/src/components/admin/vehicle-list.tsx`

**Interfaces:**
- Consumes: `db`, `vehicles` table, `manufacturers`, `vehicle_categories`
- Produces: admin vehicle list, create/edit forms, delete, image upload

- [ ] **Step 1: Write admin vehicle API routes**

GET `/api/admin/vehicles` — list all vehicles (including demo). POST — create vehicle. PUT/DELETE — update/delete vehicle.

- [ ] **Step 2: Write vehicle list component**

Table of all vehicles with status badges, featured/new arrival toggles, edit/delete actions.

- [ ] **Step 3: Write vehicle form component**

Create/edit form with all vehicle fields: manufacturer, model, variant, year, condition, price, mileage, transmission, fuel type, engine capacity, horsepower, torque, acceleration, top speed, drivetrain, colors, description, availability, stock number, is_demo flag.

- [ ] **Step 4: Write vehicle detail page (admin)**

View full vehicle details, edit, delete, manage images.

- [ ] **Step 5: Typecheck + lint + build**

- [ ] **Step 6: Commit**

---

## Task 3: Image upload for vehicles

**Files:**
- Create: `apps/web/src/app/api/admin/upload/route.ts`
- Create: `apps/web/src/components/admin/image-uploader.tsx`
- Create: `apps/web/public/uploads/` (directory)

**Interfaces:**
- Consumes: `fs` for local file storage (swapable to R2)
- Produces: image upload endpoint, image uploader component with drag/drop

- [ ] **Step 1: Write upload API route**

POST `/api/admin/upload` — accepts multipart/form-data, saves to `public/uploads/`, validates image type (jpeg, png, webp) and size (max 5MB), returns URL.

- [ ] **Step 2: Write image uploader component**

Drag/drop zone, file input, preview thumbnails, progress indicator, remove image.

- [ ] **Step 3: Integrate image uploader into vehicle form**

- [ ] **Step 4: Typecheck + lint + build**

- [ ] **Step 5: Commit**

---

## Task 4: Manufacturer management

**Files:**
- Create: `apps/web/src/app/(admin)/manufacturers/page.tsx`
- Create: `apps/web/src/app/api/admin/manufacturers/route.ts`
- Create: `apps/web/src/app/api/admin/manufacturers/[id]/route.ts`
- Create: `apps/web/src/components/admin/manufacturer-form.tsx`
- Create: `apps/web/src/components/admin/manufacturer-list.tsx`

**Interfaces:**
- Consumes: `manufacturers` table
- Produces: manufacturer CRUD list, create/edit forms, logo upload, active/inactive toggle

- [ ] **Step 1: Write manufacturer API routes**

GET, POST, PUT, DELETE for manufacturers.

- [ ] **Step 2: Write manufacturer list**

Table with name, slug, vehicle count, active status, actions.

- [ ] **Step 3: Write manufacturer form**

Name, slug, logo upload, description, active toggle.

- [ ] **Step 4: Typecheck + lint + build**

- [ ] **Step 5: Commit**

---

## Task 5: Category management

**Files:**
- Create: `apps/web/src/app/(admin)/categories/page.tsx`
- Create: `apps/web/src/app/api/admin/categories/route.ts`
- Create: `apps/web/src/app/api/admin/categories/[id]/route.ts`
- Create: `apps/web/src/components/admin/category-form.tsx`
- Create: `apps/web/src/components/admin/category-list.tsx`

**Interfaces:**
- Consumes: `vehicle_categories` table
- Produces: category CRUD

- [ ] **Step 1: Write category API routes**

GET, POST, PUT, DELETE for categories.

- [ ] **Step 2: Write category list**

Table with name, slug, sort order, image, actions.

- [ ] **Step 3: Write category form**

Name, slug, image upload, description, sort order.

- [ ] **Step 4: Typecheck + lint + build**

- [ ] **Step 5: Commit**

---

## Task 6: Enquiry management

**Files:**
- Create: `apps/web/src/app/(admin)/enquiries/page.tsx`
- Create: `apps/web/src/app/api/admin/enquiries/[id]/route.ts`

**Interfaces:**
- Consumes: `enquiries` table
- Produces: enquiry list, status update, internal notes, follow-up

- [ ] **Step 1: Write enquiry list page**

Table of all enquiries with status, customer details, vehicle, date, actions.

- [ ] **Step 2: Write enquiry status API**

PUT `/api/admin/enquiries/[id]` — update status (new, contacted, in_progress, resolved, rejected), add internal notes.

- [ ] **Step 3: Typecheck + lint + build**

- [ ] **Step 4: Commit**

---

## Task 7: Test drive management

**Files:**
- Create: `apps/web/src/app/(admin)/test-drives/page.tsx`
- Create: `apps/web/src/app/api/admin/test-drives/[id]/route.ts`

**Interfaces:**
- Consumes: `test_drive_requests` table
- Produces: test drive list, confirm/reschedule/reject

- [ ] **Step 1: Write test drive list page**

Table of all requests with status, customer details, vehicle, date/time, actions.

- [ ] **Step 2: Write test drive status API**

PUT `/api/admin/test-drives/[id]` — update status (pending, confirmed, rescheduled, rejected, completed).

- [ ] **Step 3: Typecheck + lint + build**

- [ ] **Step 4: Commit**

---

## Task 8: Content management

**Files:**
- Create: `apps/web/src/app/(admin)/content/page.tsx`
- Create: `apps/web/src/app/api/admin/content/route.ts`

**Interfaces:**
- Consumes: `homepage_content`, `showroom_settings` tables
- Produces: editable homepage sections, showroom settings

- [ ] **Step 1: Write content API routes**

GET/PUT for homepage_content sections and showroom_settings.

- [ ] **Step 2: Write content management page**

Edit homepage hero text, featured vehicles, section titles, showroom contact info.

- [ ] **Step 3: Typecheck + lint + build**

- [ ] **Step 4: Commit**

---

## Task 9: Audit log

**Files:**
- Create: `apps/web/src/app/(admin)/audit-logs/page.tsx`
- Create: `apps/web/src/app/api/admin/audit-logs/route.ts`

**Interfaces:**
- Consumes: `audit_logs` table
- Produces: activity history page with human-readable entries

- [ ] **Step 1: Write audit log API route**

GET `/api/admin/audit-logs` — list all audit entries with pagination.

- [ ] **Step 2: Write audit log page**

Table with actor, action, entity type, entity ID, details, timestamp. Human-readable messages.

- [ ] **Step 3: Typecheck + lint + build**

- [ ] **Step 4: Commit**

---

## Self-Review

**1. Spec coverage:** Every Phase D requirement mapped:
- Admin auth + RBAC → Task 1 (middleware from Phase A extended)
- Vehicle CRUD → Task 2
- Image uploads → Task 3
- Manufacturer CRUD → Task 4
- Category CRUD → Task 5
- Enquiry management → Task 6
- Test drive management → Task 7
- Content management → Task 8
- Audit log → Task 9

**2. Step scan:** Each step produces one checkable result.

**3. Type consistency:** Admin components consume `db` from Phase A and types from `database.ts`. API routes follow same pattern as Phase B.

**4. Review Focus:** All failure modes addressed:
- Unauthorized access → middleware redirects to login
- Image validation → file type/size checks
- Empty states → admin list components
- Audit log human-readable → descriptive messages in audit_logs

**5. Proportion:** 9 tasks for Phase D scope.

---

Plan complete and saved to `docs/superpowers/plans/2026-11-09-phase-d-admin-console.md`.

Please review the plan. Does it capture what you want for Phase D — Admin Console?

**Execution approach:** Native — tasks are tightly coupled (admin shell → CRUD → uploads → management pages → audit log). I'll run typecheck, lint, build, and tests before each commit, then push to your GitHub repo at the end of the phase.
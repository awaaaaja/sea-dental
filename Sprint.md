# Sprint.md — Engineering Roadmap

## Sprint Overview

**Project:** SEA Dental Aesthetics Digital Platform
**Stack:** Vue 3 + TypeScript + Vite + Vue Router + Pinia + Tailwind CSS + GSAP + Supabase
**Scope:** Public Website + Admin CMS

---

## Sprint 0 — Discovery & Repository Audit

**Goal:** Understand current state, map content, plan migration.

**Prerequisites:** None

**Tasks:**

| ID | Task | Status |
|----|------|--------|
| WEB-001 | Audit live site seadentalaesthetics.id — list all sections, features, issues | Pending |
| WEB-002 | Read all references/ prototypes — extract patterns, identify differences | Pending |
| WEB-003 | Read references/Design.md — document design tokens, colors, typography, spacing | Pending |
| WEB-004 | Map existing content to new content models (services, doctors, articles, gallery, locations, FAQ) | Pending |
| WEB-005 | Document findings: what to keep, what to discard, what needs CONTENT_REQUIRED | Pending |

**Files affected:** references/*, documentation files
**Dependencies:** None
**Expected output:** Audit report with content mapping
**Acceptance criteria:** All prototypes analyzed, all assets cataloged, content gaps identified
**Testing:** Manual review
**Definition of done:** Audit complete, no unanalyzed references
**Risks:** None

---

## Sprint 1 — Architecture & Project Foundation

**Goal:** Project scaffold ready with all tooling configured.

**Prerequisites:** Sprint 0 complete

**Tasks:**

| ID | Task | Status |
|----|------|--------|
| WEB-006 | Initialize Vite + Vue 3 + TypeScript project (`pnpm create vite sea_dental --template vue-ts`) | Pending |
| WEB-007 | Configure Tailwind CSS — extend theme with Design.md tokens (colors, typography, spacing, borderRadius) | Pending |
| WEB-008 | Set up Vue Router — lazy-loaded routes for public (/, /about, /services, /doctors, /gallery, /articles, /locations, /faq, /contact) and admin (/admin/*) | Pending |
| WEB-009 | Set up Pinia stores — auth store, UI store (mobile menu, theme) | Pending |
| WEB-010 | Create Supabase client service at `src/services/supabase.ts` using `createClient` from @supabase/supabase-js | Pending |
| WEB-011 | Configure `.env.local` with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY | Pending |
| WEB-012 | Set up TypeScript strict mode in tsconfig.json | Pending |
| WEB-013 | Configure path aliases (`@/` → `src/`) in vite.config.ts and tsconfig | Pending |
| WEB-014 | Set up ESLint + Prettier with Vue 3 recommended config | Pending |
| WEB-015 | Create directory structure: `src/public/`, `src/admin/`, `src/components/`, `src/composables/`, `src/services/`, `src/stores/`, `src/types/`, `src/assets/`, `src/styles/`, `supabase/migrations/` | Pending |

**Files affected:** vite.config.ts, tsconfig.json, tailwind.config.ts, .env.local, src/*
**Dependencies:** Sprint 0
**Expected output:** Compiling Vue 3 project with Tailwind, Router, Pinia, Supabase client
**Acceptance criteria:** `pnpm dev` runs without errors, Tailwind styles apply, routes render, Supabase client imports
**Testing:** `pnpm dev`, `pnpm build`, manual route navigation
**Definition of done:** Clean build, no TypeScript errors, no console errors
**Risks:** None

---

## Sprint 2 — Design System & Core UI Components

**Goal:** Reusable component library matching Design.md.

**Prerequisites:** Sprint 1 complete

**Tasks:**

| ID | Task | Status |
|----|------|--------|
| WEB-016 | Implement Tailwind theme extending Design.md — all color tokens, font families, font sizes, spacing, borderRadius | Pending |
| WEB-017 | Create Button component — variants: primary (#112675 bg, white text), secondary (outlined), glass (backdrop-blur), sizes: sm, md, lg | Pending |
| WEB-018 | Create Card component — glass-panel (rgba(255,255,255,0.7), blur(24px)), glass-card-hover (translateY(-4px), cyan-tech border) | Pending |
| WEB-019 | Create Typography components — DisplayLg, HeadlineLg, HeadlineMd, BodyLg, BodyMd, LabelCaps, ButtonText | Pending |
| WEB-020 | Create SectionContainer — max-w-[1280px], px-[20px] mobile / px-[24px] desktop, py-[120px] | Pending |
| WEB-021 | Create Badge/Label component — label-caps style (12px, 600, 0.1em letter-spacing) | Pending |
| WEB-022 | Create Icon component — Material Symbols Outlined wrapper with font-variation-settings | Pending |
| WEB-023 | Create Input component — outlined style, focus: secondary border + glow, label-caps labels | Pending |
| WEB-024 | Create Textarea component — same styling as Input | Pending |
| WEB-025 | Create Select component — same styling as Input | Pending |
| WEB-026 | Create Modal/Dialog component — accessible, focus trap, ESC close, backdrop | Pending |
| WEB-027 | Create Toast/Notification component — success, error, info variants | Pending |
| WEB-028 | Create Loading skeleton and Empty state components | Pending |

**Files affected:** src/components/ui/*, tailwind.config.ts
**Dependencies:** Sprint 1
**Expected output:** Component library usable across all pages
**Acceptance criteria:** All components render correctly, follow Design.md tokens, responsive, accessible
**Testing:** Visual inspection at 375px, 768px, 1280px
**Definition of done:** All components documented with props and usage
**Risks:** None

---

## Sprint 3 — Public Global Shell (Navbar + Footer)

**Goal:** Shared layout for all public pages.

**Prerequisites:** Sprint 2 complete

**Tasks:**

| ID | Task | Status |
|----|------|--------|
| WEB-029 | Implement Navbar — fixed, glass effect (bg-glass-surface/70, backdrop-blur-3xl), logo + brand name + nav links + Reservasi CTA | Pending |
| WEB-030 | Implement mobile hamburger menu — drawer with slide animation, ESC close, body scroll lock, focus trap | Pending |
| WEB-031 | Implement scroll-triggered navbar — background opacity changes on scroll | Pending |
| WEB-032 | Implement Footer — bg-deep-navy, 4-column grid (brand, tautan, layanan kami, pembayaran), social links, working hours | Pending |
| WEB-033 | Implement footer payment method icons — ATM Bersama, Visa, Mastercard, GPN, QRIS | Pending |
| WEB-034 | Implement footer working hours — Senin-Sabtu 11.00-21.00 WIB | Pending |
| WEB-035 | Implement footer social links — Instagram, WhatsApp, Phone, Google Maps | Pending |
| WEB-036 | Add route-aware active states to navbar links | Pending |
| WEB-037 | Add skip-to-content accessibility link | Pending |
| WEB-038 | Implement PublicLayout wrapper component | Pending |

**Files affected:** src/public/layouts/*, src/public/components/Navbar.vue, src/public/components/Footer.vue
**Dependencies:** Sprint 2
**Expected output:** Navbar and footer working on all public pages
**Acceptance criteria:** Glass effect renders, mobile drawer works, all links navigate, footer displays correct info
**Testing:** Desktop, tablet, mobile responsive testing
**Definition of done:** Navbar and footer match Design.md, accessible, responsive
**Risks:** None

---

## Sprint 4 — Homepage

**Goal:** Complete homepage matching best prototype patterns.

**Prerequisites:** Sprint 3 complete

**Tasks:**

| ID | Task | Status |
|----|------|--------|
| WEB-039 | Hero section — "Selamat Datang di SEA Dental Aesthetics", gradient text (primary → cyan-tech), background blur effects | Pending |
| WEB-040 | Hero floating stat card — "10,000+ Pasien Puas" with bounce animation | Pending |
| WEB-041 | Hero CTAs — "Buat Janji Temu" (primary button) + "Promo Kami" (glass button) | Pending |
| WEB-042 | "Kenapa Memilih SEA" section — 3 glass cards (Penambalan Estetik, Perawatan Kawat Gigi, Pembuatan Gigi Tiruan) | Pending |
| WEB-043 | About SEA section — clinic description, video link (https://youtu.be/OpBtXlmsNGs), 3 icon boxes (General Practitioner, Dental Technology, Interactive & Communicative) | Pending |
| WEB-044 | Stats counter section — 2 Dokter, 12 Layanan, 6 Departmen, 10 Dental Labs | Pending |
| WEB-045 | Services preview — 4 service cards (Implan, Veneer, Bleaching, Perawatan Akar) | Pending |
| WEB-046 | Gallery snap slider — horizontal scroll, snap-x, hide-scrollbar, gallery images | Pending |
| WEB-047 | Testimonials slider — 3 testimonial cards (Silvi Triana Helmi, Sri Mutmainah, Lala) with star ratings | Pending |
| WEB-048 | Partner brands — 3M, Straumann, Invisalign, Dentsply, GC, Ivoclar (grayscale → color on hover) | Pending |
| WEB-049 | Articles preview — 3 article cards (Teknologi, Perawatan, Kesehatan categories) | Pending |
| WEB-050 | FAQ accordion — native details/summary, 3 questions (BPJS, penambalan estetik, veneer) | Pending |
| WEB-051 | Locations section — 2 branch cards (Simpang Haru, Baru) with address, hours, directions CTA | Pending |
| WEB-052 | Final CTA section — consultation prompt | Pending |

**Files affected:** src/public/views/HomeView.vue, src/public/components/sections/*
**Dependencies:** Sprint 3
**Expected output:** Complete homepage matching prototype quality
**Acceptance criteria:** All sections render, responsive, accessible, content matches references
**Testing:** Full page scroll test, mobile responsive, keyboard navigation
**Definition of done:** Homepage production-ready
**Risks:** Hero image may need placeholder if real image unavailable

---

## Sprint 5 — Services

**Goal:** Service listing and detail pages.

**Prerequisites:** Sprint 4 complete

**Tasks:**

| ID | Task | Status |
|----|------|--------|
| WEB-053 | ServicesView — hero section, service listing grid (3-col desktop, 1-col mobile) | Pending |
| WEB-054 | ServiceDetail view — slug routing, hero, full description, benefits, treatment info, CTA | Pending |
| WEB-055 | Service data model — hardcoded initially: Konservasi, Prosthodonti, Orthodonti, Periodonti, Paedodonti, Oral Surgery | Pending |
| WEB-056 | Service icons — Material Symbols for each department | Pending |
| WEB-057 | Service descriptions — from references/Design.md content | Pending |
| WEB-058 | Service SEO metadata — title, description per service | Pending |
| WEB-059 | Breadcrumbs component — reusable across pages | Pending |
| WEB-060 | Responsive grid — 1 col mobile, 2 col tablet, 3 col desktop | Pending |

**Files affected:** src/public/views/ServicesView.vue, src/public/views/ServiceDetail.vue, src/public/components/ServiceCard.vue
**Dependencies:** Sprint 4
**Expected output:** Services pages with real content from references
**Acceptance criteria:** All 6 services display, detail pages work with slugs, responsive
**Testing:** Navigate all service routes, test slug routing
**Definition of done:** Services complete with real content
**Risks:** None

---

## Sprint 6 — Doctors

**Goal:** Doctor listing and detail pages.

**Prerequisites:** Sprint 5 complete

**Tasks:**

| ID | Task | Status |
|----|------|--------|
| WEB-061 | DoctorsView — hero, doctor listing (2-col grid) | Pending |
| WEB-062 | DoctorDetail view — slug routing, photo, name, specialty, bio, Instagram link | Pending |
| WEB-063 | Load doctor photos from references/ — andre_1.png, citra_2.png | Pending |
| WEB-064 | Doctor data — drg. Andre Anggara (Aesthetic Dentist & Implantologist, @dakumiss), drg. Citra Annesha Pratiwi (Dentist, @chitraannesha) | Pending |
| WEB-065 | Doctor bio content from references/Design.md | Pending |
| WEB-066 | Doctor social links — Instagram | Pending |
| WEB-067 | Responsive layout — 1 col mobile, 2 col desktop | Pending |
| WEB-068 | Breadcrumbs | Pending |

**Files affected:** src/public/views/DoctorsView.vue, src/public/views/DoctorDetail.vue, src/public/components/DoctorCard.vue, src/assets/doctors/*
**Dependencies:** Sprint 5
**Expected output:** Doctor pages with real photos and data
**Acceptance criteria:** Both doctors display correctly, photos load, Instagram links work
**Testing:** Navigate doctor routes, verify images
**Definition of done:** Doctor pages complete
**Risks:** None

---

## Sprint 7 — Gallery & Technology

**Goal:** Gallery and technology showcase.

**Prerequisites:** Sprint 6 complete

**Tasks:**

| ID | Task | Status |
|----|------|--------|
| WEB-069 | GalleryView — hero, grid layout (4-col desktop, 2-col tablet, 1-col mobile) | Pending |
| WEB-070 | Gallery horizontal snap slider — for homepage section | Pending |
| WEB-071 | Gallery lightbox/modal — click to view full image, keyboard navigation | Pending |
| WEB-072 | Load gallery images from references/ — galeri-1.jpeg through galeri-16.jpeg | Pending |
| WEB-073 | Lazy loading — loading="lazy" on gallery images | Pending |
| WEB-074 | Technology section — homepage or dedicated page, clinic technology description | Pending |
| WEB-075 | Responsive layout — consistent aspect ratios | Pending |
| WEB-076 | Image alt text — descriptive for accessibility | Pending |

**Files affected:** src/public/views/GalleryView.vue, src/public/components/GalleryGrid.vue, src/public/components/GalleryLightbox.vue, src/assets/gallery/*
**Dependencies:** Sprint 6
**Expected output:** Gallery with all 16 images, lightbox, responsive
**Acceptance criteria:** All images load, lightbox works, keyboard accessible, responsive
**Testing:** Click all images, test keyboard navigation, responsive test
**Definition of done:** Gallery complete
**Risks:** Image file sizes may need optimization

---

## Sprint 8 — Articles

**Goal:** Article listing and detail pages.

**Prerequisites:** Sprint 7 complete

**Tasks:**

| ID | Task | Status |
|----|------|--------|
| WEB-077 | ArticlesView — hero, article card grid (3-col desktop, 1-col mobile) | Pending |
| WEB-078 | ArticleDetail view — slug routing, breadcrumbs, header (category, date, author), body, sidebar | Pending |
| WEB-079 | Article card component — image placeholder, category badge, title, excerpt, date, "Baca Selengkapnya" | Pending |
| WEB-080 | Related articles sidebar — sticky, 2-3 related articles | Pending |
| WEB-081 | Article categories — Teknologi, Perawatan, Kesehatan | Pending |
| WEB-082 | "Lihat Semua" — load-more or pagination | Pending |
| WEB-083 | Newsletter/CTA block — at article end, "Tertarik dengan DSD? Konsultasi Gratis" | Pending |
| WEB-084 | Article SEO metadata — title, description, OG image | Pending |
| WEB-085 | Article detail layout — 9-col body + 3-col sidebar (lg grid) | Pending |
| WEB-086 | Breadcrumbs | Pending |

**Files affected:** src/public/views/ArticlesView.vue, src/public/views/ArticleDetail.vue, src/public/components/ArticleCard.vue
**Dependencies:** Sprint 7
**Expected output:** Article system with listing and detail pages
**Acceptance criteria:** Article pages render, responsive, accessible
**Testing:** Navigate article routes, test responsive
**Definition of done:** Article pages complete (hardcoded content initially)
**Risks:** Article content is placeholder — needs CONTENT_REQUIRED for real articles

---

## Sprint 9 — Locations / FAQ / Contact

**Goal:** Location, FAQ, and contact pages.

**Prerequisites:** Sprint 8 complete

**Tasks:**

| ID | Task | Status |
|----|------|--------|
| WEB-087 | LocationsView — hero, 2 branch cards (Simpang Haru, Baru) | Pending |
| WEB-088 | Branch details — addresses, hours, phone, Google Maps link | Pending |
| WEB-089 | Google Maps embed — iframe or link to Google Maps | Pending |
| WEB-090 | FAQView — hero, accordion with 5 questions | Pending |
| WEB-091 | FAQ accordion — native details/summary or Vue component, accessible | Pending |
| WEB-092 | FAQ content — from references/Design.md (BPJS, penambalan estetik, veneer, karang gigi, pencabutan) | Pending |
| WEB-093 | ContactView — hero, contact form, contact info (address, email, phone, WhatsApp) | Pending |
| WEB-094 | WhatsApp direct link — https://api.whatsapp.com/send/?phone=6281266971089 | Pending |
| WEB-095 | Phone link — tel:6281366329279 | Pending |
| WEB-096 | Email link — mailto:seadentalaesthetics@gmail.com | Pending |
| WEB-097 | Working hours display — Senin-Sabtu 11.00-21.00 WIB | Pending |
| WEB-098 | Contact form validation — client-side required fields | Pending |

**Files affected:** src/public/views/LocationsView.vue, src/public/views/FaqView.vue, src/public/views/ContactView.vue
**Dependencies:** Sprint 8
**Expected output:** Locations, FAQ, Contact pages with real content
**Acceptance criteria:** All pages render, FAQ accordion works, contact info correct, responsive
**Testing:** Test FAQ accordion, test contact form validation, responsive test
**Definition of done:** All three pages complete
**Risks:** Contact form backend (Supabase inquiries table) depends on Sprint 10+

---

## Sprint 10 — Supabase Foundation

**Goal:** Database schema and migrations.

**Prerequisites:** Sprint 9 complete

**Tasks:**

| ID | Task | Status |
|----|------|--------|
| DB-001 | Design PostgreSQL schema — all tables, fields, types, constraints, indexes | Pending |
| DB-002 | Migration: `profiles` table — id (uuid, FK auth.users), full_name, avatar_url, role (enum: super_admin, editor, staff), created_at, updated_at | Pending |
| DB-003 | Migration: `service_categories` table — id, name, slug, description, sort_order, created_at, updated_at | Pending |
| DB-004 | Migration: `services` table — id, category_id (FK), name, slug, short_description, full_description, icon, hero_image, is_featured, sort_order, status (draft/published/archived), seo_title, seo_description, created_at, updated_at | Pending |
| DB-005 | Migration: `doctors` table — id, name, slug, photo_url, professional_title, specialization, bio, instagram_url, is_featured, sort_order, status, seo_title, seo_description, created_at, updated_at | Pending |
| DB-006 | Migration: `article_categories` table — id, name, slug, description, created_at, updated_at | Pending |
| DB-007 | Migration: `articles` table — id, category_id (FK), author_id (FK profiles), title, slug, excerpt, content (text), cover_image, published_at, status, seo_title, seo_description, og_image, created_at, updated_at | Pending |
| DB-008 | Migration: `gallery_items` table — id, title, image_url, category, description, sort_order, is_featured, status, created_at | Pending |
| DB-009 | Migration: `locations` table — id, name, slug, address, phone, whatsapp, operating_hours, google_maps_url, latitude, longitude, description, sort_order, status, created_at, updated_at | Pending |
| DB-010 | Migration: `faqs` table — id, question, answer, category, sort_order, status, created_at, updated_at | Pending |
| DB-011 | Migration: `testimonials` table — id, patient_name, patient_title, content, rating, is_featured, sort_order, status, created_at | Pending |
| DB-012 | Migration: `bookings` table — id, name, email, phone, preferred_location, preferred_service, preferred_date, preferred_time, message, status (new/confirmed/completed/cancelled), notes, created_at, updated_at | Pending |
| DB-013 | Migration: `inquiries` table — id, name, email, phone, subject, message, status (new/read/contacted/resolved), admin_notes, created_at, updated_at | Pending |
| DB-014 | Migration: `site_settings` table — id, key (unique), value (jsonb), updated_at | Pending |
| DB-015 | Migration: `media_assets` table — id, filename, original_filename, bucket, path, mime_type, size, uploaded_by (FK profiles), created_at | Pending |
| DB-016 | Migration: `audit_logs` table — id, user_id (FK profiles), action, entity_type, entity_id, metadata (jsonb), created_at | Pending |
| DB-017 | Create indexes on foreign keys and frequently queried columns (slug, status) | Pending |
| DB-018 | Create enum types: user_role, content_status, booking_status, inquiry_status | Pending |
| DB-019 | Seed data — initial services, doctors, locations, FAQs from references | Pending |
| DB-020 | Verify schema with `supabase db dump` or manual inspection | Pending |

**Files affected:** supabase/migrations/*
**Dependencies:** Sprint 9
**Expected output:** Complete database schema with migrations
**Acceptance criteria:** All migrations apply cleanly, tables created, indexes exist
**Testing:** `supabase migration list`, manual table inspection
**Definition of done:** Schema complete, seed data inserted
**Risks:** None

---

## Sprint 11 — Authentication & RLS

**Goal:** Auth, roles, security policies.

**Prerequisites:** Sprint 10 complete

**Tasks:**

| ID | Task | Status |
|----|------|--------|
| SEC-001 | Set up Supabase Auth — email/password provider enabled | Pending |
| SEC-002 | Create admin login page — email + password form, Supabase Auth signInWithPassword | Pending |
| SEC-003 | Implement useAuth composable — login, logout, session, user, role | Pending |
| SEC-004 | Implement auth store (Pinia) — user state, session persistence | Pending |
| SEC-005 | Implement route guards — /admin/* requires authenticated user with admin role | Pending |
| SEC-006 | Define roles — super_admin (full access), editor (content CRUD), staff (read + limited edit) | Pending |
| SEC-007 | RLS policies: public content — anonymous users READ published records only | Pending |
| SEC-008 | RLS policies: admin content — authenticated users CRUD according to role | Pending |
| SEC-009 | RLS policies: user profiles — users read own profile, super_admin reads all | Pending |
| SEC-010 | Storage policies — public read for public-assets bucket, admin write for all buckets | Pending |
| SEC-011 | Password reset flow — Supabase Auth resetPasswordForEmail | Pending |
| SEC-012 | Session persistence — Supabase handles via localStorage | Pending |
| SEC-013 | Logout flow — signOut, clear auth store, redirect to /admin/login | Pending |
| SEC-014 | Unauthorized state — show 403 or redirect for non-admin users | Pending |

**Files affected:** src/admin/views/LoginView.vue, src/composables/useAuth.ts, src/stores/auth.ts, src/router/guards.ts, supabase/migrations/*
**Dependencies:** Sprint 10
**Expected output:** Working auth system with role-based access
**Acceptance criteria:** Login works, routes protected, RLS policies enforce access
**Testing:** Login with test credentials, test unauthorized access, test RLS
**Definition of done:** Auth complete, RLS enforced
**Risks:** Need to create initial admin user in Supabase dashboard

---

## Sprint 12 — Admin Shell

**Goal:** Admin layout and navigation.

**Prerequisites:** Sprint 11 complete

**Tasks:**

| ID | Task | Status |
|----|------|--------|
| ADM-001 | Admin layout — sidebar (240px desktop) + content area, authenticated only | Pending |
| ADM-002 | Sidebar navigation — links: Dashboard, Services, Doctors, Articles, Gallery, Locations, FAQ, Testimonials, Bookings, Inquiries, Media, Users, Settings | Pending |
| ADM-003 | Mobile drawer navigation — hamburger toggle, slide-in sidebar | Pending |
| ADM-004 | Authenticated user display — avatar, name, role badge | Pending |
| ADM-005 | Logout action — in sidebar footer | Pending |
| ADM-006 | Route-aware active state — highlight current route in sidebar | Pending |
| ADM-007 | Admin breadcrumb component — hierarchical breadcrumbs | Pending |
| ADM-008 | Admin page header — title, description, action buttons | Pending |
| ADM-009 | Admin loading states — skeleton loaders for tables and forms | Pending |
| ADM-010 | Admin empty states — "No items yet" with create CTA | Pending |

**Files affected:** src/admin/layouts/AdminLayout.vue, src/admin/components/AdminSidebar.vue, src/admin/components/AdminBreadcrumb.vue
**Dependencies:** Sprint 11
**Expected output:** Admin shell with navigation
**Acceptance criteria:** Sidebar renders, navigation works, responsive, accessible
**Testing:** Desktop and mobile navigation, route transitions
**Definition of done:** Admin shell complete
**Risks:** None

---

## Sprint 13 — Admin Dashboard

**Goal:** Dashboard with real metrics.

**Prerequisites:** Sprint 12 complete

**Tasks:**

| ID | Task | Status |
|----|------|--------|
| ADM-011 | Dashboard layout — grid of stat cards + tables | Pending |
| ADM-012 | Total articles count widget — from articles table, published count | Pending |
| ADM-013 | Total services count widget — from services table | Pending |
| ADM-014 | Total doctors count widget — from doctors table | Pending |
| ADM-015 | Total gallery items count widget — from gallery_items table | Pending |
| ADM-016 | Recent bookings widget — last 5 bookings from bookings table | Pending |
| ADM-017 | New inquiries widget — last 5 inquiries from inquiries table | Pending |
| ADM-018 | Quick actions — "New Article", "New Service", "New Doctor" buttons | Pending |

**Files affected:** src/admin/views/DashboardView.vue, src/admin/components/StatCard.vue
**Dependencies:** Sprint 12
**Expected output:** Dashboard showing real database metrics
**Acceptance criteria:** Counts match database, recent items display, responsive
**Testing:** Verify counts against manual DB query
**Definition of done:** Dashboard complete
**Risks:** Depends on seed data existing in database

---

## Sprint 14 — Admin CMS: Services & Doctors

**Goal:** CRUD for services and doctors.

**Prerequisites:** Sprint 13 complete

**Tasks:**

| ID | Task | Status |
|----|------|--------|
| ADM-019 | Services list table (admin) — name, category, status, sort order, actions | Pending |
| ADM-020 | Service create/edit form — name, slug (auto), category, short_description, full_description, icon, hero_image, is_featured, sort_order, status, SEO fields | Pending |
| ADM-021 | Service validation — required fields, slug uniqueness, character limits | Pending |
| ADM-022 | Service slug auto-generation — from title, kebab-case | Pending |
| ADM-023 | Service status management — draft/published/archived toggle | Pending |
| ADM-024 | Service image upload — to Supabase Storage, preview | Pending |
| ADM-025 | Doctors list table (admin) — name, specialty, status, actions | Pending |
| ADM-026 | Doctor create/edit form — name, slug, photo, professional_title, specialization, bio, instagram_url, is_featured, sort_order, status, SEO fields | Pending |
| ADM-027 | Doctor photo upload — to Supabase Storage | Pending |
| ADM-028 | Doctor status management | Pending |

**Files affected:** src/admin/views/services/*, src/admin/views/doctors/*, src/admin/components/DataTable.vue, src/admin/components/FormFields.vue
**Dependencies:** Sprint 13
**Expected output:** Full CRUD for services and doctors
**Acceptance criteria:** Create, read, update, delete work for both entities, validation works, image upload works
**Testing:** Create a service, edit it, change status, delete it. Same for doctors.
**Definition of done:** Services and doctors CRUD complete
**Risks:** Image upload depends on Storage policies

---

## Sprint 15 — Admin CMS: Articles & Gallery

**Goal:** CRUD for articles and gallery.

**Prerequisites:** Sprint 14 complete

**Tasks:**

| ID | Task | Status |
|----|------|--------|
| ADM-029 | Articles list table (admin) — title, category, author, status, published_at, actions | Pending |
| ADM-030 | Article create/edit form — title, slug, category, excerpt, content (rich text or markdown), cover_image, status, SEO fields | Pending |
| ADM-031 | Article category management — create/edit categories | Pending |
| ADM-032 | Article SEO fields — seo_title, seo_description, og_image | Pending |
| ADM-033 | Article cover image upload — to Supabase Storage | Pending |
| ADM-034 | Article status management — draft/published/archived | Pending |
| ADM-035 | Gallery list grid (admin) — image thumbnails, title, category, status | Pending |
| ADM-036 | Gallery upload — multi-image upload with preview, drag-and-drop | Pending |
| ADM-037 | Gallery category/ordering — assign categories, set sort order | Pending |
| ADM-038 | Gallery delete — confirmation dialog, remove from Storage | Pending |

**Files affected:** src/admin/views/articles/*, src/admin/views/gallery/*, src/admin/components/RichTextEditor.vue
**Dependencies:** Sprint 14
**Expected output:** Full CRUD for articles and gallery
**Acceptance criteria:** Articles and gallery manageable through admin, content syncs to public website
**Testing:** Create article, upload gallery images, verify public display
**Definition of done:** Articles and gallery CRUD complete
**Risks:** Rich text editor choice needs justification (markdown vs WYSIWYG)

---

## Sprint 16 — Admin CMS: Locations, FAQ, Settings

**Goal:** Remaining CMS modules.

**Prerequisites:** Sprint 15 complete

**Tasks:**

| ID | Task | Status |
|----|------|--------|
| ADM-039 | Locations list table (admin) — name, address, phone, status, actions | Pending |
| ADM-040 | Location create/edit form — name, slug, address, phone, whatsapp, operating_hours, google_maps_url, latitude, longitude, description, status | Pending |
| ADM-041 | FAQ list table (admin) — question, category, sort_order, status | Pending |
| ADM-042 | FAQ create/edit form — question, answer, category, sort_order, status | Pending |
| ADM-043 | Testimonials list table (admin) — patient_name, rating, status | Pending |
| ADM-044 | Testimonial create/edit form — patient_name, patient_title, content, rating, is_featured, status | Pending |
| ADM-045 | Site settings page — site name, logo, contact info, social links, booking URL, SEO defaults | Pending |
| ADM-046 | Media library view — list all uploaded files, search, filter by type | Pending |
| ADM-047 | User management (super_admin only) — list users, assign roles | Pending |
| ADM-048 | Audit log viewer — list recent actions, filter by entity | Pending |

**Files affected:** src/admin/views/locations/*, src/admin/views/faq/*, src/admin/views/testimonials/*, src/admin/views/settings/*, src/admin/views/media/*, src/admin/views/users/*
**Dependencies:** Sprint 15
**Expected output:** All CMS modules functional
**Acceptance criteria:** Full CRUD for all content types, settings manageable
**Testing:** CRUD test for each module
**Definition of done:** All CMS modules complete
**Risks:** User management requires careful RLS setup

---

## Sprint 17 — Bookings & Inquiries

**Goal:** Booking and inquiry management.

**Prerequisites:** Sprint 16 complete

**Tasks:**

| ID | Task | Status |
|----|------|--------|
| ADM-049 | Bookings list table (admin) — name, service, date, status, actions | Pending |
| ADM-050 | Booking status workflow — new → confirmed → completed/cancelled | Pending |
| ADM-051 | Booking detail view — full info, notes, status change | Pending |
| ADM-052 | Inquiries list table (admin) — name, subject, status, created_at | Pending |
| ADM-053 | Inquiry status workflow — new → read → contacted → resolved | Pending |
| ADM-054 | Inquiry detail view — full message, admin notes, status change | Pending |
| ADM-055 | Contact form → Supabase inquiries table — public form submits to inquiries | Pending |
| ADM-056 | Booking redirect — public website "Buat Janji Temu" links to booking.seadentalaesthetics.id | Pending |

**Files affected:** src/admin/views/bookings/*, src/admin/views/inquiries/*, src/public/views/ContactView.vue
**Dependencies:** Sprint 16
**Expected output:** Booking and inquiry management through admin
**Acceptance criteria:** Bookings and inquiries display, status changes work, contact form submits
**Testing:** Submit inquiry via contact form, verify in admin, change status
**Definition of done:** Bookings and inquiries management complete
**Risks:** External booking system integration is redirect-only

---

## Sprint 18 — SEO / Accessibility / Performance

**Goal:** Production quality.

**Prerequisites:** Sprint 17 complete

**Tasks:**

| ID | Task | Status |
|----|------|--------|
| WEB-099 | Meta titles — unique per route, format: "Page Name | SEA Dental Aesthetics" | Pending |
| WEB-100 | Meta descriptions — unique per page, 150-160 chars | Pending |
| WEB-101 | Open Graph tags — og:title, og:description, og:image per page | Pending |
| WEB-102 | Structured data — LocalBusiness, MedicalClinic, Article, FAQPage, BreadcrumbList | Pending |
| WEB-103 | Sitemap.xml — generate from routes | Pending |
| WEB-104 | Robots.txt — allow all, disallow /admin | Pending |
| WEB-105 | Keyboard navigation audit — all interactive elements focusable and operable | Pending |
| WEB-106 | Color contrast audit — 4.5:1 ratio minimum | Pending |
| WEB-107 | prefers-reduced-motion — disable GSAP and CSS animations | Pending |
| WEB-108 | Image optimization — WebP, lazy loading, responsive srcset | Pending |
| WEB-109 | Font optimization — preload, display: swap | Pending |
| WEB-110 | Lighthouse audit — target 90+ performance, accessibility, SEO | Pending |

**Files affected:** src/router/*, index.html, src/public/views/*, src/styles/*
**Dependencies:** Sprint 17
**Expected output:** SEO-optimized, accessible, performant site
**Acceptance criteria:** Lighthouse 90+, all audit items pass
**Testing:** Lighthouse audit, WAVE accessibility check, manual keyboard test
**Definition of done:** Production quality metrics met
**Risks:** None

---

## Sprint 19 — QA / Security / Production

**Goal:** Ship-ready.

**Prerequisites:** Sprint 18 complete

**Tasks:**

| ID | Task | Status |
|----|------|--------|
| WEB-111 | Cross-browser testing — Chrome, Firefox, Safari, Edge | Pending |
| WEB-112 | Mobile testing — 375px, 390px, 414px | Pending |
| WEB-113 | Tablet testing — 768px, 1024px | Pending |
| WEB-114 | Desktop testing — 1280px, 1440px | Pending |
| WEB-115 | Content audit — no lorem ipsum, no placeholder text, no template text | Pending |
| SEC-015 | Security audit — no leaked secrets, no service-role key in frontend | Pending |
| SEC-016 | RLS policy verification — test all policies with different roles | Pending |
| WEB-116 | Performance audit — Lighthouse, bundle size check | Pending |
| WEB-117 | Accessibility audit — screen reader test, keyboard test | Pending |
| WEB-118 | Production build verification — `pnpm build` succeeds, no warnings | Pending |
| SEC-017 | Environment variable verification — .env.local correct, no secrets in source | Pending |
| WEB-119 | Deployment readiness — build output, environment config | Pending |
| WEB-120 | Final regression test — all routes, all features, all breakpoints | Pending |

**Files affected:** All
**Dependencies:** Sprint 18
**Expected output:** Production-ready application
**Acceptance criteria:** All tests pass, no security issues, no content issues
**Testing:** Full regression test
**Definition of done:** Ready to deploy
**Risks:** None

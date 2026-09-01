# PRD.md — Product Requirements Document

## 1. Product Overview

SEA Dental Aesthetics Digital Platform — consists of:

1. **Public Website** — premium, SEO-optimized public presence
2. **Admin CMS** — content management for the public website
3. **Supabase Backend** — PostgreSQL, Auth, Storage, RLS

The public website positions SEA Dental Aesthetics as a premium dental aesthetics clinic in Padang, Indonesia. The admin CMS manages all public content. Supabase provides authentication, database, storage, and row-level security.

## 2. Problem Statement

SEA Dental Aesthetics currently relies on:
- A Bootstrap template site (Medilab v4.7.1) with placeholder content (lorem ipsum in Departmen section)
- Social media (Instagram) as primary digital presence
- An external booking system with no integration
- No CMS — content changes require developer intervention
- Duplicate testimonials (3x same person)
- Disabled contact form with error messages visible
- Empty meta tags (no SEO)
- Wrong phone number in footer (61 instead of 62)

The template does not match the clinic's premium positioning. There is no centralized content management, no article system, and no admin interface.

## 3. Vision

A premium dental aesthetics digital presence that combines:
- **Clinical precision** — medical accuracy, trustworthy content
- **Elegant design** — sophisticated, not generic
- **Modern technology** — subtle futurism, not overdone
- **Operational efficiency** — CMS for easy content management

## 4. Goals

| ID | Goal |
|----|------|
| G-001 | Establish professional web presence within 19 sprints |
| G-002 | Achieve strong local SEO for "klinik gigi estetik Padang" |
| G-003 | Present all services, doctors, and locations comprehensively |
| G-004 | Drive booking conversions through clear CTAs |
| G-005 | Build content authority through educational articles |
| G-006 | Enable non-technical staff to manage content via admin CMS |
| G-007 | Implement secure, role-based access control |
| G-008 | Preserve existing GA4 and Google Ads tracking |

## 5. Non-Goals

| ID | Non-Goal |
|----|----------|
| NG-001 | Patient portal or appointment management system |
| NG-002 | Medical records or patient data management |
| NG-003 | Doctor internal portal |
| NG-004 | Billing or insurance system |
| NG-005 | Prescription management |
| NG-006 | Clinical workflow tools |
| NG-007 | Multi-language support (Indonesian only for MVP) |
| NG-008 | E-commerce or online payments |
| NG-009 | Telemedicine or video consultation |

## 6. Target Users

### Public Website
- Prospective patients researching dental aesthetics in Padang
- Existing patients seeking clinic information
- People researching specific treatments (veneer, implants, orthodontics)
- People searching for dental clinics near their location
- People looking for specific doctors
- People reading dental health education content
- People comparing clinics before booking

### Admin CMS
- Clinic administrators managing content
- Content editors publishing articles
- Staff updating service information

## 7. User Personas

### Persona 1: Rina (Prospective Patient)
- 28 years old, professional in Padang
- Wants teeth whitening before wedding
- Searches "klinik gigi estetik Padang" on Google
- Needs: services, prices, before/after results, booking

### Persona 2: Budi (Existing Patient)
- 35 years old, returning patient
- Needs to check clinic hours and location
- Wants to read dental health articles
- Needs: location info, contact, articles

### Persona 3: Admin (Content Manager)
- Clinic staff responsible for website content
- Needs to update services, add articles, manage gallery
- Not technical — needs simple, clear interface
- Needs: CRUD operations, image upload, status management

### Persona 4: Super Admin (Clinic Owner)
- Full control over system
- Manages users, settings, bookings
- Needs: dashboard, analytics, user management

## 8. User Journeys

### Prospective Patient Journey
```
Google Search → Homepage → Services → Doctors → Gallery → FAQ → Contact/Booking
```

### Existing Patient Journey
```
Direct/Bookmark → Homepage → Locations (hours/map) → Contact → WhatsApp
```

### Admin Content Journey
```
Login → Dashboard → Create/Edit Content → Publish → Public Website Updates
```

## 9. Product Principles

| Principle | Description |
|-----------|-------------|
| Premium | Not generic, not template-based |
| Trustworthy | Real doctors, real results, real testimonials |
| Clinical | Medical precision, not casual |
| Elegant | Sophisticated, not flashy |
| Modern | Technology-forward, not outdated |
| Human | Approachable, not cold |
| Precise | Attention to detail in every element |
| Fast | Performance-first, minimal JavaScript |

## 10. Information Architecture

### Public Website
```
/
├── /about
├── /services
│   └── /services/:slug
├── /doctors
│   └── /doctors/:slug
├── /technology (optional, may merge into homepage)
├── /gallery
├── /articles
│   └── /articles/:slug
├── /locations
├── /faq
├── /contact
└── /booking (external redirect to booking.seadentalaesthetics.id)
```

### Admin Panel
```
/admin
├── /login
├── /dashboard
├── /services
│   ├── /services/new
│   └── /services/:id
├── /doctors
│   ├── /doctors/new
│   └── /doctors/:id
├── /articles
│   ├── /articles/new
│   └── /articles/:id
├── /gallery
│   └── /gallery/new
├── /locations
│   ├── /locations/new
│   └── /locations/:id
├── /faq
│   └── /faq/new
├── /testimonials
│   └── /testimonials/new
├── /bookings
├── /inquiries
├── /media
├── /users (super_admin only)
└── /settings
```

## 11. Sitemap

### Public
Beranda | Tentang Kami | Layanan | Dokter | Galeri | Artikel | Lokasi | FAQ | Hubungi Kami

### Admin
Dashboard | Layanan | Dokter | Artikel | Galeri | Lokasi | FAQ | Testimoni | Booking | Inquiry | Media | Pengaturan | Pengguna

## 12. Homepage Requirements

**Purpose:** Primary entry point, establish premium positioning
**Primary user:** Prospective patient
**Route:** /

### Key Sections
1. **Hero** — "Selamat Datang di SEA Dental Aesthetics", gradient text, CTA buttons
2. **Why Choose SEA** — 3 feature cards (Penambalan Estetik, Kawat Gigi, Gigi Tiruan)
3. **About** — clinic description, video link, 3 icon boxes
4. **Stats** — 2 Dokter, 12 Layanan, 6 Departmen, 10 Dental Labs
5. **Services Preview** — 4 service cards
6. **Gallery Slider** — horizontal snap slider
7. **Testimonials** — 3 patient testimonials with ratings
8. **Partner Brands** — 3M, Straumann, Invisalign, Dentsply, GC, Ivoclar
9. **Articles Preview** — 3 article cards
10. **FAQ** — accordion with common questions
11. **Locations** — 2 branch cards with maps
12. **CTA** — consultation prompt
13. **Footer** — contact info, links, payment methods, social

**Primary CTA:** Buat Janji Temu (→ booking.seadentalaesthetics.id)
**Secondary CTA:** Promo Kami (→ Instagram stories)

**SEO:** Title: "SEA Dental Aesthetics — Klinik Gigi Estetik Padang", Description: clinic overview
**Responsive:** Mobile-first, hero stacks vertically, sections single-column on mobile

**Acceptance Criteria:**
- All sections render correctly
- Responsive at 375px, 768px, 1024px, 1280px
- All CTAs functional
- Images lazy-loaded
- Accessible (keyboard nav, screen reader)

## 13. About Page Requirements

**Purpose:** Clinic story, mission, values
**Route:** /about

### Key Sections
- Hero with clinic name
- Clinic history and mission
- General Practitioner description
- Dental Technology description
- Interactive & Communicative philosophy
- Team overview

**SEO:** Title: "Tentang Kami | SEA Dental Aesthetics"

## 14. Services Listing Page

**Purpose:** Showcase all service departments
**Route:** /services

### Content
- 6 service departments from references:
  1. Konservasi — mempertahankan dan menjaga gigi
  2. Prosthodonti — penggantian gigi hilang/patah
  3. Orthodonti — perawatan susunan gigi
  4. Periodonti — perawatan jaringan pendukung gigi
  5. Paedodonti — perawatan gigi anak
  6. Oral Surgery — bedah gigi dan mulut

**Primary CTA:** Lihat Detail → /services/:slug
**SEO:** Title: "Layanan | SEA Dental Aesthetics"

## 15. Service Detail Page

**Purpose:** Detailed service information
**Route:** /services/:slug

### Content
- Service name, description, icon
- Benefits and treatment process
- Related doctors (future: when doctor-service relationship exists)
- CTA to booking

**SEO:** Title: "[Service Name] | SEA Dental Aesthetics"

## 16. Doctors Listing Page

**Purpose:** Introduce the dental team
**Route:** /doctors

### Content
- 2 doctors:
  1. drg. Andre Anggara — Aesthetic Dentist & Implantologist, IG: @dakumiss
  2. drg. Citra Annesha Pratiwi — Dentist, IG: @chitraannesha

**Primary CTA:** Lihat Profil → /doctors/:slug
**SEO:** Title: "Dokter | SEA Dental Aesthetics"

## 17. Doctor Detail Page

**Purpose:** Individual doctor profile
**Route:** /doctors/:slug

### Content
- Photo (from references/assets)
- Name, professional title, specialization
- Biography (from references/Design.md)
- Instagram link
- CTA to booking

**SEO:** Title: "[Doctor Name] | SEA Dental Aesthetics"

## 18. Gallery Page

**Purpose:** Showcase treatment results and clinic environment
**Route:** /gallery

### Content
- 16 gallery images from references/
- Grid layout (4-col desktop, 2-col tablet, 1-col mobile)
- Lightbox for full-size viewing
- Categories: hasil perawatan, interior klinik

**SEO:** Title: "Galeri | SEA Dental Aesthetics"

## 19. Articles Listing Page

**Purpose:** Educational content, SEO authority
**Route:** /articles

### Content
- Article cards with image, category, title, excerpt, date
- Categories: Teknologi, Perawatan, Kesehatan
- Load-more or pagination

**SEO:** Title: "Artikel | SEA Dental Aesthetics"

## 20. Article Detail Page

**Purpose:** Full article reading experience
**Route:** /articles/:slug

### Content
- Breadcrumbs
- Category badge, date, author
- Featured image
- Article body
- Related articles sidebar
- Newsletter/CTA block

**SEO:** Title: "[Article Title] | SEA Dental Aesthetics"

## 21. Locations Page

**Purpose:** Help patients find clinic branches
**Route:** /locations

### Content
- 2 branches:
  1. **Simpang Haru** — Jl. DR. Sutomo No. 4, Simpang Haru, Padang. Senin-Sabtu 11.00-21.00 WIB
  2. **Baru** — Jl. Khatib Sulaiman, Padang. Senin-Minggu 10.00-20.00 WIB
- Google Maps embed
- Phone, WhatsApp, directions CTA

**SEO:** Title: "Lokasi | SEA Dental Aesthetics"

## 22. FAQ Page

**Purpose:** Answer common questions
**Route:** /faq

### Content (5 items from references)
1. Bagaimana cara menjaga kebersihan gigi dan mulut?
2. Kapan saja waktu yang tepat untuk menyikat gigi?
3. Bagaimana cara menghindari bau mulut?
4. Kapan sebaiknya pembersihan karang gigi dilakukan?
5. Apa saja yang harus diperhatikan setelah pencabutan gigi?

**SEO:** Title: "FAQ | SEA Dental Aesthetics"

## 23. Contact Page

**Purpose:** Enable patient communication
**Route:** /contact

### Content
- Contact form (name, email, phone, subject, message)
- Address: Jl. DR. Sutomo No. 4, Simpang Haru, Padang
- Email: seadentalaesthetics@gmail.com
- Phone: +62813 6632 9279
- WhatsApp: +62812 6697 1089
- Working hours: Senin-Sabtu 11.00-21.00 WIB
- Google Maps embed

**Primary CTA:** Send Message (→ Supabase inquiries table)
**Secondary CTA:** WhatsApp direct link

**SEO:** Title: "Hubungi Kami | SEA Dental Aesthetics"

## 24. Booking Redirect

**Purpose:** Direct patients to booking system
**Route:** /booking (redirect)

All "Buat Janji Temu" and "RESERVASI" buttons link to:
`https://booking.seadentalaesthetics.id/booking/register`

## 25. Navigation

### Public Navbar
- Logo (sea-logo.png)
- Brand name: "SEA Dental Aesthetics"
- Links: Beranda, Tentang Kami, Layanan, Dokter, Galeri, Artikel, Lokasi, FAQ, Hubungi Kami
- CTA: RESERVASI (→ external booking)
- Glass effect: bg-glass-surface/70, backdrop-blur-3xl

### Admin Sidebar
- Logo + "SEA Dental Admin"
- Links: Dashboard, Layanan, Dokter, Artikel, Galeri, Lokasi, FAQ, Testimoni, Booking, Inquiry, Media, Pengaturan, Pengguna
- User info + logout

## 26. Footer

### Content
- Brand: "SEA Dental Aesthetics"
- Tagline: "Klinik Gigi Estetik Padang"
- Address: Jl. DR. Sutomo No. 4, Simpang Haru, Padang, Sumatera Barat
- Hours: Senin-Sabtu 11.00-21.00 WIB
- Links: Beranda, Tentang Kami, Layanan, Dokter
- Services: Konservasi, Prosthodonti, Orthodonti, Periodonti, Paedodonti
- Payment: ATM Bersama, Visa, Mastercard, GPN, QRIS
- Social: Instagram, WhatsApp, Phone, Google Maps
- Credit: Made with ❤ by Ciphers Informatika

## 27. Content Models

### Service
- id, category_id, name, slug, short_description, full_description, icon, hero_image, is_featured, sort_order, status, seo_title, seo_description, created_at, updated_at

### Doctor
- id, name, slug, photo_url, professional_title, specialization, bio, instagram_url, is_featured, sort_order, status, seo_title, seo_description, created_at, updated_at

### Article
- id, category_id, author_id, title, slug, excerpt, content, cover_image, published_at, status, seo_title, seo_description, og_image, created_at, updated_at

### GalleryItem
- id, title, image_url, category, description, sort_order, is_featured, status, created_at

### Location
- id, name, slug, address, phone, whatsapp, operating_hours, google_maps_url, latitude, longitude, description, sort_order, status, created_at, updated_at

### FAQ
- id, question, answer, category, sort_order, status, created_at, updated_at

### Testimonial
- id, patient_name, patient_title, content, rating, is_featured, sort_order, status, created_at

### Booking
- id, name, email, phone, preferred_location, preferred_service, preferred_date, preferred_time, message, status, notes, created_at, updated_at

### Inquiry
- id, name, email, phone, subject, message, status, admin_notes, created_at, updated_at

### SiteSetting
- id, key (unique), value (jsonb), updated_at

## 28. Supabase Requirements

| Content Type | Storage | Justification |
|-------------|---------|---------------|
| Navigation | Static | Rarely changes |
| Footer | Static | Rarely changes |
| Design tokens | Static | Build-time only |
| Services | Supabase | Changes monthly+ |
| Doctors | Supabase | Changes rarely but needs admin management |
| Articles | Supabase | Changes frequently |
| Gallery | Supabase | Changes monthly |
| Locations | Supabase | Changes rarely |
| FAQs | Supabase | Changes rarely |
| Testimonials | Supabase | Changes monthly |
| Bookings | Supabase | Operational data |
| Inquiries | Supabase | Operational data |
| Settings | Supabase | Admin-managed |
| Media | Supabase Storage | File uploads |

## 29. Database Schema

### profiles
- id (uuid, PK, FK auth.users)
- full_name (text)
- avatar_url (text, nullable)
- role (enum: super_admin, editor, staff)
- created_at (timestamptz)
- updated_at (timestamptz)

### service_categories
- id (uuid, PK)
- name (text, not null)
- slug (text, unique, not null)
- description (text, nullable)
- sort_order (int, default 0)
- created_at, updated_at

### services
- id (uuid, PK)
- category_id (uuid, FK service_categories)
- name (text, not null)
- slug (text, unique, not null)
- short_description (text)
- full_description (text)
- icon (text)
- hero_image (text, nullable)
- is_featured (bool, default false)
- sort_order (int, default 0)
- status (enum: draft, published, archived)
- seo_title (text, nullable)
- seo_description (text, nullable)
- created_at, updated_at

### doctors
- id (uuid, PK)
- name (text, not null)
- slug (text, unique, not null)
- photo_url (text, nullable)
- professional_title (text)
- specialization (text)
- bio (text)
- instagram_url (text, nullable)
- is_featured (bool, default false)
- sort_order (int, default 0)
- status (enum: draft, published, archived)
- seo_title, seo_description (nullable)
- created_at, updated_at

### article_categories
- id (uuid, PK)
- name (text, not null)
- slug (text, unique, not null)
- description (text, nullable)
- created_at, updated_at

### articles
- id (uuid, PK)
- category_id (uuid, FK article_categories)
- author_id (uuid, FK profiles)
- title (text, not null)
- slug (text, unique, not null)
- excerpt (text)
- content (text)
- cover_image (text, nullable)
- published_at (timestamptz, nullable)
- status (enum: draft, published, archived)
- seo_title, seo_description, og_image (nullable)
- created_at, updated_at

### gallery_items
- id (uuid, PK)
- title (text)
- image_url (text, not null)
- category (text)
- description (text, nullable)
- sort_order (int, default 0)
- is_featured (bool, default false)
- status (enum: draft, published, archived)
- created_at

### locations
- id (uuid, PK)
- name (text, not null)
- slug (text, unique, not null)
- address (text)
- phone (text, nullable)
- whatsapp (text, nullable)
- operating_hours (text)
- google_maps_url (text, nullable)
- latitude (decimal, nullable)
- longitude (decimal, nullable)
- description (text, nullable)
- sort_order (int, default 0)
- status (enum: draft, published, archived)
- created_at, updated_at

### faqs
- id (uuid, PK)
- question (text, not null)
- answer (text, not null)
- category (text, nullable)
- sort_order (int, default 0)
- status (enum: draft, published, archived)
- created_at, updated_at

### testimonials
- id (uuid, PK)
- patient_name (text, not null)
- patient_title (text)
- content (text, not null)
- rating (int, default 5)
- is_featured (bool, default false)
- sort_order (int, default 0)
- status (enum: draft, published, archived)
- created_at

### bookings
- id (uuid, PK)
- name (text, not null)
- email (text)
- phone (text)
- preferred_location (text)
- preferred_service (text)
- preferred_date (date, nullable)
- preferred_time (time, nullable)
- message (text, nullable)
- status (enum: new, confirmed, completed, cancelled)
- notes (text, nullable)
- created_at, updated_at

### inquiries
- id (uuid, PK)
- name (text, not null)
- email (text)
- phone (text)
- subject (text)
- message (text, not null)
- status (enum: new, read, contacted, resolved)
- admin_notes (text, nullable)
- created_at, updated_at

### site_settings
- id (uuid, PK)
- key (text, unique, not null)
- value (jsonb)
- updated_at (timestamptz)

### media_assets
- id (uuid, PK)
- filename (text)
- original_filename (text)
- bucket (text)
- path (text)
- mime_type (text)
- size (int)
- uploaded_by (uuid, FK profiles)
- created_at

### audit_logs
- id (uuid, PK)
- user_id (uuid, FK profiles)
- action (text)
- entity_type (text)
- entity_id (uuid)
- metadata (jsonb)
- created_at

## 30. Authentication

- Supabase Auth with email/password
- Login at /admin/login
- Session persistence via Supabase (localStorage)
- Password reset via Supabase Auth
- No custom password authentication

## 31. Authorization / Roles

| Role | View | Create | Edit | Publish | Delete | Manage Users | Manage Settings |
|------|------|--------|------|---------|--------|--------------|-----------------|
| super_admin | All | All | All | All | All | Yes | Yes |
| editor | All | Content | Content | Content | Content | No | No |
| staff | Published + own | No | Limited | No | No | No | No |

## 32. RLS Policies

### Public Content
- Anonymous users: READ published records only
- Applies to: services, doctors, articles, gallery_items, locations, faqs, testimonials

### Admin Content
- Authenticated users with role: CRUD according to role
- Applies to: all tables

### User Profiles
- Users read own profile
- super_admin reads all profiles

### Bookings/Inquiries
- Anonymous can INSERT (contact form)
- Admin can READ/UPDATE according to role

## 33. Storage Strategy

| Bucket | Public Read | Upload | Replace | Delete |
|--------|-------------|--------|---------|--------|
| public-assets | Yes | Admin | Admin | Admin |
| doctor-images | Yes | Admin | Admin | Admin |
| gallery | Yes | Admin | Admin | Admin |
| article-images | Yes | Admin | Admin | Admin |

- File types: jpg, jpeg, png, webp, gif
- Max file size: 5MB
- Naming: entity-type/uuid.ext
- CDN: Supabase handles

## 34. CMS Workflow

Content lifecycle: **draft → published → archived**

- Public website only displays published content
- Admin can preview drafts
- Status changes logged in audit_logs

## 35. SEO Requirements

| Element | Requirement |
|---------|-------------|
| Page titles | Unique per route, format: "Page \| SEA Dental Aesthetics" |
| Meta descriptions | Unique per page, 150-160 chars |
| Canonical URLs | Self-referencing |
| Open Graph | og:title, og:description, og:image per page |
| Structured data | LocalBusiness, MedicalClinic, Article, FAQPage, BreadcrumbList |
| Sitemap | Generated from routes |
| Robots.txt | Allow all, disallow /admin |
| Semantic HTML | Landmarks, heading hierarchy, lists |
| Image alt text | Descriptive for all meaningful images |
| Clean URLs | kebab-case slugs |

## 36. Accessibility Requirements

- WCAG-aware implementation
- Keyboard navigation on all interactive elements
- Focus visible states
- Color contrast 4.5:1 minimum
- Semantic HTML
- ARIA only when native semantics insufficient
- Accessible sliders (keyboard, screen reader)
- Accessible mobile navigation (focus trap)
- prefers-reduced-motion support
- Alt text on all meaningful images
- Form labels and error announcements

## 37. Performance Requirements

- Responsive images (srcset, sizes)
- Lazy loading (loading="lazy")
- WebP/AVIF where practical
- Font optimization (display: swap, preload)
- Code splitting via route-level lazy loading
- Minimal JavaScript (tree-shaking)
- Efficient Supabase queries (select needed fields)
- No layout shift (aspect-ratio on images)
- GSAP only for complex animations
- Caching headers where appropriate

## 38. Responsive Requirements

| Breakpoint | Layout |
|------------|--------|
| 375px | Mobile — single column, stacked sections |
| 390px | Mobile — same as 375px |
| 430px | Mobile — same as 375px |
| 768px | Tablet — 2-column grids, sidebar appears |
| 1024px | Desktop — 3-column grids, full navigation |
| 1280px | Desktop — max container width |
| 1440px+ | Desktop — centered container |

## 39. Analytics

- GA4: G-TNZMMM7JFT (preserve existing)
- Google Ads: AW-17374334711 (preserve existing)
- Event tracking: CTA clicks, form submissions (recommended, future)

## 40. Functional Requirements

| ID | Requirement |
|----|-------------|
| FR-001 | Public website displays homepage with all sections |
| FR-002 | Public website displays services listing and detail pages |
| FR-003 | Public website displays doctors listing and detail pages |
| FR-004 | Public website displays gallery with lightbox |
| FR-005 | Public website displays articles listing and detail pages |
| FR-006 | Public website displays locations with maps |
| FR-007 | Public website displays FAQ accordion |
| FR-008 | Public website displays contact form |
| FR-009 | Contact form submits to Supabase inquiries table |
| FR-010 | Booking buttons redirect to booking.seadentalaesthetics.id |
| FR-011 | Admin can login with email/password |
| FR-012 | Admin can CRUD services |
| FR-013 | Admin can CRUD doctors |
| FR-014 | Admin can CRUD articles |
| FR-015 | Admin can CRUD gallery items |
| FR-016 | Admin can CRUD locations |
| FR-017 | Admin can CRUD FAQs |
| FR-018 | Admin can CRUD testimonials |
| FR-019 | Admin can manage bookings (status changes) |
| FR-020 | Admin can manage inquiries (status changes) |
| FR-021 | Admin can upload images to Supabase Storage |
| FR-022 | Admin can manage site settings |
| FR-023 | Admin can manage users (super_admin only) |
| FR-024 | Content status: draft/published/archived |
| FR-025 | Only published content visible on public website |
| FR-026 | Navbar glass effect on scroll |
| FR-027 | Mobile navigation drawer with focus trap |
| FR-028 | Footer displays correct contact info |
| FR-029 | Footer displays payment methods |
| FR-030 | Responsive at all breakpoints |
| FR-031 | Keyboard navigation on all interactive elements |
| FR-032 | Screen reader reads meaningful content |
| FR-033 | GSAP animations respect prefers-reduced-motion |
| FR-034 | Images lazy-loaded below fold |
| FR-035 | Meta titles unique per route |
| FR-036 | Meta descriptions unique per page |
| FR-037 | Open Graph tags present |
| FR-038 | Structured data for LocalBusiness |
| FR-039 | Sitemap.xml generated |
| FR-040 | Robots.txt allows public, disallows /admin |
| FR-041 | Supabase queries handle loading/error/empty states |
| FR-042 | Admin CRUD handles validation errors |
| FR-043 | Admin handles slug uniqueness |
| FR-044 | Image upload validates file type and size |
| FR-045 | Auth route guards protect /admin/* routes |
| FR-046 | RLS policies enforce access at database level |
| FR-047 | Audit logs record admin actions |
| FR-048 | Password reset flow works |
| FR-049 | Session persists across page reloads |
| FR-050 | Logout clears session and redirects |
| FR-051 | 403 state for unauthorized access |
| FR-052 | Dashboard shows real database metrics |
| FR-053 | Gallery displays all 16 images |
| FR-054 | Doctor photos load from assets |
| FR-055 | All CTAs functional and correct |
| FR-056 | WhatsApp links open correct number |
| FR-057 | Phone links open dialer |
| FR-058 | Email links open mail client |
| FR-059 | Google Maps embeds work |
| FR-060 | No console errors in production |
| FR-061 | No TypeScript errors |
| FR-062 | Build succeeds without warnings |
| FR-063 | No placeholder text in production |
| FR-064 | No lorem ipsum in production |
| FR-065 | No template text in production |
| FR-066 | Lighthouse performance 90+ |
| FR-067 | Lighthouse accessibility 90+ |
| FR-068 | Lighthouse SEO 90+ |

## 41. Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| NFR-001 | TypeScript strict mode |
| NFR-002 | ESLint configured |
| NFR-003 | Prettier configured |
| NFR-004 | Code splitting via lazy loading |
| NFR-005 | Bundle size < 500KB initial |
| NFR-006 | First contentful paint < 2s |
| NFR-007 | Largest contentful paint < 3s |
| NFR-008 | Cumulative layout shift < 0.1 |
| NFR-009 | No jQuery dependency |
| NFR-010 | No Bootstrap dependency |
| NFR-011 | Max 2-3 GSAP animations per page |
| NFR-012 | Images optimized (WebP preferred) |
| NFR-013 | Fonts preloaded |
| NFR-014 | Environment variables not committed |
| NFR-015 | No secrets in source code |
| NFR-016 | RLS mandatory on all protected tables |
| NFR-017 | Service-role key never in frontend |
| NFR-018 | Input validation on all forms |
| NFR-019 | File upload validates type and size |
| NFR-020 | Admin routes require authentication |
| NFR-021 | Audit logs for admin actions |
| NFR-022 | Database migrations are versioned |
| NFR-023 | Seed data from references only |
| NFR-024 | No barrel exports (index.ts) |
| NFR-025 | Components max ~200 lines |

## 42. Security Requirements

| ID | Requirement |
|----|-------------|
| SEC-001 | Supabase anon key only in frontend |
| SEC-002 | Service-role key never in frontend |
| SEC-003 | Database passwords not in source code |
| SEC-004 | RLS enforced at database level |
| SEC-005 | Admin routes require authentication |
| SEC-006 | Role-based access control enforced |
| SEC-007 | Input validation on client side |
| SEC-008 | File upload validates MIME type |
| SEC-009 | File upload validates file size |
| SEC-010 | XSS prevention via template escaping |
| SEC-011 | CORS configured for Supabase |
| SEC-012 | Rate limiting on contact form (future) |
| SEC-013 | Audit logging for admin actions |
| SEC-014 | Session timeout handled by Supabase |
| SEC-015 | No sensitive data in logs |
| SEC-016 | HTTPS enforced |
| SEC-017 | Environment variables in .env.local only |
| SEC-018 | No hardcoded credentials |
| SEC-019 | Password reset via Supabase Auth |
| SEC-020 | Storage policies enforce access |

## 43. Database Requirements

| ID | Requirement |
|----|-------------|
| DB-001 | All tables have UUID primary keys |
| DB-002 | All tables have created_at timestamps |
| DB-003 | Mutable tables have updated_at timestamps |
| DB-004 | Slug fields are unique per entity type |
| DB-005 | Status fields use enum types |
| DB-006 | Foreign keys for all relationships |
| DB-007 | Indexes on slug and status columns |
| DB-008 | RLS enabled on all tables |
| DB-009 | Migrations are versioned in supabase/migrations/ |
| DB-010 | Seed data from references/ only |
| DB-011 | No JSON blobs for structured data |
| DB-012 | Normalized categories (service_categories, article_categories) |
| DB-013 | profiles FK to auth.users |
| DB-014 | articles FK to profiles (author) |
| DB-015 | services FK to service_categories |
| DB-016 | articles FK to article_categories |
| DB-017 | audit_logs FK to profiles |
| DB-018 | media_assets FK to profiles |
| DB-019 | site_settings key is unique |
| DB-020 | Decimal fields for lat/lng |

## 44. Acceptance Criteria

### Public Website
- All routes render without errors
- Responsive at 375px, 768px, 1024px, 1280px
- All content matches references/Design.md
- All CTAs functional
- All images load with alt text
- Keyboard navigation works
- Screen reader reads meaningful content
- No console errors
- Lighthouse 90+ on all metrics

### Admin CMS
- Login/logout works
- All CRUD operations work
- Image upload works
- Status management works
- Validation errors display correctly
- Loading states display correctly
- Empty states display correctly
- Role-based access enforced
- Unauthorized users cannot access admin

### Database
- All migrations apply cleanly
- RLS policies enforce access
- No service-role key exposed
- Audit logs record actions

## 45. Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Rich text editor choice | Medium | Use markdown initially, upgrade to WYSIWYG if needed |
| Image optimization | Medium | Use Supabase CDN, add optimization later |
| External booking integration | Low | Redirect only — no API integration needed |
| Seed data accuracy | Medium | Use only data from references/ |
| Content availability | Medium | Use CONTENT_REQUIRED for missing content |
| Supabase region latency | Low | Choose closest region |
| Admin user setup | Low | Manual setup in Supabase dashboard |

## 46. Assumptions

| Item | Status |
|------|--------|
| Supabase project exists (pelnitocxannomjltoci) | CONFIRMED |
| External booking system remains external | CONFIRMED |
| 2 doctors are the complete list | CONFIRMED |
| 6 services are the complete list | CONFIRMED |
| 2 locations are the complete list | CONFIRMED |
| 16 gallery images are the complete set | CONFIRMED |
| 5 FAQs are the complete list | CONFIRMED |
| GA4 and Google Ads tracking should be preserved | CONFIRMED |
| Payment methods shown in footer are final | CONFIRMED |
| Bahasa Indonesia only | CONFIRMED |
| No multi-language needed for MVP | ASSUMED |
| No e-commerce needed | CONFIRMED |
| Booking remains external | CONFIRMED |
| Article content needs to be created | OPEN QUESTION |

## 47. Open Questions

| ID | Question | Impact |
|----|----------|--------|
| Q-001 | Is the Supabase region ap-south-1? | Low |
| Q-002 | Are partner brands (3M, Straumann, etc.) official partners? | Low |
| Q-003 | Is promo content (Promo Scaling Rp 199.000) current? | Medium |
| Q-004 | Should Technology be a separate page or homepage section? | Low |
| Q-005 | What rich text editor for articles? (Markdown vs WYSIWYG) | Medium |
| Q-006 | Who are the initial admin users? | Medium |
| Q-007 | Is email notifications needed for bookings/inquiries? | Medium |
| Q-008 | Should gallery have categories? | Low |
| Q-009 | Are there actual article contents to import? | High |
| Q-010 | Should the contact form have CAPTCHA? | Low |
| Q-011 | What analytics beyond GA4 are needed? | Low |
| Q-012 | Is there a favicon and apple-touch-icon available? | Low |

## Appendix A: Contact Information

- Email: seadentalaesthetics@gmail.com
- Phone: +62813 6632 9279
- WhatsApp: +62812 6697 1089
- Instagram: @seadentalaesthetics_
- Google Maps: https://goo.gl/maps/LkT48FJyr2uuESkP8

## Appendix B: Partner Brands

3M, Straumann, Invisalign, Dentsply, GC, Ivoclar

## Appendix C: Testimonials

1. **Silvi Triana Helmi** — Mahasiswa
   "Pengalaman saya selama perawatan gigi di SEA Dental Aesthetics dari segi pelayanan disini sangat baik, dilayani oleh dokter yang baik, ramah selama perawatan. Kualitas dari hasil perawatan sampai pemasangan crown bagus. Sangat recommended perawatan gigi disini."

2. **Sri Mutmainah** — Pasien Estetik
   "Pelayanan memuaskan, tempat juga bersih dan wangi pokoknya terbaik."

3. **Lala** — Pasien Scaling
   "Seneng banget perawatan disinii, dokter nya the best dan ramah-ramah juga, pelayanannya superr best bangett."

## Appendix D: FAQ Content

1. **Bagaimana cara menjaga kebersihan gigi dan mulut?**
   Menjaga kebersihan rongga mulut dapat dilakukan dengan: menyikat gigi 2x sehari, berkumur dengan obat kumur, rutin membersihkan karang gigi (6 bulan sekali), kontrol ke dokter gigi minimal 6 bulan sekali.

2. **Kapan saja waktu yang tepat untuk menyikat gigi?**
   Waktu yang dianjurkan adalah pada pagi hari setelah sarapan dan malam sebelum tidur.

3. **Bagaimana cara menghindari bau mulut?**
   Menyikat gigi 2x sehari, rutin mengganti sikat gigi (2 bulan sekali), berkumur dengan obat kumur, rutin membersihkan karang gigi, banyak minum air putih, mengkonsumsi makanan sehat, hindari merokok.

4. **Kapan sebaiknya pembersihan karang gigi dilakukan?**
   Idealnya minimal 6 bulan sekali (2 kali dalam setahun). Pada kasus tertentu, minimal 3 bulan sekali.

5. **Apa saja yang harus diperhatikan setelah pencabutan gigi?**
   Menggigit tampon 30-45 menit, hindari bermain lidah di daerah pasca pencabutan, hindari makanan/minuman panas, dianjurkan makanan/minuman dingin, hindari merokok, minum obat pereda nyeri jika dibutuhkan.

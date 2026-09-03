# Agents.md — AI Coding Agent Guide

## 1. Project Context
SEA Dental Aesthetics Digital Platform — premium dental aesthetics clinic in Padang, Indonesia. Two surfaces: Public Website and Admin CMS. Supabase backend. Currently on Bootstrap template (Medilab v4.7.1), rebuilding as Vue 3 SPA.

## 2. Scope
Public Website + Admin CMS + Supabase Backend
Out of scope: Patient Portal, Medical Records, Doctor Portal, Billing, Prescriptions, Clinical Workflow

## 3. Technology Stack
Frontend: Vue 3, TypeScript (strict), Vite, Vue Router (lazy-loaded), Pinia, Tailwind CSS, GSAP
Backend: Supabase (PostgreSQL, Auth, Storage, RLS, Edge Functions when needed)
Package manager: pnpm
Language: Bahasa Indonesia (user-facing), English (code/tech)

## 4. Repository Structure
```
sea_dental/
├── references/          # Design source of truth
├── src/
│   ├── public/          # Public website
│   │   ├── components/
│   │   ├── views/
│   │   └── layouts/
│   ├── admin/           # Admin CMS
│   │   ├── components/
│   │   ├── views/
│   │   └── layouts/
│   ├── components/      # Shared components
│   ├── composables/     # Shared composables
│   ├── services/        # Supabase client, API layer
│   ├── stores/          # Pinia stores
│   ├── router/          # Vue Router config
│   ├── types/           # TypeScript interfaces
│   ├── assets/          # Images, fonts (migrated from references/)
│   └── styles/          # Tailwind config, global styles
├── supabase/
│   ├── migrations/
│   ├── seed/
│   └── functions/
├── Agents.md
├── PRD.md
├── Sprint.md
└── Prompts.md
```

## 5. Source of Truth
- references/Design.md — visual design system (colors, typography, spacing, components)
- references/ — HTML prototypes, screenshots, real assets (logo, doctors, gallery)
- Never invent colors, fonts, spacing — always reference Design.md
- Never replace real SEA assets with stock images

## 6. Reference Analysis Rules
Before any UI work:
1. Read references/Design.md
2. Inspect relevant prototype code.html
3. Inspect screenshots if available
4. Extract patterns, don't copy prototypes wholesale
5. Apply unified design direction per PRD

## 7. Architecture Rules
- Vue 3 Composition API with <script setup> exclusively
- Views: one per route, lazy-loaded
- Components: single responsibility, max ~200 lines
- Composables: reusable logic (useScrollAnimation, useSupabaseQuery, useAuth)
- Stores: Pinia for shared state (auth, navigation, UI)
- Services: src/services/supabase.ts — client singleton
- Types: src/types/ — TypeScript interfaces for all domain models
- Router: lazy-loaded routes, admin routes guarded
- No barrel exports — direct imports only

## 8. Vue Rules
- defineProps<T>() with interfaces
- defineEmits<T>()
- Prefer composables over direct DOM manipulation
- Template refs for animation targets
- No mixins — use composables
- Provide/inject only for truly global deps

## 9. Component Rules
- Single file components
- Props defined with TypeScript interfaces
- Events defined with defineEmits
- Max ~200 lines, split if larger
- Semantic HTML first
- Accessibility on all interactive elements

## 10. Supabase Rules
- Client: src/services/supabase.ts — never instantiate inline
- Use .env for VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY only
- Every query: handle loading, error, empty states
- Fetch only needed fields — never select('*') without reason
- RLS is authoritative — frontend guards are UX, not security
- Storage: use helper for image URLs, never construct manually

## 11. PostgreSQL Rules
- Migration-driven schema changes only
- supabase/migrations/ for all DDL
- Normalized tables — no massive JSON blobs
- Foreign keys for relationships
- Indexes on frequently queried columns
- Slug strategy: kebab-case, unique per entity type
- Status: draft/published/archived where applicable
- Timestamps: created_at, updated_at on all tables

## 12. Auth Rules
- Supabase Access Token : sbp_v0_703027e9d7a59a999b83807ba8809da4bfa006ca
- Supabase Auth only — no custom password auth
- Login/logout/session via composables
- Session persistence: Supabase handles
- Password reset: Supabase Auth
- Admin routes: guarded by auth composable
- Unauthenticated → /admin/login
- Unauthorized role → 403 state

## 13. RLS Rules
- Mandatory on all tables with protected data
- Public content: anonymous READ published records only
- Admin: authenticated, role-based CRUD
- Never expose service-role key to browser
- Test RLS policies after schema changes

## 14. Storage Rules
- Buckets: public-assets, doctor-images, gallery, article-images
- Public read for published content buckets
- Admin upload/replace/delete
- File type validation (images: jpg, png, webp)
- Max file size: 5MB
- File naming: entity-type/unique-id.ext
- Optimization: Supabase handles CDN

## 15. CMS Rules
- Content types: services, doctors, articles, gallery, locations, faqs, testimonials
- Status lifecycle: draft → published → archived
- Only published content visible on public website
- CRUD through admin panel
- Validation on client + database constraints
- Slug auto-generation from title

## 16. Admin Rules
- Functional, clean, fast, information-dense design
- NOT visually identical to public website
- Sidebar navigation (desktop), drawer (mobile)
- Dashboard with real metrics from database
- CRUD for all content types
- Media management
- Booking/inquiry management
- User management (super_admin only)
- Settings management

## 17. Public Website Rules
- Premium, editorial, immersive, visual, marketing-oriented
- Follows Design.md exactly
- Responsive mobile-first
- SEO-optimized
- Accessible
- Fast loading

## 18. Security Rules
- Environment variables: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY only
- No service-role key in frontend
- No database passwords in source code
- No secrets in logs or error messages
- Input validation on all forms
- Output sanitization
- File upload validation
- RLS enforced at database level
- Admin auth required for protected routes

## 19. Accessibility Rules
- WCAG-aware implementation
- Keyboard navigation on all interactive elements
- Focus visible states
- Color contrast ratios (4.5:1 minimum)
- Semantic HTML (landmarks, headings, lists)
- ARIA only when native semantics insufficient
- Accessible sliders (keyboard, screen reader)
- Accessible mobile navigation (focus trap)
- prefers-reduced-motion: disable non-essential animations
- Alt text on all meaningful images
- Form labels and error announcements

## 20. Performance Rules
- Responsive images (srcset, sizes)
- Lazy loading (loading="lazy") on below-fold images
- WebP/AVIF where practical
- Font optimization (display: swap, preload)
- Code splitting via route-level lazy loading
- Minimal JavaScript (tree-shaking)
- Efficient Supabase queries (select needed fields)
- No layout shift (aspect-ratio, width/height on images)
- GSAP only for complex animations — CSS transitions first
- Caching headers where appropriate

## 21. Animation Rules
- Order: CSS transitions → Vue transitions → GSAP
- GSAP for: hero reveal, scroll-triggered sections, horizontal sliders
- CSS for: hover states, focus states, color transitions
- Vue transitions for: route changes, modal open/close
- ALWAYS respect prefers-reduced-motion
- No constant movement, no excessive bounce
- Max 2-3 GSAP animations per page

## 22. SEO Rules
- Page titles: unique per route
- Meta descriptions: unique per page
- Canonical URLs
- Open Graph tags (og:title, og:description, og:image)
- Structured data: LocalBusiness, MedicalClinic, Article, FAQPage, BreadcrumbList
- Sitemap.xml
- Robots.txt
- Semantic HTML (landmarks, heading hierarchy)
- Image alt text
- Clean URLs (kebab-case slugs)
- Article SEO: title, description, OG image, published date
- Local SEO: clinic address, phone, hours in structured data

## 23. Testing Rules
- TypeScript strict mode — catch type errors at compile time
- ESLint — catch code quality issues
- Manual responsive testing at 375px, 768px, 1024px, 1280px
- Manual keyboard navigation testing
- Lighthouse audit before production
- RLS policy testing after schema changes
- No automated test framework introduced without justification

## 24. Git / Change Management Rules
- Before modifying: inspect existing code, understand architecture
- One concern per commit
- Avoid unrelated refactors
- Test affected functionality
- Report: files changed, what was done, trade-offs

## 25. Definition of Done
A task is complete when:
- Code compiles with no TypeScript errors
- No console errors in browser
- Responsive at 375px, 768px, 1024px, 1280px
- Keyboard navigation works
- Screen reader reads meaningful content
- Loading/error/empty states handled
- No hardcoded placeholder text (use CONTENT_REQUIRED)
- Follows Design.md tokens exactly
- RLS policies tested (if database change)
- No secrets exposed

## 26. Forbidden Practices
- Do NOT use React, Next.js, Nuxt, Laravel, Firebase, MongoDB
- Do NOT add dependencies without justification
- Do NOT create barrel exports (index.ts re-exporting)
- Do NOT invent business data — use CONTENT_REQUIRED
- Do NOT replace real SEA assets with stock
- Do NOT skip accessibility
- Do NOT expose secrets
- Do NOT modify references/ directory
- Do NOT build patient portal or admin features outside scope
- Do NOT use service-role key in frontend

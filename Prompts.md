# Prompts.md — V2: 39 Phases

> Reusable agent prompts for Sea Dental — public website + admin CMS.
> Stack: Vue 3 + TypeScript + Vite + Vue Router + Pinia + Tailwind CSS + GSAP + Supabase

---

## Quick Reference

| Key | Value |
|-----|-------|
| Stack | Vue 3, TypeScript, Vite, Vue Router, Pinia, Tailwind CSS, GSAP, Supabase |
| Design System | `references/Design.md` — Medical Futurist, Plus Jakarta Sans + Inter |
| Colors | primary `#112675`, deep-navy `#1A265E`, cyan-tech `#00F2FF` |
| Container | 1280px max, section padding 120px |
| Icons | Google Material Symbols |
| Navbar | Glassmorphism |
| Supabase | `pelnitocxannomjltoci` |
| Language | Bahasa Indonesia |
| Data | 2 doctors, 6 services, 2 locations, 16 gallery images, 5 FAQs |

---

## Prompt Template

Every prompt below follows this structure:

```
## Phase XX — [Name]

**Objective:** ...
**Context:** ...
**Files to Inspect:** ...
**Requirements:** ...
**Constraints:** ...
**Implementation:** ...
**Acceptance Criteria:** ...
**Validation:** ...
**Expected Output:** ...
```

---

## Phase 01 — Repository Audit

**Objective:** Survey the entire repository, map its structure, identify what exists and what is missing. Produce a concise audit report.

**Context:** This is the first step before any implementation. The agent must understand the codebase before modifying anything.

**Files to Inspect:**
- Root directory structure
- `package.json`, `tsconfig.json`, `vite.config.ts`
- `src/` — all subdirectories
- `references/` — all design docs
- `AGENTS.md`, `PRD.md`, `Sprint.md`
- Any existing components, layouts, stores, router config
- `.env` files, Supabase config files

**Requirements:**
1. List every directory and its purpose.
2. List every dependency in `package.json` and whether it's used.
3. Identify all existing Vue components, pages, layouts, stores, composables.
4. Identify all route definitions.
5. Identify Supabase configuration status.
6. Note any missing files referenced in AGENTS.md or PRD.md.
7. Flag any dead code, unused imports, or orphaned files.

**Constraints:**
- Do not modify any files.
- Do not install or remove packages.
- Report only.

**Implementation:**
1. Run `find . -type f | head -200` to map the repo.
2. Read `package.json` for dependencies and scripts.
3. Read `tsconfig.json` and `vite.config.ts`.
4. Read `src/` recursively — list all `.vue`, `.ts`, `.scss` files.
5. Read `references/` — list all design documents.
6. Read `AGENTS.md`, `PRD.md`, `Sprint.md` if present.
7. Check for Supabase client setup (`src/lib/supabase.ts` or similar).
8. Check router for existing routes and guards.
9. Check Pinia stores for existing state definitions.
10. Produce a structured audit report.

**Acceptance Criteria:**
- Report covers: directory tree, dependencies, components, routes, stores, config status.
- Missing items are explicitly listed.
- No files were modified.

**Validation:**
- Verify report accuracy by cross-referencing `package.json` with actual imports.

**Expected Output:**
A Markdown audit report with sections: Directory Structure, Dependencies, Components, Routes, Stores, Configuration, Missing Items, Recommendations.

---

## Phase 02 — Reference Analysis

**Objective:** Read all reference documents in `references/` and extract the complete design specification — typography, colors, spacing, layout rules, component patterns, and brand voice.

**Context:** All visual decisions must follow `references/Design.md`. The agent must internalize this before building any UI.

**Files to Inspect:**
- `references/Design.md`
- Any other files in `references/`
- `src/assets/` for existing styles or tokens

**Requirements:**
1. Extract color palette with hex values.
2. Extract typography scale — font families, sizes, weights, line heights.
3. Extract spacing system — paddings, margins, gaps.
4. Extract layout rules — container widths, breakpoints, section patterns.
5. Extract component patterns — cards, buttons, badges, forms.
6. Extract brand voice and tone guidelines.
7. Extract icon usage rules.
8. Extract glassmorphism specs if defined.

**Constraints:**
- Do not modify any files.
- Do not invent design values not in the reference docs.
- If a value is missing, flag it as "not defined in reference."

**Implementation:**
1. Read `references/Design.md` completely.
2. Parse and extract every design token.
3. Cross-reference with `tailwind.config.js` or `tailwind.config.ts` if present.
4. Cross-reference with `src/assets/` styles.
5. Produce a structured design spec summary.

**Acceptance Criteria:**
- Every color, font, spacing, and layout value is extracted.
- Design spec summary is complete and ready for implementation.
- No hallucinated values.

**Validation:**
- Verify extracted values match source document exactly.

**Expected Output:**
A Markdown design spec with sections: Colors, Typography, Spacing, Layout, Components, Brand Voice, Icons, Glassmorphism, Breakpoints.

---

## Phase 03 — Project Foundation

**Objective:** Establish the project skeleton — Vite config, Tailwind config, TypeScript config, path aliases, global styles, Supabase client, router skeleton, Pinia setup.

**Context:** This phase sets up the base infrastructure that all subsequent phases build upon.

**Files to Inspect:**
- `package.json`
- `vite.config.ts`
- `tsconfig.json`
- `tailwind.config.js` or `tailwind.config.ts`
- `src/main.ts`
- `src/App.vue`
- `src/router/index.ts`
- `src/stores/` directory
- `src/assets/` directory
- `src/lib/supabase.ts` or `src/supabase/client.ts`
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. Vite config: resolve aliases (`@` → `src/`), build output, plugins.
2. Tailwind config: extend theme with design system tokens (colors, fonts, spacing, container, breakpoints).
3. TypeScript config: strict mode, path aliases, types for `.vue` files.
4. Global styles: reset/base, typography imports (Plus Jakarta Sans + Inter from Google Fonts), CSS custom properties for design tokens.
5. Supabase client: create `src/lib/supabase.ts` with `createClient` using env vars.
6. Router skeleton: define routes for public pages and admin pages, lazy-loaded.
7. Pinia: export pinia instance from `main.ts`.
8. `App.vue`: minimal shell with `<RouterView />`.

**Constraints:**
- Inspect repository before modifying.
- Inspect `references/` before visual decisions.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not invent business data.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Read existing config files.
2. Update `vite.config.ts` with path aliases.
3. Update `tailwind.config.js` with design tokens from `references/Design.md`.
4. Update `tsconfig.json` with strict mode and paths.
5. Create `src/assets/styles/main.css` with Tailwind directives and base styles.
6. Create `src/lib/supabase.ts` with client setup.
7. Create `src/router/index.ts` with route stubs.
8. Update `src/main.ts` to import styles, mount Pinia, mount app.
9. Update `src/App.vue` with `<RouterView />`.
10. Run `npm run dev` to verify build.
11. Run type check if available.

**Acceptance Criteria:**
- `npm run dev` starts without errors.
- Tailwind classes work in any component.
- Path aliases resolve.
- Supabase client is importable.
- Router renders `<RouterView />`.

**Validation:**
- Run `npm run dev` — confirm no console errors.
- Run `npx vue-tsc --noEmit` or equivalent type check.

**Expected Output:**
Working development server with base configuration, ready for component development.

---

## Phase 04 — Design System

**Objective:** Implement the reusable design system — Tailwind config tokens, global CSS variables, base typography, reusable utility classes, and component primitives (button, card, badge, section container).

**Context:** Every subsequent UI phase depends on this design system being in place.

**Files to Inspect:**
- `tailwind.config.js` or `tailwind.config.ts`
- `src/assets/styles/` directory
- `references/Design.md`
- `src/components/ui/` or `src/components/common/` if they exist

**Requirements:**
1. Complete Tailwind theme extension with all design tokens.
2. CSS custom properties for colors, fonts, spacing (for GSAP/JS access).
3. Typography scale: headings h1–h6, body text, captions.
4. Reusable component classes or Vue components:
   - Button (primary, secondary, ghost variants + sizes)
   - Card (glass, solid, outline variants)
   - Badge
   - Section container (1280px max, 120px padding)
   - Section heading pattern
5. Material Symbols icon component or utility.
6. Glassmorphism utility classes.

**Constraints:**
- Inspect repository before modifying.
- Inspect `references/` before visual decisions.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not invent business data.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Update `tailwind.config.js` with full design token mapping.
2. Create `src/assets/styles/main.css` or extend existing with typography and utilities.
3. Create `src/components/ui/BaseButton.vue` with variants.
4. Create `src/components/ui/BaseCard.vue` with variants.
5. Create `src/components/ui/BaseBadge.vue`.
6. Create `src/components/ui/SectionContainer.vue` with 1280px max and 120px padding.
7. Create `src/components/ui/SectionHeading.vue` with title + subtitle pattern.
8. Create `src/components/ui/MaterialIcon.vue` wrapper.
9. Add glassmorphism utility classes to CSS.
10. Run dev server and verify components render.

**Acceptance Criteria:**
- All Tailwind tokens match `references/Design.md` values.
- Button, Card, Badge, SectionContainer, SectionHeading components exist and render.
- Typography scale produces correct visual hierarchy.
- Glassmorphism utility works with `class="glass"`.

**Validation:**
- Create a temporary test page rendering all components with all variants.
- Visual check that colors, fonts, spacing match design spec.

**Expected Output:**
Complete design system with Tailwind config, CSS, and 6 base UI components.

---

## Phase 05 — Public Navbar

**Objective:** Build the glassmorphism navigation bar — logo, nav links, mobile hamburger menu, scroll behavior, active route highlighting.

**Context:** The navbar is the first element visitors see. It must be glassmorphism, responsive, and follow `references/Design.md`.

**Files to Inspect:**
- `references/Design.md`
- `src/App.vue`
- `src/router/index.ts`
- `src/components/ui/` (existing components from Phase 04)
- `src/assets/` for logo SVGs
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. Glassmorphism background (backdrop-blur + semi-transparent bg).
2. Logo on the left (SVG preferred).
3. Navigation links: Home, Layanan, Dokter, Teknologi, Galeri, Artikel, Lokasi, Hubungi Kami.
4. Active route highlighting with primary color.
5. Mobile: hamburger icon, slide-in or dropdown menu.
6. Scroll behavior: navbar becomes slightly more opaque on scroll.
7. Sticky/fixed position at top.
8. Smooth transitions with GSAP for menu open/close.

**Constraints:**
- Inspect repository before modifying.
- Inspect `references/` before visual decisions.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not invent business data.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Read `references/Design.md` for navbar specs.
2. Read existing `src/App.vue` and router.
3. Create `src/components/layout/Navbar.vue`.
4. Implement glassmorphism styling with Tailwind.
5. Add nav links matching router routes.
6. Add mobile menu toggle with GSAP animation.
7. Add scroll listener for opacity change.
8. Add active route detection via `useRoute()`.
9. Integrate into `src/App.vue`.
10. Test on desktop and mobile viewport.

**Acceptance Criteria:**
- Navbar renders with glassmorphism effect.
- All nav links are present and route correctly.
- Mobile menu opens/closes with animation.
- Active route is highlighted.
- Scroll changes opacity smoothly.
- No layout shift on page load.

**Validation:**
- Manual test: navigate all routes, verify active state.
- Resize browser to mobile width, verify hamburger menu works.
- Check performance: no jank on scroll.

**Expected Output:**
Responsive glassmorphism navbar with full navigation and mobile menu.

---

## Phase 06 — Public Hero

**Objective:** Build the hero section — main headline, subheadline, CTA buttons, background image/gradient, GSAP entrance animation.

**Context:** The hero is the first section visitors see. It sets the tone and must follow `references/Design.md`.

**Files to Inspect:**
- `references/Design.md`
- `src/components/ui/` (BaseButton, SectionContainer)
- `src/assets/` for hero images
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. Full-width or container-bound hero section.
2. Main headline in Bahasa Indonesia (e.g., "Senyum Sehat, Hidup Lebih Baik").
3. Subheadline supporting the brand.
4. Two CTA buttons: "Jadwalkan Konsultasi" (primary) and "Layanan Kami" (secondary).
5. Background: gradient or image with overlay.
6. GSAP entrance animation (fade in + slide up).
7. Responsive: stacked on mobile, side-by-side on desktop if using layout split.

**Constraints:**
- Inspect repository before modifying.
- Inspect `references/` before visual decisions.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not invent business data.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Read `references/Design.md` for hero section specs.
2. Create `src/components/sections/HeroSection.vue`.
3. Use `SectionContainer` for layout.
4. Use `BaseButton` for CTAs.
5. Add headline, subheadline, CTA buttons.
6. Apply gradient background or image with overlay.
7. Add GSAP `gsap.from()` animation on mount.
8. Make responsive with Tailwind breakpoints.
9. Add to `src/views/HomePage.vue` or equivalent.
10. Test rendering and animation.

**Acceptance Criteria:**
- Hero section renders with correct text and CTAs.
- GSAP animation plays on load.
- Responsive on mobile and desktop.
- Colors and typography match design spec.

**Validation:**
- Visual check: design matches `references/Design.md`.
- Check animation: GSAP triggers on mount, no errors in console.

**Expected Output:**
Animated hero section with headline, CTAs, and responsive layout.

---

## Phase 07 — Public Homepage

**Objective:** Assemble the complete homepage by composing all section components (Navbar, Hero, Services preview, Technology, Smile Transformation, Gallery preview, Locations, FAQ, Contact, Footer) into a single page.

**Context:** The homepage is the main entry point. It composes sections built in earlier/later phases. This phase focuses on layout and section ordering.

**Files to Inspect:**
- `src/views/HomePage.vue` or `src/pages/HomePage.vue`
- All section components in `src/components/sections/`
- `src/router/index.ts`
- `references/Design.md`
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. Homepage renders all sections in correct order.
2. Section ordering: Hero → Services → Technology → Smile Transformation → Gallery → Articles → Locations → FAQ → Contact.
3. Smooth scroll between sections (optional).
4. All sections use `SectionContainer` for consistent width.
5. Sections have consistent vertical spacing (120px padding per spec).
6. No layout shifts.

**Constraints:**
- Inspect repository before modifying.
- Inspect `references/` before visual decisions.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not invent business data.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Read existing `HomePage.vue`.
2. Import all section components.
3. Compose them in order.
4. Verify section spacing and layout.
5. Add smooth scroll if specified in design.
6. Test full page render.

**Acceptance Criteria:**
- All sections render in correct order.
- Consistent spacing between sections.
- No layout shifts or rendering errors.
- Page is scrollable and sections are visually distinct.

**Validation:**
- Full page screenshot and visual check.
- Compare section order with requirements.

**Expected Output:**
Complete homepage with all sections composed and styled.

---

## Phase 08 — Services

**Objective:** Build the Services section — 6 service cards with icons, titles, descriptions, and hover effects. Also build the full Services page with detailed view for each service.

**Context:** Services are a core content area. 6 services must be displayed on homepage (preview) and on a dedicated page (full list + details).

**Files to Inspect:**
- `references/Design.md`
- `src/components/sections/` for homepage preview
- `src/views/` or `src/pages/` for Services page
- `src/stores/` for services data store
- `src/lib/supabase.ts`
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. Services preview section on homepage (3–6 cards in grid).
2. Full Services page with all 6 services.
3. Each service card: icon (Material Symbols), title, short description.
4. Hover effect: scale, shadow, or color shift.
5. Service detail page/modal with full description.
6. Data from Supabase `services` table or local data (if Supabase not ready).
7. Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop.

**Constraints:**
- Inspect repository before modifying.
- Inspect `references/` before visual decisions.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not invent business data — use data from Supabase or PRD.md.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Create `src/components/sections/ServicesSection.vue` for homepage preview.
2. Create `src/components/cards/ServiceCard.vue`.
3. Create `src/views/ServicesPage.vue` for full list.
4. Create `src/views/ServiceDetailPage.vue` for individual service.
5. Create `src/stores/services.ts` Pinia store to fetch from Supabase.
6. Add routes to router.
7. Style cards with Tailwind + glassmorphism or solid variants.
8. Add GSAP hover animations.
9. Test all views and routes.

**Acceptance Criteria:**
- 6 service cards render on homepage preview.
- Services page shows all 6 services.
- Service detail page shows full description.
- Hover effects work.
- Responsive grid works.
- Data flows from Supabase store.

**Validation:**
- Check all 6 services render with correct data.
- Verify responsive layout at mobile, tablet, desktop.
- Verify route navigation works.

**Expected Output:**
Services section (homepage), Services page, Service detail page, Pinia store.

---

## Phase 09 — Doctors

**Objective:** Build the Doctors section — 2 doctor cards with photos, names, specialties, and bios. Also build the full Doctors page.

**Context:** 2 doctors are the key trust signals. Their profiles must be prominent.

**Files to Inspect:**
- `references/Design.md`
- `src/components/sections/` for homepage preview
- `src/views/` or `src/pages/` for Doctors page
- `src/stores/` for doctors data store
- `src/lib/supabase.ts`
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. Doctors preview section on homepage (2 cards side-by-side).
2. Full Doctors page with detailed profiles.
3. Each card: photo (from Supabase Storage), name, specialty, short bio.
4. Hover effect: photo zoom or overlay with "Selengkapnya" link.
5. Doctor detail page/modal with full bio and qualifications.
6. Data from Supabase `doctors` table.
7. Responsive: stacked on mobile, side-by-side on desktop.

**Constraints:**
- Inspect repository before modifying.
- Inspect `references/` before visual decisions.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not invent business data.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Create `src/components/sections/DoctorsSection.vue`.
2. Create `src/components/cards/DoctorCard.vue`.
3. Create `src/views/DoctorsPage.vue`.
4. Create `src/views/DoctorDetailPage.vue`.
5. Create `src/stores/doctors.ts` Pinia store.
6. Add routes.
7. Style with Tailwind.
8. Add GSAP animations.
9. Test all views.

**Acceptance Criteria:**
- 2 doctor cards render on homepage.
- Doctors page shows both doctors.
- Doctor detail page shows full profile.
- Photos load from Supabase Storage.
- Responsive layout works.

**Validation:**
- Verify 2 doctors render with correct data.
- Verify responsive layout.
- Verify route navigation.

**Expected Output:**
Doctors section, Doctors page, Doctor detail page, Pinia store.

---

## Phase 10 — Technology

**Objective:** Build the Technology section — showcase dental technology/equipment with icons or images, titles, and descriptions.

**Context:** Technology section builds trust by showing modern equipment.

**Files to Inspect:**
- `references/Design.md`
- `src/components/sections/`
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. Section with 3–4 technology items.
2. Each item: icon or image, title, description.
3. Layout: horizontal scroll on mobile, grid on desktop.
4. GSAP scroll-triggered animation.
5. Data from `PRD.md` or Supabase.

**Constraints:**
- Inspect repository before modifying.
- Inspect `references/` before visual decisions.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not invent business data.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Create `src/components/sections/TechnologySection.vue`.
2. Create `src/components/cards/TechCard.vue`.
3. Add technology items from PRD.md data.
4. Style with Tailwind.
5. Add GSAP ScrollTrigger animation.
6. Add to homepage.
7. Test rendering and animation.

**Acceptance Criteria:**
- Technology section renders with correct items.
- Layout works on mobile and desktop.
- Animation triggers on scroll.

**Validation:**
- Visual check against design spec.
- Verify animation triggers.

**Expected Output:**
Technology section with animated cards.

---

## Phase 11 — Smile Transformation

**Objective:** Build the Smile Transformation section — before/after slider or gallery showing patient transformations.

**Context:** This is a key social proof element.

**Files to Inspect:**
- `references/Design.md`
- `src/components/sections/`
- `src/lib/supabase.ts`
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. Section with before/after transformation cards.
2. Before/after images side-by-side or slider.
3. Patient name or description (optional).
4. Responsive layout.
5. GSAP animation.

**Constraints:**
- Inspect repository before modifying.
- Inspect `references/` before visual decisions.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not invent business data.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Create `src/components/sections/SmileTransformationSection.vue`.
2. Create `src/components/cards/TransformationCard.vue`.
3. Add before/after images from Supabase Storage or local assets.
4. Style with Tailwind.
5. Add GSAP animation.
6. Add to homepage.
7. Test rendering.

**Acceptance Criteria:**
- Transformation cards render with before/after images.
- Layout works on mobile and desktop.
- Animation triggers correctly.

**Validation:**
- Visual check.
- Verify image loading.

**Expected Output:**
Smile Transformation section with before/after cards.

---

## Phase 12 — Gallery

**Objective:** Build the Gallery section and Gallery page — 16 images in a masonry or grid layout with lightbox.

**Context:** Gallery showcases the clinic's work. 16 images displayed in an attractive grid.

**Files to Inspect:**
- `references/Design.md`
- `src/components/sections/`
- `src/views/` for Gallery page
- `src/lib/supabase.ts`
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. Gallery preview on homepage (4–6 images).
2. Full Gallery page with all 16 images.
3. Masonry or grid layout.
4. Click to open lightbox/modal with full-size image.
5. Image loading: lazy load, placeholder blur.
6. Responsive: 1 col mobile, 2 col tablet, 3–4 col desktop.
7. Images from Supabase Storage bucket.

**Constraints:**
- Inspect repository before modifying.
- Inspect `references/` before visual decisions.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not invent business data.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Create `src/components/sections/GallerySection.vue`.
2. Create `src/components/cards/GalleryCard.vue`.
3. Create `src/views/GalleryPage.vue`.
4. Create `src/components/ui/LightboxModal.vue`.
5. Create `src/stores/gallery.ts` to fetch images from Supabase.
6. Add routes.
7. Style grid with Tailwind.
8. Implement lightbox.
9. Add lazy loading.
10. Test all views.

**Acceptance Criteria:**
- 16 images render in gallery grid.
- Lightbox opens on click.
- Lazy loading works.
- Responsive layout works.

**Validation:**
- Count images: 16 present.
- Verify lightbox opens and closes.
- Verify responsive layout.

**Expected Output:**
Gallery section, Gallery page, Lightbox modal, Pinia store.

---

## Phase 13 — Articles

**Objective:** Build the Articles section and Articles page — blog-style article cards with title, excerpt, date, and full article view.

**Context:** Articles build SEO and authority.

**Files to Inspect:**
- `references/Design.md`
- `src/components/sections/`
- `src/views/` for Articles page
- `src/stores/` for articles store
- `src/lib/supabase.ts`
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. Articles preview on homepage (3 latest articles).
2. Full Articles page with all articles.
3. Each card: title, excerpt, date, category tag, thumbnail.
4. Article detail page with full content.
5. Data from Supabase `articles` table.
6. Responsive grid.

**Constraints:**
- Inspect repository before modifying.
- Inspect `references/` before visual decisions.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not invent business data.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Create `src/components/sections/ArticlesSection.vue`.
2. Create `src/components/cards/ArticleCard.vue`.
3. Create `src/views/ArticlesPage.vue`.
4. Create `src/views/ArticleDetailPage.vue`.
5. Create `src/stores/articles.ts`.
6. Add routes.
7. Style with Tailwind.
8. Add to homepage.
9. Test all views.

**Acceptance Criteria:**
- 3 articles render on homepage preview.
- Articles page shows all articles.
- Article detail page shows full content.
- Responsive layout works.

**Validation:**
- Verify articles render with correct data.
- Verify route navigation.

**Expected Output:**
Articles section, Articles page, Article detail page, Pinia store.

---

## Phase 14 — Locations

**Objective:** Build the Locations section and Locations page — 2 clinic locations with addresses, maps, and contact info.

**Context:** 2 locations must be prominently displayed for patient convenience.

**Files to Inspect:**
- `references/Design.md`
- `src/components/sections/`
- `src/views/` for Locations page
- `src/stores/` for locations store
- `src/lib/supabase.ts`
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. Locations preview on homepage (2 cards side-by-side).
2. Full Locations page with map embed.
3. Each location: name, address, phone, hours, Google Maps embed.
4. Data from Supabase `locations` table.
5. Responsive: stacked on mobile.

**Constraints:**
- Inspect repository before modifying.
- Inspect `references/` before visual decisions.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not invent business data.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Create `src/components/sections/LocationsSection.vue`.
2. Create `src/components/cards/LocationCard.vue`.
3. Create `src/views/LocationsPage.vue`.
4. Create `src/stores/locations.ts`.
5. Add routes.
6. Integrate Google Maps iframe or similar.
7. Style with Tailwind.
8. Add to homepage.
9. Test all views.

**Acceptance Criteria:**
- 2 location cards render on homepage.
- Locations page shows both locations with maps.
- Contact info is correct.
- Responsive layout works.

**Validation:**
- Verify 2 locations render.
- Verify map embeds work.

**Expected Output:**
Locations section, Locations page, Pinia store.

---

## Phase 15 — FAQ

**Objective:** Build the FAQ section and FAQ page — 5 frequently asked questions with accordion expand/collapse.

**Context:** FAQ reduces support load and builds trust.

**Files to Inspect:**
- `references/Design.md`
- `src/components/sections/`
- `src/views/` for FAQ page
- `src/stores/` for FAQ store
- `src/lib/supabase.ts`
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. FAQ preview on homepage (top 3–5 questions).
2. Full FAQ page with all 5 questions.
3. Accordion expand/collapse with GSAP animation.
4. Data from Supabase `faqs` table.
5. Responsive.

**Constraints:**
- Inspect repository before modifying.
- Inspect `references/` before visual decisions.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not invent business data.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Create `src/components/sections/FAQSection.vue`.
2. Create `src/components/ui/AccordionItem.vue`.
3. Create `src/views/FAQPage.vue`.
4. Create `src/stores/faqs.ts`.
5. Add routes.
6. Style with Tailwind.
7. Add GSAP animation for expand/collapse.
8. Add to homepage.
9. Test all views.

**Acceptance Criteria:**
- 5 FAQ items render.
- Accordion expand/collapse works.
- Animation is smooth.
- Responsive layout works.

**Validation:**
- Click each FAQ item, verify expand/collapse.
- Verify all 5 questions present.

**Expected Output:**
FAQ section, FAQ page, Accordion component, Pinia store.

---

## Phase 16 — Contact

**Objective:** Build the Contact section and Contact page — contact form, phone/email/WhatsApp links, Google Maps embed.

**Context:** Contact is the conversion point. Form must work and be validated.

**Files to Inspect:**
- `references/Design.md`
- `src/components/sections/`
- `src/views/` for Contact page
- `src/lib/supabase.ts`
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. Contact section on homepage (form + contact info).
2. Full Contact page.
3. Form fields: Name, Email, Phone, Subject, Message.
4. Form validation (client-side).
5. Form submission to Supabase `inquiries` table.
6. Contact info: phone, email, WhatsApp, address.
7. Google Maps embed for both locations.
8. Success/error feedback after submission.
9. Responsive.

**Constraints:**
- Inspect repository before modifying.
- Inspect `references/` before visual decisions.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not invent business data.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Create `src/components/sections/ContactSection.vue`.
2. Create `src/components/forms/ContactForm.vue`.
3. Create `src/views/ContactPage.vue`.
4. Add form validation.
5. Add Supabase insert for form submission.
6. Add success/error toast or message.
7. Style with Tailwind.
8. Add to homepage.
9. Test form submission.

**Acceptance Criteria:**
- Contact form renders with all fields.
- Validation prevents invalid submissions.
- Form submits to Supabase `inquiries` table.
- Success feedback displays.
- Responsive layout works.

**Validation:**
- Submit form with valid data, verify Supabase insert.
- Submit form with invalid data, verify validation errors.

**Expected Output:**
Contact section, Contact page, Contact form with validation.

---

## Phase 17 — Supabase Setup

**Objective:** Configure the Supabase project — create project, set up environment variables, configure Supabase client in the app.

**Context:** Supabase is the backend. This phase ensures the connection is established.

**Files to Inspect:**
- `src/lib/supabase.ts`
- `.env` or `.env.local`
- `package.json`
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. Supabase project ID: `pelnitocxannomjltoci`.
2. Environment variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
3. Supabase client initialized with `createClient`.
4. Client is importable from anywhere in the app.
5. `.env` is in `.gitignore`.

**Constraints:**
- Inspect repository before modifying.
- Do not commit secrets.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Check if `.env` exists with Supabase vars.
2. Create or update `.env` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
3. Update `src/lib/supabase.ts` to use env vars.
4. Verify `.env` is in `.gitignore`.
5. Test import in a component.

**Acceptance Criteria:**
- Environment variables are set.
- Supabase client initializes without errors.
- Client is importable.

**Validation:**
- Log Supabase client in dev tools, verify it's initialized.

**Expected Output:**
Working Supabase client connection.

---

## Phase 18 — Database Schema

**Objective:** Design and apply the complete database schema — all tables, columns, types, relationships, and indexes.

**Context:** The schema defines the data model for the entire application.

**Files to Inspect:**
- `PRD.md` for data requirements
- `references/Design.md` for data display needs
- Supabase dashboard or CLI
- `AGENTS.md`, `Sprint.md`

**Requirements:**
1. Tables: `services`, `doctors`, `articles`, `gallery`, `locations`, `faqs`, `inquiries`, `bookings`, `settings`, `transformations`.
2. Each table: `id` (uuid), `created_at` (timestamptz), `updated_at` (timestamptz).
3. Proper column types for each table.
4. Foreign keys where appropriate.
5. Indexes for frequently queried columns.
6. Enum types for status fields.

**Constraints:**
- Inspect repository before modifying.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not invent business data.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Read PRD.md for data model requirements.
2. Design schema in SQL.
3. Apply via Supabase SQL Editor or migration.
4. Verify tables exist.
5. Verify relationships work.

**Acceptance Criteria:**
- All tables created with correct columns.
- Foreign keys established.
- Indexes created.
- Schema matches PRD.md requirements.

**Validation:**
- Query each table, verify structure.
- Test foreign key relationships.

**Expected Output:**
Complete database schema applied to Supabase.

---

## Phase 19 — RLS Policies

**Objective:** Implement Row Level Security policies — public read access for public tables, authenticated write access for admin tables, proper role-based access.

**Context:** RLS is critical for security. Public data must be readable, admin data must be protected.

**Files to Inspect:**
- Database schema from Phase 18
- `PRD.md` for access requirements
- Supabase dashboard
- `AGENTS.md`, `Sprint.md`

**Requirements:**
1. Public tables (`services`, `doctors`, `articles`, `gallery`, `locations`, `faqs`, `transformations`): anon can SELECT.
2. Admin tables (`inquiries`, `bookings`, `settings`): only authenticated admin can SELECT/INSERT/UPDATE/DELETE.
3. `settings` table: anon can SELECT (for public settings), admin can UPDATE.
4. Policies use `auth.uid()` and `auth.role()`.
5. RLS enabled on all tables.

**Constraints:**
- Inspect repository before modifying.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Design RLS policies in SQL.
2. Apply via Supabase SQL Editor.
3. Enable RLS on all tables.
4. Test public read access.
5. Test authenticated admin access.
6. Test unauthorized access is denied.

**Acceptance Criteria:**
- RLS enabled on all tables.
- Public tables are readable by anon.
- Admin tables require authentication.
- Unauthorized access is denied.

**Validation:**
- Query as anon: verify public data accessible, admin data denied.
- Query as authenticated admin: verify full access.

**Expected Output:**
Complete RLS policies applied and tested.

---

## Phase 20 — Authentication

**Objective:** Implement admin authentication — login page, session management, auth guards, role-based access.

**Context:** Admin CMS requires secure authentication.

**Files to Inspect:**
- `src/stores/` for auth store
- `src/router/index.ts` for route guards
- `src/views/` for login page
- `src/lib/supabase.ts`
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. Login page with email/password form.
2. Supabase Auth integration.
3. Auth store (Pinia) for session state.
4. Route guards: admin routes require authentication.
5. Auto-refresh session on page load.
6. Logout functionality.
7. Redirect to login on unauthorized access.
8. Role check: admin role required for CMS.

**Constraints:**
- Inspect repository before modifying.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Create `src/stores/auth.ts` with Supabase Auth methods.
2. Create `src/views/LoginPage.vue`.
3. Add route guards in router.
4. Add auth state persistence.
5. Add logout button in admin navbar.
6. Test login/logout flow.
7. Test route guards.

**Acceptance Criteria:**
- Login form works with Supabase Auth.
- Session persists across page reloads.
- Admin routes are protected.
- Logout clears session.

**Validation:**
- Login with valid credentials, verify redirect to admin.
- Login with invalid credentials, verify error message.
- Access admin route without auth, verify redirect to login.

**Expected Output:**
Working authentication system with login, session, and route guards.

---

## Phase 21 — Admin Shell

**Objective:** Build the admin layout shell — sidebar navigation, top bar, content area, responsive design.

**Context:** The admin shell is the container for all admin pages.

**Files to Inspect:**
- `references/Design.md` for admin styling
- `src/layouts/` or `src/components/layout/`
- `src/router/index.ts`
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. Sidebar with navigation links to all admin sections.
2. Top bar with admin user info, logout button.
3. Main content area with `<RouterView />`.
4. Sidebar collapse/expand on mobile.
5. Active route highlighting in sidebar.
6. Responsive: sidebar collapses to icons on tablet, hamburger on mobile.
7. Material Symbols icons for nav items.

**Constraints:**
- Inspect repository before modifying.
- Inspect `references/` before visual decisions.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Create `src/layouts/AdminLayout.vue`.
2. Create `src/components/admin/AdminSidebar.vue`.
3. Create `src/components/admin/AdminTopbar.vue`.
4. Add sidebar nav items for all admin sections.
5. Add responsive behavior.
6. Update router to use AdminLayout for admin routes.
7. Test layout.

**Acceptance Criteria:**
- Admin shell renders with sidebar, topbar, content area.
- All admin nav links are present.
- Sidebar collapses on mobile.
- Active route is highlighted.

**Validation:**
- Navigate to each admin section, verify active state.
- Resize browser, verify responsive behavior.

**Expected Output:**
Admin layout shell with sidebar, topbar, and responsive design.

---

## Phase 22 — Admin Dashboard

**Objective:** Build the admin dashboard — overview cards (total services, doctors, articles, inquiries), recent activity, quick actions.

**Context:** Dashboard is the first thing admins see after login.

**Files to Inspect:**
- `src/views/admin/` or equivalent
- `src/stores/` for data counts
- `src/lib/supabase.ts`
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. Overview cards with counts (services, doctors, articles, inquiries, bookings).
2. Recent inquiries list (last 5).
3. Recent bookings list (last 5).
4. Quick action buttons (Add Service, Add Article, etc.).
5. Data fetched from Supabase.
6. Responsive grid.

**Constraints:**
- Inspect repository before modifying.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not invent business data.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Create `src/views/admin/DashboardPage.vue`.
2. Create `src/components/admin/DashboardCard.vue`.
3. Fetch counts from Supabase for each table.
4. Fetch recent inquiries and bookings.
5. Style with Tailwind.
6. Test data loading.

**Acceptance Criteria:**
- Dashboard cards show correct counts.
- Recent items display.
- Quick actions link to correct pages.
- Responsive layout works.

**Validation:**
- Verify counts match database.
- Verify recent items are correct.

**Expected Output:**
Admin dashboard with overview cards and recent activity.

---

## Phase 23 — Services CMS

**Objective:** Build the admin CRUD for services — list, create, edit, delete services.

**Context:** Admins must manage services through the CMS.

**Files to Inspect:**
- `src/views/admin/`
- `src/stores/services.ts`
- `src/lib/supabase.ts`
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. Services list page with table/grid.
2. Create service form: title, description, icon, image.
3. Edit service form (pre-filled).
4. Delete with confirmation.
5. Form validation.
6. Success/error feedback.
7. Image upload to Supabase Storage.

**Constraints:**
- Inspect repository before modifying.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not invent business data.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Create `src/views/admin/ServicesListPage.vue`.
2. Create `src/views/admin/ServiceFormPage.vue`.
3. Add CRUD methods to `src/stores/services.ts`.
4. Add form validation.
5. Add image upload.
6. Add success/error toasts.
7. Test all CRUD operations.

**Acceptance Criteria:**
- Services list displays all services.
- Create form adds new service.
- Edit form updates service.
- Delete removes service with confirmation.
- Image upload works.

**Validation:**
- Create a service, verify it appears in list.
- Edit a service, verify changes persist.
- Delete a service, verify it's removed.

**Expected Output:**
Full Services CMS with CRUD operations.

---

## Phase 24 — Doctors CMS

**Objective:** Build the admin CRUD for doctors.

**Files to Inspect:**
- `src/views/admin/`
- `src/stores/doctors.ts`
- `src/lib/supabase.ts`
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. Doctors list page.
2. Create doctor form: name, specialty, bio, photo.
3. Edit doctor form.
4. Delete with confirmation.
5. Photo upload to Supabase Storage.
6. Form validation.

**Constraints:**
- Inspect repository before modifying.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not invent business data.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Create `src/views/admin/DoctorsListPage.vue`.
2. Create `src/views/admin/DoctorFormPage.vue`.
3. Add CRUD methods to `src/stores/doctors.ts`.
4. Add photo upload.
5. Test all CRUD operations.

**Acceptance Criteria:**
- Doctors list displays all doctors.
- Create/Edit/Delete work.
- Photo upload works.

**Validation:**
- CRUD operations verified.

**Expected Output:**
Full Doctors CMS with CRUD operations.

---

## Phase 25 — Articles CMS

**Objective:** Build the admin CRUD for articles.

**Files to Inspect:**
- `src/views/admin/`
- `src/stores/articles.ts`
- `src/lib/supabase.ts`
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. Articles list page.
2. Create article form: title, content (rich text), excerpt, category, thumbnail.
3. Edit article form.
4. Delete with confirmation.
5. Rich text editor (e.g., TipTap or simple textarea).
6. Thumbnail upload.

**Constraints:**
- Inspect repository before modifying.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not invent business data.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Create `src/views/admin/ArticlesListPage.vue`.
2. Create `src/views/admin/ArticleFormPage.vue`.
3. Add CRUD methods to `src/stores/articles.ts`.
4. Add rich text editing.
5. Add thumbnail upload.
6. Test all CRUD operations.

**Acceptance Criteria:**
- Articles CRUD works.
- Rich text editing works.
- Thumbnail upload works.

**Validation:**
- CRUD operations verified.

**Expected Output:**
Full Articles CMS with CRUD operations.

---

## Phase 26 — Gallery CMS

**Objective:** Build the admin CRUD for gallery images.

**Files to Inspect:**
- `src/views/admin/`
- `src/stores/gallery.ts`
- `src/lib/supabase.ts`
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. Gallery list page with image grid.
2. Upload images (multiple or single).
3. Delete images with confirmation.
4. Image preview.
5. Upload to Supabase Storage bucket.
6. Progress indicator.

**Constraints:**
- Inspect repository before modifying.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not invent business data.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Create `src/views/admin/GalleryListPage.vue`.
2. Create `src/views/admin/GalleryUploadPage.vue`.
3. Add CRUD methods to `src/stores/gallery.ts`.
4. Add image upload with progress.
5. Add delete confirmation.
6. Test upload and delete.

**Acceptance Criteria:**
- Image upload works.
- Gallery grid displays all images.
- Delete works with confirmation.

**Validation:**
- Upload an image, verify it appears in gallery.
- Delete an image, verify it's removed.

**Expected Output:**
Full Gallery CMS with upload and delete.

---

## Phase 27 — Locations CMS

**Objective:** Build the admin CRUD for locations.

**Files to Inspect:**
- `src/views/admin/`
- `src/stores/locations.ts`
- `src/lib/supabase.ts`
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. Locations list page.
2. Create location form: name, address, phone, hours, map embed URL.
3. Edit location form.
4. Delete with confirmation.
5. Form validation.

**Constraints:**
- Inspect repository before modifying.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not invent business data.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Create `src/views/admin/LocationsListPage.vue`.
2. Create `src/views/admin/LocationFormPage.vue`.
3. Add CRUD methods to `src/stores/locations.ts`.
4. Test all CRUD operations.

**Acceptance Criteria:**
- Locations CRUD works.

**Validation:**
- CRUD operations verified.

**Expected Output:**
Full Locations CMS with CRUD operations.

---

## Phase 28 — FAQ CMS

**Objective:** Build the admin CRUD for FAQs.

**Files to Inspect:**
- `src/views/admin/`
- `src/stores/faqs.ts`
- `src/lib/supabase.ts`
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. FAQ list page.
2. Create FAQ form: question, answer, sort order.
3. Edit FAQ form.
4. Delete with confirmation.
5. Drag-to-reorder (optional).
6. Form validation.

**Constraints:**
- Inspect repository before modifying.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not invent business data.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Create `src/views/admin/FAQListPage.vue`.
2. Create `src/views/admin/FAQFormPage.vue`.
3. Add CRUD methods to `src/stores/faqs.ts`.
4. Test all CRUD operations.

**Acceptance Criteria:**
- FAQ CRUD works.

**Validation:**
- CRUD operations verified.

**Expected Output:**
Full FAQ CMS with CRUD operations.

---

## Phase 29 — Media Library

**Objective:** Build a shared media library for managing uploaded images — browse, search, delete, reuse across CMS sections.

**Context:** Images are shared across services, doctors, articles, gallery. A central media library prevents duplication.

**Files to Inspect:**
- `src/views/admin/`
- `src/stores/` for media store
- `src/lib/supabase.ts`
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. Grid view of all uploaded images.
2. Upload new images.
3. Delete images.
4. Search/filter by name or type.
5. Click to select image (for use in forms).
6. Image preview modal.
7. File size and type info.

**Constraints:**
- Inspect repository before modifying.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Create `src/views/admin/MediaLibraryPage.vue`.
2. Create `src/stores/media.ts`.
3. Create `src/components/admin/MediaGrid.vue`.
4. Create `src/components/admin/MediaUpload.vue`.
5. Implement Supabase Storage integration.
6. Add search/filter.
7. Add image selection callback.
8. Test all operations.

**Acceptance Criteria:**
- All uploaded images display in grid.
- Upload works.
- Delete works with confirmation.
- Image selection works for forms.

**Validation:**
- Upload, browse, delete images.
- Select image in a form context.

**Expected Output:**
Media library with browse, upload, delete, and select.

---

## Phase 30 — Booking Management

**Objective:** Build the admin booking management — list bookings, view details, update status, respond.

**Context:** Bookings are a key business flow. Admins must manage them efficiently.

**Files to Inspect:**
- `src/views/admin/`
- `src/stores/` for bookings store
- `src/lib/supabase.ts`
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. Bookings list page with status filter (pending, confirmed, completed, cancelled).
2. Booking detail view.
3. Update status.
4. Add notes/response.
5. Sort by date.
6. Search by patient name.

**Constraints:**
- Inspect repository before modifying.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not invent business data.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Create `src/views/admin/BookingsListPage.vue`.
2. Create `src/views/admin/BookingDetailPage.vue`.
3. Create `src/stores/bookings.ts`.
4. Add status update functionality.
5. Add notes/response.
6. Test all operations.

**Acceptance Criteria:**
- Bookings list displays with filters.
- Status update works.
- Notes can be added.

**Validation:**
- Update a booking status, verify change persists.

**Expected Output:**
Booking management with list, detail, and status updates.

---

## Phase 31 — Inquiry Management

**Objective:** Build the admin inquiry management — list inquiries from contact form, view details, mark as read, respond.

**Files to Inspect:**
- `src/views/admin/`
- `src/stores/` for inquiries store
- `src/lib/supabase.ts`
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. Inquiries list page with read/unread status.
2. Inquiry detail view.
3. Mark as read.
4. Add response notes.
5. Search by name or email.
6. Sort by date.

**Constraints:**
- Inspect repository before modifying.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not invent business data.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Create `src/views/admin/InquiriesListPage.vue`.
2. Create `src/views/admin/InquiryDetailPage.vue`.
3. Create `src/stores/inquiries.ts`.
4. Add read/status update.
5. Add response notes.
6. Test all operations.

**Acceptance Criteria:**
- Inquiries list displays correctly.
- Read/unread status works.
- Response notes can be added.

**Validation:**
- Mark inquiry as read, verify status change.

**Expected Output:**
Inquiry management with list, detail, and status.

---

## Phase 32 — Website Settings

**Objective:** Build the admin settings page — manage site-wide settings (clinic name, tagline, contact info, social links, business hours).

**Context:** Settings control global site content and must be editable by admin.

**Files to Inspect:**
- `src/views/admin/`
- `src/stores/` for settings store
- `src/lib/supabase.ts`
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. Settings form with all global fields.
2. Sections: General (name, tagline), Contact (phone, email, WhatsApp), Social Links, Business Hours, Footer Text.
3. Save to Supabase `settings` table.
4. Public pages read from settings.
5. Form validation.
6. Success feedback.

**Constraints:**
- Inspect repository before modifying.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not invent business data.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Create `src/views/admin/SettingsPage.vue`.
2. Create `src/stores/settings.ts`.
3. Add save functionality.
4. Add public page integration (read settings for display).
5. Test save and load.

**Acceptance Criteria:**
- Settings form loads current values.
- Save updates Supabase.
- Public pages reflect saved settings.

**Validation:**
- Change a setting, save, verify public page updates.

**Expected Output:**
Settings management with save and public integration.

---

## Phase 33 — SEO

**Objective:** Implement SEO fundamentals — meta tags, Open Graph, structured data, sitemap, robots.txt.

**Context:** SEO is critical for a dental clinic website.

**Files to Inspect:**
- `index.html`
- `src/router/index.ts`
- `src/views/` (all pages)
- `public/` directory
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. Dynamic `<title>` tags per page.
2. Meta descriptions per page.
3. Open Graph tags (og:title, og:description, og:image).
4. Canonical URLs.
5. Structured data (JSON-LD) for LocalBusiness, DentalClinic.
6. `public/robots.txt` allowing crawling.
7. `public/sitemap.xml` with all public routes.
8. Use `vue-meta` or `@vueuse/head` for head management.

**Constraints:**
- Inspect repository before modifying.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Install `@vueuse/head` if not present.
2. Configure head management in `main.ts`.
3. Add meta tags to each page view.
4. Create `public/robots.txt`.
5. Create `public/sitemap.xml`.
6. Add JSON-LD structured data.
7. Test with Google Rich Results Test.

**Acceptance Criteria:**
- Each page has unique title and meta description.
- Open Graph tags present.
- Structured data validates.
- robots.txt and sitemap.xml exist.

**Validation:**
- Run Lighthouse SEO audit.
- Validate structured data.

**Expected Output:**
Complete SEO implementation with meta tags, OG, structured data, sitemap.

---

## Phase 34 — Accessibility

**Objective:** Implement accessibility basics — semantic HTML, ARIA labels, keyboard navigation, focus management, color contrast.

**Context:** Accessibility is required for legal compliance and user inclusion.

**Files to Inspect:**
- All Vue components
- `references/Design.md` for color contrast
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. Semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`, `<button>`).
2. ARIA labels on interactive elements.
3. Keyboard navigation (tab order, enter/space to activate).
4. Focus visible styles.
5. Color contrast ratio ≥ 4.5:1 for text.
6. Alt text for images.
7. Skip to main content link.

**Constraints:**
- Inspect repository before modifying.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Audit all components for semantic HTML.
2. Add ARIA labels.
3. Add keyboard event handlers.
4. Add focus styles.
5. Add skip link.
6. Test with keyboard only.
7. Run Lighthouse accessibility audit.

**Acceptance Criteria:**
- Semantic HTML throughout.
- Keyboard navigation works.
- Lighthouse accessibility score ≥ 90.

**Validation:**
- Run Lighthouse accessibility audit.
- Test keyboard navigation.

**Expected Output:**
Accessible website with semantic HTML, ARIA, keyboard support.

---

## Phase 35 — Performance

**Objective:** Optimize performance — lazy loading, code splitting, image optimization, bundle analysis, Core Web Vitals.

**Context:** Performance directly impacts SEO and user experience.

**Files to Inspect:**
- `vite.config.ts`
- `src/router/index.ts` (lazy loading)
- `src/components/` (code splitting)
- Image assets
- `package.json`
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. Lazy load all page components in router.
2. Code split large components.
3. Optimize images (WebP, compression, responsive sizes).
4. Minimize bundle size.
5. Tree shaking enabled.
6. Preload critical fonts.
7. Defer non-critical JS.
8. Target: Lighthouse Performance ≥ 90.

**Constraints:**
- Inspect repository before modifying.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Update router with lazy loading (`() => import(...)`).
2. Analyze bundle with `npx vite-bundle-visualizer`.
3. Optimize images.
4. Add font preload hints.
5. Run Lighthouse audit.
6. Optimize based on results.

**Acceptance Criteria:**
- All pages lazy load.
- Bundle size is reasonable.
- Lighthouse Performance ≥ 90.

**Validation:**
- Run Lighthouse performance audit.
- Check Core Web Vitals.

**Expected Output:**
Optimized website with good performance scores.

---

## Phase 36 — Testing

**Objective:** Implement tests — unit tests for stores/composables, component tests for critical UI, E2E tests for key flows.

**Context:** Tests ensure reliability and prevent regressions.

**Files to Inspect:**
- `package.json` for test framework
- `src/stores/` for store tests
- `src/components/` for component tests
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. Test framework: Vitest + Vue Test Utils (or as specified in project).
2. Unit tests for all Pinia stores.
3. Component tests for critical components (navbar, forms, cards).
4. E2E tests for key flows (login, booking, contact form).
5. Test coverage report.

**Constraints:**
- Inspect repository before modifying.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Install Vitest + Vue Test Utils if not present.
2. Create `tests/` directory structure.
3. Write unit tests for stores.
4. Write component tests for critical components.
5. Write E2E tests for key flows.
6. Run test suite.
7. Generate coverage report.

**Acceptance Criteria:**
- All stores have unit tests.
- Critical components have component tests.
- Key flows have E2E tests.
- All tests pass.
- Coverage report generated.

**Validation:**
- Run `npm run test` or equivalent.
- Verify all tests pass.

**Expected Output:**
Test suite with unit, component, and E2E tests.

---

## Phase 37 — Security Audit

**Objective:** Audit security — check for vulnerabilities, proper auth, RLS, input sanitization, secrets exposure.

**Context:** Security is critical for a healthcare website.

**Files to Inspect:**
- `.env` files (ensure no secrets committed)
- `src/lib/supabase.ts`
- RLS policies
- Form inputs (XSS prevention)
- API calls
- `package.json` for vulnerable dependencies
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. No secrets in committed code.
2. RLS policies properly configured.
3. Input sanitization on all forms.
4. No XSS vulnerabilities.
5. HTTPS enforced.
6. Dependencies audited for vulnerabilities.
7. Auth tokens properly handled.
8. No sensitive data in localStorage.

**Constraints:**
- Inspect repository before modifying.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Check `.env` is in `.gitignore`.
2. Run `npm audit`.
3. Check form inputs for sanitization.
4. Verify RLS policies.
5. Check for XSS vectors.
6. Review auth implementation.
7. Fix any issues found.

**Acceptance Criteria:**
- No secrets committed.
- `npm audit` shows no critical vulnerabilities.
- RLS policies enforced.
- Forms sanitize input.

**Validation:**
- Run `npm audit`.
- Manual security review.

**Expected Output:**
Security audit report with findings and fixes.

---

## Phase 38 — Visual QA

**Objective:** Visual quality assurance — compare every page against `references/Design.md`, fix discrepancies, ensure consistency.

**Context:** The website must match the design specification exactly.

**Files to Inspect:**
- `references/Design.md`
- All Vue components
- All page views
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. Page-by-page visual comparison with design spec.
2. Typography matches (font, size, weight, line height).
3. Colors match (exact hex values).
4. Spacing matches (padding, margin, gaps).
5. Layout matches (container width, section padding).
6. Components match (buttons, cards, badges).
7. Responsive: mobile, tablet, desktop.
8. Animations work correctly.
9. No visual regressions.

**Constraints:**
- Inspect repository before modifying.
- Inspect `references/` before visual decisions.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Open each page side-by-side with design reference.
2. Check typography.
3. Check colors.
4. Check spacing.
5. Check layout.
6. Fix discrepancies.
7. Test responsive at 375px, 768px, 1280px.
8. Test animations.

**Acceptance Criteria:**
- All pages match design spec.
- Responsive layouts correct.
- Animations smooth.
- No visual regressions.

**Validation:**
- Visual comparison with design.
- Responsive testing.

**Expected Output:**
Visually consistent website matching design specification.

---

## Phase 39 — Production Audit

**Objective:** Final production readiness audit — verify all features work, no console errors, build succeeds, deployment config correct.

**Context:** Last check before shipping to production.

**Files to Inspect:**
- All source files
- `package.json` scripts
- `vite.config.ts`
- Build output
- `AGENTS.md`, `PRD.md`, `Sprint.md`

**Requirements:**
1. `npm run build` succeeds without errors.
2. No console errors or warnings.
3. All routes work.
4. All CRUD operations work.
5. Authentication works end-to-end.
6. Images load correctly.
7. Forms submit correctly.
8. Responsive on all breakpoints.
9. Performance acceptable.
10. Security measures in place.

**Constraints:**
- Inspect repository before modifying.
- Follow `Agents.md`, `PRD.md`, `Sprint.md`.
- Do not overwrite unrelated work.
- Run validation after implementation.

**Implementation:**
1. Run `npm run build`.
2. Fix any build errors.
3. Run `npm run preview` or serve built files.
4. Test all routes.
5. Test all CRUD operations.
6. Test authentication flow.
7. Check console for errors.
8. Run Lighthouse audit.
9. Fix any issues found.

**Acceptance Criteria:**
- Build succeeds.
- No console errors.
- All features work.
- Lighthouse scores acceptable.
- Ready for deployment.

**Validation:**
- Full end-to-end testing.
- Build verification.

**Expected Output:**
Production-ready website passing all checks.

---

## Summary

| Phase | Name | Deliverable |
|-------|------|-------------|
| 01 | Repository Audit | Audit report |
| 02 | Reference Analysis | Design spec summary |
| 03 | Project Foundation | Base config (Vite, Tailwind, TS, Supabase, Router, Pinia) |
| 04 | Design System | Tailwind tokens, base components |
| 05 | Public Navbar | Glassmorphism navbar |
| 06 | Public Hero | Hero section with GSAP |
| 07 | Public Homepage | Assembled homepage |
| 08 | Services | Services section + page + store |
| 09 | Doctors | Doctors section + page + store |
| 10 | Technology | Technology section |
| 11 | Smile Transformation | Transformation section |
| 12 | Gallery | Gallery section + page + lightbox |
| 13 | Articles | Articles section + page + store |
| 14 | Locations | Locations section + page + store |
| 15 | FAQ | FAQ section + page + accordion |
| 16 | Contact | Contact section + page + form |
| 17 | Supabase Setup | Supabase client connection |
| 18 | Database Schema | All tables and relationships |
| 19 | RLS Policies | Row Level Security |
| 20 | Authentication | Login, session, guards |
| 21 | Admin Shell | Admin layout (sidebar + topbar) |
| 22 | Admin Dashboard | Dashboard with overview cards |
| 23 | Services CMS | CRUD for services |
| 24 | Doctors CMS | CRUD for doctors |
| 25 | Articles CMS | CRUD for articles |
| 26 | Gallery CMS | Image upload and management |
| 27 | Locations CMS | CRUD for locations |
| 28 | FAQ CMS | CRUD for FAQs |
| 29 | Media Library | Shared image management |
| 30 | Booking Management | Booking list and status |
| 31 | Inquiry Management | Inquiry list and response |
| 32 | Website Settings | Global site settings |
| 33 | SEO | Meta tags, OG, sitemap |
| 34 | Accessibility | Semantic HTML, ARIA, keyboard |
| 35 | Performance | Optimization, lazy loading |
| 36 | Testing | Unit, component, E2E tests |
| 37 | Security Audit | Vulnerability and security review |
| 38 | Visual QA | Design comparison and fixes |
| 39 | Production Audit | Final readiness check |

---

## Usage

Each prompt is self-contained. Copy the relevant phase prompt and provide it to an agent. The agent will:

1. Inspect the repository before modifying.
2. Inspect `references/` before visual decisions.
3. Follow `Agents.md`, `PRD.md`, `Sprint.md`.
4. Not invent business data.
5. Not overwrite unrelated work.
6. Run validation after implementation.

Phases are sequential but some can be parallelized (e.g., 23–28 CMS sections can run in parallel after 21–22 are complete).

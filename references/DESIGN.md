---
name: Medical Futurist
colors:
  surface: '#fbf8ff'
  surface-dim: '#dbd9e0'
  surface-bright: '#fbf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f2fa'
  surface-container: '#efedf4'
  surface-container-high: '#e9e7ef'
  surface-container-highest: '#e3e1e9'
  on-surface: '#1b1b20'
  on-surface-variant: '#454651'
  inverse-surface: '#303036'
  inverse-on-surface: '#f2f0f7'
  outline: '#757682'
  outline-variant: '#c5c5d3'
  surface-tint: '#4759a8'
  primary: '#112675'
  on-primary: '#ffffff'
  primary-container: '#2c3e8c'
  on-primary-container: '#9daeff'
  inverse-primary: '#b9c3ff'
  secondary: '#00658e'
  on-secondary: '#ffffff'
  secondary-container: '#74cafe'
  on-secondary-container: '#005477'
  tertiary: '#4d2300'
  on-tertiary: '#ffffff'
  tertiary-container: '#6f3500'
  on-tertiary-container: '#f39f64'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b9c3ff'
  on-primary-fixed: '#001356'
  on-primary-fixed-variant: '#2e408e'
  secondary-fixed: '#c7e7ff'
  secondary-fixed-dim: '#83cfff'
  on-secondary-fixed: '#001e2e'
  on-secondary-fixed-variant: '#004c6c'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311400'
  on-tertiary-fixed-variant: '#713701'
  background: '#fbf8ff'
  on-background: '#1b1b20'
  surface-variant: '#e3e1e9'
  cyan-tech: '#00F2FF'
  glass-surface: rgba(255, 255, 255, 0.7)
  glass-border: rgba(255, 255, 255, 0.3)
  deep-navy: '#1A265E'
  medical-bg: '#F8FAFC'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  button-text:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: '1.0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-mobile: 20px
  section-padding: 120px
  element-gap: 16px
---

## Brand & Style

This design system embodies the "Medical Futuristic" aesthetic, specifically tailored for a premium dental clinic. The brand personality is clinical, high-tech, and aspirational, positioning aesthetic dentistry as a high-precision, technology-driven discipline. 

The visual style is a sophisticated blend of **Minimalism** and **Glassmorphism**. It prioritizes a sterile, expansive "white space" foundation (clinical purity) layered with translucent, frosted elements and vibrant cyan accents (technological innovation). The interface should feel like a high-end medical terminal—precise, responsive, and effortlessly premium. Users should feel a sense of calm trust and excitement about the advanced care they will receive.

## Colors

The palette is anchored by the logo's core **Navy** and **Light Blue**, but elevated for a futuristic context. 

- **Primary (Navy):** Used for authoritative typography and primary brand markers.
- **Secondary (Light Blue):** Used for secondary actions and supportive brand elements.
- **Cyan Tech (Accent):** A high-vibrancy glow color used sparingly for interactive highlights, active states, and "scanning" effects.
- **Medical Background:** A near-white, cool-tinted gray provides a cleaner, more surgical feel than pure white.
- **Glassmorphism:** Surfaces utilize semi-transparent white with high-density backdrop blurs (20px+) to create depth without clutter.

## Typography

The system utilizes **Plus Jakarta Sans** for headlines to convey a modern, welcoming, yet geometric precision. **Inter** is used for body copy and labels to ensure maximum legibility and a systematic, clean feel.

Hierarchy is established through tight line-heights in displays and generous leading in body text to maintain the "spacious" requirement. Use `label-caps` for small descriptors above headings (e.g., "OUR SERVICES") to reinforce the technical/institutional feel. All headers should favor a slightly tighter letter-spacing for a "locked-in" professional look.

## Layout & Spacing

The layout follows a **Fixed Grid** model on desktop (12 columns) with significant vertical breathing room. 

- **Section Padding:** Use large vertical offsets (120px+) between major sections to maintain the "Spacious" brand focus.
- **Reflow:** On mobile, margins reduce to 20px, and grid columns collapse to a single stack.
- **Rhythm:** Elements within cards or components should follow an 8px base grid for consistent alignment.
- **Interactive Spacing:** Touch targets for buttons and navigation items are oversized to reflect an "interactive care" philosophy.

## Elevation & Depth

Hierarchy is achieved primarily through **Glassmorphism** and **Tonal Layers** rather than heavy shadows.

- **Surface Levels:** The base layer is the `medical-bg`. Secondary information sits on pure white cards with a subtle 1px border (`glass-border`).
- **Floating Glass:** High-priority interactive elements (like the navigation bar or "Reservasi" card) use the `glass-surface` token with a `backdrop-filter: blur(24px)`.
- **Soft Shadows:** When used, shadows must be extremely diffused (Blur: 40px, Opacity: 4%) and tinted with the primary Navy to prevent a "dirty" gray look.
- **Active State Depth:** Upon hover, cards should subtly lift and increase border-glow intensity using the `cyan-tech` color.

## Shapes

The design system uses a **Rounded** shape language to balance futuristic precision with the softness required for dental aesthetics.

- **Component Radius:** Standard buttons and input fields use a 0.5rem (8px) radius.
- **Container Radius:** Cards and section containers use 1rem (16px) for a soft, approachable feel.
- **Interactive elements:** Secondary buttons or tags may use pill-shapes (rounded-full) to distinguish them from primary structural blocks.
- **Borders:** Borders should be kept thin (1px) and use low-contrast or semi-transparent values to maintain a lightweight feel.

## Components

### Buttons
- **Primary:** Solid `primary_color_hex` with white text. On hover, a subtle `cyan-tech` outer glow.
- **Secondary:** Transparent background with a 1px `secondary_color_hex` border. 
- **Glass Action:** Semi-transparent white background with blur, used for overlays on imagery.

### Cards
- **Feature Cards:** White background, 16px border-radius, and a thin `glass-border`. Hover state triggers a 4px vertical lift and a light blue tint to the icon.
- **Tech Cards:** Use a subtle gradient (Navy to Deep Navy) for high-tech sections like "Technology" or "Interactive Care."

### Input Fields
- Outlined style with a soft blue-gray border. On focus, the border transitions to `secondary_color_hex` with a soft glow. Labels should be small and capitalized using the `label-caps` typography style.

### Navigation Bar
- A floating glass bar with a `backdrop-filter: blur(30px)`. Navigation links use `Plus Jakarta Sans` medium weight. The "Reservasi" button is always pinned to the right.

### Icons
- Use thin-line (2pt) futuristic icons. Where possible, incorporate a "duotone" effect using the primary and secondary blues.

### Progress/Interactive Elements
- Use the `cyan-tech` accent for progress bars, loading states, or interactive "scanners" on dental images to emphasize the technological focus.
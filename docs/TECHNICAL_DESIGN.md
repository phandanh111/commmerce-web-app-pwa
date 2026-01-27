# Technical Design Document: PCD PWA

This document serves as a comprehensive analysis and design specification for the "PCD PWA" e-commerce interface, reverse-engineered from the source code. It is intended to guide an AI or developer in reproducing the pixel-perfect design.

## 1. Global Layout & Structure

### Grid System
- **Framework:** Custom implementation based on Bootstrap 4 concepts.
- **Container Width:**
  - Standard: Max-width **1170px** (on screens > 1200px).
  - Fluid padding: 15px on left/right.
- **Section Spacing (`.spad`):**
  - Padding Top: `100px`
  - Padding Bottom: `100px`

### Page Structure
The general page layout follows this vertical stack:
1.  **Header (Sticky/Static):** Contains Top Bar (Info, Login) and Main Navigation (Logo, Menu, Cart).
2.  **Hero Section:** Sidebar Categories (Left 3 cols) + Search & Banner (Right 9 cols).
3.  **Main Content Sections:** Often separated by `.spad` classes.
4.  **Footer:** Multi-column informational footer.

### Layout Logic (Flexbox)
- **Header Top:** `display: flex` (or Bootstrap row/col) for left/right alignment.
- **Navigation:** `display: inline-block` list items within a flex-aligned container.
- **Product Grids:** Bootstrap Rows with `.col-lg-3`, `.col-md-4`, `.col-sm-6` distributions.

---

## 2. Color Palette

### Primary Colors
- **Brand Primary:** `#7fad39` (Green - Used for Buttons, Price tags, Hover states, Active links)
- **Brand Secondary:** `#120851` (Dark Blue - Rarely used, likely for specific emphasis)

### Neutral & UI Colors
- **Backgrounds:**
  - Page Body: `#ffffff`
  - Header Top / Grey Sections: `#f5f5f5`
  - Light Grey (Alt Bg): `#f2f2f2`
  - Dark UI Elements (Dropdowns): `#222222`
- **Text:**
  - Primary Heading (H1-H6): `#1c1c1c` or `#252525` / `#111111`
  - Body Text: `#6f6f6f` (Dark Grey)
  - Placeholders: `#b2b2b2`
  - Footer Text: `#6f6f6f` (often white context dependent)
- **Borders:**
  - Standard Border: `#ebebeb`
  - Alt Border: `#e1e1e1`

### State Colors
- **Hover:** Generally transitions to Primary (`#7fad39`) or White text on Primary bg.
- **Active Navigation:** Text becomes Primary (`#7fad39`).

---

## 3. Typography

### Font Family
- **Primary Font:** `'Cairo', sans-serif`
- **Weights:** 200, 300, 400 (Regular), 600 (Semi-Bold), 900 (Black).

### Type Scale
| Element | Size | Weight | Color | Line-Height | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **H1** | 70px | 700/Bold | `#1c1c1c` | Auto | Hero Titles |
| **H2** | 36px | 700/Bold | `#1c1c1c` | Auto | Section Titles |
| **H3** | 30px | 700/Bold | `#1c1c1c` | Auto | |
| **H4** | 24px | 700/Bold | `#1c1c1c` | Auto | |
| **H5** | 18px | 700/Bold | `#1c1c1c` | Auto | Card Titles |
| **H6** | 16px | 400/Norm | `#1c1c1c` | Auto | Small Headers |
| **Body** | 16px | 400/Norm | `#6f6f6f` | 26px | Standard text |

---

## 4. Component Library

### Buttons
- **Primary Button (`.primary-btn`):**
  - **Styles:** Background `#7fad39`, Text White, Height ~40-50px.
  - **Typography:** Uppercase, Weight 700, Letter-spacing 2px, Font-size 14px.
  - **Padding:** `10px 28px`.
  - **Border Radius:** 0px (Sharp edges inferred from style).
- **Site Button (`.site-btn`):**
  - **Styles:** Similar to Primary but Weight 800, Padding `13px 30px 12px`.
  - **Border:** None.

### Input Fields
- **Standard Input:**
  - Height: `46px` or `50px`.
  - Border: 1px solid `#ebebeb`.
  - Padding: `0 20px`.
  - Font Size: 16px.
  - Focus: No outline (likely slight border darken).

### Hero Search Bar
- **Description:** A composite component.
- **Left:** Category Dropdown ("All Categories") - Bold text, Arrow icon, Divider line.
- **Middle:** Text Input ("What do you need?") - No border between parts.
- **Right:** "SEARCH" Button - Primary Color, Uppercase.
- **Container:** Border 1px solid `#ebebeb`, Height 50px.

### Product Cards (`.featured__item`, `.latest-product__item`)
- **Image Area:**
  - Background Image (`.set-bg`).
  - **Hover Action:** Icons (Heart, Retweet, Cart) appearing from bottom/center animations.
- **Content Area:**
  - Title (H6) - Link color `#1c1c1c`.
  - Price (H5) - Bold `#1c1c1c`.

### Section Titles (`.section-title`)
- **Alignment:** Center.
- **Styling:** H2 text, bold.
- **Decoration:** Pseudo-element (`:after`) underline.
  - Dimensions: 80px width, 4px height.
  - Color: `#7fad39` (Primary).
  - Position: Bottom relative to text.

### Navigation Menu
- **Items:** Uppercase, Bold (700), Font Size 14px, Spacing 2px.
- **Active State:** Text changes to `#7fad39`.
- **Dropdowns:** Background `#222222`, Text White, Fade-in animation.

---

## 5. Responsiveness

### Breakpoints
- **XL:** >= 1200px
- **LG:** 992px - 1199px
- **MD:** 768px - 991px
- **SM:** <= 767px
- **XS:** <= 479px

### Adaptive Behavior
- **Desktop (>= 992px):**
  - Full Header visible.
  - Hero Categories list visible always (on Home).
- **Tablet (768px - 991px):**
  - **Mobile Menu:** Hamburger icon appears (`.humberger__open`).
  - **Header:** Top bar hidden (`display: none`), Main menu hidden.
  - **Hero:** Categories section margin adjustments.
- **Mobile (< 768px):**
  - Stacked layout (Columns become 100% width).
  - Search bar stacks.
  - Footer widgets stack.
  - Font sizes for H1/H2 reduce slightly.

---

## 6. Content & Iconography

### Icons
- **Libraries:**
  - **FontAwesome (v4/v5):** Used for Social icons (`fa-facebook`), Actions (`fa-heart`, `fa-shopping-bag`).
  - **Elegant Icons:** Used for specific UI elements like `icon_heart_alt`.
- **Style:** Mostly Solid/Filled icons for UI controls.

### Imagery
- **Product Images:** Square or 4:3 aspect ratio, often transparent bg (for "fresh" look) or full cover.
- **Banners:** High quality photography, text overlay capabilities.
- **Backgrounds:** Use of `data-setbg` attribute for CSS background-image handling.

---

## Implementation Notes for Clone
1.  **CSS Reset:** Ensure a standard reset is applied.
2.  **Font Loading:** Load 'Cairo' from Google Fonts with weights 200,300,400,600,900.
3.  **Grid:** Use a 12-column grid system (or CSS Grid/Flexbox equivalent).
4.  **Icons:** Include FontAwesome CDN.
5.  **Interactivity:**
    -   Implement "Hover" states for Product Cards (Icons slide/fade in).
    -   Implement "Mobile Menu" drawer (Off-canvas).

# Ogani Project: React + TypeScript Implementation Guide

This document translates the visual design analysis into a technical specification for a React 18+ application using TypeScript.

## 1. Project Stack & Foundation

-   **Framework:** React 18+ (Vite recommended)
-   **Language:** TypeScript
-   **Styling:** SCSS Modules or Styled Components (SCSS Modules is closest to original structure), or TailwindCSS (configured with custom theme).
-   **Icons:** `react-icons` (includes FontAwesome & Feather/Lucide).
-   **Routing:** `react-router-dom` v6+.

## 2. Directory Structure Recommendation

```
src/
├── assets/          # Images, fonts, global styles
├── components/      # Reusable UI components
│   ├── common/      # Generic atoms (Button, Input, Badge)
│   ├── layout/      # Header, Footer, Hero
│   └── specific/    # Domain specific (ProductCard, BlogItem)
├── hooks/           # Custom React hooks
├── pages/           # Page components (Home, Shop, Contact)
├── types/           # TypeScript interfaces
└── styles/          # Global variables/mixins
```

## 3. Design Token Configuration (Theme)

Define these constants (e.g., in a `theme.ts` or CSS variables) to match the analysis.

### Colors
```typescript
export const COLORS = {
  primary: '#7fad39',    // Main Action Green
  secondary: '#120851',  // Dark Blue
  text: {
    heading: '#1c1c1c',  // Primary Text
    body: '#6f6f6f',     // Secondary Text
    light: '#b2b2b2',    // Placeholders
  },
  background: {
    main: '#ffffff',
    section: '#f5f5f5',  // Light Grey Backgrounds
    alt: '#f2f2f2',
    dark: '#222222',     // Dropdowns/Dark sections
  },
  border: '#ebebeb',
}
```

### Typography
```css
/* Global CSS */
body {
  font-family: 'Cairo', sans-serif;
  color: #6f6f6f;
  line-height: unknown; /* Default to 1.5 */
}
h1, h2, h3, h4, h5, h6 {
  color: #1c1c1c;
  font-weight: 700;
}
```

## 4. Key TypeScript Interfaces

### Product Entity
```typescript
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isFresh?: boolean;
  discount?: number;
}
```

### User/Nav Types
```typescript
export interface NavItem {
  label: string;
  path: string;
  hasDropdown?: boolean;
  children?: NavItem[];
}
```

## 5. Core Components Specification

### 5.1 Button Component
**Props Interface:**
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'site' | 'outline';
  size?: 'normal' | 'large';
}
```
**Styles:**
- `primary`: bg-green (#7fad39), text-white, uppercase, bold (700).
- `site`: Like primary but thicker/bold (800).

### 5.2 Section Title
**Props Interface:**
```typescript
interface SectionTitleProps {
  title: string;
  align?: 'center' | 'left';
}
```
**Implementation Note:**
Use a pseudo-element (`::after`) for the 4px green underline.

### 5.3 Product Card
**Props Interface:**
```typescript
interface ProductCardProps {
  product: Product;
  onAddToCart: (id: string) => void;
  onWishlist: (id: string) => void;
}
```
**Interactivity:**
- Hovering over the image container should slide up/fade in the action buttons (Heart, Retweet, Cart) from the bottom.

### 5.4 Header Layout
**Structure:**
1.  **TopBar:** Flex container. Left: Email/Promo text. Right: Socials, Lang, Login.
2.  **NavBar:** Flex container.
    -   Logo (Left)
    -   Menu (Center) - Map through `NavItems`.
    -   CartIcon (Right) - Badge with item count absolute positioned.

### 5.5 Hero Section
**Logic:**
- On `HomePage`: Categories sidebar is open by default? (Check design requirement).
- On `InnerPages`: Categories sidebar might be collapsed or header changes style ("hero-normal").

## 6. Routing Map

| Path | Component | Note |
| :--- | :--- | :--- |
| `/` | `HomePage` | Full layout with open Sidebar |
| `/shop` | `ShopGrid` | Filters + Grid |
| `/shop/:id` | `ShopDetails` | Single Product View |
| `/blog` | `BlogPage` | List view |
| `/contact` | `ContactPage` | Form + Map |
| `/cart` | `ShoppingCart` | Table layout |
| `/checkout` | `Checkout` | Form layout |

## 7. Responsiveness Strategy

Use a custom hook `useMediaQuery` or CSS Media Queries matching these exact breakpoints:
- **Mobile (<768px):**
    - Convert `Navbar` to a Hamburger Menu drawer.
    - Stack `HeaderTop` elements or hide them.
    - Stack `Hero` search bar and phone number.
- **Tablet (768px - 991px):**
    - Similar to mobile for Menu.
    - Grid columns: 2 per row for products.

## 8. Required Assets/Dependencies

- **Google Fonts:** Import `Cairo` weights 200, 300, 400, 600, 900.
- **Carousel:** `react-slick` or `swiper` for the "Categories Slider" and "Latest Products".
- **Maps:** `leaflet` or `google-maps-react` for Contact page.

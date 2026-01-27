# Project Rules

## 1. Project Overview
- **Type**: React PWA (Progressive Web App).
- **Build Tool**: Vite (SWC).
- **Language**: TypeScript.
- **UI Libraries**: Ant Design Mobile (primary), Ant Design (admin/web), Framer Motion.
- **State Management**: Redux Toolkit.
- **Routing**: React Router DOM 6.
- **Styling**: SCSS Modules + Global CSS Variables.
- **Internationalization**: i18next.

## 2. Directory Structure
```
src/
├── components/     # Reusable UI components (Atomic design)
│   ├── [category]/ # e.g., button, card, input
│   │   └── [ComponentName]/
│   │       ├── index.tsx
│   │       └── styles.module.scss
├── containers/     # Business logic & complex compositions
│   └── [FeatureName]/
│       ├── index.tsx
│       └── styles.module.scss
├── pages/          # Route components (Wrappers for containers)
│   └── [Feature]/
│       └── [PageName]/
│           └── index.tsx
├── services/       # API services
│   ├── axios.service.ts # Axios instance with interceptors
│   └── [feature].service.ts
├── stores/         # Redux State
│   ├── Store.tsx   # Store configuration
│   └── [feature]/  # Redux Slices
│       ├── index.ts
│       ├── reducer.ts
│       ├── actions.ts
│       └── selectors.ts
├── styles/         # Global styles & variables
│   ├── global.scss
│   └── _color.scss
├── hooks/          # Custom hooks
├── utils/          # Utility functions
└── types/          # TypeScript definitions
```

## 3. Coding Standards

### 3.1. Components
- **Functional Components**: Use `function` keyword or `const` arrow functions.
- **Props**: Define `Props` type/interface. Export component with `React.memo` (optional but common in this project).
- **Naming**: PascalCase for component folders and component names.
- **Files**: Use `index.tsx` for the component entry.
- **Styles**: Use CSS Modules (`styles.module.scss`). Import as `import styles from './styles.module.scss'`.

### 3.2. State Management (Redux Toolkit)
- Use standard Redux Toolkit slices.
- **Dispatch**: Use Typed `useDispatch`.
- **Selector**: Use Typed `useSelector`.
- **Structure**: Separate `reducer`, `actions`, `selectors` in feature folders.

### 3.3. API Integration
- **Services**: All API calls must be inside `src/services`.
- **Instance**: Use `AxiosGW` from `@/services/axios.service.ts`.
- **Interceptors**: Loading state (`setLoading`) and error handling (`showToast`) are handled automatically in interceptors unless explicitly disabled (`isDisableLoading`, `isDisableToast`).

### 3.4. Naming Conventions
- **Folders**: kebab-case for generic folders, PascalCase for Component folders.
- **Files**: kebab-case for non-component files, PascalCase for component files (inside specific methods).
- **Variables/Functions**: camelCase.
- **Constants**: UPPER_SNAKE_CASE.

### 3.5. Styling
- **Variables**: Use CSS variables defined in `src/styles/_color.scss` (e.g., `var(--primary-color)`).
- **Fonts**: Use CSS variables for font weights and sizes (e.g., `var(--font-medium)`).
- **Modules**: Prefer SCSS Modules for component scoping.

### 3.6 Testing (if applicable)
- Jest + React Testing Library.

## 4. Best Practices
- **Aliases**: Use `@/` for `src` imports.
- **Imports**: Organize imports: Library -> Absolute Project -> Relative.
- **Translation**: Use `useTranslation` hook for all text.
- **Lodash**: Use `lodash-es` for tree-shaking.

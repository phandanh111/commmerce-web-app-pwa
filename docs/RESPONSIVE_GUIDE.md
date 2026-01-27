# Responsive Design Skill & Rules

## 1. Overview
This project uses **Material UI (MUI) v5** as the primary UI framework. Responsive design is achieved using MUI's Grid system, Breakpoints, and the `sx` prop.

## 2. Rules (Quy chuẩn)

### 2.1. Mobile-First Approach
- Always design and implement for mobile screens first (xs), then override for larger screens (md, lg).
- **Rule**: Avoid `max-width` in pixels for layout containers. Use percentages or `Grid` columns.

### 2.2. Breakpoints
Use the standard MUI v5 breakpoints:
- **xs** (extra-small): 0px (Mobile)
- **sm** (small): 600px (Tablet Portrait)
- **md** (medium): 900px (Tablet Landscape / Small Laptop)
- **lg** (large): 1200px (Desktop)
- **xl** (extra-large): 1536px (Large Screens)

### 2.3. Layout Units
- Use **Grid** (`Grid` component) for page layouts.
- Avoid hardcoded heights (e.g., `height: 500px`). Use `min-height` or generic spacing units.
- Use `rem` or MUI's `spacing` multiplier (e.g., `p={2}` = 16px) instead of pixels.

## 3. Skill (Kỹ thuật thực hiện)

### 3.1. Using the Grid System
The `Grid` component is the foundation of responsive layout.
- `container`: The parent wrapper.
- `item`: The children elements.
- `spacing`: Space between items.

```tsx
import { Grid, Card, Typography } from '@mui/material';

const ResponsiveDashboard = () => (
  <Grid container spacing={3}>
    {/* Full width on Mobile, Half width on Tablet, 1/3 on Desktop */}
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <Typography>Item 1</Typography>
      </Card>
    </Grid>
    
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <Typography>Item 2</Typography>
      </Card>
    </Grid>

    <Grid item xs={12} sm={12} md={4}>
      <Card>
        <Typography>Item 3</Typography>
      </Card>
    </Grid>
  </Grid>
);
```

### 3.2. Responsive Styles with `sx` Prop
You can define styles for specific breakpoints directly in the `sx` prop.

```tsx
<Box
  sx={{
    width: '100%',             // Default (xs)
    padding: 2,
    backgroundColor: 'blue',   // Default color
    // Breakpoint overrides
    '@media (min-width:600px)': { // sm
       width: '50%',
    },
    // OR using MUI shorthand (Recommended)
    width: {
      xs: '100%', // 0px+
      sm: '50%',  // 600px+
      md: '25%',  // 900px+
    },
    display: {
      xs: 'block',
      md: 'flex', 
    },
    fontSize: {
      xs: '14px',
      lg: '18px',
    }
  }}
>
  Responsive Content
</Box>
```

### 3.3. Conditional Rendering with `useMediaQuery`
Use `useMediaQuery` hook for logic changes based on screen size (e.g., hiding a sidebar).

```tsx
import { useTheme, useMediaQuery, Drawer } from '@mui/material';

const Sidebar = () => {
  const theme = useTheme();
  // Returns true if screen is larger than 'lg' (1200px)
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  // Returns true if screen is smaller than 'md' (900px)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Drawer
      variant={isDesktop ? 'permanent' : 'temporary'}
      open={true}
    >
      {/* Sidebar Content */}
    </Drawer>
  );
};
```

### 3.4. Global Theme Breakpoints
Access breakpoints in functional components via `useTheme()`:

```tsx
const theme = useTheme();
// theme.breakpoints.up('sm')  => '@media (min-width:600px)'
// theme.breakpoints.down('md') => '@media (max-width:899.95px)'
// theme.breakpoints.between('sm', 'md')
```

## 4. Checklist for Review
- [ ] Is `Grid` used for the main layout structure?
- [ ] Are font sizes readable on mobile?
- [ ] Do images scale correctly (`maxWidth: '100%'`)?
- [ ] Is the Sidebar/Drawer collapsible on mobile?
- [ ] Are spacing/margins reduced on smaller screens?

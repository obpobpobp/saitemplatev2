# Design Tokens

Complete design token system with TypeScript modules and CSS custom properties.

## Overview

The token system provides a consistent design language across your application with:
- **Type-safe TypeScript modules** for programmatic access
- **CSS custom properties** for styling
- **Light/dark mode support** with semantic naming
- **Comprehensive token categories**

## Token Categories

### Colors (`colors.ts`)
- **Primary**: Brand color scale (50-900)
- **Secondary**: Accent color scale
- **Neutral**: Gray scale for text, borders, backgrounds
- **Success**: Positive state colors
- **Error**: Negative state colors
- **Warning**: Caution state colors
- **Info**: Informational colors
- **Semantic**: Context-aware colors (light/dark mode)

### Typography (`typography.ts`)
- **Font Families**: Primary (DM Sans), Display (Lazzer), Mono
- **Font Sizes**: Scale from xs (12px) to 5xl (48px)
- **Font Weights**: Regular, Medium, Semibold, Bold
- **Line Heights**: Tight, Normal, Relaxed, Loose
- **Letter Spacing**: Tighter to Wider
- **Typography Presets**: Pre-configured text styles

### Spacing (`spacing.ts`)
- **Scale**: 4px base unit (1-32 steps)
- **Semantic Names**: xs, sm, md, lg, xl, 2xl, 3xl
- **Helper Function**: `getSpacing(size)`

### Shadows (`shadows.ts`)
- **Elevation Levels**: sm, md, lg, xl, 2xl
- **Inner Shadows**: For inset effects
- **Focus Rings**: For accessibility states

### Borders (`borders.ts`)
- **Widths**: none, thin, medium, thick
- **Radius**: none, sm, md, lg, xl, 2xl, full
- **Styles**: solid, dashed, dotted

### Breakpoints (`breakpoints.ts`)
- **Responsive**: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **Helper Functions**: `mediaQuery()`, `mediaQueryMax()`, `mediaQueryBetween()`

## Usage

### CSS Variables (Recommended)

Use CSS custom properties for automatic theme switching:

```css
.component {
  /* Colors */
  color: var(--color-text-primary);
  background: var(--color-surface-primary);
  border-color: var(--color-border);

  /* Typography */
  font-family: var(--font-family-primary);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-normal);

  /* Spacing */
  padding: var(--spacing-md);
  margin: var(--spacing-lg);
  gap: var(--spacing-sm);

  /* Borders */
  border-radius: var(--border-radius-md);
  border-width: var(--border-width-thin);

  /* Shadows */
  box-shadow: var(--shadow-md);

  /* Transitions */
  transition: all var(--transition-base);
}
```

### TypeScript Imports

Access tokens in TypeScript/JavaScript:

```typescript
import { 
  colors, 
  spacing, 
  typography, 
  shadows,
  breakpoints 
} from '@design-system/tokens';

// Use in components
const cardStyles = {
  padding: spacing.semanticSpacing.md,
  backgroundColor: colors.light.surfacePrimary,
  borderRadius: borders.borderRadius.md,
  boxShadow: shadows.shadows.md,
};

// Responsive logic
if (window.innerWidth >= breakpoints.breakpoints.md) {
  // Tablet and up
}
```

### Helper Functions

```typescript
import { getSpacing, mediaQuery } from '@design-system/tokens';

// Get spacing value
const padding = getSpacing('md'); // '16px'
const margin = getSpacing(4);     // '16px'

// Generate media queries
const tabletUp = mediaQuery('md'); // '(min-width: 768px)'
```

## CSS Variables Reference

### Colors

**Light Mode (default)**:
```css
--color-text-primary      /* Main text */
--color-text-secondary    /* Secondary text */
--color-text-disabled     /* Disabled text */
--color-background        /* Page background */
--color-surface-primary   /* Card/component background */
--color-border            /* Default borders */
--color-interactive       /* Links, buttons */
--color-success           /* Success states */
--color-error             /* Error states */
--color-warning           /* Warning states */
```

**Dark Mode** (`[data-theme="dark"]`):
All semantic colors automatically adjust for dark mode.

### Typography

```css
--font-family-primary     /* DM Sans */
--font-family-display     /* Lazzer */
--font-family-mono        /* Fira Code */

--font-size-xs            /* 12px */
--font-size-sm            /* 14px */
--font-size-md            /* 16px */
--font-size-lg            /* 18px */
--font-size-xl            /* 22px */
--font-size-2xl           /* 26px */
--font-size-3xl           /* 32px */
--font-size-4xl           /* 40px */
--font-size-5xl           /* 48px */

--font-weight-regular     /* 400 */
--font-weight-medium      /* 500 */
--font-weight-semibold    /* 600 */
--font-weight-bold        /* 700 */
```

### Spacing

```css
--spacing-xs              /* 4px */
--spacing-sm              /* 8px */
--spacing-md              /* 16px */
--spacing-lg              /* 24px */
--spacing-xl              /* 32px */
--spacing-2xl             /* 48px */
--spacing-3xl             /* 64px */
```

### Shadows

```css
--shadow-sm               /* Subtle elevation */
--shadow-md               /* Standard elevation */
--shadow-lg               /* Strong elevation */
--shadow-xl               /* Extra elevation */
--shadow-2xl              /* Maximum elevation */
--shadow-focus            /* Focus ring */
```

## Source Files

- `tokens.json` - Original Figma export
- `colors.ts` - Color scales and semantic mappings
- `typography.ts` - Font properties and presets
- `spacing.ts` - Spacing scale and helpers
- `shadows.ts` - Shadow definitions
- `borders.ts` - Border properties
- `breakpoints.ts` - Responsive breakpoints
- `index.ts` - Centralized exports

## Theme System

Tokens are integrated with the theme system for automatic light/dark mode switching:

- Light mode uses semantic color mappings from `colors.light`
- Dark mode uses semantic color mappings from `colors.dark`
- CSS variables update automatically when theme changes
- See `src/design-system/theme/README.md` for theme documentation

## Adding New Tokens

### 1. Update TypeScript Module

```typescript
// colors.ts
export const tertiary = {
  50: '#...',
  // ... color scale
} as const;
```

### 2. Update CSS Variables

```css
/* tokens.css */
:root {
  --color-tertiary-500: #...;
}
```

### 3. Export from Index

```typescript
// index.ts
export { tertiary } from './colors';
```

### 4. Document Usage

Update this README with usage examples.

## Best Practices

1. **Always Use Tokens** - Never hardcode colors, spacing, or typography
2. **Semantic Names** - Use `--color-text-primary` not `--color-black`
3. **CSS Variables** - Prefer CSS variables for automatic theme switching
4. **TypeScript for Logic** - Use TypeScript tokens for conditional logic
5. **Consistent Spacing** - Use spacing scale for all margins/padding
6. **Responsive Design** - Use breakpoint tokens for media queries

## Examples

### Component with Tokens

```tsx
// Button.tsx
import styles from './Button.module.css';

export function Button({ children }) {
  return <button className={styles.button}>{children}</button>;
}
```

```css
/* Button.module.css */
.button {
  padding: var(--spacing-sm) var(--spacing-md);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: white;
  background: var(--color-interactive);
  border: none;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}

.button:hover {
  background: var(--color-interactive-hover);
  box-shadow: var(--shadow-md);
}
```

### Responsive Component

```css
.container {
  padding: var(--spacing-md);
}

@media (min-width: 768px) {
  .container {
    padding: var(--spacing-lg);
  }
}

@media (min-width: 1024px) {
  .container {
    padding: var(--spacing-xl);
  }
}
```

## Troubleshooting

**Tokens not updating:**
- Clear `.next` cache: `rm -rf .next`
- Rebuild: `npm run build`
- Check CSS import order in layout.tsx

**Colors not changing with theme:**
- Verify CSS variables are used (not hardcoded)
- Check `[data-theme="dark"]` selector exists
- Confirm ThemeProvider is wrapping app

**TypeScript errors:**
- Run `npm run type-check`
- Verify imports use correct paths
- Check token exports in index.ts

---

**Need help?** See `src/design-system/theme/README.md` for theme documentation.


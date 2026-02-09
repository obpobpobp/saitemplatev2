# Design Tokens

Complete design token system for the Studocu AI Design System. Tokens are the source of truth for all design decisions.

## 📋 Overview

Design tokens are the atomic design decisions that power the entire design system:
- **Colors**: Brand colors, semantic colors, state colors
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Consistent spacing scale based on 4px
- **Shadows**: Elevation system for depth
- **Borders**: Border widths and radius values
- **Breakpoints**: Responsive design breakpoints

All tokens are available in **two formats**:
1. **TypeScript/JavaScript** - `tokens/*.ts` files for programmatic access
2. **CSS Variables** - `theme/tokens.css` for stylesheet usage

---

## 🎨 Color System

### Base Color Scales

Each color has a scale from 50 (lightest) to 900 (darkest):

```typescript
import { colors } from '@design-system/tokens';

// Primary (Blue)
colors.primary[50]   // #e3f2fd
colors.primary[500]  // #2196f3
colors.primary[900]  // #0d47a1

// Secondary (Purple)
colors.secondary[50]  // #f3e5f5
colors.secondary[500] // #9c27b0
colors.secondary[900] // #4a148c

// Neutral (Gray)
colors.neutral[50]   // #fafafa
colors.neutral[500]  // #9e9e9e
colors.neutral[900]  // #212121

// Success (Green)
colors.success[600]  // #43a047

// Error (Red)
colors.error[600]    // #e53935

// Warning (Orange)
colors.warning[600]  // #fb8c00

// Info (Cyan)
colors.info[600]     // #039be5
```

### Semantic Colors

Semantic colors automatically adapt to light/dark themes:

```css
/* Text colors */
--color-text-primary      /* Main text color */
--color-text-secondary    /* Secondary/muted text */
--color-text-disabled     /* Disabled state text */
--color-text-inverse      /* Inverse text (light on dark, dark on light) */
--color-text-strong       /* Emphasized text */
--color-text-subtle       /* De-emphasized text */
--color-text-xsubtle      /* Extra subtle text */
--color-text-title        /* Page/section titles */

/* Background colors */
--color-background           /* Page background */
--color-background-secondary /* Secondary background */
--color-background-tertiary  /* Tertiary background */

/* Surface colors */
--color-surface-primary      /* Card/panel background */
--color-surface-secondary    /* Nested surface */
--color-surface-tertiary     /* Double-nested surface */
--color-surface-elevated     /* Elevated surfaces (modals, dropdowns) */

/* Border colors */
--color-border               /* Default border */
--color-border-light         /* Subtle border */
--color-border-strong        /* Emphasized border */
--color-border-focus         /* Focus state border */
--color-border-interactive   /* Interactive element borders */

/* Interactive colors */
--color-interactive          /* Links, buttons */
--color-interactive-hover    /* Hover state */
--color-interactive-active   /* Active/pressed state */
--color-interactive-link     /* Link color */

/* State colors */
--color-success              /* Success messages */
--color-error                /* Error messages */
--color-warning              /* Warning messages */
--color-info                 /* Info messages */

/* Status containers (for badges, chips) */
--color-status-info-container
--color-status-info-foreground
--color-status-success-container
--color-status-success-foreground
--color-status-warning-container
--color-status-warning-foreground
--color-status-danger-container
--color-status-danger-foreground

/* Brand */
--color-primary              /* Primary brand color */
--gradient-studocu           /* Studocu brand gradient */
```

### Usage Examples

```css
/* In CSS Modules */
.container {
  background-color: var(--color-surface-primary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}

.primaryButton {
  background-color: var(--color-primary);
  color: white;
}

.successMessage {
  background-color: var(--color-status-success-container);
  color: var(--color-status-success-foreground);
}
```

```typescript
// In TypeScript
import { colors } from '@design-system/tokens';

const theme = {
  primary: colors.primary[600],
  success: colors.success[600],
  text: colors.neutral[900],
};
```

---

## 📝 Typography

### Font Families

```typescript
import { fontFamilies } from '@design-system/tokens';

fontFamilies.primary  // "DM Sans" - Main UI font
fontFamilies.display  // "Lazzer" - Display/hero text
fontFamilies.mono     // "Fira Code" - Code blocks
```

```css
/* In CSS */
.text {
  font-family: var(--font-family-primary);
}

.hero {
  font-family: var(--font-family-display);
}

.code {
  font-family: var(--font-family-mono);
}
```

### Font Sizes

Based on rem units (1rem = 16px):

```css
--font-size-xs     /* 12px - Captions, labels */
--font-size-sm     /* 14px - Small text, secondary info */
--font-size-md     /* 16px - Body text (default) */
--font-size-lg     /* 18px - Large body text */
--font-size-xl     /* 22px - Small headings */
--font-size-2xl    /* 26px - Section headings */
--font-size-3xl    /* 32px - Page headings */
--font-size-4xl    /* 40px - Hero headings */
--font-size-5xl    /* 48px - Large hero text */
```

### Font Weights

```css
--font-weight-regular    /* 400 - Body text */
--font-weight-medium     /* 500 - Emphasized text */
--font-weight-semibold   /* 600 - Subheadings */
--font-weight-bold       /* 700 - Headings */
```

### Line Heights

```css
/* Relative line heights */
--line-height-tight      /* 1.3 (130%) - Headings */
--line-height-normal     /* 1.4 (140%) - Body text */
--line-height-relaxed    /* 1.5 (150%) - Long-form content */
--line-height-loose      /* 1.6 (160%) - Very readable text */

/* Fixed line heights */
--line-height-xs         /* 16px */
--line-height-sm         /* 20px */
--line-height-md         /* 24px */
--line-height-lg         /* 28px */
```

### Letter Spacing

```css
--letter-spacing-tighter /* -0.02em - Display text */
--letter-spacing-tight   /* -0.01em - Headings */
--letter-spacing-normal  /* 0 - Body text */
--letter-spacing-wide    /* 0.01em - Caps */
--letter-spacing-wider   /* 0.02em - All caps */
```

### Typography Presets

Pre-defined combinations matching Figma design system:

```typescript
import { typographyPresets } from '@design-system/tokens';

typographyPresets.title       // 48px, bold, display font
typographyPresets.heading26   // 26px, bold
typographyPresets.subtitle22  // 22px, semibold
typographyPresets.subtitle18  // 18px, semibold
typographyPresets.body16      // 16px, regular
typographyPresets.body14      // 14px, regular
typographyPresets.body12      // 12px, regular
```

### Usage Examples

```css
.heading {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
}

.body {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
}

.caption {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}
```

---

## 📏 Spacing

Based on a **4px base unit** for consistent spacing:

### Numeric Scale

```css
--spacing-1     /* 4px */
--spacing-2     /* 8px */
--spacing-3     /* 12px */
--spacing-4     /* 16px */
--spacing-5     /* 20px */
--spacing-6     /* 24px */
--spacing-7     /* 28px */
--spacing-8     /* 32px */
--spacing-9     /* 36px */
--spacing-10    /* 40px */
--spacing-11    /* 44px */
--spacing-12    /* 48px */
--spacing-13    /* 52px */
--spacing-14    /* 56px */
--spacing-15    /* 60px */
--spacing-16    /* 64px */
--spacing-20    /* 80px */
--spacing-24    /* 96px */
--spacing-32    /* 128px */
```

### Semantic Names

```css
--spacing-xs    /* 4px - Tight spacing */
--spacing-sm    /* 8px - Small spacing */
--spacing-md    /* 16px - Default spacing */
--spacing-lg    /* 24px - Large spacing */
--spacing-xl    /* 32px - Extra large spacing */
--spacing-2xl   /* 48px - Section spacing */
--spacing-3xl   /* 64px - Large section spacing */
```

### Usage Guidelines

- **Padding/Margin**: Use semantic names (md, lg, xl)
- **Gaps**: Use numeric scale for fine control
- **Sections**: Use 2xl, 3xl for major sections
- **Components**: md for default, adjust as needed

### Usage Examples

```css
.card {
  padding: var(--spacing-lg);
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.grid {
  display: grid;
  gap: var(--spacing-6);
}

.section {
  padding-block: var(--spacing-2xl);
}
```

---

## 🌑 Shadows

Elevation system using box shadows:

### Shadow Levels

```css
--shadow-none   /* No shadow */
--shadow-sm     /* 0 1px 2px - Subtle elevation */
--shadow-md     /* 0 0 8px - Standard cards */
--shadow-lg     /* Multiple shadows - Strong elevation */
--shadow-xl     /* 0 8px 24px - Prominent elements */
--shadow-2xl    /* 0 16px 48px - Modals, popovers */
```

### Inner Shadows

```css
--shadow-inner-sm   /* Inset 0 1px 2px - Subtle inset */
--shadow-inner-md   /* Inset 0 2px 4px - Pressed state */
```

### Focus Rings

```css
--shadow-focus         /* Blue focus ring */
--shadow-focus-error   /* Red focus ring */
--shadow-focus-success /* Green focus ring */
```

### Usage Examples

```css
.card {
  box-shadow: var(--shadow-md);
}

.modal {
  box-shadow: var(--shadow-2xl);
}

.button:active {
  box-shadow: var(--shadow-inner-sm);
}

.input:focus-visible {
  box-shadow: var(--shadow-focus);
}
```

---

## 🔲 Borders

### Border Widths

```css
--border-width-none     /* 0 */
--border-width-thin     /* 1px - Default borders */
--border-width-medium   /* 2px - Emphasized borders */
--border-width-thick    /* 4px - Strong borders */
```

### Border Radius

```css
--border-radius-none    /* 0 - Sharp corners */
--border-radius-xs      /* 5px - Subtle rounding */
--border-radius-sm      /* 8px - Small components */
--border-radius-md      /* 12px - Cards, buttons */
--border-radius-lg      /* 20px - Large cards */
--border-radius-xl      /* 24px - Extra large */
--border-radius-2xl     /* 32px - Hero elements */
--border-radius-pill    /* 9999px - Pills, tags */
--border-radius-full    /* 9999px - Circles, avatars */
```

### Usage Examples

```css
.card {
  border: var(--border-width-thin) solid var(--color-border);
  border-radius: var(--border-radius-md);
}

.pill {
  border-radius: var(--border-radius-pill);
}

.avatar {
  border-radius: var(--border-radius-full);
}
```

---

## 📱 Breakpoints

Responsive design breakpoints:

```typescript
import { breakpoints, mediaQuery } from '@design-system/tokens';

breakpoints.sm   // 640px - Mobile
breakpoints.md   // 768px - Tablet
breakpoints.lg   // 1024px - Desktop
breakpoints.xl   // 1280px - Large desktop
breakpoints['2xl'] // 1536px - Extra large

// Helper functions
mediaQuery('md')           // '(min-width: 768px)'
mediaQueryMax('md')        // '(max-width: 767px)'
mediaQueryBetween('md', 'lg') // '(min-width: 768px) and (max-width: 1023px)'
```

### Mobile-First Approach

```css
/* Mobile first (default) */
.container {
  padding: var(--spacing-sm);
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: var(--spacing-md);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    padding: var(--spacing-lg);
  }
}
```

---

## ⚡ Transitions

Smooth, consistent animations:

### Duration & Timing

```css
--transition-fast       /* 150ms ease - Micro-interactions */
--transition-base       /* 200ms ease - Standard transitions */
--transition-slow       /* 300ms ease - Complex animations */

--transition-timing-ease
--transition-timing-ease-in
--transition-timing-ease-out
--transition-timing-ease-in-out
```

### Usage Examples

```css
.button {
  transition: all var(--transition-base);
}

.tooltip {
  transition: opacity var(--transition-fast);
}

.modal {
  transition: 
    transform var(--transition-slow),
    opacity var(--transition-slow);
}
```

---

## 📚 Z-Index Scale

Consistent layering system:

```css
--z-index-base            /* 0 - Base layer */
--z-index-dropdown        /* 1000 - Dropdowns */
--z-index-sticky          /* 1020 - Sticky headers */
--z-index-fixed           /* 1030 - Fixed elements */
--z-index-modal-backdrop  /* 1040 - Modal backdrop */
--z-index-modal           /* 1050 - Modals */
--z-index-popover         /* 1060 - Popovers */
--z-index-tooltip         /* 1070 - Tooltips */
```

### Usage Examples

```css
.dropdown {
  z-index: var(--z-index-dropdown);
}

.modal {
  z-index: var(--z-index-modal);
}

.tooltip {
  z-index: var(--z-index-tooltip);
}
```

---

## 🎨 Token File Structure

```
tokens/
├── index.ts              # Exports all tokens
├── tokens.json           # JSON format (for tooling)
├── colors.ts             # Color system
├── typography.ts         # Typography tokens
├── spacing.ts            # Spacing scale
├── shadows.ts            # Shadow system
├── borders.ts            # Border tokens
├── breakpoints.ts        # Responsive breakpoints
└── README.md             # This file
```

---

## 📖 Usage Patterns

### In TypeScript/JavaScript

```typescript
// Import specific token categories
import { colors, spacing, typography } from '@design-system/tokens';

// Use in component logic
const buttonStyle = {
  padding: spacing[4],
  backgroundColor: colors.primary[600],
  fontSize: typography.fontSizes[3],
};

// Type-safe token access
import type { ColorScale, SpacingScale } from '@design-system/tokens';

const getColor = (scale: ColorScale, shade: keyof ColorScale) => {
  return colors[scale][shade];
};
```

### In CSS Modules

```css
/* ALWAYS use CSS variables in stylesheets */
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
  margin-bottom: var(--spacing-lg);
  gap: var(--spacing-sm);
  
  /* Borders */
  border-radius: var(--border-radius-md);
  border-width: var(--border-width-thin);
  
  /* Effects */
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
}
```

---

## 🌓 Theme Support

All semantic tokens automatically adapt to light/dark themes:

```css
/* These automatically change based on [data-theme="dark"] */
.text {
  color: var(--color-text-primary); /* #212121 in light, #fafafa in dark */
}

.surface {
  background: var(--color-surface-primary); /* #ffffff in light, #1e1e1e in dark */
}

/* Manual dark mode overrides when needed */
[data-theme="dark"] .specialComponent {
  box-shadow: var(--shadow-xl);
}
```

---

## ✅ Token Usage Rules

### DO ✅

```css
/* Use semantic tokens */
color: var(--color-text-primary);
background: var(--color-surface-primary);
padding: var(--spacing-md);

/* Use numeric tokens for fine control */
gap: var(--spacing-6);
margin-top: var(--spacing-8);
```

### DON'T ❌

```css
/* Never hardcode values */
color: #333333;
background: white;
padding: 16px;

/* Never use arbitrary values */
margin: 17px;
padding: 13px 19px;
```

---

## 🔧 Customization

### Updating Tokens

1. **Edit TypeScript files** in `tokens/` directory
2. **Update CSS variables** in `theme/tokens.css`
3. **Test in both themes**: Light and dark
4. **Check responsive**: All breakpoints
5. **Update documentation**: If adding new tokens

### Adding New Tokens

```typescript
// 1. Add to TypeScript file (e.g., colors.ts)
export const colors = {
  // ... existing colors
  accent: {
    500: '#FF6B35',
    // ... other shades
  },
};

// 2. Add to CSS variables (theme/tokens.css)
:root {
  --color-accent-500: #FF6B35;
  /* Or semantic name */
  --color-accent: var(--color-accent-500);
}

// 3. Document in this README
// 4. Update tokens.json if needed
```

---

## 📚 Additional Resources

- **Theme System**: `src/design-system/theme/README.md`
- **Component Template**: `docs/COMPONENT-TEMPLATE.md`
- **Figma Designs**: [Design System File]
- **Color Contrast Checker**: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## 🎯 Best Practices

1. **Always use tokens** - Never hardcode design values
2. **Semantic over specific** - Use semantic token names when possible
3. **Consistent spacing** - Stick to the 4px spacing scale
4. **Test both themes** - Ensure tokens work in light and dark modes
5. **Accessible colors** - Verify contrast ratios (4.5:1 for text)
6. **Mobile-first** - Use breakpoints progressively
7. **Document changes** - Update this README when adding tokens
8. **Type safety** - Use TypeScript tokens for type checking

---

**Questions?** Check the main documentation or ask your team lead.

**Last Updated**: January 2026
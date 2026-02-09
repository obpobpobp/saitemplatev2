# Theme System

Complete theme system with light/dark mode switching, localStorage persistence, and system preference detection.

## Architecture

The theme system consists of three main parts:

1. **Design Tokens** - TypeScript modules and CSS variables
2. **ThemeProvider** - React context for theme state management
3. **useTheme Hook** - Custom hook for consuming theme context

## Quick Start

### 1. Wrap Your App with ThemeProvider

The ThemeProvider is already integrated in `src/app/layout.tsx`:

```tsx
import { ThemeProvider } from '@design-system/theme/ThemeProvider';
import '@design-system/theme/tokens.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 2. Use Theme in Your Components

```tsx
'use client';

import { useTheme } from '@design-system/theme/useTheme';

export function MyComponent() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Resolved theme: {resolvedTheme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('system')}>System</button>
    </div>
  );
}
```

### 3. Use Theme Toggle Component

```tsx
import { ThemeToggle } from '@design-system/components/theme/ThemeToggle';

export function Header() {
  return (
    <header>
      <h1>My App</h1>
      <ThemeToggle size="medium" showLabel />
    </header>
  );
}
```

## Design Tokens

### Using CSS Variables

All design tokens are available as CSS variables:

```css
.myComponent {
  /* Colors */
  color: var(--color-text-primary);
  background-color: var(--color-surface-primary);
  border-color: var(--color-border);

  /* Typography */
  font-family: var(--font-family-primary);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);

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

### Using TypeScript Tokens

Import tokens directly in TypeScript/JavaScript:

```typescript
import { colors, spacing, typography } from '@design-system/tokens';

// Access token values
const primaryColor = colors.primary[600];
const mediumSpacing = spacing[4]; // 16px
const headingFont = typography.families.display;
```

## Theme Configuration

### Theme Types

- **`'light'`** - Light mode (bright background, dark text)
- **`'dark'`** - Dark mode (dark background, light text)
- **`'system'`** - Follow system preference (default)

### Theme Properties

The `useTheme` hook returns:

```typescript
interface UseThemeReturn {
  theme: 'light' | 'dark' | 'system';      // Current theme setting
  resolvedTheme: 'light' | 'dark';         // Actual applied theme
  setTheme: (theme: Theme) => void;        // Set specific theme
  toggleTheme: () => void;                 // Toggle light/dark
}
```

### Storage

- Theme preference is saved to `localStorage` with key `'theme'`
- Persists across browser sessions
- Falls back to `'system'` if no preference is stored

### System Preference Detection

The theme system automatically:
- Detects system color scheme preference
- Listens for system theme changes
- Updates theme in real-time when system preference changes

## Creating Theme-Aware Components

### Pattern 1: CSS Variables (Recommended)

Use CSS variables for automatic theme switching:

```css
.card {
  background: var(--color-surface-primary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}
```

### Pattern 2: Conditional Styling

Use resolved theme for conditional logic:

```tsx
'use client';

import { useTheme } from '@design-system/theme/useTheme';
import styles from './Card.module.css';

export function Card({ children }) {
  const { resolvedTheme } = useTheme();

  return (
    <div 
      className={styles.card}
      data-theme={resolvedTheme}
    >
      {children}
    </div>
  );
}
```

### Pattern 3: Dynamic Styles

For complex theme-dependent styles:

```tsx
import { useTheme } from '@design-system/theme/useTheme';

export function Chart() {
  const { resolvedTheme } = useTheme();

  const chartColors = {
    light: ['#2196f3', '#4caf50', '#ff9800'],
    dark: ['#64b5f6', '#81c784', '#ffb74d'],
  };

  return <ChartComponent colors={chartColors[resolvedTheme]} />;
}
```

## SSR and Hydration

### Avoiding Hydration Mismatches

The theme system handles SSR gracefully:

1. **Blocking Script** - Initializes theme before React hydrates
2. **suppressHydrationWarning** - Added to `<html>` tag
3. **Client-Only Rendering** - Theme-dependent content only renders client-side

### Example: Safe Theme Usage

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@design-system/theme/useTheme';

export function ThemeAwareComponent() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return <div>Current theme: {resolvedTheme}</div>;
}
```

## Customization

### Custom Theme Colors

To customize colors, edit `src/design-system/tokens/colors.ts` and `src/design-system/theme/tokens.css`.

### Custom Storage Key

Change the storage key when creating the ThemeProvider:

```tsx
<ThemeProvider storageKey="my-app-theme">
  {children}
</ThemeProvider>
```

### Default Theme

Set a custom default theme:

```tsx
<ThemeProvider defaultTheme="dark">
  {children}
</ThemeProvider>
```

## Best Practices

1. **Use CSS Variables** - Prefer CSS variables for automatic theme switching
2. **Semantic Names** - Use semantic color names (`--color-text-primary`) not specific colors
3. **Smooth Transitions** - Add transitions for smooth theme changes
4. **Respect Reduced Motion** - Honor `prefers-reduced-motion` preference
5. **Test Both Themes** - Always test components in both light and dark modes
6. **Accessibility** - Ensure sufficient color contrast in both themes

## Troubleshooting

### Theme Not Persisting

- Check browser localStorage is enabled
- Verify storage key matches across app
- Check for console errors

### Hydration Mismatch

- Ensure `suppressHydrationWarning` is on `<html>` tag
- Use mounted state pattern for theme-dependent content
- Check blocking script is in `<head>`

### Theme Not Switching

- Verify ThemeProvider wraps your component
- Check useTheme is called within a client component
- Ensure CSS variables are properly defined

### Styles Not Updating

- Confirm CSS variables are used (not hardcoded values)
- Check transition property isn't overridden
- Verify dark mode overrides in `[data-theme="dark"]` selector

## Examples

### Full Page Example

```tsx
// src/app/dashboard/page.tsx
import { DashboardContent } from './DashboardContent';

export default function DashboardPage() {
  return <DashboardContent />;
}

// src/app/dashboard/DashboardContent.tsx
'use client';

import { useTheme } from '@design-system/theme/useTheme';
import { ThemeToggle } from '@design-system/components/theme/ThemeToggle';
import styles from './dashboard.module.css';

export function DashboardContent() {
  const { theme } = useTheme();

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Dashboard</h1>
        <ThemeToggle />
      </header>
      <main className={styles.main}>
        <p>Current theme: {theme}</p>
        {/* Dashboard content */}
      </main>
    </div>
  );
}
```

```css
/* src/app/dashboard/dashboard.module.css */
.dashboard {
  min-height: 100vh;
  background: var(--color-background);
  color: var(--color-text-primary);
}

.header {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-lg);
  background: var(--color-surface-primary);
  border-bottom: 1px solid var(--color-border);
}

.main {
  padding: var(--spacing-xl);
}
```

## API Reference

### ThemeProvider Props

```typescript
interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: 'light' | 'dark' | 'system'; // Default: 'system'
  storageKey?: string;                         // Default: 'theme'
}
```

### useTheme Return Type

```typescript
interface UseThemeReturn {
  theme: 'light' | 'dark' | 'system';
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}
```

### ThemeToggle Props

```typescript
interface ThemeToggleProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';  // Default: 'medium'
  showLabel?: boolean;                    // Default: false
}
```

---

**Need help?** Check the main README.md or COMPONENT-TEMPLATE.md for more information.









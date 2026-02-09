# Logo Component

Scalable SVG logo component with multiple variants and automatic theme adaptation.

## Overview

The Logo component provides the Studocu brand logo in multiple formats with full theme support. Built using inline SVG for perfect scalability and zero external dependencies.

## Features

- ✅ Scalable vector graphics (SVG)
- ✅ Two variants: Icon and Logotype
- ✅ Automatic theme adaptation
- ✅ Manual color control
- ✅ Flexible sizing
- ✅ Forward ref support
- ✅ Accessibility compliant
- ✅ Zero external dependencies

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'icon' \| 'logotype'` | `'logotype'` | Logo variant |
| `color` | `'dark' \| 'light' \| 'auto'` | `'auto'` | Color scheme |
| `height` | `number` | `30` | Logo height in pixels (width scales proportionally) |
| `className` | `string` | - | Additional CSS class |
| `ariaLabel` | `string` | `'Studocu'` | Accessible label |

## Variants

### Logotype (Full Logo)
Complete logo with "studocu" text and icon. Ideal for headers, navigation, and prominent placements.

**Aspect Ratio**: 124:30 (≈4.13:1)

```tsx
<Logo variant="logotype" color="auto" height={30} />
```

### Icon (Symbol Only)
Compact "S" symbol only. Perfect for small spaces, favicons, and app icons.

**Aspect Ratio**: 1:1 (Square)

```tsx
<Logo variant="icon" color="auto" height={30} />
```

## Color Schemes

### Auto (Recommended)
Automatically adapts to the current theme. Dark logo on light backgrounds, light logo on dark backgrounds.

```tsx
<Logo color="auto" />
```

### Dark
Always displays dark logo. Use on light backgrounds.

```tsx
<Logo color="dark" />
```

### Light
Always displays light logo. Use on dark backgrounds.

```tsx
<Logo color="light" />
```

## Usage Examples

### Basic Usage

```tsx
import { Logo } from '@/design-system/components/branding';

<Logo />
```

### Header/Navigation

```tsx
<header className={styles.header}>
  <Logo variant="logotype" color="auto" height={32} />
  <nav>{/* navigation items */}</nav>
</header>
```

### Different Sizes

```tsx
// Small (e.g., mobile header)
<Logo variant="icon" height={24} />

// Default
<Logo variant="logotype" height={30} />

// Large (e.g., hero section)
<Logo variant="logotype" height={48} />

// Extra large (e.g., splash screen)
<Logo variant="logotype" height={64} />
```

### With Link

```tsx
import Link from 'next/link';

<Link href="/" aria-label="Go to homepage">
  <Logo variant="logotype" color="auto" height={32} />
</Link>
```

### Custom Styling

```tsx
<Logo 
  variant="logotype"
  color="auto"
  height={40}
  className="custom-logo-class"
/>
```

```css
/* Custom styles */
.custom-logo-class {
  opacity: 0.8;
  transition: opacity 0.2s;
}

.custom-logo-class:hover {
  opacity: 1;
}
```

### Responsive Sizing

```tsx
<Logo 
  variant="logotype"
  color="auto"
  height={window.innerWidth < 768 ? 24 : 32}
/>
```

Or with CSS:

```tsx
<Logo variant="logotype" className={styles.responsiveLogo} />
```

```css
.responsiveLogo {
  height: 24px;
  width: auto;
}

@media (min-width: 768px) {
  .responsiveLogo {
    height: 32px;
  }
}

@media (min-width: 1024px) {
  .responsiveLogo {
    height: 40px;
  }
}
```

### With Forward Ref

```tsx
const logoRef = useRef<SVGSVGElement>(null);

<Logo 
  ref={logoRef}
  variant="logotype" 
  onLoad={() => {
    console.log('Logo loaded:', logoRef.current);
  }}
/>
```

## Sizing Guide

### Recommended Heights

| Context | Variant | Height |
|---------|---------|--------|
| Mobile header | Icon | 24-28px |
| Mobile header | Logotype | 20-24px |
| Desktop header | Logotype | 28-40px |
| Hero section | Logotype | 48-64px |
| Footer | Logotype | 24-32px |
| Favicon | Icon | 16-32px |
| App icon | Icon | 48-512px |
| Social media | Logotype | 400-1200px |

### Aspect Ratios

- **Logotype**: Width = Height × 4.13
- **Icon**: Width = Height (square)

## Accessibility

### ARIA Labels
The logo includes proper `role="img"` and customizable `aria-label`:

```tsx
// Default
<Logo ariaLabel="Studocu" />

// Custom
<Logo ariaLabel="Studocu - Study Documents Platform" />

// In link context
<Link href="/" aria-label="Go to Studocu homepage">
  <Logo ariaLabel="Studocu logo" />
</Link>
```

### Screen Readers
The SVG is properly exposed to screen readers with:
- `role="img"` attribute
- `aria-label` for description
- Semantic SVG structure

## Theme Integration

The logo automatically adapts to your theme:

```tsx
// Light theme: displays dark logo
<Logo color="auto" />

// Dark theme: displays light logo
<Logo color="auto" />
```

Manual override when needed:

```tsx
// Always dark (for light backgrounds)
<div style={{ background: 'white' }}>
  <Logo color="dark" />
</div>

// Always light (for dark backgrounds)
<div style={{ background: 'black' }}>
  <Logo color="light" />
</div>
```

## Best Practices

### ✅ Do

- Use `variant="logotype"` for primary brand presence
- Use `variant="icon"` for space-constrained areas
- Use `color="auto"` for automatic theme adaptation
- Maintain minimum height of 20px for readability
- Provide clear spacing around the logo
- Use appropriate `aria-label` for context

### ❌ Don't

- Don't distort aspect ratio (use height only)
- Don't place on busy backgrounds without proper contrast
- Don't resize below 20px height
- Don't add filters or effects that obscure the logo
- Don't use raster formats when SVG is available
- Don't forget accessibility labels

## Common Patterns

### App Header

```tsx
<header className={styles.appHeader}>
  <Link href="/">
    <Logo variant="logotype" color="auto" height={32} />
  </Link>
  <nav>{/* navigation */}</nav>
  <ThemeToggle />
</header>
```

### Loading Splash

```tsx
<div className={styles.splash}>
  <Logo 
    variant="logotype" 
    color="auto" 
    height={64}
    className={styles.splashLogo}
  />
  <Spinner />
</div>
```

### Footer

```tsx
<footer className={styles.footer}>
  <Logo variant="icon" color="auto" height={40} />
  <p>© 2025 Studocu. All rights reserved.</p>
</footer>
```

### Mobile vs Desktop

```tsx
function ResponsiveLogo() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <Logo 
      variant={isMobile ? 'icon' : 'logotype'}
      height={isMobile ? 28 : 32}
    />
  );
}
```

## Technical Details

### SVG Structure
- **Format**: Inline SVG (no external files)
- **ViewBox**: `0 0 30 30` (icon), `0 0 124 30` (logotype)
- **Fill**: Uses `currentColor` for theme adaptation
- **Preserve Aspect Ratio**: Enabled

### File Size
- **Icon SVG**: ~2KB (minified)
- **Logotype SVG**: ~9KB (minified)
- **Zero additional HTTP requests**

### Performance
- Inline SVG for instant rendering
- No external dependencies
- CSS-based theme switching (no JavaScript)
- Optimized path data

## Troubleshooting

### Logo not visible
- Check container background color
- Verify `color` prop matches background
- Ensure proper theme is active for `auto` mode

### Logo too small/large
- Adjust `height` prop value
- Check parent container constraints
- Verify no CSS overrides

### Wrong color in theme
- Check theme provider is active
- Verify `data-theme` attribute on `<html>`
- Use `color="dark"` or `color="light"` as fallback

### Aspect ratio distorted
- Only set `height`, never `width`
- Remove any CSS that sets both dimensions
- Check for `object-fit` or transform CSS

## Browser Support

- ✅ All modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ SVG support required (IE11+ with fallbacks)

## Resources

- [Figma Source](https://www.figma.com/design/QcGTXgMJjncv3zAHokUYht/-Foundation--SLICE-Design-System?node-id=41068-771)
- [SVG Specification](https://www.w3.org/TR/SVG2/)
- [Accessible SVG Icons](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA24)








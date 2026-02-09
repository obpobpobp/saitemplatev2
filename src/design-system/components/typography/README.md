# Typography System

Complete typography component library with Heading, Text, and Link components built on design tokens.

## Overview

The typography system provides consistent, accessible, and themeable text components:

- **Heading** - Semantic headings (h1-h6) with flexible styling
- **Text** - Body text with multiple variants
- **Link** - Accessible links with Next.js integration

All components:
- Use design tokens exclusively (no hardcoded values)
- Support light and dark themes automatically
- Are fully accessible (WCAG 2.1 AA)
- Respond to screen size changes
- Support polymorphic rendering
- Include forward refs

## Components

### Heading

Semantic heading component with independent visual styling.

#### Props

```typescript
interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;          // Semantic level
  variant?: 'display' | 'headline' | 'title' | 'subtitle';  // Visual style
  children: ReactNode;
  className?: string;
  as?: ElementType;                      // Polymorphic rendering
}
```

#### Usage

```tsx
import { Heading } from '@design-system/components/typography';

// Semantic h1 with default styling
<Heading level={1}>Page Title</Heading>

// Semantic h2 with display variant styling
<Heading level={2} variant="display">
  Hero Heading
</Heading>

// Render as div but style as h3
<Heading level={3} as="div">
  Styled Div
</Heading>
```

#### Variants

- **display** - Largest, most prominent (uses display font family)
- **headline** - Large section headings
- **title** - Standard section titles
- **subtitle** - Secondary headings (muted color)

#### Responsive Behavior

Headings automatically scale down on smaller screens:
- Display/h1: 48px → 40px (mobile)
- Headline/h2: 40px → 32px (mobile)
- Title/h3: 32px → 26px (mobile)

### Text

Body text component with multiple size and style variants.

#### Props

```typescript
interface TextProps {
  variant?: 'body-lg' | 'body-md' | 'body-sm' | 'caption' | 'label';
  children: ReactNode;
  className?: string;
  as?: ElementType;                      // Default: 'p'
  align?: 'left' | 'center' | 'right';   // Default: 'left'
}
```

#### Usage

```tsx
import { Text } from '@design-system/components/typography';

// Default body text (body-md)
<Text>Regular paragraph text</Text>

// Large body text
<Text variant="body-lg">
  Introductory paragraph with emphasis
</Text>

// Small caption text
<Text variant="caption">Image caption text</Text>

// Label text (medium weight, wider spacing)
<Text variant="label">FORM LABEL</Text>

// Center-aligned text
<Text align="center">Centered content</Text>

// Render as span instead of p
<Text as="span" variant="body-sm">
  Inline text
</Text>
```

#### Variants

- **body-lg** (18px) - Emphasized content, introductions
- **body-md** (16px) - Default body text
- **body-sm** (14px) - Secondary content, less emphasis
- **caption** (12px) - Image captions, footnotes (muted color)
- **label** (14px) - Form labels, UI text (medium weight)

#### Alignment

- **left** (default) - Standard left alignment
- **center** - Centered text
- **right** - Right-aligned text

### Link

Accessible link component with Next.js integration and external link handling.

#### Props

```typescript
interface LinkProps extends Omit<NextLinkProps, 'as'> {
  children: ReactNode;
  href: string;
  external?: boolean;                    // Default: false
  showExternalIcon?: boolean;            // Default: false
  className?: string;
}
```

#### Usage

```tsx
import { Link } from '@design-system/components/typography';

// Internal link (Next.js navigation)
<Link href="/about">About Us</Link>

// External link (opens in new tab, secure attributes)
<Link href="https://example.com" external>
  Visit Example
</Link>

// External link with icon indicator
<Link href="https://docs.site.com" external showExternalIcon>
  Documentation
</Link>

// Link in text context
<Text>
  Read more about our <Link href="/blog">blog posts</Link>.
</Text>
```

#### Features

- **Internal Links**: Uses Next.js Link for client-side navigation
- **External Links**: Adds `target="_blank"` and `rel="noopener noreferrer"`
- **Icon Indicator**: Optional external link icon
- **Keyboard Accessible**: Full keyboard navigation support
- **Focus States**: Visible focus ring (focus-visible)
- **Theme Aware**: Uses interactive color tokens

## Design Token Integration

All typography components use CSS variables from the design token system:

### Font Families
```css
--font-family-primary   /* DM Sans */
--font-family-display   /* Lazzer */
--font-family-mono      /* Fira Code */
```

### Font Sizes
```css
--font-size-xs   /* 12px - Caption */
--font-size-sm   /* 14px - Small body, Label */
--font-size-md   /* 16px - Body text */
--font-size-lg   /* 18px - Large body */
--font-size-xl   /* 22px - Subtitle, h5 */
--font-size-2xl  /* 26px - h4 */
--font-size-3xl  /* 32px - Title, h3 */
--font-size-4xl  /* 40px - Headline, h2 */
--font-size-5xl  /* 48px - Display, h1 */
```

### Font Weights
```css
--font-weight-regular   /* 400 */
--font-weight-medium    /* 500 */
--font-weight-semibold  /* 600 */
--font-weight-bold      /* 700 */
```

### Line Heights
```css
--line-height-tight    /* 1.3 - Headings */
--line-height-normal   /* 1.4 - Body text */
--line-height-relaxed  /* 1.5 - Large body */
--line-height-loose    /* 1.6 - Spacious */
```

### Letter Spacing
```css
--letter-spacing-tighter  /* -0.02em - Large headings */
--letter-spacing-tight    /* -0.01em - Headings */
--letter-spacing-normal   /* 0 - Body text */
--letter-spacing-wide     /* 0.01em - Labels */
--letter-spacing-wider    /* 0.02em - All caps */
```

### Colors
```css
--color-text-primary     /* Main text color */
--color-text-secondary   /* Muted text (captions, subtitles) */
--color-text-disabled    /* Disabled text */
--color-interactive      /* Link color */
--color-interactive-hover
--color-interactive-active
```

## Accessibility

All typography components meet WCAG 2.1 AA standards:

### Semantic HTML
- Headings use proper h1-h6 elements
- Heading hierarchy is meaningful
- Text uses appropriate elements (p, span, div)
- Links are semantic anchor elements

### Color Contrast
- Body text: 4.5:1 minimum contrast ratio
- Large text (18px+): 3:1 minimum contrast ratio
- Link color has sufficient contrast
- Works in both light and dark themes

### Keyboard Navigation
- Links are fully keyboard accessible
- Tab order is logical
- Focus states are clearly visible (focus-visible)
- No keyboard traps

### Screen Readers
- Semantic elements provide proper context
- External links have appropriate attributes
- Heading levels create document structure
- No visual-only information

## Responsive Typography

Typography scales based on screen size:

### Mobile (< 768px)
- Headings reduce by 1-2 sizes
- body-lg → body-md equivalent
- Optimized for readability on small screens

### Tablet (768px - 1023px)
- Moderate scaling
- Balanced for touch targets
- Comfortable reading width

### Desktop (1024px+)
- Full typography scale
- Optimal line length for reading
- Maximum visual hierarchy

## Theme Support

All typography automatically adapts to light/dark themes:

### Light Mode
- Dark text on light backgrounds
- Primary text: #212121
- Secondary text: #757575
- Interactive: #1e88e5

### Dark Mode  
- Light text on dark backgrounds
- Primary text: #fafafa
- Secondary text: #e0e0e0
- Interactive: #42a5f5

## Common Patterns

### Page Title with Subtitle

```tsx
<Heading level={1}>Page Title</Heading>
<Heading level={2} variant="subtitle">
  Supporting description text
</Heading>
```

### Article Content

```tsx
<article>
  <Heading level={1}>Article Title</Heading>
  
  <Text variant="body-lg">
    Introduction paragraph with emphasis...
  </Text>
  
  <Heading level={2}>Section Heading</Heading>
  
  <Text>Regular body paragraphs...</Text>
  
  <Text variant="caption">
    Photo credit: Name
  </Text>
</article>
```

### Card with Link

```tsx
<div className={styles.card}>
  <Heading level={3}>Card Title</Heading>
  <Text>Card description content...</Text>
  <Link href="/learn-more">Learn More →</Link>
</div>
```

### Form Field

```tsx
<div className={styles.field}>
  <Text as="label" variant="label" htmlFor="email">
    EMAIL ADDRESS
  </Text>
  <input id="email" type="email" />
  <Text variant="caption">
    We'll never share your email
  </Text>
</div>
```

## Best Practices

### Do ✅

- Use semantic heading levels (h1, h2, h3...)
- Maintain heading hierarchy (don't skip levels)
- Use variants to adjust visual style
- Apply design tokens for consistency
- Test in both light and dark themes
- Verify keyboard accessibility
- Check color contrast ratios
- Use polymorphic `as` prop when needed

### Don't ❌

- Don't skip heading levels (h1 → h3)
- Don't use headings for styling only
- Don't hardcode font sizes or colors
- Don't use div with onClick instead of Link
- Don't forget external link attributes
- Don't rely on color alone for meaning
- Don't ignore responsive behavior

## Examples

### Marketing Hero

```tsx
<section className={styles.hero}>
  <Heading level={1} variant="display">
    Build Amazing Products
  </Heading>
  <Heading level={2} variant="subtitle">
    The design system that scales with your team
  </Heading>
  <Link href="/get-started">Get Started →</Link>
</section>
```

### Blog Post

```tsx
<article>
  <Text variant="label">DESIGN SYSTEMS</Text>
  
  <Heading level={1}>
    Building Scalable Design Systems
  </Heading>
  
  <Text variant="caption">
    Published on October 29, 2024 by Author Name
  </Text>
  
  <Text variant="body-lg">
    Introduction paragraph with lead-in...
  </Text>
  
  <Text>
    Regular body paragraphs...
  </Text>
  
  <Heading level={2}>Section Title</Heading>
  
  <Text>
    More content... <Link href="#">inline link</Link> in context.
  </Text>
</article>
```

### Feature List

```tsx
<section>
  <Heading level={2} align="center">
    Key Features
  </Heading>
  
  <Text align="center" variant="body-lg">
    Everything you need to build great products
  </Text>
  
  <div className={styles.features}>
    {features.map(feature => (
      <div key={feature.id}>
        <Heading level={3}>{feature.title}</Heading>
        <Text>{feature.description}</Text>
        <Link href={feature.url}>Learn more</Link>
      </div>
    ))}
  </div>
</section>
```

## Troubleshooting

### Heading levels not semantic
**Problem**: Visual hierarchy doesn't match semantic structure  
**Solution**: Use `variant` prop to adjust visual style without changing semantic level

```tsx
// Bad - skips h2
<Heading level={1}>Title</Heading>
<Heading level={3}>Subtitle</Heading>

// Good - proper hierarchy with variant
<Heading level={1}>Title</Heading>
<Heading level={2} variant="subtitle">Subtitle</Heading>
```

### Links not opening in new tab
**Problem**: External links open in same tab  
**Solution**: Add `external` prop

```tsx
<Link href="https://example.com" external>
  External Site
</Link>
```

### Text color not changing with theme
**Problem**: Hardcoded colors instead of tokens  
**Solution**: Use CSS variables or component variants

```css
/* Bad */
.text {
  color: #000000;
}

/* Good */
.text {
  color: var(--color-text-primary);
}
```

### Typography not responsive
**Problem**: Text too large/small on mobile  
**Solution**: Components are already responsive - check viewport meta tag

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

## Testing Checklist

- [ ] All heading levels (1-6) render correctly
- [ ] Heading variants apply proper styles
- [ ] Text variants have correct sizes
- [ ] Text alignment works (left, center, right)
- [ ] Internal links navigate correctly
- [ ] External links open in new tab with security attrs
- [ ] External icon displays when requested
- [ ] Keyboard navigation works (Tab, Enter)
- [ ] Focus states are visible
- [ ] Light theme has proper contrast
- [ ] Dark theme has proper contrast
- [ ] Typography scales on mobile
- [ ] Typography scales on tablet
- [ ] Polymorphic `as` prop works
- [ ] Forward refs work

---

**Need help?** Check the [main README](../../../README.md) or [theme documentation](../../theme/README.md).








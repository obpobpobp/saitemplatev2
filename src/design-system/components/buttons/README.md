# Button System

Complete button component library built with 100% Figma design fidelity.

## Overview

The Button system provides a comprehensive set of button components with multiple variants, colors, sizes, and states. All components are built following the design specifications from Figma and maintain pixel-perfect accuracy.

## Components

### Button
Primary interaction component with full variant support

### Icon
Font Awesome icon wrapper with consistent sizing

### Spinner
Loading indicator for button loading states

## Button Component API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'tertiary' \| 'plain'` | `'primary'` | Button style variant |
| `color` | `'black' \| 'white' \| 'gray' \| 'blue'` | `'blue'` | Color scheme |
| `size` | `'micro' \| 'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `children` | `ReactNode` | - | Button content |
| `leftIcon` | `ReactNode` | - | Icon on left side |
| `rightIcon` | `ReactNode` | - | Icon on right side |
| `iconOnly` | `ReactNode` | - | For circular icon-only buttons |
| `isDisabled` | `boolean` | `false` | Disabled state |
| `isLoading` | `boolean` | `false` | Loading state with spinner |
| `isFullWidth` | `boolean` | `false` | Full width button |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Button type attribute |
| `className` | `string` | - | Additional CSS class |
| `as` | `ElementType` | `'button'` | Polymorphic element type |
| `onClick` | `(event: MouseEvent) => void` | - | Click handler |

## Variants

### Primary
High-emphasis buttons for primary actions.
- Solid background color
- White text (except white variant)
- Strongest visual weight

```tsx
<Button variant="primary" color="blue">
  Primary Action
</Button>
```

### Secondary
Medium-emphasis buttons for secondary actions.
- Border with transparent or white background
- Colored text and icons
- Less prominent than primary

```tsx
<Button variant="secondary" color="blue">
  Secondary Action
</Button>
```

### Tertiary
Low-emphasis buttons for tertiary actions.
- Transparent background
- Colored text
- Subtle hover states

```tsx
<Button variant="tertiary" color="blue">
  Tertiary Action
</Button>
```

### Plain
Text-only buttons with no padding.
- No background or border
- Bold text
- Minimal visual weight

```tsx
<Button variant="plain" color="blue">
  Plain Button
</Button>
```

## Colors

### Blue
Primary brand color for interactive elements.

```tsx
<Button color="blue">Blue Button</Button>
```

### Black
High contrast for light backgrounds.

```tsx
<Button color="black">Black Button</Button>
```

### Gray
Neutral option for secondary actions.

```tsx
<Button color="gray">Gray Button</Button>
```

### White
For dark backgrounds and overlays.

```tsx
<Button color="white">White Button</Button>
```

## Sizes

### Large (52px height)
For prominent primary actions.

```tsx
<Button size="large">Large Button</Button>
```

### Medium (40px height) - Default
Standard button size for most use cases.

```tsx
<Button size="medium">Medium Button</Button>
```

### Small (32px height)
Compact buttons for tight spaces.

```tsx
<Button size="small">Small Button</Button>
```

### Micro (24px height)
Smallest size for inline actions.

```tsx
<Button size="micro">Micro Button</Button>
```

## Usage Examples

### Basic Button

```tsx
import { Button } from '@/design-system/components/buttons';

<Button variant="primary" color="blue">
  Click Me
</Button>
```

### Button with Left Icon

```tsx
import { Button, Icon } from '@/design-system/components/buttons';

<Button 
  variant="primary" 
  color="blue"
  leftIcon={<Icon name="check" size="medium" />}
>
  Save
</Button>
```

### Button with Right Icon

```tsx
<Button 
  variant="secondary" 
  color="blue"
  rightIcon={<Icon name="arrow-right" size="medium" />}
>
  Next
</Button>
```

### Icon-Only Button

```tsx
<Button
  variant="tertiary"
  color="blue"
  iconOnly={<Icon name="close" size="medium" ariaLabel="Close" />}
/>
```

### Loading State

```tsx
const [isLoading, setIsLoading] = useState(false);

<Button 
  variant="primary" 
  color="blue"
  isLoading={isLoading}
  onClick={() => setIsLoading(true)}
>
  {isLoading ? 'Loading...' : 'Submit'}
</Button>
```

### Disabled Button

```tsx
<Button 
  variant="primary" 
  color="blue"
  isDisabled
>
  Disabled Button
</Button>
```

### Full Width Button

```tsx
<Button 
  variant="primary" 
  color="blue"
  isFullWidth
>
  Full Width Button
</Button>
```

### Button Group

```tsx
<div style={{ display: 'flex', gap: '8px' }}>
  <Button variant="secondary" color="blue">
    Cancel
  </Button>
  <Button variant="primary" color="blue">
    Confirm
  </Button>
</div>
```

## Icon Component

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | - | Font Awesome icon name |
| `size` | `'micro' \| 'small' \| 'medium' \| 'large'` | `'medium'` | Icon size |
| `className` | `string` | - | Additional CSS class |
| `ariaLabel` | `string` | - | Accessible label |
| `ariaHidden` | `boolean` | `false` | Hide from screen readers |

### Usage

```tsx
import { Icon } from '@/design-system/components/buttons';

<Icon name="heart" size="medium" />
<Icon name="search" size="large" ariaLabel="Search" />
```

### Available Icons

Uses Font Awesome 6 Free. Common icons:
- `check`, `close`, `plus`, `minus`
- `arrow-left`, `arrow-right`, `arrow-up`, `arrow-down`
- `chevron-left`, `chevron-right`, `chevron-up`, `chevron-down`
- `heart`, `star`, `bookmark`
- `search`, `filter`, `settings`
- `trash`, `edit`, `download`, `upload`
- `user`, `users`, `bell`, `home`

Full list: https://fontawesome.com/icons

## Accessibility

### Keyboard Navigation
- **Tab**: Navigate between buttons
- **Enter/Space**: Activate button
- **Escape**: Cancel (in modals)

### Screen Readers
- Proper button semantics
- Disabled state announced
- Loading state with live region
- Icon-only buttons require `ariaLabel`

### Focus States
- Visible focus indicator
- 2px outline with offset
- Uses `:focus-visible` for keyboard-only focus

### Color Contrast
- WCAG 2.1 AA compliant
- Tested in light and dark modes
- Minimum 4.5:1 contrast ratio

### Best Practices
```tsx
// ✅ Good: Icon-only with aria-label
<Button 
  iconOnly={<Icon name="close" ariaLabel="Close dialog" />}
/>

// ❌ Bad: Icon-only without label
<Button 
  iconOnly={<Icon name="close" />}
/>

// ✅ Good: Descriptive loading text
<Button isLoading>
  Saving changes...
</Button>

// ❌ Bad: Generic loading text
<Button isLoading>
  Loading...
</Button>
```

## Design Tokens

All button styles use design tokens for consistency:

### Colors
- `--color-primary-*`: Brand colors
- `--color-neutral-*`: Gray scale
- Text colors from semantic tokens

### Spacing
- Gap: `4px` between icons and text
- Padding: Varies by size
- Border radius: `100px` (pill shape), `50%` (icon-only)

### Typography
- Font family: DM Sans
- Font weight: 500 (Medium), 700 (Bold for Plain)
- Line height: 24px

### Transitions
- Duration: 200ms (base), 150ms (fast)
- Easing: ease
- Respects `prefers-reduced-motion`

## Figma-to-Code Mapping

### Component Properties
| Figma Property | Code Prop | Values |
|----------------|-----------|---------|
| Variant | `variant` | Primary, Secondary, Tertiary, Plain |
| Color | `color` | Black, White, Gray, Blue |
| Size | `size` | Micro, Small, Medium, Large |
| State | `isDisabled`, `isLoading` | Boolean flags |
| Type | Button with icons or `iconOnly` | Variable, Icon Only |

### Measurements
| Element | Size | Figma Spec |
|---------|------|------------|
| Large height | 52px | ✓ |
| Medium height | 40px | ✓ |
| Small height | 32px | ✓ |
| Micro height | 24px | ✓ |
| Icon container | 20px | ✓ |
| Icon size | 16px | ✓ |
| Gap | 4px | ✓ |
| Border radius | 100px | ✓ |

## Common Patterns

### Form Actions

```tsx
<div className={styles.formActions}>
  <Button variant="secondary" color="blue" type="reset">
    Reset
  </Button>
  <Button variant="primary" color="blue" type="submit">
    Submit
  </Button>
</div>
```

### Modal Actions

```tsx
<div className={styles.modalFooter}>
  <Button variant="tertiary" color="blue" onClick={onClose}>
    Cancel
  </Button>
  <Button variant="primary" color="blue" onClick={onConfirm}>
    Confirm
  </Button>
</div>
```

### Card Actions

```tsx
<div className={styles.cardActions}>
  <Button variant="plain" color="blue">
    Learn More
  </Button>
  <Button 
    variant="tertiary" 
    color="blue"
    iconOnly={<Icon name="bookmark" ariaLabel="Bookmark" />}
  />
</div>
```

### Navigation

```tsx
<div className={styles.pagination}>
  <Button 
    variant="secondary" 
    leftIcon={<Icon name="arrow-left" />}
  >
    Previous
  </Button>
  <Button 
    variant="secondary"
    rightIcon={<Icon name="arrow-right" />}
  >
    Next
  </Button>
</div>
```

## Troubleshooting

### Icons not showing
- Ensure Font Awesome CSS is imported in `globals.css`
- Check icon name matches Font Awesome naming
- Verify icon size prop matches button size

### Styling conflicts
- Check for CSS specificity issues
- Ensure design tokens are loaded
- Verify theme provider is active

### TypeScript errors
- Import types: `import type { ButtonProps } from '@/design-system/components/buttons'`
- Ensure correct prop types
- Check `as` prop type matches render element

### Accessibility warnings
- Add `ariaLabel` to icon-only buttons
- Use semantic button types (`submit`, `reset`)
- Test keyboard navigation
- Verify focus states are visible

## Contributing

When modifying the button system:

1. Reference Figma specifications
2. Update all variant combinations
3. Test in both light and dark themes
4. Verify accessibility compliance
5. Update documentation
6. Add test cases

## Resources

- [Figma Design System](https://figma.com/file/QYFFe5iacNupZ64iKl9Uf4)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Button Accessibility](https://www.w3.org/WAI/ARIA/apg/patterns/button/)








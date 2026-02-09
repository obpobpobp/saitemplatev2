# TileButton Component

A versatile button component designed for selection tiles and action buttons in the Studocu AI design system. Supports multiple orientations, colors, and interaction states.

## Features

- **Multiple Orientations**: Vertical and horizontal layouts
- **Color Variants**: Neutral, pink, and blue themes
- **Rich States**: Default, hover, pressed, selected, loading, disabled
- **Font Awesome Icons**: Full support for Font Awesome solid icons
- **Chip Badges**: Optional chip labels for notifications or counts
- **Arrow Indicators**: Optional right arrow for navigation
- **Accessibility**: Full ARIA support and keyboard navigation
- **Responsive**: Adapts to content and container size

## Usage

### Basic Example

```tsx
import { TileButton } from '@/design-system/components/modals/TileButton';

<TileButton
  title="AI Notes"
  subtitle="Create from documents"
  icon="fa-solid fa-file"
  chipLabel="New"
  orientation="vertical"
  color="neutral"
  onClick={() => console.log('Clicked')}
/>
```

### Horizontal Layout

```tsx
<TileButton
  title="Audio Recording"
  subtitle="Record or upload audio"
  icon="fa-solid fa-microphone"
  orientation="horizontal"
  color="neutral"
  showArrow
  onClick={handleClick}
/>
```

### With Loading State

```tsx
const [isLoading, setIsLoading] = useState(false);

<TileButton
  title="AI Summary"
  subtitle="Generating..."
  icon="fa-solid fa-pen-nib"
  orientation="vertical"
  state={isLoading ? 'loading' : undefined}
  loadingText="Creating..."
  onClick={handleClick}
/>
```

### In Creations Panel (Sidebar Footer)

```tsx
<SidebarPanel
  title="Creations"
  footer={
    <div className={styles.tileButtonsGrid}>
      <TileButton
        title="AI Notes"
        subtitle="Create from documents"
        icon="fa-solid fa-file"
        chipLabel="New"
        orientation="vertical"
        color="neutral"
        onClick={() => handleCreate('notes')}
      />
      <TileButton
        title="AI Summary"
        subtitle="Summarize content"
        icon="fa-solid fa-pen-nib"
        orientation="vertical"
        color="neutral"
        onClick={() => handleCreate('summary')}
      />
      <TileButton
        title="AI Quiz"
        subtitle="Generate quiz"
        icon="fa-solid fa-circle-question"
        orientation="vertical"
        color="neutral"
        onClick={() => handleCreate('quiz')}
      />
    </div>
  }
>
  {/* Panel content */}
</SidebarPanel>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | Required | Main title text |
| `subtitle` | `string` | - | Optional subtitle/secondary text |
| `icon` | `ReactNode \| string` | - | Font Awesome icon class or custom React element |
| `chipLabel` | `string` | - | Optional chip badge label |
| `showArrow` | `boolean` | `false` | Show right arrow icon |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Button layout direction |
| `color` | `'neutral' \| 'pink' \| 'blue'` | `'neutral'` | Color theme variant |
| `state` | `'default' \| 'hover' \| 'pressed' \| 'selected' \| 'loading' \| 'disabled'` | `'default'` | Interaction state |
| `onClick` | `() => void` | - | Click handler |
| `disabled` | `boolean` | `false` | Disabled state |
| `loadingText` | `string` | `'Loading...'` | Text shown in loading state |
| `ariaLabel` | `string` | - | ARIA label for accessibility |
| `className` | `string` | - | Additional CSS class |

## States

### Default
- White background (#ffffff)
- Gray border (#d3d9e0)
- Dark gray text (#4c5966)
- Interactive hover effect

### Hover
- Light gray background (#f6f7fb)
- Darker border (#c5cdd4)
- Darker text (#2f3e4e)

### Pressed
- Gray background (#e6ebef)
- Darker border (#c5cdd4)
- Darker text (#2f3e4e)

### Selected
- Gray background (#e6ebef)
- Dark border (#4c5966)
- Darker text (#2f3e4e)

### Loading
- Light gray background (#f6f7fb)
- Shows spinner instead of icon
- Displays custom loading text
- Disabled interaction

### Disabled
- Light gray background (#f6f7fb)
- Very light border (#e6ebef)
- Gray text (#a0a8af)
- Reduced opacity (0.6)
- No interaction

## Styling

The component uses CSS Modules for styling. Key customization points:

- Border radius: 20px
- Icon size: 40x40px with 32px font
- Title: 14px medium weight
- Subtitle: 12px regular weight
- Vertical padding: 8px
- Horizontal padding: 12px vertical, 16px horizontal

## Accessibility

- Proper ARIA labels and roles
- Keyboard navigation support
- Focus visible outlines
- Loading and disabled states announced
- Screen reader friendly

## Examples

See `/app/tilebutton-demo` for comprehensive examples of all variants and states.

## Design System

Based on the Studocu AI Design System specification from Figma:
- Component uses neutral color variant for Creations panel
- Follows exact spacing, typography, and color tokens
- Maintains design fidelity with Figma specs




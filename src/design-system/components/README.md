# Design System Components

This directory contains all reusable components for the StudocuAI Design System.

## Component Categories

### `/buttons/`
Button components for user actions:
- Primary buttons for main actions
- Secondary buttons for alternative actions
- Icon buttons
- Button groups

### `/typography/`
Text and typography components:
- Headings (H1-H6)
- Paragraphs
- Labels
- Links
- Text utilities

### `/layout/`
Layout and structural components:
- Containers
- Grids
- Cards
- Sections
- Dividers

### `/editor/`
Rich text editor components:
- Editor toolbar
- Text formatting controls
- Media insertion
- Special editor features

## Creating New Components

Follow the standard 4-file structure for every component:

```
ComponentName/
├── ComponentName.tsx        # React component
├── ComponentName.module.css # Styles
├── ComponentName.types.ts   # TypeScript types
└── index.ts                 # Exports
```

See `docs/COMPONENT-TEMPLATE.md` for detailed guidelines.

## Component Standards

### Accessibility
- WCAG 2.1 AA minimum
- Semantic HTML
- Keyboard navigation
- Screen reader support

### Styling
- CSS Modules only
- Design tokens for all values
- Responsive by default
- Dark mode ready (if applicable)

### TypeScript
- Strict mode enabled
- Explicit types
- Props interfaces with JSDoc
- No `any` types

### Testing
- Test user interactions
- Test accessibility
- Test responsive behavior

## Importing Components

Use path aliases for clean imports:

```typescript
// Import from components
import { Button } from '@components/buttons/Button';
import { Heading } from '@components/typography/Heading';

// Or from design-system
import { Button } from '@design-system/components/buttons/Button';
```

## Component Checklist

Before marking a component as complete:

- [ ] All 4 files created
- [ ] TypeScript compiles
- [ ] Uses design tokens
- [ ] Accessible
- [ ] Responsive
- [ ] Documented
- [ ] Follows naming conventions
- [ ] No hardcoded values

## Questions?

Refer to:
- `docs/COMPONENT-TEMPLATE.md` - Component structure guide
- `.cursorrules` - Coding standards
- `README.md` - Project overview










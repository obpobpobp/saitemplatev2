# Studocu AI Design System - System Architecture

**Complete technical architecture documentation for the Studocu AI Design System Template**

---

## 📋 Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Design Token System](#design-token-system)
- [Theme Architecture](#theme-architecture)
- [Component System](#component-system)
- [TypeScript Configuration](#typescript-configuration)
- [Styling Architecture](#styling-architecture)
- [Accessibility Architecture](#accessibility-architecture)
- [Performance Strategy](#performance-strategy)
- [Build & Deployment](#build--deployment)

---

## 🎯 Overview

### Purpose
This is the **official Studocu AI Design System Template** - a production-ready foundation for building AI-powered educational features. Every new Studocu AI feature must be built using this template to ensure:
- **Consistency** across all products
- **Quality** through standardized patterns
- **Maintainability** with clear architecture
- **Scalability** for growing requirements
- **Accessibility** compliance (WCAG 2.1 AA)

### Core Principles
1. **Token-Driven Design**: All design decisions encoded as reusable tokens
2. **Component-First**: Modular, reusable components
3. **Type Safety**: Comprehensive TypeScript coverage
4. **Accessibility Always**: WCAG 2.1 AA minimum
5. **Performance Optimized**: Fast load times, smooth interactions
6. **Theme Support**: Light/dark modes with system preference detection
7. **Mobile-First**: Responsive from the start

---

## 🚀 Technology Stack

### Core Framework
```
Next.js 15.0+        # React framework with App Router
React 19.0+          # UI library
TypeScript 5.9+      # Type-safe JavaScript
```

### Styling
```
CSS Modules          # Scoped styles (native)
CSS Custom Properties # Design tokens
No CSS Framework     # Pure CSS for zero lock-in
```

### Development Tools
```
ESLint 8.56+         # Code quality
TypeScript Compiler  # Type checking
Next.js Dev Server   # Hot module replacement
```

### Additional Libraries
```
TipTap 3.9+         # Rich text editor
Font Awesome 6.5+   # Icon system
classnames 2.5+     # Conditional class names
```

### Node Environment
```
Node.js 18+         # Runtime requirement
npm                 # Package manager
```

---

## 📁 Project Structure

### High-Level Architecture

```
sdaitemplate/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout with providers
│   │   ├── page.tsx                  # Homepage
│   │   ├── globals.css               # Global styles
│   │   └── [feature-demos]/          # Demo pages for components
│   │
│   ├── design-system/                # Design system (core)
│   │   ├── tokens/                   # Design tokens
│   │   │   ├── colors.ts             # Color system
│   │   │   ├── typography.ts         # Typography tokens
│   │   │   ├── spacing.ts            # Spacing scale
│   │   │   ├── shadows.ts            # Shadow system
│   │   │   ├── borders.ts            # Border tokens
│   │   │   ├── breakpoints.ts        # Responsive breakpoints
│   │   │   ├── tokens.json           # JSON format (tooling)
│   │   │   └── index.ts              # Token exports
│   │   │
│   │   ├── theme/                    # Theme system
│   │   │   ├── tokens.css            # CSS variable definitions
│   │   │   ├── ThemeProvider.tsx     # Theme context provider
│   │   │   ├── useTheme.ts           # Theme hook
│   │   │   └── README.md             # Theme documentation
│   │   │
│   │   └── components/               # Component library
│   │       ├── branding/             # Logo, brand elements
│   │       ├── buttons/              # Button components
│   │       ├── cards/                # Card components
│   │       ├── chat/                 # Chat interface
│   │       ├── dev/                  # Development tools
│   │       ├── editor/               # Rich text editor
│   │       ├── exam/                 # Exam system (6 types)
│   │       ├── home/                 # Homepage components
│   │       ├── icons/                # Icon components
│   │       ├── inputs/               # Input components
│   │       ├── layout/               # Layout components
│   │       │   ├── Header/           # Header with variants
│   │       │   └── Sidebar/          # Sidebar navigation
│   │       ├── modals/               # Modal/dialog system
│   │       ├── onboarding/           # Onboarding flows
│   │       ├── quiz/                 # Quiz components
│   │       ├── theme/                # Theme toggle
│   │       ├── typography/           # Text components
│   │       └── uploads/              # File upload system
│   │
│   ├── contexts/                     # React contexts
│   │   └── PersonaContext.tsx        # User persona state
│   │
│   ├── data/                         # Mock/test data
│   │   └── mockProjects.ts           # Sample project data
│   │
│   ├── hooks/                        # Custom React hooks
│   ├── lib/                          # Utility functions
│   └── types/                        # Global TypeScript types
│
├── public/                           # Static assets
│   ├── Assistant avatar.png
│   ├── useravatar.jpg
│   └── robots.txt
│
├── docs/                             # Documentation
│   ├── GETTING-STARTED.md            # Setup guide
│   └── COMPONENT-TEMPLATE.md         # Component creation guide
│
├── .cursorrules                      # Coding guidelines (comprehensive)
├── tsconfig.json                     # TypeScript configuration
├── next.config.js                    # Next.js configuration
├── package.json                      # Dependencies
├── README.md                         # Project overview
├── QUICK-REFERENCE.md                # Quick commands
├── DEPLOYMENT.md                     # Deployment guide
├── DOCUMENTATION_SUMMARY.md          # Docs overview
└── SYSTEM_ARCHITECTURE.md            # This file
```

### Component Directory Structure

Every component follows the **4-file pattern**:

```
ComponentName/
├── ComponentName.tsx        # React component implementation
├── ComponentName.module.css # Component-specific styles
├── ComponentName.types.ts   # TypeScript interfaces
└── index.ts                 # Barrel export
```

---

## 🎨 Design Token System

### Token Architecture

Design tokens form the single source of truth for all design decisions.

```
┌─────────────────────────────────────┐
│   Figma Design System               │
│   (Design Source of Truth)          │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│   TypeScript Token Files            │
│   - colors.ts                       │
│   - typography.ts                   │
│   - spacing.ts                      │
│   - shadows.ts                      │
│   - borders.ts                      │
│   - breakpoints.ts                  │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│   CSS Custom Properties              │
│   (tokens.css)                       │
│   - :root variables                 │
│   - [data-theme="dark"] overrides   │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│   Component Styles                  │
│   (Component.module.css)            │
└─────────────────────────────────────┘
```

### Token Categories

1. **Colors** (`tokens/colors.ts`)
   - Base scales: primary, secondary, neutral, success, error, warning, info
   - Semantic mappings: text, background, surface, border, interactive
   - Both light and dark theme variants

2. **Typography** (`tokens/typography.ts`)
   - Font families: DM Sans (primary), Lazzer (display), Fira Code (mono)
   - Font sizes: xs (12px) to 5xl (48px)
   - Font weights: 400, 500, 600, 700
   - Line heights: tight, normal, relaxed, loose
   - Letter spacing: tighter to wider
   - Typography presets: title, heading26, subtitle22, subtitle18, body16, body14, body12

3. **Spacing** (`tokens/spacing.ts`)
   - 4px base unit
   - Numeric scale: 1 (4px) to 32 (128px)
   - Semantic names: xs, sm, md, lg, xl, 2xl, 3xl

4. **Shadows** (`tokens/shadows.ts`)
   - Elevation levels: none, sm, md, lg, xl, 2xl
   - Inner shadows for pressed states
   - Focus rings for accessibility

5. **Borders** (`tokens/borders.ts`)
   - Widths: thin (1px), medium (2px), thick (4px)
   - Radius: xs (5px) to 2xl (32px), plus pill and full

6. **Breakpoints** (`tokens/breakpoints.ts`)
   - Mobile: 640px
   - Tablet: 768px
   - Desktop: 1024px
   - Large: 1280px
   - Extra large: 1536px

### Token Access Patterns

**In TypeScript:**
```typescript
import { colors, spacing, typography } from '@design-system/tokens';

const styles = {
  color: colors.primary[600],
  padding: spacing[4],
  fontSize: typography.fontSizes[3],
};
```

**In CSS:**
```css
.component {
  color: var(--color-primary);
  padding: var(--spacing-md);
  font-size: var(--font-size-md);
}
```

---

## 🌓 Theme Architecture

### Theme System Flow

```
┌────────────────────────────┐
│   ThemeProvider            │
│   - Wraps entire app       │
│   - Manages theme state    │
│   - Persists to localStorage│
└────────────┬───────────────┘
             │
             ↓
┌────────────────────────────┐
│   useTheme Hook            │
│   - Access theme state     │
│   - Toggle/set theme       │
│   - Get resolved theme     │
└────────────┬───────────────┘
             │
             ↓
┌────────────────────────────┐
│   [data-theme="..."]       │
│   - Attribute on <html>    │
│   - Triggers CSS overrides │
└────────────┬───────────────┘
             │
             ↓
┌────────────────────────────┐
│   CSS Variables Update     │
│   - Semantic colors change │
│   - Components re-render   │
└────────────────────────────┘
```

### Theme Types

1. **`'light'`** - Light mode
   - Bright backgrounds
   - Dark text
   - Lighter shadows

2. **`'dark'`** - Dark mode
   - Dark backgrounds
   - Light text
   - Darker, stronger shadows

3. **`'system'`** (default) - Follow OS preference
   - Detects `prefers-color-scheme`
   - Listens for system changes
   - Updates automatically

### Theme Implementation

**Provider Setup** (`app/layout.tsx`):
```typescript
import { ThemeProvider } from '@design-system/theme/ThemeProvider';

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**Usage in Components**:
```typescript
'use client';

import { useTheme } from '@design-system/theme/useTheme';

export function MyComponent() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current: {resolvedTheme}
    </button>
  );
}
```

### CSS Variable Strategy

```css
/* Light mode (default) */
:root {
  --color-text-primary: #212121;
  --color-background: #ffffff;
}

/* Dark mode overrides */
[data-theme="dark"] {
  --color-text-primary: #fafafa;
  --color-background: #121212;
}

/* Components use variables */
.component {
  color: var(--color-text-primary);
  background: var(--color-background);
  /* Automatically adapts to theme */
}
```

---

## 🧩 Component System

### Component Architecture Layers

```
┌─────────────────────────────────────┐
│   Application Layer                 │
│   (app/*/page.tsx)                  │
│   - Feature pages                   │
│   - Route handlers                  │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│   Feature Components                │
│   (app/*/components/)               │
│   - Feature-specific composition    │
│   - Business logic                  │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│   Design System Components          │
│   (design-system/components/)       │
│   - Reusable UI components          │
│   - Generic, composable             │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│   Design Tokens                     │
│   (design-system/tokens/)           │
│   - Atomic design values            │
└─────────────────────────────────────┘
```

### Component Categories

**15 Component Categories** covering 100+ production-ready components:

1. **Branding** - Logo, brand assets
2. **Buttons** - Button system (4 variants, 4 colors, 4 sizes)
3. **Cards** - Card layouts
4. **Chat** - Chat interface with messages, input, file attachments
5. **Dev** - Development tools (PersonasPanel)
6. **Editor** - Rich text editor with TipTap integration
7. **Exam** - Complete exam system (6 question types)
8. **Home** - Homepage components
9. **Icons** - Icon components and utilities
10. **Inputs** - Form inputs, text areas
11. **Layout** - Header, Sidebar, structural components
12. **Modals** - Dialog system with animations
13. **Onboarding** - User onboarding flows
14. **Quiz** - Quiz/trivia components
15. **Theme** - Theme toggle components
16. **Typography** - Heading, Text, Link components
17. **Uploads** - File upload with drag & drop

### Component Composition Patterns

**1. Standard Component:**
```typescript
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, children, ...props }, ref) => {
    return (
      <button ref={ref} className={styles[variant]} {...props}>
        {children}
      </button>
    );
  }
);
```

**2. Compound Component:**
```typescript
export const Card = ({ children }) => <div>{children}</div>;
Card.Header = ({ children }) => <div>{children}</div>;
Card.Body = ({ children }) => <div>{children}</div>;
Card.Footer = ({ children }) => <div>{children}</div>;
```

**3. Polymorphic Component:**
```typescript
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level, as, children, ...props }, ref) => {
    const Component = as || `h${level}`;
    return <Component ref={ref} {...props}>{children}</Component>;
  }
);
```

### Component State Management

- **Local State**: useState for component-specific state
- **Context**: React Context for shared state (Theme, Persona)
- **Props**: Controlled/uncontrolled patterns
- **Refs**: forwardRef for DOM access

---

## 📝 TypeScript Configuration

### tsconfig.json Highlights

```json
{
  "compilerOptions": {
    "strict": true,                    // Strict type checking
    "noEmit": true,                    // Next.js handles compilation
    "esModuleInterop": true,           // CommonJS interop
    "module": "esnext",                // ES modules
    "moduleResolution": "bundler",     // Modern resolution
    "jsx": "preserve",                 // Next.js transforms JSX
    "target": "ES2017",                // Compilation target
    
    // Path aliases
    "paths": {
      "@/*": ["./src/*"],
      "@design-system/*": ["./src/design-system/*"],
      "@components/*": ["./src/design-system/components/*"]
    }
  }
}
```

### Type Safety Strategy

1. **No `any` types** - Use `unknown` or specific types
2. **Explicit interfaces** - All component props defined
3. **Type exports** - Export types alongside components
4. **Generic types** - For flexible, reusable components
5. **Type guards** - Runtime type checking when needed

### Path Alias Usage

```typescript
// ✅ Use path aliases
import { Button } from '@components/buttons/Button';
import { useTheme } from '@design-system/theme/useTheme';
import { colors } from '@design-system/tokens/colors';
import { formatDate } from '@/lib/utils';

// ❌ Don't use relative paths
import { Button } from '../../../design-system/components/buttons/Button';
```

---

## 🎨 Styling Architecture

### CSS Modules Strategy

**Why CSS Modules:**
- ✅ Scoped styles (no global conflicts)
- ✅ Zero runtime cost
- ✅ Framework agnostic
- ✅ Type-safe class names
- ✅ Tree-shakeable

**File Naming:**
```
ComponentName.module.css
```

**Usage Pattern:**
```typescript
import styles from './Button.module.css';

export const Button = ({ variant }) => {
  return <button className={styles[variant]}>Click</button>;
};
```

### CSS Organization

Every CSS Module follows this structure:

```css
/* ===== BASE STYLES ===== */
.container {
  /* Layout properties */
  /* Spacing properties */
  /* Color properties */
  /* Typography properties */
  /* Border properties */
  /* Effect properties */
}

/* ===== VARIANTS ===== */
.primary { }
.secondary { }

/* ===== STATES ===== */
.container:hover { }
.container:focus-visible { }
.container:active { }
.container:disabled { }

/* ===== SIZES ===== */
.small { }
.medium { }
.large { }

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) { }
@media (max-width: 480px) { }

/* ===== ACCESSIBILITY ===== */
@media (prefers-reduced-motion: reduce) { }

/* ===== DARK MODE ===== */
[data-theme="dark"] .container { }
```

### Global Styles

**Location**: `src/app/globals.css`

**Contents**:
- CSS reset
- Base typography
- Global element styles
- Font imports
- Accessibility utilities

---

## ♿ Accessibility Architecture

### WCAG 2.1 AA Compliance

**Minimum Requirements:**
- ✅ Color contrast: 4.5:1 for text, 3:1 for UI
- ✅ Keyboard navigation: All interactive elements
- ✅ Screen reader support: Proper ARIA labels
- ✅ Focus indicators: Visible focus states
- ✅ Semantic HTML: Proper element usage

### Accessibility Patterns

**1. Semantic HTML:**
```tsx
// ✅ Good
<button onClick={handleClick}>Click</button>
<nav><a href="/home">Home</a></nav>

// ❌ Bad
<div onClick={handleClick}>Click</div>
<div className="nav">Home</div>
```

**2. ARIA Attributes:**
```tsx
<button
  aria-label="Close dialog"
  aria-pressed={isPressed}
  aria-expanded={isExpanded}
>
  <CloseIcon aria-hidden="true" />
</button>
```

**3. Keyboard Navigation:**
```tsx
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Custom button
</div>
```

**4. Focus Management:**
```css
.button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

---

## ⚡ Performance Strategy

### Code Splitting

```typescript
// Route-based splitting (automatic with App Router)
app/
  ├── page.tsx              // Home bundle
  ├── about/page.tsx        // About bundle
  └── dashboard/page.tsx    // Dashboard bundle

// Component-based splitting (manual with lazy)
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

### React Optimization

```typescript
// Memoization
export const ExpensiveComponent = memo(({ data }) => {
  return <div>{/* rendering */}</div>;
});

// Callback memoization
const handleClick = useCallback(() => {
  // logic
}, [dependencies]);

// Computed value memoization
const sortedData = useMemo(() => {
  return data.sort((a, b) => a - b);
}, [data]);
```

### Image Optimization

```typescript
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={500}
  height={300}
  loading="lazy"
  placeholder="blur"
/>
```

### Bundle Size Monitoring

- Keep components under 300 lines
- Split large components
- Use dynamic imports for heavy features
- Import specific functions, not entire libraries

---

## 🏗️ Build & Deployment

### Development

```bash
npm run dev              # Start dev server (port 3000)
npm run lint             # Check code quality
npm run type-check       # Verify TypeScript
```

### Production

```bash
npm run build            # Create production build
npm start                # Run production server
```

### Build Output

```
.next/
  ├── static/            # Static assets
  ├── server/            # Server-side code
  └── cache/             # Build cache
```

### Deployment Platforms

**Recommended: Vercel**
- Zero configuration
- Automatic deployments
- Edge network
- Analytics

**Also supports:**
- Netlify
- AWS Amplify
- Railway
- Cloudflare Pages
- Docker (self-hosted)

### Environment Variables

```bash
# .env.local (development)
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Production (set in hosting platform)
NEXT_PUBLIC_API_URL=https://api.studocu.com
NEXT_PUBLIC_SITE_URL=https://studocu.com
```

---

## 📊 Dependency Management

### Core Dependencies

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@tiptap/react": "^3.9.1",
    "@tiptap/starter-kit": "^3.9.1",
    "@fortawesome/fontawesome-free": "^6.5.1",
    "classnames": "^2.5.1"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "@types/react": "^18.2.46",
    "@types/node": "^20.10.6",
    "eslint": "^8.56.0",
    "eslint-config-next": "^15.0.0"
  }
}
```

### Update Strategy

- **Major versions**: Review changelog, test thoroughly
- **Minor versions**: Review breaking changes, test
- **Patch versions**: Safe to update regularly
- **Security updates**: Apply immediately

---

## 🔒 Security

### Security Measures

1. **No sensitive data in client code**
2. **Environment variables for secrets**
3. **HTTPS only in production**
4. **CSP headers configured**
5. **Dependencies regularly updated**
6. **No `dangerouslySetInnerHTML` without sanitization**

### Security Headers (vercel.json)

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

---

## 📈 Monitoring & Analytics

### Performance Monitoring

- Next.js built-in analytics
- Web Vitals tracking
- Custom performance marks
- Bundle size tracking

### Error Tracking

- Error boundaries for graceful degradation
- Console error monitoring
- Production error logging (optional integration)

---

## 🧪 Testing Strategy

### Testing Approach

1. **User-focused**: Test from user's perspective
2. **Behavior-driven**: Test what components do, not how
3. **Accessibility**: Test keyboard and screen reader
4. **Visual**: Manual testing in multiple browsers
5. **Responsive**: Test all breakpoints

### What to Test

```typescript
// ✅ Test user interactions
test('submits form on button click', () => {
  // Test implementation
});

// ✅ Test accessibility
test('has proper ARIA labels', () => {
  // Test implementation
});

// ❌ Don't test implementation details
test('has correct class name', () => {
  // Too brittle
});
```

---

## 📚 Documentation Strategy

### Documentation Hierarchy

1. **README.md** - Project overview, quick start
2. **SYSTEM_ARCHITECTURE.md** - This file (technical architecture)
3. **.cursorrules** - Comprehensive coding guidelines
4. **docs/GETTING-STARTED.md** - Setup walkthrough
5. **docs/COMPONENT-TEMPLATE.md** - Component creation guide
6. **Component READMEs** - Individual component docs
7. **JSDoc comments** - In-code documentation

### Documentation Standards

- Every component has JSDoc
- Every complex function has comments
- Every category has README
- Examples for all public APIs

---

## 🎓 Learning Path

### For New Developers

1. Read README.md
2. Follow GETTING-STARTED.md
3. Study COMPONENT-TEMPLATE.md
4. Read .cursorrules
5. Examine existing components
6. Build first component

### For Experienced Developers

1. Skim README.md
2. Read SYSTEM_ARCHITECTURE.md (this file)
3. Review .cursorrules
4. Check design-system/tokens/
5. Start building

---

## 🔄 Maintenance & Updates

### Regular Maintenance

**Weekly:**
- Review open issues
- Update dependencies (patch versions)
- Check security advisories

**Monthly:**
- Update dependencies (minor versions)
- Review and update documentation
- Audit bundle size
- Check accessibility compliance

**Quarterly:**
- Major dependency updates
- Architecture review
- Performance audit
- Design system sync with Figma

---

## 🎯 Best Practices Summary

### Architecture Principles

1. **Single Responsibility**: Components do one thing well
2. **Composition**: Build complex UIs from simple components
3. **Reusability**: Design for reuse across features
4. **Consistency**: Follow established patterns
5. **Type Safety**: Leverage TypeScript fully
6. **Accessibility**: Built-in, not bolted-on
7. **Performance**: Fast by default
8. **Documentation**: Self-documenting code

### Code Quality

- ✅ TypeScript strict mode
- ✅ ESLint with no warnings
- ✅ Design tokens only (no hardcoded values)
- ✅ Semantic HTML
- ✅ WCAG 2.1 AA compliance
- ✅ Responsive design
- ✅ Dark mode support
- ✅ JSDoc comments

---

## 🚀 Future Enhancements

### Planned Improvements

- [ ] Component test suite (Jest + Testing Library)
- [ ] Storybook integration
- [ ] Visual regression testing
- [ ] Performance monitoring dashboard
- [ ] Automated accessibility testing
- [ ] Figma plugin for token sync
- [ ] CLI tool for component scaffolding
- [ ] Additional component variants
- [ ] Advanced animation system
- [ ] Internationalization support

---

## 📞 Support & Resources

### Getting Help

1. **Documentation** - Check docs/ folder
2. **Examples** - Study existing components
3. **Cursor Rules** - Review .cursorrules
4. **Team Lead** - Ask for clarification
5. **GitHub Issues** - Report bugs or request features

### External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## ✅ Conclusion

This architecture provides a solid foundation for building scalable, accessible, and maintainable AI features for Studocu. The system is designed to grow with your needs while maintaining consistency and quality.

**Key Takeaways:**
- Follow the 4-file component structure
- Always use design tokens
- Maintain WCAG 2.1 AA accessibility
- Leverage TypeScript's type system
- Test in multiple browsers and themes
- Document as you build

**Remember**: Consistency is more important than personal preference. Follow these architectural patterns even if you would approach something differently.

---

**Last Updated**: January 2026  
**Version**: 2.0.0  
**Maintained by**: Studocu AI Team

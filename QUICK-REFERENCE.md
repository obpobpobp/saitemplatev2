# 🚀 Quick Reference Guide

**Essential commands and patterns for working with this template.**

---

## 📦 Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Build for production
npm start                # Run production build
npm run lint             # Check code quality
npm run type-check       # Verify TypeScript

# Useful
npx kill-port 3000       # Kill process on port 3000
rm -rf .next node_modules  # Clean build
npm install              # Reinstall dependencies
```

---

## 🎨 Design Tokens

**Location:** `src/design-system/tokens/`

### Colors
```typescript
// Define in tokens/colors.ts
export const colors = {
  primary: '#007AFF',
  // ...
};

// Use in CSS
.button {
  background: var(--color-primary);
}
```

### Spacing
```css
/* Available spacing tokens */
var(--spacing-xs)    /* 4px */
var(--spacing-sm)    /* 8px */
var(--spacing-md)    /* 16px */
var(--spacing-lg)    /* 24px */
var(--spacing-xl)    /* 32px */
var(--spacing-2xl)   /* 48px */
var(--spacing-3xl)   /* 64px */
var(--spacing-4xl)   /* 96px */
```

### Typography
```css
/* Font sizes */
var(--font-size-xs)   /* 12px */
var(--font-size-sm)   /* 14px */
var(--font-size-md)   /* 16px */
var(--font-size-lg)   /* 18px */
var(--font-size-xl)   /* 20px */
var(--font-size-2xl)  /* 24px */
var(--font-size-3xl)  /* 30px */
var(--font-size-4xl)  /* 36px */

/* Font weights */
var(--font-weight-normal)    /* 400 */
var(--font-weight-medium)    /* 500 */
var(--font-weight-semibold)  /* 600 */
var(--font-weight-bold)      /* 700 */
```

---

## 🏗️ Component Structure

### Standard Pattern
```
ComponentName/
├── ComponentName.tsx         # Component logic
├── ComponentName.module.css  # Styles
├── ComponentName.types.ts    # TypeScript types
└── index.ts                  # Exports
```

### Example Component

**Button.types.ts**
```typescript
export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
}
```

**Button.tsx**
```typescript
import styles from './Button.module.css';
import { ButtonProps } from './Button.types';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
}) => {
  return (
    <button 
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

**Button.module.css**
```css
.button {
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-md);
  transition: all 0.2s ease;
}

.primary {
  background: var(--color-primary);
  color: var(--color-white);
}

.secondary {
  background: var(--color-secondary);
  color: var(--color-white);
}

.small {
  padding: var(--spacing-sm);
}

.large {
  padding: var(--spacing-lg);
}
```

**index.ts**
```typescript
export { Button } from './Button';
export type { ButtonProps } from './Button.types';
```

---

## 📁 Import Patterns

```typescript
// Absolute imports (configured in tsconfig.json)
import { Button } from '@/design-system/components/buttons/Button';
import { colors } from '@/design-system/tokens/colors';

// Component imports
import { Button } from '@components/buttons/Button';

// Barrel exports
import { Button, Icon } from '@components/buttons';
```

---

## 🎭 Theme Usage

```typescript
'use client';

import { useTheme } from '@/design-system/theme/useTheme';

export function MyComponent() {
  const { theme, setTheme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

---

## 🎨 Styling Best Practices

### ✅ Do
```css
.container {
  /* Use tokens */
  padding: var(--spacing-md);
  color: var(--color-text-primary);
  
  /* Responsive */
  @media (max-width: 768px) {
    padding: var(--spacing-sm);
  }
}
```

### ❌ Don't
```css
.container {
  /* Hard-coded values */
  padding: 16px;
  color: #333333;
}
```

---

## 🔧 Common Patterns

### Page with Layout
```typescript
import { Header } from '@/design-system/components/layout/Header';
import { Sidebar } from '@/design-system/components/layout/Sidebar';
import styles from './page.module.css';

export default function Page() {
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.content}>
        <Sidebar />
        <main className={styles.main}>
          {/* Your content */}
        </main>
      </div>
    </div>
  );
}
```

### Form Handling
```typescript
'use client';

import { useState } from 'react';
import { Button } from '@/design-system/components/buttons/Button';

export function Form() {
  const [value, setValue] = useState('');
  
  const handleSubmit = () => {
    console.log('Submitted:', value);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

---

## 📱 Responsive Design

### Breakpoints
```typescript
// Available in tokens/breakpoints.ts
export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1440px',
};
```

### Usage
```css
.container {
  padding: var(--spacing-lg);
}

@media (max-width: 768px) {
  .container {
    padding: var(--spacing-md);
  }
}

@media (max-width: 480px) {
  .container {
    padding: var(--spacing-sm);
  }
}
```

---

## 🎯 Accessibility

### Interactive Elements
```tsx
// Use semantic HTML
<button onClick={handleClick}>Click me</button>

// Add ARIA labels when needed
<button aria-label="Close dialog" onClick={onClose}>
  <CloseIcon />
</button>

// Support keyboard navigation
<div 
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  Custom button
</div>
```

### Focus States
```css
.button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Environment Variables
```bash
# .env.local (local development)
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Vercel Dashboard (production)
# Add in Project Settings → Environment Variables
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
npx kill-port 3000
# Or use different port
npm run dev -- -p 3001
```

### Module Not Found
```bash
rm -rf node_modules .next
npm install
```

### TypeScript Errors
```bash
npm run type-check
```

### Build Fails
```bash
npm run build
# Check the error message
# Common causes:
# - TypeScript errors
# - ESLint errors
# - Missing dependencies
```

---

## 📚 Useful Resources

- **Next.js Docs**: https://nextjs.org/docs
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **CSS Modules**: https://github.com/css-modules/css-modules
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/

---

## 💡 Tips & Tricks

1. **Use TypeScript autocomplete** - Press `Ctrl+Space` for suggestions
2. **Hot reload** - Changes appear instantly without refresh
3. **Component imports** - Use absolute paths for cleaner imports
4. **Design tokens** - Always use tokens, never hard-code values
5. **Mobile first** - Design for mobile, enhance for desktop
6. **Accessibility** - Test with keyboard and screen reader

---

## 🎨 Component Showcase

Visit these demo pages to see components in action:

```
http://localhost:3000/buttons        # Button system
http://localhost:3000/typography     # Typography
http://localhost:3000/layout-demo    # Header & Sidebar
http://localhost:3000/chat-demo      # Chat interface
http://localhost:3000/editor-demo    # Rich text editor
http://localhost:3000/exam-demo      # Exam system
```

---

**Need more help?** Check the [full documentation](docs/) or [open an issue](https://github.com/YOUR_USERNAME/design-system-template/issues).

# Getting Started with StudocuAI Design System Template

## First Time Setup

### 1. Install Dependencies
```bash
npm install
```

This will install all required packages including:
- Next.js 15.5
- React 19.2
- TypeScript 5.9
- ESLint

### 2. Start Development Server
```bash
npm run dev
```

Your app will be running at [http://localhost:3000](http://localhost:3000)

### 3. Explore the Structure

Open the project in your code editor and familiarize yourself with:

```
src/
├── design-system/           # Your design system lives here
│   ├── tokens/             # Design tokens from Figma
│   ├── theme/              # Theme configuration
│   └── components/         # Reusable components
├── app/                    # Your pages and layouts
│   ├── layout.tsx         # Root layout (wraps all pages)
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles and CSS variables
```

## Your First Component

Let's create a simple Card component to understand the workflow.

### Step 1: Create the Folder
```bash
mkdir -p src/design-system/components/layout/Card
```

### Step 2: Create Type Definitions
Create `src/design-system/components/layout/Card/Card.types.ts`:

```typescript
export interface CardProps {
  title: string;
  children: React.ReactNode;
  variant?: 'default' | 'elevated';
}
```

### Step 3: Create the Component
Create `src/design-system/components/layout/Card/Card.tsx`:

```typescript
import styles from './Card.module.css';
import { CardProps } from './Card.types';

export function Card({ title, children, variant = 'default' }: CardProps) {
  return (
    <div className={styles[variant]}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
```

### Step 4: Create Styles
Create `src/design-system/components/layout/Card/Card.module.css`:

```css
.default {
  padding: var(--spacing-md);
  border: 1px solid #e0e0e0;
  border-radius: var(--border-radius-md);
}

.elevated {
  padding: var(--spacing-md);
  background: white;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
}

.title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
}

.content {
  color: var(--color-text-secondary);
}
```

### Step 5: Create Barrel Export
Create `src/design-system/components/layout/Card/index.ts`:

```typescript
export { Card } from './Card';
export type { CardProps } from './Card.types';
```

### Step 6: Use Your Component
Update `src/app/page.tsx`:

```typescript
import { Card } from '@components/layout/Card';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>My Design System</h1>
      
      <Card title="Welcome" variant="elevated">
        <p>This is your first component!</p>
      </Card>
      
      <Card title="Getting Started" variant="default">
        <p>Check out the docs to learn more.</p>
      </Card>
    </main>
  );
}
```

### Step 7: See It Live
Save all files and check your browser. You should see your new Card components rendered on the page!

## Next Steps

1. **Explore Design Tokens**: Check `src/design-system/tokens/tokens.json` to see all available design tokens
2. **Read Component Template**: Study `docs/COMPONENT-TEMPLATE.md` for detailed component patterns
3. **Build More Components**: Create buttons, inputs, and other UI elements
4. **Create Pages**: Add new pages in `src/app/` to build your prototype

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Run production build

# Code Quality
npm run lint             # Check for code issues
npm run type-check       # Verify TypeScript types

# Cleaning
rm -rf .next             # Clear Next.js cache
rm -rf node_modules      # Remove dependencies
npm install              # Reinstall dependencies
```

## Tips for Success

1. **Always use design tokens** - Never hardcode colors, spacing, or typography
2. **Follow the 4-file pattern** - Every component needs .tsx, .module.css, .types.ts, and index.ts
3. **Test in browser** - Use React DevTools and browser DevTools to inspect components
4. **Keep components small** - Each component should do one thing well
5. **Document as you go** - Add JSDoc comments to help your team understand your code

## Getting Help

- **README.md** - Comprehensive project documentation
- **COMPONENT-TEMPLATE.md** - Detailed component structure guide
- **.cursorrules** - Complete coding standards and best practices

## Troubleshooting

### Port 3000 is already in use
```bash
npx kill-port 3000
# or use a different port
npm run dev -- -p 3001
```

### Changes not showing up
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Check for TypeScript errors in terminal
- Make sure you saved all files

### Import errors
- Verify the file path is correct
- Check that index.ts exports the component
- Ensure TypeScript paths in tsconfig.json are correct

---

**Ready to build?** Start by creating your first component and see it come to life! 🚀










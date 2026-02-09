# Component Template Guide

This document describes the standard structure for all components in the StudocuAI Design System.

## 📋 Standard Component Structure

Every component MUST follow this 4-file pattern:

```
ComponentName/
├── ComponentName.tsx        # React component implementation
├── ComponentName.module.css # Component-specific styles
├── ComponentName.types.ts   # TypeScript interfaces and types
└── index.ts                 # Barrel export
```

## 📝 File-by-File Breakdown

### 1. ComponentName.types.ts

Define all TypeScript interfaces and types for the component.

```typescript
/**
 * Props for the ComponentName component
 */
export interface ComponentNameProps {
  /**
   * Brief description of this prop
   */
  propName: string;
  
  /**
   * Optional prop with default value
   */
  optionalProp?: boolean;
  
  /**
   * Union type for variants
   */
  variant?: 'primary' | 'secondary' | 'tertiary';
  
  /**
   * Callback function
   */
  onClick?: () => void;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}
```

**Rules:**
- Use `interface` for component props
- Add JSDoc comments for all props
- Mark optional props with `?`
- Use union types for variants
- Export all public types

### 2. ComponentName.tsx

The React component implementation.

```typescript
import styles from './ComponentName.module.css';
import { ComponentNameProps } from './ComponentName.types';

/**
 * ComponentName - Brief description of what this component does
 * 
 * @example
 * ```tsx
 * <ComponentName propName="value" variant="primary">
 *   Content here
 * </ComponentName>
 * ```
 */
export function ComponentName({
  propName,
  optionalProp = false,
  variant = 'primary',
  onClick,
  children,
}: ComponentNameProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{propName}</h2>
      <div className={styles[variant]}>
        {children}
      </div>
      <button 
        className={styles.button}
        onClick={onClick}
        aria-label="Descriptive label"
      >
        Action
      </button>
    </div>
  );
}
```

**Rules:**
- Name components with PascalCase
- Add JSDoc with description and example
- Destructure props in function parameters
- Provide default values for optional props
- Use explicit return types if complex
- Follow accessibility standards
- Keep components focused and single-purpose

### 3. ComponentName.module.css

Component-specific styles using CSS Modules.

```css
/**
 * Container for the component
 */
.container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background-color: var(--color-surface-primary);
  border-radius: var(--border-radius-md);
}

/**
 * Heading styles
 */
.heading {
  font-size: var(--font-size-2xl);
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
}

/**
 * Primary variant
 */
.primary {
  background-color: var(--color-primary);
  color: white;
}

/**
 * Secondary variant
 */
.secondary {
  background-color: var(--color-secondary);
  color: white;
}

/**
 * Button styles
 */
.button {
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-primary);
  color: white;
  font-size: var(--font-size-md);
  cursor: pointer;
  transition: all 0.2s ease;
}

.button:hover {
  background-color: var(--color-primary-hover);
  transform: translateY(-2px);
}

.button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.button:active {
  transform: translateY(0);
}

/**
 * Responsive adjustments
 */
@media (max-width: 768px) {
  .container {
    padding: var(--spacing-md);
  }
  
  .heading {
    font-size: var(--font-size-xl);
  }
}
```

**Rules:**
- ALWAYS use design token CSS variables (`var(--token-name)`)
- NEVER hardcode colors, spacing, or typography values
- Use semantic class names (`.container`, `.heading`, not `.blue`, `.mb-4`)
- Add hover, focus, and active states for interactive elements
- Include responsive styles with media queries
- Keep selectors flat (avoid deep nesting)
- Add comments for complex styles

### 4. index.ts

Barrel export file for clean imports.

```typescript
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName.types';
```

**Rules:**
- Export the component as a named export
- Export all public types
- Keep it simple - just exports, no logic

## 🎯 Complete Example: PrimaryButton

Here's a complete example of a button component following all standards:

### PrimaryButton.types.ts
```typescript
export interface PrimaryButtonProps {
  /**
   * Button text or content
   */
  children: React.ReactNode;
  
  /**
   * Size variant of the button
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Whether the button is disabled
   * @default false
   */
  isDisabled?: boolean;
  
  /**
   * Whether the button should take full width
   * @default false
   */
  isFullWidth?: boolean;
  
  /**
   * Click handler
   */
  onClick: () => void;
  
  /**
   * Optional icon to display before text
   */
  icon?: React.ReactNode;
  
  /**
   * Loading state
   * @default false
   */
  isLoading?: boolean;
}
```

### PrimaryButton.tsx
```typescript
import styles from './PrimaryButton.module.css';
import { PrimaryButtonProps } from './PrimaryButton.types';

/**
 * PrimaryButton - Main action button for important user interactions
 * 
 * Use this button for the primary action on a page or section.
 * It should be visually prominent and there should typically be
 * only one primary button visible at a time.
 * 
 * @example
 * ```tsx
 * <PrimaryButton onClick={handleSubmit} size="large">
 *   Submit Form
 * </PrimaryButton>
 * ```
 */
export function PrimaryButton({
  children,
  size = 'medium',
  isDisabled = false,
  isFullWidth = false,
  onClick,
  icon,
  isLoading = false,
}: PrimaryButtonProps) {
  const classNames = [
    styles.button,
    styles[size],
    isFullWidth && styles.fullWidth,
    isLoading && styles.loading,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classNames}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      aria-busy={isLoading}
      type="button"
    >
      {isLoading && <span className={styles.spinner} aria-hidden="true" />}
      {!isLoading && icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{children}</span>
    </button>
  );
}
```

### PrimaryButton.module.css
```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  font-family: inherit;
  font-weight: 600;
  line-height: 1;
  border: none;
  border-radius: var(--border-radius-md);
  background-color: var(--color-primary);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.button:hover:not(:disabled) {
  background-color: var(--color-primary-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.button:active:not(:disabled) {
  transform: translateY(0);
}

.button:disabled {
  background-color: var(--color-disabled);
  color: var(--color-text-disabled);
  cursor: not-allowed;
  opacity: 0.6;
}

/* Size variants */
.small {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-sm);
}

.medium {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-md);
}

.large {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-lg);
}

/* Full width variant */
.fullWidth {
  width: 100%;
}

/* Loading state */
.loading {
  position: relative;
  pointer-events: none;
}

.spinner {
  width: 1em;
  height: 1em;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.label {
  display: inline-block;
}
```

### index.ts
```typescript
export { PrimaryButton } from './PrimaryButton';
export type { PrimaryButtonProps } from './PrimaryButton.types';
```

## ✅ Checklist for New Components

Before considering a component complete, verify:

- [ ] All 4 files are created and properly named
- [ ] TypeScript interfaces are defined with JSDoc comments
- [ ] Component has JSDoc with description and example
- [ ] All props have default values where appropriate
- [ ] Styles use design tokens exclusively (no hardcoded values)
- [ ] Component is accessible (keyboard navigation, ARIA labels)
- [ ] Responsive styles are included
- [ ] Hover, focus, and active states are defined
- [ ] Component is exported from index.ts
- [ ] TypeScript compiles without errors
- [ ] No ESLint warnings

## 🚫 Common Mistakes to Avoid

1. **Hardcoding values**: Always use design tokens
   ```css
   /* ❌ Bad */
   .button {
     padding: 16px;
     color: #0066cc;
   }
   
   /* ✅ Good */
   .button {
     padding: var(--spacing-md);
     color: var(--color-primary);
   }
   ```

2. **Using `any` type**: Be explicit with types
   ```typescript
   /* ❌ Bad */
   const handleClick = (data: any) => { }
   
   /* ✅ Good */
   const handleClick = (data: UserData) => { }
   ```

3. **Missing accessibility**: Always consider keyboard and screen readers
   ```tsx
   /* ❌ Bad */
   <div onClick={handleClick}>Click me</div>
   
   /* ✅ Good */
   <button onClick={handleClick} aria-label="Submit form">
     Click me
   </button>
   ```

4. **Non-semantic class names**: Use descriptive names
   ```css
   /* ❌ Bad */
   .blue { color: blue; }
   .mb4 { margin-bottom: 16px; }
   
   /* ✅ Good */
   .primaryAction { color: var(--color-primary); }
   .cardFooter { margin-bottom: var(--spacing-md); }
   ```

## 📚 Additional Resources

- See `.cursorrules` for complete coding standards
- Check `src/design-system/tokens/` for available design tokens
- Review existing components for reference implementations
- Refer to README.md for project structure and workflows

---

**Questions?** Check the main README.md or consult with your team lead.










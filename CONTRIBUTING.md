# Contributing to StudocuAI Design System Template

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other contributors

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone [your-fork-url]`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature-name`

## Development Workflow

### 1. Before You Start

- Check existing issues to avoid duplicate work
- Open an issue to discuss major changes
- Follow the component structure defined in `docs/COMPONENT-TEMPLATE.md`

### 2. Writing Code

- Follow `.cursorrules` coding standards
- Use TypeScript strict mode
- Write semantic, accessible HTML
- Use design tokens for all styling
- Add JSDoc comments for public APIs

### 3. Component Standards

Every component must:
- Follow the 4-file structure (`.tsx`, `.module.css`, `.types.ts`, `index.ts`)
- Use PascalCase naming
- Include TypeScript types
- Be accessible (WCAG 2.1 AA)
- Be responsive
- Include hover, focus, and active states

### 4. Testing Your Changes

```bash
# Type check
npm run type-check

# Lint
npm run lint

# Build
npm run build

# Test locally
npm run dev
```

### 5. Commit Messages

Use conventional commits:

```
feat: add new Button component
fix: correct spacing in Card component
docs: update README with new examples
style: format code according to Prettier
refactor: simplify prop handling in Input
test: add tests for Checkbox component
chore: update dependencies
```

### 6. Pull Requests

**Before submitting:**
- [ ] Code follows project standards
- [ ] TypeScript compiles without errors
- [ ] No ESLint warnings
- [ ] Components use design tokens
- [ ] Accessibility standards met
- [ ] Documentation updated
- [ ] Self-review completed

**PR Description should include:**
- What changes were made
- Why the changes were necessary
- Screenshots (for UI changes)
- Testing steps
- Related issues

**PR Template:**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Screenshots
(if applicable)

## Testing Steps
1. Step one
2. Step two
3. Expected result

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Changes are responsive
- [ ] Accessibility verified
```

## Coding Standards

### TypeScript
```typescript
// ✅ Good
interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
}

// ❌ Bad
interface ButtonProps {
  variant: any;
  onClick: Function;
  children: any;
}
```

### CSS Modules
```css
/* ✅ Good */
.container {
  padding: var(--spacing-md);
  background-color: var(--color-surface-primary);
}

/* ❌ Bad */
.container {
  padding: 16px;
  background-color: #ffffff;
}
```

### Accessibility
```tsx
// ✅ Good
<button 
  onClick={handleClick}
  aria-label="Close dialog"
>
  <CloseIcon />
</button>

// ❌ Bad
<div onClick={handleClick}>
  <CloseIcon />
</div>
```

## Component Naming

- **Components**: `PascalCase` (e.g., `PrimaryButton`, `UserProfile`)
- **Files**: Match component name (e.g., `PrimaryButton.tsx`)
- **CSS Classes**: `camelCase` (e.g., `.primaryButton`, `.userProfile`)
- **Props**: `camelCase` (e.g., `isDisabled`, `onClick`)

## File Organization

```
src/design-system/components/[category]/ComponentName/
├── ComponentName.tsx
├── ComponentName.module.css
├── ComponentName.types.ts
└── index.ts
```

## Documentation

Update documentation when you:
- Add new components
- Change existing APIs
- Add new features
- Fix bugs that affect usage

## Review Process

1. Submit PR
2. Automated checks run (TypeScript, ESLint)
3. Code review by maintainers
4. Address feedback
5. Approval and merge

## Questions?

- Open an issue for bugs
- Start a discussion for feature ideas
- Check existing documentation
- Ask in project discussions

## Recognition

Contributors will be recognized in:
- Project README
- Release notes
- Contributor list

Thank you for contributing! 🎉










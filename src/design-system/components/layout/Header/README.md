# Header Component System

Complete header component system with 100% fidelity to Figma designs.

## Overview

The Header component system includes:
- **Header**: Main header component with 5 variants
- **LogoBox**: Logo container with background
- **HeaderTitle**: Project/page title with optional dropdown
- **HeaderBreadcrumb**: Navigation breadcrumb with folder icon
- **HeaderActions**: Privacy, Share, and Sign In buttons
- **AvatarControl**: Single user avatar with dropdown
- **AvatarSet**: Multiple collaborator avatars

## Variants

### 1. Home Variant
Simple header for home page with logo and avatar.

```tsx
<Header
  variant="home"
  logo={<Logo variant="icon" height={16} />}
  title="Studocu AI"
  avatarUrl="/avatar.jpg"
  onAvatarClick={handleAvatarClick}
/>
```

### 2. Project Variant
Full header for project pages with all features.

```tsx
<Header 
  variant="project"
  logo={<Logo variant="icon" height={16} />}
  title="Untitled Project"
  hasTitleDropdown
  onTitleDropdownClick={handleTitleDropdown}
  breadcrumbLabel="Pharmacology"
  onBreadcrumbClick={handleBreadcrumb}
  privacy="public"
  onPrivacyClick={handlePrivacy}
  onShareClick={handleShare}
  avatarUrl="/avatar.jpg"
  onAvatarClick={handleAvatar}
/>
```

### 3. Shared Variant
Header for shared projects with multiple collaborator avatars.

```tsx
<Header
  variant="shared"
  logo={<Logo size="small" variant="icon" />}
  title="Untitled Project"
  hasTitleDropdown
  breadcrumbLabel="Pharmacology"
  privacy="public"
  onPrivacyClick={handlePrivacy}
  onShareClick={handleShare}
  collaborators={[
    { name: 'Maya Thompson', initials: 'MT', avatarUrl: '/avatar1.jpg' },
    { name: 'John Doe', initials: 'JD', bgColor: '#d8bdff' },
    // ... more collaborators
  ]}
  onCollaboratorsClick={handleCollaborators}
/>
```

### 4. Guest Variant
Header for guest users with Sign In button.

```tsx
<Header
  variant="guest"
  logo={<Logo size="small" variant="icon" />}
  title="Untitled Project"
  hasTitleDropdown
  breadcrumbLabel="Pharmacology"
  privacy="public"
  onPrivacyClick={handlePrivacy}
  onShareClick={handleShare}
  onSignInClick={handleSignIn}
/>
```

### 5. Home Guest Variant
Simple header for guest users on home page.

```tsx
<Header
  variant="home-guest"
  logo={<Logo size="small" variant="icon" />}
  title="Studocu AI"
  onSignInClick={handleSignIn}
/>
```

## Sub-Components

### LogoBox
Container for logo with gray background - matches Figma specifications exactly.

```tsx
<LogoBox>
  <Logo variant="icon" height={16} />
</LogoBox>
```

**Props:**
- `children`: ReactNode - Logo content
- `className?`: string - Additional CSS class

**Styling (Figma Spec):**
- Container Size: 24x24px
- Background: `var(--color-surface-secondary)` (#f6f7fb)
- Border Radius: `var(--border-radius-xs)` (5px)
- Logo Size: 16x16px (centered)
- Display: flex, centered with justify-content and align-items

**Figma Node:** Frame 1000004674 (Node: 13966:129112)

### HeaderTitle
Project/page title with optional dropdown button.

```tsx
<HeaderTitle
  title="Untitled Project"
  hasDropdown
  onDropdownClick={handleDropdown}
/>
```

**Props:**
- `title`: string - Title text
- `hasDropdown?`: boolean - Show dropdown button (default: false)
- `onDropdownClick?`: () => void - Dropdown click handler
- `className?`: string - Additional CSS class

**Styling:**
- Font: DM Sans Bold, 16px, 700 weight
- Line height: 24px
- Color: `var(--color-text)`
- Icon: chevron-down, 12.8px

### HeaderBreadcrumb
Navigation breadcrumb with folder icon.

```tsx
<HeaderBreadcrumb
  label="Pharmacology"
  onClick={handleBreadcrumb}
/>
```

**Props:**
- `label`: string - Breadcrumb text
- `onClick?`: () => void - Click handler
- `className?`: string - Additional CSS class

**Styling:**
- Icon: folder, 9.6px
- Font: DM Sans Bold, 14px, 700 weight
- Color: `var(--color-text-subtle)`
- Gap: 4px

### HeaderActions
Action buttons (Privacy, Share, Sign In).

```tsx
<HeaderActions
  privacy="public"
  onPrivacyClick={handlePrivacy}
  onShareClick={handleShare}
/>
```

**Props:**
- `privacy?`: 'public' | 'private' - Current privacy setting (default: 'public')
- `onPrivacyClick?`: () => void - Privacy button handler
- `onShareClick?`: () => void - Share button handler
- `showSignIn?`: boolean - Show sign in button (default: false)
- `onSignInClick?`: () => void - Sign in handler
- `className?`: string - Additional CSS class

**Styling:**
- Height: 32px
- Padding: 8px 16px
- Border radius: 100px
- Font: DM Sans Medium, 14px, 500 weight
- Icons: globe (16px), share (16px)
- Gap between buttons: 8px

### AvatarControl
Single user avatar with dropdown and optional collab count.

```tsx
<AvatarControl
  avatarUrl="/avatar.jpg"
  initials="MT"
  collabCount={6}
  onClick={handleAvatar}
/>
```

**Props:**
- `avatarUrl?`: string - Avatar image URL
- `initials?`: string - User initials (shown if no image)
- `hasDropdown?`: boolean - Show chevron (default: true)
- `collabCount?`: number - Collaborator count
- `onClick?`: () => void - Click handler
- `className?`: string - Additional CSS class

**Styling:**
- Height: 32px
- Padding: 2px 8px 2px 2px
- Border: 1px solid `var(--color-border)`
- Border radius: 32px 20px 20px 32px
- Avatar size: 28x28px
- Initials font: Lazzer Heavy, 10px, 900 weight

### AvatarSet
Multiple collaborator avatars with overflow control.

```tsx
<AvatarSet
  avatars={[
    { name: 'Maya Thompson', initials: 'MT', avatarUrl: '/avatar1.jpg' },
    { name: 'John Doe', initials: 'JD', bgColor: '#d8bdff' },
    // ... more avatars
  ]}
  maxDisplay={4}
  onOverflowClick={handleOverflow}
/>
```

**Props:**
- `avatars`: AvatarData[] - Array of avatar data
- `maxDisplay?`: number - Max avatars before overflow (default: 4)
- `onOverflowClick?`: () => void - Overflow control handler
- `className?`: string - Additional CSS class

**AvatarData Interface:**
- `avatarUrl?`: string - Avatar image URL
- `initials?`: string - User initials
- `name`: string - User name (for tooltip)
- `bgColor?`: string - Background color for initials

**Styling:**
- Avatar size: 28x28px
- Overlap: -4px margin-right
- Border: 2px solid white
- Overflow control: Same styling as AvatarControl

## Design Specifications

### Dimensions
- Header height: 60px
- Header padding: 12px 20px
- Border radius: 20px
- Logo box: 24x24px (logo 16x16px)
- Avatar: 28x28px
- Button height: 32px

### Spacing
- Logo to title: 8px
- Title group to breadcrumb: 16px
- Actions gap: 8px
- Actions to avatar: 12px

### Typography
- Title: DM Sans Bold, 16px, line-height 24px
- Breadcrumb: DM Sans Bold, 14px, line-height 20px
- Buttons: DM Sans Medium, 14px, line-height 20px
- Icons: 12.8px (some 9.6px)

### Colors
- Background: `var(--color-surface-primary)` (#ffffff)
- Logo box bg: `var(--color-surface-secondary)` (#f6f7fb)
- Text: `var(--color-text)` (#2f3e4e)
- Text subtle: `var(--color-text-subtle)` (#4c5966)
- Border: `var(--color-border)` (#d3d9e0)

## Responsive Behavior

### Desktop (> 1024px)
- Full header with all features
- Height: 60px

### Tablet (768px - 1024px)
- Height: 56px
- Border radius: 16px

### Mobile (< 768px)
- Height: 48px
- Padding: 8px 16px
- Border radius: 0 (full width)
- Border bottom: 1px solid border

## Accessibility

- Semantic HTML (header, button)
- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus states on all interactive elements
- Screen reader friendly
- Reduced motion support

## Font Awesome Icons

The component uses Font Awesome 6 Pro icons:
- chevron-down: `\f078`
- folder: `\f07b`
- globe: `\f0ac`
- share: `\f1e0`

Make sure Font Awesome 6 Pro is loaded in your application.

## Demo

See the component in action at `/header-demo` route with all 5 variants showcased.


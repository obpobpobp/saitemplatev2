# Modal Components

Complete modal and panel system for desktop and mobile interfaces.

## 📦 Components to Implement

### 1. Modal (Base Component)
**Status:** ✅ Partial - TypeScript types and component structure created
**Location:** `src/design-system/components/modals/Modal/`

Base modal component with:
- Portal rendering to body
- Backdrop with click-to-close
- Escape key handling
- Body scroll lock
- Focus trapping
- Size variants (small, medium, large, full)

### 2. ModalHeader
**Location:** `src/design-system/components/modals/ModalHeader/`

Header section with:
- Title (required)
- Subtitle (optional)
- Back button (optional)
- Close button (X icon)
- Proper spacing and typography

### 3. ModalContent
**Location:** `src/design-system/components/modals/ModalContent/`

Scrollable content area with:
- Auto-scroll behavior
- Styled scrollbars
- Proper padding
- Max height handling

### 4. ModalFooter
**Location:** `src/design-system/components/modals/ModalFooter/`

Footer with action buttons:
- Space-between layout
- Left and right button groups
- Button alignment
- Proper spacing

### 5. TileButton
**Location:** `src/design-system/components/modals/TileButton/`

Action tile buttons for modals:
- Icon (Font Awesome or custom)
- Title
- Description/subtitle
- Chevron right icon
- Hover states
- Click handling

### 6. MobilePanel
**Location:** `src/design-system/components/modals/MobilePanel/`

Mobile slide-in panels:
- Slide from right animation
- Close button
- Header with title
- Scrollable content
- Bottom actions
- Backdrop

## 🎯 Usage Examples

### Basic Modal
```tsx
import { Modal, ModalHeader, ModalContent, ModalFooter } from '@/design-system/components/modals';

<Modal isOpen={isOpen} onClose={handleClose} size="medium">
  <ModalHeader title="Add Sources" onClose={handleClose} />
  <ModalContent>
    <p>Your modal content here</p>
  </ModalContent>
  <ModalFooter>
    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
    <Button variant="primary" onClick={handleSave}>Save</Button>
  </ModalFooter>
</Modal>
```

### Modal with Tile Buttons
```tsx
<Modal isOpen={isOpen} onClose={handleClose}>
  <ModalHeader title="Create Material" subtitle="Choose what to generate" />
  <ModalContent>
    <TileButton
      icon="pen-nib"
      title="Generate new Summary"
      description="A study-ready overview of your sources"
      onClick={() => handleCreate('summary')}
    />
    <TileButton
      icon="list-check"
      title="Generate new Quiz"
      description="Test yourself with multiple-choice quiz"
      onClick={() => handleCreate('quiz')}
    />
  </ModalContent>
</Modal>
```

### Mobile Panel
```tsx
<MobilePanel isOpen={isOpen} onClose={handleClose} title="Materials">
  <div>Panel content</div>
</MobilePanel>
```

## 🎨 Design Specifications

### Desktop Modals
- **Max Width**: 
  - Small: 400px
  - Medium: 600px
  - Large: 800px
  - Full: 90vw
- **Backdrop**: rgba(0, 0, 0, 0.5)
- **Border Radius**: 20px (var(--border-radius-lg))
- **Padding**: 20-24px
- **Shadow**: var(--shadow-lg)

### Mobile Panels
- **Width**: 375px (mobile) or 100% on small screens
- **Animation**: Slide from right
- **Duration**: 300ms ease-out
- **Backdrop**: rgba(0, 0, 0, 0.3)

### TileButton
- **Height**: 64px
- **Padding**: 16px 12px
- **Border**: 1px solid var(--color-border)
- **Border Radius**: 20px
- **Icon Size**: 40px
- **Hover**: Border color change + shadow

## ♿ Accessibility

- **Focus Trapping**: Focus stays within modal
- **Escape Key**: Closes modal (configurable)
- **ARIA Labels**: Proper dialog role and labels
- **Focus Restoration**: Returns focus after close
- **Keyboard Navigation**: Full keyboard support

## 📱 Responsive Behavior

- **Desktop**: Centered modals with backdrop
- **Mobile**: Full-screen or slide-in panels
- **Tablet**: Adaptive sizing

## 🔮 Modal Types (from Figma)

Based on Figma designs, these modal types should be supported:

1. **Add Sources** - Upload files and add links
2. **Create Material** - Choose summary, quiz, etc.
3. **Plain Text** - Text input modal
4. **Links** - Add URL links
5. **Share Project** - Sharing options
6. **Privacy** - Privacy settings
7. **Paywall** - Subscription/payment
8. **Feedback** - User feedback form
9. **Edit Course** - Course editing
10. **Customize Material** - Material options

Each type uses the base Modal + Header + Content + Footer structure with different content.

## 🎯 Best Practices

1. **Portal Rendering**: Always render modals at body level
2. **Body Scroll Lock**: Prevent background scrolling
3. **Focus Management**: Trap and restore focus properly
4. **Escape Handling**: Allow escape to close (unless critical action)
5. **Backdrop Click**: Close on backdrop click (unless form with unsaved changes)
6. **Loading States**: Show loading indicators for async actions
7. **Error Handling**: Display errors clearly within modal

## 🚧 Implementation Status

- ✅ Base Modal structure created
- ⏳ Styles need completion
- ⏳ ModalHeader needs implementation
- ⏳ ModalContent needs implementation
- ⏳ ModalFooter needs implementation
- ⏳ TileButton needs implementation  
- ⏳ MobilePanel needs implementation
- ⏳ Demo page needed

## 📝 Next Steps

1. Complete Modal.module.css with animations
2. Implement ModalHeader with back/close buttons
3. Implement ModalContent with scroll handling
4. Implement ModalFooter with button layouts
5. Implement TileButton for action tiles
6. Implement MobilePanel for mobile
7. Create demo page showing all modal types
8. Add comprehensive tests








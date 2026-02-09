# Home Page Components

Components specifically designed for the home/landing page of StudocuAI.

## 📦 Components

### 1. HeroUploadArea (In Progress)
**Location:** `src/design-system/components/home/HeroUploadArea/`
**Status:** 🔄 Partial (needs CSS completion)

Main hero section with:
- Greeting with gradient text ("Hey, Studying starts with **Studocu AI,** upload something")
- Assistant avatar with message bubbles
- Large drag & drop upload area
- Question input with context tags
- Quick action buttons (Mock exam, Summary, Quiz)

**Props:**
```typescript
interface HeroUploadAreaProps {
  onUpload?: (files: File[]) => void;
  onSubmit?: (question: string) => void;
  onQuickAction?: (action: 'mock-exam' | 'summary' | 'quiz') => void;
  className?: string;
}
```

**Usage:**
```tsx
<HeroUploadArea
  onUpload={(files) => handleUpload(files)}
  onSubmit={(question) => handleQuestion(question)}
  onQuickAction={(action) => handleAction(action)}
/>
```

### 2. CourseSectionHeader (Planned)
**Location:** `src/design-system/components/home/CourseSectionHeader/`
**Status:** ⏳ To be built

Small header above project groups:
- Folder/book icon
- Course name text
- Compact, inline design

**Proposed Props:**
```typescript
interface CourseSectionHeaderProps {
  title: string;
  icon?: 'folder' | 'book';
  className?: string;
}
```

**Usage:**
```tsx
<CourseSectionHeader title="Course 1" icon="folder" />
```

### 3. Footer (Planned)
**Location:** `src/design-system/components/home/Footer/`
**Status:** ⏳ To be built

Page footer with:
- "Powered by Studocu" with logo
- Tagline: "The largest database of student-generated study notes in the world ♥︎"
- Legal text about uploads and copyrights
- Centered layout

**Proposed Props:**
```typescript
interface FooterProps {
  className?: string;
}
```

**Usage:**
```tsx
<Footer />
```

## 🎨 Design Specifications

### HeroUploadArea
- **Gradient Text**: Blue (#3092FA) to Purple (#F064FC)
- **Upload Border**: 2px dashed, rounded 20px top
- **Input Area**: White background, rounded 20px bottom
- **Quick Actions**: Secondary buttons, 32px height
- **Context Tags**: Light gray background, pill shape

### CourseSectionHeader
- **Height**: 24px
- **Icon Size**: 20px
- **Gap**: 4px between icon and text
- **Font**: DM Sans Bold, 16px

### Footer
- **Background**: Optional light background
- **Text Align**: Center
- **Padding**: Generous vertical spacing
- **Font Sizes**: 14-16px range

## 📱 Responsive Behavior

### Desktop (> 768px)
- Hero: Centered, max-width 1016px
- Upload area: Full width within container
- Quick actions: Horizontal row

### Mobile (≤ 768px)
- Hero heading: Multi-line (3 lines)
- Upload area: Full width, adjusted padding
- Quick actions: May wrap or stack
- Context tags: Scrollable if needed

## 🔄 Current Implementation Status

**Completed:**
- ✅ HeroUploadArea TypeScript types
- ✅ HeroUploadArea React component structure
- ✅ File upload logic
- ✅ Question input handling
- ✅ Quick action handlers

**In Progress:**
- 🔄 HeroUploadArea.module.css (needed)

**Pending:**
- ⏳ CourseSectionHeader (4 files)
- ⏳ Footer (4 files)
- ⏳ Integration tests
- ⏳ Storybook stories

## 🚀 Next Steps

1. Complete `HeroUploadArea.module.css` with:
   - Layout styles (flex, gaps, padding)
   - Gradient text effects
   - Upload area border and background
   - Input styling
   - Button styles
   - Responsive breakpoints
   
2. Build CourseSectionHeader:
   - Simple icon + text component
   - ~50 lines total
   
3. Build Footer:
   - Branding and legal text
   - ~80 lines total
   
4. Assemble home page:
   - Import all components
   - Create grid layouts for projects
   - Add responsive behavior

**Estimated Remaining: ~530 lines of code**

## 📝 Notes

- HeroUploadArea is the most complex component
- Can reuse existing ProjectCard for project grids
- Header component already exists and is reusable
- Footer is straightforward text layout
- Most of home page is **assembling existing pieces**

## 🎯 Related Components

These components work together with:
- **ProjectCard** - For displaying project tiles
- **Header** - Site navigation (already built)
- **DragDropUpload** - Similar upload logic (already built)
- **Buttons** - For quick actions (already built)

See also:
- `HOME_PAGE_IMPLEMENTATION_GUIDE.md` for complete page assembly instructions
- `PROJECT_PAGE_COMPLETE.md` for project workspace documentation








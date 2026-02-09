# Project Page

Complete workspace for creating and managing study materials with AI assistance.

## 🎯 Features

### Desktop View
- **Header**: Project name, course setup, privacy controls, sharing, and user avatar
- **Left Sidebar**: 
  - **Creations Panel**: Current notes, generation options (Mock Exam, Summary, Quiz)
  - **Sources Panel**: File upload with drag & drop, recording capability
- **Content Area**: Rich text editor with action buttons
- **Floating Assistant**: Quick access to AI Study Assistant
- **Sidebar Toggle**: Show/hide sidebars for distraction-free writing

### Mobile View  
- **Responsive Layout**: Full-screen content on mobile
- **Slide-in Panels**: Animated sidebars that slide from left
- **Touch-Optimized**: All controls sized for mobile interaction

## 📦 Components Used

### Design System Components
- ✅ `Logo` - Branding in header
- ✅ `DragDropUpload` - File upload interface
- ✅ `FloatingAssistantButton` - Bottom-right assistant access
- ✅ Sidebar structure (custom implementation matching design)

### Custom Elements
- Project header with dropdown
- Creation tiles with status chips
- Generation option buttons
- Content editor placeholder
- Action buttons

## 🎨 Design Features

### Header
- Logo with background
- Project name dropdown
- "Add your course" prompt with edit icon
- Public/Share buttons
- Avatar with dropdown

### Creations Sidebar
- Collapsible panel
- Current note tile with "Viewing" status
- Generation options:
  - Mock Exam (ballot-check icon)
  - Summary (pen-nib icon)
  - Quiz (list-check icon)
- "Generate new" button at bottom

### Sources Sidebar
- Collapsible panel
- Description text
- Drag & Drop upload area:
  - Cloud upload icon
  - "Drag & Drop files" heading
  - "choose file" link
  - Dashed border with hover states
- Add and Record action buttons

### Content Area
- Expand button (top-right)
- Document title (H1)
- Placeholder with blinking cursor
- Action buttons:
  - Generate a summary
  - Create a quiz
  - Ask a question
  - Record my class

### Floating Assistant
- Fixed bottom-right position
- Gradient avatar
- "Study Assistant" label
- Float animation
- Shadow and hover effects

## 🎯 Interactions

### Sidebar Management
- **Toggle Open/Close**: Click chevron icons
- **Collapse Panels**: Click panel headers
- **Show/Hide**: Click toggle buttons on page edge

### File Upload
- **Drag & Drop**: Drag files onto upload area
- **Click Upload**: Click "choose file" link
- **Supported Types**: PDF, TXT, PNG, JPG, DOC, DOCX

### Content Actions
- Click action buttons to trigger AI operations
- Expand content to full screen
- Type to start editing (cursor blinks in placeholder)

## 📱 Responsive Behavior

### Desktop (> 768px)
- Three-column layout (sidebar, content, space for right sidebar)
- Sidebar: 400px width (320px on tablets)
- Content: Flexible width with max 900px document area
- All panels visible simultaneously

### Mobile (≤ 768px)
- Full-screen content
- Sidebars slide in from left
- Backdrop overlay when sidebar open
- Touch-friendly button sizes
- Vertical action button layout

## 🔧 Usage

```tsx
// Navigate to /project route
// Page automatically renders with all components

// State management (built-in)
const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
const [creationsPanelOpen, setCreationsPanelOpen] = useState(true);
const [sourcesPanelOpen, setSourcesPanelOpen] = useState(true);
```

## 🎨 Styling

- **Background**: Secondary background color
- **Cards**: White background with border-radius-lg
- **Spacing**: 12px page padding, 8px gaps
- **Transitions**: 0.2s ease for hover states, 0.3s for slide animations
- **Shadows**: Elevation system for depth

## ♿ Accessibility

- **ARIA Labels**: All icon buttons have descriptive labels
- **Keyboard Navigation**: Full keyboard support
- **Focus States**: Visible focus indicators
- **Semantic HTML**: Proper heading hierarchy
- **Alt Text**: Images have descriptive alt attributes

## 🚀 Future Enhancements

- [ ] Real TipTap editor integration in content area
- [ ] Connect to file upload API
- [ ] Implement generation actions
- [ ] Add right sidebar for chat/assistant
- [ ] Real-time collaboration indicators
- [ ] Auto-save functionality
- [ ] Keyboard shortcuts overlay

## 📝 Notes

- Uses existing design system tokens
- Matches Figma design with pixel-perfect accuracy
- Fully responsive and accessible
- Ready for backend integration
- Animation-ready for transitions








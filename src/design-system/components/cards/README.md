# Card Components

Card components for displaying projects and other content.

## 📦 Components

### ProjectCard

Card component for displaying project information with metadata, actions, and status indicators.

**Location:** `src/design-system/components/cards/ProjectCard/`

**Variants:**
- `project` - Regular project card with emoji, title, metadata
- `new-project` - Special card for creating new projects

**Props:**
- `variant?: 'project' | 'new-project'` - Card variant (default: 'project')
- `emoji?: string` - Project emoji icon (default: '📚')
- `title?: string` - Project title
- `subtitle?: string` - Subtitle for new project card
- `course?: string` - Course name
- `updatedDate?: string` - Last updated date
- `isLocked?: boolean` - Whether project is locked/private
- `onClick?: () => void` - Card click handler
- `onMenuClick?: (e: MouseEvent) => void` - Menu button click handler
- `className?: string` - Additional CSS class

**Example:**
```tsx
import { ProjectCard } from '@/design-system/components/cards';

// Regular project card
<ProjectCard 
  emoji="🩺"
  title="Week 1: Topic 1"
  course="Course 1"
  updatedDate="Jan 20, 2025"
  isLocked={true}
  onClick={() => console.log('Open project')}
  onMenuClick={(e) => console.log('Show menu')}
/>

// New project card
<ProjectCard 
  variant="new-project"
  title="New Project"
  subtitle="Start a new study topic"
  onClick={() => console.log('Create project')}
/>
```

## 🎨 Features

### Project Card
- **Emoji Icon**: 32px emoji for visual identification
- **Title**: Project name with word wrap
- **Menu Button**: Dropdown menu with chevron icon
- **Course Metadata**: Course name with folder icon
- **Updated Date**: Last modified timestamp
- **Lock Indicator**: Privacy/lock status icon
- **Hover States**: Visual feedback on hover
- **Click Handling**: Full card and menu button clicks

### New Project Card
- **Plus Button**: Black circular button with icon
- **Centered Content**: Title and subtitle centered
- **Hover Animation**: Button scales on hover
- **Empty State**: Invitation to create new project

## 🎯 Layout

**Card Dimensions:**
- **Height**: Fixed 164px
- **Min Width**: 160px
- **Padding**: 20px (var(--spacing-lg))
- **Border**: 1px solid var(--color-border)
- **Border Radius**: var(--border-radius-lg)

**Grid Usage:**
```tsx
<div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
  <ProjectCard {...} />
  <ProjectCard {...} />
  <ProjectCard {...} />
</div>
```

## 📱 Responsive Design

Cards automatically adapt to container width:
- 3 columns on desktop (>1024px)
- 2 columns on tablet (768px - 1024px)
- 1 column on mobile (<768px)

## ♿ Accessibility

- **Keyboard Navigation**: Full keyboard support
- **ARIA Labels**: Proper labels on all interactive elements
- **Focus States**: Clear focus indicators
- **Role Attribution**: Buttons and clickable cards
- **Screen Reader Friendly**: Semantic HTML structure

## 🎨 Styling

All styling uses design tokens:

```css
/* Colors */
--color-surface-primary (card background)
--color-border (card border)
--color-text-subtle (title, course)
--color-text-xsubtle (date)

/* Spacing */
--spacing-lg (20px padding)
--spacing-sm (8px gaps)
--spacing-xs (4px small gaps)

/* Typography */
--font-size-md (16px title)
--font-size-sm (14px course)
--font-size-xs (12px date)
```

## 🧪 Usage Examples

### Project Grid
```tsx
const projects = [
  { id: 1, emoji: '🩺', title: 'Week 1: Topic 1', course: 'Course 1', updatedDate: 'Jan 20, 2025', isLocked: true },
  { id: 2, emoji: '🥦', title: 'Week 2: Topic 2', course: 'Course 1', updatedDate: 'Jan 20, 2025', isLocked: false },
  { id: 3, emoji: '🏁', title: 'Final Exam', course: 'Course 1', updatedDate: 'Jan 20, 2025', isLocked: true },
];

<div className={styles.projectGrid}>
  {projects.map((project) => (
    <ProjectCard
      key={project.id}
      {...project}
      onClick={() => handleOpenProject(project.id)}
      onMenuClick={() => handleShowMenu(project.id)}
    />
  ))}
  <ProjectCard variant="new-project" onClick={handleCreateProject} />
</div>
```

### Course Grouping
```tsx
<div>
  <h2>📁 Course 1</h2>
  <div className={styles.projectGrid}>
    {course1Projects.map((project) => (
      <ProjectCard key={project.id} {...project} />
    ))}
  </div>
  
  <h2>📁 Course 2</h2>
  <div className={styles.projectGrid}>
    {course2Projects.map((project) => (
      <ProjectCard key={project.id} {...project} />
    ))}
  </div>
</div>
```

## 🎯 Best Practices

1. **Emoji Icons**: Use relevant emojis that represent the project topic
2. **Titles**: Keep titles concise (1-3 lines max)
3. **Dates**: Use relative dates (e.g., "Updated 2 hours ago")
4. **Menu Handling**: Stop event propagation on menu clicks
5. **Loading States**: Show skeleton cards while loading
6. **Empty States**: Use new-project card as last item
7. **Grid Layout**: Use CSS Grid with auto-fit for responsive layouts

## 🔮 Future Enhancements

- [ ] Drag and drop reordering
- [ ] Multi-select mode
- [ ] Thumbnail images
- [ ] Progress indicators
- [ ] Color coding by course
- [ ] Tags/labels
- [ ] Sharing indicators
- [ ] Collaboration avatars








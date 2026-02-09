# Design Brief: Course-First POC Prototype

> **Type:** Proof of Concept / Research Prototype  
> **Goal:** Validate course-first architecture with Studocu library integration  
> **Template:** https://github.com/obpobpobp/sdaitemplate  
> **Deploy:** Vercel (password protected)  
> **Author:** öbp  
> **Status:** Ready for build

---

## 1. Purpose

Build a functional prototype to test:

> **If users start by selecting a course (with Studocu's docs already available) and we proactively suggest what we can create, will they engage deeper and return?**

**Core concept: Every container is a Course. No more "projects."**

This is a research tool, NOT a production feature.

---

## 2. KISS Principles (MANDATORY)

```
1. Clone template → scan codebase → THEN build
2. Work on parent folder (HARD RULE)
3. npm run dev must work after EVERY change
4. Build incrementally — each step must WORK before next
5. Hardcode first → real endpoints later
6. Functionality before beauty
7. Use existing components — new ones only when necessary
8. Commit after each working prompt
9. git reset --hard if stuck — don't layer bad code
```

---

## 3. Cursor Rules

Create `.cursorrules` at project root after cloning template:

```markdown
# Studocu AI POC - Cursor Rules

## Project Context
This is a POC prototype for Studocu AI to validate course-first architecture.
Stack: Next.js 14 (App Router), TypeScript, Tailwind CSS, OpenAI API.

## MANDATORY Rules

### 1. Template First
- ALWAYS check existing components in /components before creating new ones
- ALWAYS use design tokens from the template (colors, spacing, typography)
- NEVER override template styles with arbitrary values

### 2. TypeScript
- ALL components must be typed (no `any` types)
- Props interfaces go above component definition
- Export types from /types folder

### 3. File Structure
- Pages go in /app with folder-based routing
- Components go in /components (flat, not nested folders)
- API routes go in /app/api
- Types go in /types
- Utils go in /lib

### 4. State Management
- Use localStorage for persistence (POC only)
- React Context for cross-component state
- No external state libraries

### 5. Styling
- Tailwind utility classes ONLY
- No inline styles
- No CSS files unless from template
- Use existing tokens: colors, spacing, shadows

### 6. Accessibility
- All interactive elements must be keyboard accessible
- Buttons must have aria-labels if icon-only
- Forms must have labels
- Focus states must be visible

### 7. Error Handling
- Try/catch all API calls
- Show user-friendly error messages
- Provide retry options
- Log errors to console in dev

### 8. Testing Each Prompt
- Run npm run dev after every change
- Test the specific feature mentioned in "Test:" section
- Commit if working: git add . && git commit -m "Prompt X: [description]"
- Reset if broken: git reset --hard HEAD

## Design Tokens (from Studocu template)

### Colors
```css
--primary-blue: #1E88E5
--primary-blue-hover: #1565C0
--text-primary: #1A1A1A
--text-secondary: #666666
--text-muted: #999999
--bg-white: #FFFFFF
--bg-gray-50: #FAFAFA
--bg-gray-100: #F5F5F5
--border-light: #E0E0E0
--success: #4CAF50
--warning: #FF9800
--error: #F44336
```

### Spacing
```css
--space-xs: 4px
--space-sm: 8px
--space-md: 16px
--space-lg: 24px
--space-xl: 32px
--space-2xl: 48px
```

### Typography
```css
--text-xs: 12px
--text-sm: 14px
--text-base: 16px
--text-lg: 18px
--text-xl: 20px
--text-2xl: 24px
--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
```

### Shadows
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05)
--shadow-md: 0 4px 6px rgba(0,0,0,0.1)
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1)
```

## Component Patterns

### Button (use existing or follow this pattern)
```tsx
<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  Label
</button>
```

### Card
```tsx
<div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
  Content
</div>
```

### Input
```tsx
<input 
  type="text"
  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  placeholder="..."
/>
```

## Common Mistakes to Avoid
- DON'T create components that already exist
- DON'T use arbitrary Tailwind values (use tokens)
- DON'T skip TypeScript types
- DON'T forget keyboard navigation
- DON'T ignore mobile responsiveness
- DON'T make multiple failed attempts — reset instead
```

---

## 4. TypeScript Types

Create `/types/index.ts`:

```typescript
// Core domain types

export interface StudocuDocument {
  id: string;
  name: string;
  downloads: number;
  covers?: string[];      // Topics this doc covers
  enables?: string;       // Feature this doc unlocks
  type: 'lecture' | 'textbook' | 'exam' | 'notes' | 'other';
  addedAt?: Date;
}

export interface UserUpload {
  id: string;
  name: string;
  file: File;
  uploadedAt: Date;
  size: number;
  type: string;
}

export interface Course {
  id: string;
  name: string;
  university?: string;
  examDate?: Date;
  libraryDocs: StudocuDocument[];
  userUploads: UserUpload[];
  createdAt: Date;
}

export interface Creation {
  id: string;
  type: 'quiz' | 'summary' | 'gap-analysis';
  title: string;
  createdAt: Date;
  data: QuizData | SummaryData | GapData;
}

export interface QuizData {
  questions: QuizQuestion[];
  score?: number;
  completedAt?: Date;
  weakTopics?: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  topic: string;
  userAnswer?: number;
}

export interface SummaryData {
  content: string;       // Markdown
  wordCount: number;
  chapters: string[];
}

export interface GapData {
  coveredTopics: { topic: string; strength: 'strong' | 'medium' | 'weak' }[];
  missingTopics: string[];
  recommendations: { doc: string; covers: string[] }[];
}

export interface SmartSuggestion {
  type: 'quiz' | 'summary' | 'gap-analysis';
  title: string;
  description: string;
  metrics: string;       // "47 questions available"
  topics?: string[];
  available: boolean;
  unlockCondition?: string;
}

export type TabType = 'assistant' | 'creations' | 'sources';
export type CanvasContent = 
  | { type: 'suggestions' }
  | { type: 'source'; source: StudocuDocument | UserUpload }
  | { type: 'creation'; creation: Creation }
  | { type: 'quiz-active'; quiz: QuizData }
  | { type: 'loading'; message: string };
```

---

## 5. State Management

### Context Provider

Create `/lib/CourseContext.tsx`:

```typescript
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Course, Creation, TabType, CanvasContent } from '@/types';

interface CourseContextType {
  // Course data
  course: Course | null;
  setCourse: (course: Course) => void;
  
  // Creations
  creations: Creation[];
  addCreation: (creation: Creation) => void;
  
  // UI state
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  canvasContent: CanvasContent;
  setCanvasContent: (content: CanvasContent) => void;
  
  // Computed
  totalSources: number;
  possibleQuestions: number;
  possibleWords: number;
  
  // Actions
  addSource: (source: StudocuDocument | UserUpload) => void;
  removeSource: (id: string) => void;
}

const CourseContext = createContext<CourseContextType | null>(null);

export function CourseProvider({ children, courseId }: { children: ReactNode; courseId: string }) {
  // Load from localStorage
  // Persist on change
  // Compute derived values
}

export function useCourse() {
  const context = useContext(CourseContext);
  if (!context) throw new Error('useCourse must be used within CourseProvider');
  return context;
}
```

### localStorage Keys

```typescript
const STORAGE_KEYS = {
  COURSE_PREFIX: 'studocu-poc-course-',     // + courseId
  CREATIONS_PREFIX: 'studocu-poc-creations-', // + courseId
  ONBOARDING: 'studocu-poc-onboarding',      // temp data during setup
};
```

---

## 6. Architecture

### The Flow
```
Search Course → Select from Studocu Library → Add Own Docs (optional) → Course Workspace → Smart Suggestions
```

### Panel Layout
```
┌──────────────────────────────────────┬────────────────────────────────────┐
│  [Assistant] [Creations] [Sources]   │                                    │
├──────────────────────────────────────┤                                    │
│                                      │                                    │
│  Active Tab Content                  │           Canvas                   │
│  (320px fixed)                       │           (flex-1)                 │
│                                      │                                    │
└──────────────────────────────────────┴────────────────────────────────────┘

Mobile (<768px):
┌──────────────────────────────────────┐
│  Course Name         [☰ Menu]        │
├──────────────────────────────────────┤
│                                      │
│  Canvas (full width)                 │
│                                      │
├──────────────────────────────────────┤
│  [Assistant] [Creations] [Sources]   │  ← Bottom tabs
└──────────────────────────────────────┘
```

---

## 7. User Flows

### Flow 1: Course Search
```
Landing (/)
├── User types course name
├── Optional: select university
├── Click "Find My Course"
│   └── → /library?q={course}&u={university}
└── Or: "Start Empty Course"
    └── → /setup?empty=true
```

### Flow 2: Library Selection
```
Library (/library)
├── Show matching Studocu docs (mock: 8 docs)
├── Pre-check top 2 by downloads
├── User can check/uncheck any
├── "Show X more..." expands list
├── Selected count visible
├── Click "Add to My Course"
│   └── Save to localStorage.onboarding
│   └── → /setup
└── Edge: No results
    └── Show "No documents found. Start empty?"
    └── → /setup?empty=true
```

### Flow 3: Setup (Optional Uploads)
```
Setup (/setup)
├── Show "Added from library: X documents"
├── Drag & drop upload zone
├── Uploaded files listed with remove option
├── Exam date picker (optional)
├── "Skip for Now" or "Continue"
│   └── Generate course ID from name slug
│   └── Save course to localStorage
│   └── → /course/{id}
└── Edge: ?empty=true
    └── Skip library count
    └── Require at least 1 upload OR allow empty start
```

### Flow 4: Workspace
```
Workspace (/course/[id])
├── Load course from localStorage
├── Default: Assistant tab, suggestions in canvas
├── Tab switching updates left panel
├── Clicking source/creation updates canvas
├── Generation happens in canvas with loading state
└── Edge: Course not found
    └── "Course not found" → link to home
```

---

## 8. Routes

```
/                    → Course Search (landing)
/library             → Studocu Library Results
/setup               → Add Own Docs (optional step)
/course/[id]         → Course Workspace
```

4 routes total. Quiz/Summary views render in Canvas, not separate pages.

---

## 9. Edge Cases

| Scenario | Handling |
|----------|----------|
| Search returns 0 docs | Show "No documents found" + option to start empty |
| Course name very long | Truncate with ellipsis in UI, full on hover |
| File upload too large (>10MB) | Reject with clear message |
| File type not supported | List supported types, reject gracefully |
| localStorage full | Catch error, suggest clearing old courses |
| API timeout | Show timeout message, retry button |
| No API key | Demo mode with mock responses |
| Browser doesn't support drag/drop | Show file picker button |
| Mobile: keyboard covers input | Scroll to input on focus |
| Slow network | Show skeleton loaders |
| User refreshes mid-upload | Warn before leaving page |

---

## 10. Accessibility Requirements

```
1. Keyboard Navigation
   - Tab order follows visual order
   - All interactive elements focusable
   - Enter/Space activates buttons
   - Escape closes modals
   - Arrow keys navigate options

2. Screen Reader Support
   - Semantic HTML (nav, main, aside, article)
   - aria-labels on icon buttons
   - aria-live regions for dynamic content
   - Form labels associated with inputs

3. Visual
   - Focus rings visible (2px, offset)
   - Contrast ratio 4.5:1 minimum
   - Don't rely on color alone

4. Motion
   - Respect prefers-reduced-motion
   - Animations under 300ms
```

---

## 11. File Structure

```
/
├── .cursorrules                    # AI coding rules
├── .env.local                      # OPENAI_API_KEY, SITE_PASSWORD
├── README.md                       # Setup & usage
├── CODEBASE.md                     # Template documentation
│
├── app/
│   ├── layout.tsx                  # Root layout with providers
│   ├── page.tsx                    # Course search landing
│   ├── library/
│   │   └── page.tsx                # Studocu results
│   ├── setup/
│   │   └── page.tsx                # Add own docs
│   ├── course/
│   │   └── [id]/
│   │       └── page.tsx            # Workspace
│   └── api/
│       └── generate/
│           └── route.ts            # OpenAI endpoint
│
├── components/
│   ├── ui/                         # FROM TEMPLATE (don't modify)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   │
│   ├── CourseSearch.tsx            # Search form
│   ├── LibraryResults.tsx          # Doc list with checkboxes
│   ├── LibraryDocCard.tsx          # Single doc card
│   ├── FileUpload.tsx              # Drag & drop zone
│   ├── FileList.tsx                # Uploaded files list
│   ├── ExamDatePicker.tsx          # Date input
│   │
│   ├── WorkspaceLayout.tsx         # Two-panel layout
│   ├── WorkspaceHeader.tsx         # Course name + countdown
│   ├── TabbedSidebar.tsx           # Tab container
│   ├── TabButton.tsx               # Single tab
│   │
│   ├── AssistantTab.tsx            # Suggestions + chat
│   ├── CourseHealth.tsx            # Progress bar + stats
│   ├── SmartSuggestions.tsx        # Suggestion cards
│   ├── SuggestionCard.tsx          # Single suggestion
│   ├── ChatInput.tsx               # Chat input + send
│   │
│   ├── CreationsTab.tsx            # Artifacts list
│   ├── CreationCard.tsx            # Single creation
│   ├── LockedFeature.tsx           # Locked item with value prop
│   │
│   ├── SourcesTab.tsx              # Sources list
│   ├── SourceCard.tsx              # Single source
│   ├── RecommendedDoc.tsx          # Recommended to add
│   │
│   ├── Canvas.tsx                  # Right panel container
│   ├── CanvasSuggestions.tsx       # Default canvas view
│   ├── CanvasSourcePreview.tsx     # Source preview
│   ├── CanvasQuiz.tsx              # Active quiz
│   ├── CanvasQuizResults.tsx       # Quiz complete
│   ├── CanvasSummary.tsx           # Summary view
│   ├── CanvasGapAnalysis.tsx       # Gap analysis
│   ├── CanvasLoading.tsx           # Loading state
│   │
│   ├── Toast.tsx                   # Notifications
│   └── Modal.tsx                   # Modal container
│
├── lib/
│   ├── CourseContext.tsx           # Course state provider
│   ├── storage.ts                  # localStorage helpers
│   ├── utils.ts                    # Utility functions
│   └── mockData.ts                 # Mock Studocu library
│
└── types/
    └── index.ts                    # All TypeScript types
```

---

## 12. Cursor Prompts

### ⚠️ GOLDEN RULES - READ BEFORE EVERY PROMPT

```
These rules apply to EVERY prompt. Violating them will break the design system.

═══════════════════════════════════════════════════════════════════════════════
RULE 0: MANDATORY READING BEFORE ANY CODE
═══════════════════════════════════════════════════════════════════════════════

Before writing ANY code for ANY prompt, you MUST:

1. OPEN and READ app/page.tsx (Landing Page)
   - Understand its structure completely
   - Note every component it imports
   - Note every Tailwind class used

2. OPEN and READ app/project/[id]/page.tsx (Project Page)  
   - Understand its two-panel layout
   - Note how sidebar is structured
   - Note how content switching works
   - Note all imported components

3. OPEN and READ every file in /components folder
   - Understand what each component does
   - Note their props interfaces
   - Note their styling patterns

4. CHECK CODEBASE.md for the summary (created in Prompt 1)

If you haven't done this reading, STOP and do it now.

═══════════════════════════════════════════════════════════════════════════════

1. NEVER CREATE WITHOUT CHECKING FIRST
   Before creating ANY component, check:
   - Does this component already exist in /components?
   - Is there a similar component I can extend?
   - What patterns does the existing codebase use?

2. ALWAYS REFERENCE EXISTING PAGES
   - The LANDING PAGE (app/page.tsx) shows how to structure entry pages
   - The PROJECT PAGE (app/project/[id]/page.tsx) shows how to structure the workspace
   - Copy their patterns, don't invent new ones

3. ALWAYS USE EXISTING COMPONENTS
   - Button → use existing, don't create new
   - Input → use existing, don't create new  
   - Card → use existing, don't create new
   - Any list item pattern → check existing first

4. ALWAYS MATCH EXISTING STYLES
   - Colors: only use colors that appear in tailwind.config or existing code
   - Spacing: only use spacing values that appear in existing code
   - Shadows: only use shadow classes that appear in existing code
   - Border radius: match existing patterns exactly

5. CHECK CODEBASE.md BEFORE EVERY PROMPT
   - It documents all existing components and their props
   - It documents all design tokens
   - It tells you what to reuse vs create

6. IF IN DOUBT, CHECK THE EXISTING CODE
   - Open the file, read it, understand the pattern
   - Don't assume - verify
```

---

### Prompt 1: Deep Codebase Audit & Setup

```
Clone the template from https://github.com/obpobpobp/sdaitemplate

After cloning, do these steps IN ORDER:

1. MOVE contents to parent folder if clone created subfolder
   - All work must happen in parent folder, not a nested folder
   - Run: npm install && npm run dev to verify it works

---

2. DEEP AUDIT: LANDING PAGE (app/page.tsx or similar)

Read the existing landing page carefully. Document:

a) LAYOUT STRUCTURE:
   - What is the overall layout? (centered, full-width, sidebar?)
   - What containers/wrappers are used?
   - What is the max-width?
   - What padding/margins are used?

b) COMPONENTS USED:
   - List every component imported
   - For each: what props does it accept?
   - Are there any compound components (Header.Title, Card.Body)?

c) STYLING PATTERNS:
   - What Tailwind classes are commonly used?
   - Are there custom CSS classes?
   - What color tokens appear? (bg-*, text-*, border-*)
   - What spacing tokens appear? (p-*, m-*, gap-*)

d) INTERACTIVITY:
   - What buttons/CTAs exist?
   - What are their styles?
   - Any hover/focus states visible?

e) CONTENT STRUCTURE:
   - What's the headline style?
   - What's the subtext style?
   - How are forms structured?

---

3. DEEP AUDIT: PROJECT PAGE (app/project/[id]/page.tsx or similar)

Read the existing project/workspace page carefully. Document:

a) LAYOUT STRUCTURE:
   - Is it multi-panel? How many columns?
   - What are the panel widths?
   - Is there a header? What's in it?
   - How does mobile layout differ?

b) SIDEBAR (if exists):
   - What sections does it have?
   - How are sections separated?
   - What's in each section?
   - How do items in lists look?

c) MAIN CONTENT AREA:
   - What does it display?
   - How does content switch?
   - What's the empty state?

d) COMPONENTS USED:
   - List every component
   - Document their props
   - Note any patterns (list items, cards, etc.)

e) STATE MANAGEMENT:
   - How is state handled? (useState, context, zustand?)
   - How does tab/panel switching work?
   - How is data loaded?

---

4. DEEP AUDIT: ALL COMPONENTS (components/ folder)

For EACH component file, document:

a) COMPONENT NAME & PURPOSE
b) PROPS INTERFACE (copy the TypeScript interface)
c) INTERNAL STATE (if any)
d) STYLING APPROACH (Tailwind classes used)
e) CHILDREN/COMPOSITION (does it accept children?)
f) VARIANTS (does it have size/color variants?)

Pay special attention to:
- Button variants (primary, secondary, ghost, etc.)
- Input styles (sizes, states, validation)
- Card styles (shadows, borders, padding)
- List item patterns
- Icon usage
- Loading states
- Error states
- Empty states

---

5. AUDIT: DESIGN TOKENS & THEME

Find and document:
- tailwind.config.js/ts - custom colors, spacing, fonts
- Any CSS variables in globals.css
- Any theme provider or context

Create a token reference:
COLORS:
- Primary: [value]
- Secondary: [value]
- Text primary: [value]
- Text secondary: [value]
- Background: [value]
- Border: [value]
- Success/Error/Warning: [values]

SPACING:
- xs, sm, md, lg, xl, 2xl values

TYPOGRAPHY:
- Font family
- Font sizes used
- Font weights used
- Line heights

SHADOWS:
- sm, md, lg values

BORDER RADIUS:
- Values used (rounded-lg, rounded-xl, etc.)

---

6. AUDIT: UTILITIES & HOOKS (lib/ folder)

Document any:
- Custom hooks
- Utility functions
- API helpers
- Storage helpers
- Constants

---

7. CREATE CODEBASE.md at root

This is the MOST IMPORTANT output of Prompt 1. Every subsequent prompt will reference this.

Structure it as:

# Codebase Documentation

## Folder Structure
[tree view of entire project]

---

## Existing Pages

### Landing Page (app/page.tsx)

**File Path:** [exact path]

**Layout:**
- Container type: [e.g., centered, max-w-md]
- Background: [color class]
- Padding: [spacing classes]

**Components Imported:**
| Component | Import Path | How It's Used |
|-----------|-------------|---------------|
| [name] | [path] | [description] |

**Key Tailwind Classes Used:**
- Containers: [list]
- Text: [list]
- Buttons: [list]
- Inputs: [list]
- Spacing: [list]

**Screenshot/ASCII of Layout:**
[rough visual representation]

---

### Project Page (app/project/[id]/page.tsx)

**File Path:** [exact path]

**Layout:**
- Overall: [e.g., flex, two-column]
- Sidebar width: [value]
- Main content: [flex-1, etc.]
- Header height: [value]
- Mobile behavior: [description]

**Components Imported:**
| Component | Import Path | How It's Used |
|-----------|-------------|---------------|
| [name] | [path] | [description] |

**Sidebar Structure:**
- Section 1: [name] - [what it contains]
- Section 2: [name] - [what it contains]
- Footer: [what it contains]

**Content Area:**
- Default view: [what shows]
- How content switches: [mechanism]

**State Management:**
- Where state lives: [useState/context/etc.]
- How tabs work: [mechanism]

---

## Components Library

### CRITICAL: Component Inventory

For EACH component, document EXACTLY:

#### [ComponentName].tsx
- **Purpose:** [what it does]
- **Props:**
  ```typescript
  interface Props {
    // copy exact interface
  }
  ```
- **Variants:** [if any - list all]
- **Example Usage:**
  ```tsx
  <ComponentName prop="value" />
  ```
- **Key Classes:** [main Tailwind classes]

---

### Buttons
| Component | Variants | Props | Usage Example |
|-----------|----------|-------|---------------|
| [name] | primary, secondary, ghost, etc. | [props] | `<Button variant="primary">` |

### Inputs
| Component | Types | Props | Usage Example |
|-----------|-------|-------|---------------|
| [name] | text, search, etc. | [props] | `<Input type="text" />` |

### Cards/Containers
| Component | Purpose | Props | Usage Example |
|-----------|---------|-------|---------------|
| [name] | [purpose] | [props] | `<Card>content</Card>` |

### List Items
| Component | Purpose | Props | Usage Example |
|-----------|---------|-------|---------------|
| [name] | [purpose] | [props] | `<ListItem>` |

### Navigation/Tabs
| Component | Purpose | Props | Usage Example |
|-----------|---------|-------|---------------|
| [name] | [purpose] | [props] | `<Tab active>` |

### Feedback (Toasts, Alerts, etc.)
| Component | Types | Props | Usage Example |
|-----------|-------|-------|---------------|
| [name] | [types] | [props] | `<Toast type="success">` |

### Icons
- Icon library used: [name]
- How to import: [example]
- Common icons: [list]

### Empty States
| Component/Pattern | When Used | Example |
|-------------------|-----------|---------|
| [name/pattern] | [scenario] | [code] |

### Loading States
| Component/Pattern | When Used | Example |
|-------------------|-----------|---------|
| [name/pattern] | [scenario] | [code] |

---

## Design Tokens

### Colors (from tailwind.config)
```
Primary: [class] → [hex value]
Secondary: [class] → [hex value]
Background: [class] → [hex value]
Surface: [class] → [hex value]
Text Primary: [class] → [hex value]
Text Secondary: [class] → [hex value]
Border: [class] → [hex value]
Success: [class] → [hex value]
Error: [class] → [hex value]
Warning: [class] → [hex value]
```

### Spacing Scale (used in codebase)
```
xs: [value] → used for: [where]
sm: [value] → used for: [where]
md: [value] → used for: [where]
lg: [value] → used for: [where]
xl: [value] → used for: [where]
```

### Typography
```
Font Family: [value]
Heading 1: [classes]
Heading 2: [classes]
Heading 3: [classes]
Body: [classes]
Small: [classes]
```

### Shadows
```
sm: [class] → [value]
md: [class] → [value]
lg: [class] → [value]
```

### Border Radius
```
sm: [class]
md: [class]
lg: [class]
full: [class]
```

---

## Patterns & Conventions

### File Structure
- Components: [pattern]
- Pages: [pattern]
- Utilities: [pattern]

### Naming Conventions
- Components: [PascalCase/etc.]
- Files: [kebab-case/etc.]
- CSS classes: [pattern]

### Import Order
[example of typical import order]

### Component Composition
[how components are typically composed]

---

## POC Planning

### Components to REUSE (DO NOT RECREATE)
| Existing Component | Use For |
|-------------------|---------|
| [Button] | All buttons in POC |
| [Input] | All form inputs |
| [Card] | Container cards |
| [etc.] | [etc.] |

### Components to CREATE (don't exist yet)
| New Component | Based On | Why Needed |
|--------------|----------|------------|
| CourseSearch | Existing form patterns | Course search specific |
| [etc.] | [etc.] | [etc.] |

### Patterns to FOLLOW
- Forms: follow [page] pattern
- Lists: follow [component] pattern
- Two-panel: follow project page pattern
- Mobile: follow [pattern]

---

8. CREATE .cursorrules file
(I'll provide content separately - it should reference the actual tokens you found)

9. CREATE /types/index.ts with TypeScript types
(I'll provide content separately)

10. VERIFY setup:
    - npm run dev works
    - CODEBASE.md is complete and comprehensive
    - You can explain every existing component
    - You know exactly which components to reuse

GIT COMMIT: "Prompt 1: Deep codebase audit and setup documentation"
```

---

### Prompt 2: Course Search Landing Page

```
Create the landing page at app/page.tsx

═══════════════════════════════════════════════════════════════════════════════
PRE-FLIGHT CHECKLIST (Complete before writing ANY code)
═══════════════════════════════════════════════════════════════════════════════

□ I have READ CODEBASE.md completely
□ I have OPENED and READ the existing app/page.tsx
□ I can LIST every component used in the existing landing page
□ I know what Button component exists and its props
□ I know what Input component exists and its props  
□ I know the exact Tailwind classes used for:
  - Container/wrapper: _______________
  - Headings: _______________
  - Body text: _______________
  - Buttons: _______________
  - Inputs: _______________
  - Spacing: _______________
□ I will NOT create any component that already exists

If any checkbox is not complete, STOP and read the files first.

═══════════════════════════════════════════════════════════════════════════════

This is COURSE-FIRST - users search for their course, not upload files.

REQUIREMENTS:

1. REFERENCE EXISTING PATTERNS:
   - Look at how the current landing page is structured
   - Use the SAME layout containers/wrappers
   - Use the SAME max-width approach
   - Use the SAME spacing tokens

2. REUSE EXISTING COMPONENTS (check CODEBASE.md):
   - Button component → use for "Find My Course"
   - Input component → use for course name and university
   - Card component → use as form container (if pattern exists)
   - Any existing form patterns

3. Layout:
   - Match the existing landing page layout style
   - If existing uses centered content, use centered
   - If existing uses specific max-width, use same
   - Match the vertical rhythm/padding

4. Content:
   - Headline: "What course are you studying?"
   - Subtext: "Find your course to start with study materials from other students"
   
5. Form:
   - Course name input (required)
     - Use existing Input component with its default size
     - Placeholder: "e.g., Pharmacology 101"
   - University input (optional)
     - Same Input component
     - Placeholder: "University (optional)"
   - Submit button: "Find My Course"
     - Use existing Button component with primary variant
     - Full width
     - Disabled until course name entered
   
6. Alternative:
   - Text: "Or"
   - Link: "Start with empty course" → /setup?empty=true
   - Style link to match existing link patterns

7. Create CourseSearch.tsx component
   - Handle form state with useState
   - On submit: navigate to /library?q={courseName}&u={university}
   - URL encode the params

STYLING RULES:
- Use ONLY Tailwind classes that appear in the existing codebase
- Match the existing color tokens exactly
- Match the existing spacing scale exactly
- If the template uses specific shadows, use those
- If the template uses specific border-radius, use those

ACCESSIBILITY:
- Labels associated with inputs (htmlFor)
- Focus states (use existing focus patterns)
- Button disabled state

Test: Enter "Pharmacology", click Find, URL shows /library?q=Pharmacology

GIT COMMIT: "Prompt 2: Course search landing page"
```

---

### Prompt 3: Mock Data & Storage Utils

```
Before building library page, set up data and storage utilities.

1. CREATE lib/mockData.ts:

const mockStudocuLibrary: Record<string, StudocuDocument[]> = {
  pharmacology: [
    { id: 'sd-1', name: 'Nursing Drug Handbook Ch 1-5', downloads: 2341, covers: ['Drug Interactions', 'Dosing'], type: 'textbook' },
    { id: 'sd-2', name: 'Lecture Notes Week 1-8', downloads: 1892, covers: ['All core topics'], type: 'lecture' },
    { id: 'sd-3', name: 'Midterm 2024 with Solutions', downloads: 956, enables: 'Exam Prediction', type: 'exam' },
    { id: 'sd-4', name: 'Final Exam Study Guide', downloads: 723, covers: ['Comprehensive review'], type: 'notes' },
    { id: 'sd-5', name: 'Pharmacokinetics Summary', downloads: 612, covers: ['ADME', 'Half-life'], type: 'notes' },
    { id: 'sd-6', name: 'Drug Classification Chart', downloads: 589, covers: ['Drug classes'], type: 'notes' },
    { id: 'sd-7', name: 'Practice Problems Set 1', downloads: 445, covers: ['Calculations'], type: 'notes' },
    { id: 'sd-8', name: 'Clinical Cases Week 1-4', downloads: 334, covers: ['Application'], type: 'lecture' },
  ],
  // Add 1-2 more courses for testing variety
  psychology: [
    { id: 'sd-p1', name: 'Intro to Psychology Textbook Notes', downloads: 1543, covers: ['Foundations'], type: 'textbook' },
    // ... more
  ],
};

export function searchLibrary(query: string): StudocuDocument[] {
  const normalized = query.toLowerCase().replace(/[^a-z]/g, '');
  // Fuzzy match against keys
  // Return matched docs or empty array
}

export function getRecommendedDocs(currentIds: string[], courseName: string): StudocuDocument[] {
  // Return docs NOT in currentIds, max 3
}

2. CREATE lib/storage.ts:

const KEYS = {
  ONBOARDING: 'studocu-poc-onboarding',
  COURSE_PREFIX: 'studocu-poc-course-',
  CREATIONS_PREFIX: 'studocu-poc-creations-',
};

interface OnboardingData {
  courseName: string;
  university?: string;
  selectedDocs: StudocuDocument[];
  userUploads: { name: string; size: number; type: string }[];
  examDate?: string;
}

export function saveOnboarding(data: OnboardingData): void
export function getOnboarding(): OnboardingData | null
export function clearOnboarding(): void

export function saveCourse(course: Course): void
export function getCourse(id: string): Course | null
export function generateCourseId(name: string): string // slug from name

export function saveCreations(courseId: string, creations: Creation[]): void
export function getCreations(courseId: string): Creation[]

Test: Import functions, call them in console, verify localStorage updates.

GIT COMMIT: "Prompt 3: Mock data and storage utilities"
```

---

### Prompt 4: Studocu Library Results Page

```
Create the library results page at app/library/page.tsx

⚠️ BEFORE WRITING ANY CODE:
1. Check CODEBASE.md for existing list/card components
2. Check if there's an existing checkbox component
3. Check if there's an existing badge/tag component
4. Check existing page layouts - match their structure

Shows documents from Studocu matching the course search.

REQUIREMENTS:

1. Get params from URL:
   - q = course name (required, redirect to / if missing)
   - u = university (optional)

2. Page Layout:
   - MATCH the existing landing page layout structure
   - Same max-width approach
   - Same padding/spacing

3. Header:
   - Back button (use existing icon button pattern if available)
   - "Found X documents for {courseName}"
   - If university: "at {university}"
   - Match existing header/title styles

4. Document list:
   - CHECK: Does existing codebase have list item components? USE THEM
   - CHECK: Does existing codebase have card components? USE THEM
   - LibraryDocCard.tsx component:
     - Checkbox (USE EXISTING if available)
     - Document name (match existing text styles)
     - Download count with icon
     - Tags (USE EXISTING badge component if available)
     - Document type icon
   - Pre-check top 2 by download count
   - Initially show 4 docs
   - "Show X more..." button (use existing button styles)

5. Footer (sticky at bottom):
   - Match existing footer patterns if they exist
   - "Selected: X documents"
   - "Add to My Course →" (USE EXISTING primary button)
   - Disabled if 0 selected (match existing disabled state)

6. EDGE CASES:
   - No results: "No documents found for {course}. Start with empty course?"
   - CHECK: Does existing codebase have empty state patterns? USE THEM

COMPONENT CHECKLIST (check each before creating):
- [ ] Checkbox component exists? → use it
- [ ] Card/list item component exists? → use or extend it
- [ ] Badge/tag component exists? → use it
- [ ] Icon component/library exists? → use it
- [ ] Empty state component exists? → use it

ACCESSIBILITY:
- Checkbox labels include document name for screen readers
- Focus management on expand/collapse (match existing patterns)

Test: 
- Visit /library?q=Pharmacology
- See 8 docs, 2 pre-checked
- UI feels consistent with existing pages
- Click Continue, verify storage, redirect to /setup

GIT COMMIT: "Prompt 4: Library results page with document selection"
```

---

### Prompt 5: Setup Page (Add Own Docs)

```
Create setup page at app/setup/page.tsx

Optional step - add own docs and set exam date.

REQUIREMENTS:

1. Load onboarding data from storage
   - If not found AND no ?empty=true: redirect to /

2. Header section:
   - "Almost ready!"
   - If has library docs: "Added from Studocu: X documents" (green badge)
   - If empty: "Starting fresh - add your materials below"

3. Upload section:
   - Headline: "Have your own materials? Add them too."
   - CREATE FileUpload.tsx component:
     - Drag & drop zone
     - Click to browse fallback
     - Accepts: PDF, images, txt, doc/docx
     - Max size: 10MB per file
     - Show upload progress
   - CREATE FileList.tsx component:
     - List uploaded files
     - Each shows: icon, name, size
     - Remove button (X) for each

4. Exam date section:
   - "When is your exam?" (optional)
   - CREATE ExamDatePicker.tsx
     - Date input with calendar icon
     - Min date: today
     - Clear button

5. Actions:
   - "Skip for Now" → creates course, goes to workspace
   - "Continue →" → same
   - Both buttons visible, Continue is primary

6. On continue:
   - Generate course ID: slugify(courseName)
   - Create Course object with all data
   - Save to storage
   - Clear onboarding data
   - Navigate to /course/{id}

7. EDGE CASES:
   - File too large: toast error "File exceeds 10MB limit"
   - Unsupported type: toast error listing supported types
   - Empty state (no library docs, no uploads): allow, warn "You can add sources later"

ACCESSIBILITY:
- Upload zone keyboard accessible
- File list navigable with arrow keys

Test:
- Visit /setup with library docs from previous step
- See "Added from Studocu: 2 documents"
- Upload a file, see it in list, remove it
- Set exam date
- Click Continue, verify course created, redirected

GIT COMMIT: "Prompt 5: Setup page with file upload and exam date"
```

---

### Prompt 6: Course Context Provider

```
Before building workspace, create the state management layer.

CREATE lib/CourseContext.tsx:

This context provides:
- Current course data
- Creations list
- UI state (active tab, canvas content)
- Computed values (total sources, possible questions)
- Actions (add source, add creation, etc.)

REQUIREMENTS:

1. Provider component:
   - Takes courseId as prop
   - Loads course from storage on mount
   - Persists changes to storage
   - Handles course not found (set error state)

2. State:
   - course: Course | null
   - creations: Creation[]
   - activeTab: 'assistant' | 'creations' | 'sources'
   - canvasContent: CanvasContent (union type from types)
   - isLoading: boolean
   - error: string | null

3. Computed values:
   - totalSources: libraryDocs.length + userUploads.length
   - possibleQuestions: totalSources * 12
   - possibleWords: totalSources * 600
   - topics: flatten all covers from docs

4. Actions:
   - setActiveTab(tab)
   - setCanvasContent(content)
   - addLibraryDoc(doc)
   - addUserUpload(upload)
   - removeSource(id)
   - addCreation(creation)
   - updateQuizScore(creationId, score, weakTopics)

5. Export hook: useCourse()

6. UPDATE app/layout.tsx:
   - DO NOT wrap with provider here (it needs courseId)
   - Provider will wrap workspace page only

Test: Import context, verify types compile, no runtime errors.

GIT COMMIT: "Prompt 6: Course context provider for state management"
```

---

### Prompt 7: Course Workspace Layout

```
Create course workspace at app/course/[id]/page.tsx

═══════════════════════════════════════════════════════════════════════════════
PRE-FLIGHT CHECKLIST (Complete before writing ANY code)
═══════════════════════════════════════════════════════════════════════════════

□ I have READ CODEBASE.md section on "Project Page" completely
□ I have OPENED and READ the existing app/project/[id]/page.tsx
□ I can DRAW the existing project page layout from memory
□ I know the EXACT sidebar width: ___ px
□ I know HOW the two-panel layout is achieved (flex/grid): ___
□ I know WHAT components the existing project page imports:
  - [ ] _______________
  - [ ] _______________
  - [ ] _______________
□ I know IF there are existing tab components: YES / NO
□ I know IF there is an existing sidebar component: YES / NO
□ I know IF there is an existing header component: YES / NO
□ I know HOW mobile layout is handled in existing code
□ I will MATCH the existing project page layout exactly

If any checkbox is not complete, STOP and read the files first.

═══════════════════════════════════════════════════════════════════════════════

⚠️ CRITICAL: STUDY THE EXISTING PROJECT PAGE FIRST

Before writing ANY code:

1. OPEN app/project/[id]/page.tsx (or wherever the existing project page is)
2. READ IT COMPLETELY - understand every pattern used
3. DOCUMENT what you find:
   - How is the two-panel layout structured?
   - What wrapper components are used?
   - How wide is the sidebar? How is the width set?
   - How does the header work?
   - How are tabs implemented (if any)?
   - What components are imported?
   - What state management is used?

4. CHECK components/ folder for:
   - Any existing sidebar components
   - Any existing tab components
   - Any existing panel/layout components
   - Any existing header components

5. YOUR GOAL: Make the new workspace FEEL like the existing project page
   - Same layout approach
   - Same component patterns
   - Same styling patterns
   - Same responsive behavior

---

REQUIREMENTS (implement using patterns from existing project page):

1. Wrap page content with CourseProvider:
   - Get courseId from params
   - Pass to provider

2. WorkspaceLayout.tsx:
   - MATCH the existing project page layout structure
   - If existing uses flex, use flex
   - If existing uses grid, use grid
   - Left: TabbedSidebar (match existing sidebar width, likely 320px)
   - Right: Canvas (flex-1)
   - Gap between panels (match existing gap)

3. WorkspaceHeader.tsx:
   - MATCH the existing project page header style
   - Course name (use same text size/weight as existing)
   - If exam date: countdown "📅 Exam in X days"
   - Same padding/height as existing header

4. TabbedSidebar.tsx:
   - CHECK: Does existing project page have tabs? If yes, copy that pattern
   - Three tabs: Assistant, Creations, Sources
   - Tab buttons at top (match existing button styles)
   - Active tab highlighted (match existing highlight approach)
   - Content area below tabs (match existing content area style)

5. TabButton.tsx:
   - IF existing codebase has tab buttons, USE THOSE
   - Icon + label
   - Active/inactive states (match existing)

6. MOBILE RESPONSIVE:
   - CHECK how existing project page handles mobile
   - Copy that approach exactly
   - Don't invent new mobile patterns

7. ERROR STATE:
   - If course not found: "Course not found" + link home
   - Match existing error state patterns if they exist

REUSE CHECKLIST (check each before creating):
- [ ] Layout wrapper component exists? → use it
- [ ] Sidebar component exists? → extend it or use pattern
- [ ] Tab component exists? → use it
- [ ] Header component exists? → use it or match its style
- [ ] Panel component exists? → use it

Test:
- Navigate to /course/pharmacology-101
- See course name in header (matches existing project page style)
- See three tabs (match existing tab style)
- Click tabs, verify switching works
- Resize to mobile (matches existing mobile behavior)

GIT COMMIT: "Prompt 7: Workspace layout matching existing project page patterns"
```

5. CREATE TabButton.tsx:
   - Icon + label
   - Active/inactive states
   - Keyboard accessible

6. MOBILE RESPONSIVE (< 768px):
   - Single column layout
   - Header with hamburger menu OR
   - Bottom tab bar for navigation
   - Canvas takes full width
   - Sidebar becomes overlay/drawer when tab selected

7. ERROR STATE:
   - If course not found: "Course not found" + link home

Test:
- Navigate to /course/pharmacology-101
- See course name in header
- See three tabs, Assistant active by default
- Click tabs, verify switching works
- Resize to mobile, verify layout changes

GIT COMMIT: "Prompt 7: Workspace layout with tabbed sidebar"
```

---

### Prompt 8: Assistant Tab with Smart Suggestions

```
Build the Assistant tab - the main value driver.

CREATE AssistantTab.tsx:

⚠️ BEFORE BUILDING:
1. CHECK the existing project page sidebar - what sections does it have?
2. CHECK if there are existing section header components
3. CHECK if there are existing card components for sidebar items
4. CHECK if there's an existing progress bar component
5. CHECK if there's an existing chat/input component

MATCH EXISTING SIDEBAR PATTERNS:
- Same section spacing
- Same section header style
- Same list item style
- Same card style (if used)

1. Course Health section (top):
   - CourseHealth.tsx:
     - Progress bar (USE EXISTING if available)
     - Text: "{X} sources · {Y} questions possible"
     - Match existing sidebar section header style

2. Smart Suggestions section:
   - Section header: "💡 What can we create?" (match existing header style)
   - SmartSuggestions.tsx:
     - Generates suggestion cards from current sources
   - SuggestionCard.tsx:
     - CHECK: Use existing card component if available
     - Icon (🎯 quiz, 📝 summary, 📊 gap)
     - Title (match existing title styles)
     - Metrics line: "47 questions available" or "4 chapters, ~2,400 words"
     - Topics covered (if quiz)
     - Action button(s) (USE EXISTING button component)
     - Locked state with unlock hint

3. Suggestions to show:
   a. Quiz (always available):
      - "Generate Quiz"
      - "{possibleQuestions} questions available"
      - "Topics: {topics.slice(0,3).join(', ')}"
      - Buttons: "15 Questions" "30 Questions"
   
   b. Summary (always available):
      - "Generate Summary"
      - "{Math.ceil(totalSources)} chapters, ~{possibleWords} words"
      - Button: "Create Summary"
   
   c. Gap Analysis (3+ sources):
      - "Find Knowledge Gaps"
      - "Compare against typical exam topics"
      - If <3 sources: show locked "Add {3-total} more sources to unlock"
      - Button: "Analyze"

4. Chat section (bottom):
   - ChatInput.tsx:
     - USE EXISTING input component
     - USE EXISTING button component for send
     - Placeholder: "Ask anything about your course..."
   - For now: just UI, functionality in later prompt

5. On suggestion click:
   - Update canvasContent to loading state
   - (Generation logic in later prompt)

COMPONENT CHECKLIST:
- [ ] Progress bar exists? → use it
- [ ] Section header pattern exists? → follow it
- [ ] Card component exists? → use for suggestions
- [ ] Input component exists? → use for chat
- [ ] Button component exists? → use for actions

Test:
- See course health with correct numbers
- UI feels consistent with existing sidebar sections
- See suggestion cards with calculated metrics
- Add source, verify numbers update
- See gap analysis locked if <3 sources

GIT COMMIT: "Prompt 8: Assistant tab with smart suggestions"
```

---

### Prompt 9: Sources Tab

```
Build the Sources tab.

⚠️ BEFORE BUILDING:
1. CHECK the existing project page - does it have a sources/files section?
2. CHECK if there's an existing file list component
3. CHECK if there's an existing list item component for documents
4. CHECK section header patterns used in existing sidebar

CREATE SourcesTab.tsx:

MATCH EXISTING PATTERNS:
- Same section header style as existing sidebar
- Same list item style as existing file lists
- Same spacing between sections

1. Section: "📚 From Studocu Library"
   - MATCH existing section header style
   - List library docs from context
   - If empty: "No library documents added" (match existing empty states)
   - Each doc: SourceCard with download count

2. SourceCard.tsx:
   - CHECK: Does existing codebase have file/doc list items? BASE ON THOSE
   - Document type icon
   - Name (truncate if long)
   - Metadata: downloads for library, date for uploads
   - Click → setCanvasContent to source preview
   - Active state if currently viewing (match existing active states)
   - Remove button (optional for POC)

3. Section: "📁 My Uploads"
   - SAME section header style
   - List user uploads from context
   - If empty: "No personal uploads yet"
   - Each: SourceCard with upload date

4. Section: "💡 Recommended"
   - SAME section header style
   - Get recommended docs from mockData
   - Filter out already-added ones
   - Show 2-3 recommendations
   - RecommendedDoc.tsx:
     - USE existing card/list item pattern
     - Name + "Enables: X" or "Covers: X"
     - [+ Add] button (USE EXISTING button)
     - On add: call addLibraryDoc, show toast

5. Footer buttons:
   - [+ Add from Studocu] (USE EXISTING button style)
   - [+ Upload File] (USE EXISTING button style)
   - On upload: call addUserUpload

6. Source count badge on tab (in TabbedSidebar):
   - CHECK: Does existing have badge pattern? Use it
   - Show total source count next to Sources tab

COMPONENT CHECKLIST:
- [ ] File/document list item exists? → use as base for SourceCard
- [ ] Section header pattern exists? → follow it
- [ ] Badge component exists? → use for count
- [ ] Button component exists? → use for actions
- [ ] Empty state pattern exists? → follow it

Test:
- See library docs and uploads separated
- UI feels consistent with existing sidebar
- Click source, verify canvas updates
- Add recommended doc, verify it moves to library section
- Numbers in Assistant tab update

GIT COMMIT: "Prompt 9: Sources tab with categorized documents"
```

---

### Prompt 10: Creations Tab

```
Build the Creations tab.

⚠️ BEFORE BUILDING:
1. CHECK the existing project page - does it have a creations/outputs section?
2. CHECK for existing list item components
3. CHECK for existing tooltip/popover component
4. REUSE the same patterns from SourcesTab

CREATE CreationsTab.tsx:

MATCH EXISTING PATTERNS:
- SAME section header style as SourcesTab
- SAME list item base style (adapt for creations)
- SAME empty state style
- SAME footer button style

1. Section: "📋 My Creations"
   - MATCH section header style from other tabs
   - List from context.creations
   - If empty: "Nothing created yet. Use suggestions to get started!"
     (MATCH empty state pattern from other sections)
   - CreationCard.tsx:
     - BASE ON existing list item pattern (like SourceCard)
     - Icon based on type
     - Title
     - Date created
     - Stats: quiz shows score, summary shows word count
     - Weak topics badge for quizzes (CHECK: use existing badge if available)
     - Click → setCanvasContent to creation

2. Section: "🔓 More Available"
   - LockedFeature.tsx:
     - MATCH existing card/list item style but add locked visual
     - Lock icon
     - Feature name
     - Unlock condition (muted text)
     - Value prop description
     - Click → tooltip (CHECK: use existing tooltip/popover if available)
   
   - Features:
     a. Exam Prediction (locked unless has exam doc)
        - "Add a past exam to unlock"
        - "See which topics are most likely tested"
     
     b. Spaced Repetition (locked unless 3+ quizzes completed)
        - "Complete 3 quizzes to unlock"
        - "Remember what you learned long-term"
     
     c. Gap Analysis (show here too if locked)
        - "Add 3+ sources to unlock"
        - "Find topics you haven't covered"

3. Footer:
   - [+ Generate New] button (USE EXISTING button style)
   - On click: switch to Assistant tab

4. Creation count badge on tab (REUSE badge pattern from SourcesTab)

COMPONENT CHECKLIST:
- [ ] List item pattern exists? → base CreationCard on it
- [ ] Badge component exists? → use for stats/count
- [ ] Tooltip/popover exists? → use for locked feature details
- [ ] Empty state pattern exists? → follow it
- [ ] Button component exists? → use for footer

Test:
- Initially empty, see "Nothing created yet"
- UI consistent with Sources tab
- See locked features with value props
- Click locked feature, see tooltip
- (After quiz generation) see quiz in list

GIT COMMIT: "Prompt 10: Creations tab with locked features"
```

---

### Prompt 11: Canvas Component

```
Build the canvas (right panel).

CREATE Canvas.tsx:

1. Container:
   - Full height of workspace
   - Padding
   - Scrollable content
   - Background slightly different from sidebar

2. Content switching based on canvasContent type:
   - 'suggestions' → CanvasSuggestions
   - 'source' → CanvasSourcePreview
   - 'creation' → appropriate creation view
   - 'quiz-active' → CanvasQuiz
   - 'loading' → CanvasLoading

3. CREATE CanvasSuggestions.tsx (default view):
   - Prominent display of smart suggestions
   - Same content as AssistantTab suggestions but larger/more visual
   - "Ready to study {courseName}?"
   - Big action cards for quiz/summary

4. CREATE CanvasSourcePreview.tsx:
   - Source name and type
   - If library: download count, topics covered
   - If upload: file size, upload date
   - "Preview not available for POC" message
   - Or: simple placeholder visualization

5. CREATE CanvasLoading.tsx:
   - Centered spinner
   - Message from canvasContent.message
   - "Generating your quiz..." etc.

6. Default to 'suggestions' on page load

Test:
- Load workspace, see suggestions in canvas
- Click a source, see preview
- Verify loading state renders (mock it for now)

GIT COMMIT: "Prompt 11: Canvas component with content switching"
```

---

### Prompt 12: OpenAI API Integration

```
Set up OpenAI integration.

CREATE app/api/generate/route.ts:

1. POST handler accepting:
   {
     type: 'quiz' | 'summary' | 'chat',
     courseName: string,
     sources: { name: string; covers?: string[] }[],
     questionCount?: number,  // for quiz
     message?: string,        // for chat
   }

2. Check for OPENAI_API_KEY:
   - If missing: return mock response after 1.5s delay
   - Include "demo": true in response

3. For quiz generation:
   - Prompt OpenAI to generate quiz JSON
   - System prompt explaining format
   - Return: { questions: QuizQuestion[], demo?: boolean }

4. For summary generation:
   - Prompt OpenAI to generate markdown summary
   - Stream the response
   - Return streamed text

5. For chat:
   - Context: course name + source names
   - User message
   - Stream response

6. Error handling:
   - Catch OpenAI errors, return 500 with message
   - Timeout after 30s

7. CREATE lib/prompts.ts with prompt templates:
   - QUIZ_SYSTEM_PROMPT
   - SUMMARY_SYSTEM_PROMPT
   - CHAT_SYSTEM_PROMPT

MOCK RESPONSES (when no API key):

Quiz mock:
{
  questions: [
    { id: 'q1', question: 'What is the primary mechanism of...', options: ['A', 'B', 'C', 'D'], correctIndex: 0, topic: 'Drug Interactions' },
    // ... 14 more
  ],
  demo: true
}

Summary mock:
Streamed markdown text about the course topics.

Test:
- Call API directly with fetch in browser console
- With API key: see real response
- Without: see mock with delay

GIT COMMIT: "Prompt 12: OpenAI API integration with mock fallback"
```

---

### Prompt 13: Quiz Generation & Taking

```
Implement quiz generation and taking experience.

1. UPDATE SuggestionCard for quiz:
   - On click "15 Questions" or "30 Questions":
     - setCanvasContent({ type: 'loading', message: 'Generating your quiz...' })
     - Call /api/generate with type: 'quiz'
     - On success: setCanvasContent({ type: 'quiz-active', quiz: data })

2. CREATE CanvasQuiz.tsx:
   - Quiz header: "Quiz: {courseName}" + question count
   - Progress: "Question X of Y"
   - Question display:
     - Question text
     - 4 option buttons (full width)
     - Click option → show correct/incorrect immediately
     - Brief delay → next question
   - Track answers in local state
   - After last question → show results

3. CREATE CanvasQuizResults.tsx:
   - Score: "12/15 (80%)"
   - Visual score indicator (green/yellow/red based on %)
   - Weak topics: "Areas to review: {topics}"
   - Actions: "Try Again" "View Questions" "Back to Suggestions"

4. On quiz complete:
   - Create Creation object
   - Call addCreation
   - Update canvasContent to results

5. Keyboard support:
   - 1-4 keys select options
   - Enter to continue
   - Escape to quit (with confirm)

Test:
- Click Generate Quiz in suggestions
- See loading state
- Take quiz, answer questions
- See results with score
- Find quiz in Creations tab

GIT COMMIT: "Prompt 13: Quiz generation and taking flow"
```

---

### Prompt 14: Summary Generation

```
Implement summary generation with streaming.

1. UPDATE SuggestionCard for summary:
   - On click "Create Summary":
     - setCanvasContent({ type: 'loading', message: 'Creating summary...' })
     - Call /api/generate with type: 'summary'
     - Stream response to canvas

2. CREATE CanvasSummary.tsx:
   - Header: "Summary: {courseName}"
   - Streaming markdown display
   - Use a markdown renderer (check if template has one)
   - Or: simple formatted text with headings
   - While streaming: show cursor/typing indicator
   - When done: show completion state

3. Streaming implementation:
   - Use fetch with streaming response
   - Update canvas content as chunks arrive
   - Handle stream end

4. On complete:
   - Create Creation object with full text
   - Call addCreation
   - Show "Saved to Creations" toast

Test:
- Click Create Summary
- See loading, then streaming text
- Wait for completion
- Find summary in Creations tab
- Click summary in Creations, see full content

GIT COMMIT: "Prompt 14: Summary generation with streaming"
```

---

### Prompt 15: Gap Analysis

```
Implement gap analysis (available with 3+ sources).

1. UPDATE SmartSuggestions:
   - Show Gap Analysis card only if totalSources >= 3
   - If <3: show locked state with "Add X more sources"

2. On click "Analyze":
   - setCanvasContent loading
   - Calculate gaps from mock data:
     - Covered topics: from source.covers
     - Strength: count how many sources cover it
     - Missing: topics in courseTopics not in any source
     - Recommendations: docs that cover missing topics

3. CREATE CanvasGapAnalysis.tsx:
   - Header: "Knowledge Gap Analysis"
   - Section "✅ Topics Covered":
     - List topics with strength indicator
     - Strong (3+): green
     - Medium (2): yellow  
     - Weak (1): orange
   - Section "⚠️ Not Yet Covered":
     - List missing topics
   - Section "📚 Recommended":
     - Docs that would fill gaps
     - [+ Add] button for each

4. On add recommended:
   - Add to library docs
   - Refresh gap analysis
   - Toast: "Added! Reanalyze to see updated coverage"

5. Save as Creation (optional for POC)

Test:
- With 2 sources: see gap analysis locked
- Add third source
- See gap analysis available
- Click Analyze, see results
- Add recommended doc

GIT COMMIT: "Prompt 15: Gap analysis feature"
```

---

### Prompt 16: Chat Q&A

```
Implement chat in Assistant tab.

1. UPDATE ChatInput.tsx:
   - Controlled input
   - Send on Enter or button click
   - Disable while sending

2. Add chat state to context (or local to AssistantTab):
   - messages: { role: 'user' | 'assistant', content: string }[]
   - isLoading: boolean

3. CREATE ChatMessages.tsx:
   - Display message history
   - User messages: right-aligned, blue background
   - Assistant messages: left-aligned, gray background
   - Scroll to bottom on new message

4. On send:
   - Add user message to state
   - Set loading
   - Call /api/generate with type: 'chat'
   - Stream response
   - Add assistant message on complete

5. Session only:
   - Don't persist to storage
   - Clear on page refresh

6. Empty state:
   - "Ask anything about {courseName}..."
   - Quick suggestions: "Explain X" "Compare Y and Z"

Test:
- Type question, send
- See user message appear
- See assistant response stream
- Have short conversation

GIT COMMIT: "Prompt 16: Chat Q&A functionality"
```

---

### Prompt 17: Add More Sources Flow

```
Implement adding sources from workspace.

1. UPDATE SourcesTab footer buttons:

2. "Add from Studocu" button:
   - Opens modal with library search
   - CREATE AddFromLibraryModal.tsx:
     - Search input
     - List of docs (from mockData, filtered)
     - Filter out already-added docs
     - Checkboxes to select
     - [Add Selected] button
   - On add: call addLibraryDoc for each

3. "Upload File" button:
   - Opens file picker (reuse FileUpload logic)
   - On select: call addUserUpload
   - Show toast: "File added!"

4. When source added:
   - Smart suggestions numbers update (automatic via context)
   - Toast: "Source added! {X} more questions available"
   - If this triggers unlock (3+ sources): unlock toast

5. UPDATE recommendations in SourcesTab:
   - [+ Add] button works
   - Remove from recommendations after adding

Test:
- Click "Add from Studocu", search, add doc
- Click "Upload", select file, see it added
- Verify suggestion numbers increase
- Add 3rd source, see Gap Analysis unlock

GIT COMMIT: "Prompt 17: Add more sources flow"
```

---

### Prompt 18: Unlock System & Toasts

```
Implement feature unlocks and toast notifications.

1. CREATE components/Toast.tsx:
   - Slide-in from bottom-right
   - Auto-dismiss after 4s
   - Types: success, info, warning, error
   - Close button

2. CREATE lib/useToast.ts hook:
   - showToast(message, type)
   - ToastProvider component
   - Add to layout

3. Track unlock conditions in context:
   - hasExamDoc: sources.some(s => s.type === 'exam')
   - completedQuizzes: creations.filter(c => c.type === 'quiz' && c.data.score).length
   - hasGapAnalysis: totalSources >= 3

4. Watch for unlock events:
   - When condition becomes true for first time
   - Show celebration toast: "🎉 {Feature} unlocked!"
   - Maybe: confetti animation (optional)

5. UPDATE LockedFeature to show unlocked state:
   - Once unlocked, show as available (not in locked section)
   - Or move to suggestions

6. Persist unlock state:
   - Could be derived from course data
   - Or store explicitly

Test:
- Toast appears on various actions
- Add exam doc, see Exam Prediction unlock toast
- Complete 3 quizzes, see Spaced Repetition unlock
- Unlocked features appear correctly

GIT COMMIT: "Prompt 18: Unlock system with toast notifications"
```

---

### Prompt 19: Error Handling

```
Add comprehensive error handling.

1. API errors:
   - Wrap all API calls in try/catch
   - Show toast with friendly message
   - Provide retry option where appropriate

2. No API key - Demo Mode:
   - Check for demo flag in responses
   - Show "[Demo Mode]" badge in header
   - Toast on first load: "Running in demo mode"

3. Empty states:
   - Creations tab: "Nothing yet" + CTA
   - Sources tab sections: appropriate messages
   - Canvas: never empty (default to suggestions)

4. Loading states:
   - CREATE Skeleton.tsx component
   - Use for lists while loading
   - Spinner for actions

5. Network errors:
   - Catch fetch failures
   - "Connection error. Check your internet and try again."
   - Retry button

6. Storage errors:
   - Catch localStorage quota exceeded
   - "Storage full. Try clearing old courses."
   - Graceful degradation

7. 404 handling:
   - Course not found: friendly message + home link
   - Invalid route: Next.js default or custom

Test:
- Disconnect network, trigger API call, see error
- Remove API key, verify demo mode works
- Fill localStorage, verify error handling
- Visit invalid course ID

GIT COMMIT: "Prompt 19: Comprehensive error handling"
```

---

### Prompt 20: UI Polish - Layout & Spacing

```
Polish the UI for consistency and professional appearance.

1. Spacing audit:
   - All padding/margin uses design tokens
   - Consistent gaps between sections (24px)
   - Card padding consistent (16px or 20px)

2. Typography audit:
   - Headings: font-semibold, appropriate sizes
   - Body: text-base, text-secondary
   - Small text: text-sm, text-muted
   - No arbitrary font sizes

3. Color audit:
   - Primary actions: blue
   - Secondary actions: gray
   - Success: green
   - Warning: amber/orange
   - Error: red
   - No arbitrary colors

4. Card consistency:
   - All cards have same border-radius
   - Same shadow treatment
   - Consistent hover states

5. Button consistency:
   - Primary: solid blue, white text
   - Secondary: border, gray text
   - Ghost: no border, just text
   - All have hover states

6. Responsive check:
   - Desktop (1280px+): full experience
   - Tablet (768-1279px): adjusted spacing
   - Mobile (<768px): single column

7. Remove any arbitrary Tailwind classes:
   - No [custom-values] unless absolutely necessary

Test: Visual review on all breakpoints, screenshot and compare

GIT COMMIT: "Prompt 20: UI polish - layout and spacing"
```

---

### Prompt 21: UI Polish - Micro-interactions

```
Add subtle animations and micro-interactions.

1. Tab transitions:
   - Underline slides to active tab
   - Content fades in (opacity transition)
   - 150-200ms duration

2. Card hover effects:
   - Slight lift (transform: translateY(-2px))
   - Shadow increase
   - 150ms transition

3. Button interactions:
   - Scale down slightly on press (0.98)
   - Color transition on hover
   - Loading spinner when processing

4. Toast animations:
   - Slide in from right
   - Fade out on dismiss
   - Stack if multiple

5. Number updates:
   - When source added, numbers animate
   - Simple counter animation or highlight flash

6. Loading skeletons:
   - Pulse animation
   - Appropriate shapes for content

7. Quiz interactions:
   - Option highlight on hover
   - Correct/incorrect color flash
   - Progress bar animation

8. RESPECT prefers-reduced-motion:
   - Media query check
   - Reduce/disable animations for users who prefer it

CSS only - no animation libraries.

Test: 
- Interact with all elements, feel the polish
- Enable reduced motion in OS, verify simplified animations

GIT COMMIT: "Prompt 21: Micro-interactions and animations"
```

---

### Prompt 22: Documentation & Cleanup

```
Final documentation and code cleanup.

1. UPDATE README.md:
   - Project overview (what this POC tests)
   - Screenshots of key screens
   - Setup instructions step by step
   - Environment variables explanation
   - How to run locally
   - How to test key flows
   - Mock data explanation
   - Known limitations

2. Review and clean:
   - Remove all console.log statements
   - Remove commented-out code
   - Remove unused imports
   - Remove unused components/files

3. Code organization:
   - Ensure consistent file naming
   - Ensure consistent export patterns
   - Check all types are defined

4. CREATE TESTING.md:
   - Test script for user testing
   - Steps to walk through
   - What to observe
   - Questions to ask

5. Final checks:
   - npm run build passes
   - npm run lint passes (or acceptable warnings)
   - All links work
   - All flows complete

Test: Fresh clone, follow README exactly, verify everything works

GIT COMMIT: "Prompt 22: Documentation and cleanup"
```

---

### Prompt 23: Vercel Deployment

```
Deploy to Vercel with protection.

1. robots.txt (public/robots.txt):
   User-agent: *
   Disallow: /

2. Meta tags (in layout.tsx):
   <meta name="robots" content="noindex, nofollow" />

3. Password protection:
   - CREATE middleware.ts at root
   - Check for auth cookie
   - If not authed: redirect to /login
   - CREATE app/login/page.tsx
     - Simple password input
     - Check against SITE_PASSWORD env var
     - Set cookie on success
     - Redirect to intended page

4. Environment variables in Vercel:
   - OPENAI_API_KEY
   - SITE_PASSWORD

5. Vercel setup:
   - Connect GitHub repo
   - Add environment variables
   - Deploy
   - Test live URL

6. UPDATE README:
   - Add live URL
   - Add password (or note to get from team)
   - Deployment instructions

Test:
- Visit URL without auth, see login
- Enter password, get access
- Full flow works on production
- Check robots.txt accessible
- Verify noindex in source

GIT COMMIT: "Prompt 23: Vercel deployment with password protection"
```

---

## 13. Testing Protocol

### Quick Test Script (20 min)

**Course Setup (8 min)**
1. **Search (2 min)** — Enter "Pharmacology 101", click Find
2. **Library (3 min)** — See docs, check/uncheck, continue
3. **Setup (2 min)** — Upload a file, set exam date
4. **Arrive (1 min)** — See workspace with suggestions

**Workspace (10 min)**
5. **Suggestions (2 min)** — Review cards, verify numbers match sources
6. **Quiz (4 min)** — Generate 15 questions, complete quiz
7. **Sources (2 min)** — Check organization, add recommended doc
8. **Creations (2 min)** — See quiz result, check locked features

**Edge Cases (2 min)**
9. **Mobile** — Resize, verify usable
10. **Errors** — Try offline action, see error handling

### Debrief Questions
- Did starting with library docs feel valuable or like cheating?
- Were the smart suggestions clear about what you'd get?
- Did the numbers ("47 questions") influence your actions?
- Would you add your own docs or just use library?
- Would you come back before your exam?

---

## 14. Success Criteria

POC validates:

1. ✅/❌ Course-first feels better than upload-first
2. ✅/❌ Library provides meaningful instant value
3. ✅/❌ Concrete numbers drive more action than generic prompts
4. ✅/❌ Users understand smart suggestions
5. ✅/❌ Users would add own docs on top
6. ✅/❌ Users would return

---

## 15. Timeline

| Phase | Prompts | Time |
|-------|---------|------|
| Setup & Foundation | 1-3 | 2-3 hours |
| Course Flow | 4-6 | 1 day |
| Workspace Structure | 7-11 | 1 day |
| AI Features | 12-16 | 1.5 days |
| System Features | 17-19 | 0.5 day |
| Polish | 20-22 | 1 day |
| Deploy | 23 | 1-2 hours |

**Total: ~5-6 days**

---

## 16. Open Questions

- [ ] Deployment password?
- [ ] Test participants from Learning Impact Lab?
- [ ] How many library docs to pre-select? (Currently: top 2)
- [ ] Should exam date be more prominent?
- [ ] Mobile: full responsive or "not broken"?
- [ ] Track analytics for research?

---

## 17. Mock Data

### Studocu Library
See lib/mockData.ts (Prompt 3)

### Topics by Course
```typescript
const courseTopics: Record<string, string[]> = {
  pharmacology: ['Drug Interactions', 'Pharmacokinetics', 'Dosing', 'Side Effects', 'Drug Classes', 'ADME', 'Half-life'],
  psychology: ['Cognition', 'Development', 'Social Psychology', 'Abnormal Psychology', 'Research Methods'],
};
```

### Mock Quiz Response
```typescript
const mockQuizResponse: QuizData = {
  questions: [
    {
      id: 'q1',
      question: 'What is the primary mechanism of action for beta-blockers?',
      options: [
        'Block beta-adrenergic receptors',
        'Block alpha-adrenergic receptors',
        'Stimulate acetylcholine release',
        'Inhibit sodium channels'
      ],
      correctIndex: 0,
      topic: 'Drug Classes'
    },
    // ... 14 more questions
  ]
};
```

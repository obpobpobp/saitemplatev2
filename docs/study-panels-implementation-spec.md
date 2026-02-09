# Study Panels Implementation Spec
## Sources Panel + Creations Panel

A comprehensive guide for building the two main content panels in the Course Container POC.

---

## Philosophy: Two Panels, Two Mental Models

| Panel | Purpose | Mental Model | Organization |
|-------|---------|--------------|--------------|
| **Sources** | Input materials | "Stuff I'm studying" | Timeline (when added) |
| **Creations** | Output artifacts | "Prep I've made" | Flexible (3 views) |

**Sources** = passive library. Simple, chronological.
**Creations** = active work. Goal-oriented, needs flexibility.

---

# Part 1: Shared Data Models

## Core Types

Add to `/types/index.ts`:

```typescript
// ============================================
// SOURCES
// ============================================

interface Source {
  id: string;
  name: string;
  addedAt: Date;              // When added to course - drives timeline
  
  // Origin
  origin: 'upload' | 'studocu';
  
  // Studocu-specific
  studocuId?: string;
  downloads?: number;
  
  // Upload-specific
  fileSize?: number;          // bytes
  fileType?: 'pdf' | 'doc' | 'image' | 'txt' | 'other';
  
  // Study value
  questionCount: number;      // AI-estimated questions this enables
  wordCount?: number;
  topics?: string[];
  
  // Flags
  isExam?: boolean;           // Past exam - unlocks prediction
  isPinned?: boolean;         // Future: pinned references
}

interface SourceRecommendation {
  id: string;
  name: string;
  downloads: number;
  unlocks?: string;           // "exam prediction", "12 more questions"
  topics?: string[];
}

// ============================================
// CREATIONS
// ============================================

type CreationType = 'mock-exam' | 'flashcards' | 'summary' | 'quiz';
type CreationStatus = 'not-started' | 'in-progress' | 'completed';
type CreationsViewMode = 'recent' | 'exam' | 'type';

interface Creation {
  id: string;
  type: CreationType;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Exam association (null = "Ongoing")
  examId?: string | null;
  
  // Status
  status: CreationStatus;
  
  // Type-specific stats
  questionCount?: number;     // mock-exam, quiz
  cardCount?: number;         // flashcards
  masteredCount?: number;     // flashcards
  bestScore?: number;         // percentage (0-100)
  attempts?: number;          // mock-exam
  wordCount?: number;         // summary
  
  // Lineage
  sourceIds: string[];        // Which sources were used
}

// ============================================
// EXAMS (for Creations organization)
// ============================================

interface Exam {
  id: string;
  name: string;               // "Final Exam", "Midterm II"
  date?: Date;                // Optional - some students don't know
  isCompleted: boolean;       // Past date or manually marked
  weight?: number;            // e.g., 40 (percent of grade)
  createdAt: Date;
}

// ============================================
// COURSE (updated)
// ============================================

interface Course {
  id: string;
  name: string;
  code?: string;
  color?: string;
  
  // Content
  sources: Source[];
  creations: Creation[];
  exams: Exam[];
  
  // Dates
  examDate?: Date;            // Legacy: primary exam date
  createdAt: Date;
  updatedAt: Date;
  
  // Preferences
  creationsViewMode: CreationsViewMode;
}
```

---

## Helper Functions

Add to `/lib/utils/dateHelpers.ts`:

```typescript
/**
 * Check if date falls within current week (Sunday to Saturday)
 */
export function isThisWeek(date: Date): boolean {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
  startOfWeek.setHours(0, 0, 0, 0);
  
  return new Date(date) >= startOfWeek;
}

/**
 * Check if date falls within previous week
 */
export function isLastWeek(date: Date): boolean {
  const now = new Date();
  const startOfThisWeek = new Date(now);
  startOfThisWeek.setDate(now.getDate() - now.getDay());
  startOfThisWeek.setHours(0, 0, 0, 0);
  
  const startOfLastWeek = new Date(startOfThisWeek);
  startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);
  
  const d = new Date(date);
  return d >= startOfLastWeek && d < startOfThisWeek;
}

/**
 * Format date relative to now
 */
export function formatRelativeDate(date: Date): string {
  const now = new Date();
  const d = new Date(date);
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/**
 * Format days until a future date
 */
export function formatDaysUntil(date: Date): string {
  const now = new Date();
  const d = new Date(date);
  const diffMs = d.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return 'Past';
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays < 7) return `${diffDays} days away`;
  if (diffDays < 14) return '1 week away';
  
  return `${Math.floor(diffDays / 7)} weeks away`;
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Format large numbers (1000 → 1k)
 */
export function formatNumber(num: number): string {
  if (num < 1000) return String(num);
  if (num < 10000) return `${(num / 1000).toFixed(1)}k`;
  return `${Math.round(num / 1000)}k`;
}
```

---

# Part 2: Sources Panel

## Overview

A unified timeline where all study materials live together, organized by when the user added them.

**Core principle:** `addedAt` drives the timeline. `origin` (upload vs studocu) is just metadata.

---

## Component Structure

```
components/sources/
├── SourcesPanel.tsx           # Main container
├── SourceDropZone.tsx         # Upload + browse entry point
├── SourceList.tsx             # Timeline renderer with groupings
├── SourceCard.tsx             # Individual source item
├── SourceRecommendation.tsx   # Ghost suggestion card
├── StorageWidget.tsx          # Stats + storage bar
└── EmptySourcesState.tsx      # Empty state display
```

---

## Visual Specification

### Full Panel Layout

```
┌─────────────────────────────────────────────┐
│  ┌─────────────────────────────────────┐    │
│  │                                     │    │
│  │  ⬆  Add this week's materials       │    │  ← SourceDropZone
│  │                                     │    │
│  │  Drop files  ·  Browse Studocu      │    │
│  │                                     │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  THIS WEEK ─────────────────────────────    │  ← Only if hasThisWeekItems
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │ 📄 Lecture 5 Notes.pdf       Today  │    │  ← SourceCard (upload)
│  │    +12 questions                    │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │ 📘 Midterm 2024 Solutions    Today  │    │  ← SourceCard (studocu)
│  │    from Studocu · +15 questions     │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  EARLIER ───────────────────────────────    │  ← Only if hasThisWeek AND hasEarlier
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │ 📄 Lecture 4 Notes.pdf      Nov 24  │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │ 📘 Nursing Drug Handbook    Nov 20  │    │
│  │    from Studocu                     │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐    │
│  │  💡 Past exam available            │    │  ← SourceRecommendation
│  │     Unlocks exam prediction   [+]  │    │
│  └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘    │
│                                             │
│  ─────────────────────────────────────────  │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  📦  6 sources · 72 questions       │    │  ← StorageWidget
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░  18 MB      │    │
│  └─────────────────────────────────────┘    │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Component Specifications

### SourceDropZone.tsx

**Visual:**
```
┌─────────────────────────────────────┐
│                                     │
│  ⬆  Add this week's materials       │
│                                     │
│  Drop files  ·  Browse Studocu      │
│       ↑               ↑             │
│   clickable       clickable         │
└─────────────────────────────────────┘
```

**States:**

| State | Appearance |
|-------|------------|
| Default | Dashed border `border-gray-200`, light bg |
| Drag hover | Border `border-blue-400`, bg `bg-blue-50` |
| Uploading | Progress bar, "Adding..." text |

**Props:**
```typescript
interface SourceDropZoneProps {
  onFilesSelected: (files: File[]) => void;
  onBrowseStudocu: () => void;
  isUploading?: boolean;
  uploadProgress?: number;
}
```

**Behavior:**
- Entire zone = drop target
- "Drop files" → opens file picker
- "Browse Studocu" → opens modal/sheet
- Accepts: `.pdf`, `.doc`, `.docx`, `.txt`, `.png`, `.jpg`, `.jpeg`
- Max file size: 10MB per file

**Styling:**
```css
/* Container */
rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-6
hover:border-gray-300 transition-colors

/* Drag active */
border-blue-400 bg-blue-50

/* Icon */
text-gray-400 w-6 h-6 mx-auto mb-2

/* Title */
text-sm font-medium text-gray-700 text-center

/* Actions */
text-xs text-gray-500 text-center mt-1
/* Clickable parts */
text-blue-600 hover:text-blue-700 cursor-pointer
```

---

### SourceList.tsx

**Grouping Logic:**
```typescript
interface SourceListProps {
  sources: Source[];
  recommendations: SourceRecommendation[];
  activeSourceId?: string;
  onSourceClick: (source: Source) => void;
  onSourceRemove: (sourceId: string) => void;
  onAddRecommendation: (rec: SourceRecommendation) => void;
}

function SourceList({ sources, recommendations, ... }: SourceListProps) {
  // Sort by addedAt descending
  const sorted = [...sources].sort((a, b) => 
    new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
  );
  
  const thisWeek = sorted.filter(s => isThisWeek(s.addedAt));
  const earlier = sorted.filter(s => !isThisWeek(s.addedAt));
  
  return (
    <div className="space-y-2">
      {/* This Week Section */}
      {thisWeek.length > 0 && (
        <>
          <SectionDivider label="THIS WEEK" />
          {thisWeek.map(source => (
            <SourceCard 
              key={source.id} 
              source={source}
              isNew={true}  // Show +X questions
              ...
            />
          ))}
        </>
      )}
      
      {/* Earlier Section */}
      {earlier.length > 0 && (
        <>
          {thisWeek.length > 0 && <SectionDivider label="EARLIER" />}
          {earlier.map(source => (
            <SourceCard 
              key={source.id} 
              source={source}
              isNew={false}
              ...
            />
          ))}
        </>
      )}
      
      {/* Recommendation (max 1) */}
      {recommendations.slice(0, 1).map(rec => (
        <SourceRecommendation 
          key={rec.id}
          recommendation={rec}
          onAdd={() => onAddRecommendation(rec)}
        />
      ))}
    </div>
  );
}
```

**Divider Component:**
```
THIS WEEK ─────────────────────────────
```

```typescript
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
        {label}
      </span>
      <div className="flex-1 border-t border-gray-100" />
    </div>
  );
}
```

---

### SourceCard.tsx

**Visual Variants:**

```
Upload (recent):
┌─────────────────────────────────────┐
│ 📄 Lecture 5 Notes.pdf       Today  │
│    +12 questions                    │
└─────────────────────────────────────┘

Studocu (recent):
┌─────────────────────────────────────┐
│ 📘 Midterm 2024              Today  │
│    from Studocu · +15 questions     │
└─────────────────────────────────────┘

Studocu (older):
┌─────────────────────────────────────┐
│ 📘 Nursing Drug Handbook    Nov 20  │
│    from Studocu · 2.3k downloads    │
└─────────────────────────────────────┘
```

**Props:**
```typescript
interface SourceCardProps {
  source: Source;
  isActive?: boolean;
  isNew?: boolean;           // Recently added, show +X questions
  onClick: () => void;
  onRemove: () => void;
}
```

**Icon Logic:**
```typescript
function getSourceIcon(source: Source): string {
  if (source.isExam) return '📝';
  if (source.origin === 'studocu') return '📘';
  
  switch (source.fileType) {
    case 'pdf': return '📄';
    case 'doc': return '📝';
    case 'image': return '🖼️';
    default: return '📄';
  }
}
```

**Secondary Text Logic:**
```typescript
function getSourceSecondary(source: Source, isNew: boolean): string {
  const parts: string[] = [];
  
  if (source.origin === 'studocu') {
    parts.push('from Studocu');
  }
  
  if (isNew && source.questionCount > 0) {
    parts.push(`+${source.questionCount} questions`);
  } else if (source.origin === 'studocu' && source.downloads) {
    parts.push(`${formatNumber(source.downloads)} downloads`);
  } else if (source.fileSize) {
    parts.push(formatFileSize(source.fileSize));
  }
  
  return parts.join(' · ');
}
```

**Styling:**
```css
/* Container */
group flex items-start gap-3 p-3 rounded-lg cursor-pointer
hover:bg-gray-50 transition-colors

/* Active state */
bg-blue-50 ring-1 ring-blue-200

/* Icon */
text-lg flex-shrink-0 mt-0.5

/* Content */
flex-1 min-w-0

/* Name */
text-sm font-medium text-gray-900 truncate

/* Date */
text-xs text-gray-400 flex-shrink-0

/* Secondary */
text-xs text-gray-500 mt-0.5
/* +X questions highlight */
text-green-600 font-medium

/* Remove button */
opacity-0 group-hover:opacity-100 transition-opacity
p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-gray-600
```

---

### SourceRecommendation.tsx

**Visual:**
```
┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
│  💡 Past exam available            │
│     Unlocks exam prediction   [+]  │
└ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
```

**Props:**
```typescript
interface SourceRecommendationProps {
  recommendation: SourceRecommendation;
  onAdd: () => void;
}
```

**Styling:**
```css
/* Container */
flex items-start gap-3 p-3 rounded-lg
border-2 border-dashed border-gray-200 bg-gray-50/30

/* Icon */
text-lg

/* Title */
text-sm font-medium text-gray-700

/* Subtitle */
text-xs text-gray-500

/* Add button */
ml-auto text-sm font-medium text-blue-600 hover:text-blue-700
px-2 py-1 rounded hover:bg-blue-50
```

---

### StorageWidget.tsx

**Visual:**
```
┌─────────────────────────────────────┐
│  📦  6 sources · 72 questions       │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░  18 MB      │
└─────────────────────────────────────┘
```

**Props:**
```typescript
interface StorageWidgetProps {
  sourceCount: number;
  questionCount: number;
  usedMB: number;
  maxMB?: number;  // Default 100
}
```

**Progress Color Logic:**
```typescript
function getProgressColor(percent: number): string {
  if (percent < 70) return 'bg-blue-500';
  if (percent < 90) return 'bg-amber-500';
  return 'bg-red-500';
}
```

**Styling:**
```css
/* Container */
p-3 rounded-lg bg-gray-50 border border-gray-100

/* Stats row */
flex items-center gap-2 text-sm text-gray-700

/* Icon */
text-base

/* Progress container */
h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden

/* Progress fill */
h-full rounded-full transition-all duration-300

/* Size text */
text-xs text-gray-500 mt-1 text-right
```

---

### Empty State

```
┌─────────────────────────────────────┐
│  ⬆  Add this week's materials       │
│     Drop files · Browse Studocu     │
└─────────────────────────────────────┘

┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
│                                     │
│       📚                            │
│                                     │
│  No sources yet                     │
│                                     │
│  Add your notes, slides, or find    │
│  materials on Studocu to start      │
│  generating practice questions.     │
│                                     │
└ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘

┌─────────────────────────────────────┐
│  📦  0 sources · 0 questions        │
│  ░░░░░░░░░░░░░░░░░░░░░░░  0 MB      │
└─────────────────────────────────────┘
```

---

# Part 3: Creations Panel

## Overview

A flexible panel where all generated study artifacts live. Users can switch between three views based on their current mental model.

**Core principle:** Same data, three lenses. User picks what fits their question.

---

## Component Structure

```
components/creations/
├── CreationsPanel.tsx         # Main container with view toggle
├── CreationsViewToggle.tsx    # Segmented control for view switching
├── CreationsList.tsx          # Renders list based on active view
├── CreationCard.tsx           # Individual creation item
├── ExamSection.tsx            # Collapsible exam group (for exam view)
├── TypeSection.tsx            # Type group header (for type view)
├── EmptyCreationsState.tsx    # Empty state per view
└── AddExamPrompt.tsx          # Prompt to add exam dates
```

---

## Visual Specification

### Panel with View Toggle

```
┌─────────────────────────────────────────────┐
│                                             │
│  ┌─────────────────────────┐                │
│  │ + Create New            │         ← CTA  │
│  └─────────────────────────┘                │
│                                             │
│  ┌──────────┬──────────┬──────────┐         │
│  │  Recent  │   Exam   │   Type   │  Toggle │
│  └──────────┴──────────┴──────────┘         │
│                                             │
│  ... content changes based on view ...      │
│                                             │
└─────────────────────────────────────────────┘
```

---

## View 1: Recent (Timeline)

Groups by when created: This Week → Last Week → Earlier

```
┌─────────────────────────────────────────────┐
│  ┌─────────────────────────┐                │
│  │ + Create New            │                │
│  └─────────────────────────┘                │
│                                             │
│  ┌──────────┬──────────┬──────────┐         │
│  │░░Recent░░│   Exam   │   Type   │         │
│  └──────────┴──────────┴──────────┘         │
│                                             │
│  THIS WEEK ─────────────────────────────    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │ 📝 Mock Exam #3            Today    │    │
│  │    Final · 15 questions · Not started│   │
│  └─────────────────────────────────────┘    │
│  ┌─────────────────────────────────────┐    │
│  │ 🎴 Drug Interactions     Yesterday  │    │
│  │    Final · 48 cards · 12 mastered   │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  LAST WEEK ─────────────────────────────    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │ 📝 Mock Exam #2            Nov 25   │    │
│  │    Final · 82% best                 │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  EARLIER ───────────────────────────────    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │ 📝 Midterm Practice        Nov 8    │    │
│  │    Midterm II · 85% best            │    │
│  └─────────────────────────────────────┘    │
│                                             │
└─────────────────────────────────────────────┘
```

**Grouping Logic:**
```typescript
function groupByRecency(creations: Creation[]) {
  const sorted = [...creations].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  return {
    thisWeek: sorted.filter(c => isThisWeek(c.createdAt)),
    lastWeek: sorted.filter(c => isLastWeek(c.createdAt)),
    earlier: sorted.filter(c => !isThisWeek(c.createdAt) && !isLastWeek(c.createdAt)),
  };
}
```

**Card shows:** Type icon, name, date, **exam tag**, stats

---

## View 2: Exam (Goal-based)

Groups by exam: Upcoming exams → Completed exams → Ongoing

```
┌─────────────────────────────────────────────┐
│  ┌─────────────────────────┐                │
│  │ + Create New            │                │
│  └─────────────────────────┘                │
│                                             │
│  ┌──────────┬──────────┬──────────┐         │
│  │  Recent  │░░░Exam░░░│   Type   │         │
│  └──────────┴──────────┴──────────┘         │
│                                             │
│  FINAL EXAM · Dec 15 ───────────────────    │
│  14 days away · 4 items                     │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │ 📝 Mock Exam #3            Today    │    │
│  │    15 questions · Not started       │    │
│  └─────────────────────────────────────┘    │
│  ┌─────────────────────────────────────┐    │
│  │ 📝 Mock Exam #2            Nov 25   │    │
│  │    82% · 2 attempts                 │    │
│  └─────────────────────────────────────┘    │
│  ┌─────────────────────────────────────┐    │
│  │ 📝 Mock Exam #1            Nov 20   │    │
│  │    68% · 1 attempt                  │    │
│  └─────────────────────────────────────┘    │
│  ┌─────────────────────────────────────┐    │
│  │ 🎴 Drug Interactions     Yesterday  │    │
│  │    48 cards · 12 mastered           │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  MIDTERM II · Nov 10 ✓ ─────────────────    │
│  Completed                             [▾]  │
│  ┌─────────────────────────────────────┐    │
│  │ 📝 Midterm Practice        Nov 8    │    │
│  │    85% · Best attempt               │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ONGOING ───────────────────────────────    │
│  Not tied to an exam                        │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │ 📋 Running Notes           Nov 5    │    │
│  │    1,240 words                      │    │
│  └─────────────────────────────────────┘    │
│                                             │
└─────────────────────────────────────────────┘
```

**Grouping Logic:**
```typescript
function groupByExam(creations: Creation[], exams: Exam[]) {
  const now = new Date();
  
  // Sort exams: upcoming first (by date), then completed
  const upcomingExams = exams
    .filter(e => !e.isCompleted && e.date && new Date(e.date) > now)
    .sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime());
  
  const completedExams = exams
    .filter(e => e.isCompleted)
    .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime());
  
  // Group creations by examId
  const byExam: Record<string, Creation[]> = {};
  const ongoing: Creation[] = [];
  
  creations.forEach(c => {
    if (c.examId) {
      byExam[c.examId] = byExam[c.examId] || [];
      byExam[c.examId].push(c);
    } else {
      ongoing.push(c);
    }
  });
  
  // Sort creations within each exam by date
  Object.values(byExam).forEach(arr => {
    arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  });
  
  return { upcomingExams, completedExams, byExam, ongoing };
}
```

**Section header shows:** Exam name, date, days away or ✓, item count
**Card shows:** Type icon, name, date, **progress stats** (no exam tag - context is clear)

---

## View 3: Type (Inventory)

Groups by creation type: Mock Exams → Flashcards → Summaries → Quizzes

```
┌─────────────────────────────────────────────┐
│  ┌─────────────────────────┐                │
│  │ + Create New            │                │
│  └─────────────────────────┘                │
│                                             │
│  ┌──────────┬──────────┬──────────┐         │
│  │  Recent  │   Exam   │░░░Type░░░│         │
│  └──────────┴──────────┴──────────┘         │
│                                             │
│  MOCK EXAMS · 4 ────────────────────────    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │ 📝 Mock Exam #3            Today    │    │
│  │    Final · Not started              │    │
│  └─────────────────────────────────────┘    │
│  ┌─────────────────────────────────────┐    │
│  │ 📝 Mock Exam #2            Nov 25   │    │
│  │    Final · 82%                      │    │
│  └─────────────────────────────────────┘    │
│  ┌─────────────────────────────────────┐    │
│  │ 📝 Mock Exam #1            Nov 20   │    │
│  │    Final · 68%                      │    │
│  └─────────────────────────────────────┘    │
│  ┌─────────────────────────────────────┐    │
│  │ 📝 Midterm Practice        Nov 8    │    │
│  │    Midterm II · 85%                 │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  FLASHCARDS · 2 ────────────────────────    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │ 🎴 Drug Interactions     Yesterday  │    │
│  │    Final · 48 cards                 │    │
│  └─────────────────────────────────────┘    │
│  ┌─────────────────────────────────────┐    │
│  │ 🎴 Key Terms               Nov 15   │    │
│  │    Midterm II · 32 cards            │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  SUMMARIES · 1 ─────────────────────────    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │ 📋 Running Notes           Nov 5    │    │
│  │    Ongoing · 1,240 words            │    │
│  └─────────────────────────────────────┘    │
│                                             │
└─────────────────────────────────────────────┘
```

**Grouping Logic:**
```typescript
const TYPE_ORDER: CreationType[] = ['mock-exam', 'flashcards', 'summary', 'quiz'];
const TYPE_LABELS: Record<CreationType, string> = {
  'mock-exam': 'Mock Exams',
  'flashcards': 'Flashcards',
  'summary': 'Summaries',
  'quiz': 'Quizzes',
};

function groupByType(creations: Creation[]) {
  const groups: Record<CreationType, Creation[]> = {
    'mock-exam': [],
    'flashcards': [],
    'summary': [],
    'quiz': [],
  };
  
  creations.forEach(c => {
    groups[c.type].push(c);
  });
  
  // Sort each group by date
  Object.values(groups).forEach(arr => {
    arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  });
  
  return groups;
}
```

**Section header shows:** Type name, count
**Card shows:** Type icon, name, date, **exam tag**, type-specific stats

---

## Component Specifications

### CreationsViewToggle.tsx

**Visual:**
```
┌──────────┬──────────┬──────────┐
│  Recent  │   Exam   │   Type   │
└──────────┴──────────┴──────────┘
```

**Props:**
```typescript
interface CreationsViewToggleProps {
  value: CreationsViewMode;
  onChange: (mode: CreationsViewMode) => void;
}
```

**Styling:**
```css
/* Container */
inline-flex rounded-lg bg-gray-100 p-1

/* Button base */
px-3 py-1.5 text-sm font-medium rounded-md transition-colors

/* Inactive */
text-gray-600 hover:text-gray-900

/* Active */
bg-white text-gray-900 shadow-sm
```

---

### CreationCard.tsx

**Adapts based on view context:**

| View | Shows Exam Tag | Secondary Info |
|------|----------------|----------------|
| Recent | ✅ Yes | Exam + stats |
| Exam | ❌ No (context clear) | Stats only |
| Type | ✅ Yes | Exam + stats |

**Props:**
```typescript
interface CreationCardProps {
  creation: Creation;
  exam?: Exam;                    // For resolving examId to name
  view: CreationsViewMode;
  isActive?: boolean;
  onClick: () => void;
  onDelete?: () => void;
}
```

**Icon Mapping:**
```typescript
const CREATION_ICONS: Record<CreationType, string> = {
  'mock-exam': '📝',
  'flashcards': '🎴',
  'summary': '📋',
  'quiz': '❓',
};
```

**Stats Text Logic:**
```typescript
function getCreationStats(creation: Creation): string {
  switch (creation.type) {
    case 'mock-exam':
    case 'quiz':
      if (creation.bestScore !== undefined) {
        return `${creation.bestScore}%${creation.attempts ? ` · ${creation.attempts} attempt${creation.attempts > 1 ? 's' : ''}` : ''}`;
      }
      return `${creation.questionCount} questions · Not started`;
      
    case 'flashcards':
      const mastered = creation.masteredCount || 0;
      return `${creation.cardCount} cards${mastered > 0 ? ` · ${mastered} mastered` : ''}`;
      
    case 'summary':
      return creation.wordCount ? `${formatNumber(creation.wordCount)} words` : 'Draft';
  }
}
```

**Secondary Text Logic:**
```typescript
function getSecondaryText(creation: Creation, exam: Exam | undefined, view: CreationsViewMode): string {
  const stats = getCreationStats(creation);
  
  if (view === 'exam') {
    // Exam context already in section header
    return stats;
  }
  
  // Recent and Type views need exam context
  const examLabel = exam?.name || 'Ongoing';
  return `${examLabel} · ${stats}`;
}
```

**Styling:** Same as SourceCard with minor adjustments for status indicators.

---

### ExamSection.tsx (for Exam view)

**Visual:**
```
FINAL EXAM · Dec 15 ───────────────────
14 days away · 4 items

[cards...]

MIDTERM II · Nov 10 ✓ ─────────────────
Completed                         [▾]

[collapsed or expanded cards...]
```

**Props:**
```typescript
interface ExamSectionProps {
  exam: Exam;
  creations: Creation[];
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  onCreationClick: (creation: Creation) => void;
}
```

**Header Logic:**
```typescript
function getExamHeaderInfo(exam: Exam) {
  if (exam.isCompleted) {
    return { status: 'Completed', showToggle: true };
  }
  
  if (exam.date) {
    return { status: formatDaysUntil(exam.date), showToggle: false };
  }
  
  return { status: 'Date not set', showToggle: false };
}
```

**Styling:**
```css
/* Header container */
flex items-center gap-2 py-3

/* Exam name */
text-xs font-semibold text-gray-900 uppercase tracking-wide

/* Date */
text-xs text-gray-500

/* Line */
flex-1 border-t border-gray-200

/* Checkmark for completed */
text-green-500

/* Subtitle row */
text-xs text-gray-400 mb-2

/* Collapse toggle */
p-1 rounded hover:bg-gray-100 text-gray-400
```

---

### Empty States

**Recent View - Empty:**
```
┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
│                                     │
│            ✨                       │
│                                     │
│   No creations yet                  │
│                                     │
│   Create a mock exam or flashcards  │
│   to start practicing               │
│                                     │
└ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
```

**Exam View - No Exams:**
```
┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
│                                     │
│            📅                       │
│                                     │
│   No exams scheduled                │
│                                     │
│   Add an exam date to organize      │
│   your prep by milestone            │
│                                     │
│   [+ Add Exam]                      │
│                                     │
└ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
```

**Type View - No Creations:**
```
┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
│                                     │
│            📚                       │
│                                     │
│   Nothing created yet               │
│                                     │
│   Start with a mock exam to test    │
│   yourself, or flashcards to        │
│   memorize key concepts             │
│                                     │
└ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
```

---

## Main Container: CreationsPanel.tsx

```typescript
'use client';

import { useState } from 'react';
import { useCourse } from '@/lib/CourseContext';
import { CreationsViewToggle } from './CreationsViewToggle';
import { CreationsList } from './CreationsList';
import { Button } from '@/components/ui/Button';

export function CreationsPanel() {
  const { course, setCreationsViewMode } = useCourse();
  
  if (!course) return null;
  
  const viewMode = course.creationsViewMode || 'exam';
  
  const handleCreateNew = () => {
    // Open creation modal/flow
    console.log('Create new');
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 space-y-4">
        <Button onClick={handleCreateNew} className="w-full">
          + Create New
        </Button>
        
        <CreationsViewToggle
          value={viewMode}
          onChange={setCreationsViewMode}
        />
      </div>
      
      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <CreationsList
          creations={course.creations}
          exams={course.exams}
          viewMode={viewMode}
        />
      </div>
    </div>
  );
}
```

---

# Part 4: Integration

## Context Updates

Add to `CourseContext`:

```typescript
interface CourseContextType {
  course: Course | null;
  
  // Sources
  addSource: (source: Omit<Source, 'id' | 'addedAt'>) => void;
  removeSource: (sourceId: string) => void;
  
  // Creations
  addCreation: (creation: Omit<Creation, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCreation: (id: string, updates: Partial<Creation>) => void;
  removeCreation: (creationId: string) => void;
  
  // Exams
  addExam: (exam: Omit<Exam, 'id' | 'createdAt'>) => void;
  updateExam: (id: string, updates: Partial<Exam>) => void;
  removeExam: (examId: string) => void;
  
  // Preferences
  setCreationsViewMode: (mode: CreationsViewMode) => void;
  
  // Computed
  totalQuestions: number;
  totalStorageUsed: number;
}
```

---

## Mock Data

Add to `/lib/mockData.ts`:

```typescript
export const mockExams: Exam[] = [
  {
    id: 'exam-final',
    name: 'Final Exam',
    date: new Date('2024-12-15'),
    isCompleted: false,
    weight: 40,
    createdAt: new Date('2024-09-01'),
  },
  {
    id: 'exam-midterm2',
    name: 'Midterm II',
    date: new Date('2024-11-10'),
    isCompleted: true,
    weight: 25,
    createdAt: new Date('2024-09-01'),
  },
];

export const mockCreations: Creation[] = [
  {
    id: 'creation-1',
    type: 'mock-exam',
    name: 'Mock Exam #3',
    createdAt: new Date(),
    updatedAt: new Date(),
    examId: 'exam-final',
    status: 'not-started',
    questionCount: 15,
    sourceIds: ['source-1', 'source-2'],
  },
  {
    id: 'creation-2',
    type: 'flashcards',
    name: 'Drug Interactions',
    createdAt: new Date(Date.now() - 86400000), // Yesterday
    updatedAt: new Date(),
    examId: 'exam-final',
    status: 'in-progress',
    cardCount: 48,
    masteredCount: 12,
    sourceIds: ['source-1'],
  },
  {
    id: 'creation-3',
    type: 'mock-exam',
    name: 'Mock Exam #2',
    createdAt: new Date('2024-11-25'),
    updatedAt: new Date('2024-11-26'),
    examId: 'exam-final',
    status: 'completed',
    questionCount: 15,
    bestScore: 82,
    attempts: 2,
    sourceIds: ['source-1', 'source-2'],
  },
  {
    id: 'creation-4',
    type: 'mock-exam',
    name: 'Midterm Practice',
    createdAt: new Date('2024-11-08'),
    updatedAt: new Date('2024-11-09'),
    examId: 'exam-midterm2',
    status: 'completed',
    questionCount: 12,
    bestScore: 85,
    attempts: 1,
    sourceIds: ['source-3'],
  },
  {
    id: 'creation-5',
    type: 'summary',
    name: 'Running Notes',
    createdAt: new Date('2024-11-05'),
    updatedAt: new Date(),
    examId: null, // Ongoing
    status: 'in-progress',
    wordCount: 1240,
    sourceIds: [],
  },
];

export const mockSources: Source[] = [
  {
    id: 'source-1',
    name: 'Lecture 5 Notes.pdf',
    addedAt: new Date(),
    origin: 'upload',
    fileSize: 2.4 * 1024 * 1024,
    fileType: 'pdf',
    questionCount: 12,
  },
  {
    id: 'source-2',
    name: 'Midterm 2024 Solutions',
    addedAt: new Date(),
    origin: 'studocu',
    studocuId: 'studocu-123',
    downloads: 956,
    questionCount: 15,
    isExam: true,
  },
  {
    id: 'source-3',
    name: 'Nursing Drug Handbook',
    addedAt: new Date('2024-11-20'),
    origin: 'studocu',
    studocuId: 'studocu-456',
    downloads: 2341,
    questionCount: 0,
  },
  {
    id: 'source-4',
    name: 'Lecture 4 Notes.pdf',
    addedAt: new Date('2024-11-18'),
    origin: 'upload',
    fileSize: 1.8 * 1024 * 1024,
    fileType: 'pdf',
    questionCount: 8,
  },
];
```

---

# Part 5: Accessibility

## Keyboard Navigation

### Sources Panel
- Tab: DropZone → Source cards (in order) → Recommendation → Storage
- Enter/Space on DropZone: Open file picker
- Enter/Space on Source card: Select it
- Arrow Up/Down: Navigate between source cards
- Delete on focused card: Remove (with confirmation)

### Creations Panel
- Tab: Create button → View toggle → Creation cards
- Arrow Left/Right on toggle: Switch views
- Enter/Space on Creation card: Open it
- Arrow Up/Down: Navigate between creation cards

## Screen Reader Labels

**Sources:**
- DropZone: "Add study materials. Drop files here or press Enter to browse."
- Source card: "{name}, {origin}, added {date}, enables {X} practice questions"
- Recommendation: "Recommended: {name}. Adding this {unlocks}. Press Enter to add."
- Storage: "Study library contains {X} sources enabling {Y} questions. Using {Z} of {max} megabytes."

**Creations:**
- View toggle: "View mode. {current} selected. Use arrow keys to switch."
- Creation card: "{name}, {type}, created {date}, {stats}"
- Exam section: "{exam name}, {status}. {count} study materials."

## Focus Management

- After uploading source: Focus moves to new source card
- After adding creation: Focus moves to new creation card
- After deleting: Focus moves to next item (or previous if last)
- View toggle change: Focus stays on toggle, list updates

---

# Part 6: Testing Checklist

## Sources Panel

- [ ] Drop zone accepts valid file types (PDF, doc, images, txt)
- [ ] Drop zone rejects files over 10MB with error toast
- [ ] Drag hover state shows correctly
- [ ] "Browse Studocu" opens modal/triggers callback
- [ ] Uploaded files appear in "This Week" section
- [ ] Files show "+X questions" feedback for recent uploads
- [ ] Studocu sources show "from Studocu" tag
- [ ] "This Week" divider only shows when there are items
- [ ] "Earlier" divider only shows when BOTH groups exist
- [ ] No dividers when only "Earlier" items exist
- [ ] Clicking source shows preview in canvas
- [ ] Active source has highlighted state
- [ ] Remove button appears on hover
- [ ] Remove works with confirmation
- [ ] Recommendation [+] adds source correctly
- [ ] Storage widget shows correct counts
- [ ] Progress bar reflects total size and changes color at thresholds
- [ ] Empty state displays when no sources

## Creations Panel

- [ ] View toggle switches correctly
- [ ] Selected view persists in context
- [ ] Recent view groups by This Week / Last Week / Earlier
- [ ] Exam view groups by upcoming → completed → ongoing
- [ ] Completed exams are collapsible
- [ ] Type view groups by Mock Exams → Flashcards → Summaries → Quizzes
- [ ] Card secondary text adapts based on view
- [ ] Click opens creation in canvas
- [ ] Delete removes with confirmation
- [ ] Empty states show per view
- [ ] "Add Exam" prompt shows in Exam view when no exams
- [ ] Stats display correctly for each creation type

## Cross-Panel

- [ ] Both panels scroll independently
- [ ] Keyboard navigation works in both
- [ ] Screen reader announcements are accurate
- [ ] Focus management works after actions

---

# Summary

| Panel | Organization | Key Features |
|-------|--------------|--------------|
| **Sources** | Unified timeline | This Week / Earlier, simple & clean |
| **Creations** | 3-way toggle | Recent / Exam / Type views |

**Sources** stays simple because inputs don't need complex organization.
**Creations** gets flexibility because students think about their prep in different ways at different times.

Both panels share consistent styling, card patterns, and interaction models for a cohesive experience.

# Course-First POC Prototype

## Overview

This is a proof-of-concept prototype to validate whether starting with a **course** (pre-loaded with Studocu library documents) drives better user engagement than starting with file uploads.

### Core Hypothesis

> **If users start by selecting a course (with Studocu's docs already available) and we proactively suggest what we can create, will they engage deeper and return?**

## Key Features Implemented

### ✅ Onboarding Flow
- **Course Search**: Users enter course name and university
- **Library Selection**: Browse and select Studocu documents (pre-checked top 2)
- **Optional Setup**: Add own files and set exam date

### ✅ Course Workspace
- **Smart Suggestions**: AI-powered suggestions based on available sources
  - Quiz generation (15 or 30 questions)
  - Summary generation
  - Gap analysis (unlocks at 3+ sources)
- **Source Management**: View library docs and uploads organized in sidebar
- **Creations Panel**: Track all generated quizzes and summaries
- **Interactive Quiz**: Answer questions with immediate feedback and results

### ✅ AI Features
- **Mock Mode**: Fully functional without OpenAI API key
- **Quiz Generation**: Multi-choice questions with explanations
- **Real-time Feedback**: Immediate answer validation
- **Score Tracking**: Performance analytics and weak topic identification

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19, CSS Modules (design token system)
- **Storage**: localStorage (client-side, POC only)
- **AI**: OpenAI API (optional, mock fallback)

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Test the Flow
1. Open http://localhost:3000
2. Search for "Pharmacology 101"
3. Select documents from library
4. (Optional) Upload files and set exam date
5. Generate and take a quiz

## Testing the POC (20-minute script)

### Setup Flow (8 min)
1. **Search** "Pharmacology 101" → see 8 documents
2. **Select** top 2 pre-checked documents → continue
3. **Upload** 1 file (optional) → set exam date
4. **Arrive** at workspace → see suggestions

### Workspace (10 min)
5. **Review** suggestion cards (quiz, summary, gap analysis)
6. **Generate** 15-question quiz → complete it
7. **View** quiz result in creations panel
8. **Check** source organization in sidebar

### Edge Cases (2 min)
9. **Mobile** resize check
10. **Empty** search → "No documents found" flow

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Course search landing
│   ├── library/page.tsx            # Studocu library results
│   ├── setup/page.tsx              # Optional file upload
│   ├── course/[id]/page.tsx        # Course workspace
│   └── api/generate/route.ts       # AI generation API
├── components/
│   ├── canvas/                     # Canvas views (suggestions, quiz, etc.)
│   ├── LibraryDocCard.tsx          # Document selection card
│   ├── ExamDatePicker.tsx          # Date picker component
│   └── Toast.tsx                   # Notification system
├── contexts/
│   └── CourseContext.tsx           # Course state management
├── lib/
│   ├── mockData.ts                 # Studocu library mock data
│   └── storage.ts                  # localStorage utilities
└── types/
    └── course.ts                   # TypeScript definitions
```

## Mock Data

### Available Courses
- **Pharmacology**: 8 documents (textbooks, lectures, exams)
- **Psychology**: 5 documents
- **Anatomy**: 4 documents

### Demo Features
- Pre-populated with realistic document data
- Download counts and topics
- Unlock conditions (e.g., "Add 3+ sources for Gap Analysis")
- Mock quiz questions with explanations

## Design Decisions

### Reuse Over Rebuild
- Adapted existing project page structure for course workspace
- Reused sidebar, header, chat, and button components
- Extended exam components for quiz functionality

### CSS Modules (Not Tailwind)
- Used design token system (`var(--spacing-md)`, `var(--color-primary)`)
- Maintained consistency with template
- All spacing, colors, typography from tokens

### localStorage-First
- No backend required for POC
- All data persists in browser
- Easy to test and demo

## Success Metrics to Validate

1. ✅/❌ Course-first feels better than upload-first
2. ✅/❌ Library provides meaningful instant value
3. ✅/❌ Concrete numbers ("47 questions") drive action
4. ✅/❌ Users understand smart suggestions
5. ✅/❌ Users would add own docs on top
6. ✅/❌ Users would return before exam

## Known Limitations (POC Scope)

- **No Real API**: Uses mock responses (add OPENAI_API_KEY to enable)
- **No Backend**: All data in localStorage
- **No Auth**: Single-user experience
- **No Document Preview**: Sources shown as metadata only
- **Limited Quiz Types**: Multiple choice only
- **No Spaced Repetition**: UI shown but not functional

## Next Steps for Production

1. **Backend Integration**
   - Real Studocu API connection
   - Database for persistence
   - User authentication

2. **AI Enhancement**
   - Real OpenAI integration
   - Document processing and embedding
   - Context-aware responses

3. **Feature Completion**
   - Summary generation with streaming
   - Gap analysis implementation
   - Chat Q&A functionality
   - Source preview/viewer

4. **Polish**
   - Complete mobile responsive design
   - Accessibility audit
   - Performance optimization
   - Error handling improvements

## Development Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Run production build
npm run lint         # Check code quality
npm run type-check   # Verify TypeScript
```

## Environment Variables

```env
# Optional - enables real AI generation
OPENAI_API_KEY=your_key_here

# For deployment password protection
SITE_PASSWORD=your_password_here
```

---

**Status**: ✅ POC Complete and Ready for Testing  
**Build Time**: ~2-3 hours (automated implementation)  
**Last Updated**: 2026-02-03

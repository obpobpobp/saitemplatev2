# Testing Guide - Course-First POC

## Quick Start

```bash
npm run dev
```

Open http://localhost:3000

## 20-Minute Test Script

### Part 1: Setup Flow (8 minutes)

#### Step 1: Course Search (2 min)
1. Land on homepage
2. Enter "Pharmacology 101" in course name
3. (Optional) Enter "Medical University" 
4. Click "Find My Course"

**Expected:**
- Input validation (button disabled until course name entered)
- Navigate to /library page
- URL shows query params

#### Step 2: Library Selection (3 min)
1. See list of 8 Studocu documents
2. Notice top 2 are pre-selected (highest downloads)
3. Hover over documents (see hover effects)
4. Uncheck one document
5. Check another document
6. Notice footer shows "Selected: X documents"
7. Click "Add to My Course"

**Expected:**
- 4 documents visible initially
- "Show X more..." button to expand
- Selection count updates in footer
- Button disabled if 0 selected
- Redirect to /setup page

**Test Empty State:**
- Go back and search "Nonexistent Course 999"
- See "No documents found" message
- Option to "Start with empty course"

#### Step 3: Setup (2 min)
1. See badge "Added from Studocu: X documents"
2. Drag and drop a PDF file (or click to browse)
3. See file appear in list
4. Remove file (click X button)
5. Set exam date (use calendar picker)
6. Click "Continue"

**Expected:**
- File upload shows file name and size
- Date picker has minimum date of today
- Both "Skip for Now" and "Continue" work
- Redirect to /course/pharmacology-101

**Alternative Flow:**
- Click "Start with empty course" from homepage
- Skip directly to setup without library docs
- Warning shown: "You can add sources later"

#### Step 4: Arrive at Workspace (1 min)
1. See course name in header
2. See exam countdown banner (if date was set)
3. See sidebar with two panels: Creations (empty), Sources (with docs)
4. See canvas with smart suggestions

**Expected:**
- Clean, professional workspace layout
- Sidebar shows library docs and uploads
- Canvas shows 3 suggestion cards

### Part 2: Using the Workspace (10 minutes)

#### Step 5: Review Suggestions (2 min)
1. Read the three suggestion cards:
   - Generate Quiz (shows "47 questions available")
   - Generate Summary (shows word count estimate)
   - Find Knowledge Gaps (locked if < 3 sources)
2. Notice specific metrics on each card
3. Notice quiz has two buttons: "15 Questions" and "30 Questions"

**Expected:**
- Numbers are calculated based on source count (12 questions per source)
- Topics shown for quiz (from doc metadata)
- Gap Analysis locked with message: "Add X more sources to unlock"

#### Step 6: Generate and Take Quiz (4 min)
1. Click "15 Questions" on quiz suggestion
2. See loading state ("Generating your quiz...")
3. Quiz appears with first question
4. Read question and 4 options (A, B, C, D)
5. Click an option
6. See immediate feedback (green for correct, red for incorrect)
7. Read explanation that appears
8. Wait 1.5s, auto-advances to next question
9. Answer all 15 questions
10. See results screen with:
    - Circular score gauge with percentage
    - Correct/incorrect counts
    - "Retry" and "Back to Suggestions" buttons

**Expected:**
- Progress bar at top shows "Question X of 15"
- Correct answer highlighted in green
- Incorrect answer shown in red
- Correct answer also shown if you got it wrong
- Auto-advance after 1.5s
- Smooth transitions between questions
- Final score calculated correctly

#### Step 7: Check Creations (2 min)
1. Look at left sidebar, Creations panel
2. See the quiz you just completed
3. Quiz shows score (e.g., "Quiz • Score: 80%")
4. Click on the quiz creation

**Expected:**
- Quiz automatically saved after completion
- Appears in Creations panel
- Shows score in subtitle
- Click opens quiz (not implemented in POC)

#### Step 8: Check Sources Organization (2 min)
1. Expand Sources panel (if collapsed)
2. See "📚 From Studocu Library" section
3. See your library documents listed
4. If you uploaded files, see "📁 My Uploads" section
5. Notice download counts for library docs

**Expected:**
- Sources organized by type (library vs uploads)
- Each source shows relevant metadata
- Clean visual separation between sections

### Part 3: Edge Cases (2 minutes)

#### Mobile Responsive (1 min)
1. Resize browser to mobile width (< 768px)
2. Check landing page still usable
3. Check library page adapts
4. Check workspace layout adjusts

**Expected:**
- Forms remain functional
- Buttons stack vertically
- Sidebar adapts for mobile
- No horizontal scroll

#### Error Handling (1 min)
1. Try visiting /course/nonexistent-id
2. See "Course Not Found" error page
3. Click "Go Back Home"
4. Try library search with no params (direct URL)
5. Redirected to homepage

**Expected:**
- Friendly error messages
- Clear navigation back to valid states
- No crashes

## What to Observe

### User Behavior
- Do they understand the course search?
- Do library docs feel like "instant value"?
- Do the numbers ("47 questions") influence decisions?
- Do they add their own docs, or just use library?
- Does the quiz experience feel smooth?
- Would they return before their exam?

### UI/UX
- Is the flow intuitive?
- Are the suggestions clear?
- Is the workspace layout comfortable?
- Are metrics trustworthy?
- Is feedback immediate enough?

### Technical
- Does it feel fast/responsive?
- Are there any glitches?
- Does localStorage work correctly?
- Do page transitions feel smooth?

## Known Limitations

1. **No real document processing** - just metadata
2. **No actual AI** - mock responses only (unless API key added)
3. **Summary/Gap Analysis** - placeholders only
4. **No document preview** - just lists
5. **Basic mobile** - functional but not polished
6. **No persistence across devices** - localStorage only

## Debug Tools

### Check localStorage
```javascript
// In browser console
localStorage.getItem('studocu-poc-onboarding')
localStorage.getItem('studocu-poc-course-pharmacology-101')
localStorage.getItem('studocu-poc-creations-pharmacology-101')
```

### Clear All Data
```javascript
// In browser console
Object.keys(localStorage)
  .filter(k => k.startsWith('studocu-poc'))
  .forEach(k => localStorage.removeItem(k));
```

### Check Mock Library
```javascript
// In browser console (in workspace page)
import('/lib/mockData').then(m => console.log(m.searchLibrary('pharmacology')))
```

## Feedback Questions

After testing, consider:

1. **First Impression**: What was your initial reaction to the course search approach?
2. **Library Value**: Did the pre-loaded documents feel valuable or like "cheating"?
3. **Smart Suggestions**: Were the suggestions clear about what you'd get?
4. **Number Influence**: Did metrics like "47 questions" influence your actions?
5. **Own Materials**: Would you add your own docs, or rely on library?
6. **Quiz Experience**: How did the quiz generation and taking feel?
7. **Return Intent**: Would you come back to this before your exam?
8. **Missing Features**: What did you expect that wasn't there?
9. **Confusion Points**: Where did you get stuck or confused?
10. **Overall Value**: Would you use this over traditional study tools?

---

**Ready to test!** Start at http://localhost:3000 and follow the script above.

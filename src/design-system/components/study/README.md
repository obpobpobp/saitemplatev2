# Study Components

Components specifically designed for study and exam preparation features.

## Components

### ExamCountdown

Sophisticated exam countdown with circular progress, interactive slider, and study tracking.

**Key Features:**
- **Circular Progress Visualization**: Dual-ring system showing countdown and study progress
- **Interactive Date Slider**: Drag to adjust exam date (1-90 days)
- **Study Progress Tracking**: Visual progress percentage with hours studied
- **Expandable Interface**: Compact/expanded modes for optimal space usage
- **Quick Actions**: One-click presets (7d, 14d, 30d, 60d)
- **Monochromatic Design**: Pure gray with subtle urgency tints
- **Glass-Morphism**: Elegant backdrop effects and shine animations
- **Full Accessibility**: WCAG 2.1 AA compliant with keyboard support

**Usage:**
```tsx
import { ExamCountdown } from '@design-system/components/study';

// Full-featured with progress tracking
<ExamCountdown 
  examDate="2026-03-15"
  studyProgress={65}
  hoursStudied={12}
  showSlider={true}
  onDateChange={(date) => updateExamDate(date)}
  onRemoveDate={() => clearExamDate()}
/>

// Minimal - date only
<ExamCountdown 
  examDate="2026-03-15"
  onDateChange={(date) => updateExamDate(date)}
/>

// Empty state with auto-setup
<ExamCountdown onDateChange={(date) => setExamDate(date)} />
```

**Urgency Levels (Monochromatic):**
- **Distant** (20+ days): Pure neutral gray
- **Comfortable** (11-20 days): Subtle warm tint
- **Approaching** (6-10 days): Light amber tint
- **Urgent** (3-5 days): Warmer amber tint
- **Critical** (0-2 days): Subtle red tint with pulse

**Demo:**
See `/exam-countdown-demo` for interactive examples.

---

## Design Philosophy

Study components follow Studocu's understated monochromatic design language:

1. **Subtle Gradients**: Use gentle color gradients for visual interest
2. **Purposeful Animation**: Only animate when it adds meaning (e.g., urgency pulse)
3. **Clear Hierarchy**: Important information should stand out naturally
4. **Contextual Colors**: Use color to convey meaning (blue = calm, amber = warning, red = urgent)
5. **Empty States**: Always provide helpful guidance when no data exists

## Adding New Study Components

When adding new study-related components:

1. Follow the 4-file component structure
2. Use design tokens exclusively
3. Support both filled and empty states
4. Consider urgency/priority levels if applicable
5. Ensure full accessibility
6. Add comprehensive JSDoc comments
7. Create a demo page
8. Update this README

# Content Editor System

A comprehensive rich text editor built with TipTap, featuring Notion-like slash commands and text selection toolbar.

## 📦 Components

### ContentEditor

Main editor component with TipTap integration.

**Location:** `src/design-system/components/editor/ContentEditor/`

**Props:**
- `content?: string` - Initial HTML content
- `placeholder?: string` - Placeholder text when empty
- `editable?: boolean` - Whether editor is editable (default: true)
- `onChange?: (content: string) => void` - Content change callback
- `onReady?: (editor: Editor) => void` - Editor ready callback
- `showSelectionToolbar?: boolean` - Show text selection toolbar (default: true)
- `showSlashCommands?: boolean` - Show slash command menu (default: true)
- `className?: string` - Additional CSS class

**Example:**
```tsx
import { ContentEditor } from '@/design-system/components/editor';

<ContentEditor 
  content="<p>Initial content</p>"
  placeholder="Start typing..."
  onChange={(html) => console.log(html)}
  showSlashCommands={true}
  showSelectionToolbar={true}
/>
```

### SlashCommandMenu

Dropdown menu that appears when "/" is typed.

**Location:** `src/design-system/components/editor/SlashCommandMenu/`

**Features:**
- Filters commands based on search query
- Keyboard navigation (↑↓, Enter, Esc)
- Mouse hover selection
- Font Awesome icons

**Built-in Commands:**
- `Paragraph` - Convert to paragraph
- `Heading 1` - Convert to H1
- `Heading 2` - Convert to H2
- `Heading 3` - Convert to H3
- `Bullet List` - Toggle bullet list

### SelectionToolbar

Floating toolbar that appears when text is selected.

**Location:** `src/design-system/components/editor/SelectionToolbar/`

**Built-in Actions:**
- `Ask AI` - AI assistance (primary button)
- `Explain` - Explain selected text
- `Bold` - Toggle bold formatting
- `Italic` - Toggle italic formatting
- `Bullet List` - Toggle bullet list
- `Highlight` - Highlight text

## 🎨 Typography System

The editor uses design system typography tokens:

### Headings
- **H1:** 32px / Bold / 48px line-height / 22px margin-bottom
- **H2:** 24px / Bold / 36px line-height / 18px margin-bottom
- **H3:** 20px / Bold / 30px line-height / 16px margin-bottom

### Body Text
- **Paragraph:** 18px / Regular / 28px line-height / 22px margin-bottom
- **Lists:** 18px / Regular / 28px line-height / 1.5em indent

### Code
- **Inline Code:** 16px / Mono / Background highlight
- **Code Block:** 14px / Mono / Background panel

## ⌨️ Keyboard Shortcuts

### Slash Commands
- `/` - Open slash command menu
- `↑` `↓` - Navigate commands
- `Enter` - Select command
- `Esc` - Close menu

### Text Formatting
- `Cmd/Ctrl + B` - Bold
- `Cmd/Ctrl + I` - Italic
- `Cmd/Ctrl + Shift + 8` - Bullet list

## 🔧 TipTap Extensions

The editor uses the following TipTap extensions:

- **StarterKit** - Basic editor functionality
  - Document, Text, Paragraph
  - Headings (H1, H2, H3)
  - Bold, Italic
  - Bullet/Ordered Lists
  - Code, Code Block
  - Blockquote
  - Horizontal Rule
  - Hard Break
- **Placeholder** - Empty editor placeholder
- **Typography** - Smart typography improvements

## 🎯 Usage Examples

### Basic Editor

```tsx
import { ContentEditor } from '@/design-system/components/editor';

export default function NotePage() {
  const [content, setContent] = useState('');

  return (
    <ContentEditor 
      content={content}
      onChange={setContent}
    />
  );
}
```

### Custom Slash Commands

```tsx
import { ContentEditor } from '@/design-system/components/editor';

// Access editor instance to add custom commands
const handleEditorReady = (editor: Editor) => {
  // Add custom extension
  editor.registerExtension(MyCustomExtension);
};

<ContentEditor 
  onReady={handleEditorReady}
/>
```

### Controlled Content

```tsx
const [content, setContent] = useState(initialContent);

// Update externally
const loadDocument = async (id: string) => {
  const doc = await fetchDocument(id);
  setContent(doc.html);
};

<ContentEditor 
  content={content}
  onChange={setContent}
/>
```

## 🎨 Styling

All editor components use CSS Modules and design tokens:

```css
/* Typography uses tokens */
.editor :global(.ProseMirror p) {
  font-family: var(--font-family-primary);
  font-size: 18px;
  line-height: 28px;
  color: var(--color-text);
}
```

## ♿ Accessibility

- Keyboard navigation fully supported
- ARIA labels on all interactive elements
- Focus management for menus
- Screen reader friendly
- Semantic HTML output
- WCAG 2.1 AA compliant

## 🧪 Testing

See `/editor-demo` page for live examples and testing.

## 📚 Resources

- [TipTap Documentation](https://tiptap.dev/)
- [ProseMirror Guide](https://prosemirror.net/docs/guide/)
- [Font Awesome Icons](https://fontawesome.com/)

## 🐛 Known Limitations

1. Slash commands only support basic formatting (extensible)
2. Text highlighting needs custom extension
3. Table support requires additional TipTap extension
4. Image uploads need backend integration

## 🔮 Future Enhancements

- [ ] Table support
- [ ] Image uploads with drag & drop
- [ ] Collaboration features (Yjs)
- [ ] More slash commands (callouts, dividers, etc.)
- [ ] Markdown import/export
- [ ] AI-powered features integration
- [ ] Code syntax highlighting
- [ ] Inline comments








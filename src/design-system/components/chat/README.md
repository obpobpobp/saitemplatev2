# Chat System

A complete chat interface system with messages, file attachments, suggested actions, and input controls.

## 📦 Components

### ChatWindow

Main chat interface container with header, messages area, actions, and input.

**Location:** `src/design-system/components/chat/ChatWindow/`

**Props:**
- `title?: string` - Window title (default: "Study Assistant")
- `messages?: ChatMessageData[]` - Array of chat messages
- `assistantAvatar?: string | ReactNode` - Avatar for the assistant
- `actions?: Array<{id, label, onClick}>` - Suggested action buttons
- `actionsTitle?: string` - Action section title
- `attachments?: Array<{id, fileName, fileType, rotation, onClick}>` - File attachments
- `inputPlaceholder?: string` - Input placeholder text
- `inputValue?: string` - Current input value
- `onInputChange?: (value: string) => void` - Input change handler
- `onSendMessage?: () => void` - Message submit handler
- `onAttach?: () => void` - Attachment button handler
- `onClose?: () => void` - Close button handler
- `isOpen?: boolean` - Whether window is open
- `className?: string` - Additional CSS class

**Example:**
```tsx
import { ChatWindow } from '@/design-system/components/chat';

<ChatWindow 
  title="Study Assistant"
  messages={messages}
  assistantAvatar={<img src="/avatar.png" />}
  actions={[
    { id: '1', label: 'Upload materials', onClick: handleUpload }
  ]}
  onSendMessage={handleSend}
  onClose={handleClose}
/>
```

### ChatMessage

Individual message component for user and assistant messages.

**Location:** `src/design-system/components/chat/ChatMessage/`

**Props:**
- `children: ReactNode` - Message content
- `sender?: 'user' | 'assistant'` - Message sender (default: 'assistant')
- `timestamp?: Date | string` - Message timestamp
- `showAvatar?: boolean` - Whether to show avatar
- `avatar?: string | ReactNode` - Avatar image or element
- `className?: string` - Additional CSS class

**Example:**
```tsx
import { ChatMessage } from '@/design-system/components/chat';

<ChatMessage sender="assistant" timestamp={new Date()}>
  I will prepare a mock exam for you...
</ChatMessage>
```

### ChatInput

Input field with attachment and send buttons.

**Location:** `src/design-system/components/chat/ChatInput/`

**Features:**
- Auto-resizing textarea (max 120px)
- Enter to send, Shift+Enter for new line
- Disabled send button when empty
- Attachment button
- Max length support

**Props:**
- `value?: string` - Current input value
- `placeholder?: string` - Placeholder text
- `onChange?: (value: string) => void` - Change handler
- `onSubmit?: () => void` - Submit handler
- `onAttach?: () => void` - Attachment button handler
- `isDisabled?: boolean` - Whether input is disabled
- `canSend?: boolean` - Whether send button is enabled
- `maxLength?: number` - Maximum input length
- `className?: string` - Additional CSS class

**Example:**
```tsx
import { ChatInput } from '@/design-system/components/chat';

<ChatInput 
  placeholder="Ask about this project"
  onSubmit={handleSend}
  onAttach={handleAttach}
/>
```

### FileAttachment

File tile component showing file icon and name.

**Location:** `src/design-system/components/chat/FileAttachment/`

**Props:**
- `fileName: string` - File name
- `fileType?: 'pdf' | 'ppt' | 'doc' | 'image' | 'text' | 'other'` - File type
- `fileSize?: string` - File size (e.g., "2.4 MB")
- `onClick?: () => void` - Click handler
- `rotation?: number` - Rotation angle in degrees
- `className?: string` - Additional CSS class

**Example:**
```tsx
import { FileAttachment } from '@/design-system/components/chat';

<FileAttachment 
  fileName="document.pdf"
  fileType="pdf"
  rotation={5}
  onClick={() => console.log('Open file')}
/>
```

### ActionButton

Suggested action button chip.

**Location:** `src/design-system/components/chat/ActionButton/`

**Props:**
- `children: ReactNode` - Button label
- `onClick?: () => void` - Click handler
- `isDisabled?: boolean` - Whether button is disabled
- `className?: string` - Additional CSS class

**Example:**
```tsx
import { ActionButton } from '@/design-system/components/chat';

<ActionButton onClick={handleAction}>
  Upload my materials
</ActionButton>
```

## 🎨 Features

### Auto-Scrolling
Messages automatically scroll to the bottom when new messages arrive.

### Responsive Input
Textarea automatically resizes as content grows (up to 120px max height).

### File Types
Supports multiple file type icons:
- PDF documents
- PowerPoint presentations
- Word documents
- Images
- Text files
- Generic files

### Keyboard Shortcuts
- **Enter** - Send message
- **Shift + Enter** - New line
- **Tab** - Navigate between elements

## 🏗️ Component Hierarchy

```
ChatWindow
├── Header
│   ├── Avatar
│   ├── Title
│   └── Close Button
├── Content
│   ├── Messages Container
│   │   ├── File Attachments (grid)
│   │   │   └── FileAttachment (multiple)
│   │   └── Messages
│   │       └── ChatMessage (multiple)
│   └── User Area
│       ├── Actions Section
│       │   └── ActionButton (multiple)
│       └── ChatInput
```

## 📱 Responsive Design

- Full width on mobile (< 480px)
- Fixed 400px width on desktop
- Sticky positioning support
- Touch-friendly button sizes

## ♿ Accessibility

- Keyboard navigation fully supported
- ARIA labels on all interactive elements
- Focus management
- Screen reader friendly
- Color contrast WCAG 2.1 AA compliant

## 🎯 Usage Examples

### Basic Chat

```tsx
import { ChatWindow } from '@/design-system/components/chat';

const [messages, setMessages] = useState([]);
const [input, setInput] = useState('');

const handleSend = () => {
  setMessages([...messages, {
    id: Date.now().toString(),
    sender: 'user',
    content: input,
  }]);
  setInput('');
};

<ChatWindow 
  messages={messages}
  inputValue={input}
  onInputChange={setInput}
  onSendMessage={handleSend}
/>
```

### With File Attachments

```tsx
const attachments = [
  {
    id: '1',
    fileName: 'document.pdf',
    fileType: 'pdf',
    rotation: 5,
  },
  {
    id: '2',
    fileName: 'slides.pptx',
    fileType: 'ppt',
    rotation: -3,
  },
];

<ChatWindow 
  messages={messages}
  attachments={attachments}
/>
```

### With Suggested Actions

```tsx
const actions = [
  {
    id: 'upload',
    label: 'Upload my materials',
    onClick: () => console.log('Upload'),
  },
  {
    id: 'find',
    label: 'Find materials',
    onClick: () => console.log('Find'),
  },
];

<ChatWindow 
  messages={messages}
  actions={actions}
  actionsTitle="Next actions:"
/>
```

### Standalone Components

```tsx
// Use components individually
<ChatMessage sender="user">
  Hello, how can you help me?
</ChatMessage>

<ChatMessage sender="assistant">
  I can help you prepare for your exam!
</ChatMessage>

<ChatInput 
  placeholder="Type a message..."
  onSubmit={handleSend}
/>
```

## 🎨 Styling

All components use CSS Modules and design tokens:

```css
/* Colors */
--color-surface-primary
--color-surface-secondary
--color-surface-tertiary
--color-text
--color-text-subtle
--color-border
--color-primary

/* Spacing */
--spacing-xs
--spacing-sm
--spacing-md
--spacing-lg
--spacing-xl

/* Typography */
--font-family-primary
--font-size-sm, md, lg
--font-weight-regular, medium, bold
--line-height-sm, md, lg
```

## 🧪 Testing

See `/chat-demo` page for live examples and testing.

## 📚 Type Definitions

```typescript
interface ChatMessageData {
  id: string;
  content: ReactNode;
  sender: 'user' | 'assistant';
  timestamp?: Date | string;
}

type FileType = 'pdf' | 'ppt' | 'doc' | 'image' | 'text' | 'other';
type MessageSender = 'user' | 'assistant';
```

## 🎉 Best Practices

1. **Message IDs**: Always use unique IDs for messages
2. **Timestamps**: Include timestamps for better UX
3. **Avatar**: Provide assistant avatar for branding
4. **Actions**: Limit to 3-5 suggested actions
5. **File Attachments**: Show recently uploaded files
6. **Input Validation**: Validate before sending
7. **Loading States**: Show loading indicator for AI responses
8. **Error Handling**: Handle failed messages gracefully

## 🔮 Future Enhancements

- [ ] Typing indicators
- [ ] Message editing/deletion
- [ ] Rich text formatting in messages
- [ ] Code syntax highlighting
- [ ] Image attachments display
- [ ] Voice input support
- [ ] Message reactions
- [ ] Thread support
- [ ] Search functionality








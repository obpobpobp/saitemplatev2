'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import classNames from 'classnames';
import { ContentEditorProps, EditorState } from './ContentEditor.types';
import { SlashCommandMenu, SlashCommandItem } from '../SlashCommandMenu';
import { SelectionToolbar, ToolbarButton } from '../SelectionToolbar';
import { InlineActionsExtension } from '../InlineActionsExtension';
import styles from './ContentEditor.module.css';

/**
 * ContentEditor - Rich text editor with TipTap
 * Supports slash commands and text selection toolbar
 * 
 * @example
 * <ContentEditor 
 *   placeholder="Start typing or press '/' for commands..."
 *   onChange={(content) => console.log(content)}
 *   showSlashCommands={true}
 *   showSelectionToolbar={true}
 * />
 */
export const ContentEditor: React.FC<ContentEditorProps> = ({
  content = '',
  placeholder = 'Start taking notes here or press "/" for actions and formatting',
  editable = true,
  onChange,
  onReady,
  showSelectionToolbar = true,
  showSlashCommands = true,
  onAskAI,
  onExplain,
  onGenerateSummary,
  onCreateQuiz,
  onAskQuestion,
  onRecordClass,
  className,
  style,
}) => {
  const [editorState, setEditorState] = useState<EditorState>({
    showSlashMenu: false,
    slashQuery: '',
    selectedSlashIndex: 0,
    showSelectionToolbar: false,
  });

  // Initialize TipTap editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Typography,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      InlineActionsExtension.configure({
        onGenerateSummary,
        onCreateQuiz,
        onAskQuestion,
        onRecordClass,
      }),
    ],
    content,
    editable,
    immediatelyRender: false,
    onUpdate: ({ editor: updatedEditor }) => {
      onChange?.(updatedEditor.getHTML());
      checkForSlashCommand(updatedEditor);
    },
    onSelectionUpdate: ({ editor: updatedEditor }) => {
      updateSelectionToolbar(updatedEditor);
    },
    onCreate: ({ editor: createdEditor }) => {
      onReady?.(createdEditor);
    },
  });

  // Check for slash command trigger
  const checkForSlashCommand = useCallback((editorInstance: Editor): void => {
    if (!showSlashCommands) return;

    const { state } = editorInstance;
    const { selection } = state;
    const { $from } = selection;
    
    // Get text before cursor in the current block
    const textBefore = $from.parent.textBetween(0, $from.parentOffset, '\n', '\0');
    const slashMatch = textBefore.match(/\/(\w*)$/);

    if (slashMatch) {
      const coords = editorInstance.view.coordsAtPos(selection.from);
      const editorDom = editorInstance.view.dom;
      const editorContainer = editorDom.parentElement; // .editor
      const scrollContainer = editorContainer?.parentElement; // .editorContainer
      const wrapper = scrollContainer?.parentElement; // .wrapper
      
      if (wrapper) {
        const wrapperRect = wrapper.getBoundingClientRect();
        
        const position = {
          top: coords.bottom - wrapperRect.top + 8,
          left: coords.left - wrapperRect.left,
        };
        
        setEditorState((prev) => ({
          ...prev,
          showSlashMenu: true,
          slashQuery: slashMatch[1],
          slashMenuPosition: position,
          selectedSlashIndex: 0,
        }));
      }
    } else {
      setEditorState((prev) => ({
        ...prev,
        showSlashMenu: false,
        slashQuery: '',
      }));
    }
  }, [showSlashCommands]);

  // Update selection toolbar position
  const updateSelectionToolbar = useCallback((editorInstance: Editor): void => {
    if (!showSelectionToolbar) return;

    const { state } = editorInstance;
    const { selection } = state;
    const { from, to } = selection;

    if (from === to) {
      // No selection
      setEditorState((prev) => ({
        ...prev,
        showSelectionToolbar: false,
      }));
      return;
    }

    // Get coordinates for the start of the selection
    const coords = editorInstance.view.coordsAtPos(from);
    const editorDom = editorInstance.view.dom;
    const editorContainer = editorDom.parentElement; // .editor
    const scrollContainer = editorContainer?.parentElement; // .editorContainer
    const wrapper = scrollContainer?.parentElement; // .wrapper
    
    if (wrapper) {
      const wrapperRect = wrapper.getBoundingClientRect();
      
      const position = {
        top: coords.top - wrapperRect.top - 50, // Position above selection
        left: coords.left - wrapperRect.left,
      };
      
      setEditorState((prev) => ({
        ...prev,
        showSelectionToolbar: true,
        selectionToolbarPosition: position,
      }));
    }
  }, [showSelectionToolbar]);

  // Slash command items
  const slashCommands: SlashCommandItem[] = useMemo(() => [
    {
      id: 'paragraph',
      title: 'Paragraph',
      icon: 'paragraph',
      command: () => {
        if (!editor) return;
        const slashLength = editorState.slashQuery.length + 1; // +1 for the "/" character
        const from = editor.state.selection.from - slashLength;
        const to = editor.state.selection.from;
        editor.chain().focus().deleteRange({ from, to }).setParagraph().run();
        setEditorState((prev) => ({ ...prev, showSlashMenu: false }));
      },
      keywords: ['text', 'paragraph', 'p'],
    },
    {
      id: 'heading1',
      title: 'Heading 1',
      icon: 'h1',
      command: () => {
        if (!editor) return;
        const slashLength = editorState.slashQuery.length + 1;
        const from = editor.state.selection.from - slashLength;
        const to = editor.state.selection.from;
        editor.chain().focus().deleteRange({ from, to }).setHeading({ level: 1 }).run();
        setEditorState((prev) => ({ ...prev, showSlashMenu: false }));
      },
      keywords: ['heading', 'h1', 'title'],
    },
    {
      id: 'heading2',
      title: 'Heading 2',
      icon: 'h2',
      command: () => {
        if (!editor) return;
        const slashLength = editorState.slashQuery.length + 1;
        const from = editor.state.selection.from - slashLength;
        const to = editor.state.selection.from;
        editor.chain().focus().deleteRange({ from, to }).setHeading({ level: 2 }).run();
        setEditorState((prev) => ({ ...prev, showSlashMenu: false }));
      },
      keywords: ['heading', 'h2', 'subtitle'],
    },
    {
      id: 'heading3',
      title: 'Heading 3',
      icon: 'h3',
      command: () => {
        if (!editor) return;
        const slashLength = editorState.slashQuery.length + 1;
        const from = editor.state.selection.from - slashLength;
        const to = editor.state.selection.from;
        editor.chain().focus().deleteRange({ from, to }).setHeading({ level: 3 }).run();
        setEditorState((prev) => ({ ...prev, showSlashMenu: false }));
      },
      keywords: ['heading', 'h3'],
    },
    {
      id: 'bulletlist',
      title: 'Bullet List',
      icon: 'list',
      command: () => {
        if (!editor) return;
        const slashLength = editorState.slashQuery.length + 1;
        const from = editor.state.selection.from - slashLength;
        const to = editor.state.selection.from;
        editor.chain().focus().deleteRange({ from, to }).toggleBulletList().run();
        setEditorState((prev) => ({ ...prev, showSlashMenu: false }));
      },
      keywords: ['list', 'bullet', 'ul'],
    },
    {
      id: 'table',
      title: 'Table',
      icon: 'table',
      command: () => {
        if (!editor) return;
        const slashLength = editorState.slashQuery.length + 1;
        const from = editor.state.selection.from - slashLength;
        const to = editor.state.selection.from;
        editor.chain().focus().deleteRange({ from, to }).insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
        setEditorState((prev) => ({ ...prev, showSlashMenu: false }));
      },
      keywords: ['table', 'grid', 'data'],
    },
  ], [editor, editorState.slashQuery.length]);

  // Toolbar buttons for text formatting
  const toolbarButtons: ToolbarButton[] = [
    {
      id: 'ai',
      icon: 'sparkle',
      label: 'Ask AI',
      onClick: () => {
        const selectedText = editor?.state.doc.textBetween(
          editor.state.selection.from,
          editor.state.selection.to,
          ' '
        ) || '';
        onAskAI?.(selectedText);
      },
      variant: 'primary',
    },
    {
      id: 'explain',
      icon: 'brain',
      label: 'Explain',
      onClick: () => {
        const selectedText = editor?.state.doc.textBetween(
          editor.state.selection.from,
          editor.state.selection.to,
          ' '
        ) || '';
        onExplain?.(selectedText);
      },
      variant: 'text',
    },
    {
      id: 'more',
      icon: 'ellipsis',
      label: 'More options',
      onClick: () => console.log('More options'),
    },
    {
      id: 'font-case',
      icon: 'font-case',
      label: 'Text case',
      onClick: () => console.log('Text case'),
    },
    {
      id: 'bold',
      icon: 'bold',
      label: 'Bold',
      onClick: () => editor?.chain().focus().toggleBold().run(),
      isActive: editor?.isActive('bold'),
    },
    {
      id: 'italic',
      icon: 'italic',
      label: 'Italic',
      onClick: () => editor?.chain().focus().toggleItalic().run(),
      isActive: editor?.isActive('italic'),
    },
    {
      id: 'list',
      icon: 'list-ul',
      label: 'Bullet List',
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
      isActive: editor?.isActive('bulletList'),
    },
    {
      id: 'highlight',
      icon: 'highlighter-line',
      label: 'Highlight',
      onClick: () => console.log('Highlight'),
    },
  ];

  // Handle keyboard navigation for slash menu
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (!editorState.showSlashMenu) return;

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setEditorState((prev) => ({
          ...prev,
          selectedSlashIndex: Math.min(prev.selectedSlashIndex + 1, slashCommands.length - 1),
        }));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setEditorState((prev) => ({
          ...prev,
          selectedSlashIndex: Math.max(prev.selectedSlashIndex - 1, 0),
        }));
      } else if (event.key === 'Enter') {
        event.preventDefault();
        const selectedCommand = slashCommands[editorState.selectedSlashIndex];
        if (selectedCommand) {
          selectedCommand.command();
        }
      } else if (event.key === 'Escape') {
        setEditorState((prev) => ({ ...prev, showSlashMenu: false }));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [editorState.showSlashMenu, editorState.selectedSlashIndex, slashCommands]);

  if (!editor) {
    return null;
  }

  return (
    <div className={classNames(styles.wrapper, className)} style={style}>
      <div className={styles.editorContainer}>
        <EditorContent editor={editor} className={styles.editor} />
      </div>
      
      {/* Render menus outside scrolling container to prevent clipping */}
      {showSlashCommands && (
        <SlashCommandMenu
          items={slashCommands}
          selectedIndex={editorState.selectedSlashIndex}
          query={editorState.slashQuery}
          position={editorState.slashMenuPosition}
          isVisible={editorState.showSlashMenu}
          onSelect={(item) => item.command()}
          onSelectionChange={(index) =>
            setEditorState((prev) => ({ ...prev, selectedSlashIndex: index }))
          }
        />
      )}
      
      {showSelectionToolbar && (
        <SelectionToolbar
          buttons={toolbarButtons}
          position={editorState.selectionToolbarPosition}
          isVisible={editorState.showSelectionToolbar}
          separatorAfter={['more']}
        />
      )}
    </div>
  );
};



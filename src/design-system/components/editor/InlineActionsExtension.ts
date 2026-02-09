import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import { createRoot, Root } from 'react-dom/client';
import { InlineActionsWidget } from './InlineActionsWidget';

/**
 * Options for the Inline Actions Extension
 */
export interface InlineActionsOptions {
  onGenerateSummary?: () => void;
  onCreateQuiz?: () => void;
  onAskQuestion?: () => void;
  onRecordClass?: () => void;
}

/**
 * Tiptap extension that adds inline action buttons to empty paragraphs
 * Uses React components from design system rendered via ReactDOM
 */
export const InlineActionsExtension = Extension.create<InlineActionsOptions>({
  name: 'inlineActions',

  addOptions() {
    return {
      onGenerateSummary: undefined,
      onCreateQuiz: undefined,
      onAskQuestion: undefined,
      onRecordClass: undefined,
    };
  },

  addProseMirrorPlugins() {
    const { options } = this;
    const rootsMap = new Map<HTMLElement, Root>();

    return [
      new Plugin({
        key: new PluginKey('inlineActions'),
        props: {
          decorations(state) {
            const { doc, selection } = state;
            const decorations: Decoration[] = [];

            // Show at end of paragraph when cursor is positioned there
            const { $from } = selection;
            
            if (
              selection.empty &&
              $from.parent.type.name === 'paragraph'
            ) {
              // Check if cursor is at the end of the paragraph
              // nodeSize - 2 accounts for the opening and closing tokens
              const isAtEnd = $from.parentOffset === $from.parent.nodeSize - 2;
              
              if (isAtEnd) {
                // Check if there's content below (next sibling node)
                const afterPos = $from.after();
                let hasContentBelow = false;
                
                // Safely check if there's a next node with content
                if (afterPos < doc.content.size) {
                  try {
                    const $after = doc.resolve(afterPos);
                    const nextNode = $after.nodeAfter;
                    hasContentBelow = nextNode !== null && nextNode.textContent.length > 0;
                  } catch (e) {
                    // If we can't resolve, assume no content below
                    hasContentBelow = false;
                  }
                }
                
                if (!hasContentBelow) {
                  // Position after the current paragraph
                  const pos = afterPos;

                  // Create container
                  const container = document.createElement('div');
                  container.className = 'inline-actions-container';
                  
                  // Create React root and render widget
                  const root = createRoot(container);
                  rootsMap.set(container, root);
                  
                  root.render(
                    InlineActionsWidget({
                      onGenerateSummary: options.onGenerateSummary,
                      onCreateQuiz: options.onCreateQuiz,
                      onAskQuestion: options.onAskQuestion,
                      onRecordClass: options.onRecordClass,
                    })
                  );

                  // Add decoration after the paragraph (one line below)
                  decorations.push(
                    Decoration.widget(pos, container, {
                      side: 1,
                      key: 'inline-actions',
                      destroy: (node) => {
                        // Clean up React root when decoration is destroyed
                        const root = rootsMap.get(node as HTMLElement);
                        if (root) {
                          root.unmount();
                          rootsMap.delete(node as HTMLElement);
                        }
                      },
                    })
                  );
                }
              }
            }

            return DecorationSet.create(doc, decorations);
          },
        },
        destroy() {
          // Clean up all roots on plugin destruction
          rootsMap.forEach((root) => root.unmount());
          rootsMap.clear();
        },
      }),
    ];
  },
});


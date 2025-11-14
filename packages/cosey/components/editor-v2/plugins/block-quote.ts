import { Editor, Element } from 'slate-vue3/core';
import { isNormalBlock } from '../utils';

declare module 'slate-vue3/core' {
  interface BaseEditor {
    formatBlockQuote: () => void;
    isBlockQuoteActive: () => boolean;
  }
}

function isBlockQuoteActive(editor: Editor) {
  if (!editor.selection) return false;

  const nodes = editor.nodes({
    at: editor.edges(editor.selection)[0],
    match: (n) => Element.isElement(n) && n.type === 'block-quote',
  });

  return !nodes.next().done;
}

function formatBlockQuote(editor: Editor) {
  if (!editor.selection) return;

  const isActive = editor.isBlockQuoteActive();

  editor.setNodes(
    {
      type: isActive ? 'paragraph' : 'block-quote',
    },
    {
      match: isNormalBlock,
    },
  );
}

export function withBlockQuote(editor: Editor) {
  editor.formatBlockQuote = () => {
    formatBlockQuote(editor);
  };

  editor.isBlockQuoteActive = () => {
    return isBlockQuoteActive(editor);
  };

  return editor;
}

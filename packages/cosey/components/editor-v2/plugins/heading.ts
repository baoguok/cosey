import { Editor, Element, Path } from 'slate-vue3/core';
import { DOMEditor } from 'slate-vue3/dom';

export const HEADING_TYPES = [
  'heading-one',
  'heading-two',
  'heading-three',
  'heading-four',
  'heading-five',
  'heading-six',
] as const;

export const HEADING_WITH_PARA_TYPES = ['paragraph', ...HEADING_TYPES] as const;

export type HeadingType = (typeof HEADING_TYPES)[number];

declare module 'slate-vue3/core' {
  interface BaseEditor {
    formatHeading: (value: HeadingType) => void;
  }
}

function formatHeading(editor: Editor, value: HeadingType) {
  DOMEditor.focus(editor);

  editor.setNodes<Element>({
    type: value,
  });
}

function insertBreak(editor: Editor) {
  const [match] = editor.nodes({
    match: (n) => Element.isElement(n) && /^heading/.test(n.type),
  });

  if (match) {
    const [, path] = match;
    const isAtEnd = Editor.isEnd(editor, editor.selection!.focus, path);

    if (isAtEnd) {
      const newParagraph = {
        type: 'paragraph' as const,
        children: [{ text: '' }],
      };
      editor.insertNodes(newParagraph, {
        at: Path.next(path),
      });
      editor.select(Path.next(path));
      return true;
    }
  }
}

export function withHeading(editor: Editor) {
  const { insertBreak: srcInsertBreak } = editor;

  editor.formatHeading = (value: HeadingType) => {
    formatHeading(editor, value);
  };

  editor.insertBreak = () => {
    if (!insertBreak(editor)) {
      srcInsertBreak();
    }
  };

  return editor;
}

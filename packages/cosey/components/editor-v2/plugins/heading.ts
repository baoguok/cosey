import { Editor, Element, Path, Transforms } from 'slate-vue3/core';
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

export function withHeading(editor: Editor) {
  const { insertBreak } = editor;

  editor.formatHeading = (value: HeadingType) => {
    DOMEditor.focus(editor);

    Transforms.setNodes<Element>(editor, {
      type: value,
    });
  };

  editor.insertBreak = () => {
    const [match] = Editor.nodes(editor, {
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
        Transforms.insertNodes(editor, newParagraph, {
          at: Path.next(path),
        });
        Transforms.select(editor, Path.next(path));
        return;
      }
    }

    insertBreak();
  };

  return editor;
}

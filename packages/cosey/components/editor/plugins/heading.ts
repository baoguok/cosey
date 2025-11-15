import { Editor, Element, Path } from 'slate-vue3/core';
import { type HeadingParagraphType } from '../types';
import { isHeading, isNormalBlock } from '../utils';

declare module 'slate-vue3/core' {
  interface BaseEditor {
    formatHeading: (value: HeadingParagraphType) => void;
    getActiveHeadingType: () => HeadingParagraphType;
  }
}

function getActiveHeadingType(editor: Editor) {
  if (!editor.selection) return 'paragraph';

  const nodes = editor.nodes({
    at: editor.edges(editor.selection)[0],
    match: isHeading,
  });

  const { done, value } = nodes.next();

  return done ? 'paragraph' : value[0].type;
}

function formatHeading(editor: Editor, value: HeadingParagraphType) {
  if (!editor.selection) return;

  const activeType = getActiveHeadingType(editor);

  if (activeType === value) {
    editor.setNodes<Element>(
      {
        type: 'paragraph',
      },
      { match: isNormalBlock },
    );
  } else {
    editor.setNodes<Element>(
      {
        type: value,
      },
      { match: isNormalBlock },
    );
  }
}

function insertBreak(editor: Editor) {
  const [match] = editor.nodes({
    match: isHeading,
  });

  if (match) {
    const [, path] = match;
    const isAtEnd = Editor.isEnd(editor, editor.selection!.focus, path);

    if (isAtEnd) {
      editor.insertNodes(
        {
          type: 'paragraph' as const,
          children: [{ text: '' }],
        },
        {
          at: Path.next(path),
        },
      );
      editor.select(Path.next(path));
      return true;
    }
  }
}

export function withHeading(editor: Editor) {
  const { insertBreak: srcInsertBreak } = editor;

  editor.formatHeading = (value: HeadingParagraphType) => {
    formatHeading(editor, value);
  };

  editor.insertBreak = () => {
    if (!insertBreak(editor)) {
      srcInsertBreak();
    }
  };

  editor.getActiveHeadingType = () => {
    return getActiveHeadingType(editor);
  };

  return editor;
}

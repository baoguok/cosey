import { Editor, Element } from 'slate-vue3/core';

const indentableElements = [
  'paragraph',
  'heading-one',
  'heading-two',
  'heading-three',
  'heading-four',
  'heading-five',
  'heading-six',
  'block-quote',
];

declare module 'slate-vue3/core' {
  interface BaseEditor {
    formatIndent: (value: number) => void;
  }
}

function formatIndent(editor: Editor, value: number) {
  if (!editor.selection) return;

  const nodeEntries = [
    ...editor.nodes({
      match(node) {
        return Element.isElement(node) && indentableElements.includes(node.type);
      },
    }),
  ];

  for (const entry of nodeEntries) {
    const element = entry[0] as Element;
    const path = entry[1];

    let indent = 'indent' in element ? element.indent || 0 : 0;
    indent += value;

    if (indent < 0) {
      indent = 0;
    }

    editor.setNodes<Element>(
      {
        indent,
      },
      {
        at: path,
      },
    );
  }
}

export function withIndent(editor: Editor) {
  editor.formatIndent = (value) => {
    formatIndent(editor, value);
  };

  return editor;
}

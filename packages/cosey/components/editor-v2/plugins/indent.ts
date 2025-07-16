import { Ancestor, Editor, Element, NodeEntry, Text, Transforms } from 'slate-vue3/core';
import { DOMEditor } from 'slate-vue3/dom';
import { INDENT_ELEMENT_TYPES, IndentElementType } from '../custom-types';

declare module 'slate-vue3/core' {
  interface BaseEditor {
    formatIndent: (value: number) => void;
  }
}

function indentNonList(editor: Editor, value: number) {
  const nodeEntries: NodeEntry<Ancestor>[] = [];

  // 遍历选区中的所有文本节点
  for (const [, path] of Editor.nodes(editor, {
    at: editor.selection!,
    match: Text.isText,
  })) {
    // 获取每个文本节点的最近 block 祖先
    const nodeEntry = Editor.above(editor, {
      at: path,
      match: (n) =>
        Element.isElement(n) && INDENT_ELEMENT_TYPES.includes(n.type as IndentElementType),
    });

    if (nodeEntry && nodeEntries.every(([el]) => el !== nodeEntry[0])) {
      nodeEntries.push(nodeEntry);
    }
  }

  for (const entry of nodeEntries) {
    const element = entry[0] as Element;
    const path = entry[1];

    let indent = 'indent' in element ? element.indent || 0 : 0;
    indent += value;

    if (indent < 0) {
      indent = 0;
    }

    Transforms.setNodes<Element>(
      editor,
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
  editor.formatIndent = (value: number) => {
    DOMEditor.focus(editor);

    editor.indentList(value);
    indentNonList(editor, value);
  };

  return editor;
}

import { Editor, Element, Text, Transforms } from 'slate-vue3/core';
import { DOMEditor } from 'slate-vue3/dom';

declare module 'slate-vue3/core' {
  interface BaseEditor {
    clearForamts: () => void;
  }
}

// todo: clear formats
export function withClear(editor: Editor) {
  editor.clearForamts = () => {
    DOMEditor.focus(editor);

    // 1. 清除行内文本样式（bold/italic/underline等）
    const textNodes = Array.from(
      Editor.nodes(editor, {
        at: editor.selection!,
        match: (n) => Text.isText(n),
      }),
    );

    textNodes.forEach(([node, path]) => {
      const newProps: Record<string, any> = {};
      Object.keys(node).forEach((key) => {
        if (key !== 'text') newProps[key] = undefined; // 清除所有文本样式
      });
      if (Object.keys(newProps).length > 0) {
        Transforms.setNodes(editor, newProps, { at: path });
      }
    });

    // 2. 清除块级元素的非必要属性（如align/color，但保留type）
    const elementNodes = Array.from(
      Editor.nodes(editor, {
        at: editor.selection!,
        match: (n) => Element.isElement(n),
      }),
    );

    elementNodes.forEach(([node, path]) => {
      const newProps: Record<string, any> = {};
      Object.keys(node).forEach((key) => {
        // 保留元素类型（type）和必要的结构属性（如list的level）
        if (key !== 'type' && key !== 'children' && key !== 'level') {
          newProps[key] = undefined; // 清除align/color等
        }
      });
      if (Object.keys(newProps).length > 0) {
        Transforms.setNodes(editor, newProps, { at: path });
      }
    });
  };

  return editor;
}

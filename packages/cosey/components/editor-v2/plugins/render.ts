import { type RenderElementProps, type RenderLeafProps } from 'slate-vue3';
import { Editor } from 'slate-vue3/core';
import { type CSSProperties, h, VNode } from 'vue';
import { isListItem } from './list';
import { mapElementTypeTagName } from '../custom-types';

export const INDENT_DELTA = 40;

declare module 'slate-vue3/core' {
  interface BaseEditor {
    renderElement: (props: RenderElementProps) => VNode;
    renderLeaf: (props: RenderLeafProps) => VNode;
  }
}

const renderElement = ({ attributes: attrs, children, element }: RenderElementProps) => {
  const attributes = {
    ...attrs,
    style: {
      textAlign: element.align,
      paddingLeft: element.indent ? element.indent * INDENT_DELTA + 'px' : '',
    } as CSSProperties,
  };

  if (isListItem(element)) {
    attributes.style.listStyle = element.onlyListAsChildren ? 'none' : undefined;
  }

  const tagName = mapElementTypeTagName[element.type] || 'p';
  return h(tagName, attributes, children);
};

const renderLeaf = ({ leaf, attributes, children }: RenderLeafProps) => {
  const style: CSSProperties = {};
  if ('bold' in leaf) {
    style.fontWeight = 'bold';
  }
  if ('italic' in leaf) {
    style.fontStyle = 'italic';
  }
  if ('underline' in leaf) {
    style.borderBottom = '1px solid black';
  }
  if ('strikethrough' in leaf) {
    style.textDecoration = 'line-through';
  }
  if ('font' in leaf) {
    style.fontFamily = leaf.font;
  }
  if ('size' in leaf) {
    style.fontSize = leaf.size;
  }
  if ('color' in leaf) {
    style.color = leaf.color;
  }
  if ('background' in leaf) {
    style.background = leaf.background;
  }

  return h(
    'code' in leaf ? 'code' : 'superscript' in leaf ? 'sup' : 'subscript' in leaf ? 'sub' : 'span',
    { ...attributes, style },
    children,
  );
};

export function withRender(editor: Editor) {
  editor.renderLeaf = renderLeaf;
  editor.renderElement = renderElement;

  return editor;
}

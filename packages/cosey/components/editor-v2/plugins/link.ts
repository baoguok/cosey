import { Editor, Transforms } from 'slate-vue3/core';
import { type CustomElement } from '../types';
import { RenderElementProps } from 'slate-vue3';
import { h } from 'vue';
import { LinkComponent } from '../link-component';

declare module 'slate-vue3/core' {
  interface BaseEditor {
    formatLink: (url: string, target: string, text: string) => void;
  }
}

export function withLink(editor: Editor) {
  const isInline = editor.isInline;
  editor.isInline = (value: CustomElement) => {
    return value.type === 'link' ? true : isInline(value);
  };

  // format
  editor.formatLink = (url: string, target: string, text: string) => {
    Transforms.wrapNodes(
      editor,
      { type: 'link', target, url, children: [{ text }] },
      { split: true },
    );
  };

  // render element
  const renderElement = editor.renderElement;
  editor.renderElement = (props: RenderElementProps) => {
    const { attributes, children, element } = props;

    if (element.type === 'link') {
      return h(
        LinkComponent,
        {
          ...attributes,
          url: element.url,
          target: element.target,
        },
        () => children,
      );
    }

    return renderElement(props);
  };

  return editor;
}

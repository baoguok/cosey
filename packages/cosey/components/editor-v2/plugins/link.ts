import { Editor, Element, Location, Transforms } from 'slate-vue3/core';
import { LinkElement, type CustomElement } from '../types';
import { RenderElementProps } from 'slate-vue3';
import { h } from 'vue';
import { LinkComponent } from '../link-component';

declare module 'slate-vue3/core' {
  interface BaseEditor {
    formatLink: (url: string, target: string, text: string) => void;
  }
}

export function unwrapLink(editor: Editor, at?: Location) {
  Transforms.unwrapNodes(editor, {
    match: (n) => Element.isElement(n) && n.type === 'link',
    at,
  });
}

export function wrapLink(editor: Editor, url: string, target: string, text: string) {
  const link: LinkElement = {
    type: 'link',
    url,
    target,
    children: [{ text }],
  };

  Transforms.delete(editor);
  Transforms.insertNodes(editor, link);
}

export function withLink(editor: Editor) {
  // is inline
  const isInline = editor.isInline;
  editor.isInline = (value: CustomElement) => {
    return value.type === 'link' ? true : isInline(value);
  };

  // format link
  editor.formatLink = (url: string, target: string, text: string) => {
    unwrapLink(editor);
    wrapLink(editor, url, target, text);
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
          element,
        },
        () => children,
      );
    }

    return renderElement(props);
  };

  return editor;
}

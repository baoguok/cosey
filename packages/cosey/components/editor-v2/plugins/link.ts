import { Editor, Element, Location } from 'slate-vue3/core';
import { LinkElement } from '../types';
import { type RenderElementProps } from 'slate-vue3';
import { h } from 'vue';
import { LinkComponent } from '../link-component';

declare module 'slate-vue3/core' {
  interface BaseEditor {
    formatLink: (url: string, target: string, text: string) => void;
  }
}

export function unwrapLink(editor: Editor, at?: Location) {
  editor.unwrapNodes({
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

  editor.delete();
  editor.insertNodes(link);
}

export function withLink(editor: Editor) {
  // is inline
  const isInline = editor.isInline;
  editor.isInline = (element) => {
    return element.type === 'link' ? true : isInline(element);
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

  // format link
  editor.formatLink = (url: string, target: string, text: string) => {
    unwrapLink(editor);
    wrapLink(editor, url, target, text);
  };

  return editor;
}

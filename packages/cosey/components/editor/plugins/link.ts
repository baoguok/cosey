import { Editor, Element, Location } from 'slate-vue3/core';
import { LinkElement } from '../types';
import { useInheritRef, type RenderElementProps } from 'slate-vue3';
import { h } from 'vue';
import ContentLink from '../contents/content-link';

declare module 'slate-vue3/core' {
  interface BaseEditor {
    formatLink: (url: string, target: string, text: string) => void;
    unwrapLink: (at?: Location) => void;
  }
}

function unwrapLink(editor: Editor, at?: Location) {
  editor.unwrapNodes({
    match: (n) => Element.isElement(n) && n.type === 'link',
    at,
  });
}

function wrapLink(editor: Editor, url: string, target: string, text: string) {
  const link: LinkElement = {
    type: 'link',
    url,
    target,
    children: [{ text }],
  };

  editor.delete();
  editor.insertNodes(link);
}

function formatLink(editor: Editor, url: string, target: string, text: string) {
  unwrapLink(editor);
  wrapLink(editor, url, target, text);
}

export function withLink(editor: Editor) {
  const { isInline, renderElement } = editor;

  editor.isInline = (element) => {
    return element.type === 'link' ? true : isInline(element);
  };

  editor.renderElement = (props: RenderElementProps) => {
    const { attributes, children, element } = props;

    if (element.type === 'link') {
      return h(
        ContentLink,
        {
          ...useInheritRef(attributes),
          url: element.url,
          target: element.target,
          element,
        },
        () => children,
      );
    }

    return renderElement(props);
  };

  editor.formatLink = (url: string, target: string, text: string) => {
    formatLink(editor, url, target, text);
  };

  editor.unwrapLink = (at?: Location) => {
    unwrapLink(editor, at);
  };

  return editor;
}

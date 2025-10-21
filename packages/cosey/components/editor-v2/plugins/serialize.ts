import { escapeHtml, hyphenate, parseStringStyle } from '@vue/shared';
import { Descendant, Editor, isEditor, Node as SlateNode, Text } from 'slate-vue3/core';
import { jsx } from 'slate-vue3/hyperscript';
import { isString, toArray } from '../../../utils';
import {
  type CustomElement,
  type CustomText,
  mapElementTypeTagName,
  mapTagNameElementType,
} from '../types';
import { INDENT_DELTA } from './render';
import { FormatAlign } from './align';

type DeserializeResult = Descendant | null | Descendant[];

declare module 'slate-vue3/core' {
  interface BaseEditor {
    serialize: () => string;
    deserialize: (html: string) => Descendant[];
  }
}

type Style = Record<string, string | number | undefined | null>;

function stringifyStyle(styles: Style): string {
  let ret = '';
  for (const key in styles) {
    const value = styles[key];
    if ((isString(value) && value !== '') || typeof value === 'number') {
      const normalizedKey = hyphenate(key);
      ret += `${normalizedKey}:${value};`;
    }
  }
  return ret;
}

function getLanguageByClass(cls: string) {
  return cls.match(/language-([^ ]+)/)?.[1] || 'text';
}

function serialize(node: SlateNode): string {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    if (node.strikethrough) {
      string = `<s>${string}</s>`;
    }
    if (node.underline) {
      string = `<u>${string}</u>`;
    }
    if (node.italic) {
      string = `<em>${string}</em>`;
    }
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }
    if (node.code) {
      string = `<code>${string}</code>`;
    }
    if (node.superscript) {
      string = `<sup>${string}</sup>`;
    }
    if (node.subscript) {
      string = `<sub>${string}</sub>`;
    }

    const styles = stringifyStyle({
      fontFamily: node.font,
      fontSize: node.size,
      color: node.color,
      background: node.background,
    });
    if (styles) {
      string = `<span style="${styles}">${string}</span>`;
    }
    return string;
  }

  let children = '';

  if (Editor.isEditor(node) || node.type !== 'code-block') {
    children = node.children.map((n) => serialize(n)).join('');
  }

  if (isEditor(node)) {
    return children;
  }

  switch (node.type) {
    case 'code-block':
      return `<pre class="language-${node.language}">${node.children
        .map((n) => serialize(n))
        .join('\n')}</pre>`;
    case 'block':
    case 'paragraph':
    case 'block-quote':
    case 'bulleted-list':
    case 'numbered-list':
    case 'list-item':
    case 'heading-one':
    case 'heading-two':
    case 'heading-three':
    case 'heading-four':
    case 'heading-five':
    case 'heading-six': {
      const styles = stringifyStyle({
        paddingLeft: node.indent ? node.indent * INDENT_DELTA + 'px' : null,
        textAlign: node.align,
      });
      const styleAttrs = styles ? ` style="${styles}"` : '';

      const tagName = mapElementTypeTagName[node.type];
      return `<${tagName}${styleAttrs}>${children}</${tagName}>`;
    }
    default:
      return children;
  }
}

function deserialize(node: Node, markAttributes = {}): DeserializeResult {
  if (node.nodeType === Node.TEXT_NODE) {
    if (!node.textContent || /^\s+$/.test(node.textContent)) return null;
    return jsx(
      'text',
      markAttributes,
      node.textContent.trim().replace(/\n+/g, ' ').replace(/ +/g, ' '),
    );
  } else if (node.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  const element = node as Element;

  if (element.tagName === 'PRE') {
    return jsx(
      'element',
      {
        type: 'code-block',
        language: getLanguageByClass(element.getAttribute('class') || ''),
      },
      element.textContent.split('\n').map((text) =>
        jsx(
          'element',
          {
            type: 'code-line',
          },
          [jsx('text', {}, text)],
        ),
      ),
    );
  }

  const nodeAttributes: Omit<CustomText, 'text'> & Omit<CustomElement, 'type' | 'children'> = {
    ...markAttributes,
  };

  switch (element.tagName) {
    case 'STRONG':
    case 'B':
      nodeAttributes.bold = true;
      break;
    case 'EM':
    case 'I':
      nodeAttributes.italic = true;
      break;
    case 'U':
      nodeAttributes.underline = true;
      break;
    case 'DEL':
    case 'S':
      nodeAttributes.strikethrough = true;
      break;
  }

  const children = Array.from(element.childNodes)
    .map((node) => deserialize(node, nodeAttributes))
    .flat()
    .filter(Boolean) as Descendant[];

  if (children.length === 0) {
    children.push(jsx('text', nodeAttributes, ''));
  }

  switch (element.tagName) {
    case 'BODY':
      return jsx('fragment', {}, children);
    case 'DIV':
    case 'P':
    case 'BLOCKQUOTE':
    case 'UL':
    case 'OL':
    case 'LI':
    case 'H1':
    case 'H2':
    case 'H3':
    case 'H4':
    case 'H5':
    case 'H6': {
      const attributes: Omit<CustomElement, 'type' | 'children'> = {};
      const styleStr = element.getAttribute('style');
      const styleObj = styleStr ? parseStringStyle(styleStr) : {};
      if (styleObj['padding-left']) {
        attributes.indent = parseFloat(styleObj['padding-left'] as string) / INDENT_DELTA;
      }
      if (styleObj['text-align']) {
        attributes.align = styleObj['text-align'] as FormatAlign;
      }
      return jsx(
        'element',
        { type: mapTagNameElementType[element.tagName], ...attributes },
        children,
      );
    }
    default:
      return children;
  }
}

export function withSerialize(editor: Editor) {
  editor.serialize = () => {
    return serialize(editor).trim();
  };

  editor.deserialize = (html: string) => {
    const document = new DOMParser().parseFromString(html, 'text/html');
    console.log(document.body.childNodes);
    const result = deserialize(document.body);
    const fragment = result ? toArray(result) : [];
    return fragment.map((item) => {
      if (Text.isText(item)) {
        return {
          type: 'paragraph',
          children: [item],
        };
      }
      return item;
    });
  };

  return editor;
}

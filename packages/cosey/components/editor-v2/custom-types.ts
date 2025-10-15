/// <reference types="vite/client" />
import { Descendant, BaseEditor, BaseRange } from 'slate-vue3/core';
import type { DOMEditor } from 'slate-vue3/dom';
import { HEADING_WITH_PARA_TYPES } from './plugins/heading';
import { type FormatAlign } from './plugins/align';

export const LIST_TYPES = ['numbered-list', 'bulleted-list'] as const;

export type ListType = (typeof LIST_TYPES)[number];

export const LIST_ITEM = 'list-item';

export const LIST_AND_ITEM_TYPES = [...LIST_TYPES, LIST_ITEM] as const;

export type ListTypeWithItem = (typeof LIST_AND_ITEM_TYPES)[number];

export type HeadingWithParaType = (typeof HEADING_WITH_PARA_TYPES)[number];

export const INDENT_ELEMENT_TYPES = [...HEADING_WITH_PARA_TYPES, 'block-quote'] as const;

export type IndentElementType = (typeof INDENT_ELEMENT_TYPES)[number];

export const mapElementTypeTagName: Record<string, string> = {
  block: 'div',
  paragraph: 'p',
  'block-quote': 'blockquote',
  'bulleted-list': 'ul',
  'numbered-list': 'ol',
  'list-item': 'li',
  'heading-one': 'h1',
  'heading-two': 'h2',
  'heading-three': 'h3',
  'heading-four': 'h4',
  'heading-five': 'h5',
  'heading-six': 'h6',
  'code-block': 'pre',
};

export const mapTagNameElementType = Object.fromEntries(
  Object.entries(mapElementTypeTagName).map(([elementType, tagName]) => [
    tagName.toUpperCase(),
    elementType,
  ]),
);

export type ParagraphElement = {
  type: 'paragraph';
  children: Descendant[];
};

export type BlockQuoteElement = {
  type: 'block-quote';
  children: Descendant[];
};

export type BlockElement = {
  type: 'block';
  children: Descendant[];
};

export type BulletedListElement = {
  type: 'bulleted-list';
  children: Descendant[];
};

export type NumberedListElement = {
  type: 'numbered-list';
  children: Descendant[];
};

export type ListItemElement = {
  type: typeof LIST_ITEM;
  onlyListAsChildren?: boolean;
  children: Descendant[];
};

export type EditableVoidElement = {
  type: 'editable-void';
  children: EmptyText[];
};

export type HeadingOneElement = {
  type: 'heading-one';
  children: Descendant[];
};

export type HeadingTwoElement = {
  type: 'heading-two';
  children: Descendant[];
};

export type HeadingThreeElement = {
  type: 'heading-three';
  children: Descendant[];
};

export type HeadingFourElement = {
  type: 'heading-four';
  children: Descendant[];
};

export type HeadingFiveElement = {
  type: 'heading-five';
  children: Descendant[];
};

export type HeadingSixElement = {
  type: 'heading-six';
  children: Descendant[];
};

export type ImageElement = {
  type: 'image';
  url: string;
  children: EmptyText[];
};

export type LinkElement = { type: 'link'; url: string; children: Descendant[] };

export type ButtonElement = { type: 'button'; children: Descendant[] };

export type TableElement = { type: 'table'; children: any[] };

export type TableCellElement = { type: 'table-cell'; children: CustomText[] };

export type TableRowElement = { type: 'table-row'; children: any[] };

export type TitleElement = { type: 'title'; children: Descendant[] };

export type VideoElement = {
  type: 'video';
  url: string;
  children: EmptyText[];
};

export type CodeBlockElement = {
  type: 'code-block';
  language: string;
  children: Descendant[];
};

export type CodeLineElement = {
  type: 'code-line';
  children: Descendant[];
};

export type CustomElement = (
  | BlockQuoteElement
  | BlockElement
  | BulletedListElement
  | NumberedListElement
  | EditableVoidElement
  | HeadingOneElement
  | HeadingTwoElement
  | HeadingThreeElement
  | HeadingFourElement
  | HeadingFiveElement
  | HeadingSixElement
  | ImageElement
  | LinkElement
  | ButtonElement
  | ListItemElement
  | ParagraphElement
  | TableElement
  | TableRowElement
  | TableCellElement
  | TitleElement
  | VideoElement
  | CodeBlockElement
  | CodeLineElement
) & {
  indent?: number;
  align?: FormatAlign;
};

export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  superscript?: boolean;
  subscript?: boolean;
  font?: string;
  size?: string;
  color?: string;
  background?: string;
};

export type EmptyText = {
  text: string;
} & CustomText;

export type CustomEditor = BaseEditor & DOMEditor;

declare module 'slate-vue3/core' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText | EmptyText;
    Range: BaseRange & {
      [key: string]: unknown;
    };
  }
}

/// <reference types="vite/client" />
import { Descendant, BaseEditor, BaseRange } from 'slate-vue3/core';
import type { DOMEditor } from 'slate-vue3/dom';
import { type FormatAlign } from './plugins/align';

export const LIST_TYPES = ['numbered-list', 'bulleted-list'] as const;

export type ListType = (typeof LIST_TYPES)[number];

export const LIST_ITEM = 'list-item';

export const mapElementTypeTagName: Record<string, string> = {
  paragraph: 'p',
  'heading-one': 'h1',
  'heading-two': 'h2',
  'heading-three': 'h3',
  'heading-four': 'h4',
  'heading-five': 'h5',
  'heading-six': 'h6',
  'block-quote': 'blockquote',
  'bulleted-list': 'ul',
  'numbered-list': 'ol',
  'list-item': 'li',
  'code-block': 'pre',
  table: 'table',
  'table-head': 'thead',
  'table-body': 'tbody',
  'table-row': 'tr',
  'table-cell': 'td',
};

export const tagToElementTypeMap = Object.fromEntries(
  Object.entries(mapElementTypeTagName).map(([elementType, tagName]) => [
    tagName.toUpperCase(),
    elementType,
  ]),
);

export type ParagraphElement = {
  type: 'paragraph';
  children: Descendant[];
  align?: FormatAlign;
  indent?: number;
};

export type HeadingOneElement = {
  type: 'heading-one';
  children: Descendant[];
  align?: FormatAlign;
  indent?: number;
};

export type HeadingTwoElement = {
  type: 'heading-two';
  children: Descendant[];
  align?: FormatAlign;
  indent?: number;
};

export type HeadingThreeElement = {
  type: 'heading-three';
  children: Descendant[];
  align?: FormatAlign;
  indent?: number;
};

export type HeadingFourElement = {
  type: 'heading-four';
  children: Descendant[];
  align?: FormatAlign;
  indent?: number;
};

export type HeadingFiveElement = {
  type: 'heading-five';
  children: Descendant[];
  align?: FormatAlign;
  indent?: number;
};

export type HeadingSixElement = {
  type: 'heading-six';
  children: Descendant[];
  align?: FormatAlign;
  indent?: number;
};

export type BlockQuoteElement = {
  type: 'block-quote';
  children: Descendant[];
  align?: FormatAlign;
  indent?: number;
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
  children: Descendant[];
};

export type ImageElement = {
  type: 'image';
  url: string;
  width?: string | number;
  height?: string | number;
  file?: File;
  children: EmptyText[];
};

export type VideoElement = {
  type: 'video';
  url: string;
  width?: string | number;
  height?: string | number;
  children: EmptyText[];
};

export type LinkElement = {
  type: 'link';
  url: string;
  target: string;
  children: Descendant[];
};

export type TableElement = {
  type: 'table';
  children: Descendant[];
};

export type TableHeadElement = {
  type: 'table-head';
  children: Descendant[];
};

export type TableBodyElement = {
  type: 'table-body';
  children: Descendant[];
};

export type TableRowElement = {
  type: 'table-row';
  children: Descendant[];
};

export type TableCellElement = {
  type: 'table-cell';
  children: CustomText[];
  align?: FormatAlign;
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

export type CustomElement =
  | ParagraphElement
  | HeadingOneElement
  | HeadingTwoElement
  | HeadingThreeElement
  | HeadingFourElement
  | HeadingFiveElement
  | HeadingSixElement
  | BlockQuoteElement
  | BulletedListElement
  | NumberedListElement
  | ListItemElement
  | ImageElement
  | VideoElement
  | LinkElement
  | TableElement
  | TableHeadElement
  | TableBodyElement
  | TableRowElement
  | TableCellElement
  | CodeBlockElement
  | CodeLineElement;

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

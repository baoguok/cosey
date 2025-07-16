<template>
  <div :class="[hashId, prefixCls]">
    <Slate :editor="editor" :render-element="renderElement" :render-leaf="renderLeaf">
      <Boolbar>
        <ButtonGroup>
          <FormatHeading />
          <FormatFont />
          <FormatSize />
        </ButtonGroup>
        <ButtonGroup>
          <FormatMark format="bold" icon="co:text-bold" />
          <FormatMark format="italic" icon="co:text-italic" />
          <FormatMark format="underline" icon="co:text-underline" />
          <FormatMark format="strikethrough" icon="co:text-strikethrough" />
        </ButtonGroup>
        <ButtonGroup>
          <FormatMark format="superscript" icon="co:text-superscript" />
          <FormatMark format="subscript" icon="co:text-subscript" />
        </ButtonGroup>
        <ButtonGroup>
          <FormatColor />
          <FormatBackground />
        </ButtonGroup>
        <ButtonGroup>
          <ListType format="numbered-list" icon="co:list-numbered" />
          <ListType format="bulleted-list" icon="co:list-bulleted" />
        </ButtonGroup>
        <ButtonGroup>
          <FormatIndent :delta="-1" icon="co:text-indent-less" />
          <FormatIndent :delta="+1" icon="co:text-indent-more" />
        </ButtonGroup>
        <ButtonGroup>
          <FormatAlign format="left" icon="co:text-align-left" />
          <FormatAlign format="center" icon="co:text-align-center" />
          <FormatAlign format="right" icon="co:text-align-right" />
          <FormatAlign format="justify" icon="co:text-align-justify" />
        </ButtonGroup>
        <ButtonGroup>
          <FormatBlock format="block-quote" icon="co:quotes" />
          <FormatMark format="code" icon="co:code" />
        </ButtonGroup>
        <ButtonGroup>
          <FormatClear />
        </ButtonGroup>
      </Boolbar>
      <div
        :class="[
          `${prefixCls}-container`,
          {
            'is-focus': isFocus,
          },
        ]"
      >
        <Editable
          :class="`${prefixCls}-content`"
          @focus="onFocus"
          @blur="onBlur"
          @keydown="editor.onKeydown"
        />
      </div>
    </Slate>
  </div>
</template>

<script setup lang="ts">
import { Slate, Editable, type RenderLeafProps, type RenderElementProps } from 'slate-vue3';
import { createEditor } from 'slate-vue3/core';
import { withDOM } from 'slate-vue3/dom';
import { withHistory } from 'slate-vue3/history';
import Boolbar from './toolbar.vue';
import ButtonGroup from './button-group.vue';
import FormatMark from './format-mark.vue';
import FormatBlock from './format-block.vue';
import FormatHeading from './format-heading.vue';
import FormatFont from './format-font.vue';
import FormatSize from './format-size.vue';
import FormatColor from './format-color.vue';
import FormatBackground from './format-background.vue';
import FormatIndent from './format-indent.vue';
import FormatAlign from './format-align.vue';
import ListType from './format-list.vue';
import FormatClear from './format-clear.vue';

import {
  type EditorV2Props,
  type EditorV2Slots,
  type EditorV2Emits,
  type EditorV2Expose,
} from './editor-v2';
import useStyle from './style';
import { useComponentConfig } from '../config-provider';
import { type CSSProperties, h } from 'vue';
import { mapElementTypeTagName, type CustomElement } from './custom-types';
import { useFocus } from './hooks/useFocus';
import { withDefaultPlugins } from './plugins';
import { isListItem } from './plugins/list';

defineOptions({
  name: 'EditorV2',
});

const props = defineProps<EditorV2Props>();

defineSlots<EditorV2Slots>();

defineEmits<EditorV2Emits>();

const { prefixCls } = useComponentConfig('editor', props);

const { hashId } = useStyle(prefixCls);

defineExpose<EditorV2Expose>();

const list = {
  type: 'bulleted-list',
  children: [
    {
      type: 'list-item',
      children: [
        { text: '111' },
        {
          type: 'bulleted-list',
          children: [
            {
              type: 'list-item',
              children: [
                { text: '111-111' },
                {
                  type: 'bulleted-list',
                  children: [
                    {
                      type: 'list-item',
                      children: [{ text: '111-111-111' }],
                    },
                    {
                      type: 'list-item',
                      children: [{ text: '111-111-222' }],
                    },
                    {
                      type: 'list-item',
                      children: [{ text: '111-111-333' }],
                    },
                    {
                      type: 'list-item',
                      children: [{ text: '111-111-444' }],
                    },
                    {
                      type: 'list-item',
                      children: [{ text: '111-111-555' }],
                    },
                  ],
                },
              ],
            },
            {
              type: 'list-item',
              children: [{ text: '111-222' }],
            },
            {
              type: 'list-item',
              children: [{ text: '111-333' }],
            },
          ],
        },
      ],
    },
    {
      type: 'list-item',
      children: [{ text: '222' }],
    },
  ],
};

// main
const initialValue: CustomElement[] = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
  list,
  {
    type: 'paragraph',
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text: ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  JSON.parse(JSON.stringify(list)),
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    align: 'center',
    children: [{ text: 'Try it out for yourself!' }],
  },
];

const renderElement = ({ attributes: attrs, children, element }: RenderElementProps) => {
  const attributes = {
    ...attrs,
    style: {
      textAlign: element.align,
      paddingLeft: element.indent ? element.indent * 40 + 'px' : '',
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

const editor = withDefaultPlugins(withHistory(withDOM(createEditor())));
editor.children = initialValue;

const { isFocus, onFocus, onBlur } = useFocus();
</script>

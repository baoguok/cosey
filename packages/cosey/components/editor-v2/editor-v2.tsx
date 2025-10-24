import { defineComponent, onMounted, provide, useTemplateRef } from 'vue';
import { Slate, Editable } from 'slate-vue3';
import { createEditor } from 'slate-vue3/core';
import { withDOM } from 'slate-vue3/dom';
import { withHistory } from 'slate-vue3/history';

import Toolbar from './toolbar';
import ButtonGroup from './button-group';
import FormatMark from './format-mark';
import FormatBlock from './format-block';
import FormatHeading from './format-heading';
import FormatFont from './format-font';
import FormatSize from './format-size';
import FormatColor from './format-color';
import FormatBackground from './format-background';
import FormatIndent from './format-indent';
import FormatAlign from './format-align';
import ListType from './format-list';
import FormatClear from './format-clear';
import FormatSource from './format-source';
import FormatLink from './format-link';
import FormatCodeBlock from './format-code-block';
import FormatImage from './format-image';
import FormatVideo from './format-video';

import { editorV2Props, editorV2Slots, editorV2Emits, editorContextKey } from './editor-v2.api';
import useStyle from './editor-v2.style';
import { useComponentConfig } from '../config-provider';
import { type CustomElement } from './types';
import { useFocus } from './hooks/useFocus';
import { withDefaultPlugins } from './plugins';

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
        text: ', or add a semantically ',
      },
      {
        type: 'link',
        target: '_blank',
        url: 'https://www.baidu.com',
        children: [{ text: 'rendered block quote' }],
      },
      {
        text: ' in the middle of the page, like this:',
      },
    ],
  },
  JSON.parse(JSON.stringify(list)),
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'code-block',
    language: 'js',
    children: `function stringifyStyle(styles: Style): string {
      let ret = '';
      for (const key in styles) {
        const value = styles[key];
        if ((isString(value) && value !== '') || typeof value === 'number') {
          const normalizedKey = hyphenate(key);
        }
      }
      return ret;
    }`
      .split('\n')
      .map((text) => ({ type: 'code-line', children: [{ text }] })),
  },
  {
    type: 'paragraph',
    align: 'center',
    children: [{ text: 'Try it out for yourself!' }],
  },
];

export default defineComponent({
  name: 'EditorV2',
  props: editorV2Props,
  slots: editorV2Slots,
  emits: editorV2Emits,
  setup(props) {
    const { prefixCls } = useComponentConfig('editor', props);

    const { hashId } = useStyle(prefixCls);

    // main

    const editor = withDefaultPlugins(withHistory(withDOM(createEditor())));
    editor.children = initialValue;

    const { isFocus, onFocus, onBlur } = useFocus();

    // popover container
    const popoverContainer = document.createElement('div');
    const popoverWrapper = document.createElement('div');
    popoverContainer.append(popoverWrapper);
    Object.assign(popoverContainer.style, {
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
    });
    Object.assign(popoverWrapper.style, {
      pointerEvents: 'auto',
    });

    const wrapperRef = useTemplateRef<HTMLDivElement>('wrapper');

    onMounted(() => {
      wrapperRef.value!.append(popoverContainer);
    });

    provide(editorContextKey, {
      popoverWrapper,
    });

    return () => {
      return (
        <div class={[hashId.value, prefixCls.value]}>
          <Slate
            editor={editor}
            renderElement={editor.renderElement}
            renderLeaf={editor.renderLeaf}
            decorate={editor.decorate}
          >
            <Toolbar>
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
                <FormatIndent delta={-1} icon="co:text-indent-less" />
                <FormatIndent delta={+1} icon="co:text-indent-more" />
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
                <FormatLink />
                <FormatImage />
                <FormatVideo />
                <FormatCodeBlock />
              </ButtonGroup>
              <ButtonGroup>
                <FormatClear />
              </ButtonGroup>
              <ButtonGroup>
                <FormatSource />
              </ButtonGroup>
            </Toolbar>
            <div
              class={[
                `${prefixCls.value}-container`,
                {
                  'is-focus': isFocus.value,
                },
              ]}
            >
              <div
                ref="wrapper"
                class={[`${prefixCls.value}-wrapper`]}
                style={{
                  height: props.height,
                  maxHeight: props.maxHeight,
                }}
              >
                <Editable
                  class={`${prefixCls.value}-content`}
                  {...{ onFocus: onFocus, onBlur: onBlur, onKeydown: editor.onKeydown }}
                />
              </div>
            </div>
          </Slate>
        </div>
      );
    };
  },
});

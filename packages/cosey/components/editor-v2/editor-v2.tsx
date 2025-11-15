import { defineComponent, onMounted, provide, useTemplateRef } from 'vue';
import { Slate, Editable } from 'slate-vue3';
import { createEditor } from 'slate-vue3/core';
import { withDOM } from 'slate-vue3/dom';
import { withHistory } from 'slate-vue3/history';

import Toolbar from './toolbar';
import ButtonGroup from './button-group';
import FormatMark from './formats/format-mark';
import FormatHeading from './formats/format-heading';
import FormatBlockQuote from './formats/format-block-quote';
import FormatTable from './formats/format-table';
import FormatFont from './formats/format-font';
import FormatSize from './formats/format-size';
import FormatColor from './formats/format-color';
import FormatBackground from './formats/format-background';
import FormatIndent from './formats/format-indent';
import FormatAlign from './formats/format-align';
import ListType from './formats/format-list';
import FormatClear from './formats/format-clear';
import FormatSource from './formats/format-source';
import FormatLink from './formats/format-link';
import FormatCodeBlock from './formats/format-code-block';
import FormatImage from './formats/format-image';
import FormatVideo from './formats/format-video';

import { editorV2Props, editorV2Slots, editorV2Emits, editorContextKey } from './editor-v2.api';
import useStyle from './editor-v2.style';
import { useComponentConfig } from '../config-provider';
import { type CustomElement } from './types';
import { useFocus } from './hooks/useFocus';
import { withDefaultPlugins } from './plugins';
import FormatFormula from './formats/format-formula';

const list = {
  type: 'bulleted-list',
  children: [
    {
      type: 'list-item',
      listType: 'bulleted-list',
      level: 0,
      children: [
        {
          text: '列表项1 ',
        },
      ],
    },
    {
      type: 'list-item',
      listType: 'numbered-list',
      level: 1,
      children: [
        {
          text: '列表项11 ',
        },
      ],
    },
    {
      type: 'list-item',
      listType: 'bulleted-list',
      level: 2,
      children: [
        {
          text: '列表项111 ',
        },
      ],
    },
    {
      type: 'list-item',
      listType: 'numbered-list',
      level: 3,
      children: [
        {
          text: '列表项1111',
        },
      ],
    },
    {
      type: 'list-item',
      listType: 'numbered-list',
      level: 3,
      children: [
        {
          text: '列表项2222',
        },
      ],
    },
    {
      type: 'list-item',
      listType: 'numbered-list',
      level: 3,
      children: [
        {
          text: '列表项3333',
        },
      ],
    },
    {
      type: 'list-item',
      listType: 'bulleted-list',
      level: 2,
      children: [
        {
          text: '列表项222',
        },
      ],
    },
    {
      type: 'list-item',
      listType: 'bulleted-list',
      level: 2,
      children: [
        {
          text: '列表项333',
        },
      ],
    },
    {
      type: 'list-item',
      listType: 'numbered-list',
      level: 1,
      children: [
        {
          text: '列表项22',
        },
      ],
    },
    {
      type: 'list-item',
      listType: 'numbered-list',
      level: 1,
      children: [
        {
          text: '列表项33',
        },
      ],
    },
    {
      type: 'list-item',
      listType: 'bulleted-list',
      level: 0,
      children: [
        {
          text: '列表项2',
        },
      ],
    },
    {
      type: 'list-item',
      listType: 'bulleted-list',
      level: 0,
      children: [
        {
          text: '列表项3',
        },
      ],
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
  {
    type: 'table',
    children: [
      {
        type: 'table-body',
        children: [
          {
            type: 'table-row',
            children: [
              {
                type: 'table-cell',
                children: [
                  {
                    type: 'paragraph',
                    children: [{ text: '' }],
                  },
                ],
              },
              {
                type: 'table-cell',
                children: [
                  {
                    type: 'paragraph',
                    children: [{ text: 'Human', bold: true }],
                  },
                ],
              },
              {
                type: 'table-cell',
                children: [
                  {
                    type: 'paragraph',
                    children: [{ text: 'Dog', bold: true }],
                  },
                ],
              },
              {
                type: 'table-cell',
                children: [
                  {
                    type: 'paragraph',
                    children: [{ text: 'Cat', bold: true }],
                  },
                ],
              },
            ],
          },
          {
            type: 'table-row',
            children: [
              {
                type: 'table-cell',
                children: [
                  {
                    type: 'paragraph',
                    children: [{ text: '# of Feet', bold: true }],
                  },
                ],
              },
              {
                type: 'table-cell',
                children: [
                  {
                    type: 'paragraph',
                    children: [{ text: '2' }],
                  },
                ],
              },
              {
                type: 'table-cell',
                children: [
                  {
                    type: 'paragraph',
                    children: [{ text: '4' }],
                  },
                ],
              },
              {
                type: 'table-cell',
                children: [
                  {
                    type: 'paragraph',
                    children: [{ text: '8' }],
                  },
                ],
              },
            ],
          },
          {
            type: 'table-row',
            children: [
              {
                type: 'table-cell',
                children: [
                  {
                    type: 'paragraph',
                    children: [{ text: '# of Lives', bold: true }],
                  },
                ],
              },
              {
                type: 'table-cell',
                children: [
                  {
                    type: 'paragraph',
                    children: [{ text: '1' }],
                  },
                ],
              },
              {
                type: 'table-cell',
                children: [
                  {
                    type: 'paragraph',
                    children: [{ text: '5' }],
                  },
                ],
              },
              {
                type: 'table-cell',
                children: [
                  {
                    type: 'paragraph',
                    children: [{ text: '9' }],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
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
    const { prefixCls } = useComponentConfig('editor-v2', props);

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
            renderPlaceholder={editor.renderPlaceholder}
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
                <FormatBlockQuote />
                <FormatMark format="code" icon="co:code" />
              </ButtonGroup>
              <ButtonGroup>
                <FormatLink />
                <FormatImage />
                <FormatVideo />
                <FormatTable />
                <FormatCodeBlock />
                <FormatFormula />
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
                  placeholder="Type something"
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

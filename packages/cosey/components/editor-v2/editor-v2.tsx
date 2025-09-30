import { type CSSProperties, defineComponent, h } from 'vue';
import { Slate, Editable, type RenderLeafProps, type RenderElementProps } from 'slate-vue3';
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

import { editorV2Props, editorV2Slots, editorV2Emits } from './editor-v2.api';
import useStyle from './editor-v2.style';
import { useComponentConfig } from '../config-provider';
import { mapElementTypeTagName, type CustomElement } from './custom-types';
import { useFocus } from './hooks/useFocus';
import { withDefaultPlugins } from './plugins';
import { isListItem } from './plugins/list';

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

export default defineComponent({
  name: 'EditorV2',
  props: editorV2Props,
  slots: editorV2Slots,
  emits: editorV2Emits,
  setup(props) {
    const { prefixCls } = useComponentConfig('editor', props);

    const { hashId } = useStyle(prefixCls);

    // main
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
        'code' in leaf
          ? 'code'
          : 'superscript' in leaf
            ? 'sup'
            : 'subscript' in leaf
              ? 'sub'
              : 'span',
        { ...attributes, style },
        children,
      );
    };

    const editor = withDefaultPlugins(withHistory(withDOM(createEditor())));
    editor.children = initialValue;

    const { isFocus, onFocus, onBlur } = useFocus();

    return () => {
      return (
        <div class={[hashId.value, prefixCls.value]}>
          <Slate editor={editor} render-element={renderElement} render-leaf={renderLeaf}>
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
                <FormatClear />
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
              <Editable
                class={`${prefixCls.value}-content`}
                {...{ onFocus: onFocus, onBlur: onBlur, onKeydown: editor.onKeydown }}
              />
            </div>
          </Slate>
        </div>
      );
    };
  },
});

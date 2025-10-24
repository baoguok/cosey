import { defineComponent, useModel } from 'vue';
import { isString } from '../../utils';
import { DOMEditor } from 'slate-vue3/dom';
import { useEditor, useElement } from 'slate-vue3';
import { Transforms } from 'slate-vue3/core';
import { languageOptions } from './plugins/code-block';

export const CodeBlock = defineComponent({
  props: {
    value: {
      type: String,
      default: 'text',
    },
  },
  emits: {
    'update:value': (value: string) => isString(value),
  },
  setup(props, { slots }) {
    const innerValue = useModel(props, 'value');
    const editor = useEditor();

    const element = useElement();

    const onChange = (e: Event) => {
      innerValue.value = (e.target as HTMLSelectElement).value;

      const path = DOMEditor.findPath(editor, element.value);
      Transforms.setNodes(editor, { language: innerValue.value }, { at: path });
    };

    return () => {
      return (
        <pre class={`language-${innerValue.value}`}>
          <select value={innerValue.value} contenteditable={false} onChange={onChange}>
            {languageOptions.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
          {slots.default?.()}
        </pre>
      );
    };
  },
});

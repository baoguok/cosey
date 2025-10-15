import { useEditor } from 'slate-vue3';
import Icon from '../icon/icon.vue';
import Button from './button';
import { defineComponent } from 'vue';
import { useBlockTypeActive } from './hooks/useBlockTypeActive';
import { Transforms } from 'slate-vue3/core';
import { Element } from 'slate-vue3/core';

export default defineComponent({
  setup() {
    const editor = useEditor();

    const isMarkActive = useBlockTypeActive('code-block');

    const onClick = () => {
      Transforms.wrapNodes(
        editor,
        { type: 'code-block', language: 'plain', children: [] },
        {
          match: (n) => Element.isElement(n) && n.type === 'paragraph',
          split: false,
        },
      );
      Transforms.setNodes(
        editor,
        { type: 'code-line' as any },
        { match: (n) => Element.isElement(n) && n.type === 'paragraph' },
      );
    };

    return () => {
      return (
        <Button active={isMarkActive.value} onClick={onClick}>
          <Icon name="co:code-block" />
        </Button>
      );
    };
  },
});

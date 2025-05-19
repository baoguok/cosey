<script lang="tsx">
import { isObject } from '../../utils';
import { Comment, Fragment, Text, cloneVNode, defineComponent } from 'vue';

import type { VNode } from 'vue';

const NAME = 'OnlyChild';

export default defineComponent({
  name: NAME,
  setup(_, { slots, attrs }) {
    return () => {
      const defaultSlot = slots.default?.(attrs);
      if (!defaultSlot) return null;

      if (defaultSlot.length > 1) {
        return null;
      }

      const firstLegitNode = findFirstLegitChild(defaultSlot);
      if (!firstLegitNode) {
        return null;
      }

      return cloneVNode(firstLegitNode!, attrs);
    };
  },
});

function findFirstLegitChild(node: VNode[] | undefined): VNode | null {
  if (!node) return null;
  const children = node as VNode[];
  for (const child of children) {
    /**
     * when user uses h(Fragment, [text]) to render plain string,
     * this switch case just cannot handle, when the value is primitives
     * we should just return the wrapped string
     */
    if (isObject(child)) {
      switch (child.type) {
        case Comment:
          continue;
        case Text:
        case 'svg':
          return wrapTextContent(child);
        case Fragment:
          return findFirstLegitChild(child.children as VNode[]);
        default:
          return child;
      }
    }
    return wrapTextContent(child);
  }
  return null;
}

function wrapTextContent(s: string | VNode) {
  return <span>{s}</span>;
}
</script>

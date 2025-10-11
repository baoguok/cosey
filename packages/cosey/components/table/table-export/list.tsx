import { defineComponent, PropType } from 'vue';
import { type TableColumnProps } from '../table-column/table-column.api';
import Item from './item';
import { useComponentConfig } from '../../config-provider';
import { type CheckableNode } from '../../../hooks';

export default defineComponent({
  props: {
    nodeList: {
      type: Array as PropType<CheckableNode<TableColumnProps>[]>,
      required: true,
    },
  },
  setup(props) {
    const { prefixCls } = useComponentConfig('table-export');

    return () => {
      return (
        <div class={`${prefixCls.value}-list`}>
          {props.nodeList.map((node, i) => (
            <Item node={node} key={i} />
          ))}
        </div>
      );
    };
  },
});

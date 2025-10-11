import { type TableColumnProps } from '../table-column/table-column.api';
import List from './list';
import { useComponentConfig } from '../../config-provider';
import { useTreeCheckInject, type CheckableNode } from '../../../hooks';
import { computed, defineComponent, PropType } from 'vue';
import { ElCheckbox } from 'element-plus';

export default defineComponent({
  props: {
    node: {
      type: Object as PropType<CheckableNode<TableColumnProps>>,
      required: true,
    },
  },
  setup(props) {
    const column = computed(() => props.node.data);

    // check
    const { onCheckChange } = useTreeCheckInject();

    const { prefixCls } = useComponentConfig('table-export');

    return () => {
      return (
        <div>
          <div class={`${prefixCls.value}-list-item`}>
            <ElCheckbox
              label={column.value.label}
              modelValue={props.node.checkedStatus === 'checked'}
              indeterminate={props.node.checkedStatus === 'indeterminate'}
              onChange={($event) => onCheckChange($event, props.node)}
            />
          </div>
          {props.node.children && props.node.children.length && (
            <List nodeList={props.node.children} />
          )}
        </div>
      );
    };
  },
});

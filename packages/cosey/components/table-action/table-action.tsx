import { tableActionProps } from './table-action.api';
import Item from './item';

import useStyle from './table-action.style';
import { useComponentConfig } from '../config-provider';
import { computed, defineComponent } from 'vue';
import { TableActionItemProps } from './item.api';

export default defineComponent({
  name: 'CoTableAction',
  props: tableActionProps,
  setup(props) {
    const dyadicActions = computed(() => {
      const actions = props.actions.filter(Boolean);
      return (Array.isArray(actions[0]) ? actions : [actions]) as TableActionItemProps[][];
    });

    const { prefixCls } = useComponentConfig('table-action', props);

    const { hashId } = useStyle(prefixCls);

    return () => {
      return (
        <div class={[hashId.value, prefixCls.value]}>
          {dyadicActions.value.map((actions, rowIndex) => {
            return (
              <div key={rowIndex} class={`${prefixCls.value}-row`}>
                {actions.filter(Boolean).map((action, actionIndex) => {
                  return <Item key={actionIndex} props={action} />;
                })}
              </div>
            );
          })}
        </div>
      );
    };
  },
});

import { defineComponent } from 'vue';
import { useComponentConfig } from '../..';
import { tableStatisticsProps } from './table-stats.api';

import useStyle from './table-stats.style';

export default defineComponent({
  name: 'CoTableStats',
  props: tableStatisticsProps,
  setup(props) {
    const { prefixCls } = useComponentConfig('table-stats');

    const { hashId } = useStyle(prefixCls);

    return () => {
      return (
        <div class={[hashId.value, prefixCls.value]}>
          {props.columns.map((column) => {
            let value = props.data[column.prop];
            if (column.format) {
              value = column.format(value);
            }

            return (
              <div class={`${prefixCls.value}-column`}>
                <div class={`${prefixCls.value}-label`}>{column.label}</div>
                <div class={`${prefixCls.value}-colon`}>:</div>
                <div class={`${prefixCls.value}-value`}>{value}</div>
              </div>
            );
          })}
        </div>
      );
    };
  },
});

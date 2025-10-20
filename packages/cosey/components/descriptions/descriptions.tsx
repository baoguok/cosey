import { descriptionsProps, descriptionsSlots, descriptionsEmits } from './descriptions.api';
import useStyle from './descriptions.style';
import { useComponentConfig } from '../config-provider';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CoDescriptions',
  props: descriptionsProps,
  slots: descriptionsSlots,
  emits: descriptionsEmits,
  setup(props) {
    const { prefixCls } = useComponentConfig('descriptions', props);
    const { hashId } = useStyle(prefixCls);

    return () => {
      return (
        <table
          class={[
            hashId.value,
            prefixCls.value,
            `is-label-${props.labelAlign}`,
            {
              'is-bordered': props.border,
              'has-colon': props.colon,
            },
          ]}
        >
          <tbody>
            {props.data?.map((row, i) => {
              return (
                <tr key={i}>
                  {row.map((cell, j) => {
                    return (
                      <td key={j}>
                        <span>{cell}</span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    };
  },
});

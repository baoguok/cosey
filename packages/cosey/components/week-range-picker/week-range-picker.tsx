import {
  type WeekRangePickerExpose,
  weekRangePickerProps,
  weekRangePickerSlots,
  weekRangePickerEmits,
} from './week-range-picker.api';
import { defineComponent } from 'vue';
import { CommonPicker, UPDATE_MODEL_EVENT } from 'element-plus';
import PanelWeekRange from './panel-week-range';
import { useComponentConfig } from '../config-provider';
import useStyle from './week-range-picker.style';

export default defineComponent({
  name: 'CoWeekRangePicker',
  props: weekRangePickerProps,
  slots: weekRangePickerSlots,
  emits: weekRangePickerEmits,
  setup(props, { slots, emit, expose }) {
    const { prefixCls } = useComponentConfig('week-range-picker', props);
    const { hashId } = useStyle(prefixCls);

    expose<WeekRangePickerExpose>();

    const onModelValueUpdated = (val: Date[] | null) => {
      emit(UPDATE_MODEL_EVENT, val);
    };

    return () => {
      return (
        <CommonPicker
          {...(props as any)}
          type="weekrange"
          editable={false}
          class={[hashId.value, prefixCls.value]}
          onUpdate:modelValue={onModelValueUpdated}
        >
          {{
            default: (props: any) => {
              return <PanelWeekRange {...props} />;
            },
            'range-separator': slots['range-separator'],
          }}
        </CommonPicker>
      );
    };
  },
});

import { computed, defineComponent, PropType, ref } from 'vue';
import Picker from './picker';
import ButtonSelect from './button-select';
import SelectList, { type SelectListItem } from './select-list';

export default defineComponent({
  props: {
    list: { type: Array as PropType<SelectListItem[]>, required: true },
    modelValue: { type: null },
    buttonWidth: { type: String },
  },
  emits: {
    'update:modelValue': (value: any) => !!value || true,
    change: (value: any) => !!value || true,
  },
  setup(props, { emit }) {
    const visible = ref(false);

    const displayedLabel = computed(() => {
      return props.list.find((item) => item.value === props.modelValue)?.label || props.modelValue;
    });

    const onSelect = (item: SelectListItem) => {
      emit('update:modelValue', item.value);
      emit('change', item.value);
      visible.value = false;
    };

    const onClick = () => {
      visible.value = !visible.value;
    };

    return () => {
      return (
        <Picker
          v-model:visible={visible.value}
          max-height="300px"
          v-slots={{
            default: () => (
              <ButtonSelect width={props.buttonWidth} onClick={onClick}>
                {displayedLabel.value}
              </ButtonSelect>
            ),
            content: () => (
              <SelectList list={props.list} selectedValue={props.modelValue} onSelect={onSelect} />
            ),
          }}
        />
      );
    };
  },
});

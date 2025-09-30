import { computed, defineComponent, PropType, ref } from 'vue';
import Picker from './picker';
import ButtonSelect from './button-select';
import List, { type ListItem } from './list';

export default defineComponent({
  props: {
    list: { type: Array as PropType<ListItem[]>, required: true },
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

    const onSelect = (item: ListItem) => {
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
              <List list={props.list} selectedValue={props.modelValue} onSelect={onSelect} />
            ),
          }}
        />
      );
    };
  },
});

import { computed, ref, watch } from 'vue';

export function useVisible(
  props: { modelValue?: boolean },
  emit: (event: 'update:modelValue', visible: boolean) => void,
) {
  const privateVisible = ref<boolean | undefined>(props.modelValue);

  watch(
    () => props.modelValue,
    () => {
      privateVisible.value = props.modelValue;
    },
  );

  const visible = computed({
    get() {
      return privateVisible.value;
    },
    set(value: boolean) {
      privateVisible.value = value;
      emit('update:modelValue', value);
    },
  });

  return visible;
}

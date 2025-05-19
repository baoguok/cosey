import { computed, ref, watch } from 'vue';

export function useTwoWayBinding<P extends Record<string, any>, T, Key extends keyof P>(
  props: P,
  emit: (...args: any[]) => any,
  valueName: Key,
) {
  const privateValue = ref<T | undefined>(props[valueName]);

  watch(
    () => props[valueName],
    () => {
      privateValue.value = props[valueName];
    },
  );

  const value = computed({
    get() {
      return privateValue.value;
    },
    set(value: T) {
      privateValue.value = value;
      emit(`update:${valueName as string}`, value);
    },
  });

  return value;
}

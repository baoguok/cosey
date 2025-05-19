import { ref } from 'vue';

export function useCallbackRef<T = any>() {
  const elRef = ref<T>();

  const setElRef = (el: T) => {
    elRef.value = el;
  };

  return [elRef, setElRef] as const;
}

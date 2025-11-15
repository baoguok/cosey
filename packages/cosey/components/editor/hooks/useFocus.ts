import { ref } from 'vue';

export function useFocus() {
  const isFocus = ref(false);

  const onFocus = () => {
    isFocus.value = true;
  };

  const onBlur = () => {
    isFocus.value = false;
  };

  return {
    isFocus,
    onFocus,
    onBlur,
  };
}

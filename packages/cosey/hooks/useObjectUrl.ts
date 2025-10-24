import { type MaybeRefOrGetter, onBeforeUnmount, readonly, shallowRef, toValue, watch } from 'vue';

export function useObjectUrl(file: MaybeRefOrGetter<Blob | MediaSource | null | undefined>) {
  const url = shallowRef<string | undefined>();

  const revoke = () => {
    if (url.value) {
      URL.revokeObjectURL(url.value);
    }

    url.value = undefined;
  };

  onBeforeUnmount(() => {
    revoke();
  });

  watch(
    () => toValue(file),
    (file) => {
      revoke();

      if (file) {
        url.value = URL.createObjectURL(file);
      }
    },
    { immediate: true },
  );

  return readonly(url);
}

import { type MaybeRefOrGetter, onUnmounted, shallowReadonly, shallowRef, toValue } from 'vue';

export function useTimeout<Callback extends (...args: any[]) => any>(
  callback: Callback,
  interval: MaybeRefOrGetter<number>,
) {
  let timer: ReturnType<typeof setTimeout> | null;
  const isPending = shallowRef(false);

  const stop = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      isPending.value = false;
    }
  };

  const start = (...args: Parameters<Callback> | []) => {
    stop();

    isPending.value = true;
    timer = setTimeout(() => {
      timer = null;
      isPending.value = false;
      callback(...args);
    }, toValue(interval));
  };

  onUnmounted(() => {
    stop();
  });

  return {
    isPending: shallowReadonly(isPending),
    start,
    stop,
  };
}

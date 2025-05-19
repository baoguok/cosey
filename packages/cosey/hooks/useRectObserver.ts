import { onBeforeUnmount, type Ref, watch } from 'vue';

export function useRectObserver(
  targetRef: Ref<Element | null | undefined>,
  callback: (rect: DOMRect) => void,
) {
  let handle = 0;

  const request = () => {
    handle = requestAnimationFrame(frame);
  };

  const frame = () => {
    if (targetRef.value) {
      const rect = targetRef.value.getBoundingClientRect();
      callback(rect);
    }

    request();
  };

  const run = () => {
    if (handle === 0) {
      request();
    }
  };

  const stop = () => {
    if (handle !== 0) {
      cancelAnimationFrame(handle);
      handle = 0;
    }
  };

  watch(
    targetRef,
    () => {
      if (targetRef.value) {
        run();
      } else {
        stop();
      }
    },
    {
      immediate: true,
    },
  );

  onBeforeUnmount(() => {
    stop();
  });

  return {
    run,
    stop,
  };
}

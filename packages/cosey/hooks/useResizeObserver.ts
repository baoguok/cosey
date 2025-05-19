import { onBeforeUnmount, onMounted, type Ref, watch } from 'vue';

/**
 * 观察元素的尺寸变化
 */
export function useResizeObserver(
  targetRef: Ref<any>,
  callback: (contentBoxSize: ResizeObserverSize) => void,
) {
  let resizeObserver: ResizeObserver | null = null;

  const dispose = () => {
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
  };

  onMounted(() => {
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const contentBoxSize = Array.isArray(entry.contentBoxSize)
          ? entry.contentBoxSize[0]
          : entry.contentBoxSize;

        callback(contentBoxSize);
      }
    });
  });

  onBeforeUnmount(() => {
    dispose();
  });

  watch(targetRef, (target) => {
    dispose();

    if (resizeObserver && target instanceof Element) {
      resizeObserver.observe(target);
    }
  });
}

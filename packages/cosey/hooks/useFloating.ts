import { autoUpdate, computePosition, type ComputePositionConfig } from '@floating-ui/dom';
import { onBeforeUnmount, ref, Ref, watch } from 'vue';

/**
 * 以组合式函数的方式对 @floating-ui/dom 进行包装，简化使用。
 */
export function useFloating(
  referenceEl: Ref<HTMLElement | null>,
  floatingEl: Ref<HTMLElement | null>,
  options?: Partial<ComputePositionConfig>,
) {
  const x = ref(0);
  const y = ref(0);
  const floating = ref(false);

  let cleanup: (() => void) | null = null;

  function updatePosition() {
    if (referenceEl.value && floatingEl.value) {
      computePosition(referenceEl.value, floatingEl.value, {
        ...options,
      }).then((position) => {
        x.value = position.x;
        y.value = position.y;
      });
    }
  }

  watch(
    [referenceEl, floatingEl, floating],
    ([referenceEl, floatingEl, floating]) => {
      if (referenceEl && floatingEl && floating) {
        cleanup = autoUpdate(referenceEl, floatingEl, updatePosition);
      } else if (cleanup) {
        cleanup();
        cleanup = null;
      }
    },
    {
      immediate: true,
    },
  );

  onBeforeUnmount(() => {
    floating.value = false;
  });

  return {
    x,
    y,
    floating,
  };
}

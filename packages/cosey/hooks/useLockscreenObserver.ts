/**
 * 观察 ep 锁定滚动条时机，用于固定的头部添加右边距，以避免跳动。
 */

import { onBeforeUnmount, onMounted, ref } from 'vue';

const hiddenCls = 'el-popup-parent--hidden';

export function useLockscreenObserver() {
  const locked = ref(false);

  let observer: MutationObserver;

  onMounted(() => {
    observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          locked.value = document.body.classList.contains(hiddenCls);
        }
      }
    });

    observer.observe(document.body, {
      attributes: true,
    });
  });

  onBeforeUnmount(() => {
    observer.disconnect();
  });

  return locked;
}

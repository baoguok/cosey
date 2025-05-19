import { throttle } from 'lodash-es';
import { onMounted, onUnmounted } from 'vue';

export function useWindowResize(callback: (event: Event) => void, wait = 150) {
  const onResize = throttle(callback, wait);

  onMounted(() => {
    window.addEventListener('resize', onResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', onResize);
  });
}

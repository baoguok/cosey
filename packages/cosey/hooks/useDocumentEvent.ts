import { onMounted, onUnmounted } from 'vue';

export function useDocumentEvent<T extends keyof WindowEventMap>(
  type: T,
  callback: (event: WindowEventMap[T]) => void,
) {
  onMounted(() => {
    window.addEventListener(type, callback);
  });

  onUnmounted(() => {
    window.removeEventListener(type, callback);
  });
}

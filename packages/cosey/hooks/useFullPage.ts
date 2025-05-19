import { useFullscreen } from '@vueuse/core';
import { onBeforeUnmount, onMounted, ref } from 'vue';

export function useFullPage(
  options: {
    fullscreen?: boolean;
  } = {},
) {
  const target = ref<HTMLElement>();

  const { enter: enterFullScreen, exit: exitFullScreen } = useFullscreen(target);

  const onFullscreenChange = () => {
    if (!document.fullscreenElement) {
      exit();
    }
  };

  onMounted(() => {
    target.value = document.documentElement;

    document.documentElement.addEventListener('fullscreenchange', onFullscreenChange);
  });

  onBeforeUnmount(() => {
    document.documentElement.removeEventListener('fullscreenchange', onFullscreenChange);
  });

  const isFullPage = ref(false);

  const enter = () => {
    if (!isFullPage.value) {
      if (options.fullscreen) {
        enterFullScreen();
      }

      isFullPage.value = true;
    }
  };

  const exit = () => {
    if (isFullPage.value) {
      isFullPage.value = false;

      if (options.fullscreen) {
        exitFullScreen();
      }
    }
  };

  const toggle = () => {
    if (isFullPage.value) {
      exit();
    } else {
      enter();
    }
  };

  return {
    isFullPage,
    enter,
    exit,
    toggle,
  };
}

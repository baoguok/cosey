import { setStyle } from '../utils';
import { onScopeDispose, type Ref, watch } from 'vue';

const hiddenCls = 'el-popup-parent--hidden';

/**
 * 禁止页面滚动
 *
 * el 的 useLockscreen 在快速切换时会使页面始终保持禁止滚动状态，
 * 因此编写此 hook 用于代替。
 *
 * 添加 hiddenCls 是为了让顶部导航能够监听到页面被禁止滚动。
 */
export function useLockScroll(trigger: Ref<boolean>) {
  let sourceCssText = '';

  const lock = () => {
    sourceCssText = document.body.style.cssText;

    const scrollbarWidth = window.innerWidth - document.documentElement.offsetWidth;

    setStyle(document.body, {
      overflow: 'hidden',
      width: `calc(100% - ${scrollbarWidth}px)`,
    });

    document.body.classList.add(hiddenCls);
  };

  const unlock = () => {
    document.body.style.cssText = sourceCssText;
    document.body.classList.remove(hiddenCls);
  };

  watch(trigger, (val) => {
    if (val) {
      lock();
    } else {
      unlock();
    }
  });

  onScopeDispose(() => {
    unlock();
  });
}

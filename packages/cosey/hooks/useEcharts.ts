/**
 * 简化 echarts 在 vue 中的使用：
 *
 * 1. 自动实例化
 * 2. 自行销毁
 * 3. 自动调整图表尺寸
 * 4. 修改默认主题
 * 5. 响应式渲染
 */

import { computed, MaybeRef, onBeforeUnmount, ref, type Ref, unref, watch } from 'vue';
import { echarts, type ECOption } from '../utils';
import { useResizeObserver } from './useResizeObserver';

interface UseEchartsOptions {
  option?: ECOption;
}

type OptionArgs =
  | [ECOption, notMerge?: boolean, lazyUpdate?: boolean]
  | [
      ECOption,
      opts?: {
        notMerge?: boolean;
        replaceMerge?: string | string[];
        lazyUpdate?: boolean;
      },
    ];

export function useEcharts(
  elRef: Ref<HTMLElement | null>,
  options: MaybeRef<UseEchartsOptions> = {},
) {
  let chart: ReturnType<typeof echarts.init> | null = null;

  const dispose = () => {
    if (chart) {
      chart.dispose();
      chart = null;
    }
  };

  onBeforeUnmount(() => {
    dispose();
  });

  const optionQueue = ref<OptionArgs[]>(unref(options).option ? [[unref(options).option!]] : []);

  watch(
    () => unref(options),
    () => {
      setOption(unref(options).option || {});
    },
  );

  const setOption = (...args: OptionArgs) => {
    optionQueue.value = [...optionQueue.value, args];
  };

  const doSetOption = () => {
    if (chart && optionQueue.value.length) {
      for (const option of optionQueue.value) {
        if (option.length === 1) {
          chart.setOption(option[0], {
            notMerge: true,
          });
        } else {
          chart.setOption(...(option as [any]));
        }
      }
      optionQueue.value = [];
    }
  };

  watch(elRef, (el) => {
    dispose();

    if (el) {
      chart = echarts.init(el, 'macarons');
      doSetOption();
    }
  });

  watch(optionQueue, () => {
    doSetOption();
  });

  useResizeObserver(elRef, ({ blockSize, inlineSize }) => {
    if (chart) {
      // 取整，避免 canvas 虚化
      chart.resize({
        width: ~~inlineSize,
        height: ~~blockSize,
      });
    }
  });

  return {
    setOption,
    chart: computed(() => chart),
  };
}

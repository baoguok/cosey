/**
 * 简化 echarts 在 vue 中的使用：
 *
 * 1. 自动实例化
 * 2. 自行销毁
 * 3. 自动调整图表尺寸
 * 4. 修改默认主题
 */

import { computed, onBeforeUnmount, ref, type Ref, watch } from 'vue';
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

export function useEcharts(elRef: Ref<HTMLElement | null>, options: UseEchartsOptions = {}) {
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

  const optionQueue = ref<OptionArgs[]>(options.option ? [[options.option]] : []);

  const setOption = (...args: OptionArgs) => {
    optionQueue.value = [...optionQueue.value, args];
  };

  const doSetOption = () => {
    if (chart && optionQueue.value.length) {
      for (const option of optionQueue.value) {
        chart.setOption(...(option as [any]));
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

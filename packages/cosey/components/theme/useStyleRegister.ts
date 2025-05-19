import { computed, ComputedRef, watch } from 'vue';
import { type CSSInterpolation, parseStyle } from '../cssinjs';
import hash from '@emotion/hash';
import type { GlobalToken } from './interface';
import { normalizeStyle } from './util/normalizeStyle';
import useHMR from './useHMR';
import { useStyleInection } from './StyleContext';
import { updateCSS } from '../../utils';

export function useStyleRegister(
  info: ComputedRef<{
    path: string[];
    token: GlobalToken;
    hashId: string;
    global?: boolean;
  }>,
  styleFn: () => CSSInterpolation,
) {
  const pathHash = computed(() => hash([...info.value.path, info.value.hashId].join('|')));
  const HMRUpdate = useHMR();
  const { cache } = useStyleInection();

  watch(
    pathHash,
    () => {
      if (!cache.has(pathHash.value) || HMRUpdate.value) {
        const styleInterpolation = styleFn();

        const [parsedStr, effectStyle] = parseStyle(styleInterpolation, {
          // hashId: info.value.global ? '' : info.value.hashId,
          // hashPriority: 'low',
        });

        const styleStr = normalizeStyle(parsedStr);
        updateCSS(styleStr, pathHash.value);
        cache.set(pathHash.value, styleStr);

        Object.keys(effectStyle).forEach((key) => {
          if (!cache.has(key)) {
            const styleStr = normalizeStyle(effectStyle[key]);
            key = `__effect-${key}`;
            updateCSS(styleStr, key);
            cache.set(key, styleStr);
          }
        });
      }
    },
    {
      immediate: true,
    },
  );
}

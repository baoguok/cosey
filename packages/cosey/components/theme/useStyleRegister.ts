import { computed, ComputedRef, unref, watch } from 'vue';
import { type CSSInterpolation, parseStyle } from '../cssinjs';
import hash from '@emotion/hash';
import { normalizeStyle } from './util/normalizeStyle';
import useHMR from './useHMR';
import { useStyleInection } from './StyleContext';
import { updateCSS } from '../../utils';

export function useStyleRegister(path: ComputedRef<string[]>, styleFn: () => CSSInterpolation) {
  const pathHash = computed(() => hash(unref(path).filter(Boolean).join('|')));
  const HMRUpdate = useHMR();
  const { cache } = useStyleInection();

  watch(
    pathHash,
    () => {
      if (!cache.has(pathHash.value) || HMRUpdate.value) {
        const styleInterpolation = styleFn();

        const [parsedStr, effectStyle] = parseStyle(styleInterpolation, {
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

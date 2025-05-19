import { computed, type ComputedRef, ref, unref, watch } from 'vue';
import { kebabCase } from 'lodash-es';
import hash from '@emotion/hash';
import { updateCSS } from '../../../utils';
import { type ThemeConfig, useTheme } from '../theme-context';
import { createCacheToken } from '../createCacheToken';
import unitlessKeys from './unitless';
import type { AliasToken } from '../interface';
import { normalizeStyle } from './normalizeStyle';
import { useStyleInection } from '../StyleContext';
import { useConfig } from '../../config-provider/config-provider';

function stringifyToken(token: object) {
  return Object.keys(token)
    .map((key) => {
      return key + ':' + (token as any)[key];
    })
    .join(';');
}

function stringifyTokenToCssVar(token: AliasToken, prefix?: string) {
  prefix = prefix ? prefix + '-' : '';

  const styleStr = Object.keys(token)
    .map((key) => {
      let value = token[key as keyof typeof token];

      if (!unitlessKeys[key] && typeof value === 'number' && value !== 0) {
        value = `${value}px`;
      }

      return `--${prefix}${kebabCase(key)}:${value}`;
    })
    .join(';');
  return styleStr;
}

export const cacheToken = createCacheToken();

export function useToken(theme?: ComputedRef<ThemeConfig | undefined>) {
  const contextTheme = useTheme();

  const token = computed(() => {
    const { token, algorithm, components } = unref(theme || contextTheme) || {};
    return cacheToken.getToken(token, algorithm, components);
  });

  const hashId = ref('');

  const { cache } = useStyleInection();

  const configContext = useConfig();

  watch(
    token,
    () => {
      if (cache.has(token.value)) {
        hashId.value = cache.get(token.value)!;
        return;
      }

      const tokenStr = stringifyToken(token.value);
      hashId.value = `css-var-${hash(tokenStr)}`;
      cache.set(token.value, hashId.value);

      if (cache.has(hashId.value)) {
        return;
      }

      let styleStr = stringifyTokenToCssVar(token.value, configContext.prefixCls.value);
      styleStr = normalizeStyle(`.${hashId.value}{${styleStr}}`);
      updateCSS(styleStr, hashId.value);
      cache.set(hashId.value, styleStr);
    },
    {
      immediate: true,
    },
  );

  return {
    token,
    hashId,
  } as const;
}

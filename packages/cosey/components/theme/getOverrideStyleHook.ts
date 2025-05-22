import { watch } from 'vue';
import { parseStyle, type CSSInterpolation } from '../cssinjs';
import type { AliasToken, TokenWithCommonCls } from './interface';
import { useToken } from './util/useToken';
import { tokenValueToCssVar } from './util/tokenValueToCssVar';
import { useConfig } from '../config-provider/config-provider';
import { ThemeManager } from './theme-context';
import hash from '@emotion/hash';
import { normalizeStyle } from './util/normalizeStyle';

export type AliasTokenWithCommonCls = TokenWithCommonCls<AliasToken>;

export function getOverrideStyleHook(
  component: string,
  styleFn: (token: AliasTokenWithCommonCls) => CSSInterpolation,
) {
  const pathHash = hash(['__override', component].join('|'));

  return (_themeManager?: ThemeManager) => {
    const { token, hashId, themeManager } = useToken(_themeManager);

    const configContext = useConfig();

    watch(
      hashId,
      () => {
        const cssVar = tokenValueToCssVar(token.value, configContext.prefixCls.value);

        const styleInterpolation = styleFn({
          ...cssVar,
          hashId: hashId.value,
          componentCls: '',
          prefixCls: '',
        } as unknown as AliasTokenWithCommonCls);

        const [parsedStr] = parseStyle(styleInterpolation);
        const styleStr = normalizeStyle(parsedStr);

        themeManager.setOverrideStyle(styleStr, pathHash, hash([hashId.value, pathHash].join('|')));
      },
      {
        immediate: true,
      },
    );

    return {
      token,
      hashId,
    } as const;
  };
}

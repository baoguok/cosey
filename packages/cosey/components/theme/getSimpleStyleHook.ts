import { computed, ComputedRef, unref } from 'vue';
import type { CSSInterpolation } from '../cssinjs';
import type { AliasToken, TokenWithCommonCls } from './interface';
import { useStyleRegister } from './useStyleRegister';
import { useToken } from './util/useToken';
import { tokenValueToCssVar } from './util/tokenValueToCssVar';
import { useConfig } from '../config-provider/config-provider.api';
import { ThemeManager } from './theme-context';

export type AliasTokenWithCommonCls = TokenWithCommonCls<AliasToken>;

export function getSimpleStyleHook(
  component: string,
  styleFn: (token: AliasTokenWithCommonCls) => CSSInterpolation,
) {
  return (_prefixCls: ComputedRef<string> | string = '', themeManager?: ThemeManager) => {
    const prefixCls = computed(() => unref(_prefixCls));

    const { token, hashId } = useToken(themeManager);

    const configContext = useConfig();

    useStyleRegister(
      computed(() => ['__simple', component, prefixCls.value]),
      () => {
        const componentCls = `.${prefixCls.value}`;

        const cssVar = tokenValueToCssVar(token.value, configContext.prefixCls.value);

        return styleFn({
          ...cssVar,
          componentCls,
          prefixCls: prefixCls.value,
          hashId: hashId.value,
        } as unknown as AliasTokenWithCommonCls);
      },
    );

    return {
      hashId,
    };
  };
}

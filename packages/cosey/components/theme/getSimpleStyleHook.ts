import { computed, ComputedRef, unref } from 'vue';
import type { CSSInterpolation } from '../cssinjs';
import type { AliasToken, TokenWithCommonCls } from './interface';
import { useStyleRegister } from './useStyleRegister';
import { useToken } from './util/useToken';
import { tokenValueToCssVar } from './util/tokenValueToCssVar';
import { ThemeConfig } from './theme-context';
import { useConfig } from '../config-provider/config-provider';

export type AliasTokenWithCommonCls = TokenWithCommonCls<AliasToken>;

export function getSimpleStyleHook(
  component: string,
  styleFn: (token: AliasTokenWithCommonCls) => CSSInterpolation,
) {
  return (
    _prefixCls: ComputedRef<string> | string = '',
    theme?: ComputedRef<ThemeConfig | undefined>,
  ) => {
    const prefixCls = computed(() => unref(_prefixCls));

    const { token, hashId } = useToken(theme);

    const configContext = useConfig();

    useStyleRegister(
      computed(() => ({
        path: [component, prefixCls.value],
        token: token.value,
        hashId: hashId.value,
      })),
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

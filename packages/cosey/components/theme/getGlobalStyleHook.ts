import { computed } from 'vue';
import type { CSSInterpolation } from '../cssinjs';
import type { AliasToken } from './interface';
import { useStyleRegister } from './useStyleRegister';
import { useToken } from './util/useToken';
import { tokenValueToCssVar } from './util/tokenValueToCssVar';
import { useConfig } from '../config-provider/config-provider.api';
import { ThemeManager } from './theme-context';

export function getGlobalStyleHook(
  component: string,
  styleFn: (token: AliasToken) => CSSInterpolation,
) {
  return (themeManager?: ThemeManager) => {
    const { token } = useToken(themeManager);

    const configContext = useConfig();

    useStyleRegister(
      computed(() => ['__global', component]),
      () => {
        const cssVar = tokenValueToCssVar(token.value, configContext.prefixCls.value);

        return styleFn(cssVar as unknown as AliasToken);
      },
    );
  };
}

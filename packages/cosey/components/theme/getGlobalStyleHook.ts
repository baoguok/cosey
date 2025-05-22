import { computed, watch } from 'vue';
import type { CSSInterpolation } from '../cssinjs';
import { useMounted } from '../../hooks';
import type { AliasToken } from './interface';
import { useStyleRegister } from './useStyleRegister';
import { useToken } from './util/useToken';
import { tokenValueToCssVar } from './util/tokenValueToCssVar';
import { useConfig } from '../config-provider/config-provider';
import { isClient } from '../../utils';
import { ThemeManager } from './theme-context';

const oldGlobalClass = new Set<string>();

export function getGlobalStyleHook(
  component: string,
  styleFn: (token: AliasToken) => CSSInterpolation,
) {
  return (themeManager?: ThemeManager) => {
    const { token, hashId } = useToken(themeManager);

    const configContext = useConfig();

    useStyleRegister(
      computed(() => ['__global', component]),
      () => {
        const cssVar = tokenValueToCssVar(token.value, configContext.prefixCls.value);

        return styleFn(cssVar as unknown as AliasToken);
      },
    );

    const isMounted = useMounted();

    watch(
      [hashId, isMounted],
      () => {
        if (isClient() || isMounted.value) {
          document.documentElement.classList.remove(...oldGlobalClass);

          if (hashId.value) {
            document.documentElement.classList.add(hashId.value);
            oldGlobalClass.clear();
            oldGlobalClass.add(hashId.value);
          }
        }
      },
      {
        immediate: true,
      },
    );
  };
}

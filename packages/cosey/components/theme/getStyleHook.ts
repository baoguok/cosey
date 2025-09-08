import { computed, ComputedRef, unref } from 'vue';
import type { CSSInterpolation } from '../cssinjs';
import type { ComponentTokenMap, GlobalToken, TokenWithCommonCls } from './interface';
import { useStyleRegister } from './useStyleRegister';
import { useToken } from './util/useToken';
import { tokenValueToCssVar } from './util/tokenValueToCssVar';
import { useConfig } from '../config-provider/config-provider.api';
import { ThemeManager } from './theme-context';

export type OverrideTokenWithoutDerivative = ComponentTokenMap;
export type OverrideComponent = keyof OverrideTokenWithoutDerivative;
export type GlobalTokenWithComponent<ComponentName extends OverrideComponent> = GlobalToken &
  ComponentTokenMap[ComponentName];

export interface StyleInfo<ComponentName extends OverrideComponent> {
  hashId: string;
  prefixCls: string;
  overrideComponentToken: ComponentTokenMap[ComponentName];
}

export type FullToken<ComponentName extends OverrideComponent> = TokenWithCommonCls<
  GlobalTokenWithComponent<ComponentName>
>;

export function getStyleHook<ComponentName extends OverrideComponent>(
  component: ComponentName,
  styleFn: (token: FullToken<ComponentName>, info: StyleInfo<ComponentName>) => CSSInterpolation,
  getDefaultToken?:
    | OverrideTokenWithoutDerivative[ComponentName]
    | ((token: GlobalToken) => OverrideTokenWithoutDerivative[ComponentName]),
) {
  return (_prefixCls: ComputedRef<string> | string = '', themeManager?: ThemeManager) => {
    const prefixCls = computed(() => unref(_prefixCls));

    const { token, hashId } = useToken(themeManager);

    const configContext = useConfig();

    useStyleRegister(
      computed(() => ['__default', component, prefixCls.value]),
      () => {
        const componentCls = `.${prefixCls.value}`;

        const defaultComponentToken =
          typeof getDefaultToken === 'function' ? getDefaultToken(token.value) : getDefaultToken;

        const mergedComponentToken = {
          ...defaultComponentToken,
          ...token.value[component],
        };

        const mergedToken: TokenWithCommonCls<GlobalTokenWithComponent<OverrideComponent>> = {
          ...token.value,
          ...mergedComponentToken,
        };

        const cssVar = tokenValueToCssVar(mergedToken, configContext.prefixCls.value);

        return styleFn(
          {
            ...cssVar,
            componentCls,
            prefixCls: prefixCls.value,
          } as unknown as FullToken<ComponentName>,
          {
            hashId: '',
            prefixCls: prefixCls.value,
            overrideComponentToken: token.value[component],
          },
        );
      },
    );

    return {
      hashId,
    };
  };
}

import { ComputedRef, inject, InjectionKey, provide } from 'vue';
import type { AliasToken, MapToken, OverrideToken, SeedToken } from './interface';
import { type DerivativeFunc } from '../cssinjs';

export type MappingAlgorithm = DerivativeFunc<SeedToken, MapToken>;

export interface ThemeConfig {
  token?: Partial<AliasToken>;
  components?: OverrideToken;
  algorithm?: MappingAlgorithm | MappingAlgorithm[];
  inherit?: boolean;
}

export type ThemeContext = ComputedRef<ThemeConfig | undefined>;

const themeContextKey = Symbol('themeContext') as InjectionKey<ThemeContext>;

export const useThemeProvide = (theme: ComputedRef<ThemeConfig | undefined>) => {
  provide(themeContextKey, theme);
};

export const useTheme = () => {
  return inject(themeContextKey, null);
};

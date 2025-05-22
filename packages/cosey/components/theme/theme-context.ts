import { ComputedRef, inject, InjectionKey, provide } from 'vue';
import type { AliasToken, MapToken, OverrideToken, SeedToken } from './interface';
import { type DerivativeFunc } from '../cssinjs';
import { updateCSSByStyle } from '../../utils';

export type MappingAlgorithm = DerivativeFunc<SeedToken, MapToken>;

export interface ThemeConfig {
  token?: Partial<AliasToken>;
  components?: OverrideToken;
  algorithm?: MappingAlgorithm | MappingAlgorithm[];
  inherit?: boolean;
}

export class ThemeManager {
  theme?: ComputedRef<ThemeConfig | undefined>;

  overrideStyles: Record<string, HTMLStyleElement | null | undefined> = {};

  style: HTMLStyleElement | null | undefined = null;

  constructor(theme?: ComputedRef<ThemeConfig | undefined>) {
    this.theme = theme;
  }

  setStyle(styleStr: string, hashId: string) {
    this.style = updateCSSByStyle(this.style, styleStr, hashId);
  }

  setOverrideStyle(styleStr: string, pathHash: string, hashId: string) {
    this.overrideStyles[pathHash] = updateCSSByStyle(
      this.overrideStyles[pathHash],
      styleStr,
      hashId,
    );
  }

  destroy() {
    this.style?.remove();
    Object.values(this.overrideStyles).forEach((style) => {
      style?.remove();
    });
  }
}

export type ThemeContext = ComputedRef<ThemeConfig | undefined>;

const themeContextKey = Symbol('themeContext') as InjectionKey<ThemeManager>;

export const useThemeProvide = (themeManager: ThemeManager) => {
  provide(themeContextKey, themeManager);
};

let defaultTheme: ThemeManager | undefined = undefined;

export const useTheme = (themeManager?: ThemeManager) => {
  let mergedThemeManager = themeManager || inject(themeContextKey, defaultTheme);

  if (!mergedThemeManager) {
    mergedThemeManager = defaultTheme = new ThemeManager();
  }

  return mergedThemeManager;
};

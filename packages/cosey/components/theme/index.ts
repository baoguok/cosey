import type {
  SeedToken,
  AliasToken,
  GlobalToken,
  MapToken,
  ComponentTokenMap,
  TokenWithCommonCls,
} from './interface';
import defaultAlgorithm, {
  generateColorPalettes as defaultGenerateColorPalettes,
} from './themes/default';
import darkAlgorithm, { generateColorPalettes as darkGenerateColorPalettes } from './themes/dark';
import compactAlgorithm from './themes/compact';

import seedToken from './themes/seed';
import { type CSSInterpolation } from '../cssinjs';
import { getStyleHook, type FullToken } from './getStyleHook';
import { useToken } from './util/useToken';
import { getGlobalStyleHook } from './getGlobalStyleHook';
import { getSimpleStyleHook } from './getSimpleStyleHook';
import { useThemeProvide, type ThemeConfig } from './theme-context';
import { extractCacheStyle, extractStyle } from './extractStyle';
import { StyleCache, StyleProvider } from './StyleContext';
import { getOverrideStyleHook } from './getOverrideStyleHook';

type GenerateStyle<ComponentToken extends object = AliasToken, ReturnType = CSSInterpolation> = (
  token: ComponentToken,
) => ReturnType;

export {
  seedToken,
  useToken,
  defaultAlgorithm,
  darkAlgorithm,
  compactAlgorithm,
  getStyleHook,
  getSimpleStyleHook,
  getGlobalStyleHook,
  getOverrideStyleHook,
  useThemeProvide,
  defaultGenerateColorPalettes,
  darkGenerateColorPalettes,
  extractStyle,
  extractCacheStyle,
  StyleCache,
  StyleProvider,
};

export type {
  SeedToken,
  MapToken,
  AliasToken,
  GlobalToken,
  GenerateStyle,
  FullToken,
  ThemeConfig,
  ComponentTokenMap,
  TokenWithCommonCls,
};

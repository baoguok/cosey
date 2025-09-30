import { configProviderProps } from '../components/config-provider';
import {
  compactAlgorithm,
  darkAlgorithm,
  defaultAlgorithm,
  MapToken,
  SeedToken,
} from '../components/theme';
import type { DerivativeFunc } from '../components/cssinjs';
import { ExtractPropTypes } from 'vue';

export const rootConfigProviderProps = {
  ...configProviderProps,
};

export type RootConfigProviderProps = ExtractPropTypes<typeof rootConfigProviderProps>;

export type ThemeName = '' | 'light' | 'dark' | 'compact';

export const getAlgorithm = (themes: ThemeName[] = []) => {
  return themes
    .filter((theme) => !!theme)
    .map((theme$): DerivativeFunc<SeedToken, MapToken> => {
      if (theme$ === 'dark') {
        return darkAlgorithm;
      }
      if (theme$ === 'compact') {
        return compactAlgorithm;
      }
      return defaultAlgorithm;
    });
};

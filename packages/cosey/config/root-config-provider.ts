import { type ConfigProviderProps } from '../components/config-provider';
import {
  compactAlgorithm,
  darkAlgorithm,
  defaultAlgorithm,
  MapToken,
  SeedToken,
} from '../components/theme';
import type { DerivativeFunc } from '../components/cssinjs';

export interface RootConfigProviderProps extends ConfigProviderProps {}

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

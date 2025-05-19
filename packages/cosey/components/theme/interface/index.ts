import type { AliasToken } from './alias';
import type { ComponentTokenMap } from './components';

export type { AliasToken } from './alias';
export type { ComponentTokenMap } from './components';

export type {
  ColorMapToken,
  ColorNeutralMapToken,
  CommonMapToken,
  FontMapToken,
  HeightMapToken,
  MapToken,
  SizeMapToken,
  StyleMapToken,
} from './maps';

export { PresetColors } from './presetColors';
export type { ColorPalettes, PresetColorKey, PresetColorType } from './presetColors';

export type { SeedToken } from './seeds';

export type OverrideToken = {
  [key in keyof ComponentTokenMap]: Partial<ComponentTokenMap[key]> & Partial<AliasToken>;
};

export type GlobalToken = AliasToken & ComponentTokenMap;

export type TokenWithCommonCls<T> = T & {
  /** Wrap component class with `.` prefix */
  componentCls: string;
  /** Origin prefix which do not have `.` prefix */
  prefixCls: string;
  hashId: string;
};

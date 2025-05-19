import unitless from '@emotion/unitless';
import { AliasToken } from '../interface';

const coseyUnitlessKeys: { [key in keyof AliasToken]?: 1 } = {
  lineHeight: 1,
  lineHeightSM: 1,
  lineHeightLG: 1,
  lineHeightHeading1: 1,
  lineHeightHeading2: 1,
  lineHeightHeading3: 1,
  lineHeightHeading4: 1,
  lineHeightHeading5: 1,
  lineHeightHeading6: 1,
  opacityLoading: 1,
  fontWeightStrong: 1,
  zIndexPopupBase: 1,
  zIndexBase: 1,
  opacityImage: 1,
};

export const unitlessKeys: { [key in string]: 1 } = {
  ...unitless,
  ...coseyUnitlessKeys,
};

export default unitlessKeys;

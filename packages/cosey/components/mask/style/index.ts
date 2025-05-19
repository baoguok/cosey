import { type CSSObject } from '../../cssinjs';
import { type FullToken, type GenerateStyle, getStyleHook } from '../../theme';

export interface ComponentToken {}

export interface MaskToken extends FullToken<'Mask'> {}

const getMaskStyle: GenerateStyle<MaskToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: token.colorBgMask,
    },
  };
};

export default getStyleHook('Mask', (token) => {
  return [getMaskStyle(token)];
});

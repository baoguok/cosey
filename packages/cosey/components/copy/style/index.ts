import { type CSSObject } from '../../cssinjs';
import { type FullToken, type GenerateStyle, getStyleHook } from '../../theme';

export interface ComponentToken {}

export interface MaskToken extends FullToken<'Mask'> {}

const getMaskStyle: GenerateStyle<MaskToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      '&:not(.is-copied):hover': {
        opacity: 0.75,
      },

      '&.is-copied': {
        [`${componentCls}-icon`]: {
          color: token.colorSuccess,
        },
      },
    },
  };
};

export default getStyleHook('Mask', (token) => {
  return [getMaskStyle(token)];
});

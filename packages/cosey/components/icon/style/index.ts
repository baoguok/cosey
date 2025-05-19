import { type CSSObject } from '../../cssinjs';
import { type FullToken, type GenerateStyle, getStyleHook } from '../../theme';

export interface ComponentToken {}

export interface IconToken extends FullToken<'Icon'> {}

const getIconStyle: GenerateStyle<IconToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      display: 'inline-flex',
      width: '1em',
      height: '1em',
      fill: 'currentcolor',

      '&-sm': {
        fontSize: token.fontSizeSM,
      },

      '&-md': {
        fontSize: token.fontSize,
      },

      '&-lg': {
        fontSize: token.fontSizeLG,
      },

      '&-xl': {
        fontSize: token.fontSizeXL,
      },
    },
  };
};

export default getStyleHook('Icon', (token) => {
  return [getIconStyle(token)];
});

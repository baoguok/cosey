import { type CSSObject } from '../../cssinjs';
import { type FullToken, type GenerateStyle, getStyleHook } from '../../theme';
import { getHljs } from './hljs';

export interface ComponentToken {}

export interface MaskToken extends FullToken<'Mask'> {}

const getMaskStyle: GenerateStyle<MaskToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'relative',

      pre: {
        padding: token.paddingSM,
        overflow: 'auto',
        color: '#abb2bf',
        background: '#282c34',
        borderRadius: token.borderRadius,
      },

      [`${componentCls}-copy`]: {
        position: 'absolute',
        insetBlockStart: token.sizeXXS,
        insetInlineEnd: token.sizeXXS,
        zIndex: 10,
        color: token.colorWhite,
      },

      ...getHljs(),
    },
  };
};

export default getStyleHook('Highlight', (token) => {
  return [getMaskStyle(token)];
});

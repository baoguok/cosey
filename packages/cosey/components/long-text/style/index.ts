import { type CSSObject } from '../../cssinjs';
import { type FullToken, type GenerateStyle, getStyleHook } from '../../theme';
import { getLineClampStyle } from '../../style/mixins';

export interface ComponentToken {}

export interface LongTextToken extends FullToken<'LongText'> {}

const getLongTextStyle: GenerateStyle<LongTextToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      ...getLineClampStyle(3),
    },

    [`${componentCls}-tooltip`]: {
      [`${componentCls}-scrollbar`]: {
        maxWidth: 690,
        paddingInlineEnd: token.padding,
      },

      [`${componentCls}-copy`]: {
        position: 'absolute',
        insetBlockStart: token.sizeXXS,
        insetInlineEnd: token.sizeXXS,
        zIndex: 10,
      },
    },
  };
};

export default getStyleHook('LongText', (token) => {
  return [getLongTextStyle(token)];
});

import { type CSSObject } from '../../cssinjs';
import { type FullToken, type GenerateStyle, getStyleHook } from '../../theme';

export interface ComponentToken {}

export interface PanelToken extends FullToken<'Panel'> {}

const getPanelStyle: GenerateStyle<PanelToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      overflow: 'hidden',
      borderRadius: token.borderRadius,
      border: `${token.lineWidth} ${token.lineType} ${token.colorBorderSecondary}`,

      [`${componentCls}-header`]: {
        display: 'flex',
        height: 40,
        paddingInline: token.padding,
        alignItems: 'center',
        borderBlockEnd: `${token.lineWidth} ${token.lineType} ${token.colorBorderSecondary}`,
        backgroundColor: token.colorFillAlter,
      },

      [`${componentCls}-body`]: {
        paddingInline: token.padding,
        paddingBlock: token.paddingXS,
      },
    },
  };
};

export default getStyleHook('Panel', (token) => {
  return [getPanelStyle(token)];
});

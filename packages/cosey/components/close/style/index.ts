import { type CSSObject } from '../../cssinjs';
import { type FullToken, type GenerateStyle, getStyleHook } from '../../theme';

export interface ComponentToken {}

export interface CloseToken extends FullToken<'Close'> {}

const getCloseStyle: GenerateStyle<CloseToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'absolute',
      top: 40,
      right: 40,
      zIndex: 10,
      boxSizing: 'border-box',
      display: 'flex',
      width: 44,
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: token.fontSizeHeading3,
      color: token.colorWhite,
      borderRadius: '50%',
      backgroundColor: token.colorTextSecondary,
      opacity: 0.8,
      cursor: 'pointer',
      userSelect: 'none',
    },
  };
};

export default getStyleHook('Close', (token) => {
  return [getCloseStyle(token)];
});

import { type CSSObject } from '../../cssinjs';
import { type FullToken, type GenerateStyle, getStyleHook } from '../../theme';

export interface ComponentToken {}

export interface ScrollViewToken extends FullToken<'ScrollView'> {}

const getScrollViewStyle: GenerateStyle<ScrollViewToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'relative',

      ' &::before, &::after': {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 40,
        zIndex: 1,
        content: '""',
        pointerEvents: 'none',
        userSelect: 'none',
        touchAction: 'none',
      },

      '&::before': {
        top: 0,
        background: `linear-gradient(to bottom, ${token.colorBgElevated}, transparent)`,
      },

      '&::after': {
        bottom: 0,
        background: `linear-gradient(to top, ${token.colorBgElevated}, transparent)`,
      },

      '&.is-top::before': {
        display: 'none',
      },

      '&.is-bottom::after': {
        display: 'none',
      },

      '&:hover': {
        [`${componentCls}-track`]: {
          opacity: 1,
        },
      },

      [`${componentCls}-inner`]: {
        height: '100%',
        maxHeight: 'inherit',
        overflowX: 'hidden',
        overflowY: 'auto',

        '&::-webkit-scrollbar': {
          display: 'none',
        },
      },

      [`${componentCls}-track`]: {
        position: 'absolute',
        top: 2,
        right: 2,
        bottom: 2,
        width: 6,
        touchAction: 'none',
        backgroundColor: 'transparent',
        opacity: 0,
        transition: `opacity ${token.motionDurationFast}`,
        userSelect: 'none',

        '&.is-hide': {
          display: 'none',
        },
      },

      [`${componentCls}-thumb`]: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        borderRadius: token.borderRadius,
        backgroundColor: token.colorTextTertiary,
        opacity: 0.3,

        '&:hover': {
          opacity: 0.5,
        },
      },
    },
  };
};

export default getStyleHook('ScrollView', (token) => {
  return [getScrollViewStyle(token)];
});

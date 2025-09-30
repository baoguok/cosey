import { getSimpleStyleHook } from '../../theme';

export default getSimpleStyleHook('CoScrollView', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'relative',

      ' &::before, &::after': {
        position: 'absolute',
        insetInlineStart: 0,
        insetInlineEnd: 0,
        height: 40,
        zIndex: 1,
        content: '""',
        pointerEvents: 'none',
        userSelect: 'none',
        touchAction: 'none',
      },

      '&::before': {
        insetBlockStart: 0,
        background: `linear-gradient(to bottom, ${token.colorBgElevated}, transparent)`,
      },

      '&::after': {
        insetBlockEnd: 0,
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
        insetBlockStart: 2,
        insetInlineEnd: 2,
        insetBlockEnd: 2,
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
        insetBlockStart: 0,
        insetInlineStart: 0,
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
});

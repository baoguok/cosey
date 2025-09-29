import { getSimpleStyleHook } from '../theme';

export default getSimpleStyleHook('CoRibbon', (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}`]: {
      position: 'absolute',
      overflow: 'hidden',
      pointerEvents: 'none',

      [`${componentCls}-silk`]: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: token.fontSize,
        textAlign: 'center',
        color: token.colorWhite,
        textShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
        background: 'var(--bg)',
        pointerEvents: 'auto',
      },

      '&::before,&::after': {
        content: '""',
        position: 'absolute',
        display: 'block',
        border: 'calc(var(--gap) / 2) solid var(--bg)',
        filter: 'grayscale(70%) brightness(0.7)',
      },

      [`&.is-top-left`]: {
        insetBlockStart: 'calc(var(--gap) * -1)',
        insetInlineStart: 'calc(var(--gap) * -1)',

        [`${componentCls}-silk`]: {
          insetBlockStart: 0,
          insetInlineEnd: 0,
          transformOrigin: 'right bottom',
          transform: 'translateY(-100%) rotate(-45deg)',
        },

        '&::before,&::after': {
          borderTopColor: 'transparent',
          borderLeftColor: 'transparent',
        },

        '&::before': {
          insetBlockStart: 0,
          insetInlineEnd: 0,
        },

        '&::after': {
          insetBlockEnd: 0,
          insetInlineStart: 0,
        },
      },

      [`&.is-top-right`]: {
        insetBlockStart: 'calc(var(--gap) * -1)',
        insetInlineEnd: 'calc(var(--gap) * -1)',

        [`${componentCls}-silk`]: {
          insetBlockStart: 0,
          insetInlineStart: 0,
          transformOrigin: 'left bottom',
          transform: 'translateY(-100%) rotate(45deg)',
        },

        '&::before,&::after': {
          borderTopColor: 'transparent',
          borderRightColor: 'transparent',
        },

        '&::before': {
          insetBlockStart: 0,
          insetInlineStart: 0,
        },

        '&::after': {
          insetBlockEnd: 0,
          insetInlineEnd: 0,
        },
      },

      [`&.is-bottom-left`]: {
        insetBlockEnd: 'calc(var(--gap) * -1)',
        insetInlineStart: 'calc(var(--gap) * -1)',

        [`${componentCls}-silk`]: {
          insetBlockEnd: 0,
          insetInlineEnd: 0,
          transformOrigin: 'top right',
          transform: 'translateY(100%) rotate(45deg)',
        },

        '&::before,&::after': {
          borderBottomColor: 'transparent',
          borderLeftColor: 'transparent',
        },

        '&::before': {
          insetBlockEnd: 0,
          insetInlineEnd: 0,
        },

        '&::after': {
          insetBlockStart: 0,
          insetInlineStart: 0,
        },
      },

      [`&.is-bottom-right`]: {
        insetBlockEnd: 'calc(var(--gap) * -1)',
        insetInlineEnd: 'calc(var(--gap) * -1)',

        [`${componentCls}-silk`]: {
          insetBlockEnd: 0,
          insetInlineStart: 0,
          transformOrigin: 'left top',
          transform: 'translateY(100%) rotate(-45deg)',
        },

        '&::before,&::after': {
          borderBottomColor: 'transparent',
          borderRightColor: 'transparent',
        },

        '&::before': {
          insetBlockEnd: 0,
          insetInlineStart: 0,
        },

        '&::after': {
          insetBlockStart: 0,
          insetInlineEnd: 0,
        },
      },
    },
  };
});

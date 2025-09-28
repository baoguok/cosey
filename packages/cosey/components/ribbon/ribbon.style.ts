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
        top: 'calc(var(--gap) * -1)',
        left: 'calc(var(--gap) * -1)',

        [`${componentCls}-silk`]: {
          top: 0,
          right: 0,
          transformOrigin: 'right bottom',
          transform: 'translateY(-100%) rotate(-45deg)',
        },

        '&::before,&::after': {
          borderTopColor: 'transparent',
          borderLeftColor: 'transparent',
        },

        '&::before': {
          top: 0,
          right: 0,
        },

        '&::after': {
          bottom: 0,
          left: 0,
        },
      },

      [`&.is-top-right`]: {
        top: 'calc(var(--gap) * -1)',
        right: 'calc(var(--gap) * -1)',

        [`${componentCls}-silk`]: {
          top: 0,
          left: 0,
          transformOrigin: 'left bottom',
          transform: 'translateY(-100%) rotate(45deg)',
        },

        '&::before,&::after': {
          borderTopColor: 'transparent',
          borderRightColor: 'transparent',
        },

        '&::before': {
          top: 0,
          left: 0,
        },

        '&::after': {
          bottom: 0,
          right: 0,
        },
      },

      [`&.is-bottom-left`]: {
        bottom: 'calc(var(--gap) * -1)',
        left: 'calc(var(--gap) * -1)',

        [`${componentCls}-silk`]: {
          bottom: 0,
          right: 0,
          transformOrigin: 'top right',
          transform: 'translateY(100%) rotate(45deg)',
        },

        '&::before,&::after': {
          borderBottomColor: 'transparent',
          borderLeftColor: 'transparent',
        },

        '&::before': {
          bottom: 0,
          right: 0,
        },

        '&::after': {
          top: 0,
          left: 0,
        },
      },

      [`&.is-bottom-right`]: {
        bottom: 'calc(var(--gap) * -1)',
        right: 'calc(var(--gap) * -1)',

        [`${componentCls}-silk`]: {
          bottom: 0,
          left: 0,
          transformOrigin: 'left top',
          transform: 'translateY(100%) rotate(-45deg)',
        },

        '&::before,&::after': {
          borderBottomColor: 'transparent',
          borderRightColor: 'transparent',
        },

        '&::before': {
          bottom: 0,
          left: 0,
        },

        '&::after': {
          top: 0,
          right: 0,
        },
      },
    },
  };
});

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

      [`&.is-top-left, [dir="rtl"] &.is-top-right`]: {
        top: 'calc(var(--gap) * -1)',
        left: 'calc(var(--gap) * -1)',
        right: 'auto',
        bottom: 'auto',

        [`${componentCls}-silk`]: {
          top: 0,
          right: 0,
          left: 'auto',
          bottom: 'auto',
          transformOrigin: 'right bottom',
          transform: 'translateY(-100%) rotate(-45deg)',
        },

        '&::before,&::after': {
          borderColor: 'transparent var(--bg) var(--bg) transparent',
        },

        '&::before': {
          top: 0,
          right: 0,
          left: 'auto',
          bottom: 'auto',
        },

        '&::after': {
          bottom: 0,
          left: 0,
          top: 'auto',
          right: 'auto',
        },
      },

      [`&.is-top-right, [dir="rtl"] &.is-top-left`]: {
        top: 'calc(var(--gap) * -1)',
        right: 'calc(var(--gap) * -1)',
        left: 'auto',
        bottom: 'auto',

        [`${componentCls}-silk`]: {
          top: 0,
          left: 0,
          bottom: 'auto',
          right: 'auto',
          transformOrigin: 'left bottom',
          transform: 'translateY(-100%) rotate(45deg)',
        },

        '&::before,&::after': {
          borderColor: 'transparent transparent var(--bg) var(--bg)',
        },

        '&::before': {
          top: 0,
          left: 0,
          bottom: 'auto',
          right: 'auto',
        },

        '&::after': {
          bottom: 0,
          right: 0,
          top: 'auto',
          left: 'auto',
        },
      },

      [`&.is-bottom-left, [dir="rtl"] &.is-bottom-right`]: {
        bottom: 'calc(var(--gap) * -1)',
        left: 'calc(var(--gap) * -1)',
        top: 'auto',
        right: 'auto',

        [`${componentCls}-silk`]: {
          bottom: 0,
          right: 0,
          top: 'auto',
          left: 'auto',
          transformOrigin: 'top right',
          transform: 'translateY(100%) rotate(45deg)',
        },

        '&::before,&::after': {
          borderColor: 'var(--bg) var(--bg) transparent transparent',
        },

        '&::before': {
          bottom: 0,
          right: 0,
          top: 'auto',
          left: 'auto',
        },

        '&::after': {
          top: 0,
          left: 0,
          right: 'auto',
          bottom: 'auto',
        },
      },

      [`&.is-bottom-right, [dir="rtl"] &.is-bottom-left`]: {
        bottom: 'calc(var(--gap) * -1)',
        right: 'calc(var(--gap) * -1)',
        top: 'auto',
        left: 'auto',

        [`${componentCls}-silk`]: {
          bottom: 0,
          left: 0,
          top: 'auto',
          right: 'auto',
          transformOrigin: 'left top',
          transform: 'translateY(100%) rotate(-45deg)',
        },

        '&::before,&::after': {
          borderColor: 'var(--bg) transparent transparent var(--bg)',
        },

        '&::before': {
          bottom: 0,
          left: 0,
          top: 'auto',
          right: 'auto',
        },

        '&::after': {
          top: 0,
          right: 0,
          bottom: 'auto',
          left: 'auto',
        },
      },
    },
  };
});

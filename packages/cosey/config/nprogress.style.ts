import { getGlobalStyleHook, rotation } from '../components';

export default getGlobalStyleHook('NProgress', (token) => {
  return {
    '#nprogress': {
      pointerEvents: 'none',

      '.bar': {
        position: 'fixed',
        insetBlockStart: 0,
        insetInlineStart: 0,
        zIndex: 1030,
        width: '100%',
        height: '2px',
        background: token.colorPrimary,
      },

      '.peg': {
        display: 'block',
        position: 'absolute',
        insetInlineEnd: 0,
        width: 100,
        height: '100%',
        boxShadow: `0 0 10px ${token.colorPrimary}, 0 0 5px ${token.colorPrimary}`,
        opacity: 1,
        transform: `rotate(3deg) translate(0px, -4px)`,
      },

      '.spinner': {
        position: 'fixed',
        insetBlockStart: 15,
        insetInlineEnd: 15,
        zIndex: 1030,
        display: 'block',
      },

      '.spinner-icon': {
        width: 18,
        height: 18,
        boxSizing: 'border-box',
        border: `solid 2px transparent`,
        borderTopColor: token.colorPrimary,
        borderLeftColor: token.colorPrimary,
        borderRadius: '50%',
        animationName: rotation,
        animationDuration: '0.4s',
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
      },
    },
  };
});

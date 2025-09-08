import { getSimpleStyleHook } from '../theme';

export default getSimpleStyleHook('CoMask', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      '&:not(.is-copied):hover': {
        opacity: 0.75,
      },

      '&.is-copied': {
        [`${componentCls}-icon`]: {
          color: token.colorSuccess,
        },
      },
    },
  };
});

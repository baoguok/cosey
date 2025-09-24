import { getSimpleStyleHook } from '../theme';

export default getSimpleStyleHook('CoMask', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      width: token.sizeLG,
      height: `${token.sizeLG} !important`,
      fontSize: token.fontSize,
      transition: 'none',

      '&:not(.is-copied):hover': {
        opacity: 0.75,
      },

      '&.is-copied': {
        fontSize: token.fontSizeXL,

        [`${componentCls}-icon`]: {
          color: token.colorSuccess,
        },
      },
    },
  };
});

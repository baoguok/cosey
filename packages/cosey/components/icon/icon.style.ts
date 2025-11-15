import { getSimpleStyleHook } from '../theme';

export default getSimpleStyleHook('CoIcon', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      display: 'inline-flex',
      width: '1em',
      height: '1em',
      fill: 'currentcolor',

      '&-sm': {
        fontSize: token.fontSizeSM,
      },

      '&-md': {
        fontSize: token.fontSize,
      },

      '&-lg': {
        fontSize: token.fontSizeLG,
      },

      '&-xl': {
        fontSize: token.fontSizeXL,
      },
    },
  };
});

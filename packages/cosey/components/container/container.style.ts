import { getSimpleStyleHook } from '../theme';

export default getSimpleStyleHook('CoContainer', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      padding: token.padding,

      '@media(max-height: 800px)': {
        '&': {
          height: 'auto !important',
        },
      },
    },
  };
});

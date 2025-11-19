import { getSimpleStyleHook } from '../theme';

export default getSimpleStyleHook('CoFormDialog', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      '@media(max-width: 768px)': {
        '&': {
          width: '100%',
        },
      },
    },
  };
});

import { getSimpleStyleHook } from '../theme';

export default getSimpleStyleHook('CoContainer', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      padding: token.padding,
    },
  };
});

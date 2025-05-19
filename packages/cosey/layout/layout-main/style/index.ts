import { getSimpleStyleHook } from '../../../components';

export default getSimpleStyleHook('LayoutMain', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'relative',
      flex: 1,
    },
  };
});

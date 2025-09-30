import { getSimpleStyleHook } from '../../../components';

export default getSimpleStyleHook('CoLayoutMain', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'relative',
      flex: 1,
    },
  };
});

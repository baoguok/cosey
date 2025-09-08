import { getSimpleStyleHook } from '../../../components';

export default getSimpleStyleHook('CoLayoutBase', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: token.colorBgLayout,
    },
  };
});

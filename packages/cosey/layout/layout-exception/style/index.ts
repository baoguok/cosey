import { getSimpleStyleHook } from '../../../components';

export default getSimpleStyleHook('CoLayoutException', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      display: 'flex',
      width: '100vw',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
});

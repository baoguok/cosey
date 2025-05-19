import { getSimpleStyleHook } from '../../../components';

export default getSimpleStyleHook('LayoutHeader', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: token.colorBgContainer,
      transition: `left ${token.motionDurationSlow}`,
    },
  };
});

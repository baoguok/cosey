import { getSimpleStyleHook } from '../../../components';

export default getSimpleStyleHook('LayoutSidebar', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1020,
      display: 'flex',
      backgroundColor: token.colorBgContainer,
      transition: `transform ${token.motionDurationSlow}, with ${token.motionDurationSlow}`,
    },
  };
});

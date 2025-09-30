import { getSimpleStyleHook } from '../../../components';

export default getSimpleStyleHook('CoLayoutHeader', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'fixed',
      insetBlockStart: 0,
      insetInlineStart: 0,
      insetInlineEnd: 0,
      zIndex: 1000,
      backgroundColor: token.colorBgContainer,
      transition: `left ${token.motionDurationSlow}`,
    },
  };
});

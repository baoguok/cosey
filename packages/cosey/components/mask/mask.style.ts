import { getSimpleStyleHook } from '../theme';

export default getSimpleStyleHook('CoMask', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'absolute',
      insetBlockStart: 0,
      insetInlineStart: 0,
      width: '100%',
      height: '100%',
      backgroundColor: token.colorBgMask,
    },
  };
});

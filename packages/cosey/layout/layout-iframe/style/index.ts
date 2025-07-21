import { getSimpleStyleHook } from '../../../components';

export default getSimpleStyleHook('LayoutIframe', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'absolute',
      insetBlockStart: 0,
      insetInlineStart: 0,
      width: '100%',
      height: '100%',

      [`${componentCls}-loading`]: {
        position: 'relative',
        width: '100%',
        height: '100%',
      },

      [`${componentCls}-iframe`]: {
        width: '100%',
        height: '100%',
      },
    },
  };
});

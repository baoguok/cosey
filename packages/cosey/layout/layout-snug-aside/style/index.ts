import { getSimpleStyleHook } from '../../../components';

export default getSimpleStyleHook('CoLayoutSnugAside', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      borderInlineEnd: `${token.lineWidth} ${token.lineType} ${token.colorBorder}`,
      transition: `width ${token.motionDurationSlow}`,

      '&.is-hide': {
        border: 'none',
      },

      [`${componentCls}-header`]: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        flex: 'none',
      },

      [`${componentCls}-body`]: {
        minHeight: 0,
        flex: 1,
        paddingInline: token.paddingXS,
        paddingBlock: token.paddingSM,
      },
    },
  };
});

import { getSimpleStyleHook } from '../../../components';

export default getSimpleStyleHook('LayoutAside', (token) => {
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
        flex: 'none',
        alignItems: 'center',
        justifyContent: 'center',
      },

      [`${componentCls}-body`]: {
        minHeight: 0,
        flex: 1,
        paddingBlock: token.paddingXS,
      },

      [`${componentCls}-footer`]: {
        display: 'flex',
        flex: 'none',
        justifyContent: 'center',
        padding: token.paddingXS,
      },
    },
  };
});

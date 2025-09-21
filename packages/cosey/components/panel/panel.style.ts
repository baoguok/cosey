import { getSimpleStyleHook } from '../theme';

export default getSimpleStyleHook('CoPanel', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      overflow: 'hidden',
      borderRadius: token.borderRadius,
      border: `${token.lineWidth} ${token.lineType} ${token.colorBorderSecondary}`,

      [`${componentCls}-header`]: {
        display: 'flex',
        height: 40,
        paddingInline: token.padding,
        alignItems: 'center',
        borderBlockEnd: `${token.lineWidth} ${token.lineType} ${token.colorBorderSecondary}`,
        backgroundColor: token.colorFillAlter,
      },

      [`${componentCls}-body`]: {
        paddingInline: token.padding,
        paddingBlock: token.paddingXS,
      },
    },
  };
});

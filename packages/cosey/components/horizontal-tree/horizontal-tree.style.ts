import { getSimpleStyleHook } from '../theme';

export default getSimpleStyleHook('CoHorizontalTree', (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}`]: {
      width: '100%',
      borderCollapse: 'collapse',

      [`${componentCls}-empty`]: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
        minHeight: 60,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: token.colorTextSecondary,
      },

      table: {
        width: '100%',
      },

      td: {
        paddingInline: token.paddingSM,
        paddingBlock: token.paddingXS,
        border: `${token.lineWidth} ${token.lineType} ${token.colorBorderSecondary}`,
      },

      [`${componentCls}-node`]: {
        display: 'inline-flex',
        width: 'var(--node-width)',
      },
    },
  };
});

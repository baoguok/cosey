import { getSimpleStyleHook, getTruncateStyle } from 'cosey/components';

export default getSimpleStyleHook('LayoutHttpMessage', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      maxWidth: '80%',

      [`${componentCls}-header`]: {
        marginBlockEnd: 0,
      },

      [`${componentCls}-tabs`]: {
        height: '100%',

        '.el-tabs__header .el-tabs__item': {
          paddingLeft: 0,
        },
      },

      [`${componentCls}-tab-pane`]: {
        height: '100%',
      },

      [`${componentCls}-tab-label`]: {
        width: 160,
        ...getTruncateStyle(),
      },

      [`${componentCls}-right-tabs`]: {
        height: '100%',
      },

      [`${componentCls}-right-tabs-wrapper`]: {
        height: '100%',
        overflow: 'auto',
      },
    },
  };
});

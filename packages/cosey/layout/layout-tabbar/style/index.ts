import { contrarotation, getSimpleStyleHook } from '../../../components';

export default getSimpleStyleHook('LayoutTabbar', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      display: 'flex',
      alignItems: 'stretch',
      paddingBlockStart: token.paddingXS,
      transition: `margin-left ${token.motionDurationSlow}`,

      '&::before, &::after': {
        content: '""',
        display: 'flex',
        width: 8,
        borderBlockEnd: `${token.lineWidth} ${token.lineType} ${token.colorBorder}`,
      },

      '.el-tabs': {
        '--el-tabs-header-height': 32,
      },

      '.el-tabs__header': {
        marginBlockEnd: 0,
      },

      '.el-tabs__nav-wrap': {
        marginBlockEnd: 0,
      },

      '.el-tabs__nav-next, .el-tabs__nav-prev': {
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
      },

      '.el-tabs--card > .el-tabs__header .el-tabs__item.is-active': {
        backgroundColor: token.colorBgLayout,
        borderBottomColor: token.colorBgLayout,
      },

      [`${componentCls}-tabs-wrapper`]: {
        flex: 1,
        overflow: 'hidden',
        paddingBlockStart: 1,
      },

      [`${componentCls}-context-menu-reference`]: {
        position: 'absolute',
        inset: 0,
      },

      [`${componentCls}-toolbar`]: {
        display: 'flex',
        alignItems: 'center',
        borderBlockEnd: `${token.lineWidth} ${token.lineType} ${token.colorBorder}`,
      },

      [`${componentCls}-reload`]: {
        overflow: 'hidden',
      },

      [`${componentCls}-reload-icon`]: {
        '&.is-spinning': {
          animationName: contrarotation,
          animationDuration: '0.6s',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
        },
      },
    },
  };
});

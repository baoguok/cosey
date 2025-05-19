import { getSimpleStyleHook } from '../../../theme';

export default getSimpleStyleHook('EditorTableToolbar', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'flex',
      columnGap: token.padding,
      paddingInline: token.paddingXS,
      paddingBlock: token.paddingXXS,
      border: `${token.lineWidth} ${token.lineType} ${token.colorBorderSecondary}`,
      borderRadius: token.borderRadius,
      backgroundColor: token.colorBgElevated,
      boxShadow: token.boxShadow,
    },
  };
});

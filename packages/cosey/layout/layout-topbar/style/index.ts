import { getSimpleStyleHook } from '../../../components';

export default getSimpleStyleHook('LayoutTopbar', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      display: 'flex',
      justifyContent: 'center',
      paddingInline: token.padding,
      borderBlockEnd: `${token.lineWidth} ${token.lineType} ${token.colorBorder}`,

      [`${componentCls}-left`]: {
        display: 'flex',
        minWidth: 0,
        flex: 1,
        alignItems: 'center',
        columnGap: token.size,
      },

      [`${componentCls}-right`]: {
        display: 'flex',
        alignItems: 'center',
        columnGap: token.sizeSM,
      },
    },
  };
});

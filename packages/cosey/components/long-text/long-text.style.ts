import { getSimpleStyleHook } from '../theme';
import { getLineClampStyle } from '../style/mixins';

export default getSimpleStyleHook('CoLongText', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      ...getLineClampStyle(3),
    },

    [`${componentCls}-tooltip`]: {
      [`${componentCls}-scrollbar`]: {
        maxWidth: 690,
        paddingInlineEnd: token.padding,
      },

      [`${componentCls}-copy`]: {
        position: 'absolute',
        insetBlockStart: token.sizeXXS,
        insetInlineEnd: token.sizeXXS,
        zIndex: 10,
      },
    },
  };
});

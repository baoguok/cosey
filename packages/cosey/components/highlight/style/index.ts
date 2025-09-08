import { getSimpleStyleHook } from '../../theme';
import { getHljs } from './hljs';

export default getSimpleStyleHook('CoHighlight', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'relative',

      pre: {
        padding: token.paddingSM,
        overflow: 'auto',
        color: '#abb2bf',
        background: '#282c34',
        borderRadius: token.borderRadius,
      },

      [`${componentCls}-copy`]: {
        position: 'absolute',
        insetBlockStart: token.sizeXXS,
        insetInlineEnd: token.sizeXXS,
        zIndex: 10,
        color: token.colorWhite,
      },

      ...getHljs(),
    },
  };
});

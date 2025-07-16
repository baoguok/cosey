import { getSimpleStyleHook } from '../../theme';

export default getSimpleStyleHook('EditorPicker', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      '&-panel': {
        padding: 0,
        boxShadow: token.boxShadow,

        [`${componentCls}-content`]: {
          padding: token.paddingXS,
          overflowY: 'auto',
          borderRadius: 'inherit',

          '&.is-nopadding': {
            padding: 0,
          },
        },
      },
    },
  };
});

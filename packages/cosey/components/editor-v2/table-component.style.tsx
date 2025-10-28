import { getSimpleStyleHook } from '../theme';

export default getSimpleStyleHook('CoEditorV2Table', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      '&.is-active': {
        outline: `2px solid ${token.colorPrimaryBorder}`,
      },
    },

    [`${componentCls}-toolbar`]: {
      display: 'flex',
      alignItems: 'center',
      columnGap: token.sizeLG,
    },
  };
});

import { getSimpleStyleHook } from '../theme';

export default getSimpleStyleHook('CoTableAction', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      display: 'inline-flex',
      flexDirection: 'column',
      rowGap: token.sizeSM,

      [`${componentCls}-row`]: {
        display: 'flex',
        flexWrap: 'wrap',
        columnGap: token.sizeXXS,
        rowGap: token.sizeXXS,
      },
    },
  };
});

import { getSimpleStyleHook } from '../../theme';

export default getSimpleStyleHook('CoTableColumn', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      '&.is-media, &.is-tag': {
        '.cell': {
          textOverflow: 'initial',
        },
      },
      [`${componentCls}-label`]: {
        verticalAlign: 'middle',
      },
    },
  };
});

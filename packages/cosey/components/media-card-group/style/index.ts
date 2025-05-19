import { getSimpleStyleHook } from '../../theme';

export default getSimpleStyleHook('MediaCardGroup', (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}`]: {
      display: 'inline-flex',
      flexWrap: 'wrap',
      gap: token.sizeXS,
    },
  };
});

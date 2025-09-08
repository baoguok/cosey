import { getSimpleStyleHook } from '../../theme';

export default getSimpleStyleHook('CoRow', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'relative',
      boxSizing: 'border-box',
      display: 'flex',
      flexWrap: 'wrap',
    },
  };
});

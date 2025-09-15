import { getSimpleStyleHook } from '../theme';

export default getSimpleStyleHook('CoMediaViewerDialog', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'fixed',
      inset: 0,

      '&:focus': {
        outline: 'none',
      },

      [`${componentCls}-content`]: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
      },
    },
  };
});
